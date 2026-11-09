import { useState } from "react";
import svgPaths from "../../imports/svg-0rtv47ygd7";

interface DealLineTab {
  id: string;
  label: string;
}

const viewTabs = [
  {
    id: "map",
    label: "Map",
    svgPath: svgPaths.p3c750400,
    viewBox: "0 0 9.75 9.00005",
    iconSize: "size-3",
    iconInset: "9.38% 9.38% 12.5% 12.5%",
  },
  {
    id: "overview",
    label: "Overview",
    svgPath: svgPaths.p2c227100,
    viewBox: "0 0 9.75 9",
    iconSize: "size-3",
    iconInset: "3.13% 12.5% 15.63% 12.5%",
  },
  {
    id: "review",
    label: "Review",
    svgPath: svgPaths.p13a84a80,
    viewBox: "0 0 9.75 8.625",
    iconSize: "size-3",
    iconInset: "9.38% 15.63% 9.38% 12.5%",
  },
] as const;

export function Header({
  drawerOpen,
  onToggleDrawer,
  dealLines,
  activeDealLine,
  activeView,
  onSetActiveDealLine,
  onAddDealLine,
  onSetActiveView,
  swapMode,
}: {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  dealLines: DealLineTab[];
  activeDealLine: string;
  activeView: string;
  onSetActiveDealLine: (id: string) => void;
  onAddDealLine: () => void;
  onSetActiveView: (id: string) => void;
  swapMode?: boolean;
}) {
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const addDealLine = () => {
    const newId = `dl${dealLines.length + 1}`;
    onAddDealLine();
    onSetActiveDealLine(newId);
  };

  return (
    <header
      className="bg-background flex items-center justify-between p-2 relative w-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Outer border */}
      <div
        aria-hidden="true"
        className="absolute border border-border border-solid inset-0 pointer-events-none"
      />

      {/* ===== LEFT SECTION ===== */}
      <div className="flex gap-2 items-center shrink-0">
        {/* Campaign info area (fixed 372px with right border) */}
        <div className="flex gap-2 items-center pr-2 relative shrink-0 w-[372px]">
          {/* Right border divider */}
          <div
            aria-hidden="true"
            className="absolute border-r border-border border-solid inset-0 pointer-events-none"
          />

          {/* Campaign name + logo + status */}
          <div className="flex flex-1 gap-2 items-center min-w-0">
            {/* Campaign logo + title */}
            <div className="flex flex-1 gap-2 items-center min-w-0">
              {/* Direct Sales logo icon */}
              <div className="shrink-0">
                <div
                  className="flex items-center justify-center overflow-clip rounded-[var(--radius-sm)] size-6"
                  style={{ backgroundColor: "#fcdcca" }}
                >
                  <div className="overflow-clip relative size-4">
                    <div className="absolute" style={{ inset: "9.38% 9.38% 9.37% 9.37%" }}>
                      <svg
                        className="absolute block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 13 13"
                      >
                        <path d={svgPaths.p11cdc972} fill="#E4712E" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign title */}
              <div className="flex flex-1 items-start min-w-0">
                <div className="flex-1 h-6 min-w-[184px] rounded-[var(--radius-sm)]">
                  <div className="flex flex-row items-center size-full" style={{ minWidth: "inherit" }}>
                    <div className="flex gap-1 items-center pl-[2px] relative size-full" style={{ minWidth: "inherit" }}>
                      <div className="flex flex-1 items-center min-w-0">
                        <div className="flex flex-1 items-center justify-center min-w-0">
                          <div
                            className="flex flex-1 flex-col justify-center min-w-0 overflow-hidden whitespace-nowrap"
                            style={{
                              fontSize: "var(--text-base)",
                              fontWeight: "var(--font-weight-medium)",
                              lineHeight: 0,
                              color: "var(--foreground)",
                              opacity: 0.8,
                              textOverflow: "ellipsis",
                            }}
                          >
                            <p style={{ lineHeight: "24px", overflow: "hidden" }}>
                              Campaña Verano Refrescos 2026
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Draft status badge */}
            <div
              className="flex h-5 items-center justify-center overflow-clip shrink-0 rounded-[var(--radius-full)]"
              style={{ backgroundColor: "rgba(248, 188, 26, 0.2)", minWidth: "20px" }}
            >
              <div className="flex items-center px-1 shrink-0">
                <div className="flex items-center px-px shrink-0">
                  <p
                    className="shrink-0"
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--font-weight-normal)",
                      lineHeight: "20px",
                      color: "#9d7717",
                    }}
                  >
                    Draft
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Show/hide left panel button */}
          <button
            onClick={onToggleDrawer}
            className="flex items-center justify-center overflow-clip rounded-[var(--radius-sm)] shrink-0 size-6 cursor-pointer bg-transparent border-none outline-none transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            title={drawerOpen ? "Hide left panel" : "Show left panel"}
            aria-label={drawerOpen ? "Hide left panel" : "Show left panel"}
          >
            <div className="overflow-clip relative shrink-0 size-4">
              <div className="absolute" style={{ inset: "15.63% 9.38%" }}>
                <svg
                  className="absolute block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 13 11"
                >
                  <path
                    d={svgPaths.p1aae9760}
                    fill="var(--foreground)"
                    fillOpacity="0.75"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* ===== DEAL LINE TABS ===== */}
        {!swapMode && <div className="flex gap-1 items-center shrink-0">
          {dealLines.map((dl) => {
            const isActive = activeDealLine === dl.id;
            return (
              <button
                key={dl.id}
                onClick={() => onSetActiveDealLine(dl.id)}
                className={`flex gap-2 items-center px-1 py-[2px] relative rounded-[var(--radius-sm)] shrink-0 cursor-pointer border-none outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? ""
                    : "hover:bg-muted"
                }`}
                style={{
                  backgroundColor: isActive ? "rgba(44, 36, 195, 0.05)" : "transparent",
                }}
              >
                {/* Border overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-[var(--radius-sm)]"
                  style={{
                    border: isActive
                      ? "1px solid var(--accent)"
                      : "1px solid transparent",
                  }}
                />
                <div className="flex gap-1 items-center px-1 shrink-0">
                  <p
                    className="shrink-0"
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      lineHeight: "20px",
                      color: isActive
                        ? "var(--accent)"
                        : "var(--muted-foreground)",
                    }}
                  >
                    {dl.label}
                  </p>
                </div>
              </button>
            );
          })}

          {/* + New deal line button */}
          <button
            onClick={onAddDealLine}
            className="flex gap-2 items-center px-1 py-[2px] rounded-[var(--radius-sm)] shrink-0 cursor-pointer bg-transparent border-none outline-none transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex gap-1 items-center px-1 shrink-0">
              {/* Plus icon */}
              <div className="overflow-clip relative shrink-0 size-4">
                <div className="absolute" style={{ inset: "12.5%" }}>
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 12 12"
                  >
                    <path d={svgPaths.p3132d800} fill="var(--foreground)" />
                  </svg>
                </div>
              </div>
              <p
                className="shrink-0"
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: "20px",
                  color: "var(--muted-foreground)",
                }}
              >
                New deal line
              </p>
            </div>
          </button>
        </div>}
      </div>

      {/* ===== RIGHT SECTION ===== */}
      {!swapMode && <div className="flex items-center justify-end relative shrink-0 w-[342px]">
        {/* Left border divider */}
        <div
          aria-hidden="true"
          className="absolute border-l border-border border-solid inset-0 pointer-events-none"
        />

        <div className="flex gap-2 items-center shrink-0">
          {/* View tabs: Map / Overview / Review */}
          <div className="flex gap-1 items-center shrink-0">
            {viewTabs.map((tab) => {
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSetActiveView(tab.id)}
                  className="flex items-start shrink-0 cursor-pointer bg-transparent border-none outline-none p-0 focus-visible:ring-2 focus-visible:ring-ring rounded-[var(--radius-sm)]"
                >
                  <div
                    className="flex gap-px items-center px-1 py-[2px] relative rounded-[var(--radius-sm)] shrink-0 transition-colors duration-150"
                    style={{
                      backgroundColor: isActive
                        ? "var(--primary-foreground)"
                        : "transparent",
                    }}
                  >
                    {/* Border overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none rounded-[var(--radius-sm)]"
                      style={{
                        border: isActive
                          ? "1px solid var(--accent)"
                          : "1px solid var(--border)",
                      }}
                    />
                    {/* Icon */}
                    <div className="overflow-clip relative shrink-0 size-3">
                      <div className="absolute" style={{ inset: tab.iconInset }}>
                        <svg
                          className="absolute block size-full"
                          fill="none"
                          preserveAspectRatio="none"
                          viewBox={tab.viewBox}
                        >
                          <path
                            d={tab.svgPath}
                            fill="var(--muted-foreground)"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Label */}
                    <div className="flex gap-1 items-center pl-1 pr-2 shrink-0">
                      <p
                        className="shrink-0"
                        style={{
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-weight-medium)",
                          lineHeight: "20px",
                          color: isActive
                            ? "var(--accent)"
                            : "var(--muted-foreground)",
                        }}
                      >
                        {tab.label}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel toggle (rotated 180°) */}
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <button
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                className="flex items-center justify-center overflow-clip rounded-[var(--radius-sm)] size-6 cursor-pointer bg-transparent border-none outline-none transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                title={rightPanelOpen ? "Hide right panel" : "Show right panel"}
                aria-label={rightPanelOpen ? "Hide right panel" : "Show right panel"}
              >
                <div className="overflow-clip relative shrink-0 size-4">
                  <div className="absolute" style={{ inset: "15.63% 9.38%" }}>
                    <svg
                      className="absolute block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 13 11"
                    >
                      <path
                        d={svgPaths.p1aae9760}
                        fill="var(--muted-foreground)"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>}
    </header>
  );
}