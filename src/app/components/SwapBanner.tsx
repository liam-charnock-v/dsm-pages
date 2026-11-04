import svgPaths from "../../imports/LevelOneBanner/svg-c95uhdqd31";

/** Full-width bar shown above the content only while swap mode is on */
export function SwapBanner({ onCancel }: { onCancel: () => void }) {
  return (
    <div
      role="region"
      aria-label="Swap mode"
      style={{
        flexShrink: 0,
        backgroundColor: "#2c24c3",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        height: 40,
        gap: 12,
      }}
    >
      {/* Left: swap icon + label + description */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        {/* Swap up/down icon */}
        <div aria-hidden="true" style={{ position: "relative", width: 16, height: 16, flexShrink: 0 }}>
          <div style={{ position: "absolute", top: "8.33%", left: "13.54%", right: "55.21%", bottom: "6.25%" }}>
            <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 5 13.6667">
              <path d={svgPaths.p257afa00} fill="white" />
            </svg>
          </div>
          <div style={{ position: "absolute", top: "8.33%", left: "55.21%", right: "13.54%", bottom: "6.25%" }}>
            <svg style={{ position: "absolute", display: "block", width: "100%", height: "100%" }} fill="none" viewBox="0 0 5 13.6667">
              <path d={svgPaths.p37e69780} fill="white" />
            </svg>
          </div>
        </div>

        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: "white", whiteSpace: "nowrap", lineHeight: "20px" }}>
          Swap
        </span>

        <div style={{ width: 1, height: 14, backgroundColor: "rgba(248,248,249,0.3)", flexShrink: 0 }} />

        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, color: "rgba(248,248,249,0.9)", lineHeight: "20px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          Take specific frames from other campaigns for a set period.
        </span>
      </div>

      <button
        onClick={onCancel}
        style={{
          flexShrink: 0,
          height: 24,
          padding: "0 8px",
          borderRadius: 4,
          backgroundColor: "#15115e",
          border: "none",
          outline: "none",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "#f4f5ff",
          lineHeight: "20px",
          boxShadow: "0px 2px 1.5px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1570")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#15115e")}
      >
        Cancel swap
      </button>
    </div>
  );
}
