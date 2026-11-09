/* Prototype: full allocation version history (shared base for the Timeline and Stepper branches).
   Runs on a static snapshot of the DSM planner page (app bundles removed).
   A branch script registers its UI with VersionHistory.start({ render, onHistoryToggle }). */
(function () {
  'use strict';

  // ---------- Data ----------
  var AVAILABLE_FRAMES = 154;               // from the Availability card
  var ADDED_IMPRESSIONS_PER_FRAME = 102639; // avg of the unallocated available frames
  var ADDED_PRICE_PER_FRAME = 1176;
  var STATUSES = ['Draft', 'Proposal', 'Option', 'Confirmed'];

  function ago(days, h, m) { var d = new Date(); d.setDate(d.getDate() - days); d.setHours(h, m, 0, 0); return d; }
  function minsAgo(n) { return new Date(Date.now() - n * 60000); }
  function grow(v, frames) {
    var d = frames - v.frames;
    return { frames: frames, impressions: v.impressions + d * ADDED_IMPRESSIONS_PER_FRAME, price: v.price + d * ADDED_PRICE_PER_FRAME };
  }
  function seedVersions() {
    var v1 = { frames: 99, impressions: 14061735, price: 119743 };
    var v2 = grow(v1, 108), v3 = grow(v2, 120), v4 = grow(v3, 130);
    return [
      Object.assign(v1, { at: ago(2, 16, 42), author: 'M. Costa', changes: [] }),
      Object.assign(v2, { at: ago(1, 11, 20), author: 'M. Costa', changes: ['Frames target <b>99</b> → <b>108</b>'] }),
      Object.assign(v3, { at: minsAgo(95), author: 'You', changes: ['Frames target <b>108</b> → <b>120</b>'] }),
      Object.assign(v4, { at: minsAgo(15), author: 'You', changes: ['Frames target <b>120</b> → <b>130</b>'] })
    ].map(function (v, i) { v.n = i + 1; return v; });
  }

  // Starts after several edits to the confirmed campaign, so four versions already exist.
  var state = {
    status: 'Confirmed',
    framesTarget: 130,
    allocatedTarget: 130,   // frames target used by the latest allocation
    pendingChanges: [],     // edits since the latest allocation
    versions: seedVersions(),
    viewIndex: null,        // version shown on the card (null = latest)
    baseIndex: null,        // version the card compares against (null = the one before viewIndex)
    loading: false,
    historyOpen: false,     // toggled by the clock icon in the card header
    unseenHistory: true     // a new version exists that the user hasn't looked at yet
  };

  // ---------- Helpers ----------
  var NBSP = ' ';
  function fmt(n) { return String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP); }
  function fmtSigned(n) { return (n > 0 ? '+' : n < 0 ? '−' : '') + fmt(n); }
  function fmtPct(n, base) {
    if (!base) return '';
    var p = (n / base) * 100;
    return (p > 0 ? '+' : p < 0 ? '−' : '') + Math.abs(p).toFixed(1) + '%';
  }
  function fmtTime(d) {
    var hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    var day = new Date(d); day.setHours(0, 0, 0, 0);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var diff = Math.round((today - day) / 86400000);
    if (diff === 0) return 'Today, ' + hm;
    if (diff === 1) return 'Yesterday, ' + hm;
    return d.getDate() + ' ' + d.toLocaleString('en-GB', { month: 'short' }) + ' ' + d.getFullYear() + ', ' + hm;
  }
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  var isDraft = function () { return state.status === 'Draft'; };
  var lastIndex = function () { return state.versions.length - 1; };
  var current = function () { return state.versions[lastIndex()]; };
  var hasHistory = function () { return !isDraft() && state.versions.length > 1; };
  var isStale = function () { return state.pendingChanges.length > 0; };
  var showHistory = function () { return hasHistory() && state.historyOpen; };
  function viewIndex() { return showHistory() && state.viewIndex !== null ? state.viewIndex : lastIndex(); }
  function baseIndex() {
    if (!showHistory()) return null;
    if (state.baseIndex !== null) return state.baseIndex;
    return viewIndex() > 0 ? viewIndex() - 1 : null;
  }

  var ICON = {
    up: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"/></svg>',
    down: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"/></svg>',
    clock: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/></svg>',
    warn: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/></svg>',
    check: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>',
    close: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>',
    left: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/></svg>',
    right: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/></svg>'
  };

  // ---------- DOM anchors ----------
  var container = document.querySelector('[data-test-id="allocation-card-container"]');
  var card = container.firstElementChild;
  var header = card.firstElementChild;
  var body = card.children[1];
  var METRICS = ['frames', 'impressions', 'price'];
  var sections = {};
  METRICS.forEach(function (key) {
    var sec = document.getElementById('deal-summary-card-section-' + key);
    sections[key] = {
      value: sec.querySelector('[data-test-id="deal-summary-card-section-' + key + '-value"]'),
      inner: sec.firstElementChild
    };
  });
  var checkBtn = document.querySelector('[data-test-id="planner-actions-check"]');
  var framesRow = document.querySelector('[data-test-id="frames-targets-button"]');
  var framesChip = document.querySelector('[data-test-id="frames-targets-button-chip"]');
  var framesTargetText = framesChip.children[0].querySelector('p');
  var framesAllocText = framesChip.children[1].querySelector('p');
  var statusCard = document.querySelector('[data-test-id="summary-status-card"]');
  var statusBtn = statusCard.querySelector('button');
  var statusChip = statusCard.querySelector('[data-test-id="chip"]');
  var lineStatusChip = document.querySelector('[data-test-id="status-chip"]');
  var overlay = container.closest('[data-map-overlay]');
  var mapArea = document.getElementById('deckgl-wrapper').parentElement;

  // ---------- Inject card UI ----------
  body.id = 'ac-card-body';
  body.setAttribute('aria-live', 'polite');

  var banner = el('<div class="ac-banner" hidden></div>');
  body.insertBefore(banner, body.firstChild);

  // Clock icon next to the ALLOCATION title: shows / hides allocation history
  var titleText = header.firstChild; // "ALLOCATION" text node
  var title = el('<div class="ac-title"></div>');
  header.insertBefore(title, titleText);
  title.appendChild(titleText);
  var historyBtn = el(
    '<button type="button" class="ac-history-btn" aria-pressed="false">' +
      ICON.clock + '<span class="ac-history-btn__dot" aria-hidden="true"></span>' +
    '</button>'
  );
  title.appendChild(historyBtn);
  historyBtn.addEventListener('click', function () { setHistoryOpen(!state.historyOpen); });

  METRICS.forEach(function (key) {
    var row = el('<div class="ac-delta" hidden><span class="ac-delta__label"></span><span class="ac-delta__chip"></span></div>');
    sections[key].inner.appendChild(row);
    sections[key].delta = row;
  });

  // Shown under the figures while viewing an older version
  var olderNote = el('<div hidden></div>');
  body.appendChild(olderNote);
  olderNote.addEventListener('click', function (e) { if (e.target.closest('[data-act="current"]')) backToCurrent(); });

  // ---------- Actions ----------
  var ui = {
    render: function () {},
    onHistoryToggle: function () {},
    deltaLabel: function (base) { return 'vs v' + base.n; },   // label beside each change on the card ('' hides it)
    olderNote: 'banner'   // note under the figures on older versions: 'banner' (with Back to current), 'text' or false
  };

  function setHistoryOpen(open) {
    if (!hasHistory() && open) return;
    state.historyOpen = open;
    if (open) state.unseenHistory = false;
    else { state.viewIndex = null; state.baseIndex = null; }
    ui.onHistoryToggle(open);
    render();
  }
  function view(i) {
    state.viewIndex = i === lastIndex() ? null : i;
    state.baseIndex = null;
    render();
  }
  function compare(newer, older) {
    state.viewIndex = newer === lastIndex() ? null : newer;
    state.baseIndex = older;
    render();
  }
  function backToCurrent() { state.viewIndex = null; state.baseIndex = null; render(); }

  // ---------- Render ----------
  function deltaChip(chip, d, base) {
    if (d === 0) {
      chip.className = 'ac-delta__chip ac-delta__chip--zero';
      chip.innerHTML = 'No change';
    } else {
      chip.className = 'ac-delta__chip';
      chip.innerHTML = (d > 0 ? ICON.up : ICON.down) + '<span>' + fmtSigned(d) + '</span><span class="ac-delta__pct">· ' + fmtPct(d, base) + '</span>';
    }
  }

  function render() {
    var vi = viewIndex(), bi = baseIndex();
    var viewing = state.versions[vi], base = bi === null ? null : state.versions[bi];
    var isLatest = vi === lastIndex();

    // History button
    historyBtn.hidden = isDraft();
    historyBtn.disabled = !hasHistory();
    historyBtn.setAttribute('aria-pressed', String(showHistory()));
    var tip = !hasHistory() ? 'No previous allocation yet' : showHistory() ? 'Hide version history' : 'Show version history';
    historyBtn.setAttribute('aria-label', tip);
    historyBtn.title = tip;
    historyBtn.classList.toggle('ac-history-btn--new', state.unseenHistory && !showHistory());

    // Card state classes
    card.classList.toggle('ac-card--previous', !isLatest);
    card.classList.toggle('ac-card--stale', isStale() && isLatest && !state.loading);
    card.classList.toggle('ac-card--loading', state.loading);

    // Values + change rows
    METRICS.forEach(function (key) {
      sections[key].value.textContent = fmt(viewing[key]);
      var row = sections[key].delta;
      if (base && !state.loading) {
        var d = viewing[key] - base[key];
        var label = ui.deltaLabel(base);
        var labelEl = row.querySelector('.ac-delta__label');
        labelEl.textContent = label;
        labelEl.hidden = !label;
        var chip = row.querySelector('.ac-delta__chip');
        deltaChip(chip, d, base[key]);
        chip.setAttribute('aria-label', (d === 0 ? 'No change' : fmtSigned(d) + ' (' + fmtPct(d, base[key]) + ')') + ' ' + (label ? label.replace(/^vs /, 'versus ') : 'versus version ' + base.n));
        row.hidden = false;
      } else {
        row.hidden = true;
      }
    });

    // Unallocated-changes banner (top)
    if (!state.loading && isStale() && isLatest) {
      banner.className = 'ac-banner ac-banner--stale';
      banner.innerHTML = ICON.warn + '<div><strong>Unallocated changes.</strong> Check allocation to see the new results' + (isDraft() ? '.' : ' and save them as version ' + (current().n + 1) + '.') + '</div>';
      banner.hidden = false;
    } else {
      banner.hidden = true;
    }

    // Older-version note (bottom)
    if (!isLatest && ui.olderNote === 'text') {
      olderNote.className = 'ac-older-text';
      olderNote.textContent = 'Version ' + viewing.n + ' · ' + fmtTime(viewing.at);
      olderNote.hidden = false;
    } else if (!isLatest && ui.olderNote) {
      olderNote.className = 'ac-banner ac-banner--previous ac-banner--bottom';
      olderNote.innerHTML = ICON.clock + '<div><strong>Version ' + viewing.n + '</strong> · ' + fmtTime(viewing.at) +
        '<br><button type="button" class="ac-link" data-act="current">Back to current</button></div>';
      olderNote.hidden = false;
    } else {
      olderNote.hidden = true;
    }

    // Left panel: frames chip
    framesTargetText.textContent = state.framesTarget;
    framesAllocText.textContent = current().frames;
    framesChip.classList.toggle('ac-chip-pending', isStale() || current().frames < state.framesTarget);

    // Status chips
    [statusChip, lineStatusChip].forEach(function (chip) {
      chip.classList.remove('bg-yellow-100', 'ac-chip-proposal', 'ac-chip-option', 'ac-chip-confirmed');
      chip.classList.add(isDraft() ? 'bg-yellow-100' : 'ac-chip-' + state.status.toLowerCase());
      chip.querySelector('p').textContent = state.status;
    });

    // Check allocation button
    checkBtn.disabled = state.loading;
    checkBtn.innerHTML = state.loading
      ? '<span class="ac-spinner" aria-hidden="true"></span><span class="whitespace-nowrap">Allocating…</span>'
      : '<span class="whitespace-nowrap text-ellipsis overflow-hidden">Check allocation</span>';

    ui.render();
    document.dispatchEvent(new CustomEvent('ac:render', {
      detail: { frames: viewing.frames, view: isLatest ? 'current' : 'previous', label: isLatest ? 'current version' : 'version ' + viewing.n }
    }));
  }

  // ---------- Allocation simulation ----------
  function runAllocation() {
    if (state.loading) return;
    closePopover();
    state.loading = true;
    state.viewIndex = null;
    state.baseIndex = null;
    render();
    setTimeout(function () {
      var base = current();
      var frames = Math.min(state.framesTarget, AVAILABLE_FRAMES);
      var delta = frames - base.frames;
      var impressions, price;
      if (delta >= 0) {
        impressions = base.impressions + delta * ADDED_IMPRESSIONS_PER_FRAME;
        price = base.price + delta * ADDED_PRICE_PER_FRAME;
      } else {
        // Drop the weakest frames first: below-average impressions, average price
        impressions = base.impressions + delta * Math.round(base.impressions / base.frames * 0.82);
        price = base.price + delta * Math.round(base.price / base.frames);
      }
      var version = {
        frames: frames, impressions: impressions, price: price,
        at: new Date(), author: 'You', changes: state.pendingChanges.slice()
      };
      if (isDraft()) {
        // Drafts don't keep allocation history: replace the result in place
        version.n = 1;
        state.versions = [version];
      } else {
        version.n = current().n + 1;
        state.versions.push(version);
      }
      if (hasHistory() && !state.historyOpen) state.unseenHistory = true;
      state.allocatedTarget = state.framesTarget;
      state.pendingChanges = [];
      state.loading = false;
      state.justAdded = version.n;
      render();
      state.justAdded = null;
      if (showHistory()) {
        METRICS.forEach(function (k) {
          var r = sections[k].delta;
          r.classList.remove('ac-delta--flash'); void r.offsetWidth; r.classList.add('ac-delta--flash');
        });
      }
    }, 1300);
  }
  checkBtn.addEventListener('click', runAllocation);

  // ---------- Popovers ----------
  var pop = null;
  function closePopover() {
    if (pop) { pop.remove(); pop = null; }
    document.removeEventListener('mousedown', outsideClose, true);
  }
  function outsideClose(e) { if (pop && !pop.contains(e.target) && !e.target.closest('[data-ac-anchor]')) closePopover(); }
  function openPopover(node, anchor) {
    closePopover();
    pop = node;
    document.body.appendChild(pop);
    var r = anchor.getBoundingClientRect();
    var top = r.bottom + 6;
    var left = Math.max(8, Math.min(r.left, window.innerWidth - pop.offsetWidth - 8));
    if (top + pop.offsetHeight > window.innerHeight - 8) top = r.top - pop.offsetHeight - 6;
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
    setTimeout(function () { document.addEventListener('mousedown', outsideClose, true); });
    pop.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closePopover(); anchor.focus(); } });
  }

  // Frames target editor
  framesRow.setAttribute('data-ac-anchor', '');
  framesRow.style.cursor = 'pointer';
  framesRow.addEventListener('click', function () {
    if (state.loading) return;
    var node = el(
      '<div class="ac-pop" role="dialog" aria-label="Edit frames target">' +
        '<label for="ac-frames-input">Frames target</label>' +
        '<input id="ac-frames-input" type="number" min="1" max="999" step="1" value="' + state.framesTarget + '">' +
        '<div class="ac-pop__help">' + AVAILABLE_FRAMES + ' frames available for this deal line</div>' +
        '<div class="ac-pop__actions"><button type="button" class="ac-btn ac-btn--ghost" data-act="cancel">Cancel</button><button type="button" class="ac-btn ac-btn--primary" data-act="apply">Apply</button></div>' +
      '</div>'
    );
    var input = node.querySelector('input');
    function apply() {
      var v = parseInt(input.value, 10);
      if (!v || v < 1) { input.focus(); return; }
      if (v !== state.framesTarget) {
        state.framesTarget = v;
        state.pendingChanges = v === state.allocatedTarget ? [] : ['Frames target <b>' + state.allocatedTarget + '</b> → <b>' + v + '</b>'];
      }
      closePopover();
      render();
    }
    node.querySelector('[data-act="apply"]').addEventListener('click', apply);
    node.querySelector('[data-act="cancel"]').addEventListener('click', closePopover);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') apply(); });
    openPopover(node, framesRow);
    input.select();
  });

  // Campaign status menu
  statusBtn.setAttribute('data-ac-anchor', '');
  statusBtn.setAttribute('aria-haspopup', 'menu');
  statusBtn.addEventListener('click', function () {
    if (pop) { closePopover(); return; }
    var node = el('<div class="ac-pop ac-menu" role="menu" aria-label="Campaign status"></div>');
    STATUSES.forEach(function (s) {
      var cls = s === 'Draft' ? 'bg-yellow-100' : 'ac-chip-' + s.toLowerCase();
      var txt = s === 'Draft' ? 'text-yellow-950' : '';
      var b = el(
        '<button type="button" role="menuitemradio" aria-checked="' + (s === state.status) + '">' +
          '<div class="flex items-center group w-fit rounded-full h-6 ' + cls + '"><div class="px-1.5 py-1 flex justify-center items-center"><p class="px-0.5 body-base ' + txt + '">' + s + '</p></div></div>' +
          (s === state.status ? '<span class="ac-menu__check">' + ICON.check + '</span>' : '') +
        '</button>'
      );
      b.addEventListener('click', function () { setStatus(s); closePopover(); statusBtn.focus(); });
      node.appendChild(b);
    });
    openPopover(node, statusBtn);
    node.style.width = statusBtn.getBoundingClientRect().width + 'px';
    node.querySelector('button').focus();
  });

  function setStatus(s) {
    if (s === state.status) return;
    var wasDraft = isDraft();
    state.status = s;
    // Drafts don't keep allocation history; a non-draft starts tracking from its latest allocation.
    if (isDraft() || wasDraft) {
      var latest = current();
      latest.n = 1;
      state.versions = [latest];
      state.viewIndex = null;
      state.baseIndex = null;
      if (isDraft()) { state.historyOpen = false; ui.onHistoryToggle(false); }
    }
    render();
  }

  // ---------- Public API for branch UIs ----------
  window.VersionHistory = {
    state: state,
    el: el, ICON: ICON,
    fmt: fmt, fmtSigned: fmtSigned, fmtPct: fmtPct, fmtTime: fmtTime,
    isDraft: isDraft, isStale: isStale, hasHistory: hasHistory, showHistory: showHistory,
    current: current, lastIndex: lastIndex, viewIndex: viewIndex, baseIndex: baseIndex,
    setHistoryOpen: setHistoryOpen, view: view, compare: compare, backToCurrent: backToCurrent,
    dom: { card: card, body: body, banner: banner, historyBtn: historyBtn, overlay: overlay, mapArea: mapArea },
    start: function (branchUi) {
      ui = Object.assign(ui, branchUi || {});
      render();
    }
  };
})();
