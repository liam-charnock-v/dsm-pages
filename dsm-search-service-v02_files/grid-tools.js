// AG Grid side bar with the Columns tool panel, as in AG Grid's own demos
// (https://www.ag-grid.com/example/). Column setup lives on the grid's right edge, apart from
// the page's search and filters, and "Reset columns" sits inside the panel it resets.
// The live app already configures this side bar (hidden); the equivalent grid option is
// sideBar: { toolPanels: [{ id: 'columns', toolPanel: 'agColumnsToolPanel',
//   toolPanelParams: { suppressPivotMode: true, suppressRowGroups: true, suppressValues: true } }] }
(function () {
  const table = document.querySelector('[data-test-id="direct-sales-campaigns-table"]');
  const sideBar = table.querySelector('.ag-side-bar');
  const tabButton = sideBar.querySelector('.ag-side-button-button');
  const tab = tabButton.closest('.ag-side-button');
  const panelWrapper = sideBar.querySelector('.ag-tool-panel-wrapper');
  const columnSelect = sideBar.querySelector('.ag-column-select');
  const headerCheckboxWrapper = sideBar.querySelector('.ag-column-select-header-checkbox .ag-checkbox-input-wrapper');
  const headerCheckbox = headerCheckboxWrapper.querySelector('input');
  const searchInput = sideBar.querySelector('.ag-column-select-header-filter-wrapper input');
  const listContainer = sideBar.querySelector('.ag-column-select-virtual-list-container');

  // Columns in their original order, read from the header
  const ORIGINAL = [...table.querySelectorAll('.ag-header-cell[col-id]')].map((h) => ({
    id: h.getAttribute('col-id'),
    label: h.querySelector('.ag-header-cell-text')?.textContent.trim() || h.textContent.trim() || h.getAttribute('aria-label') || h.getAttribute('col-id'),
    width: parseFloat(h.style.width),
    visible: true,
  }));
  let columns = ORIGINAL.map((c) => ({ ...c }));
  const isOriginal = () => columns.map((c) => c.id + c.visible).join() === ORIGINAL.map((c) => c.id + c.visible).join();

  // ---------- show the side bar (collapsed), as AG Grid does by default ----------
  sideBar.classList.remove('ag-hidden');
  sideBar.setAttribute('aria-hidden', 'false');
  sideBar.querySelector('.ag-pivot-mode-panel')?.remove(); // suppressPivotMode: not used on this page
  tabButton.setAttribute('tabindex', '0');
  tabButton.setAttribute('aria-controls', 'columns-tool-panel');
  panelWrapper.id = 'columns-tool-panel';
  panelWrapper.style.width = '260px';

  function setOpen(open) {
    panelWrapper.classList.toggle('ag-hidden', !open);
    panelWrapper.setAttribute('aria-hidden', String(!open));
    tab.classList.toggle('ag-selected', open);
    tabButton.setAttribute('aria-expanded', String(open));
    if (open) searchInput.focus();
  }
  tabButton.addEventListener('click', () => setOpen(panelWrapper.classList.contains('ag-hidden')));
  setOpen(false);

  // ---------- column list (non-virtual: there are only ~20 columns) ----------
  const footer = document.createElement('div');
  footer.className = 'ag-column-panel-footer';
  footer.innerHTML = '<button type="button" class="column-panel-reset" data-test-id="reset-columns">Reset columns</button><span class="column-panel-hint"></span>';
  columnSelect.after(footer);
  const resetButton = footer.querySelector('button');
  const hint = footer.querySelector('.column-panel-hint');

  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let query = '';

  function renderList() {
    const q = query.trim().toLowerCase();
    listContainer.style.height = 'auto';
    listContainer.innerHTML = columns.map((c, i) => {
      const hidden = q && !c.label.toLowerCase().includes(q);
      return `<div class="ag-virtual-list-item ag-column-select-virtual-list-item column-panel-item${hidden ? ' ag-hidden' : ''}" role="treeitem"
          aria-setsize="${columns.length}" aria-posinset="${i + 1}" aria-level="1" aria-label="${esc(c.label)} Column" draggable="${q ? 'false' : 'true'}" data-col="${c.id}">
        <div class="ag-column-select-column ag-column-select-indent-0">
          <div class="ag-column-select-checkbox ag-labeled ag-label-align-right ag-checkbox ag-input-field">
            <div class="ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper${c.visible ? ' ag-checked' : ''}">
              <input class="ag-input-field-input ag-checkbox-input" type="checkbox" ${c.visible ? 'checked' : ''} aria-label="Show ${esc(c.label)}">
            </div>
          </div>
          <span class="ag-icon ag-icon-grip ag-drag-handle ag-column-select-column-drag-handle" role="presentation" title="Drag to reorder"></span>
          <span class="ag-column-select-column-label">${esc(c.label)}</span>
        </div>
      </div>`;
    }).join('');

    const shown = columns.filter((c) => c.visible).length;
    headerCheckboxWrapper.classList.toggle('ag-checked', shown === columns.length);
    headerCheckboxWrapper.classList.toggle('ag-indeterminate', shown > 0 && shown < columns.length);
    headerCheckbox.checked = shown === columns.length;
    headerCheckbox.indeterminate = shown > 0 && shown < columns.length;
    resetButton.disabled = isOriginal();
    hint.textContent = `${shown} of ${columns.length} shown`;
  }

  // ---------- apply order and visibility to the grid ----------
  // ag-grid positions header cells and body cells absolutely, so re-lay them out left to right.
  const widthTargets = [
    ...table.querySelectorAll('.ag-header-row-column, .ag-header-container, .ag-center-cols-container, .ag-body-horizontal-scroll-container'),
  ];
  function applyColumns() {
    let left = 0;
    columns.forEach((c) => {
      table.querySelectorAll(`.ag-header-cell[col-id="${c.id}"], .ag-row [col-id="${c.id}"]`).forEach((el) => {
        el.style.display = c.visible ? '' : 'none';
        el.style.left = `${left}px`;
      });
      if (c.visible) left += c.width;
    });
    widthTargets.forEach((el) => { el.style.width = `${left}px`; });
  }

  function update() {
    applyColumns();
    renderList();
  }

  // ---------- interactions ----------
  listContainer.addEventListener('click', (e) => {
    const item = e.target.closest('[data-col]');
    if (!item || e.target.closest('.ag-drag-handle')) return;
    const col = columns.find((c) => c.id === item.dataset.col);
    // keep at least one column, otherwise the grid has nothing to show
    if (col.visible && columns.filter((c) => c.visible).length === 1) return;
    col.visible = !col.visible;
    update();
    listContainer.querySelector(`[data-col="${col.id}"] input`)?.focus();
  });
  listContainer.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return; // Space already clicks a checkbox natively
    if (!e.target.closest('input')) return;
    e.preventDefault();
    e.target.closest('[data-col]').click();
  });
  headerCheckbox.addEventListener('click', (e) => {
    e.preventDefault();
    const allShown = columns.every((c) => c.visible);
    // "Select all" off still leaves the first column, so the grid never goes blank
    columns.forEach((c, i) => { c.visible = !allShown || i === 0; });
    update();
  });
  searchInput.addEventListener('input', () => { query = searchInput.value; renderList(); });
  resetButton.addEventListener('click', () => {
    columns = ORIGINAL.map((c) => ({ ...c }));
    update();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panelWrapper.classList.contains('ag-hidden') && sideBar.contains(document.activeElement)) {
      setOpen(false);
      tabButton.focus();
    }
  });

  // drag a row by its grip to reorder columns
  let dragId = null;
  listContainer.addEventListener('dragstart', (e) => {
    const item = e.target.closest('[data-col]');
    dragId = item.dataset.col;
    item.classList.add('is-dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragId);
  });
  listContainer.addEventListener('dragover', (e) => {
    const item = e.target.closest('[data-col]');
    if (!dragId || !item || item.dataset.col === dragId) return;
    e.preventDefault();
    const after = e.clientY > item.getBoundingClientRect().top + item.offsetHeight / 2;
    listContainer.querySelectorAll('.drop-before, .drop-after').forEach((el) => el.classList.remove('drop-before', 'drop-after'));
    item.classList.add(after ? 'drop-after' : 'drop-before');
  });
  listContainer.addEventListener('drop', (e) => {
    const item = e.target.closest('[data-col]');
    if (!dragId || !item) return;
    e.preventDefault();
    const after = item.classList.contains('drop-after');
    const moved = columns.splice(columns.findIndex((c) => c.id === dragId), 1)[0];
    const target = columns.findIndex((c) => c.id === item.dataset.col);
    columns.splice(after ? target + 1 : target, 0, moved);
    update();
  });
  listContainer.addEventListener('dragend', () => {
    dragId = null;
    listContainer.querySelectorAll('.is-dragging, .drop-before, .drop-after').forEach((el) => el.classList.remove('is-dragging', 'drop-before', 'drop-after'));
  });

  update();

  // ---------- horizontal scroll sync ----------
  // AG Grid scrolls three elements together: the rows (trackpad / shift+wheel), the separate
  // horizontal scrollbar under them, and the column header (overflow hidden, moved by scrollLeft).
  const rowsViewport = table.querySelector('.ag-center-cols-viewport');
  const scrollbarViewport = table.querySelector('.ag-body-horizontal-scroll-viewport');
  const headerViewport = table.querySelector('.ag-header-viewport');
  // only writes when positions differ, so the echoed scroll events settle instead of looping
  function syncFrom(source) {
    const x = source.scrollLeft;
    [rowsViewport, scrollbarViewport, headerViewport].forEach((el) => { if (el !== source && el.scrollLeft !== x) el.scrollLeft = x; });
  }
  rowsViewport.addEventListener('scroll', () => syncFrom(rowsViewport), { passive: true });
  scrollbarViewport.addEventListener('scroll', () => syncFrom(scrollbarViewport), { passive: true });
  // a horizontal wheel/trackpad gesture over the header scrolls the grid too, as in AG Grid
  headerViewport.addEventListener('wheel', (e) => {
    const dx = e.deltaX || (e.shiftKey ? e.deltaY : 0);
    if (!dx) return;
    e.preventDefault();
    rowsViewport.scrollLeft += dx;
  }, { passive: false });
})();
