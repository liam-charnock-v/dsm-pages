import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* Filter bar and dropdown, presented as in the original swap prototype */

export interface FilterConfig { id: string; label: string; options: string[] }
export type Filters = Record<string, Set<string>>;

export function toggleFilter(filters: Filters, id: string, opt: string): Filters {
  const next = new Set(filters[id] ?? []);
  if (next.has(opt)) next.delete(opt); else next.add(opt);
  return { ...filters, [id]: next };
}
export const clearFilter = (filters: Filters, id: string): Filters => ({ ...filters, [id]: new Set() });

/** True when `values[id]` hits every filter that has a selection */
export function passesFilters(filters: Filters, values: Record<string, string[]>) {
  return Object.entries(filters).every(([id, sel]) => !sel.size || (values[id] ?? []).some((v) => sel.has(v)));
}

function FilterDropdown({ filterId, label, options, selected, anchorRect, onToggle, onClear, onClose }: {
  filterId: string;
  label: string;
  options: string[];
  selected: Set<string>;
  anchorRect: DOMRect;
  onToggle: (opt: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(`[data-filter-id="${filterId}"]`)) onClose();
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [filterId, onClose]);

  const top = Math.min(anchorRect.bottom + 4, window.innerHeight - (options.length * 32 + 56) - 8);
  const left = Math.min(anchorRect.left, window.innerWidth - 200 - 8);

  return createPortal(
    <div data-filter-id={filterId} style={{ position: "fixed", top, left, width: 192, zIndex: 9999, backgroundColor: "#fff", borderRadius: 6, border: "1px solid var(--neutral-300)", boxShadow: "0 4px 16px rgba(16,16,52,0.14)", overflow: "hidden", fontFamily: "Inter, sans-serif" }}>
      <div style={{ padding: "8px 10px 6px", borderBottom: "1px solid rgba(19,18,33,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--essential-tertiary)" }}>{label}</span>
        {selected.size > 0 && (
          <button onClick={onClear} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#2c24c3", fontWeight: 500, padding: 0 }}>Clear</button>
        )}
      </div>
      <div style={{ padding: "4px 0" }}>
        {options.map((opt) => {
          const active = selected.has(opt);
          return (
            <button
              key={opt}
              role="menuitemcheckbox"
              aria-checked={active}
              onClick={() => onToggle(opt)}
              style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(19,18,33,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div style={{ width: 14, height: 14, borderRadius: 3, border: active ? "none" : "1.5px solid rgba(19,18,33,0.2)", backgroundColor: active ? "#2c24c3" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.1s" }}>
                {active && <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span style={{ fontSize: 13, color: "var(--essential-primary)" }}>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}

export function FilterBar({ config, filters, onChange }: {
  config: FilterConfig[];
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleClick(filterId: string) {
    if (openId === filterId) { setOpenId(null); setAnchorRect(null); return; }
    setOpenId(filterId);
    setAnchorRect(btnRefs.current[filterId]?.getBoundingClientRect() ?? null);
  }

  const openConfig = config.find((f) => f.id === openId);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {config.map((f) => {
          const count = filters[f.id]?.size ?? 0;
          const isOpen = openId === f.id;
          const active = count > 0;
          return (
            <button
              key={f.id}
              data-filter-id={f.id}
              ref={(el) => { btnRefs.current[f.id] = el; }}
              onClick={() => handleClick(f.id)}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              style={{ display: "flex", alignItems: "center", gap: 4, height: 26, padding: "0 8px", borderRadius: 6, border: active || isOpen ? "1px solid var(--primary-600)" : "1px solid rgba(19,18,33,0.1)", backgroundColor: active ? "var(--primary-100)" : "#fff", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap", transition: "all 0.12s" }}
            >
              <span style={{ fontSize: 12, lineHeight: "16px", color: active ? "var(--primary-600)" : "var(--essential-primary)", fontFamily: "Inter, sans-serif" }}>{f.label}</span>
              {active ? (
                <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", backgroundColor: "var(--primary-600)", borderRadius: 99, padding: "0 4px", minWidth: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2.5 3.75L5 6.25L7.5 3.75" stroke={isOpen ? "#131221" : "#7c7b87"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </button>
          );
        })}
      </div>
      {openId && openConfig && anchorRect && (
        <FilterDropdown
          filterId={openId}
          label={openConfig.label}
          options={openConfig.options}
          selected={filters[openId] ?? new Set()}
          anchorRect={anchorRect}
          onToggle={(opt) => onChange(toggleFilter(filters, openId, opt))}
          onClear={() => onChange(clearFilter(filters, openId))}
          onClose={() => { setOpenId(null); setAnchorRect(null); }}
        />
      )}
    </>
  );
}
