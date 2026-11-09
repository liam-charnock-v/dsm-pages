// ---------------------------------------------------------------------------
// Sample frame (DOOH panel) data. The original page rendered its frames as a
// deck.gl/Mapbox canvas layer, which isn't present in the saved HTML
// snapshot, so this is representative demo data — clustered around three
// Portuguese regions, sized to add up to the "802" frame count shown in the
// campaign summary above.
// ---------------------------------------------------------------------------
const CHANNELS = {
  "Shopping Mall": "#7a1f2b",
  "Street Furniture": "#1f7a46",
};
const FORMATS = {
  "2M2": "#2c24c3",
  "Digital 2M2": "#f8bc1a",
};
const ALL_FILTER_COLORS = { ...CHANNELS, ...FORMATS };
const DEFAULT_COLOR = "#2c24c3";
const MUTED_COLOR = "#b9bec7";
const NO_MATCH_LABEL = "Not matching";

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function buildFrames() {
  const rand = seededRandom(42);
  const clusters = [
    { region: "Porto", lat: 41.15, lng: -8.61, count: 236, spread: 0.5 },
    { region: "Lisbon", lat: 38.72, lng: -9.14, count: 71, spread: 0.35 },
    { region: "Algarve", lat: 37.02, lng: -7.93, count: 494, spread: 0.6 },
    { region: "Coimbra", lat: 40.2, lng: -8.42, count: 1, spread: 0.1 },
  ];
  const channelKeys = Object.keys(CHANNELS);
  const formatKeys = Object.keys(FORMATS);
  const frames = [];
  let n = 0;
  clusters.forEach((cluster) => {
    for (let i = 0; i < cluster.count; i++) {
      n += 1;
      const channel = rand() < 0.55 ? channelKeys[0] : channelKeys[1];
      const format = rand() < 0.5 ? formatKeys[0] : formatKeys[1];
      frames.push({
        id: `PT-${cluster.region.slice(0, 3).toUpperCase()}-${String(n).padStart(5, "0")}`,
        region: cluster.region,
        lat: cluster.lat + (rand() - 0.5) * cluster.spread,
        lng: cluster.lng + (rand() - 0.5) * cluster.spread,
        channel,
        format,
        mediaType: format === "2M2" ? "Paper" : "Digital",
      });
    }
  });
  return frames;
}

const FRAMES = buildFrames();

// ---------------------------------------------------------------------------
// Filter state
// ---------------------------------------------------------------------------
const filterState = {
  channels: new Set(),
  formats: new Set(),
  mediaType: null,
  dateStart: null,
  dateEnd: null,
};

const CAMPAIGN_START = new Date(2028, 7, 16);
const CAMPAIGN_END = new Date(2028, 7, 22);

function formatDate(d) {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Whether the channel/format "highlight vs. grey out" colour system is
// active at all — it only kicks in once one of those two facets has a
// selection; media type and date remain plain visibility filters.
function colorModeActive() {
  return filterState.channels.size > 0 || filterState.formats.size > 0;
}

// The set of currently-selected filter values this specific frame matches,
// as {label, color} pairs — at most one from channel, one from format, so
// 0, 1 or 2 entries.
function matchEntriesFor(frame) {
  const entries = [];
  if (filterState.channels.size && filterState.channels.has(frame.channel)) {
    entries.push({ label: frame.channel, color: CHANNELS[frame.channel] });
  }
  if (filterState.formats.size && filterState.formats.has(frame.format)) {
    entries.push({ label: frame.format, color: FORMATS[frame.format] });
  }
  return entries;
}

function frameVisible(frame) {
  if (filterState.mediaType && frame.mediaType !== filterState.mediaType) return false;
  return true;
}

// Builds a CSS conic-gradient() pie from an array of [label, count] tallies —
// shared by the "multiple filters apply" marker ring and cluster ring.
function buildConicGradient(tally) {
  const total = tally.reduce((sum, [, count]) => sum + count, 0);
  let acc = 0;
  const stops = tally.map(([label, count]) => {
    const start = (acc / total) * 360;
    acc += count;
    const end = (acc / total) * 360;
    const color = label === NO_MATCH_LABEL ? MUTED_COLOR : ALL_FILTER_COLORS[label];
    return `${color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

function breakdownRow(label, count) {
  const color = label === NO_MATCH_LABEL ? MUTED_COLOR : ALL_FILTER_COLORS[label];
  return `<div class="frame-tooltip__row"><span class="frame-tooltip__dot" style="background:${color}"></span>${label}${
    count != null ? `: ${count}` : ""
  }</div>`;
}

// ---------------------------------------------------------------------------
// Map + clustering
// ---------------------------------------------------------------------------
const map = L.map("campaign-map", { zoomControl: false });

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://carto.com/about-carto/">CARTO</a>, &copy; <a href="http://www.openstreetmap.org/about/">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);

const clusterGroup = L.markerClusterGroup({
  maxClusterRadius: 60,
  iconCreateFunction: (cluster) => {
    const children = cluster.getAllChildMarkers();
    const count = children.length;
    const size = Math.min(56, 34 + Math.log2(count) * 6);

    if (!colorModeActive()) {
      cluster.unbindTooltip();
      return L.divIcon({
        html: `<span class="frame-cluster__dot" style="width:${size}px;height:${size}px;background:${DEFAULT_COLOR}">${count}</span>`,
        className: "frame-cluster",
        iconSize: [size, size],
      });
    }

    // Tally how many children fall into each matched category (a child that
    // matches both an active channel and an active format is counted once
    // in each — it genuinely belongs to both slices of the pie), plus
    // whichever match nothing at all.
    const tally = {};
    children.forEach((child) => {
      const entries = child.__matchEntries;
      if (entries.length === 0) {
        tally[NO_MATCH_LABEL] = (tally[NO_MATCH_LABEL] || 0) + 1;
      } else {
        entries.forEach((e) => {
          tally[e.label] = (tally[e.label] || 0) + 1;
        });
      }
    });
    const tallyEntries = Object.entries(tally);
    const categories = tallyEntries.filter(([label]) => label !== NO_MATCH_LABEL);

    let html;
    if (categories.length === 1 && !tally[NO_MATCH_LABEL]) {
      // Every child matches the same single filter — same solid highlight
      // treatment as an individual matching frame.
      const color = ALL_FILTER_COLORS[categories[0][0]];
      html = `<span class="frame-cluster__dot" style="width:${size}px;height:${size}px;background:${color}">${count}</span>`;
      cluster.unbindTooltip();
    } else if (categories.length === 0) {
      // Nothing in this cluster matches any active filter.
      html = `<span class="frame-cluster__dot frame-cluster__dot--muted" style="width:${size}px;height:${size}px;background:${MUTED_COLOR}">${count}</span>`;
      cluster.unbindTooltip();
    } else {
      // Mixed cluster: grey centre, pie-chart keyline of the categories present.
      const gradient = buildConicGradient(tallyEntries);
      const innerSize = Math.max(size - 8, 18);
      html = `<span class="frame-cluster__ring" style="width:${size}px;height:${size}px;background:${gradient}"><span class="frame-cluster__dot" style="width:${innerSize}px;height:${innerSize}px;background:${MUTED_COLOR}">${count}</span></span>`;
      cluster.bindTooltip(
        `<div class="frame-tooltip"><strong>${count} frames</strong>${tallyEntries
          .map(([label, c]) => breakdownRow(label, c))
          .join("")}</div>`,
        { direction: "top", sticky: true, className: "frame-tooltip-wrapper" }
      );
    }

    return L.divIcon({ html, className: "frame-cluster", iconSize: [size, size] });
  },
});
map.addLayer(clusterGroup);

const allFramesBounds = L.latLngBounds(FRAMES.map((f) => [f.lat, f.lng]));
// Deferred: the map container's final size depends on the surrounding flex
// layout settling (webfont load, ag-Grid row measurement), so fitting
// bounds synchronously at script-eval time can compute against a stale
// (often zero) container size and produce a wildly wrong zoom level.
window.addEventListener("load", () => {
  map.invalidateSize();
  map.fitBounds(allFramesBounds, { padding: [20, 20] });
});

function frameIcon(entries) {
  let html;
  if (entries.length === 2) {
    // Matches more than one active filter — grey centre, keyline split
    // evenly into a pie of the matching colours.
    const gradient = buildConicGradient(entries.map((e) => [e.label, 1]));
    html = `<span class="frame-marker__ring" style="background:${gradient}"><span class="frame-marker__center"></span></span>`;
  } else {
    const color = entries.length === 1 ? entries[0].color : MUTED_COLOR;
    const mutedClass = entries.length === 0 ? " frame-marker__dot--muted" : "";
    html = `<span class="frame-marker__dot${mutedClass}" style="background:${color}"></span>`;
  }
  return L.divIcon({ className: "frame-marker", html, iconSize: [16, 16], iconAnchor: [8, 8] });
}

function rebuildMarkers() {
  clusterGroup.clearLayers();
  const active = colorModeActive();
  const visible = FRAMES.filter(frameVisible);
  const markers = visible.map((frame) => {
    const entries = active ? matchEntriesFor(frame) : [];
    const marker = L.marker([frame.lat, frame.lng], { icon: frameIcon(entries) });
    marker.__matchEntries = entries;
    marker.bindPopup(
      `<div class="frame-popup"><strong>${frame.region}</strong><br>${frame.channel} &middot; ${frame.format}<br><span class="frame-popup__id">${frame.id}</span></div>`
    );
    if (entries.length > 1) {
      marker.bindTooltip(
        `<div class="frame-tooltip"><strong>Multiple filters match</strong>${entries
          .map((e) => breakdownRow(e.label))
          .join("")}</div>`,
        { direction: "top", sticky: true, className: "frame-tooltip-wrapper" }
      );
    }
    return marker;
  });
  clusterGroup.addLayers(markers);
}

rebuildMarkers();

document.querySelector('[data-test-id="zoom-in-button"]')?.addEventListener("click", () => map.zoomIn());
document.querySelector('[data-test-id="zoom-out-button"]')?.addEventListener("click", () => map.zoomOut());

// ---------------------------------------------------------------------------
// Filter dropdown chrome — open/close, outside click, one at a time
// ---------------------------------------------------------------------------
const triggers = document.querySelectorAll("[data-filter-trigger]");
const panels = document.querySelectorAll("[data-filter-panel]");

function closeAllPanels() {
  panels.forEach((p) => (p.hidden = true));
  triggers.forEach((t) => t.classList.remove("filter-trigger--open"));
}

triggers.forEach((trigger) => {
  const name = trigger.dataset.filterTrigger;
  const panel = document.querySelector(`[data-filter-panel="${name}"]`);
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !panel.hidden;
    closeAllPanels();
    if (!isOpen) {
      panel.hidden = false;
      trigger.classList.add("filter-trigger--open");
    }
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-filter-panel]") && !e.target.closest("[data-filter-trigger]")) {
    closeAllPanels();
  }
});

// ---------------------------------------------------------------------------
// Media type panel (single-select)
// ---------------------------------------------------------------------------
const mediaTypePanel = document.querySelector('[data-filter-panel="mediaType"]');
mediaTypePanel.className = "filter-panel filter-panel--list";
mediaTypePanel.innerHTML = ["Paper", "Digital"]
  .map((opt) => `<button type="button" class="filter-panel__option" data-media-option="${opt}">${opt}</button>`)
  .join("");
mediaTypePanel.querySelectorAll("[data-media-option]").forEach((btn) => {
  btn.addEventListener("click", () => {
    filterState.mediaType = filterState.mediaType === btn.dataset.mediaOption ? null : btn.dataset.mediaOption;
    closeAllPanels();
    onFiltersChanged();
  });
});

// ---------------------------------------------------------------------------
// Channel / Format panels (multi-select checkboxes)
// ---------------------------------------------------------------------------
function buildCheckboxPanel(panelName, colorMap, stateSet) {
  const panel = document.querySelector(`[data-filter-panel="${panelName}"]`);
  panel.className = "filter-panel filter-panel--list";
  panel.innerHTML = Object.entries(colorMap)
    .map(
      ([label, color]) => `
      <label class="filter-panel__option filter-panel__option--checkbox">
        <input type="checkbox" value="${label}" autocomplete="off">
        <span class="filter-panel__dot" style="background:${color}"></span>
        ${label}
      </label>`
    )
    .join("");
  panel.querySelectorAll("input[type=checkbox]").forEach((cb) => {
    cb.checked = stateSet.has(cb.value);
    cb.addEventListener("change", () => {
      if (cb.checked) stateSet.add(cb.value);
      else stateSet.delete(cb.value);
      onFiltersChanged();
    });
  });
}

buildCheckboxPanel("channel", CHANNELS, filterState.channels);
buildCheckboxPanel("format", FORMATS, filterState.formats);

// ---------------------------------------------------------------------------
// Date range panel (calendar)
// ---------------------------------------------------------------------------
const datePanel = document.querySelector('[data-filter-panel="date"]');
datePanel.className = "filter-panel filter-panel--date";
const calState = { viewYear: 2028, viewMonth: 7 }; // August 2028, matches the campaign window

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function inCampaignRange(date) {
  return date >= CAMPAIGN_START && date <= CAMPAIGN_END;
}

function inSelectedRange(date) {
  if (!filterState.dateStart) return false;
  const end = filterState.dateEnd || filterState.dateStart;
  return date >= filterState.dateStart && date <= end;
}

function renderCalendar() {
  const { viewYear, viewMonth } = calState;
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const gridStart = new Date(viewYear, viewMonth, 1 - startWeekday);

  const weeks = [];
  let cursor = new Date(gridStart);
  for (let w = 0; w < 6; w++) {
    const row = { week: isoWeek(cursor), days: [] };
    for (let d = 0; d < 7; d++) {
      row.days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(row);
    if (cursor.getMonth() !== viewMonth && cursor > firstOfMonth) break;
  }

  const dayCell = (date) => {
    const outside = date.getMonth() !== viewMonth;
    const classes = ["date-panel__day"];
    if (outside) classes.push("date-panel__day--outside");
    if (inCampaignRange(date)) classes.push("date-panel__day--campaign");
    if (inSelectedRange(date)) classes.push("date-panel__day--in-range");
    if (sameDay(date, filterState.dateStart) || sameDay(date, filterState.dateEnd)) {
      classes.push("date-panel__day--endpoint");
    }
    return `<td class="${classes.join(" ")}" data-date="${date.toISOString()}">${date.getDate()}</td>`;
  };

  datePanel.innerHTML = `
    <div class="date-panel__fields">
      <div class="date-panel__field ${!filterState.dateStart ? "date-panel__field--active" : ""}">
        <div class="date-panel__field-label">Start date</div>
        <div class="date-panel__field-value">${filterState.dateStart ? formatDate(filterState.dateStart) : "Select date"}</div>
      </div>
      <div class="date-panel__field">
        <div class="date-panel__field-label">End date</div>
        <div class="date-panel__field-value">${filterState.dateEnd ? formatDate(filterState.dateEnd) : "Select date"}</div>
      </div>
    </div>
    <div class="date-panel__nav">
      <button type="button" class="date-panel__nav-btn" data-cal-prev>&lsaquo;</button>
      <span class="date-panel__nav-label">${MONTH_NAMES[viewMonth]} ${viewYear}</span>
      <button type="button" class="date-panel__nav-btn" data-cal-next>&rsaquo;</button>
    </div>
    <table class="date-panel__grid">
      <thead><tr><th>WK</th><th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th></tr></thead>
      <tbody>
        ${weeks
          .map((row) => `<tr><td class="date-panel__week">${row.week}</td>${row.days.map(dayCell).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>
  `;

  datePanel.querySelector("[data-cal-prev]").addEventListener("click", (e) => {
    e.stopPropagation();
    calState.viewMonth -= 1;
    if (calState.viewMonth < 0) { calState.viewMonth = 11; calState.viewYear -= 1; }
    renderCalendar();
  });
  datePanel.querySelector("[data-cal-next]").addEventListener("click", (e) => {
    e.stopPropagation();
    calState.viewMonth += 1;
    if (calState.viewMonth > 11) { calState.viewMonth = 0; calState.viewYear += 1; }
    renderCalendar();
  });
  datePanel.querySelectorAll(".date-panel__day:not(.date-panel__day--outside)").forEach((cell) => {
    cell.addEventListener("click", (e) => {
      e.stopPropagation();
      const date = new Date(cell.dataset.date);
      if (!filterState.dateStart || filterState.dateEnd) {
        filterState.dateStart = date;
        filterState.dateEnd = null;
      } else if (date < filterState.dateStart) {
        filterState.dateStart = date;
      } else {
        filterState.dateEnd = date;
      }
      renderCalendar();
      onFiltersChanged();
      if (filterState.dateStart && filterState.dateEnd) closeAllPanels();
    });
  });
}
renderCalendar();

// ---------------------------------------------------------------------------
// Chips + "Clear all"
// ---------------------------------------------------------------------------
const chipsContainer = document.querySelector('[data-test-id="filter-chips"] .flex-wrap');
const clearAllBtn = document.querySelector("[data-clear-all]");

function chip(label, color, textColor, onRemove) {
  const el = document.createElement("span");
  el.className = "filter-chip";
  el.style.background = color;
  el.style.color = textColor;
  el.innerHTML = `${label} <button type="button" class="filter-chip__remove" aria-label="Remove ${label}">&times;</button>`;
  el.querySelector("button").addEventListener("click", onRemove);
  return el;
}

function renderChips() {
  chipsContainer.innerHTML = "";
  filterState.channels.forEach((c) => {
    chipsContainer.appendChild(
      chip(c, CHANNELS[c], "#fff", () => {
        filterState.channels.delete(c);
        document.querySelector(`[data-filter-panel="channel"] input[value="${c}"]`).checked = false;
        onFiltersChanged();
      })
    );
  });
  filterState.formats.forEach((f) => {
    chipsContainer.appendChild(
      chip(f, FORMATS[f], f === "Digital 2M2" ? "#3a2f00" : "#fff", () => {
        filterState.formats.delete(f);
        document.querySelector(`[data-filter-panel="format"] input[value="${f}"]`).checked = false;
        onFiltersChanged();
      })
    );
  });
  if (filterState.mediaType) {
    chipsContainer.appendChild(
      chip(filterState.mediaType, "#e5e7eb", "#1f2937", () => {
        filterState.mediaType = null;
        onFiltersChanged();
      })
    );
  }
  if (filterState.dateStart) {
    const label = `${formatDate(filterState.dateStart)}${filterState.dateEnd ? " - " + formatDate(filterState.dateEnd) : ""}`;
    chipsContainer.appendChild(
      chip(label, "#e5e7eb", "#1f2937", () => {
        filterState.dateStart = null;
        filterState.dateEnd = null;
        renderCalendar();
        onFiltersChanged();
      })
    );
  }

  const anyActive =
    filterState.channels.size || filterState.formats.size || filterState.mediaType || filterState.dateStart;
  clearAllBtn.hidden = !anyActive;
}

clearAllBtn.addEventListener("click", () => {
  filterState.channels.clear();
  filterState.formats.clear();
  filterState.mediaType = null;
  filterState.dateStart = null;
  filterState.dateEnd = null;
  document.querySelectorAll('[data-filter-panel="channel"] input, [data-filter-panel="format"] input').forEach((cb) => (cb.checked = false));
  renderCalendar();
  onFiltersChanged();
});

// ---------------------------------------------------------------------------
// Trigger label text
// ---------------------------------------------------------------------------
function updateTriggerLabels() {
  document.querySelector('[data-filter-trigger="mediaType"] [data-filter-label]').textContent =
    filterState.mediaType || "Select media type";
  document.querySelector('[data-filter-trigger="channel"] [data-filter-label]').textContent =
    filterState.channels.size ? `Channel  ${filterState.channels.size}` : "Select channel";
  document.querySelector('[data-filter-trigger="format"] [data-filter-label]').textContent =
    filterState.formats.size ? `Format  ${filterState.formats.size}` : "Select format";
  document.querySelector('[data-filter-trigger="date"] [data-filter-label]').textContent =
    filterState.dateStart && filterState.dateEnd
      ? `${formatDate(filterState.dateStart)} - ${formatDate(filterState.dateEnd)}`
      : "Select date range";
}

function onFiltersChanged() {
  updateTriggerLabels();
  renderChips();
  rebuildMarkers();
}

onFiltersChanged();
