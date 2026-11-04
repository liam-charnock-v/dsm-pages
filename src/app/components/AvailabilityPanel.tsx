import { Download } from "lucide-react";
import { CampaignStatusCard } from "./CampaignStatusCard";
import { Metrics, TARGETS } from "./swap/swapData";

export type AvailabilityState = "missed" | "swap" | "done";

interface Props {
  visible: boolean;
  metrics: Metrics;
  /** missed = targets not met, swap = swap in progress, done = targets met */
  state: AvailabilityState;
  top?: number;
  onSwapFrame?: () => void;
}

/** Space-grouped thousands, e.g. 1 228 104 080 */
const fmtSpaced = (n: number) => Math.round(n).toLocaleString("en-US").replace(/,/g, "\u00a0");

export function AvailabilityPanel({ visible, metrics, state, top = 76, onSwapFrame }: Props) {
  const rows = [
    { label: "Frames", value: fmtSpaced(metrics.frames), target: fmtSpaced(TARGETS.frames) },
    { label: "Impressions", value: fmtSpaced(metrics.impressions), target: fmtSpaced(TARGETS.impressions) },
    { label: "Budget", value: `€${fmtSpaced(metrics.budget)}`, target: `€${fmtSpaced(TARGETS.budget)}` },
  ];


  return (
    <div
      style={{
        position: "fixed",
        top,
        right: 20,
        width: 316,
        zIndex: 40,
        transform: visible ? "translateX(0)" : "translateX(calc(100% + 28px))",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.28s ease, top 0.2s ease",
        pointerEvents: visible ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* ── Availability card ── */}
      <div
        style={{
          backgroundColor: "#ebeefe",
          borderRadius: 12,
          padding: 8,
          boxShadow:
            "0px 4px 12px rgba(16,16,52,0.08), 0px 1px 3px rgba(16,16,52,0.06)",
        }}
      >
        <div className="flex items-center justify-between" style={{ padding: "2px 6px 8px 6px" }}>
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--accent)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              lineHeight: "20px",
            }}
          >
            Availability
          </span>
          <button
            type="button"
            className="flex items-center cursor-pointer border-none bg-transparent p-0 hover:underline outline-none focus-visible:underline"
            style={{ gap: 4, fontSize: "var(--text-xs)", lineHeight: "20px", color: "var(--accent)" }}
          >
            <Download size={14} aria-hidden="true" />
            Advanced Availability
          </button>
        </div>

        <div
          className="flex flex-col"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            padding: "16px 16px",
            gap: 18,
          }}
        >
          {rows.map((r) => (
            <div key={r.label} className="flex flex-col" style={{ gap: 6 }}>
              <div className="flex items-baseline justify-between" style={{ gap: 12 }}>
                <span style={{ fontSize: "var(--text-sm)", color: "var(--foreground)", lineHeight: "20px" }}>
                  {r.label}
                </span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", lineHeight: "24px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                  {r.value}
                </span>
              </div>
              <span style={{ alignSelf: "flex-end", fontSize: "var(--text-sm)", color: "#7c7b87", lineHeight: "20px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                {r.target}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Campaign Status card (12px gap comes from parent flex gap) ── */}
      <CampaignStatusCard />

      {/* ── Optimise card — only while targets are missed ── */}
      {state === "missed" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: 12,
            boxShadow: "0px 3px 4px 0px rgba(16,16,52,0.06), 0px 1px 2px 0px rgba(16,16,52,0.04)",
            border: "1px solid rgba(19,18,33,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div className="flex flex-col" style={{ gap: 2, paddingLeft: 4 }}>
            <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--font-weight-medium)", lineHeight: "16px", color: "var(--foreground)" }}>
              Optimise campaign
            </span>
            <span style={{ fontSize: "var(--text-xs)", lineHeight: "16px", color: "var(--muted-foreground)" }}>
              Targets are not met. Choose how to close the gap.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Reshuffle campaign", sub: "Rebalance frames within this deal line", action: undefined },
              { label: "Swap frames", sub: "Take specific frames from other campaigns for a set period", action: onSwapFrame },
            ].map(({ label, sub, action }, i, arr) => (
              <button
                key={label}
                onClick={action}
                disabled={!action}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 10px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: 8,
                  outline: "none",
                  cursor: action ? "pointer" : "default",
                  textAlign: "left",
                  transition: "background-color 0.12s ease",
                  borderBottom: i < arr.length - 1 ? "1px solid rgba(19,18,33,0.07)" : "none",
                }}
                onMouseEnter={(e) => action && (e.currentTarget.style.backgroundColor = "rgba(19,18,33,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", lineHeight: "20px", color: "var(--accent)" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", lineHeight: "16px", color: "var(--muted-foreground)" }}>
                    {sub}
                  </span>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginLeft: 8 }} aria-hidden="true">
                  <path d="M6 3L11 8L6 13" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
