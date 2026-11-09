/* Static rebuild: a Leaflet map standing in for the app's deck.gl / Mapbox canvas,
   which is blank in a saved page. Plots the deal line's 12 allocated frames
   (Format: ABRIGOS-SF_SCROL, i.e. bus shelters) around Lisbon. */
(function () {
  'use strict';
  if (!window.L) return; // Leaflet didn't load (offline): leave the map area blank

  var wrapper = document.getElementById('deckgl-wrapper');
  if (!wrapper) return;
  var mapEl = document.createElement('div');
  mapEl.id = 'ac-map';
  mapEl.setAttribute('aria-label', 'Map of allocated frames');
  wrapper.parentElement.insertBefore(mapEl, wrapper);

  var map = L.map(mapEl, { zoomControl: false, attributionControl: true, zoomSnap: 0.25, maxZoom: 17 })
    .setView([38.73, -9.15], 13);
  var ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/';
  L.tileLayer(ESRI + 'World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 17,
    attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors'
  }).addTo(map);
  map.createPane('labels');
  map.getPane('labels').style.zIndex = 350;
  map.getPane('labels').style.pointerEvents = 'none';
  L.tileLayer(ESRI + 'World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 17, pane: 'labels' }).addTo(map);

  // 12 allocated bus-shelter frames (illustrative positions on real Lisbon streets)
  var FRAMES = [
    ['ABR-01042', 'Av. da Liberdade', 38.7205, -9.1453],
    ['ABR-01077', 'Pç. Marquês de Pombal', 38.7253, -9.1500],
    ['ABR-01113', 'Av. da República', 38.7381, -9.1455],
    ['ABR-01158', 'Av. Almirante Reis', 38.7300, -9.1352],
    ['ABR-01204', 'Av. de Roma', 38.7466, -9.1405],
    ['ABR-01236', 'Campo Grande', 38.7560, -9.1520],
    ['ABR-01271', 'Av. Fontes Pereira de Melo', 38.7310, -9.1475],
    ['ABR-01309', 'Estrada de Benfica', 38.7485, -9.1790],
    ['ABR-01342', 'Av. 24 de Julho', 38.7068, -9.1530],
    ['ABR-01388', 'Largo do Rato', 38.7202, -9.1545],
    ['ABR-01415', 'Av. de Berna', 38.7387, -9.1520],
    ['ABR-01450', 'Av. Dom João II', 38.7680, -9.0975]
  ];

  var markers = FRAMES.map(function (f) {
    return L.circleMarker([f[2], f[3]], {
      radius: 6, weight: 1.5, color: '#ffffff', fillColor: '#15115e', fillOpacity: 1
    }).bindTooltip('<b>' + f[0] + '</b> · ' + f[1] + '<br><span>Abrigo · Street Furniture · Allocated</span>',
      { className: 'ac-map-tip', direction: 'top', offset: [0, -6] }).addTo(map);
  });

  // Fit the frames into the area left uncovered by the toolbar and the summary overlay
  var bounds = L.featureGroup(markers).getBounds();
  function fit() {
    var w = mapEl.clientWidth;
    var card = document.querySelector('[data-test-id="allocation-card-container"]');
    var summary = card && card.closest('[data-map-overlay]');
    var covered = summary ? mapEl.getBoundingClientRect().right - summary.getBoundingClientRect().left : 0;
    var right = Math.max(40, Math.min(covered + 20, w * 0.45));
    map.fitBounds(bounds, { paddingTopLeft: [Math.min(80, w * 0.1), 90], paddingBottomRight: [right, 40] });
  }
  fit();

  // Hook up the app's own zoom buttons
  var zoomIn = document.querySelector('[data-test-id="zoom-in-button"]');
  var zoomOut = document.querySelector('[data-test-id="zoom-out-button"]');
  if (zoomIn) zoomIn.addEventListener('click', function () { map.zoomIn(); });
  if (zoomOut) zoomOut.addEventListener('click', function () { map.zoomOut(); });

  window.addEventListener('resize', function () { map.invalidateSize(); fit(); });
})();
