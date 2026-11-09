/* Branch: Step through with arrows.
   The clock icon shows a "‹ Version 3 of 4 ›" control at the top of the allocation card.
   The arrows move between versions; each version is compared with the one before it. */
(function () {
  'use strict';
  var VH = window.VersionHistory;
  var el = VH.el, ICON = VH.ICON;

  var stepper = el(
    '<div class="vs-stepper" role="group" aria-label="Allocation versions" hidden>' +
      '<button type="button" class="vs-arrow" data-step="-1" aria-label="Older version">' + ICON.left + '</button>' +
      '<div class="vs-label" aria-live="polite"><div class="vs-title"></div><div class="vs-sub"></div></div>' +
      '<button type="button" class="vs-arrow" data-step="1" aria-label="Newer version">' + ICON.right + '</button>' +
    '</div>'
  );
  VH.dom.body.insertBefore(stepper, VH.dom.body.firstChild);
  var older = stepper.querySelector('[data-step="-1"]');
  var newer = stepper.querySelector('[data-step="1"]');

  function step(dir) {
    var next = VH.viewIndex() + dir;
    if (next < 0 || next > VH.lastIndex()) return;
    VH.view(next);
  }
  stepper.addEventListener('click', function (e) {
    var b = e.target.closest('.vs-arrow');
    if (b && !b.disabled) step(Number(b.dataset.step));
  });
  stepper.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });

  function render() {
    var open = VH.showHistory();
    stepper.hidden = !open;
    if (!open) return;
    var i = VH.viewIndex(), last = VH.lastIndex(), v = VH.state.versions[i];
    stepper.querySelector('.vs-title').textContent = 'Version ' + v.n + ' of ' + VH.state.versions.length;
    stepper.querySelector('.vs-sub').innerHTML = VH.fmtTime(v.at) +
      (i === last ? ' · <span class="vs-current">Current</span>' : i === 0 ? ' · Original' : '');
    older.disabled = i === 0;
    newer.disabled = i === last;
    // Keep focus usable when an arrow becomes disabled at either end
    if (document.activeElement && document.activeElement.disabled) (older.disabled ? newer : older).focus();
  }

  VH.start({
    render: render,
    deltaLabel: function () { return 'vs previous'; }, // always the version before the one shown
    olderNote: false                                   // the stepper already shows the version and time
  });
})();
