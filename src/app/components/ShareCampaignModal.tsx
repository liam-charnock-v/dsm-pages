import { useState } from "react";
import { createPortal } from "react-dom";
import svgPaths from "../../imports/Frame78891908/svg-dqzac272r9";

/* ── types ────────────────────────────────────────────────── */
type MetricKey = "shareOfTime" | "impressions" | "indexedPrice" | "grossPrice" | "repetitions";

const METRICS: { key: MetricKey; label: string }[] = [
  { key: "shareOfTime",   label: "Share of time" },
  { key: "impressions",   label: "Impressions" },
  { key: "indexedPrice",  label: "Indexed Price" },
  { key: "grossPrice",    label: "Gross Price" },
  { key: "repetitions",   label: "Repetitions" },
];

const GROUP_BY_CHIPS = [
  "Business Area", "Channel", "City", "Conurbation",
  "Country", "County", "Frame Size", "Product Format",
  "Revenue Stream", "Size code", "TV Area",
];

/* ── sub-components ───────────────────────────────────────── */
function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 16, height: 16, borderRadius: 2, flexShrink: 0, cursor: "pointer",
        position: "relative",
        backgroundColor: checked ? "#272199" : "#fff",
        boxShadow: checked
          ? "inset 0px -1px 0px 0px rgba(16,16,52,0.08)"
          : "0px 1px 2px 0px rgba(16,16,52,0.08)",
        border: checked ? "none" : "1px solid rgba(19,18,33,0.1)",
      }}
    >
      {checked && (
        <div style={{ position: "absolute", bottom: "18.75%", left: "12.5%", right: "9.37%", top: "25%" }}>
          <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 9.37542 6.7505">
            <path d="M9.26552 0.640521L3.26552 6.64052C3.23069 6.67539 3.18934 6.70305 3.14381 6.72192C3.09829 6.74079 3.04949 6.7505 3.00021 6.7505C2.95093 6.7505 2.90213 6.74079 2.85661 6.72192C2.81108 6.70305 2.76972 6.67539 2.7349 6.64052L0.109896 4.01552C0.0395308 3.94516 0 3.84972 0 3.75021C0 3.6507 0.0395308 3.55526 0.109896 3.4849C0.180261 3.41453 0.275697 3.375 0.375208 3.375C0.47472 3.375 0.570156 3.41453 0.640521 3.4849L3.00021 5.84505L8.7349 0.109896C8.80526 0.0395306 8.9007 0 9.00021 0C9.09972 0 9.19516 0.0395306 9.26552 0.109896C9.33589 0.180261 9.37542 0.275697 9.37542 0.375208C9.37542 0.47472 9.33589 0.570156 9.26552 0.640521Z" fill="white" />
          </svg>
        </div>
      )}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 32, height: 16, borderRadius: 999, cursor: "pointer", position: "relative",
        backgroundColor: on ? "#272199" : "#52515e",
        boxShadow: "0px 1px 2px 0px rgba(16,16,52,0.08)",
        display: "flex", alignItems: "center",
        padding: 2,
        justifyContent: on ? "flex-end" : "flex-start",
        transition: "background-color 0.2s",
        flexShrink: 0,
      }}
    >
      <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#fff", boxShadow: "inset 0px -1px 0px 0px rgba(16,16,52,0.08)" }} />
    </div>
  );
}

function Chip({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex", height: 28, alignItems: "center", justifyContent: "center",
        overflow: "hidden", borderRadius: 999, boxShadow: "0px 1px 2px 0px rgba(16,16,52,0.08)",
        backgroundColor: active ? "rgba(44,36,195,0.05)" : "rgba(19,18,33,0.05)",
        flexShrink: 0, cursor: "pointer",
      }}
    >
      <div style={{ backgroundColor: active ? "#272199" : "#52515e", display: "flex", height: "100%", alignItems: "center", padding: "0 6px", borderRadius: 999 }}>
        <span style={{ fontSize: 13, color: active ? "#f9fafe" : "#fff", fontFamily: "Inter, sans-serif", lineHeight: "20px", whiteSpace: "nowrap" }}>{label}</span>
      </div>
      {active && (
        <div
          onClick={e => { e.stopPropagation(); onToggle(); }}
          style={{ display: "flex", alignItems: "center", padding: "0 6px", cursor: "pointer" }}
        >
          <div style={{ width: 16, height: 16, overflow: "hidden", position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: "18.75%" }}>
              <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
                <path d={svgPaths.p2662980} fill="#2C24C3" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── main modal ───────────────────────────────────────────── */
interface ShareCampaignModalProps {
  onClose: () => void;
}

export function ShareCampaignModal({ onClose }: ShareCampaignModalProps) {
  const [planned, setPlanned]   = useState<Set<MetricKey>>(new Set());
  const [delivered, setDelivered] = useState<Set<MetricKey>>(new Set());
  const [includeGroupBys, setIncludeGroupBys] = useState(false);
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set(GROUP_BY_CHIPS));
  const toggleChip = (label: string) =>
    setActiveChips(prev => { const n = new Set(prev); n.has(label) ? n.delete(label) : n.add(label); return n; });
  const [includeMap, setIncludeMap]   = useState(true);
  const [disableAccess, setDisableAccess] = useState(false);

  const togglePlanned   = (k: MetricKey) => setPlanned(p   => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const toggleDelivered = (k: MetricKey) => setDelivered(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });

  return createPortal(
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(19,18,33,0.4)", backdropFilter: "blur(2px)", display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}
    >
      <div
        style={{ width: 509, backgroundColor: "#fff", borderRadius: 8, boxShadow: "0px 8px 32px rgba(16,16,52,0.18)", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Scrollable body */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {/* Header section */}
          <div style={{ padding: 24, paddingBottom: 0, display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 24, height: 24, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: "18.75% 9.37% 12.5% 9.38%" }}>
                  <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 19.5006 16.5004">
                    <path d={svgPaths.p934da80} fill="#605F6B" />
                  </svg>
                </div>
              </div>
              <p style={{ fontSize: 15, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "24px", margin: 0 }}>Share campaign</p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ width: 24, height: 24, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: "18.75%" }}>
                  <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 15.0008 15.0008">
                    <path d={svgPaths.p3bbf7480} fill="#605F6B" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Allocation report label */}
            <p style={{ fontSize: 13, fontWeight: 500, color: "#42414e", fontFamily: "Inter, sans-serif", lineHeight: "20px", margin: 0 }}>Allocation report</p>

            {/* Subtitle */}
            <p style={{ fontSize: 13, fontWeight: 400, color: "#42414e", fontFamily: "Inter, sans-serif", lineHeight: "20px", margin: 0 }}>Select which allocation metrics to include on the Campaign plan</p>

            {/* Metric table */}
            <div style={{ display: "flex", backgroundColor: "#fff", overflow: "hidden" }}>
              {/* Metric column */}
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", height: 30, lineHeight: "20px", margin: 0, paddingLeft: 8, display: "flex", alignItems: "center" }}>Metric</p>
                {METRICS.map(m => (
                  <div key={m.key} style={{ height: 28, display: "flex", alignItems: "center", padding: "4px 12px 4px 8px", borderRadius: 3 }}>
                    <span style={{ fontSize: 13, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Planned column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 79 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", height: 30, lineHeight: "20px", margin: 0, display: "flex", alignItems: "center" }}>Planned</p>
                {METRICS.map(m => (
                  <div key={m.key} style={{ height: 28, display: "flex", alignItems: "center", padding: "4px 12px 4px 8px", width: "100%" }}>
                    <Checkbox checked={planned.has(m.key)} onChange={() => togglePlanned(m.key)} />
                  </div>
                ))}
              </div>

              {/* Delivered column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 79 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", height: 30, lineHeight: "20px", margin: 0, display: "flex", alignItems: "center" }}>Delivered</p>
                {METRICS.map(m => (
                  <div key={m.key} style={{ height: 28, display: "flex", alignItems: "center", padding: "4px 12px 4px 8px", width: "100%" }}>
                    <Checkbox checked={delivered.has(m.key)} onChange={() => toggleDelivered(m.key)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "rgba(19,18,33,0.1)", margin: "0 0" }} />

            {/* Include Group by's */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#42414e", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>Include Group by's</span>
                <Toggle on={includeGroupBys} onChange={() => setIncludeGroupBys(v => !v)} />
              </div>

              {includeGroupBys && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {GROUP_BY_CHIPS.map(label => (
                    <Chip key={label} label={label} active={activeChips.has(label)} onToggle={() => toggleChip(label)} />
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "rgba(19,18,33,0.1)" }} />

            {/* Configure Map */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#42414e", fontFamily: "Inter, sans-serif", lineHeight: "20px", margin: 0 }}>Configure Map</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#42414e", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>Include map on Campaign plan</span>
                <Toggle on={includeMap} onChange={() => setIncludeMap(v => !v)} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer — sticky */}
        <div style={{ borderTop: "1px solid rgba(19,18,33,0.1)", backgroundColor: "#fff", padding: "16px 40px", display: "flex", flexDirection: "column", gap: 16, alignItems: "center", flexShrink: 0 }}>
          {/* Generate link button */}
          <button
            style={{ width: "100%", height: 36, borderRadius: 6, backgroundColor: "#15115e", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, boxShadow: "0px 2px 1.5px rgba(0,0,0,0.08)" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <div style={{ width: 16, height: 16, overflow: "hidden", position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: "12.49% 6.24% 12.5% 6.25%" }}>
                <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 14.0016 12.0008">
                  <path d={svgPaths.p1bda3480} fill="#F9FAFE" />
                </svg>
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#f9fafe", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>Generate link</span>
          </button>

          {/* Disable campaign plan access */}
          <div style={{ width: "100%", backgroundColor: "#fff", borderRadius: 4, border: "1px solid rgba(19,18,33,0.1)", padding: "12px 12px", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Toggle on={disableAccess} onChange={() => setDisableAccess(v => !v)} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>Disable campaign plan access</span>
                <span style={{ fontSize: 13, color: "#42414e", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>Turning this on will deactivate the campaign plan link.</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p style={{ fontSize: 13, color: "#42414e", fontFamily: "Inter, sans-serif", lineHeight: "20px", margin: 0, textAlign: "center" }}>
            This read-only link will be accessible by anyone.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
