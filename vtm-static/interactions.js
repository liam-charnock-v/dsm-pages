/**
 * "Add filter" interaction for the Campaign management grid.
 *
 * This is a static export of a live SaaS screen (no backend), so all
 * filtering below runs client-side against the campaign rows that were
 * captured in the page plus a handful of extra rows cloned in at load time
 * to cover statuses/values that weren't present in the original capture
 * (Proposal/Live statuses, an "International" sales team, etc). Categories
 * that don't have a real grid column (Advertiser, Brand, Agency, ...) get a
 * small deterministic mock value per row so their filters still narrow the
 * result set instead of being purely decorative.
 */
(function () {
  'use strict';

  var ROW_HEIGHT = 60;
  var PAGE_SIZE = 50;

  var STATUS_STYLES = {
    CONFIRMED: { bg: 'bg-green-100', text: 'text-green-900', label: 'Confirmed' },
    OPTION: { bg: 'bg-orange-100', text: 'text-orange-900', label: 'Option' },
    PROPOSAL: { bg: 'bg-indigo-100', text: 'text-indigo-900', label: 'Proposal' },
    LIVE: { bg: 'bg-lime-100', text: 'text-lime-900', label: 'Live' }
  };

  // Extra rows cloned in at load time, inspired by screenshots of the live
  // app, so every filter option below has at least one real match.
  var EXTRA_ROWS = [
    { status: 'PROPOSAL', name: 'Auto_Digital Single Line', code: 'PT1D4710', mediaType: 'Digital', from: '04/08/2026', to: '09/08/2026', created: '30/07/2026', salesTeam: 'Agencies', salesPerson: 'Gonçalo Figueiredo', adminPerson: 'Cristina Silva' },
    { status: 'LIVE', name: 'BKP_CD_LCM5', code: 'PT1D4742', mediaType: 'Digital', from: '31/07/2026', to: '27/09/2026', created: '31/07/2026', salesTeam: 'Nacional', salesPerson: 'Ana Catarina Figueiredo', adminPerson: 'Susana Afonso' },
    { status: 'LIVE', name: '260730_SP_Test Campaign DSM Migration', code: 'SB021306', mediaType: 'Digital', from: '30/07/2026', to: '29/10/2026', created: '31/07/2026', salesTeam: 'Airport', salesPerson: 'Rodrigo Santos', adminPerson: 'Susana Afonso' },
    { status: 'CONFIRMED', name: 'SJ_Frame_DS-4398', code: 'PT1D4745', mediaType: 'Paper', from: '06/08/2026', to: '08/08/2026', created: '31/07/2026', salesTeam: 'International', salesPerson: 'Marisa Martins', adminPerson: 'Vania Regio' }
  ];

  var MOCK_POOLS = {
    advertiser: ['Margem de Primavera, Lda', '03 Creative, Lda', '2020 Editora, LDA.', 'JCDECAUX Portugal', 'Qatar Tourism Authority', 'Pestana Hotel Group'],
    brand: ['Primavera', '03 Creative', '2020 Editora', 'JCDecaux', 'Qatar Airways', 'Pestana'],
    productCategory: ['Travel & Tourism', 'Retail', 'Education', 'Hospitality', 'Finance', 'Technology'],
    agency: ['03 Creative, Lda', 'Havas Media', 'OMD Portugal', 'Mindshare', 'Wavemaker'],
    specialist: ['Rodrigo Santos', 'Ana Gaspar', 'Mafalda Botelho', 'Joana Pereira'],
    updatedBy: ['Susana Afonso', 'Cristina Silva', 'Vania Regio', 'Carla Oliveira'],
    createdBy: ['Rodrigo Santos', 'Ana Gaspar', 'Gonçalo Figueiredo', 'Ana Catarina Figueiredo']
  };

  var FILTER_DEFS = [
    { key: 'salesTeam', label: 'Sales team', type: 'search', field: 'salesTeam' },
    { key: 'salesPerson', label: 'Sales person', type: 'search', field: 'salesPerson' },
    { key: 'adminPerson', label: 'Admin person', type: 'search', field: 'adminPerson' },
    { key: 'advertiser', label: 'Advertiser', type: 'search', field: 'advertiser' },
    { key: 'brand', label: 'Brand', type: 'search', field: 'brand' },
    { key: 'productCategory', label: 'Product category', type: 'search', field: 'productCategory' },
    { key: 'agency', label: 'Agency', type: 'search', field: 'agency' },
    { key: 'specialist', label: 'Specialist', type: 'search', field: 'specialist' },
    { key: 'updatedBy', label: 'Updated by', type: 'search', field: 'updatedBy' },
    { key: 'createdBy', label: 'Created by', type: 'search', field: 'createdBy' },
    { key: 'createdDate', label: 'Created date', type: 'date', field: 'createdSort' },
    { key: 'dropDate', label: 'Drop date', type: 'date', field: 'dropSort' }
  ];

  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

  var campaigns = [];
  var activeFilters = []; // {key, label, field, type, value}
  var menuEl = null;
  var submenuEl = null;
  var chipRow = null;
  var chipsByKey = {};

  function defByKey(key) {
    for (var i = 0; i < FILTER_DEFS.length; i++) if (FILTER_DEFS[i].key === key) return FILTER_DEFS[i];
    return null;
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function parseDMY(str) {
    var parts = (str || '').split('/');
    if (parts.length !== 3) return null;
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }

  function readCell(rowEl, colId) {
    var cell = rowEl.querySelector('[col-id="' + colId + '"]');
    return cell ? cell.textContent.trim() : '';
  }

  function setCellText(rowEl, colId, text) {
    var span = rowEl.querySelector('[col-id="' + colId + '"] .ag-cell-value > span');
    if (span) span.textContent = text;
  }

  function buildStatusChipMarkup(statusKey) {
    var s = STATUS_STYLES[statusKey] || STATUS_STYLES.CONFIRMED;
    var wrap = document.createElement('div');
    wrap.className = 'flex items-center group w-fit max-w-[200px] ' + s.bg + ' rounded-full h-6';
    wrap.setAttribute('data-test-id', 'campaign-status-chip-' + statusKey);
    var inner = document.createElement('div');
    inner.className = 'px-1.5 py-1 flex justify-center items-center gap-0.5';
    var p = document.createElement('p');
    p.className = s.text + ' px-0.5 body-base max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis';
    p.textContent = s.label;
    inner.appendChild(p);
    wrap.appendChild(inner);
    return wrap;
  }

  function fillRow(rowEl, entry) {
    var statusValue = rowEl.querySelector('[col-id="status"] .ag-cell-value');
    if (statusValue) {
      statusValue.innerHTML = '';
      statusValue.appendChild(buildStatusChipMarkup(entry.status));
    }
    var nameEl = rowEl.querySelector('[data-test-id="CampaignNameAndRef-subHeader"] p.truncate');
    var codeEl = rowEl.querySelector('[data-test-id="CampaignNameAndRef-body"] p.truncate');
    if (nameEl) nameEl.textContent = entry.name;
    if (codeEl) codeEl.textContent = entry.code;
    setCellText(rowEl, 'campaignMediaTypes', entry.mediaType);
    setCellText(rowEl, 'startDate', entry.from);
    setCellText(rowEl, 'endDate', entry.to);
    setCellText(rowEl, 'createdAt', entry.created);
    setCellText(rowEl, 'salesTeam', entry.salesTeam);
    setCellText(rowEl, 'salesPerson', entry.salesPerson);
    setCellText(rowEl, 'adminPerson', entry.adminPerson);
  }

  function addExtraRows(container) {
    var rows = container.querySelectorAll(':scope > .ag-row');
    if (!rows.length) return;
    var template = rows[rows.length - 1];
    EXTRA_ROWS.forEach(function (entry) {
      var clone = template.cloneNode(true);
      var withId = clone.querySelectorAll('[id]');
      for (var i = 0; i < withId.length; i++) withId[i].removeAttribute('id');
      fillRow(clone, entry);
      container.appendChild(clone);
    });
  }

  function extractCampaigns(container) {
    var rows = Array.prototype.slice.call(container.querySelectorAll(':scope > .ag-row'));
    return rows.map(function (el, i) {
      var data = {
        status: (readCell(el, 'status') || '').toUpperCase(),
        name: readCell(el, 'campaignNameAndRef'),
        mediaType: readCell(el, 'campaignMediaTypes'),
        from: readCell(el, 'startDate'),
        to: readCell(el, 'endDate'),
        created: readCell(el, 'createdAt'),
        salesTeam: readCell(el, 'salesTeam'),
        salesPerson: readCell(el, 'salesPerson'),
        adminPerson: readCell(el, 'adminPerson')
      };
      var createdSort = parseDMY(data.created);
      var toSort = parseDMY(data.to);
      data.advertiser = MOCK_POOLS.advertiser[i % MOCK_POOLS.advertiser.length];
      data.brand = MOCK_POOLS.brand[i % MOCK_POOLS.brand.length];
      data.productCategory = MOCK_POOLS.productCategory[i % MOCK_POOLS.productCategory.length];
      data.agency = MOCK_POOLS.agency[i % MOCK_POOLS.agency.length];
      data.specialist = MOCK_POOLS.specialist[i % MOCK_POOLS.specialist.length];
      data.updatedBy = MOCK_POOLS.updatedBy[i % MOCK_POOLS.updatedBy.length];
      data.createdBy = MOCK_POOLS.createdBy[i % MOCK_POOLS.createdBy.length];
      data.createdSort = createdSort;
      data.dropSort = toSort ? new Date(toSort.getTime() + 3 * 86400000) : null;
      return { el: el, data: data };
    });
  }

  function passesFilters(c) {
    return activeFilters.every(function (f) {
      if (f.type === 'date') {
        var d = c.data[f.field];
        return d instanceof Date && !isNaN(d) && d.getTime() >= f.value.getTime();
      }
      return c.data[f.field] === f.value;
    });
  }

  function updatePagingText(count) {
    var panel = document.querySelector('.ag-paging-panel:not(.ag-hidden)');
    if (!panel) return;
    var summary = panel.querySelector(':scope > span.body-sm');
    if (summary) {
      var spans = summary.querySelectorAll('span');
      if (spans.length >= 5) {
        spans[0].textContent = count > 0 ? '1' : '0';
        spans[2].textContent = String(Math.min(PAGE_SIZE, count));
        spans[4].textContent = String(count);
      }
    }
    var pageSummary = panel.querySelector('.ag-paging-page-summary-panel span.body-sm');
    if (pageSummary) {
      var spans2 = pageSummary.querySelectorAll('span');
      if (spans2.length >= 4) {
        spans2[3].textContent = String(Math.max(1, Math.ceil(count / PAGE_SIZE)));
      }
    }
  }

  function relayout() {
    var matched = [];
    var unmatched = [];
    campaigns.forEach(function (c) {
      (passesFilters(c) ? matched : unmatched).push(c);
    });
    matched.forEach(function (c, i) {
      c.el.style.display = '';
      c.el.style.transform = 'translateY(' + (i * ROW_HEIGHT) + 'px)';
      c.el.classList.toggle('ag-row-even', i % 2 === 0);
      c.el.classList.toggle('ag-row-odd', i % 2 === 1);
    });
    unmatched.forEach(function (c) { c.el.style.display = 'none'; });
    var container = document.querySelector('.ag-center-cols-container');
    if (container) container.style.height = Math.max(matched.length * ROW_HEIGHT, ROW_HEIGHT) + 'px';
    updatePagingText(matched.length);
  }

  function poolFor(def) {
    if (def.field === 'salesTeam' || def.field === 'salesPerson' || def.field === 'adminPerson') {
      var seen = {};
      var values = [];
      campaigns.forEach(function (c) {
        var v = c.data[def.field];
        if (v && !seen[v]) { seen[v] = true; values.push(v); }
      });
      return values.sort();
    }
    return MOCK_POOLS[def.field] || [];
  }

  function closeSubmenu() {
    if (submenuEl) { submenuEl.remove(); submenuEl = null; }
  }

  function closeAllMenus() {
    if (menuEl) menuEl.hidden = true;
    closeSubmenu();
  }

  function commitFilter(def, value, displayLabel) {
    activeFilters = activeFilters.filter(function (f) { return f.key !== def.key; });
    activeFilters.push({ key: def.key, label: def.label, field: def.field, type: def.type, value: value });
    upsertChip(def, displayLabel);
    closeAllMenus();
    relayout();
  }

  // Creates a filter chip the first time a category is picked; on later
  // amendments (clicking an existing chip to change its value) this just
  // updates the same chip's label in place instead of adding a duplicate.
  function upsertChip(def, displayLabel) {
    var existing = chipsByKey[def.key];
    if (existing) {
      existing.querySelector('.af-chip-label').textContent = displayLabel;
      return;
    }

    var chip = document.createElement('div');
    chip.className = 'af-chip';
    chip.dataset.key = def.key;

    var icon = document.createElement('span');
    icon.className = 'af-chip-icon';
    icon.innerHTML = def.type === 'date'
      ? '<svg viewBox="0 0 20 20" width="14" height="14" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
      : '<svg viewBox="0 0 20 20" width="14" height="14" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M17 17l-3.2-3.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';

    var label = document.createElement('span');
    label.className = 'af-chip-label';
    label.textContent = displayLabel;

    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'af-chip-remove';
    remove.setAttribute('aria-label', 'Remove ' + def.label + ' filter');
    remove.textContent = '×';
    remove.addEventListener('click', function (e) {
      e.stopPropagation();
      activeFilters = activeFilters.filter(function (f) { return f.key !== def.key; });
      delete chipsByKey[def.key];
      chip.remove();
      relayout();
    });

    // Clicking the chip body (not the remove button) re-opens its picker
    // so the value can be amended without removing and re-adding it.
    chip.addEventListener('click', function (e) {
      e.stopPropagation();
      openChipEditor(def, chip);
    });

    chip.appendChild(icon);
    chip.appendChild(label);
    chip.appendChild(remove);
    chipRow.appendChild(chip);
    chipsByKey[def.key] = chip;
  }

  function buildSearch(sub, def, presetValue) {
    var box = document.createElement('div');
    box.className = 'af-search-box';
    box.innerHTML = '<svg class="af-search-icon" viewBox="0 0 20 20" width="14" height="14" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M17 17l-3.2-3.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'af-search-input';
    input.placeholder = 'Search ' + def.label.toLowerCase();
    if (presetValue) input.value = presetValue;
    box.appendChild(input);
    sub.appendChild(box);

    var results = document.createElement('div');
    results.className = 'af-search-results';
    sub.appendChild(results);

    function render() {
      var q = input.value.trim().toLowerCase();
      results.innerHTML = '';
      if (!q) {
        var hint = document.createElement('div');
        hint.className = 'af-search-hint';
        hint.textContent = 'Type keyword to search';
        results.appendChild(hint);
        return;
      }
      var matches = poolFor(def).filter(function (v) { return v.toLowerCase().indexOf(q) !== -1; });
      if (!matches.length) {
        var none = document.createElement('div');
        none.className = 'af-search-hint';
        none.textContent = 'No results';
        results.appendChild(none);
        return;
      }
      matches.forEach(function (value) {
        var opt = document.createElement('button');
        opt.type = 'button';
        opt.className = 'af-search-option';
        opt.textContent = value;
        opt.addEventListener('click', function () { commitFilter(def, value, value); });
        results.appendChild(opt);
      });
    }

    input.addEventListener('input', render);
    render();
    setTimeout(function () { input.focus(); input.select(); }, 0);
  }

  function buildCalendar(sub, def, presetDate) {
    var today = new Date();
    var viewYear = presetDate ? presetDate.getFullYear() : today.getFullYear();
    var viewMonth = presetDate ? presetDate.getMonth() : today.getMonth();

    var cal = document.createElement('div');
    cal.className = 'af-calendar';
    sub.appendChild(cal);

    function render() {
      cal.innerHTML = '';

      var header = document.createElement('div');
      header.className = 'af-cal-header';
      var prev = document.createElement('button');
      prev.type = 'button'; prev.className = 'af-cal-nav'; prev.textContent = '‹';
      var label = document.createElement('div');
      label.className = 'af-cal-label';
      label.textContent = MONTH_NAMES[viewMonth] + ' ' + viewYear;
      var next = document.createElement('button');
      next.type = 'button'; next.className = 'af-cal-nav'; next.textContent = '›';
      prev.addEventListener('click', function () { viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } render(); });
      next.addEventListener('click', function () { viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } render(); });
      header.appendChild(prev); header.appendChild(label); header.appendChild(next);
      cal.appendChild(header);

      var grid = document.createElement('div');
      grid.className = 'af-cal-grid';
      WEEKDAYS.forEach(function (w) {
        var el = document.createElement('div');
        el.className = 'af-cal-weekday';
        el.textContent = w;
        grid.appendChild(el);
      });

      var firstOfMonth = new Date(viewYear, viewMonth, 1);
      var startOffset = firstOfMonth.getDay() - 1;
      if (startOffset < 0) startOffset = 6;
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      var daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

      for (var i = 0; i < startOffset; i++) {
        var muted = document.createElement('div');
        muted.className = 'af-cal-day af-cal-day--muted';
        muted.textContent = String(daysInPrevMonth - startOffset + i + 1);
        grid.appendChild(muted);
      }
      for (var d = 1; d <= daysInMonth; d++) {
        (function (day) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'af-cal-day';
          var isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
          var isSelected = presetDate && day === presetDate.getDate() && viewMonth === presetDate.getMonth() && viewYear === presetDate.getFullYear();
          if (isToday) btn.classList.add('af-cal-day--today');
          if (isSelected) btn.classList.add('af-cal-day--selected');
          btn.textContent = String(day);
          btn.addEventListener('click', function () {
            var picked = new Date(viewYear, viewMonth, day);
            var displayLabel = pad2(viewMonth + 1) + '/' + pad2(day) + '/' + viewYear;
            commitFilter(def, picked, displayLabel);
          });
          grid.appendChild(btn);
        })(d);
      }
      var totalCells = startOffset + daysInMonth;
      var trailing = (7 - (totalCells % 7)) % 7;
      for (var t = 1; t <= trailing; t++) {
        var muted2 = document.createElement('div');
        muted2.className = 'af-cal-day af-cal-day--muted';
        muted2.textContent = String(t);
        grid.appendChild(muted2);
      }

      cal.appendChild(grid);
    }

    render();
  }

  // Opens the search/calendar panel flush against the right edge of the
  // "Add filter" dropdown, top-aligned with whichever item is hovered.
  function openSubmenu(def, itemEl) {
    closeSubmenu();
    var sub = document.createElement('div');
    sub.className = 'af-submenu';
    sub.style.top = itemEl.offsetTop + 'px';
    sub.addEventListener('click', function (e) { e.stopPropagation(); });

    if (def.type === 'date') buildCalendar(sub, def);
    else buildSearch(sub, def);

    // Appended to the menu itself (not the button wrapper) so "100% width"
    // in the CSS resolves against the dropdown's own width, not the
    // button's - that's what keeps it flush against the dropdown's edge.
    menuEl.appendChild(sub);
    submenuEl = sub;
  }

  // Re-opens a picker anchored under an existing chip so its value can be
  // amended in place, instead of removing the filter and starting over.
  function openChipEditor(def, chipEl) {
    closeAllMenus();
    var sub = document.createElement('div');
    sub.className = 'af-submenu af-submenu--below';
    sub.addEventListener('click', function (e) { e.stopPropagation(); });

    var current = activeFilters.filter(function (f) { return f.key === def.key; })[0];

    if (def.type === 'date') buildCalendar(sub, def, current ? current.value : null);
    else buildSearch(sub, def, current ? current.value : null);

    chipEl.appendChild(sub);
    submenuEl = sub;
  }

  function refreshMenuState() {
    var activeKeys = {};
    activeFilters.forEach(function (f) { activeKeys[f.key] = true; });
    Array.prototype.forEach.call(menuEl.children, function (item) {
      item.style.display = activeKeys[item.dataset.key] ? 'none' : '';
    });
  }

  function buildAddFilterUI() {
    var addBtn = document.querySelector('[data-dd-action-name="Add filter"]');
    if (!addBtn) return;
    var wrapper = addBtn.closest('.relative');
    chipRow = wrapper.parentElement;

    menuEl = document.createElement('div');
    menuEl.className = 'af-menu';
    menuEl.hidden = true;

    FILTER_DEFS.forEach(function (def) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'af-menu-item';
      item.textContent = def.label;
      item.dataset.key = def.key;
      item.addEventListener('mouseenter', function () {
        openSubmenu(def, item);
      });
      menuEl.appendChild(item);
    });

    wrapper.appendChild(menuEl);

    addBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = menuEl.hidden;
      closeAllMenus();
      if (willOpen) {
        refreshMenuState();
        menuEl.hidden = false;
      }
    });

    document.addEventListener('click', function () { closeAllMenus(); });

    var clearAllBtn = document.querySelector('[data-test-id="clear-all-filters-button"]');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', function () {
        activeFilters = [];
        Array.prototype.forEach.call(document.querySelectorAll('.af-chip'), function (chip) { chip.remove(); });
        relayout();
      });
    }
  }

  function init() {
    var container = document.querySelector('.ag-center-cols-container');
    if (!container) return;
    addExtraRows(container);
    campaigns = extractCampaigns(container);
    buildAddFilterUI();
    relayout();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
