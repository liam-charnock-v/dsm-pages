/* Prototype: Leaflet map standing in for the app's deck.gl / Mapbox map.
   Plots the deal line's 154 available frames around Lisbon (Location filter: LISBOA)
   and highlights the frames in the allocation version shown on the allocation card. */
(function () {
  'use strict';
  if (!window.L) return; // Leaflet failed to load (offline): leave the map area blank

  var wrapper = document.getElementById('deckgl-wrapper');
  var mapEl = document.createElement('div');
  mapEl.id = 'ac-map';
  mapEl.setAttribute('aria-label', 'Map of available frames');
  wrapper.parentElement.insertBefore(mapEl, wrapper);

  var map = L.map(mapEl, { zoomControl: false, attributionControl: true, preferCanvas: true, zoomSnap: 0.25, maxZoom: 16 })
    .setView([38.736, -9.15], 13);
  var ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/';
  L.tileLayer(ESRI + 'World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16,
    attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors'
  }).addTo(map);
  // Place labels between the base tiles and the frame markers
  map.createPane('labels');
  map.getPane('labels').style.zIndex = 350;
  map.getPane('labels').style.pointerEvents = 'none';
  L.tileLayer(ESRI + 'World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16, pane: 'labels' }).addTo(map);

  // ---------- Deterministic frame inventory ----------
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var rand = rng(1767);
  function gauss() { return Math.sqrt(-2 * Math.log(rand() || 1e-9)) * Math.cos(2 * Math.PI * rand()); }

  // Rough outline of Lisbon's land area (keeps frames out of the Tagus)
  var LISBON = [[38.700, -9.215], [38.704, -9.180], [38.706, -9.150], [38.709, -9.132], [38.716, -9.120],
    [38.728, -9.104], [38.745, -9.099], [38.768, -9.094], [38.792, -9.100], [38.792, -9.170],
    [38.768, -9.205], [38.738, -9.218]];
  function inside(lat, lng) {
    var c = false;
    for (var i = 0, j = LISBON.length - 1; i < LISBON.length; j = i++) {
      var a = LISBON[i], b = LISBON[j];
      if ((a[1] > lng) !== (b[1] > lng) && lat < ((b[0] - a[0]) * (lng - a[1])) / (b[1] - a[1]) + a[0]) c = !c;
    }
    return c;
  }

  var STREETS = ['Av. da Liberdade', 'Av. da República', 'R. Augusta', 'Pç. Marquês de Pombal', 'Av. Almirante Reis',
    'R. do Ouro', 'Av. de Roma', 'Campo Grande', 'Av. Fontes Pereira de Melo', 'R. de São Bento',
    'Av. Infante Santo', 'Pç. do Comércio', 'Av. 24 de Julho', 'Estrada de Benfica', 'Av. da Igreja',
    'R. Morais Soares', 'Av. Estados Unidos da América', 'Av. de Berna', 'Largo do Rato', 'Av. Dom João II'];

  var frames = [];
  while (frames.length < 154) {
    var lat = 38.735 + gauss() * 0.018;
    var lng = -9.148 + gauss() * 0.024;
    if (!inside(lat, lng)) continue;
    // Central frames deliver more impressions
    var dist = Math.hypot((lat - 38.722) / 0.03, (lng + 9.142) / 0.04);
    frames.push({
      id: 'LIS-' + String(1040 + frames.length * 7).padStart(5, '0'),
      street: STREETS[Math.floor(rand() * STREETS.length)],
      lat: lat,
      lng: lng,
      score: (1.6 - Math.min(dist, 1.5)) + rand() * 0.6
    });
  }
  // The allocator picks the best-scoring frames first
  frames.sort(function (a, b) { return b.score - a.score; });
  frames.forEach(function (f, i) { f.impressions = Math.round(185000 - i * 900 + (f.score * 9000)); });

  var COLORS = { allocated: '#15115e', available: '#7d8be6' };
  var markers = frames.map(function (f) {
    var m = L.circleMarker([f.lat, f.lng], { radius: 5, weight: 1.5 }).addTo(map);
    m.bindTooltip('', { className: 'ac-map-tip', direction: 'top', offset: [0, -6] });
    return m;
  });

  function paint(allocatedCount, label) {
    markers.forEach(function (m, i) {
      var on = i < allocatedCount;
      m.setStyle(on
        ? { color: '#ffffff', fillColor: COLORS.allocated, fillOpacity: 1, radius: 5.5 }
        : { color: COLORS.available, fillColor: '#ffffff', fillOpacity: 0.9, radius: 4 });
      if (on) m.bringToFront();
      var f = frames[i];
      m.setTooltipContent('<b>' + f.id + '</b> · ' + f.street + '<br>' +
        f.impressions.toLocaleString('en-GB').replace(/,/g, ' ') + ' impressions<br>' +
        '<span>' + (on ? 'Allocated in ' + label : 'Available, not allocated') + '</span>');
    });
  }


  // Fit the frames into the map area left uncovered by the toolbar and summary overlay
  var bounds = L.latLngBounds(frames.map(function (f) { return [f.lat, f.lng]; }));
  function fit() {
    var w = mapEl.clientWidth;
    var card = document.querySelector('[data-test-id="allocation-card-container"]');
    var summary = card && card.closest('[data-map-overlay]');
    var covered = summary ? mapEl.getBoundingClientRect().right - summary.getBoundingClientRect().left : 0;
    var right = Math.max(40, Math.min(covered + 20, w * 0.45));
    map.fitBounds(bounds, { paddingTopLeft: [Math.min(70, w * 0.1), 80], paddingBottomRight: [right, 40] });
  }
  fit();

  // ---------- Hook up the app's own map controls ----------
  var zoomIn = document.querySelector('[data-test-id="zoom-in-button"]');
  var zoomOut = document.querySelector('[data-test-id="zoom-out-button"]');
  if (zoomIn) zoomIn.addEventListener('click', function () { map.zoomIn(); });
  if (zoomOut) zoomOut.addEventListener('click', function () { map.zoomOut(); });

  // Keep in sync with the allocation card (event dispatched by allocation-compare.js)
  document.addEventListener('ac:render', function (e) {
    paint(e.detail.frames, e.detail.label || (e.detail.view === 'previous' ? 'previous' : 'current'));
  });
  paint(99, 'current');

  window.addEventListener('resize', function () { map.invalidateSize(); fit(); });
})();
