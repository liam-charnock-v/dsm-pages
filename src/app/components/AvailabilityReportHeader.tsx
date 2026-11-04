import svgPaths from "../../imports/svg-81ibrgj3wk";

interface Props {
  canCheck: boolean;
  onCheck?: () => void;
}

export function AvailabilityReportHeader({ canCheck, onCheck }: Props) {
  return (
    <div
      className="shrink-0 flex items-center gap-5 px-5 pt-4 pb-3"
      style={{
        backgroundColor: "var(--background)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Title */}
      <div className="flex-1 flex items-center">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "var(--text-lg)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
            lineHeight: "28px",
            whiteSpace: "nowrap",
          }}
        >
          Availability report
        </span>
      </div>

      {/* Check availability button */}
      <div className="flex items-center justify-end">
        <button
          disabled={!canCheck}
          onClick={canCheck ? onCheck : undefined}
          className="flex items-center gap-1 h-7 px-2"
          style={{
            backgroundColor: canCheck ? "var(--primary)" : "var(--muted)",
            borderRadius: "var(--radius)",
            border: "none",
            outline: "none",
            cursor: canCheck ? "pointer" : "not-allowed",
            transition: "background-color 200ms ease, opacity 200ms ease",
            opacity: 1,
          }}
          onMouseEnter={(e) => {
            if (canCheck) (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          {/* Refresh/sync icon */}
          <div className="shrink-0 size-4 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 11.75 11.75"
              fill="none"
              style={{ display: "block" }}
            >
              <path
                d={svgPaths.p14f6ea80}
                fill={canCheck ? "var(--primary-foreground)" : "var(--muted-foreground)"}
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: canCheck ? "var(--primary-foreground)" : "var(--muted-foreground)",
              whiteSpace: "nowrap",
              lineHeight: "20px",
              transition: "color 200ms ease",
            }}
          >
            Check availability
          </span>
        </button>
      </div>
    </div>
  );
}