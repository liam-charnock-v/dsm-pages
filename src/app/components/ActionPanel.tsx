import { useState } from "react";
import { createPortal } from "react-dom";
import svgPaths from "../../imports/ActionPanel/svg-a33r1yeqtx";

/* ── mock data ───────────────────────────────────────────────── */
export const FIELD_OPTIONS: Record<string, string[]> = {
  channel: ["Airport", "Billboard", "Cinema", "Mall", "Street furniture", "Railway station", "Underground", "Roadside", "Retail"],
  "media-type": ["Digital", "Paper"],
  networks: ["Premium Network", "City Network", "Transport Network", "Roadside Network", "Retail Network", "Airport Network", "Commuter Network"],
  format: ["6-Sheet", "48-Sheet", "96-Sheet", "Mupi"],
};

export const LOCATION_CATEGORIES = [
  {
    key: "country",
    label: "Country",
    results: 13,
    options: ["United Kingdom", "Ireland", "France", "Germany", "Spain", "Portugal", "Netherlands", "Belgium", "Italy", "Sweden", "Denmark", "Norway", "Switzerland"],
  },
  {
    key: "city",
    label: "City",
    results: 16,
    options: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Bristol", "Leeds", "Liverpool", "Cardiff", "Dublin", "Paris", "Berlin", "Madrid", "Amsterdam", "Brussels", "Lisbon"],
  },
  {
    key: "postcode",
    label: "Postcode",
    results: 43,
    options: ["EC1A 1BB", "EC2A 1AG", "W1A 0AX", "WC2N 5DU", "SW1A 2AA", "SE1 7PB", "N1 9GU", "E1 6RF", "W6 9DL", "SW7 2AZ"],
  },
  {
    key: "street",
    label: "Street",
    results: 76,
    options: ["Oxford Street", "Regent Street", "Bond Street", "Carnaby Street", "Portobello Road", "Baker Street", "Carnaby Street", "Fleet Street", "Strand"],
  },
  {
    key: "county",
    label: "County / State / Province",
    results: 296,
    options: ["Greater London", "West Midlands", "Greater Manchester", "West Yorkshire", "South Yorkshire", "Merseyside", "Kent", "Essex", "Surrey", "Hampshire"],
  },
];

export const FIELD_LABELS: Record<string, string> = {
  channel: "Channel",
  "media-type": "Media Type",
  networks: "Networks",
  format: "Format",
  location: "Location",
};

/* ── checkbox item ───────────────────────────────────────────── */
function CheckboxItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex gap-2 items-center w-full text-left cursor-pointer border-none outline-none transition-colors duration-100"
      style={{
        padding: "8px 12px",
        borderRadius: 6,
        backgroundColor: checked ? "#f4f5ff" : "transparent",
        fontFamily: "Inter, sans-serif",
      }}
      onMouseEnter={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(19,18,33,0.03)"; }}
      onMouseLeave={(e) => { if (!checked) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 2,
          flexShrink: 0,
          position: "relative",
          backgroundColor: checked ? "#272199" : "#fff",
          boxShadow: checked
            ? "inset 0px -1px 0px 0px rgba(16,16,52,0.08)"
            : "0px 1px 2px 0px rgba(16,16,52,0.08)",
          border: checked ? "none" : "1px solid rgba(5,5,38,0.12)",
        }}
      >
        {checked && (
          <div style={{ position: "absolute", inset: "18.75% 12.5% 18.75% 12.5%" }}>
            <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 9.37542 6.7505">
              <path d={svgPaths.p231c00} fill="#F9FAFE" />
            </svg>
          </div>
        )}
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: checked ? 500 : 400,
          lineHeight: "20px",
          color: checked ? "#42414e" : "#131221",
          flex: 1,
          minWidth: 0,
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ── checkbox panel (Channel, Media Type, Networks, Format) ──── */
function CheckboxPanel({
  fieldId,
  currentSelections,
  onCancel,
  onConfirm,
}: {
  fieldId: string;
  currentSelections: string[];
  onCancel: () => void;
  onConfirm: (s: string[]) => void;
}) {
  const options = FIELD_OPTIONS[fieldId] ?? [];
  const [pending, setPending] = useState<Set<string>>(new Set(currentSelections));

  const toggle = (opt: string) => {
    setPending((prev) => {
      const next = new Set(prev);
      if (next.has(opt)) next.delete(opt);
      else next.add(opt);
      return next;
    });
  };

  const summary = [...pending].join(", ") || "None";
  const truncated = summary.length > 24 ? summary.slice(0, 24) + "…" : summary;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fdfdfd", borderRadius: 8 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(5,5,38,0.12)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>
          {FIELD_LABELS[fieldId] ?? fieldId}
        </span>
        <span style={{ fontSize: 13, fontWeight: 400, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "20px", textAlign: "right" }}>
          {truncated}
        </span>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {options.map((opt) => (
            <CheckboxItem key={opt} label={opt} checked={pending.has(opt)} onToggle={() => toggle(opt)} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer onCancel={onCancel} onConfirm={() => onConfirm([...pending])} />
    </div>
  );
}

/* ── location panel ──────────────────────────────────────────── */
function LocationPanel({
  currentSelections,
  onCancel,
  onConfirm,
}: {
  currentSelections: string[];
  onCancel: () => void;
  onConfirm: (s: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [pending, setPending] = useState<Set<string>>(new Set(currentSelections));

  const toggle = (opt: string) => {
    setPending((prev) => {
      const next = new Set(prev);
      if (next.has(opt)) next.delete(opt);
      else next.add(opt);
      return next;
    });
  };

  const summary = [...pending].join(", ") || "None";
  const truncated = summary.length > 20 ? summary.slice(0, 20) + "…" : summary;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#fdfdfd", borderRadius: 8 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(5,5,38,0.12)",
          flexShrink: 0,
          gap: 10,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "20px", flexShrink: 0 }}>
          Location
        </span>
        <span style={{ fontSize: 13, fontWeight: 400, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "20px", flex: 1, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {truncated}
        </span>
        <button
          onClick={onCancel}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "#42414e", flexShrink: 0 }}
          title="Close"
        >
          <svg width="16" height="16" viewBox="0 0 10 10" fill="none">
            <path d="M1 1L9 9M9 1L1 9" stroke="#42414E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: "12px 12px 0", flexShrink: 0 }}>
        <div
          style={{
            height: 28,
            borderRadius: 6,
            backgroundColor: "#fff",
            border: "1px solid rgba(5,5,38,0.12)",
            boxShadow: "0px 1px 2px 0px rgba(16,16,52,0.08)",
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "0 10px",
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1,
              minWidth: 0,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 13,
              color: "#131221",
              fontFamily: "Inter, sans-serif",
            }}
          />
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="#7C7B87" strokeWidth="1.3" />
            <path d="M9 9L12 12" stroke="#7C7B87" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Category rows */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {LOCATION_CATEGORIES.map((cat) => {
          const selectedInCat = cat.options.filter((o) => pending.has(o));
          const isExpanded = expanded === cat.key;
          const filteredOpts = search.trim()
            ? cat.options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
            : cat.options;

          return (
            <div key={cat.key}>
              {/* Category header row */}
              <button
                onClick={() => setExpanded(isExpanded ? null : cat.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  gap: 8,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#131221", lineHeight: "20px", whiteSpace: "nowrap" }}>
                    {cat.label}
                  </span>
                  {selectedInCat.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", height: 16, borderRadius: 999, padding: "0 5px", backgroundColor: "rgba(44,36,195,0.12)", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: "#2c24c3", lineHeight: 1 }}>{selectedInCat.length}</span>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 13, color: "rgba(3,1,24,0.52)", lineHeight: "20px" }}>{cat.results} results</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="rgba(19,18,33,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {/* Expanded options */}
              {isExpanded && (
                <div style={{ padding: "0 8px 4px" }}>
                  {filteredOpts.length === 0 ? (
                    <p style={{ fontSize: 12, color: "#7c7b87", padding: "4px 12px", fontFamily: "Inter, sans-serif" }}>No results</p>
                  ) : (
                    filteredOpts.map((opt) => (
                      <CheckboxItem key={opt} label={opt} checked={pending.has(opt)} onToggle={() => toggle(opt)} />
                    ))
                  )}
                </div>
              )}

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: "rgba(5,5,38,0.06)", margin: "0 12px" }} />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <Footer onCancel={onCancel} onConfirm={() => onConfirm([...pending])} />
    </div>
  );
}

/* ── footer ──────────────────────────────────────────────────── */
function Footer({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 12px",
        borderTop: "1px solid rgba(5,5,38,0.12)",
        flexShrink: 0,
      }}
    >
      <button
        onClick={onCancel}
        style={{
          height: 24,
          minWidth: 36,
          padding: "0 8px",
          borderRadius: 4,
          backgroundColor: "rgba(35,55,255,0.05)",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 500,
          color: "#2c24c3",
          fontFamily: "Inter, sans-serif",
          lineHeight: "20px",
        }}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        style={{
          height: 24,
          minWidth: 36,
          padding: "0 8px",
          borderRadius: 4,
          backgroundColor: "#15115e",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 500,
          color: "#f9fafe",
          fontFamily: "Inter, sans-serif",
          lineHeight: "20px",
          boxShadow: "0px 2px 1.5px rgba(0,0,0,0.08)",
        }}
      >
        Confirm
      </button>
    </div>
  );
}

/* ── public component ────────────────────────────────────────── */
export interface ActivePanel {
  fieldId: string;
  anchorRect: DOMRect;
}

interface ActionPanelProps {
  activePanel: ActivePanel;
  currentSelections: string[];
  onCancel: () => void;
  onConfirm: (selections: string[]) => void;
}

export function ActionPanel({ activePanel, currentSelections, onCancel, onConfirm }: ActionPanelProps) {
  const { fieldId, anchorRect } = activePanel;

  const PANEL_WIDTH = 260;
  const PANEL_MAX_HEIGHT = Math.min(480, window.innerHeight - anchorRect.top - 16);

  const left = anchorRect.right + 8;
  const top = Math.min(anchorRect.top, window.innerHeight - PANEL_MAX_HEIGHT - 8);

  return createPortal(
    <>
      {/* Backdrop to close on outside click */}
      <div
        style={{ position: "fixed", inset: 0, zIndex: 9998 }}
        onClick={onCancel}
      />
      <div
        style={{
          position: "fixed",
          left,
          top,
          width: PANEL_WIDTH,
          height: PANEL_MAX_HEIGHT,
          zIndex: 9999,
          borderRadius: 8,
          boxShadow: "0px 4px 16px rgba(16,16,52,0.14), 0px 1px 3px rgba(16,16,52,0.08)",
          border: "1px solid rgba(5,5,38,0.12)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {fieldId === "location" ? (
          <LocationPanel
            currentSelections={currentSelections}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        ) : (
          <CheckboxPanel
            fieldId={fieldId}
            currentSelections={currentSelections}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        )}
      </div>
    </>,
    document.body
  );
}
