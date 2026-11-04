import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Frame { id: number; lat: number; lng: number; }
interface Cluster { count: number; lat: number; lng: number; x?: number; y?: number; }
interface FocusTarget { lat: number; lng: number; nonce: number; }
interface SwapFrameMarker { id: string; lat: number; lng: number; tone?: "brand" | "success"; }
interface MapViewProps {
  showFrames?: boolean;
  onMarkerClick?: (cluster: Cluster) => void;
  focusTarget?: FocusTarget | null;
  swapFrames?: SwapFrameMarker[];
  highlightedFrameId?: string | null;
  onFrameHover?: (id: string | null) => void;
}

/* ─────────────────────────────────────────────
   Madrid OOH hotspots — weighted distribution
───────────────────────────────────────────── */
const HOTSPOTS = [
  { lat: 40.4200, lng: -3.7050, w: 18 }, // Gran Vía
  { lat: 40.4169, lng: -3.7035, w: 14 }, // Puerta del Sol
  { lat: 40.4380, lng: -3.6905, w: 12 }, // Paseo de la Castellana
  { lat: 40.4066, lng: -3.6892, w: 10 }, // Atocha
  { lat: 40.4250, lng: -3.6850, w:  9 }, // Salamanca / Serrano
  { lat: 40.4233, lng: -3.7122, w:  8 }, // Plaza de España
  { lat: 40.4260, lng: -3.7020, w:  7 }, // Malasaña / Fuencarral
  { lat: 40.4216, lng: -3.6795, w:  6 }, // Retiro / Alcalá
  { lat: 40.4325, lng: -3.7036, w:  6 }, // Chamberí / Quevedo
  { lat: 40.4500, lng: -3.6920, w:  5 }, // AZCA
  { lat: 40.4113, lng: -3.7080, w:  4 }, // La Latina
  { lat: 40.4349, lng: -3.7190, w:  4 }, // Moncloa
  { lat: 40.4086, lng: -3.7010, w:  4 }, // Lavapiés
];
const TOTAL_W = HOTSPOTS.reduce((s, h) => s + h.w, 0);

/*
 * Spread calibration at Madrid (40.4°N):
 *   1° lat ≈ 111 km,  1° lng ≈ 85 km  → ratio 0.76
 *   LAT_SPREAD / 2 = 0.004° ≈ 450 m radius per hotspot cloud
 *   LNG_SPREAD compensates so clouds are circular on the ground
 */
const LNG_RATIO = 0.76;
const LAT_SPREAD = 0.008;
const LNG_SPREAD = LAT_SPREAD / LNG_RATIO;

function generateFrames(count: number): Frame[] {
  const frames: Frame[] = [];
  for (let i = 0; i < count; i++) {
    let w = Math.random() * TOTAL_W;
    let h = HOTSPOTS[0];
    for (const spot of HOTSPOTS) { w -= spot.w; if (w <= 0) { h = spot; break; } }
    frames.push({
      id: i,
      lat: h.lat + (Math.random() - 0.5) * LAT_SPREAD,
      lng: h.lng + (Math.random() - 0.5) * LNG_SPREAD,
    });
  }
  return frames;
}

/* ─────────────────────────────────────────────
   Greedy geographic clustering
   Radius in latitude-degree units.
   Distance corrected for Madrid aspect ratio.
───────────────────────────────────────────── */
const RADII: Record<number, number> = {
   9: 0.18, 10: 0.09, 11: 0.045, 12: 0.022,
  13: 0.009, 14: 0.0045, 15: 0.002, 16: 0.0008,
  17: 0.0003, 18: 0,
};
function getRadius(zoom: number): number {
  const z = Math.round(zoom);
  if (z <= 9)  return 0.25;
  if (z >= 18) return 0;
  return RADII[z] ?? 0;
}

function clusterFrames(frames: Frame[], radiusDeg: number): Cluster[] {
  if (radiusDeg === 0) return frames.map(f => ({ count: 1, lat: f.lat, lng: f.lng }));
  const taken = new Set<number>();
  const out: Cluster[] = [];
  for (let i = 0; i < frames.length; i++) {
    if (taken.has(i)) continue;
    let sumLat = frames[i].lat, sumLng = frames[i].lng, count = 1;
    taken.add(i);
    for (let j = i + 1; j < frames.length; j++) {
      if (taken.has(j)) continue;
      const dlat = frames[i].lat - frames[j].lat;
      const dlng = (frames[i].lng - frames[j].lng) * LNG_RATIO;
      if (Math.sqrt(dlat * dlat + dlng * dlng) <= radiusDeg) {
        sumLat += frames[j].lat; sumLng += frames[j].lng; count++; taken.add(j);
      }
    }
    out.push({ count, lat: sumLat / count, lng: sumLng / count });
  }
  return out;
}

/* ─────────────────────────────────────────────
   Visual tiers — matches Figma cluster sizes
───────────────────────────────────────────── */
function getTier(count: number) {
  if (count === 1)   return { outer:  0, inner: 16, fs:  0 };
  if (count <= 4)    return { outer: 36, inner: 20, fs: 10 };
  if (count <= 24)   return { outer: 46, inner: 24, fs: 10 };
  if (count <= 99)   return { outer: 56, inner: 28, fs: 11 };
  if (count <= 499)  return { outer: 66, inner: 33, fs: 11 };
  return               { outer: 78, inner: 40, fs: 12 };
}
function fmtCount(n: number) {
  if (n >= 10000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000)  return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

/* ─────────────────────────────────────────────
   divIcon HTML — Figma exact: rgba(44,36,195)
   IMPORTANT: the scale pop animation is on
   ".cluster-inner" — a child div INSIDE the
   icon HTML — never on the Leaflet wrapper,
   because Leaflet owns wrapper's transform
   (translate3d) for positioning.
───────────────────────────────────────────── */
function makeIcon(c: Cluster, animDelay = 0): L.DivIcon {
  const { count } = c;
  const { outer, inner, fs } = getTier(count);
  const delay = `${animDelay}ms`;
  let html: string;

  if (count === 1) {
    html = `
      <div class="cluster-inner" style="
        width:${inner}px;height:${inner}px;border-radius:50%;
        background:rgba(44,36,195,0.85);
        border:2px solid #F0F2FE;
        box-shadow:0 2px 6px rgba(19,18,33,0.22);
        transform:translate(-50%,-50%) scale(0.6);
        transition:transform 0.28s cubic-bezier(0.34,1.56,0.64,1) ${delay};
      "></div>`;
  } else {
    const inset = Math.round((outer - inner) / 2);
    html = `
      <div class="cluster-inner" style="
        position:relative;width:${outer}px;height:${outer}px;
        transform:translate(-50%,-50%) scale(0.6);
        transition:transform 0.28s cubic-bezier(0.34,1.56,0.64,1) ${delay};
      ">
        <div style="
          position:absolute;inset:0;border-radius:100px;
          background:rgba(44,36,195,0.18);
          border:1px solid rgba(44,36,195,0.28);
        "></div>
        <div style="
          position:absolute;inset:${inset}px;border-radius:50%;
          background:rgba(44,36,195,0.85);
          border:1.5px solid #F0F2FE;
          box-shadow:0 2px 4px rgba(19,18,33,0.2);
          display:flex;align-items:center;justify-content:center;
        ">
          <span style="
            color:#fff;font-size:${fs}px;font-weight:700;
            font-family:'Inter',sans-serif;letter-spacing:-0.04em;
            line-height:1;white-space:nowrap;
          ">${fmtCount(count)}</span>
        </div>
      </div>`;
  }

  return L.divIcon({
    html,
    className: "ooh-cluster-icon",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

/* ─────────────────────────────────────────────
   Injected CSS
   NOTE: .ooh-cluster-icon only transitions
   opacity — Leaflet owns its transform.
───────────────────────────────────────────── */
function makeFocusIcon(): L.DivIcon {
  return L.divIcon({
    html: `
      <div style="
        position:relative;width:36px;height:36px;
        transform:translate(-50%,-50%);
      ">
        <div class="ooh-focus-ring" style="
          position:absolute;inset:0;border-radius:50%;
          background:rgba(44,36,195,0.18);
          border:1.5px solid rgba(44,36,195,0.5);
          transform-origin:center center;
        "></div>
        <div style="
          position:absolute;inset:7px;border-radius:50%;
          background:rgba(44,36,195,0.95);
          border:2.5px solid #fff;
          box-shadow:0 2px 10px rgba(19,18,33,0.35);
        "></div>
      </div>
    `,
    className: "ooh-focus-icon",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function makeSwapMarkerIcon(highlighted: boolean, tone: "brand" | "success" = "brand"): L.DivIcon {
  const rgb = tone === "success" ? "18,140,90" : "44,36,195";
  const html = highlighted
    ? `<div style="position:relative;width:28px;height:28px;transform:translate(-50%,-50%);">
        <div style="position:absolute;inset:-4px;border-radius:50%;background:rgba(${rgb},0.18);border:1.5px solid rgba(${rgb},0.45);animation:swapFramePulse 1.4s ease-out infinite;"></div>
        <div style="position:absolute;inset:4px;border-radius:50%;background:rgba(${rgb},1);border:2.5px solid #fff;box-shadow:0 0 12px rgba(${rgb},0.55),0 2px 6px rgba(19,18,33,0.3);"></div>
      </div>`
    : `<div style="width:14px;height:14px;border-radius:50%;background:rgba(${rgb},0.9);border:2px solid #fff;box-shadow:0 2px 6px rgba(19,18,33,0.22);transform:translate(-50%,-50%);transition:all 0.18s ease;"></div>`;
  return L.divIcon({ html, className: "ooh-swap-frame-icon", iconSize: [0, 0], iconAnchor: [0, 0] });
}

/*
 * Minimal basemap: a label-free base plus a separate labels layer,
 * so labels can be kept quiet without washing out the base.
 * OSM (tinted) is only a fallback if Esri is unreachable.
 */
interface TileProvider {
  base: string;
  labels?: string;
  attribution: string;
  maxNativeZoom?: number;
  className?: string;
}
const TILE_PROVIDERS: TileProvider[] = [
  {
    base: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    labels: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
    maxNativeZoom: 16,
  },
  {
    base: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    className: "ooh-map-tinted",
  },
];

const STYLES = `
  .leaflet-container {
    width:100%!important; height:100%!important;
    background-color:#FAFAF8;
    font-family:'Inter', sans-serif;
  }
  .leaflet-tile-pane img, .leaflet-tile {
    max-width:none!important; max-height:none!important;
    width:256px!important; height:256px!important;
  }
  .leaflet-container img { max-width:none!important; height:auto; }
  .ooh-map-labels { opacity:0.75; }
  .ooh-map-tinted {
    filter: grayscale(1) contrast(0.78) brightness(1.14) sepia(0.12) hue-rotate(205deg) saturate(1.6);
  }
  .leaflet-container .leaflet-control-attribution {
    font-size:9px;
    background: transparent;
    color: #9a99a6;
    padding: 0 6px 2px;
  }
  .leaflet-container .leaflet-control-attribution a { color: #9a99a6; }

  /* Leaflet owns transform on this element for positioning — DO NOT touch it */
  .ooh-cluster-icon {
    background: transparent !important;
    border: none !important;
    opacity: 0;
    transition: opacity 0.18s ease;
  }
  .ooh-focus-icon {
    background: transparent !important;
    border: none !important;
  }
  .ooh-swap-frame-icon {
    background: transparent !important;
    border: none !important;
  }
  @keyframes swapFramePulse {
    0%   { transform: scale(1);   opacity: 0.85; }
    70%  { transform: scale(2);   opacity: 0; }
    100% { transform: scale(2);   opacity: 0; }
  }
  @keyframes focusPulse {
    0%   { transform: scale(1);   opacity: 0.7; }
    70%  { transform: scale(2.2); opacity: 0;   }
    100% { transform: scale(2.2); opacity: 0;   }
  }
  .ooh-focus-ring {
    animation: focusPulse 2s ease-out infinite;
  }
`;

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export function MapView({ showFrames = false, onMarkerClick, focusTarget, swapFrames, highlightedFrameId, onFrameHover }: MapViewProps) {
  const containerRef    = useRef<HTMLDivElement>(null);
  const mapRef          = useRef<L.Map | null>(null);
  const layerRef        = useRef<L.LayerGroup | null>(null);
  const framesRef       = useRef<Frame[]>([]);
  const showRef         = useRef(showFrames);
  const swapTimer       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  const focusMarkerRef  = useRef<L.Marker | null>(null);
  const swapLayerRef    = useRef<L.LayerGroup | null>(null);
  const swapMarkersRef  = useRef<Map<string, L.Marker>>(new Map());
  const swapTonesRef    = useRef<Map<string, "brand" | "success">>(new Map());
  const prevHighlightRef = useRef<string | null>(null);
  const onFrameHoverRef  = useRef(onFrameHover);
  onMarkerClickRef.current = onMarkerClick;
  onFrameHoverRef.current  = onFrameHover;

  showRef.current = showFrames;

  /* ── Core render: compute clusters, swap markers, animate in ── */
  function renderClusters(isInitial: boolean) {
    const map   = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    if (swapTimer.current) { clearTimeout(swapTimer.current); swapTimer.current = null; }

    // 1 ── Fade out existing wrappers (opacity only — never touch transform)
    document.querySelectorAll<HTMLElement>(".ooh-cluster-icon").forEach(el => {
      el.style.transition = "opacity 0.14s ease";
      el.style.opacity    = "0";
    });

    const SWAP_DELAY = 150;

    swapTimer.current = setTimeout(() => {
      layer.clearLayers();

      if (!showRef.current) return;

      const zoom     = map.getZoom();
      const radius   = getRadius(zoom);
      const clusters = clusterFrames(framesRef.current, radius);

      // 2 ── Add markers with staggered pop-in delay baked into icon HTML
      clusters.forEach((c, idx) => {
        const delay = isInitial ? Math.min(idx * 14, 300) : 0;
        const marker = L.marker([c.lat, c.lng], { icon: makeIcon(c, delay) }).addTo(layer);
        marker.on("click", () => {
          const pt = map.latLngToContainerPoint([c.lat, c.lng]);
          onMarkerClickRef.current?.({ ...c, x: pt.x, y: pt.y });
        });
      });

      // 3 ── Fade in wrappers (opacity 0 → 1).
      //      Transform is NOT touched — Leaflet keeps translate3d intact.
      requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(".ooh-cluster-icon").forEach(el => {
          el.style.transition = "opacity 0.2s ease";
          el.style.opacity    = "0";
        });

        // One frame later: trigger opacity transition + inner scale pop
        requestAnimationFrame(() => {
          document.querySelectorAll<HTMLElement>(".ooh-cluster-icon").forEach(el => {
            el.style.opacity = "1";
          });
          // Trigger the scale-pop on the inner content div
          document.querySelectorAll<HTMLElement>(".cluster-inner").forEach(el => {
            el.style.transform = el.style.transform.includes("translate(-50%,-50%)")
              ? "translate(-50%,-50%) scale(1)"
              : el.style.transform.replace("scale(0.6)", "scale(1)");
          });
        });
      });
    }, SWAP_DELAY);
  }

  /* ── Map initialisation (once) ── */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [40.4250, -3.6980],
      zoom: 14,
      zoomControl: false,
      attributionControl: true,
    });
    map.attributionControl.setPrefix(false);

    // Try each tile provider in turn; move on when its base keeps erroring
    let providerIdx = 0;
    let errorCount = 0;
    let tiles: L.TileLayer;
    let labels: L.TileLayer | null = null;
    const mountTiles = () => {
      const p = TILE_PROVIDERS[providerIdx];
      // Allow one level of overzoom past the native tiles; labels stop at
      // native zoom so they never render as upscaled, blurry text.
      const maxZoom = p.maxNativeZoom ? p.maxNativeZoom + 1 : 19;
      map.setMaxZoom(maxZoom);
      tiles = L.tileLayer(p.base, {
        maxZoom,
        maxNativeZoom: p.maxNativeZoom,
        attribution: p.attribution,
        className: p.className,
      });
      labels = p.labels
        ? L.tileLayer(p.labels, { maxZoom: p.maxNativeZoom, className: "ooh-map-labels" })
        : null;
      tiles.on("tileload", () => { errorCount = 0; });
      tiles.on("tileerror", () => {
        errorCount++;
        if (errorCount >= 4 && providerIdx < TILE_PROVIDERS.length - 1) {
          providerIdx++;
          errorCount = 0;
          map.removeLayer(tiles);
          if (labels) map.removeLayer(labels);
          mountTiles();
        }
      });
      tiles.addTo(map);
      labels?.addTo(map);
      tiles.bringToBack();
    };
    mountTiles();

    const layer = L.layerGroup().addTo(map);
    layerRef.current = layer;
    mapRef.current   = map;
    swapLayerRef.current = null;
    focusMarkerRef.current = null;

    framesRef.current = generateFrames(220);

    map.on("zoomend", () => renderClusters(false));

    const raf = requestAnimationFrame(() => {
      if (mapRef.current === map) map.invalidateSize();
    });

    return () => {
      cancelAnimationFrame(raf);
      if (swapTimer.current) clearTimeout(swapTimer.current);
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
      swapLayerRef.current = null;
      focusMarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── React to showFrames changes ── */
  useEffect(() => {
    if (!mapRef.current) return;
    renderClusters(showFrames); // isInitial = true when first shown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFrames]);

  /* ── Resize observer (drawer / panel) ── */
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(() => {
      try {
        if (mapRef.current && containerRef.current?.isConnected) mapRef.current.invalidateSize();
      } catch {
        // Map may be mid-teardown; ignore
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Focus target: fly to location, highlight marker, open frame card ── */
  useEffect(() => {
    const map = mapRef.current;

    // Remove previous focus marker
    if (focusMarkerRef.current) {
      focusMarkerRef.current.remove();
      focusMarkerRef.current = null;
    }

    if (!focusTarget || !map) return;

    // Add highlighted focus marker
    const fMarker = L.marker([focusTarget.lat, focusTarget.lng], {
      icon: makeFocusIcon(),
      zIndexOffset: 1000,
    }).addTo(map);
    focusMarkerRef.current = fMarker;

    // Fly to the frame
    map.flyTo([focusTarget.lat, focusTarget.lng], 16, { duration: 1.0 });

    // After animation ends, fire onMarkerClick to open the frame card
    const onMoveEnd = () => {
      if (!mapRef.current) return;
      const pt = map.latLngToContainerPoint([focusTarget.lat, focusTarget.lng]);
      onMarkerClickRef.current?.({ count: 1, lat: focusTarget.lat, lng: focusTarget.lng, x: pt.x, y: pt.y });
    };
    map.once("moveend", onMoveEnd);

    return () => {
      map.off("moveend", onMoveEnd);
    };
  // focusTarget is a new object on each focus (nonce changes), so this is correct
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusTarget]);

  /* ── Render / clear named swap-frame markers ── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Lazily create a dedicated layer for swap frame pins
    if (!swapLayerRef.current) {
      swapLayerRef.current = L.layerGroup().addTo(map);
    }

    // Clear existing swap pins
    swapLayerRef.current.clearLayers();
    swapMarkersRef.current.clear();
    swapTonesRef.current.clear();
    prevHighlightRef.current = null;

    if (!swapFrames?.length) return;

    swapFrames.forEach(frame => {
      const marker = L.marker([frame.lat, frame.lng], {
        icon: makeSwapMarkerIcon(false, frame.tone),
        zIndexOffset: 600,
      });
      swapTonesRef.current.set(frame.id, frame.tone ?? "brand");
      marker.on("mouseover", () => onFrameHoverRef.current?.(frame.id));
      marker.on("mouseout",  () => onFrameHoverRef.current?.(null));
      marker.on("click", () => {
        const pt = map.latLngToContainerPoint([frame.lat, frame.lng]);
        onMarkerClickRef.current?.({ count: 1, lat: frame.lat, lng: frame.lng, x: pt.x, y: pt.y });
      });
      swapLayerRef.current!.addLayer(marker);
      swapMarkersRef.current.set(frame.id, marker);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapFrames]);

  /* ── Update swap-frame marker icons on hover change ── */
  useEffect(() => {
    const prev = prevHighlightRef.current;
    const next = highlightedFrameId ?? null;
    if (prev === next) return;

    if (prev) {
      const m = swapMarkersRef.current.get(prev);
      if (m) m.setIcon(makeSwapMarkerIcon(false, swapTonesRef.current.get(prev)));
    }
    if (next) {
      const m = swapMarkersRef.current.get(next);
      if (m) {
        m.setIcon(makeSwapMarkerIcon(true, swapTonesRef.current.get(next)));
        m.setZIndexOffset(1000);
      }
    }
    if (prev) swapMarkersRef.current.get(prev)?.setZIndexOffset(600);
    prevHighlightRef.current = next;
  }, [highlightedFrameId]);

  return (
    <>
      <style>{STYLES}</style>
      <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 0 }} />
    </>
  );
}
