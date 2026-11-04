import { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-3nopv9zsz9";
import { DateRangePicker, DateRange } from "./DateRangePicker";
import { ActionPanel, ActivePanel } from "./ActionPanel";

/* ============================================================
   SVG Icon helper
   ============================================================ */
function Icon({
  path,
  viewBox,
  fill = "var(--muted-foreground)",
  size = 16,
  inset = "0",
}: {
  path: string;
  viewBox: string;
  fill?: string;
  size?: number;
  inset?: string;
}) {
  return (
    <div
      className="overflow-clip relative shrink-0"
      style={{ width: size, height: size }}
    >
      <div className="absolute" style={{ inset }}>
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox={viewBox}
        >
          <path d={path} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

/* ============================================================
   DATA — sections & items
   ============================================================ */
interface TargetRow {
  id: string;
  label: string;
  iconPath: string;
  iconViewBox: string;
  iconInset: string;
  values: { amount: string; qty: string };
  unmet?: boolean;
}

interface CardItem {
  id: string;
  label: string;
  iconPath: string;
  iconViewBox: string;
  iconInset: string;
}

interface AddItem {
  id: string;
  label: string;
}

interface Section {
  id: string;
  title: string;
  cards?: CardItem[];
  targets?: TargetRow[];
  addItems?: AddItem[];
  separated?: boolean; // when true, render each card individually (no stacking)
}

const SECTIONS: Section[] = [
  {
    id: "status",
    title: "Status:",
    cards: [
      {
        id: "status-card",
        label: "Status",
        iconPath: svgPaths.p1bf4b000,
        iconViewBox: "0 0 12 12",
        iconInset: "12.5%",
      },
    ],
  },
  {
    id: "dealline-info",
    title: "Deal line info:",
    separated: true,
    cards: [
      {
        id: "schedule",
        label: "Schedule",
        iconPath: svgPaths.p3f356000,
        iconViewBox: "0 0 12 13",
        iconInset: "6.25% 12.5% 12.5% 12.5%",
      },
      {
        id: "channel",
        label: "Channel",
        iconPath: svgPaths.p12e0fb00,
        iconViewBox: "0 0 15 13.0006",
        iconInset: "6.25% 3.13% 12.5% 3.13%",
      },
      {
        id: "media-type",
        label: "Media type",
        iconPath: svgPaths.p789d080,
        iconViewBox: "0 0 9 14",
        iconInset: "6.25% 21.88%",
      },
    ],
    addItems: [{ id: "product-template", label: "Product template" }],
  },
  {
    id: "targets",
    title: "Targets:",
    targets: [
      {
        id: "impressions",
        label: "Impressions",
        iconPath: svgPaths.p24abf100,
        iconViewBox: "0 0 15 10",
        iconInset: "18.75% 3.13%",
        values: { amount: "100,000", qty: "1" },
      },
      {
        id: "frame",
        label: "Frame",
        iconPath: svgPaths.p789d080,
        iconViewBox: "0 0 9 14",
        iconInset: "6.25% 21.88%",
        values: { amount: "50", qty: "1" },
        unmet: true,
      },
      {
        id: "budget",
        label: "Budget",
        iconPath: svgPaths.p3858d00,
        iconViewBox: "0 0 9 11.4999",
        iconInset: "12.5% 25% 15.62% 18.75%",
        values: { amount: "100,000", qty: "1" },
      },
    ],
    addItems: [
      { id: "networks", label: "Networks" },
      { id: "sot", label: "SOT" },
    ],
  },
  {
    id: "filters",
    title: "Filters:",
    separated: true,
    cards: [
      {
        id: "format",
        label: "Format",
        iconPath: svgPaths.p2c84cc00,
        iconViewBox: "0 0 13 11",
        iconInset: "15.63% 9.38%",
      },
      {
        id: "location",
        label: "Location",
        iconPath: svgPaths.p47f0f00,
        iconViewBox: "0 0 11 13.9999",
        iconInset: "6.25% 15.63%",
      },
      {
        id: "tag",
        label: "Tag",
        iconPath: svgPaths.p3a450580,
        iconViewBox: "0 0 13.9994 10",
        iconInset: "18.75% 3.13% 18.75% 9.38%",
      },
    ],
    addItems: [
      { id: "frame-list", label: "Frame list" },
      { id: "mtb", label: "MTB" },
    ],
  },
  {
    id: "data-targeting",
    title: "Data targeting:",
    addItems: [
      { id: "poi", label: "POI" },
      { id: "segments", label: "Segments" },
    ],
  },
  {
    id: "objectives",
    title: "Objectives:",
    cards: [
      {
        id: "objectives-card",
        label: "Objectives",
        iconPath: svgPaths.p1a56e500,
        iconViewBox: "0 0 12 13.5",
        iconInset: "12.5% 12.5% 3.13% 12.5%",
      },
    ],
  },
];

/* ============================================================
   Sub‑components
   ============================================================ */

/** Solid‑bordered card row (clickable) */
function CardTile({
  item,
  selected,
  onSelect,
  position = "single",
  valueLabel,
}: {
  item: CardItem;
  selected: boolean;
  onSelect: (rect: DOMRect) => void;
  position?: "first" | "middle" | "last" | "single";
  valueLabel?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const radiusMap = {
    first: "var(--radius) var(--radius) 0 0",
    middle: "0",
    last: "0 0 var(--radius) var(--radius)",
    single: "var(--radius)",
  };

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        const rect = buttonRef.current?.getBoundingClientRect() ?? new DOMRect();
        onSelect(rect);
      }}
      className="flex items-center w-full relative cursor-pointer border-none outline-none transition-colors duration-150"
      style={{
        height: 34,
        padding: "0 8px",
        borderRadius: radiusMap[position],
        backgroundColor: selected ? "var(--primary-50)" : "var(--card)",
      }}
    >
      <div className="flex flex-1 items-center gap-1 min-w-0">
        <Icon
          path={item.iconPath}
          viewBox={item.iconViewBox}
          inset={item.iconInset}
          fill="var(--muted-foreground)"
        />
        <span
          className="flex-1 min-w-0 overflow-hidden whitespace-nowrap text-left"
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "20px",
            color: "var(--foreground)",
            textOverflow: "ellipsis",
          }}
        >
          {item.label}
        </span>
      </div>
      {/* Selection value chip */}
      {valueLabel && (
        <div
          className="flex items-center justify-center shrink-0 px-2 ml-1"
          style={{
            height: 24,
            backgroundColor: "var(--primary-100)",
            borderRadius: "var(--radius-full)",
            maxWidth: 120,
          }}
        >
          <span
            className="overflow-hidden whitespace-nowrap"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-normal)",
              color: "var(--accent)",
              textOverflow: "ellipsis",
              lineHeight: "20px",
            }}
          >
            {valueLabel}
          </span>
        </div>
      )}
      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: radiusMap[position],
          border: selected
            ? "1px solid var(--accent)"
            : "1px solid rgba(19,18,33,0.2)",
                  }}
      />
      {/* Bottom inset shadow for stacked cards */}
      {position !== "single" && position !== "last" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: radiusMap[position],
            boxShadow: "inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
          }}
        />
      )}
    </button>
  );
}

/** Target row with chips and three‑dot menu */
function TargetTile({
  target,
  selected,
  onSelect,
  position = "single",
}: {
  target: TargetRow;
  selected: boolean;
  onSelect: () => void;
  position?: "first" | "middle" | "last" | "single";
}) {
  const radiusMap = {
    first: "var(--radius) var(--radius) 0 0",
    middle: "0",
    last: "0 0 var(--radius) var(--radius)",
    single: "var(--radius)",
  };

  return (
    <button
      onClick={onSelect}
      className="flex items-center w-full relative cursor-pointer border-none outline-none transition-colors duration-150"
      style={{
        height: 34,
        paddingLeft: 8,
        paddingRight: 4,
        borderRadius: radiusMap[position],
        backgroundColor: selected ? "var(--primary-50)" : "var(--card)",
      }}
    >
      {/* Left: icon + label */}
      <div className="flex items-center gap-1 min-w-0 shrink-0" style={{ width: 78 }}>
        <Icon
          path={target.iconPath}
          viewBox={target.iconViewBox}
          inset={target.iconInset}
          fill="var(--muted-foreground)"
        />
        <span
          className="overflow-hidden whitespace-nowrap"
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "20px",
            color: "var(--foreground)",
            textOverflow: "ellipsis",
            maxWidth: 62,
          }}
        >
          {target.label}
        </span>
      </div>

      {/* Right: chips + menu */}
      <div className="flex flex-1 items-center justify-end gap-1">
        <div className="flex gap-1 items-center">
          {/* Amount chip */}
          <div
            className="flex h-6 items-center justify-center overflow-clip px-2"
            style={{
              backgroundColor: target.unmet ? "var(--pink-100)" : "var(--primary-100)",
              borderRadius: "var(--radius-full)",
              minWidth: 24,
            }}
          >
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-normal)",
                lineHeight: "20px",
                color: target.unmet ? "var(--pink-800)" : "var(--secondary-foreground)",
              }}
            >
              {target.values.amount}
            </span>
          </div>
          {/* Qty chip */}
          <div
            className="flex h-6 items-center justify-center overflow-clip px-2"
            style={{
              backgroundColor: "var(--primary-100)",
              borderRadius: "var(--radius-full)",
              minWidth: 24,
            }}
          >
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-normal)",
                lineHeight: "20px",
                color: "var(--secondary-foreground)",
              }}
            >
              {target.values.qty}
            </span>
          </div>
        </div>

        {/* Three‑dot (kebab) menu */}
        <div className="flex items-center justify-center shrink-0 size-6">
          <div className="overflow-clip relative shrink-0 size-4">
            <div
              className="absolute flex items-center justify-center"
              style={{ inset: "19.79% 44.79%" }}
            >
              <div className="flex-none h-[2.5px] rotate-90" style={{ width: 14.5 }}>
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 9.66602 1.66602"
                >
                  <path
                    d={svgPaths.p3f8c0f80}
                    fill="var(--muted-foreground)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: radiusMap[position],
          border: selected
            ? "1px solid var(--accent)"
            : "1px solid rgba(19,18,33,0.2)",
                  }}
      />
      {position !== "single" && position !== "last" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: radiusMap[position],
            boxShadow: "inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
          }}
        />
      )}
    </button>
  );
}

/** Dashed "add" action row */
function AddActionTile({
  item,
  onClick,
}: {
  item: AddItem;
  onClick: (rect: DOMRect) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={buttonRef}
      onClick={() => {
        const rect = buttonRef.current?.getBoundingClientRect() ?? new DOMRect();
        onClick(rect);
      }}
      className="flex items-center w-full relative cursor-pointer border-none outline-none transition-opacity duration-150 hover:opacity-80"
      style={{
        height: 34,
        paddingLeft: 8,
        paddingRight: 4,
        borderRadius: "var(--radius)",
        backgroundColor: "var(--card)",
      }}
    >
      <div className="flex items-center gap-1">
        <Icon
          path={svgPaths.p3132d800}
          viewBox="0 0 12 12"
          inset="12.5%"
          fill="var(--accent)"
        />
        <span
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "20px",
            color: "var(--accent)",
          }}
        >
          {item.label}
        </span>
      </div>
      {/* Dashed border */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "var(--radius)",
          border: "1px dashed var(--accent)",
        }}
      />
    </button>
  );
}

/* ============================================================
   Action icons in the panel header
   ============================================================ */
function ActionIcons() {
  const actions = [
    { id: "copy", path: svgPaths.p1a706900, viewBox: "0 0 13.3333 13.3333", inset: "8.33%", title: "Duplicate" },
    { id: "edit", path: svgPaths.p14c20f80, viewBox: "0 0 13.0036 12.0018", inset: "12.49% 9.36% 12.5% 9.36%", title: "Edit" },
    { id: "delete", path: svgPaths.pe337380, viewBox: "0 0 12 13", inset: "6.25% 12.5% 12.5% 12.5%", title: "Delete" },
    { id: "lock", path: svgPaths.p19474a00, viewBox: "0 0 12 13.5", inset: "3.13% 12.5% 12.5% 12.5%", title: "Lock" },
  ];

  return (
    <div className="flex gap-1 items-center shrink-0">
      {actions.map((a) => (
        <button
          key={a.id}
          className="flex items-center justify-center overflow-clip shrink-0 size-6 cursor-pointer bg-transparent border-none outline-none transition-colors duration-150 hover:bg-muted"
          style={{ borderRadius: "var(--radius-sm)" }}
          title={a.title}
        >
          <Icon
            path={a.path}
            viewBox={a.viewBox}
            inset={a.inset}
            fill="var(--accent)"
          />
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   Status Tile — shows label + "Draft" chip
   ============================================================ */
function StatusTile({ selected, onSelect }: { selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="flex items-center w-full relative cursor-pointer border-none outline-none transition-colors duration-150"
      style={{
        height: 34,
        padding: "0 8px",
        borderRadius: "var(--radius)",
        backgroundColor: selected ? "var(--primary-50)" : "var(--card)",
      }}
    >
      <div className="flex flex-1 items-center gap-1 min-w-0">
        <Icon
          path={svgPaths.p1bf4b000}
          viewBox="0 0 12 12"
          inset="12.5%"
          fill="var(--muted-foreground)"
        />
        <span
          className="min-w-0 overflow-hidden whitespace-nowrap"
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
          }}
        >
          Status
        </span>
      </div>
      {/* Draft chip */}
      <div
        className="flex items-center justify-center shrink-0 px-2"
        style={{
          height: 24,
          backgroundColor: "var(--yellow-100)",
          borderRadius: "var(--radius-full)",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-normal)",
            color: "var(--yellow-900)",
            lineHeight: "20px",
          }}
        >
          Draft
        </span>
      </div>
      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "var(--radius)",
          border: selected
            ? "1px solid var(--accent)"
            : "1px solid rgba(19,18,33,0.2)",
                  }}
      />
    </button>
  );
}

/* ============================================================
   Schedule Tile — shows label + selected range, opens date picker
   ============================================================ */
function ScheduleTile({
  selected,
  onSelect,
  dateRange,
  onOpenPicker,
}: {
  selected: boolean;
  onSelect: () => void;
  dateRange: DateRange | null;
  onOpenPicker: (rect: DOMRect) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const formatRange = (r: DateRange) => {
    if (!r.start || !r.end) return null;
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    const year = r.end.getFullYear();
    return `${fmt(r.start)} – ${fmt(r.end)} ${year}`;
  };

  const rangeLabel = dateRange ? formatRange(dateRange) : null;

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        onSelect();
        if (buttonRef.current) {
          onOpenPicker(buttonRef.current.getBoundingClientRect());
        }
      }}
      className="flex items-center w-full relative cursor-pointer border-none outline-none transition-colors duration-150"
      style={{
        height: 34,
        padding: "0 8px",
        borderRadius: "var(--radius)",
        backgroundColor: selected ? "var(--primary-50)" : "var(--card)",
      }}
    >
      <div className="flex flex-1 items-center gap-1 min-w-0">
        <Icon
          path={svgPaths.p3f356000}
          viewBox="0 0 12 13"
          inset="6.25% 12.5% 12.5% 12.5%"
          fill="var(--muted-foreground)"
        />
        <span
          className="min-w-0 overflow-hidden whitespace-nowrap"
          style={{
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
          }}
        >
          Schedule
        </span>
      </div>
      {/* Range value chip */}
      {rangeLabel && (
        <div
          className="flex items-center justify-center shrink-0 px-2"
          style={{
            height: 24,
            backgroundColor: "var(--primary-100)",
            borderRadius: "var(--radius-full)",
            maxWidth: 160,
          }}
        >
          <span
            className="overflow-hidden whitespace-nowrap"
            style={{
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-normal)",
              color: "var(--accent)",
              textOverflow: "ellipsis",
              lineHeight: "20px",
            }}
          >
            {rangeLabel}
          </span>
        </div>
      )}
      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: "var(--radius)",
          border: selected
            ? "1px solid var(--accent)"
            : "1px solid rgba(19,18,33,0.2)",
                  }}
      />
    </button>
  );
}

/* ============================================================
   Main component
   ============================================================ */
export interface SwappedInFrame {
  id: string;
  location: string;
  from: string;
  dates: string;
}

export function DealLinePanel({
  dealLineName = "Deal Line 1",
  hideCheckAllocate = false,
  onAvailabilityReady,
  initialDateRange,
  initialSelections,
  swappedIn = [],
}: {
  dealLineName?: string;
  hideCheckAllocate?: boolean;
  onAvailabilityReady?: () => void;
  initialDateRange?: DateRange;
  /** Pre-filled field values, keyed by card id */
  initialSelections?: Record<string, string[]>;
  /** Frames moved in by a confirmed swap */
  swappedIn?: SwappedInFrame[];
}) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<DateRange | null>(initialDateRange ?? null);
  const [datePickerAnchor, setDatePickerAnchor] = useState<DOMRect | null>(null);
  const [activePanel, setActivePanel] = useState<ActivePanel | null>(null);
  const [confirmedSelections, setConfirmedSelections] = useState<Record<string, string[]>>(initialSelections ?? {});

  const PANEL_FIELD_IDS = new Set(["channel", "media-type", "networks", "format", "location"]);

  // Fire callback once when schedule is set — signals availability is ready
  const readyFiredRef = useRef(false);
  useEffect(() => {
    if (dateRange?.start && dateRange?.end && !readyFiredRef.current) {
      readyFiredRef.current = true;
      onAvailabilityReady?.();
    }
  }, [dateRange, onAvailabilityReady]);

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getPosition = (index: number, total: number) => {
    if (total === 1) return "single" as const;
    if (index === 0) return "first" as const;
    if (index === total - 1) return "last" as const;
    return "middle" as const;
  };

  return (
    <div
      className="flex flex-col relative h-full"
      style={{ width: 372, backgroundColor: "var(--panel-background)" }}
    >
      {/* Outer border */}
      <div
        aria-hidden="true"
        className="absolute border border-border border-solid inset-0 pointer-events-none z-10"
      />

      {/* Scrollable content area */}
      <div
        className="flex-1 overflow-y-auto flex flex-col"
        style={{ padding: "16px", paddingBottom: hideCheckAllocate ? 16 : 96, gap: 16 }}
      >
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between">
          <span
            style={{
              fontSize: 17,
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "24px",
              color: "var(--foreground)",
            }}
          >
            {dealLineName}
          </span>
          <ActionIcons />
        </div>

        {/* ===== SWAPPED IN ===== */}
        {swappedIn.length > 0 && (
          <div className="flex flex-col" style={{ gap: 8 }}>
            <span style={{ fontSize: "var(--text-xs)", lineHeight: "20px", color: "var(--muted-foreground)" }}>
              Swapped in · {swappedIn.length} {swappedIn.length === 1 ? "frame" : "frames"}
            </span>
            <div
              className="flex flex-col"
              style={{ backgroundColor: "var(--card)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
            >
              {swappedIn.map((f, i) => (
                <div
                  key={f.id}
                  className="flex items-start"
                  style={{ gap: 8, padding: "8px 10px", borderTop: i ? "1px solid rgba(19,18,33,0.07)" : "none" }}
                >
                  <div className="flex flex-col flex-1 min-w-0" style={{ gap: 1 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontVariantNumeric: "tabular-nums", fontSize: 11, lineHeight: "16px", color: "var(--foreground)" }}>{f.id}</span>
                    <span style={{ fontSize: "var(--text-sm)", lineHeight: "18px", color: "var(--foreground)" }}>{f.location}</span>
                    <span style={{ fontSize: "var(--text-xs)", lineHeight: "16px", color: "var(--muted-foreground)" }}>From {f.from} · {f.dates}</span>
                  </div>
                  <span
                    className="shrink-0"
                    style={{ fontSize: 11, lineHeight: "16px", fontWeight: "var(--font-weight-normal)", color: "var(--accent)", backgroundColor: "rgba(44,36,195,0.08)", border: "1px solid rgba(44,36,195,0.2)", borderRadius: "var(--radius-full)", padding: "1px 8px" }}
                  >
                    Swapped in
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== SECTIONS ===== */}
        {SECTIONS.map((section) => {
          const collapsed = collapsedSections.has(section.id);
          return (
            <div key={section.id} className="flex flex-col" style={{ gap: 12 }}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full bg-transparent border-none outline-none cursor-pointer"
              >
                <span
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-normal)",
                    lineHeight: "20px",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {section.title}
                </span>
                <div
                  className="shrink-0 size-6 flex items-center justify-center transition-transform duration-200"
                  style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="var(--muted-foreground)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              {/* Section content */}
              {!collapsed && (
                <div className="flex flex-col" style={{ gap: 12 }}>
                  {/* ── Status section: special StatusTile ── */}
                  {section.id === "status" && (
                    <StatusTile
                      selected={selectedItems.has("status-card")}
                      onSelect={() => toggleSelect("status-card")}
                    />
                  )}

                  {/* ── Non-status card items ── */}
                  {section.id !== "status" && section.cards && section.cards.length > 0 && (
                    <div
                      className="flex flex-col"
                      style={section.separated ? { gap: 6 } : {}}
                    >
                      {section.cards.map((card, i) => {
                        if (card.id === "schedule") {
                          return (
                            <ScheduleTile
                              key={card.id}
                              selected={selectedItems.has(card.id)}
                              onSelect={() => toggleSelect(card.id)}
                              dateRange={dateRange}
                              onOpenPicker={(rect) => setDatePickerAnchor(rect)}
                            />
                          );
                        }
                        const confirmed = confirmedSelections[card.id] ?? [];
                        const valueLabel = confirmed.length > 0
                          ? confirmed.length === 1
                            ? confirmed[0]
                            : `${confirmed[0]} +${confirmed.length - 1}`
                          : undefined;
                        return (
                          <CardTile
                            key={card.id}
                            item={card}
                            selected={selectedItems.has(card.id) || activePanel?.fieldId === card.id}
                            onSelect={(rect) => {
                              if (PANEL_FIELD_IDS.has(card.id)) {
                                setActivePanel({ fieldId: card.id, anchorRect: rect });
                              } else {
                                toggleSelect(card.id);
                              }
                            }}
                            position={
                              section.separated
                                ? "single"
                                : getPosition(i, section.cards!.length)
                            }
                            valueLabel={valueLabel}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* Target rows (stacked — unchanged) */}
                  {section.targets && section.targets.length > 0 && (
                    <div className="flex flex-col">
                      {section.targets.map((target, i) => (
                        <TargetTile
                          key={target.id}
                          target={target}
                          selected={selectedItems.has(target.id)}
                          onSelect={() => toggleSelect(target.id)}
                          position={getPosition(i, section.targets!.length)}
                        />
                      ))}
                    </div>
                  )}

                  {/* Add action items */}
                  {section.addItems &&
                    section.addItems.map((add) => (
                      <AddActionTile
                        key={add.id}
                        item={add}
                        onClick={(rect) => {
                          if (PANEL_FIELD_IDS.has(add.id)) {
                            setActivePanel({ fieldId: add.id, anchorRect: rect });
                          }
                        }}
                      />
                    ))}
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* ===== STICKY CHECK ALLOCATE BUTTON ===== */}
      {!hideCheckAllocate && (
        <div
          className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center"
          style={{
            padding: "12px 16px 24px 16px",
            borderTop: "1px solid var(--border)",
            backgroundColor: "var(--panel-background)",
          }}
        >
          <button
            className="flex gap-1 items-center justify-center overflow-clip px-3 w-full border-none outline-none cursor-pointer transition-colors duration-200 hover:opacity-90"
            style={{
              height: 37,
              backgroundColor: "var(--primary-900)",
              borderRadius: "var(--radius)",
              minWidth: 36,
              boxShadow: "var(--elevation-sm)",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "20px",
                color: "var(--primary-foreground)",
              }}
            >
              Check allocation
            </span>
          </button>
        </div>
      )}

      {/* ===== DATE RANGE PICKER PORTAL ===== */}
      {datePickerAnchor && (
        <DateRangePicker
          value={dateRange ?? undefined}
          anchorRect={datePickerAnchor}
          onClose={() => setDatePickerAnchor(null)}
          onApply={(r) => {
            setDateRange(r);
            setDatePickerAnchor(null);
          }}
        />
      )}

      {/* ===== ACTION PANEL PORTAL ===== */}
      {activePanel && (
        <ActionPanel
          activePanel={activePanel}
          currentSelections={confirmedSelections[activePanel.fieldId] ?? []}
          onCancel={() => setActivePanel(null)}
          onConfirm={(selections) => {
            setConfirmedSelections((prev) => ({ ...prev, [activePanel.fieldId]: selections }));
            setActivePanel(null);
          }}
        />
      )}
    </div>
  );
}