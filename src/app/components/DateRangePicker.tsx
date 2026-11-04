import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import svgPaths from "../../imports/svg-9ob4c42aan";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Props {
  value?: DateRange;
  anchorRect: DOMRect;
  onClose: () => void;
  onApply: (range: DateRange) => void;
  /** Days before this can't be picked */
  minDate?: Date;
  /** Days after this can't be picked */
  maxDate?: Date;
  /** Info line shown above the footer */
  note?: string;
  /** Apply button label for a complete range */
  applyLabel?: (range: DateRange) => string;
}

/* ─── constants ─── */
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
// Week starts Monday: Mo Tu We Th Fr Sa Su
const DAY_LABELS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

/* ─── helpers ─── */
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  );
}

/** Generate week rows (Monday-start) for a given month */
function getWeeks(year: number, month: number): (Date | null)[][] {
  const firstJsDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstJsDay + 6) % 7; // Mon=0 … Sun=6

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/* ─── Nav arrow button ─── */
function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 cursor-pointer border-none outline-none"
      style={{
        width: 36,
        height: 36,
        borderRadius: 6,
        backgroundColor: "#ffffff",
      }}
    >
      {/* content */}
      <div className="flex items-center justify-center size-full overflow-clip rounded-[inherit]">
        <div className="overflow-clip relative shrink-0" style={{ width: 20, height: 20 }}>
          {direction === "prev" ? (
            <div
              className="absolute"
              style={{ inset: "15.62% 34.37% 15.62% 28.12%" }}
            >
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 7.50084 13.7507"
              >
                <path d={svgPaths.p331fd680} fill="var(--accent)" />
              </svg>
            </div>
          ) : (
            <div
              className="absolute"
              style={{ inset: "15.62% 28.12% 15.62% 34.37%" }}
            >
              <svg
                className="absolute block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 7.50084 13.7507"
              >
                <path d={svgPaths.pb084e00} fill="var(--accent)" />
              </svg>
            </div>
          )}
        </div>
      </div>
      {/* inset shadow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{ boxShadow: "inset 0px -1px 0px 0px rgba(16,16,52,0.08)" }}
      />
      {/* border + elevation */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[6px]"
        style={{
          border: "1px solid rgba(19,18,33,0.1)",
          boxShadow: "0px 1px 2px 0px rgba(16,16,52,0.08)",
        }}
      />
    </button>
  );
}

/* ─── Single month calendar ─── */
function MonthGrid({
  year,
  month,
  range,
  hover,
  onDayClick,
  onDayHover,
  isDisabled,
}: {
  year: number;
  month: number;
  range: DateRange;
  hover: Date | null;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
  isDisabled: (d: Date) => boolean;
}) {
  const weeks = getWeeks(year, month);
  // effective end includes hover preview when only start is set
  const effectiveEnd =
    range.start && !range.end && hover ? hover : range.end;

  const ROW_H = 36;

  return (
    <div className="flex flex-col" style={{ flex: "1 0 0", gap: 4 }}>
      {/* Day header row */}
      <div className="flex items-center" style={{ height: ROW_H }}>
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="flex items-center justify-center"
            style={{ flex: "1 0 0", height: "100%" }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "16px",
                color: "var(--foreground)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Week rows */}
      {weeks.map((week, wi) => (
        <div key={wi} className="flex" style={{ height: ROW_H }}>
          {week.map((date, ci) => {
            if (!date) {
              return (
                <div key={`e-${ci}`} style={{ flex: "1 0 0", height: "100%" }} />
              );
            }

            if (isDisabled(date)) {
              return (
                <span
                  key={date.getDate()}
                  aria-disabled="true"
                  className="flex items-center justify-center"
                  style={{
                    flex: "1 0 0",
                    height: "100%",
                    color: "rgba(19,18,33,0.28)",
                    textDecoration: "line-through",
                    fontSize: 13,
                    lineHeight: "20px",
                    fontFamily: "'Inter', sans-serif",
                    cursor: "not-allowed",
                  }}
                >
                  {date.getDate()}
                </span>
              );
            }

            const isStart = !!(range.start && isSameDay(date, range.start));
            const isEnd = !!(effectiveEnd && isSameDay(date, effectiveEnd));
            const inRange =
              range.start &&
              effectiveEnd &&
              date > (range.start < effectiveEnd ? range.start : effectiveEnd) &&
              date < (range.start < effectiveEnd ? effectiveEnd : range.start);

            /* Background colour */
            let bgColor = "transparent";
            if (isStart || isEnd) {
              bgColor = "#15115e"; // dark navy for selected endpoints
            } else if (inRange) {
              bgColor = "rgba(44,36,195,0.2)";
            }

            /* Border radius — only on start / end cells */
            let borderRadius = "0";
            if (isStart && isEnd) {
              borderRadius = "12px";
            } else if (isStart) {
              borderRadius = "12px 0 0 12px";
            } else if (isEnd) {
              borderRadius = "0 12px 12px 0";
            }

            const textColor =
              isStart || isEnd ? "#ffffff" : "var(--secondary-foreground, #42414e)";

            return (
              <button
                key={date.getDate()}
                onClick={() => onDayClick(date)}
                onMouseEnter={() => onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                className="flex items-center justify-center border-none outline-none cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  flex: "1 0 0",
                  height: "100%",
                  backgroundColor: bgColor,
                  borderRadius,
                  color: textColor,
                  fontSize: 13,
                  fontWeight: "var(--font-weight-normal)",
                  lineHeight: "20px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ─── */
export function DateRangePicker({ value, anchorRect, onClose, onApply, minDate, maxDate, note, applyLabel }: Props) {
  const [range, setRange] = useState<DateRange>(
    value ?? { start: null, end: null }
  );
  const [hover, setHover] = useState<Date | null>(null);
  const [leftMonth, setLeftMonth] = useState(() => {
    const anchor = value?.start ?? minDate ?? new Date();
    return { year: anchor.getFullYear(), month: anchor.getMonth() };
  });

  const isDisabled = (d: Date) =>
    (!!minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) ||
    (!!maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()));

  const pickerRef = useRef<HTMLDivElement>(null);

  const rightMonth =
    leftMonth.month === 11
      ? { year: leftMonth.year + 1, month: 0 }
      : { year: leftMonth.year, month: leftMonth.month + 1 };

  const prevMonth = () =>
    setLeftMonth((p) =>
      p.month === 0
        ? { year: p.year - 1, month: 11 }
        : { year: p.year, month: p.month - 1 }
    );

  const nextMonth = () =>
    setLeftMonth((p) =>
      p.month === 11
        ? { year: p.year + 1, month: 0 }
        : { year: p.year, month: p.month + 1 }
    );

  const handleDayClick = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      // Starting a new selection
      setRange({ start: date, end: null });
    } else {
      // Completing the range
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else if (isSameDay(date, range.start)) {
        setRange({ start: date, end: date });
      } else {
        setRange({ start: range.start, end: date });
      }
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Defer so the click that opened the picker doesn't immediately close it
    const id = setTimeout(() => document.addEventListener("mousedown", handler), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  const canApply = !!(range.start && range.end);

  /* Position: below the anchor, clamped to viewport */
  const PICKER_W = 620;
  const top = anchorRect.bottom + 6;
  const rawLeft = anchorRect.left;
  const left = Math.max(8, Math.min(rawLeft, window.innerWidth - PICKER_W - 8));

  const formatDate = (d: Date | null) =>
    d
      ? d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  return createPortal(
    <div
      ref={pickerRef}
      className="fixed flex flex-col"
      style={{
        top,
        left,
        width: PICKER_W,
        zIndex: 9999,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        border: "1px solid rgba(19,18,33,0.1)",
        boxShadow: "0px 8px 32px rgba(16,16,52,0.12)",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ══ Navigation header ══ */}
      <div
        className="flex items-center"
        style={{ gap: 8, padding: "12px 12px 0 12px" }}
      >
        <NavButton direction="prev" onClick={prevMonth} />

        {/* Left month label */}
        <div
          className="flex items-center justify-center"
          style={{
            flex: "1 0 0",
            height: 36,
            backgroundColor: "#ffffff",
            borderRadius: 6,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: "var(--font-weight-medium)",
              lineHeight: "24px",
              color: "var(--foreground)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {MONTH_NAMES[leftMonth.month]} {leftMonth.year}
          </span>
        </div>

        {/* Separator */}
        <div
          style={{ width: 1, height: 20, backgroundColor: "rgba(19,18,33,0.1)", flexShrink: 0 }}
        />

        {/* Right month label */}
        <div
          className="flex items-center justify-center"
          style={{
            flex: "1 0 0",
            height: 36,
            backgroundColor: "#ffffff",
            borderRadius: 6,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: "var(--font-weight-medium)",
              lineHeight: "24px",
              color: "var(--foreground)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {MONTH_NAMES[rightMonth.month]} {rightMonth.year}
          </span>
        </div>

        <NavButton direction="next" onClick={nextMonth} />
      </div>

      {/* ══ Two month grids ══ */}
      <div className="flex" style={{ padding: "0 12px 12px 12px", gap: 0 }}>
        <MonthGrid
          year={leftMonth.year}
          month={leftMonth.month}
          range={range}
          hover={hover}
          onDayClick={handleDayClick}
          onDayHover={setHover}
          isDisabled={isDisabled}
        />

        {/* Vertical divider between months */}
        <div
          style={{
            width: 1,
            margin: "36px 0 0 0", // align to start of date rows, below header
            backgroundColor: "rgba(19,18,33,0.08)",
            flexShrink: 0,
          }}
        />

        <MonthGrid
          year={rightMonth.year}
          month={rightMonth.month}
          range={range}
          hover={hover}
          onDayClick={handleDayClick}
          onDayHover={setHover}
          isDisabled={isDisabled}
        />
      </div>

      {note && (
        <div
          className="flex items-center"
          style={{ gap: 8, padding: "10px 16px", borderTop: "1px solid rgba(19,18,33,0.08)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="7" cy="7" r="6.25" stroke="var(--muted-foreground)" strokeWidth="1.2" />
            <path d="M7 6.2v3.6M7 4.2v.4" stroke="var(--muted-foreground)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "var(--text-xs)", lineHeight: "16px", color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
            {note}
          </span>
        </div>
      )}

      {/* ══ Footer ══ */}
      <div
        className="flex items-center justify-between px-4"
        style={{
          height: 52,
          borderTop: "1px solid rgba(19,18,33,0.08)",
          gap: 8,
        }}
      >
        {/* Selected range summary */}
        <span
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--muted-foreground)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {range.start || range.end
            ? `${formatDate(range.start)} → ${formatDate(range.end)}`
            : "Select a start and end date"}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer border-none outline-none transition-opacity hover:opacity-80"
            style={{
              height: 32,
              paddingLeft: 16,
              paddingRight: 16,
              borderRadius: "var(--radius)",
              backgroundColor: "var(--muted)",
              color: "var(--foreground)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (canApply) {
                onApply(range);
                onClose();
              }
            }}
            disabled={!canApply}
            className="flex items-center justify-center cursor-pointer border-none outline-none transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              height: 32,
              paddingLeft: 16,
              paddingRight: 16,
              borderRadius: "var(--radius)",
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {canApply && applyLabel ? applyLabel(range) : "Apply"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
