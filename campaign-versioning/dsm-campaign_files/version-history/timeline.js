/* Branch: Timeline panel.
   The clock icon opens a version history panel over the map, listing every allocation newest first.
   Click a version to show it on the card and map. */
(function () {
  'use strict';
  var VH = window.VersionHistory;
  var s = VH.state, el = VH.el, ICON = VH.ICON;

  var panel = el(
    '<aside class="vt-panel" role="dialog" aria-labelledby="vt-title" hidden>' +
      '<div class="vt-head">' +
        '<div><div class="vt-title" id="vt-title">Version history</div><div class="vt-sub"></div></div>' +
        '<button type="button" class="vt-close" aria-label="Close version history">' + ICON.close + '</button>' +
      '</div>' +
      '<div class="vt-list" role="list"></div>' +
    '</aside>'
  );
  document.body.appendChild(panel);
  var list = panel.querySelector('.vt-list');
  var sub = panel.querySelector('.vt-sub');

  panel.querySelector('.vt-close').addEventListener('click', function () {
    VH.setHistoryOpen(false);
    VH.dom.historyBtn.focus();
  });
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { VH.setHistoryOpen(false); VH.dom.historyBtn.focus(); }
  });

  // Sit over the map, just left of the summary overlay, below the search bar
  function place() {
    var o = VH.dom.overlay.getBoundingClientRect();
    var m = VH.dom.mapArea.getBoundingClientRect();
    panel.style.right = (window.innerWidth - o.left + 8) + 'px';
    panel.style.top = (m.top + 66) + 'px';
    panel.style.bottom = (window.innerHeight - m.bottom + 12) + 'px';
    panel.style.width = Math.max(260, Math.min(360, o.left - m.left - 24)) + 'px';
  }
  window.addEventListener('resize', place);

  // ---------- Interactions ----------
  list.addEventListener('click', function (e) {
    var item = e.target.closest('[data-index]');
    if (item) VH.view(Number(item.dataset.index));
  });
  list.addEventListener('keydown', function (e) {
    var item = e.target.closest('.vt-item');
    if (!item || e.target !== item) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); VH.view(Number(item.dataset.index)); }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var next = e.key === 'ArrowDown' ? item.nextElementSibling : item.previousElementSibling;
      if (next && next.classList.contains('vt-item')) next.focus();
    }
  });

  // ---------- Render ----------
  function stat(label, value) {
    return '<div class="vt-stat"><span class="vt-stat__label">' + label + '</span><span class="vt-stat__value">' + VH.fmt(value) + '</span></div>';
  }

  function render() {
    var open = VH.showHistory();
    if (open && panel.hidden) place();
    panel.hidden = !open;
    if (!open) return;

    var versions = s.versions, last = VH.lastIndex(), vi = VH.viewIndex();
    sub.textContent = versions.length + ' versions · Deal line 1';

    var html = '';
    if (VH.isStale()) {
      html += '<div class="vt-pending" role="listitem">' +
        '<div class="vt-rail"><span class="vt-dot vt-dot--pending"></span></div>' +
        '<div class="vt-main"><div class="vt-row1"><span class="vt-name">Unallocated changes</span></div>' +
        '<div class="vt-meta">Check allocation to save as version ' + (VH.current().n + 1) + '</div></div></div>';
    }
    for (var i = last; i >= 0; i--) {
      var v = versions[i];
      var isViewing = i === vi;
      var chip = i === last ? '<span class="vt-chip vt-chip--current">Current</span>' : i === 0 ? '<span class="vt-chip">Original</span>' : '';
      html += '<div class="vt-item' + (isViewing ? ' is-viewing' : '') + (s.justAdded === v.n ? ' is-new' : '') + '"' +
          ' role="listitem" tabindex="0" data-index="' + i + '" aria-current="' + (isViewing ? 'true' : 'false') + '"' +
          ' aria-label="Version ' + v.n + ', ' + VH.fmtTime(v.at) + '">' +
        '<div class="vt-rail"><span class="vt-dot"></span></div>' +
        '<div class="vt-main">' +
          '<div class="vt-row1"><span class="vt-name">Version ' + v.n + '</span>' + chip + '</div>' +
          '<div class="vt-meta">' + VH.fmtTime(v.at) + ' · ' + v.author + '</div>' +
          '<div class="vt-stats">' +
            stat('Frames', v.frames) +
            stat('Impressions', v.impressions) +
            stat('EUR', v.price) +
          '</div>' +
        '</div></div>';
    }
    var focused = document.activeElement && list.contains(document.activeElement) ? document.activeElement.closest('[data-index]') : null;
    var focusIndex = focused ? focused.dataset.index : null;
    list.innerHTML = html;
    if (focusIndex !== null) {
      var again = list.querySelector('[data-index="' + focusIndex + '"]');
      if (again) again.focus();
    }
  }

  VH.start({
    render: render,
    olderNote: 'text', // plain grey "Version 2 · time" under the figures; the panel handles navigation
    deltaLabel: function () { return ''; } // change chips only, no "vs v3" label
  });
})();
