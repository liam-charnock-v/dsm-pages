# DSM Pages

Prototypes, static page snapshots and walkthrough videos for the **DSM (Trading Manager / planner)** design work, handed over by Liam Charnock in November 2026.

Most of this repo is **clickable prototypes**. They are not production code. They come in two kinds:

- **Saved-page prototypes**: real DSM screens saved from the browser (UAT), with prototype JavaScript and CSS added on top. They have no backend and every interaction runs in the page.
- **dsm-swap**: a standalone React app built in Figma Make.

> **Keep this repo private.** The saved pages contain copies of VIOOH's production front-end bundles, a Google Maps browser key and UAT campaign data.

---

## Quick start

| I want to… | Do this |
|---|---|
| See the allocation-history prototypes | Open `dsm-campaign-allocation-compare.html`, `dsm-campaign-version-timeline.html` or `dsm-campaign-version-stepper.html` in Chrome |
| See the Swap prototype | Watch `dsm-swap/videos/`, or run it locally (see [dsm-swap](#dsm-swap--frame-swap-prototype)) |
| Watch walkthroughs of the allocation-history prototypes | `walkthroughs/videos/` |
| Share a prototype with someone outside VIOOH | Use the cleaned copy in `campaign-versioning/` (see [Publishing](#publishing-the-allocation-history-prototypes)) |

The saved pages open straight from disk (`file://`), and no server is needed. Maps and fonts load from the internet, so without a connection those areas stay blank.

---

## What's in each folder

### Allocation history / campaign versioning (Oct 2026)

This explores how a planner sees **what changed in a campaign's allocation** after editing a non-draft campaign, for example after raising the frames target and re-checking allocation.

| Path | What it is |
|---|---|
| `dsm-campaign.html` | The base snapshot of the DSM campaign planner page, saved from UAT. |
| `dsm-campaign-allocation-compare.html` | **MVP**: compare the current allocation with the previous one. |
| `dsm-campaign-version-timeline.html` | **Option A**: full version history in a timeline side panel. |
| `dsm-campaign-version-stepper.html` | **Option B**: step through versions with arrows. |
| `dsm-campaign_files/` | Shared assets for the four pages above. The prototype code lives in two sub-folders:<br>• `prototype/`: MVP compare logic (`allocation-compare.js/.css`), a Leaflet stand-in for the map (`map.js`) and snapshot CSS fixes.<br>• `version-history/`: `core.js` (shared data and state) plus `timeline.*` and `stepper.*`, which register their UI via `VersionHistory.start(...)`. |
| `campaign-versioning/` | **Generated output.** A public-safe copy of the three prototypes for Vercel. Don't edit it by hand. |
| `build-campaign-versioning.py` | Builds `campaign-versioning/` (see below). |
| `walkthroughs/` | Playwright script that records captioned MP4 walkthroughs of the three prototypes, plus the recorded videos in `walkthroughs/videos/`. |

The figures in the prototypes are hard-coded at the top of `prototype/allocation-compare.js` and `version-history/core.js`, including available frames, impressions per frame and price per frame. Edit them there.

### dsm-swap: frame swap prototype (Nov 2026)

`dsm-swap/` is a **React + Vite + Tailwind** app made in **Figma Make**. It prototypes swapping frames on a deal line, including a V2 that suggests frames. It uses Madrid demo data.

- Entry point: `src/app/App.tsx`. Swap-specific UI and data are in `src/app/components/swap/` (`swapData.ts` holds the deal line, targets and metrics).
- `videos/`: V1 walkthrough, with and without voiceover.
- `dist/`: the last production build.
- The git history of the prototype is preserved in this repo: run `git log -- dsm-swap`.

To run it locally (needs Node 22+ and pnpm):

```bash
cd dsm-swap
pnpm install
pnpm dev        # http://localhost:8443
pnpm build      # writes dist/
```

The build config (`vite.figma.config.ts`) is Figma Make's wrapper and reads `.figma/make/*`, so keep that folder. For bigger changes it may be easier to re-import the project into Figma Make.

### Search service (Aug–Oct 2026)

| Path | What it is |
|---|---|
| `search-service-v01/` | First search-service prototype: a self-contained saved page (`index.html`, with its assets alongside). |
| `dsm-search-service-v02.html` + `dsm-search-service-v02_files/` | Second iteration. |

### Other snapshots and experiments

| Path | What it is |
|---|---|
| `vtm-static/` (+ `vtm-static.zip`) | Static rebuild of the **VIOOH Trading Manager campaign-management grid**, with a working client-side "Add filter" interaction (`interactions.js`). |
| `VIOOH Trading Manager.html` | The original saved page `vtm-static` was built from. Its `_files` folder wasn't kept, so it renders without styling. Use `vtm-static/` instead. |
| `test-campaign-dsm.html` + `test-campaign-dsm_files/` | Saved DSM planner page for a test campaign. |
| `test-campaign-dsm-static/` | Lightweight static rebuild of that page, with a Leaflet map showing the deal line's frames around Lisbon. |
| `cpp3-example/` | Saved example campaign plan page from UAT (open `CPP3_files/index.html`). |
| `dsm-swap.zip` | Zip snapshot of `dsm-swap` source (without `node_modules`). |

---

## Publishing the allocation-history prototypes

`build-campaign-versioning.py` copies only the files the three prototypes need into `campaign-versioning/`. It also cleans each page by removing the internal UAT address and replacing the real planner's name with "Demo Planner". It fails if either is still present.

```bash
python3 build-campaign-versioning.py
cd campaign-versioning && npx vercel deploy --prod
```

Pages: `/` (MVP), `/timeline`, `/stepper`.

The Vercel project link (`campaign-versioning/.vercel/`) isn't in the repo because it was tied to Liam's Vercel account. The first `npx vercel deploy` will ask you to link a project on your own account.

## Re-recording the walkthrough videos

```bash
cd walkthroughs
npm install                  # Playwright + ffmpeg
npx playwright install chromium
npm run record               # all three
npm run record -- timeline   # or one: mvp | timeline | stepper
```

Each walkthrough is a list of steps (captions and timings) in `record.mjs`. Edit them and re-run. The videos are written to `walkthroughs/videos/`.

---

## Notes

- **Not in the repo:** `node_modules/` (reinstall with `pnpm install` / `npm install`), `.DS_Store` files and the Vercel link above.
- **Saved pages are frozen.** They embed the DSM front-end bundles from when they were saved, so they won't pick up later changes to the real app. Rebuild a snapshot by saving the page again from UAT in Chrome ("Save page as… → Webpage, Complete").
- **Hashed file names** (`main.<hash>.js`, `vendor.<hash>.css`) are the app's own bundles. Prototype code is always in clearly named files, such as `prototype/`, `version-history/`, `interactions.js` and `map.js`.
