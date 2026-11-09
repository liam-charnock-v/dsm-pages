import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import svgPaths from "../../imports/svg-2xpx0lg3mg";

interface Props {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  anchorRect: DOMRect;
  onClose: () => void;
}

/* ─── Checkbox ─── */
function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: 16,
        height: 16,
        borderRadius: "var(--radius-sm)",
        backgroundColor: checked ? "var(--accent)" : "var(--background)",
        flexShrink: 0,
      }}
    >
      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          overflow: "hidden",
        }}
      >
        {checked && (
          <div style={{ position: "relative", width: 12, height: 12, overflow: "hidden", flexShrink: 0 }}>
            <div
              style={{
                position: "absolute",
                bottom: "18.75%",
                left: "12.5%",
                right: "9.37%",
                top: "25%",
              }}
            >
              <svg
                style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 9.37542 6.7505"
              >
                <path d={svgPaths.p231c00} fill="var(--primary-foreground)" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Inset bottom shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          boxShadow: "inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
        }}
      />
      {/* Border + elevation */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "var(--radius-sm)",
          border: "1px solid rgba(5,5,38,0.12)",
          boxShadow: "var(--elevation-sm)",
        }}
      />
    </div>
  );
}

/* ─── Main dropdown ─── */
export function FilterDropdown({ options, selected, onChange, anchorRect, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const id = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option]
    );
  };

  /* Position: below anchor, left-aligned, clamped to viewport */
  const DROPDOWN_W = 200;
  const top = anchorRect.bottom + 4;
  const rawLeft = anchorRect.left;
  const left = Math.max(8, Math.min(rawLeft, window.innerWidth - DROPDOWN_W - 8));

  return createPortal(
    <div
      ref={ref}
      style={{
        position: "fixed",
        top,
        left,
        width: DROPDOWN_W,
        zIndex: 9999,
        backgroundColor: "var(--background)",
        borderRadius: "var(--radius)",
        border: "1px solid rgba(5,5,38,0.12)",
        boxShadow: "0px 4px 16px rgba(16,16,52,0.12), var(--elevation-sm)",
        paddingTop: 4,
        paddingBottom: 8,
      }}
    >
      {/* Inset bottom shadow layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          boxShadow: "inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
        }}
      />

      {/* Section header */}
      <div
        style={{
          padding: "12px 20px 4px 20px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-normal)",
            color: "var(--muted-foreground)",
            lineHeight: "20px",
            whiteSpace: "nowrap",
          }}
        >
          Select
        </span>
      </div>

      {/* Options list */}
      <div style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 8, paddingRight: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {options.map((option) => {
            const isChecked = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => toggle(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 28,
                  width: "100%",
                  padding: "4px 12px",
                  gap: 16,
                  borderRadius: 3,
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: isChecked ? "rgba(44,36,195,0.05)" : "transparent",
                  transition: "background-color 100ms",
                }}
                onMouseEnter={(e) => {
                  if (!isChecked) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--muted)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = isChecked
                    ? "rgba(44,36,195,0.05)"
                    : "transparent";
                }}
              >
                <span
                  style={{
                    flex: "1 0 0",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "var(--text-sm)",
                    fontWeight: isChecked ? "var(--font-weight-medium)" : "var(--font-weight-normal)",
                    color: "var(--foreground)",
                    lineHeight: "20px",
                    textAlign: "left",
                    minWidth: 0,
                  }}
                >
                  {option}
                </span>
                <Checkbox checked={isChecked} />
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
