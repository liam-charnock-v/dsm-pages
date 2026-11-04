import { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-vdmg2nffby";

/* ─────────────────────────────────────────────
   Status config
───────────────────────────────────────────── */
export type CampaignStatus = "Draft" | "Proposal" | "Confirm" | "Option";

const STATUS_CONFIG: Record<
  CampaignStatus,
  { bg: string; fg: string; border: string }
> = {
  Draft:    { bg: "rgba(248,188,26,0.08)",  fg: "#9d7717",  border: "rgba(248,188,26,0.3)"  },
  Proposal: { bg: "rgba(35,55,255,0.06)",   fg: "#2c24c3",  border: "rgba(35,55,255,0.25)"  },
  Confirm:  { bg: "rgba(34,197,94,0.08)",   fg: "#16a34a",  border: "rgba(34,197,94,0.3)"   },
  Option:   { bg: "rgba(147,51,234,0.07)",  fg: "#7c3aed",  border: "rgba(147,51,234,0.28)" },
};

const STATUSES: CampaignStatus[] = ["Draft", "Proposal", "Confirm", "Option"];

/* ─────────────────────────────────────────────
   Status chip (reusable)
───────────────────────────────────────────── */
function StatusChip({ value }: { value: CampaignStatus }) {
  const c = STATUS_CONFIG[value];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 20,
        padding: "0 7px",
        borderRadius: 999,
        backgroundColor: c.bg,
        fontFamily: "'Inter', sans-serif",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-weight-normal)",
        color: c.fg,
        lineHeight: "20px",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {value}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function CampaignStatusCard() {
  const [status, setStatus] = useState<CampaignStatus>("Draft");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: "12px 8px",
        boxShadow: "0px 3px 4px 0px rgba(16,16,52,0.06), 0px 1px 2px 0px rgba(16,16,52,0.04)",
      }}
    >
      {/* Card border overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          border: "1px solid rgba(19,18,33,0.1)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Inner inset shadow (Figma spec) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 12,
          boxShadow: "inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Label ── */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--foreground)",
          lineHeight: "16px",
          marginBottom: 8,
          paddingLeft: 4,
        }}
      >
        Campaign Status
      </p>

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 4,
          width: "100%",
          height: 28,
          padding: "0 8px",
          backgroundColor: "#ffffff",
          borderRadius: 4,
          border: "none",
          outline: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Inner border + shadow (matches Figma `input` element) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 4,
            border: "1px solid #eaeaef",
            boxShadow:
              "0px 1px 2px 0px rgba(16,16,52,0.08), inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
            pointerEvents: "none",
          }}
        />

        {/* Status chip — flex-1 so chevron stays right */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", minWidth: 0 }}>
          <StatusChip value={status} />
        </div>

        {/* Chevron */}
        <div
          style={{
            width: 16,
            height: 16,
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "34.37%",
              left: "15.62%",
              right: "15.62%",
              bottom: "28.12%",
            }}
          >
            <svg
              style={{
                position: "absolute",
                display: "block",
                width: "100%",
                height: "100%",
              }}
              fill="none"
              viewBox="0 0 11.0006 6.00067"
            >
              <path d={svgPaths.p10c93a80} fill="var(--muted-foreground)" />
            </svg>
          </div>
        </div>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div
          style={{
            position: "absolute",
            left: 8,
            right: 8,
            top: "calc(100% - 4px)",
            zIndex: 50,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid rgba(19,18,33,0.1)",
            boxShadow:
              "0px 4px 16px rgba(16,16,52,0.1), 0px 1px 3px rgba(16,16,52,0.08)",
            overflow: "hidden",
            padding: "4px 0",
          }}
        >
          {STATUSES.map((s) => {
            const c = STATUS_CONFIG[s];
            const isSelected = status === s;
            return (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  height: 32,
                  padding: "0 12px",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? "rgba(24,22,55,0.04)"
                    : "transparent",
                  transition: "background-color 80ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(24,22,55,0.03)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "transparent";
                }}
              >
                {/* Colour dot */}
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: c.fg,
                    flexShrink: 0,
                  }}
                />
                {/* Label */}
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "var(--text-sm)",
                    fontWeight: isSelected
                      ? "var(--font-weight-medium)"
                      : "var(--font-weight-normal)",
                    color: isSelected ? c.fg : "var(--foreground)",
                    lineHeight: "20px",
                    textAlign: "left",
                  }}
                >
                  {s}
                </span>
                {/* Active chip preview */}
                <StatusChip value={s} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
