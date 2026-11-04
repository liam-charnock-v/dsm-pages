import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import svgPaths from "../../imports/svg-fp0z0az7an";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
export type AddFilterCategory = "Location" | "Format";

const LOCATION_OPTIONS: { label: string; count: number }[] = [
  { label: "City", count: 3 },
  { label: "Country", count: 2 },
  { label: "County", count: 2 },
  { label: "Conurbation", count: 2 },
  { label: "District", count: 2 },
  { label: "RouteTown", count: 2 },
  { label: "Town", count: 2 },
  { label: "TVArea", count: 4 },
];

const FORMAT_OPTIONS: { label: string; count: number }[] = [
  { label: "48 Sheet", count: 3 },
  { label: "96 Sheet", count: 2 },
  { label: "6 Sheet", count: 5 },
  { label: "Mega 6", count: 2 },
  { label: "Storm", count: 1 },
];

/* ─────────────────────────────────────────────
   Shared styles
───────────────────────────────────────────── */
const PANEL_STYLE: React.CSSProperties = {
  backgroundColor: "var(--background)",
  borderRadius: "var(--radius)",
  border: "1px solid rgba(5,5,38,0.12)",
  boxShadow: "0px 4px 16px rgba(16,16,52,0.12), 0px 1px 2px rgba(16,16,52,0.08)",
  overflow: "hidden",
};

/* ─────────────────────────────────────────────
   Chevron right icon (small, 12px)
───────────────────────────────────────────── */
function ChevronRight({ color = "var(--foreground)" }: { color?: string }) {
  return (
    <div style={{ width: 12, height: 12, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "15.62%",
          left: "34.37%",
          right: "28.12%",
          bottom: "15.62%",
        }}
      >
        <svg
          style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
          fill="none"
          viewBox="0 0 4.5005 8.25042"
        >
          <path d={svgPaths.pddb2800} fill={color} />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Location pin icon (12px)
───────────────────────────────────────────── */
function LocationIcon({ color = "var(--foreground)" }: { color?: string }) {
  return (
    <div style={{ width: 12, height: 12, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "6.25%", left: "15.63%", right: 0, bottom: 0 }}>
        <svg
          style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
          fill="none"
          viewBox="0 0 8.25 10.4999"
        >
          <path d={svgPaths.p39e2ba00} fill={color} />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Format / screen icon (12px)
───────────────────────────────────────────── */
function FormatIcon({ color = "var(--foreground)" }: { color?: string }) {
  return (
    <div style={{ width: 12, height: 12, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "15.63%", left: "9.38%", right: 0, bottom: 0 }}>
        <svg
          style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
          fill="none"
          viewBox="0 0 9.75 8.25"
        >
          <path d={svgPaths.p5e5de00} fill={color} />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Search icon (16px)
───────────────────────────────────────────── */
function SearchIcon() {
  return (
    <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "9.29%", left: "9.37%", right: "9.37%", bottom: "9.29%" }}>
        <svg
          style={{ position: "absolute", display: "block", width: "100%", height: "100%" }}
          fill="none"
          viewBox="0 0 13.0141 13.0141"
        >
          <path d={svgPaths.p2bb90e00} fill="var(--muted-foreground)" />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Count badge
───────────────────────────────────────────── */
function CountBadge({ count }: { count: number }) {
  return (
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-weight-normal)",
        color: "var(--muted-foreground)",
        lineHeight: "20px",
        flexShrink: 0,
      }}
    >
      {count}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Right sub-panel
───────────────────────────────────────────── */
function SubPanel({
  category,
  onSelect,
}: {
  category: AddFilterCategory;
  onSelect: (category: AddFilterCategory, value: string) => void;
}) {
  const [search, setSearch] = useState("");
  const options = category === "Location" ? LOCATION_OPTIONS : FORMAT_OPTIONS;
  const filtered = search.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div style={{ ...PANEL_STYLE, width: 176, display: "flex", flexDirection: "column" }}>
      {/* Search bar */}
      <div
        style={{
          borderBottom: "1px solid rgba(66,65,78,0.1)",
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flex: 1,
            height: 24,
            borderRadius: "var(--radius-sm)",
            padding: "0 6px",
          }}
        >
          <SearchIcon />
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-normal)",
              color: "var(--foreground)",
              lineHeight: "20px",
              minWidth: 0,
            }}
          />
        </div>
      </div>

      {/* Section header */}
      <div style={{ padding: "10px 20px 4px 20px" }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-normal)",
            color: "var(--muted-foreground)",
            lineHeight: "20px",
          }}
        >
          Select
        </span>
      </div>

      {/* Options */}
      <div style={{ padding: "0 8px 8px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {filtered.map((opt) => (
          <button
            key={opt.label}
            onClick={() => onSelect(category, opt.label)}
            style={{
              display: "flex",
              alignItems: "center",
              height: 28,
              padding: "4px 12px",
              gap: 8,
              borderRadius: 3,
              border: "none",
              outline: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
              width: "100%",
              textAlign: "left",
              transition: "background-color 80ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--muted)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
          >
            <span
              style={{
                flex: 1,
                fontFamily: "'Inter', sans-serif",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-normal)",
                color: "var(--foreground)",
                lineHeight: "20px",
                minWidth: 0,
              }}
            >
              {opt.label}
            </span>
            <CountBadge count={opt.count} />
            <ChevronRight color="var(--muted-foreground)" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Props
───────────────────────────────────────────── */
interface Props {
  anchorRect: DOMRect;
  onClose: () => void;
  onSelect: (category: AddFilterCategory, value: string) => void;
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function AddFilterMenu({ anchorRect, onClose, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<AddFilterCategory | null>("Location");

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

  const LEFT_W = 192;
  const top = anchorRect.bottom + 4;
  const left = Math.max(8, Math.min(anchorRect.left, window.innerWidth - LEFT_W - 200));

  const categories: { key: AddFilterCategory; label: string; icon: React.ReactNode }[] = [
    {
      key: "Location",
      label: "Location",
      icon: <LocationIcon color={activeCategory === "Location" ? "var(--foreground)" : "var(--foreground)"} />,
    },
    {
      key: "Format",
      label: "Format",
      icon: <FormatIcon color="var(--foreground)" />,
    },
  ];

  return createPortal(
    <div
      ref={ref}
      style={{
        position: "fixed",
        top,
        left,
        display: "flex",
        alignItems: "flex-start",
        gap: 4,
        zIndex: 9999,
      }}
    >
      {/* ── Left panel: filter categories ── */}
      <div style={{ ...PANEL_STYLE, width: LEFT_W, paddingBottom: 4 }}>
        {/* Section header */}
        <div style={{ padding: "12px 20px 4px 20px" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-normal)",
              color: "var(--muted-foreground)",
              lineHeight: "20px",
            }}
          >
            Other filter
          </span>
        </div>

        {/* Category rows */}
        <div style={{ padding: "8px 8px 4px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {categories.map(({ key, label, icon }) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onMouseEnter={() => setActiveCategory(key)}
                onClick={() => setActiveCategory(key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 28,
                  padding: "4px 12px",
                  gap: 8,
                  borderRadius: 3,
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: isActive ? "rgba(24,22,55,0.04)" : "transparent",
                  width: "100%",
                  textAlign: "left",
                  transition: "background-color 80ms",
                }}
              >
                {icon}
                <span
                  style={{
                    flex: 1,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "var(--text-sm)",
                    fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-normal)",
                    color: "var(--foreground)",
                    lineHeight: "20px",
                    minWidth: 0,
                    textAlign: "left",
                  }}
                >
                  {label}
                </span>
                <ChevronRight color={isActive ? "var(--foreground)" : "var(--muted-foreground)"} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right panel: sub-options ── */}
      {activeCategory && (
        <SubPanel
          category={activeCategory}
          onSelect={(cat, val) => {
            onSelect(cat, val);
            onClose();
          }}
        />
      )}
    </div>,
    document.body
  );
}
