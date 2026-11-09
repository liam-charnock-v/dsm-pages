import { useState, useRef } from "react";
import svgPaths from "../../imports/svg-re0a28nhz1";
import { DateRangePicker, type DateRange } from "./DateRangePicker";
import { FilterDropdown } from "./FilterDropdown";
import { AddFilterMenu, type AddFilterCategory } from "./AddFilterMenu";

/* ─────────────────────────────────────────────
   Shared filter button shell
   Matches the Figma spec:
   - 28px height
   - var(--radius) corners
   - var(--border) outline
   - var(--elevation-sm) outer shadow
   - inset bottom shadow for depth
───────────────────────────────────────────── */
const BUTTON_STYLE: React.CSSProperties = {
  height: 28,
  backgroundColor: "var(--background)",
  borderRadius: "var(--radius)",
  border: "1px solid rgba(5, 5, 38, 0.12)",
  boxShadow: "0px 1px 2px 0px rgba(16, 16, 52, 0.08), inset 0px -1px 0px 0px rgba(16, 16, 52, 0.08)",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "0 10px",
  gap: 8,
  outline: "none",
  flexShrink: 0,
  whiteSpace: "nowrap",
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-normal)",
  color: "var(--foreground)",
  lineHeight: "20px",
};

const MUTED_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "var(--text-xs)",
  fontWeight: "var(--font-weight-normal)",
  color: "var(--muted-foreground)",
  lineHeight: "20px",
};

const ACTION_LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "var(--text-sm)",
  fontWeight: "var(--font-weight-medium)",
  color: "var(--primary)",
  lineHeight: "20px",
};

/* ─── Calendar icon ─── */
function CalendarIcon() {
  return (
    <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      <svg
        style={{ position: "absolute", inset: "6.25% 12.5% 12.5% 12.5%", display: "block", width: "75%", height: "81.25%" }}
        fill="none"
        viewBox="0 0 12 13"
      >
        <path d={svgPaths.p3f356000} fill="var(--primary)" />
      </svg>
    </div>
  );
}

/* ─── Chevron down icon ─── */
function ChevronIcon({ active = false }: { active?: boolean }) {
  return (
    <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
      <svg
        style={{ position: "absolute", top: "34.37%", left: "15.62%", right: "15.62%", bottom: "28.12%", display: "block", width: "68.75%", height: "37.5%" }}
        fill="none"
        viewBox="0 0 11.0006 6.00067"
      >
        <path d={svgPaths.p10c93a80} fill={active ? "var(--accent)" : "var(--foreground)"} />
      </svg>
    </div>
  );
}

/* ─── Thin vertical divider used inside date range ─── */
function InlineDivider() {
  return (
    <div style={{
      width: 1,
      height: 16,
      borderRadius: 2000,
      backgroundColor: "rgba(66, 65, 78, 0.1)",
      flexShrink: 0,
    }} />
  );
}

/* ─── Date helpers ─── */
function formatShort(d: Date | null): string {
  if (!d) return "-";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/* ─────────────────────────────────────────────
   Date range — two joined inputs (stateful)
───────────────────────────────────────────── */
function DateRangeFilter({
  range,
  onOpen,
  triggerRef,
}: {
  range: DateRange;
  onOpen: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}) {
  const hasRange = range.start || range.end;

  const fromStyle: React.CSSProperties = {
    ...BUTTON_STYLE,
    width: 156,
    borderRadius: "var(--radius) 0 0 var(--radius)",
    marginRight: -1,
    zIndex: 1,
  };
  const toStyle: React.CSSProperties = {
    ...BUTTON_STYLE,
    width: 156,
    borderRadius: "0 var(--radius) var(--radius) 0",
  };

  return (
    <div ref={triggerRef} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
      {/* From */}
      <button style={fromStyle} onClick={onOpen}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}>
          <span style={MUTED_LABEL_STYLE}>From :</span>
          <span style={{ ...LABEL_STYLE, color: hasRange ? "var(--foreground)" : "var(--muted-foreground)" }}>
            {formatShort(range.start)}
          </span>
        </div>
        <CalendarIcon />
      </button>

      {/* To */}
      <button style={toStyle} onClick={onOpen}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0 }}>
          <span style={MUTED_LABEL_STYLE}>To :</span>
          <span style={{ ...LABEL_STYLE, color: hasRange ? "var(--foreground)" : "var(--muted-foreground)" }}>
            {formatShort(range.end)}
          </span>
        </div>
        <InlineDivider />
        <CalendarIcon />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Media type dropdown
───────────────────────────────────────────── */
const MEDIA_TYPE_OPTIONS = ["Paper", "Digital"];

function MediaTypeFilter({
  selected,
  onOpen,
  triggerRef,
}: {
  selected: string[];
  onOpen: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}) {
  const hasSelection = selected.length > 0;
  const label =
    selected.length === 0
      ? "Media type"
      : selected.length === MEDIA_TYPE_OPTIONS.length
      ? "All media types"
      : selected.join(", ");

  return (
    <button
      ref={triggerRef}
      style={{
        ...BUTTON_STYLE,
        backgroundColor: hasSelection ? "rgba(44,36,195,0.06)" : "var(--background)",
        border: hasSelection
          ? "1px solid rgba(44,36,195,0.3)"
          : "1px solid rgba(5, 5, 38, 0.12)",
      }}
      onClick={onOpen}
    >
      <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <svg
          style={{ position: "absolute", inset: "12.5%", display: "block", width: "75%", height: "75%" }}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path
            d={svgPaths.p1fa40700}
            fill={hasSelection ? "var(--accent)" : "var(--muted-foreground)"}
          />
        </svg>
      </div>
      <span
        style={{
          ...LABEL_STYLE,
          color: hasSelection ? "var(--accent)" : "var(--foreground)",
          fontWeight: hasSelection ? "var(--font-weight-medium)" : "var(--font-weight-normal)",
          maxWidth: 120,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      <ChevronIcon active={hasSelection} />
    </button>
  );
}

/* ─────────────────────────────────────────────
   Channel dropdown
───────────────────────────────────────────── */
const CHANNEL_OPTIONS = ["Street furniture", "Billboards", "Underground", "Bus stops"];

function ChannelFilter({
  selected,
  onOpen,
  triggerRef,
}: {
  selected: string[];
  onOpen: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}) {
  const hasSelection = selected.length > 0;
  const label =
    selected.length === 0
      ? "Channel"
      : selected.length === CHANNEL_OPTIONS.length
      ? "All channels"
      : selected.length === 1
      ? selected[0]
      : `${selected.length} channels`;

  return (
    <button
      ref={triggerRef}
      style={{
        ...BUTTON_STYLE,
        backgroundColor: hasSelection ? "rgba(44,36,195,0.06)" : "var(--background)",
        border: hasSelection
          ? "1px solid rgba(44,36,195,0.3)"
          : "1px solid rgba(5, 5, 38, 0.12)",
      }}
      onClick={onOpen}
    >
      <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <svg
          style={{ position: "absolute", top: "6.25%", left: "3.13%", right: "3.13%", bottom: "12.5%", display: "block", width: "93.75%", height: "81.25%" }}
          fill="none"
          viewBox="0 0 15 13.0006"
        >
          <path
            d={svgPaths.p12e0fb00}
            fill={hasSelection ? "var(--accent)" : "var(--muted-foreground)"}
          />
        </svg>
      </div>
      <span
        style={{
          ...LABEL_STYLE,
          color: hasSelection ? "var(--accent)" : "var(--foreground)",
          fontWeight: hasSelection ? "var(--font-weight-medium)" : "var(--font-weight-normal)",
          maxWidth: 120,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      <ChevronIcon active={hasSelection} />
    </button>
  );
}

/* ─── X close icon (10px) ─── */
function CloseIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 10.0006 10.0006" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path
        d="M9.85403 9.14653C9.90048 9.19298 9.93733 9.24813 9.96247 9.30883C9.98762 9.36953 10.0006 9.43458 10.0006 9.50028C10.0006 9.56598 9.98762 9.63103 9.96247 9.69173C9.93733 9.75242 9.90048 9.80757 9.85403 9.85403C9.80757 9.90048 9.75242 9.93733 9.69173 9.96247C9.63103 9.98762 9.56598 10.0006 9.50028 10.0006C9.43458 10.0006 9.36953 9.98762 9.30883 9.96247C9.24813 9.93733 9.19298 9.90048 9.14653 9.85403L5.00028 5.70715L0.854028 9.85403C0.760208 9.94785 0.63296 10.0006 0.500278 10.0006C0.367596 10.0006 0.240348 9.94785 0.146528 9.85403C0.0527077 9.76021 2.61548e-09 9.63296 0 9.50028C-2.61548e-09 9.3676 0.0527077 9.24035 0.146528 9.14653L4.2934 5.00028L0.146528 0.854028C0.0527077 0.760208 0 0.63296 0 0.500278C0 0.367596 0.0527077 0.240348 0.146528 0.146528C0.240348 0.0527077 0.367596 0 0.500278 0C0.63296 0 0.760208 0.0527077 0.854028 0.146528L5.00028 4.2934L9.14653 0.146528C9.24035 0.0527077 9.3676 -2.61548e-09 9.50028 0C9.63296 2.61548e-09 9.76021 0.0527077 9.85403 0.146528C9.94785 0.240348 10.0006 0.367596 10.0006 0.500278C10.0006 0.63296 9.94785 0.760208 9.85403 0.854028L5.70715 5.00028L9.85403 9.14653Z"
        fill="var(--accent)"
      />
    </svg>
  );
}

/* ─── Active extra filter pill ─── */
function ExtraFilterPill({
  category,
  value,
  onRemove,
}: {
  category: AddFilterCategory;
  value: string;
  onRemove: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 28,
        gap: 6,
        padding: "0 8px 0 10px",
        borderRadius: "var(--radius)",
        backgroundColor: "rgba(44,36,195,0.06)",
        border: "1px solid rgba(44,36,195,0.3)",
        boxShadow: "0px 1px 2px 0px rgba(16,16,52,0.08), inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
        flexShrink: 0,
        cursor: "default",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-weight-normal)",
          color: "var(--accent)",
          lineHeight: "20px",
        }}
      >
        {category}:
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--accent)",
          lineHeight: "20px",
        }}
      >
        {value}
      </span>
      <button
        onClick={onRemove}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          border: "none",
          outline: "none",
          background: "transparent",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Add filter button
───────────────────────────────────────────── */
function AddFilterButton({
  onOpen,
  triggerRef,
}: {
  onOpen: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <button ref={triggerRef} style={{ ...BUTTON_STYLE, gap: 4 }} onClick={onOpen}>
      <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <svg
          style={{ position: "absolute", inset: "12.5%", display: "block", width: "75%", height: "75%" }}
          fill="none"
          viewBox="0 0 12 12"
        >
          <path d={svgPaths.p3132d800} fill="var(--muted-foreground)" />
        </svg>
      </div>
      <span style={LABEL_STYLE}>Add filter</span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Group by action button
───────────────────────────────────────────── */
function GroupByButton() {
  return (
    <button style={{ ...BUTTON_STYLE, gap: 2 }}>
      {/* Group / node icon */}
      <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <svg
          style={{ position: "absolute", top: "12.5%", left: "6.25%", right: "9.38%", bottom: "15.63%", display: "block", width: "84.375%", height: "75%" }}
          fill="none"
          viewBox="0 0 13.5 12"
        >
          <path d={svgPaths.p3c5cfc00} fill="var(--primary)" />
        </svg>
      </div>
      <span style={ACTION_LABEL_STYLE}>Group by</span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Metrics action button
───────────────────────────────────────────── */
function MetricsButton() {
  return (
    <button style={{ ...BUTTON_STYLE, gap: 2 }}>
      {/* Bar chart icon */}
      <div style={{ width: 16, height: 16, position: "relative", flexShrink: 0, overflow: "hidden" }}>
        <svg
          style={{ position: "absolute", top: "12.5%", left: "9.38%", right: "9.38%", bottom: "15.63%", display: "block", width: "81.25%", height: "71.875%" }}
          fill="none"
          viewBox="0 0 13 11.5"
        >
          <path d={svgPaths.p1acaa9c0} fill="var(--primary)" />
        </svg>
      </div>
      <span style={ACTION_LABEL_STYLE}>Metrics</span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main export — accepts lifted state as props
───────────────────────────────────────────── */
interface FiltersProps {
  dateRange: DateRange;
  onDateRangeChange: (r: DateRange) => void;
  mediaSelected: string[];
  onMediaChange: (s: string[]) => void;
  channelSelected: string[];
  onChannelChange: (s: string[]) => void;
}

export function AvailabilityReportFilters({
  dateRange,
  onDateRangeChange,
  mediaSelected,
  onMediaChange,
  channelSelected,
  onChannelChange,
}: FiltersProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const dateRef = useRef<HTMLDivElement>(null!);

  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaAnchorRect, setMediaAnchorRect] = useState<DOMRect | null>(null);
  const mediaRef = useRef<HTMLButtonElement>(null!);

  const [channelOpen, setChannelOpen] = useState(false);
  const [channelAnchorRect, setChannelAnchorRect] = useState<DOMRect | null>(null);
  const channelRef = useRef<HTMLButtonElement>(null!);

  const [addFilterOpen, setAddFilterOpen] = useState(false);
  const [addFilterAnchorRect, setAddFilterAnchorRect] = useState<DOMRect | null>(null);
  const addFilterRef = useRef<HTMLButtonElement>(null!);

  // Extra filters added via AddFilterMenu: { category, value }
  const [extraFilters, setExtraFilters] = useState<{ category: AddFilterCategory; value: string }[]>([]);

  const openPicker = () => {
    if (dateRef.current) setAnchorRect(dateRef.current.getBoundingClientRect());
    setPickerOpen(true);
  };
  const openMedia = () => {
    if (mediaRef.current) setMediaAnchorRect(mediaRef.current.getBoundingClientRect());
    setMediaOpen(true);
  };
  const openChannel = () => {
    if (channelRef.current) setChannelAnchorRect(channelRef.current.getBoundingClientRect());
    setChannelOpen(true);
  };
  const openAddFilter = () => {
    if (addFilterRef.current) setAddFilterAnchorRect(addFilterRef.current.getBoundingClientRect());
    setAddFilterOpen(true);
  };

  const handleAddFilter = (category: AddFilterCategory, value: string) => {
    // Avoid duplicates
    if (!extraFilters.find((f) => f.category === category && f.value === value)) {
      setExtraFilters((prev) => [...prev, { category, value }]);
    }
  };

  const removeExtraFilter = (category: AddFilterCategory, value: string) => {
    setExtraFilters((prev) => prev.filter((f) => !(f.category === category && f.value === value)));
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 20px",
          flexShrink: 0,
        }}
      >
        {/* Left: filters */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0, flexWrap: "wrap" }}>
          <DateRangeFilter range={dateRange} onOpen={openPicker} triggerRef={dateRef} />
          <MediaTypeFilter selected={mediaSelected} onOpen={openMedia} triggerRef={mediaRef} />
          <ChannelFilter selected={channelSelected} onOpen={openChannel} triggerRef={channelRef} />

          {/* Extra filter pills */}
          {extraFilters.map((f) => (
            <ExtraFilterPill
              key={`${f.category}-${f.value}`}
              category={f.category}
              value={f.value}
              onRemove={() => removeExtraFilter(f.category, f.value)}
            />
          ))}

          <AddFilterButton onOpen={openAddFilter} triggerRef={addFilterRef} />
        </div>

        {/* Right: actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <GroupByButton />
          <MetricsButton />
        </div>
      </div>

      {pickerOpen && anchorRect && (
        <DateRangePicker
          value={dateRange}
          anchorRect={anchorRect}
          onClose={() => setPickerOpen(false)}
          onApply={(r) => { onDateRangeChange(r); setPickerOpen(false); }}
        />
      )}

      {mediaOpen && mediaAnchorRect && (
        <FilterDropdown
          options={MEDIA_TYPE_OPTIONS}
          selected={mediaSelected}
          onChange={onMediaChange}
          anchorRect={mediaAnchorRect}
          onClose={() => setMediaOpen(false)}
        />
      )}

      {channelOpen && channelAnchorRect && (
        <FilterDropdown
          options={CHANNEL_OPTIONS}
          selected={channelSelected}
          onChange={onChannelChange}
          anchorRect={channelAnchorRect}
          onClose={() => setChannelOpen(false)}
        />
      )}

      {addFilterOpen && addFilterAnchorRect && (
        <AddFilterMenu
          anchorRect={addFilterAnchorRect}
          onClose={() => setAddFilterOpen(false)}
          onSelect={handleAddFilter}
        />
      )}
    </>
  );
}