// Records captioned video walkthroughs of the three allocation-history prototypes.
//
//   npm run record            -> all three
//   npm run record -- mvp     -> just one (mvp | timeline | stepper)
//
// Output: videos/<name>.mp4 (H.264, plays in QuickTime, Slack, Chrome, Keynote).
// Each walkthrough is a list of steps below: edit captions or timings and re-run.

import { chromium } from 'playwright';
import ffmpegPath from 'ffmpeg-static';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.resolve(HERE, '..');
const OUT = path.join(HERE, 'videos');
const TMP = path.join(HERE, '.raw');
const SIZE = { width: 1440, height: 900 };

// ---------- On-page overlay: cursor, captions, title cards ----------
// Playwright doesn't draw the mouse pointer in recordings, so a fake one follows real mouse events.
function overlay() {
  const css = `
    #wt-cursor { position: fixed; left: 0; top: 0; z-index: 2147483647; width: 22px; height: 22px;
      pointer-events: none; transform: translate(-3px, -2px); transition: opacity .2s; }
    #wt-cursor svg { width: 22px; height: 22px; filter: drop-shadow(0 1px 2px rgba(0,0,0,.35)); }
    #wt-ripple { position: fixed; z-index: 2147483646; width: 36px; height: 36px; margin: -18px 0 0 -18px;
      border-radius: 50%; background: rgba(44,36,195,.25); border: 2px solid rgba(44,36,195,.6);
      pointer-events: none; opacity: 0; transform: scale(.4); }
    #wt-ripple.on { animation: wt-ripple .45s ease-out; }
    @keyframes wt-ripple { 0% { opacity: 1; transform: scale(.4); } 100% { opacity: 0; transform: scale(1.4); } }
    #wt-caption { position: fixed; left: 50%; bottom: 36px; z-index: 2147483645; max-width: 760px;
      display: flex; align-items: center; gap: 12px; padding: 12px 20px 12px 12px; border-radius: 12px;
      background: #090642; color: #fff; font: 500 17px/1.4 Inter, system-ui, sans-serif;
      box-shadow: 0 10px 30px rgba(9,6,66,.35); pointer-events: none;
      opacity: 0; transform: translate(-50%, 10px); transition: opacity .3s ease, transform .3s ease; }
    #wt-caption.on { opacity: 1; transform: translate(-50%, 0); }
    #wt-caption b { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 28px;
      height: 28px; border-radius: 50%; background: #2ee49b; color: #090642; font-size: 14px; font-weight: 700; }
    #wt-card { position: fixed; inset: 0; z-index: 2147483644; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 12px; background: #090642; color: #fff;
      font-family: Inter, system-ui, sans-serif; text-align: center; transition: opacity .6s ease; }
    #wt-card.off { opacity: 0; pointer-events: none; }
    #wt-card .k { font-size: 14px; letter-spacing: .12em; text-transform: uppercase; color: #a0acf8; }
    #wt-card .t { font-size: 44px; font-weight: 600; }
    #wt-card .s { font-size: 20px; color: #cad1fc; max-width: 760px; }
  `;
  function mount() {
    if (document.getElementById('wt-cursor')) return;
    const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);
    const cursor = document.createElement('div'); cursor.id = 'wt-cursor';
    cursor.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 2l15 11.5-6.6 1.2 3.9 7.3-2.9 1.5-3.9-7.4L4 21z" fill="#131221" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    const ripple = document.createElement('div'); ripple.id = 'wt-ripple';
    const caption = document.createElement('div'); caption.id = 'wt-caption';
    document.body.append(cursor, ripple, caption);
    document.addEventListener('mousemove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }, true);
    document.addEventListener('mousedown', e => {
      ripple.style.left = e.clientX + 'px'; ripple.style.top = e.clientY + 'px';
      ripple.classList.remove('on'); void ripple.offsetWidth; ripple.classList.add('on');
    }, true);
  }
  window.__wt = {
    caption(text, n) {
      mount();
      const c = document.getElementById('wt-caption');
      c.innerHTML = (n ? '<b>' + n + '</b>' : '') + '<span>' + text + '</span>';
      // Centre over the open map: between the map toolbar and the summary panel
      const tools = document.querySelector('[data-test-id="map-toolbar"]');
      const summary = document.querySelector('[data-test-id="allocation-card-container"]');
      const side = summary && summary.closest('[data-map-overlay]');
      if (tools && side) {
        const left = tools.getBoundingClientRect().right + 16, right = side.getBoundingClientRect().left - 16;
        c.style.left = (left + right) / 2 + 'px';
        c.style.maxWidth = (right - left) + 'px';
      }
      c.classList.add('on');
    },
    hideCaption() { const c = document.getElementById('wt-caption'); if (c) c.classList.remove('on'); },
    card(kicker, title, sub) {
      let card = document.getElementById('wt-card');
      if (!card) { card = document.createElement('div'); card.id = 'wt-card'; (document.body || document.documentElement).appendChild(card); }
      card.innerHTML = '<div class="k">' + kicker + '</div><div class="t">' + title + '</div><div class="s">' + sub + '</div>';
      card.classList.remove('off');
      const cur = document.getElementById('wt-cursor'); if (cur) cur.style.opacity = '0';
    },
    hideCard() {
      const c = document.getElementById('wt-card'); if (c) c.classList.add('off');
      const cur = document.getElementById('wt-cursor'); if (cur) cur.style.opacity = '1';
    }
  };
  document.addEventListener('DOMContentLoaded', mount);
}

// ---------- Step helpers ----------
const sleep = (page, ms) => page.waitForTimeout(ms);

async function moveTo(page, target, steps = 28) {
  const box = typeof target === 'string' ? await page.locator(target).first().boundingBox() : target;
  const x = box.x + (box.width || 0) / 2, y = box.y + (box.height || 0) / 2;
  await page.mouse.move(x, y, { steps });
}
async function click(page, target) {
  await moveTo(page, target);
  await sleep(page, 250);
  await page.mouse.down();
  await sleep(page, 90);
  await page.mouse.up();
}
async function caption(page, n, text, ms = 2600) {
  await page.evaluate(([t, i]) => window.__wt.caption(t, i), [text, n]);
  await sleep(page, ms);
}
async function editFramesTarget(page, value) {
  await click(page, '[data-test-id="frames-targets-button"]');
  await sleep(page, 400);
  await page.keyboard.type(String(value), { delay: 140 }); // the input opens with its value selected
  await sleep(page, 400);
  await click(page, '.ac-pop [data-act="apply"]');
}
const HISTORY = '.ac-history-btn';
const CARD = '[data-test-id="allocation-card-container"]';
const CHANGES = '#deal-summary-card-section-impressions .ac-delta';
const CHECK = '[data-test-id="planner-actions-check"]';
const MAP = { x: 640, y: 520 };

// ---------- Walkthroughs ----------
const WALKTHROUGHS = {
  mvp: {
    file: 'dsm-campaign-allocation-compare.html',
    out: '1-mvp-current-vs-previous',
    card: ['Allocation history · MVP', 'Current vs previous', 'Compare a campaign’s latest allocation with the one before it'],
    async steps(page) {
      await caption(page, 1, 'A confirmed campaign has been edited and re-allocated');
      await moveTo(page, CARD);
      await sleep(page, 600);
      await moveTo(page, HISTORY);
      await caption(page, 2, 'The clock shows a previous allocation is available');
      await click(page, HISTORY);
      await caption(page, 3, 'Current shows the new figures and the change from the previous allocation', 600);
      await moveTo(page, CHANGES);
      await sleep(page, 2600);
      await click(page, '#ac-tab-previous');
      await caption(page, 4, 'Previous shows the allocation before the edit');
      await moveTo(page, MAP);
      await caption(page, 5, 'The map shows the frames in that allocation', 2400);
      await click(page, '#ac-tab-current');
      await sleep(page, 900);
      await caption(page, 6, 'Make another edit: change the Frames target', 900);
      await editFramesTarget(page, 140);
      await caption(page, 7, 'Unallocated changes are flagged until you check allocation');
      await click(page, CHECK);
      await caption(page, 8, 'Check allocation saves the result and the comparison moves forward', 3600);
      await click(page, HISTORY);
      await caption(page, 9, 'Click the clock again to hide the history', 2400);
    }
  },

  timeline: {
    file: 'dsm-campaign-version-timeline.html',
    out: '2-timeline-panel',
    card: ['Allocation history · Option A', 'Timeline panel', 'Review every allocation version in a panel beside the map'],
    async steps(page) {
      await caption(page, 1, 'This campaign has been allocated four times');
      await moveTo(page, HISTORY);
      await caption(page, 2, 'The clock opens the version history', 1200);
      await click(page, HISTORY);
      await sleep(page, 900);
      await moveTo(page, '.vt-list');
      await caption(page, 3, 'Every version is listed newest first, with when, who and the results', 3200);
      await click(page, '.vt-item:has-text("Version 2")');
      await caption(page, 4, 'Select a version to see it on the allocation card and the map', 1400);
      await moveTo(page, CHANGES);
      await caption(page, 5, 'The card shows how it changed from the version before', 2600);
      await click(page, '.vt-item:has-text("Version 1")');
      await caption(page, 6, 'Version 1 is the original allocation', 2400);
      await click(page, '.vt-item:has-text("Version 4")');
      await caption(page, 7, 'Select the current version to return to it', 2200);
      await caption(page, 8, 'Make another edit: change the Frames target', 900);
      await editFramesTarget(page, 140);
      await moveTo(page, '.vt-pending');
      await caption(page, 9, 'Edits waiting to be allocated appear at the top of the list', 2800);
      await click(page, CHECK);
      await caption(page, 10, 'Check allocation adds them as version 5', 3400);
      await click(page, '.vt-close');
      await caption(page, 11, 'Close the panel to return to the standard view', 2400);
    }
  },

  stepper: {
    file: 'dsm-campaign-version-stepper.html',
    out: '3-step-through-versions',
    card: ['Allocation history · Option B', 'Step through versions', 'Move through every allocation version from the allocation card'],
    async steps(page) {
      const OLDER = '.vs-arrow[data-step="-1"]', NEWER = '.vs-arrow[data-step="1"]';
      await caption(page, 1, 'This campaign has been allocated four times');
      await moveTo(page, HISTORY);
      await caption(page, 2, 'The clock adds a version stepper to the allocation card', 1200);
      await click(page, HISTORY);
      await sleep(page, 700);
      await moveTo(page, CHANGES);
      await caption(page, 3, 'Each version is compared with the one before it', 2800);
      await caption(page, 4, 'Use the arrows to step back through older versions', 700);
      await click(page, OLDER);
      await sleep(page, 1500);
      await click(page, OLDER);
      await sleep(page, 1500);
      await click(page, OLDER);
      await caption(page, 5, 'Version 1 is the original allocation', 2400);
      await caption(page, 6, 'Step forward to return to the current version', 700);
      for (let i = 0; i < 3; i++) { await click(page, NEWER); await sleep(page, 900); }
      await sleep(page, 600);
      await caption(page, 7, 'Make another edit: change the Frames target', 900);
      await editFramesTarget(page, 140);
      await click(page, CHECK);
      await caption(page, 8, 'Check allocation adds it as version 5', 3400);
      await click(page, HISTORY);
      await caption(page, 9, 'Click the clock again to hide the history', 2400);
    }
  }
};

// ---------- Recording ----------
async function record(browser, name) {
  const w = WALKTHROUGHS[name];
  const context = await browser.newContext({
    viewport: SIZE,
    deviceScaleFactor: 1,
    recordVideo: { dir: TMP, size: SIZE }
  });
  await context.addInitScript(overlay);
  const page = await context.newPage();
  await page.goto(pathToFileURL(path.join(PAGES, w.file)).href, { waitUntil: 'load' });

  // Title card while the page and map tiles settle
  await page.evaluate(c => window.__wt.card(...c), w.card);
  await page.mouse.move(SIZE.width / 2, SIZE.height / 2);
  await sleep(page, 3200);
  await page.evaluate(() => window.__wt.hideCard());
  await sleep(page, 900);

  await w.steps(page);

  await page.evaluate(() => window.__wt.hideCaption());
  await sleep(page, 600);
  await page.evaluate(c => window.__wt.card(...c), [w.card[0], w.card[1], 'Prototype walkthrough']);
  await sleep(page, 2200);

  const raw = await page.video().path();
  await context.close(); // finalises the video file

  // Re-encode to H.264 MP4, trimming the blank first frames before the title card appears
  fs.mkdirSync(OUT, { recursive: true });
  const mp4 = path.join(OUT, w.out + '.mp4');
  execFileSync(ffmpegPath, ['-y', '-loglevel', 'error', '-ss', '0.8', '-i', raw,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
  fs.rmSync(raw);
  return mp4;
}

const wanted = process.argv.slice(2).filter(a => WALKTHROUGHS[a]);
const names = wanted.length ? wanted : Object.keys(WALKTHROUGHS);
const browser = await chromium.launch();
try {
  for (const name of names) {
    const file = await record(browser, name);
    console.log('Recorded', path.relative(PAGES, file));
  }
} finally {
  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });
}
