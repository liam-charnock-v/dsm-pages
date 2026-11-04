import { useState, useEffect, useRef } from "react";
import { AvailabilityReportHeader } from "./AvailabilityReportHeader";
import { AvailabilityReportFilters } from "./AvailabilityReportFilters";
import { AvailabilityReportTable, generateTableData, type AvailabilityRow } from "./AvailabilityReportTable";
import { type DateRange } from "./DateRangePicker";

/* ─── Loading spinner (CSS animation injected once) ─── */
const SPINNER_STYLE = `
  @keyframes ar-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .ar-spinner {
    animation: ar-spin 0.75s linear infinite;
  }
  @keyframes ar-fadein {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ar-fadein {
    animation: ar-fadein 0.3s ease both;
  }
`;

type CheckStatus = "idle" | "loading" | "complete";

export function AvailabilityReportPage() {
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [mediaSelected, setMediaSelected] = useState<string[]>([]);
  const [channelSelected, setChannelSelected] = useState<string[]>([]);

  const [checkStatus, setCheckStatus] = useState<CheckStatus>("idle");
  const [tableData, setTableData] = useState<AvailabilityRow[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canCheck =
    !!(dateRange.start && dateRange.end) &&
    mediaSelected.length > 0 &&
    channelSelected.length > 0;

  const handleCheck = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTableData(generateTableData());
    setCheckStatus("loading");
    timerRef.current = setTimeout(() => setCheckStatus("complete"), 4000);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <div
      className="flex-1 flex flex-col h-full overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <style>{SPINNER_STYLE}</style>

      <AvailabilityReportHeader canCheck={canCheck} onCheck={handleCheck} />
      <AvailabilityReportFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        mediaSelected={mediaSelected}
        onMediaChange={setMediaSelected}
        channelSelected={channelSelected}
        onChannelChange={setChannelSelected}
      />

      {/* ── Body ── */}
      <div
        className="flex-1 overflow-hidden relative"
        style={{
          backgroundColor:
            checkStatus === "complete" ? "var(--background)" : "var(--muted)",
        }}
      >
        {/* Idle */}
        {checkStatus === "idle" && (
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--muted-foreground)",
              lineHeight: "24px",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            Add filters to query availability
          </p>
        )}

        {/* Loading */}
        {checkStatus === "loading" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              className="ar-spinner"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "2.5px solid rgba(21,17,94,0.15)",
                borderTopColor: "var(--primary)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--muted-foreground)",
                lineHeight: "24px",
                whiteSpace: "nowrap",
              }}
            >
              Checking availability
            </span>
          </div>
        )}

        {/* Complete — table */}
        {checkStatus === "complete" && (
          <div className="ar-fadein" style={{ width: "100%", height: "100%", overflow: "auto" }}>
            <AvailabilityReportTable rows={tableData} />
          </div>
        )}
      </div>
    </div>
  );
}