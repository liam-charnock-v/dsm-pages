import { useLayoutEffect, useRef, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { DateRangePicker } from "../DateRangePicker";
import { DEAL_LINE, Period, fmtLong, fmtShort, samePeriod } from "./swapData";
import { BORDER, Caption, Chip, FG, Title } from "./swapUi";

/* Step 1 — define the swap period (flow 03–04) */
export function ScheduleStep({
  schedule, pickerOpen, onOpenPicker, onClosePicker, onApply,
}: {
  schedule: Period | null;
  pickerOpen: boolean;
  onOpenPicker: () => void;
  onClosePicker: () => void;
  onApply: (p: Period) => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  useLayoutEffect(() => {
    setAnchor(pickerOpen && triggerRef.current ? triggerRef.current.getBoundingClientRect() : null);
  }, [pickerOpen]);
  const dl = DEAL_LINE.period;
  const shown = schedule ?? (pickerOpen ? dl : null);

  const hint = !shown
    ? `Must sit within ${DEAL_LINE.name} (${fmtLong(dl)})`
    : samePeriod(shown, dl)
      ? null
      : `Within ${DEAL_LINE.name} (${fmtLong(dl)})`;

  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      <section className="flex flex-col" style={{ gap: 8 }}>
        <div className="flex items-center justify-between">
          <h2 className="m-0"><Title>Define your schedule</Title></h2>
          {!schedule && <Chip tone="brand">Required</Chip>}
        </div>
        <p className="m-0" style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: "#42414e" }}>
          Choose the period you need frames for. Only these dates are released from donor campaigns.
        </p>

        <div className="flex flex-col" style={{ gap: 4, marginTop: 4 }}>
          <label htmlFor="swap-period" style={{ fontSize: "var(--text-xs)", lineHeight: "16px", fontWeight: "var(--font-weight-medium)", color: FG }}>
            Swap period
          </label>
          <button
            id="swap-period"
            ref={triggerRef}
            type="button"
            aria-expanded={pickerOpen}
            aria-haspopup="dialog"
            // Keep the picker's outside-click handler from seeing the trigger
            onMouseDown={(e) => pickerOpen && e.stopPropagation()}
            onClick={pickerOpen ? onClosePicker : onOpenPicker}
            className="flex items-center w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            style={{
              gap: 8,
              height: 36,
              padding: "0 10px",
              borderRadius: "var(--radius)",
              border: `1px solid ${pickerOpen ? "rgba(44,36,195,0.5)" : BORDER}`,
              backgroundColor: "#fff",
              boxShadow: "var(--elevation-sm)",
              textAlign: "left",
            }}
          >
            <Calendar size={14} color={shown ? "#2c24c3" : "#7c7b87"} aria-hidden="true" />
            <span className="flex-1" style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: shown ? FG : "#9e9daa", fontVariantNumeric: "tabular-nums" }}>
              {shown ? fmtLong(shown) : "Select dates"}
            </span>
            <ChevronDown size={14} color="#7c7b87" aria-hidden="true" style={{ transform: pickerOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
          </button>
          {hint && <Caption>{hint}</Caption>}
        </div>
      </section>

      {pickerOpen && anchor && (
        <DateRangePicker
          value={{ start: shown!.start, end: shown!.end }}
          anchorRect={anchor}
          minDate={dl.start}
          maxDate={dl.end}
          note="Dates outside the deal line can't be selected."
          applyLabel={(r) => `Apply ${fmtShort({ start: r.start!, end: r.end! })}`}
          onClose={onClosePicker}
          onApply={(r) => r.start && r.end && onApply({ start: r.start, end: r.end })}
        />
      )}
    </div>
  );
}
