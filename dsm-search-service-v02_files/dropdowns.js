// Static re-implementation of the campaign filter toolbar (Jira-style): search (name or ID),
// Date range, Status, Media type, campaigns per page, and "+ Add" for the extra filters.
// Status options/defaults mirror the app bundle (main.*.js): statuses `pc`, default `mc`
// (everything except Draft). Extra filters mirror the app's "Add filter" menu.
(function () {
  const STATUSES = [
    { code: 'DRAFT', name: 'Draft' },
    { code: 'MIXED', name: 'Mixed' },
    { code: 'PROPOSAL', name: 'Proposal' },
    { code: 'OPTION', name: 'Option' },
    { code: 'CONFIRMED', name: 'Confirmed' },
    { code: 'LIVE', name: 'Live' },
    { code: 'CANCELLED', name: 'Cancelled' },
    { code: 'ENDED', name: 'Ended' },
  ];
  const DEFAULT_STATUSES = STATUSES.filter((s) => s.code !== 'DRAFT').map((s) => s.code);
  const MEDIA_TYPES = [
    { code: 'DIGITAL', name: 'Digital' },
    { code: 'PAPER', name: 'Paper' },
  ];
  // Filters offered by "+ Add", in the app's order. `col` is the table column holding the value;
  // Created by and Drop date have no column in this table, so they can't narrow the rows here.
  const EXTRA_FILTERS = [
    { key: 'salesTeam', label: 'Sales team', type: 'list', col: 'salesTeam' },
    { key: 'salesPerson', label: 'Sales person', type: 'list', col: 'salesPerson' },
    { key: 'adminPerson', label: 'Admin person', type: 'list', col: 'adminPerson' },
    { key: 'advertiser', label: 'Advertiser', type: 'list', col: 'advertiser' },
    { key: 'brand', label: 'Brand', type: 'list', col: 'brand' },
    { key: 'productCategory', label: 'Product category', type: 'list', col: 'productCategory' },
    { key: 'agency', label: 'Agency', type: 'list', col: 'agency' },
    { key: 'specialist', label: 'Specialist', type: 'list', col: 'specialist' },
    { key: 'updatedBy', label: 'Updated by', type: 'list', col: 'updatedBy' },
    { key: 'createdBy', label: 'Created by', type: 'list', col: null },
    { key: 'createdDate', label: 'Created date', type: 'date', col: 'createdAt' },
    { key: 'dropDate', label: 'Drop date', type: 'date', col: null },
  ];

  const PAGE_SIZES = [10, 20, 35, 50];
  const DEFAULT_PAGE_SIZE = 50;
  const TOTAL_CAMPAIGNS = 1286; // from the snapshot's pagination ("1 to 50 of 1 286")

  const defaults = () => ({ search: '', statuses: [...DEFAULT_STATUSES], mediaTypes: [], from: null, to: null, extra: [], outOfCharge: false });
  const state = { ...defaults(), pageSize: DEFAULT_PAGE_SIZE };
  // state.extra: [{ def, values: [] }] for list filters, [{ def, from, to }] for date filters, in added order
  const isDefault = {
    search: () => state.search.trim() === '',
    statuses: () => state.statuses.join() === DEFAULT_STATUSES.join(),
    mediaTypes: () => state.mediaTypes.length === 0,
    dates: () => !state.from,
    extra: () => state.extra.length === 0,
    outOfCharge: () => !state.outOfCharge,
  };

  const CHECK_SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 ml-px mt-px"><path d="M3.5 8.5l3 3 6-7"/></svg>';
  const CLEAR_SVG = '<svg viewBox="0 0 256 256" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>';
  const SEARCH_SVG = '<svg viewBox="0 0 256 256" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>';
  const DOWN_SVG = '<svg class="fbar-chevron" viewBox="0 0 256 256" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/></svg>';
  const CHEVRON = (dir) => `<svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor"><path d="${dir === 'left'
    ? 'M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z'
    : 'M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z'}"/></svg>`;
  const escapeHtml = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- popover plumbing shared by every toolbar button ----------
  const popovers = [];
  document.addEventListener('mousedown', (e) => [...popovers].forEach((p) => !p.root.contains(e.target) && p.close()));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = popovers.find((p) => !p.panel.hidden);
    if (open) { open.close(); open.button.focus(); }
  });

  function popover(root, { onOpen, onClose, className = '' }) {
    const button = root.querySelector('.fbar-btn');
    const panel = document.createElement('div');
    panel.className = `fbar-menu ${className}`;
    panel.hidden = true;
    root.appendChild(panel);
    const api = {
      root, button, panel,
      isOpen: () => !panel.hidden,
      open() {
        [...popovers].forEach((p) => p !== api && p.close());
        onOpen?.();
        panel.hidden = false;
        button.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        panel.querySelector('input')?.focus();
      },
      close() {
        if (panel.hidden) return;
        panel.hidden = true;
        button.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        onClose?.();
      },
      destroy() { popovers.splice(popovers.indexOf(api), 1); },
    };
    button.addEventListener('click', (e) => {
      if (e.target.closest('.fbar-btn-clear')) return;
      panel.hidden ? api.open() : api.close();
    });
    panel.addEventListener('mousedown', (e) => { if (!e.target.closest('input')) e.preventDefault(); });
    popovers.push(api);
    return api;
  }
  const byTestId = (id) => document.querySelector(`[data-test-id="${id}"]`);

  // Up/Down moves through options, Enter picks; used by the searchable menus
  function listKeyboard(panel, input, itemSelector, onPick) {
    input.addEventListener('keydown', (e) => {
      const items = [...panel.querySelectorAll(itemSelector)];
      if (!items.length) return;
      let i = items.findIndex((el) => el.classList.contains('is-focused'));
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        items[i]?.classList.remove('is-focused');
        i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[i].classList.add('is-focused');
        items[i].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onPick(items[Math.max(i, 0)]);
      }
    });
  }

  // ---------- checkbox list (Status, Media type, added list filters) ----------
  const checkbox = (on) => (on
    ? `<div class="border rounded shadow-inner-sm shrink-0 w-4 h-4 bg-primary-700 border-transparent text-white">${CHECK_SVG}</div>`
    : '<div class="border border-neutral-300 rounded shadow-inner-sm shrink-0 w-4 h-4 bg-neutral-50 border-neutral-200"></div>');

  function checkboxFilter(root, { options, get, set, isDefaultValue, searchPlaceholder, footer, onClose }) {
    const pop = popover(root, { onClose });
    const count = pop.button.querySelector('.fbar-count');
    pop.panel.setAttribute('role', 'listbox');
    pop.panel.setAttribute('aria-multiselectable', 'true');
    let query = '';
    pop.panel.innerHTML = `${searchPlaceholder ? `<div class="fbar-menu-search">${SEARCH_SVG}<input type="text" placeholder="${searchPlaceholder}" aria-label="${searchPlaceholder}"></div>` : ''}
      <div class="fbar-options"></div>${footer || ''}`;
    const list = pop.panel.querySelector('.fbar-options');
    const input = pop.panel.querySelector('.fbar-menu-search input');

    function render() {
      const selected = get();
      count.hidden = selected.length === 0;
      count.textContent = selected.length;
      pop.button.classList.toggle('is-active', !isDefaultValue());
      const q = query.trim().toLowerCase();
      const shown = options().filter((o) => !q || o.name.toLowerCase().includes(q));
      list.innerHTML = shown.length
        ? shown.map((o) => {
          const on = selected.includes(o.code);
          return `<div class="fbar-option" role="option" aria-selected="${on}" data-code="${escapeHtml(o.code)}">
            <div role="checkbox" aria-checked="${on}" data-test-id="base-select-checkbox">${checkbox(on)}</div><span>${escapeHtml(o.name)}</span></div>`;
        }).join('')
        : `<div class="fbar-empty">${options().length ? 'No matches' : 'No values in this view'}</div>`;
    }
    function toggle(code) {
      const selected = get();
      set(selected.includes(code)
        ? selected.filter((c) => c !== code)
        : options().map((o) => o.code).filter((c) => c === code || selected.includes(c)));
      update();
    }
    list.addEventListener('click', (e) => {
      const opt = e.target.closest('[data-code]');
      if (opt) toggle(opt.dataset.code);
    });
    if (input) {
      input.addEventListener('input', () => { query = input.value; render(); });
      listKeyboard(list, input, '.fbar-option', (el) => toggle(el.dataset.code));
    }
    render();
    return { render, pop };
  }

  const status = checkboxFilter(byTestId('multiple-status-select'), {
    options: () => STATUSES, isDefaultValue: isDefault.statuses,
    get: () => state.statuses, set: (v) => { state.statuses = v; },
  });
  const media = checkboxFilter(byTestId('campaign-media-type-select'), {
    options: () => MEDIA_TYPES, isDefaultValue: isDefault.mediaTypes,
    get: () => state.mediaTypes, set: (v) => { state.mediaTypes = v; },
  });

  // ---------- date range picker (main Date range and added date filters) ----------
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  const sameDay = (a, b) => a && b && a.getTime() === b.getTime();
  const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const PRESETS = [
    { label: 'Next 7 days', range: () => [today, addDays(today, 6)] },
    { label: 'Next 30 days', range: () => [today, addDays(today, 29)] },
    { label: 'Last 7 days', range: () => [addDays(today, -6), today] },
    { label: 'Last 30 days', range: () => [addDays(today, -29), today] },
    { label: 'This month', range: () => [new Date(today.getFullYear(), today.getMonth(), 1), new Date(today.getFullYear(), today.getMonth() + 1, 0)] },
    { label: 'This year', range: () => [new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31)] },
  ];

  function dateFilter(root, { label, get, set, footer, onClose }) {
    let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let draft = { from: null, to: null };
    let hover = null;
    const pop = popover(root, {
      className: 'date-range-pop',
      onClose,
      onOpen() {
        draft = { ...get() };
        const start = draft.from || today;
        viewMonth = new Date(start.getFullYear(), start.getMonth(), 1);
        renderCalendar();
      },
    });
    const labelEl = pop.button.querySelector('.fbar-label');

    function monthHtml(first) {
      const y = first.getFullYear(), m = first.getMonth();
      const offset = (first.getDay() + 6) % 7; // weeks start Monday
      const days = new Date(y, m + 1, 0).getDate();
      const end = draft.to || (draft.from && hover && hover > draft.from ? hover : null);
      let cells = '';
      for (let i = 0; i < offset; i++) cells += '<span></span>';
      for (let d = 1; d <= days; d++) {
        const date = new Date(y, m, d);
        const cls = ['day'];
        if (sameDay(date, today)) cls.push('is-today');
        if (sameDay(date, draft.from)) cls.push('is-start');
        if (sameDay(date, end)) cls.push('is-end');
        if (draft.from && end && date > draft.from && date < end) cls.push('in-range');
        cells += `<button type="button" class="${cls.join(' ')}" data-date="${date.getTime()}">${d}</button>`;
      }
      return `<div class="cal-month"><div class="cal-title">${MONTHS[m]} ${y}</div>
        <div class="cal-grid cal-weekdays">${['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((w) => `<span>${w}</span>`).join('')}</div>
        <div class="cal-grid">${cells}</div></div>`;
    }

    function renderCalendar() {
      const next = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
      const summary = draft.from ? `${fmt(draft.from)} – ${draft.to ? fmt(draft.to) : '…'}` : 'Select a start date';
      pop.panel.innerHTML = `
        <div class="date-range-body">
          <div class="date-presets">${PRESETS.map((p, i) => `<button type="button" class="preset" data-preset="${i}">${p.label}</button>`).join('')}</div>
          <div class="date-cal">
            <div class="cal-nav">
              <button type="button" class="cal-arrow" data-nav="-1" aria-label="Previous month">${CHEVRON('left')}</button>
              <button type="button" class="cal-arrow" data-nav="1" aria-label="Next month">${CHEVRON('right')}</button>
            </div>
            <div class="cal-months">${monthHtml(viewMonth)}${monthHtml(next)}</div>
          </div>
        </div>
        <div class="date-range-footer">
          <span>${summary}</span>
          <div class="date-range-actions">
            <button type="button" data-action="clear" class="fbar-btn">Clear</button>
            <button type="button" data-action="apply" class="fbar-btn fbar-primary" ${draft.from && draft.to ? '' : 'disabled'}>Apply</button>
          </div>
        </div>${footer || ''}`;
    }

    function render() {
      const { from, to } = get();
      labelEl.textContent = from ? `${label === 'Date range' ? '' : `${label}: `}${fmt(from)} – ${fmt(to)}` : label;
      pop.button.classList.toggle('is-active', !!from);
      let clearEl = pop.button.querySelector('.fbar-btn-clear');
      if (from && !clearEl) {
        clearEl = document.createElement('span');
        clearEl.className = 'fbar-btn-clear';
        clearEl.setAttribute('role', 'button');
        clearEl.setAttribute('aria-label', `Clear ${label.toLowerCase()}`);
        clearEl.innerHTML = CLEAR_SVG;
        pop.button.appendChild(clearEl);
      } else if (!from && clearEl) clearEl.remove();
      pop.button.querySelector('.fbar-chevron').style.display = from ? 'none' : '';
    }

    pop.button.addEventListener('click', (e) => {
      if (!e.target.closest('.fbar-btn-clear')) return;
      set({ from: null, to: null });
      pop.close();
      update();
    });
    pop.panel.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      const day = e.target.closest('[data-date]');
      const preset = e.target.closest('[data-preset]');
      const action = e.target.closest('[data-action]');
      if (nav) viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + Number(nav.dataset.nav), 1);
      else if (day) {
        const d = new Date(Number(day.dataset.date));
        if (!draft.from || draft.to || d < draft.from) draft = { from: d, to: null };
        else draft.to = d;
      } else if (preset) {
        const [from, to] = PRESETS[preset.dataset.preset].range();
        draft = { from, to };
        viewMonth = new Date(from.getFullYear(), from.getMonth(), 1);
      } else if (action?.dataset.action === 'clear') draft = { from: null, to: null };
      else if (action?.dataset.action === 'apply') {
        set({ ...draft });
        pop.close();
        update();
        return;
      } else return;
      renderCalendar();
    });
    pop.panel.addEventListener('mouseover', (e) => {
      const day = e.target.closest('[data-date]');
      if (!day || !draft.from || draft.to || Number(day.dataset.date) === hover?.getTime()) return;
      hover = new Date(Number(day.dataset.date));
      renderCalendar();
    });
    return { render, pop };
  }

  const dateRange = dateFilter(byTestId('date-range-picker'), {
    label: 'Date range',
    get: () => ({ from: state.from, to: state.to }),
    set: ({ from, to }) => { state.from = from; state.to = to; },
  });

  // ---------- campaigns per page: single choice, closes on select ----------
  const pageSizePop = popover(byTestId('page-size-selection'), {});
  const pageSizeLabel = pageSizePop.button.querySelector('.fbar-label');
  pageSizePop.panel.setAttribute('role', 'listbox');
  function renderPageSize() {
    pageSizeLabel.textContent = `${state.pageSize} per page`;
    pageSizePop.button.classList.toggle('is-active', state.pageSize !== DEFAULT_PAGE_SIZE);
    pageSizePop.panel.innerHTML = PAGE_SIZES.map((n) => {
      const on = n === state.pageSize;
      const radio = `border rounded-full shrink-0 w-4 h-4 ${on ? 'border-4 border-primary-700' : 'border-neutral-950-opacity-10 bg-neutral-50'}`;
      return `<div class="fbar-option" role="option" aria-selected="${on}" data-size="${n}"><div class="${radio}"></div><span>${n} campaigns</span></div>`;
    }).join('');
  }
  pageSizePop.panel.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-size]');
    if (!opt) return;
    state.pageSize = Number(opt.dataset.size);
    pageSizePop.close();
    update();
  });

  // Pagination footer below the table ("1 to 50 of 1 286", "Page 1 of 26")
  const pager = document.querySelector('.ag-paging-panel:not(.ag-hidden)');
  const [firstRowEl, , lastRowEl] = pager.querySelector(':scope > .body-sm').children;
  const pageTotalEl = pager.querySelector('.ag-paging-page-summary-panel .body-sm').lastElementChild;
  function renderPager() {
    lastRowEl.textContent = state.pageSize;
    pageTotalEl.textContent = Math.ceil(TOTAL_CAMPAIGNS / state.pageSize);
  }

  // ---------- search: campaign name or ID ----------
  const searchInput = byTestId('campaign-search-input');
  searchInput.addEventListener('input', () => { state.search = searchInput.value; update(); });

  // ---------- table rows captured in the snapshot ----------
  const ROW_HEIGHT = 60;
  const rowContainers = [...document.querySelectorAll('.ag-body [class*="-cols-container"], .ag-full-width-container')];
  const centerRows = [...document.querySelectorAll('.ag-center-cols-container > .ag-row')];
  const originalHeight = rowContainers.map((c) => c.style.height);
  const cellText = (row, col) => (row.querySelector(`[col-id="${col}"]`)?.textContent || '').trim();
  const parseDate = (t) => { const [d, m, y] = t.split('/').map(Number); return y ? new Date(y, m - 1, d) : null; };
  // Values for an added list filter: the distinct, non-empty values of its column, A–Z
  const columnValues = (col) => (col
    ? [...new Set(centerRows.map((r) => cellText(r, col)).filter(Boolean))].sort((a, b) => a.localeCompare(b)).map((v) => ({ code: v, name: v }))
    : []);

  // ---------- out of charge frames: labelled toggle next to Export ----------
  // Campaigns with out of charge frames show an icon in the narrow "Out of charge frames" column.
  const hasOutOfCharge = (row) => !!row.querySelector('[col-id="oocFrames"] svg');
  const outOfChargeCount = centerRows.filter(hasOutOfCharge).length;
  const oocButton = byTestId('out-of-charge-filter');
  const oocLabel = oocButton.querySelector('.fbar-label');
  oocButton.addEventListener('click', () => { state.outOfCharge = !state.outOfCharge; update(); });
  function renderOutOfCharge() {
    const n = outOfChargeCount;
    const noun = n === 1 ? 'campaign has' : 'campaigns have';
    oocButton.hidden = n === 0 && !state.outOfCharge;
    oocLabel.textContent = `${n} out of charge`;
    oocButton.setAttribute('aria-pressed', String(state.outOfCharge));
    oocButton.title = state.outOfCharge
      ? 'Showing only campaigns with out of charge frames. Click to show all.'
      : `${n} ${noun} out of charge frames. Click to show only ${n === 1 ? 'it' : 'these'}.`;
  }

  // ---------- "+ Add": searchable list of extra filters ----------
  const addRoot = byTestId('add-filter-button').parentElement === document.querySelector('.fbar')
    ? (() => {
      // wrap the Add button so its menu can be positioned under it
      const btn = byTestId('add-filter-button');
      const wrap = document.createElement('div');
      wrap.className = 'fbar-filter';
      wrap.dataset.testId = 'add-filter';
      btn.replaceWith(wrap);
      wrap.appendChild(btn);
      btn.classList.add('fbar-btn');
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');
      return wrap;
    })()
    : byTestId('add-filter-button').parentElement;
  let addQuery = '';
  const addPop = popover(addRoot, {
    className: 'fbar-add-menu',
    onOpen() { addQuery = ''; addInput.value = ''; renderAddMenu(); },
  });
  addPop.panel.innerHTML = `<div class="fbar-menu-search">${SEARCH_SVG}<input type="text" placeholder="Find a filter" aria-label="Find a filter"></div><div class="fbar-options" role="menu"></div>`;
  const addInput = addPop.panel.querySelector('input');
  const addList = addPop.panel.querySelector('.fbar-options');
  function renderAddMenu() {
    const q = addQuery.trim().toLowerCase();
    const added = new Set(state.extra.map((f) => f.def.key));
    const available = EXTRA_FILTERS.filter((d) => !added.has(d.key));
    const shown = available.filter((d) => !q || d.label.toLowerCase().includes(q));
    addList.innerHTML = shown.length
      ? shown.map((d, i) => `<div class="fbar-option${i === 0 && q ? ' is-focused' : ''}" role="menuitem" data-key="${d.key}"><span>${d.label}</span></div>`).join('')
      : `<div class="fbar-empty">${available.length ? 'No matching filters' : 'All filters added'}</div>`;
  }
  addInput.addEventListener('input', () => { addQuery = addInput.value; renderAddMenu(); });
  listKeyboard(addList, addInput, '.fbar-option', (el) => addExtraFilter(el.dataset.key));
  addList.addEventListener('click', (e) => {
    const item = e.target.closest('[data-key]');
    if (item) addExtraFilter(item.dataset.key);
  });

  // ---------- added filters: own button in the toolbar, value picker opens straight away ----------
  const extraControls = new Map(); // key -> { root, control }

  function addExtraFilter(key) {
    const def = EXTRA_FILTERS.find((d) => d.key === key);
    const entry = def.type === 'date' ? { def, from: null, to: null } : { def, values: [] };
    state.extra.push(entry);
    addPop.close();

    const root = document.createElement('div');
    root.className = 'fbar-filter fbar-extra';
    root.dataset.testId = `filter-${key}`;
    root.innerHTML = `<button type="button" class="fbar-btn" aria-haspopup="true" aria-expanded="false"><span class="fbar-label">${def.label}</span><span class="fbar-count" hidden></span>${DOWN_SVG}</button>`;
    addRoot.before(root);

    const footer = `<div class="fbar-menu-footer"><button type="button" class="fbar-remove" data-remove>Remove filter</button></div>`;
    // An added filter left without a value is dropped when its picker closes, so the bar never holds empty filters
    const onClose = () => {
      const empty = def.type === 'date' ? !entry.from : entry.values.length === 0;
      if (empty && state.extra.includes(entry)) removeExtraFilter(key, { refocus: false });
    };
    const control = def.type === 'date'
      ? dateFilter(root, {
        label: def.label, footer, onClose,
        get: () => ({ from: entry.from, to: entry.to }),
        set: ({ from, to }) => { entry.from = from; entry.to = to; },
      })
      : checkboxFilter(root, {
        options: () => columnValues(def.col),
        get: () => entry.values,
        set: (v) => { entry.values = v; },
        isDefaultValue: () => entry.values.length === 0,
        searchPlaceholder: `Search ${def.label.toLowerCase()}`,
        footer, onClose,
      });
    control.pop.panel.addEventListener('click', (e) => { if (e.target.closest('[data-remove]')) removeExtraFilter(key); });
    extraControls.set(key, { root, control });
    update();
    control.pop.open();
  }

  function removeExtraFilter(key, { refocus = true } = {}) {
    const item = extraControls.get(key);
    state.extra = state.extra.filter((f) => f.def.key !== key);
    if (item) {
      item.control.pop.destroy();
      item.root.remove();
      extraControls.delete(key);
    }
    update();
    if (refocus) addRoot.querySelector('.fbar-btn').focus();
  }

  // ---------- filtering ----------
  // ag-grid positions rows absolutely, so visible rows are re-stacked after filtering.
  function applyFilters() {
    const q = state.search.trim().toLowerCase();
    let shown = 0;
    centerRows.forEach((row) => {
      const chip = row.querySelector('[data-test-id^="campaign-status-chip-"]');
      const code = chip ? chip.dataset.testId.replace('campaign-status-chip-', '') : null;
      const rowMedia = cellText(row, 'campaignMediaTypes').toUpperCase().split(/,\s*/);
      const start = parseDate(cellText(row, 'startDate'));
      const end = parseDate(cellText(row, 'endDate'));
      const extraOk = state.extra.every((f) => {
        if (!f.def.col) return true;
        if (f.def.type === 'date') {
          const d = parseDate(cellText(row, f.def.col));
          return !f.from || (d && d >= f.from && d <= f.to);
        }
        return f.values.length === 0 || f.values.includes(cellText(row, f.def.col));
      });
      const matches =
        (!q || cellText(row, 'campaignName').toLowerCase().includes(q) || cellText(row, 'userVisibleId').toLowerCase().includes(q)) &&
        (state.statuses.length === 0 || state.statuses.includes(code)) &&
        (state.mediaTypes.length === 0 || state.mediaTypes.some((m) => rowMedia.includes(m))) &&
        // campaigns running within the range, matching the app's START_DATE >= from / END_DATE <= to
        (!state.from || (start && start >= state.from)) &&
        (!state.to || (end && end <= state.to)) &&
        (!state.outOfCharge || hasOutOfCharge(row)) &&
        extraOk;
      const visible = matches && shown < state.pageSize;
      row.style.display = visible ? '' : 'none';
      if (visible) {
        row.style.transform = `translateY(${shown * ROW_HEIGHT}px)`;
        row.classList.toggle('ag-row-even', shown % 2 === 0);
        row.classList.toggle('ag-row-odd', shown % 2 === 1);
        shown++;
      }
    });
    const filtered = shown !== centerRows.length;
    rowContainers.forEach((c, i) => { c.style.height = filtered ? `${Math.max(shown * ROW_HEIGHT, 1)}px` : originalHeight[i]; });
    renderNoResults(shown === 0);
  }

  // ---------- no results: shown in ag-grid's overlay slot, below the column headers ----------
  // Lists each active filter as a removable chip so people can loosen one thing at a time,
  // with "Clear all filters" as the way back to everything.
  const overlay = document.querySelector('[data-test-id="direct-sales-campaigns-table"] .ag-overlay');
  const overlayWrapper = overlay.querySelector('.ag-overlay-wrapper');
  overlayWrapper.classList.replace('ag-overlay-loading-wrapper', 'ag-overlay-no-rows-wrapper');
  const EMPTY_ICON = '<svg viewBox="0 0 256 256" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Zm101.66-18.34L123.31,112l18.35,18.34a8,8,0,0,1-11.32,11.32L112,123.31,93.66,141.66a8,8,0,0,1-11.32-11.32L100.69,112,82.34,93.66A8,8,0,0,1,93.66,82.34L112,100.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"/></svg>';
  const nameList = (codes, options) => {
    const names = codes.map((c) => options.find((o) => o.code === c)?.name || c);
    return names.length <= 2 ? names.join(', ') : `${names.length} selected`;
  };

  function activeFilters() {
    const list = [];
    if (!isDefault.search()) list.push({ label: `Search: “${state.search.trim()}”`, reset: () => { state.search = ''; searchInput.value = ''; } });
    if (!isDefault.dates()) list.push({ label: `Date range: ${fmt(state.from)} – ${fmt(state.to)}`, reset: () => { state.from = state.to = null; } });
    if (!isDefault.statuses()) {
      list.push({
        label: `Status: ${state.statuses.length ? nameList(state.statuses, STATUSES) : 'any'}`,
        reset: () => { state.statuses = [...DEFAULT_STATUSES]; },
      });
    }
    if (!isDefault.outOfCharge()) list.push({ label: 'Out of charge frames', reset: () => { state.outOfCharge = false; } });
    if (!isDefault.mediaTypes()) list.push({ label: `Media type: ${nameList(state.mediaTypes, MEDIA_TYPES)}`, reset: () => { state.mediaTypes = []; } });
    state.extra.forEach((f) => {
      const value = f.def.type === 'date'
        ? (f.from && `${fmt(f.from)} – ${fmt(f.to)}`)
        : (f.values.length && nameList(f.values, f.values.map((v) => ({ code: v, name: v }))));
      if (value) list.push({ label: `${f.def.label}: ${value}`, reset: () => removeExtraFilter(f.def.key, { refocus: false }) });
    });
    return list;
  }

  let currentFilters = [];
  function renderNoResults(empty) {
    overlay.classList.toggle('ag-hidden', !empty);
    overlay.setAttribute('aria-hidden', String(!empty));
    if (!empty) { overlayWrapper.innerHTML = ''; firstRowEl.textContent = '1'; return; }
    firstRowEl.textContent = lastRowEl.textContent = '0';
    currentFilters = activeFilters();
    const onlySearch = currentFilters.length === 1 && !isDefault.search();
    const title = onlySearch ? `No campaigns match “${escapeHtml(state.search.trim())}”` : 'No campaigns match your filters';
    const hint = onlySearch
      ? 'Check the spelling, or search by campaign ID instead.'
      : currentFilters.length > 1 ? 'Try removing one of these filters, or clear them all to see every campaign.' : 'Try changing this filter, or clear it to see every campaign.';
    overlayWrapper.innerHTML = `
      <div class="no-results" role="status" data-test-id="no-results">
        <div class="no-results-icon">${EMPTY_ICON}</div>
        <h3 class="no-results-title">${title}</h3>
        <p class="no-results-hint">${hint}</p>
        ${onlySearch ? '' : `<div class="no-results-chips">${currentFilters.map((f, i) => `
          <button type="button" class="no-results-chip" data-reset="${i}" aria-label="Remove ${escapeHtml(f.label)}">
            <span>${escapeHtml(f.label)}</span>${CLEAR_SVG}</button>`).join('')}</div>`}
        <div class="no-results-actions">
          ${onlySearch ? '<button type="button" class="fbar-btn fbar-primary" data-clear-search>Clear search</button>'
    : '<button type="button" class="fbar-btn fbar-primary" data-clear-all>Clear all filters</button>'}
        </div>
      </div>`;
  }
  overlayWrapper.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-reset]');
    if (chip) {
      currentFilters[Number(chip.dataset.reset)].reset();
      update();
    } else if (e.target.closest('[data-clear-search]')) {
      state.search = '';
      searchInput.value = '';
      update();
      searchInput.focus();
    } else if (e.target.closest('[data-clear-all]')) clearAllFilters();
  });

  // "Clear all" only shows once a filter differs from its default, like Jira's "Clear filters";
  // it also removes every added filter.
  const clearAll = byTestId('clear-all-filters-button');
  clearAll.addEventListener('click', () => clearAllFilters());
  function clearAllFilters() {
    [...extraControls.keys()].forEach((key) => {
      const item = extraControls.get(key);
      item.control.pop.destroy();
      item.root.remove();
      extraControls.delete(key);
    });
    Object.assign(state, defaults());
    searchInput.value = '';
    update();
  }

  function update() {
    status.render();
    media.render();
    dateRange.render();
    extraControls.forEach(({ control }) => control.render());
    renderPageSize();
    renderPager();
    renderOutOfCharge();
    if (addPop.isOpen()) renderAddMenu();
    addRoot.querySelector('.fbar-btn').disabled = state.extra.length === EXTRA_FILTERS.length;
    clearAll.hidden = Object.values(isDefault).every((check) => check());
    applyFilters();
  }

  update();
})();
