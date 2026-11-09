import { ArrowLeftRight, Download, Shuffle } from "lucide-react";
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
          backgroundColor: "var(--primary-200)",
          borderRadius: 12,
          padding: 4,
          boxShadow: "var(--elevation-sm)",
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
                <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--essential-primary)", lineHeight: "20px" }}>
                  {r.label}
                </span>
                <span style={{ fontSize: 20, fontWeight: "var(--font-weight-semibold)", color: "var(--essential-primary)", lineHeight: "28px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                  {r.value}
                </span>
              </div>
              <span style={{ alignSelf: "flex-end", fontSize: "var(--text-sm)", color: "var(--essential-tertiary)", lineHeight: "20px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                {r.target}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Campaign Status card (12px gap comes from parent flex gap) ── */}
      <CampaignStatusCard />

      {/* ── Campaign optimisation card — only while targets are missed ── */}
      {state === "missed" && (
        <div
          style={{
            backgroundColor: "var(--neutral-100)",
            borderRadius: 12,
            border: "1px solid var(--neutral-300)",
            boxShadow: "var(--elevation-sm)",
          }}
        >
          <div style={{ padding: "4px 8px", fontSize: "var(--text-xs)", lineHeight: "20px", color: "var(--essential-tertiary)" }}>
            Campaign optimisation
          </div>
          <div className="flex" style={{ gap: 8, padding: 12, paddingTop: 0 }}>
            {[
              { label: "Reshuffle", icon: <Shuffle size={14} aria-hidden="true" />, action: undefined, primary: false },
              { label: "Swap frames", icon: <ArrowLeftRight size={14} aria-hidden="true" />, action: onSwapFrame, primary: true },
            ].map(({ label, icon, action, primary }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                disabled={!action}
                className="flex flex-1 items-center justify-center cursor-pointer outline-none transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                style={{
                  gap: 6,
                  height: 32,
                  borderRadius: 6,
                  fontSize: "var(--text-sm)",
                  boxShadow: "var(--elevation-sm)",
                  backgroundColor: primary ? "var(--primary-900)" : "#fff",
                  color: primary ? "var(--primary-50)" : "var(--primary-600)",
                  border: primary ? "1px solid transparent" : "1px solid var(--neutral-300)",
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
