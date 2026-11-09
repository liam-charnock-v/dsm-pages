import { useState, useRef, useEffect } from "react";
import svgR from "../../imports/SearchFilter/svg-r3nrydamdj";
import svgX from "../../imports/SearchFilter-1/svg-x8q1bp8e0d";

/* ── mock search data ───────────────────────────── */
const SEARCH_DATA = [
  { type: "location", label: "Lg. Trindade Coelho, 1200-339 Lisbon" },
  { type: "location", label: "Rua Augusta, 1100-046 Lisbon" },
  { type: "location", label: "Gran Vía, 28013 Madrid" },
  { type: "location", label: "Puerta del Sol, 28013 Madrid" },
  { type: "location", label: "Paseo de la Castellana, 28046 Madrid" },
  { type: "location", label: "Glorieta de Atocha, 28012 Madrid" },
  { type: "frame",    label: "PT-LSB-AB-01521.D1.01" },
  { type: "frame",    label: "PT-PRT-DD-00080.D2.02" },
  { type: "frame",    label: "PT-AMD-CL-00846.F1.01" },
  { type: "frame",    label: "PT-AMD-CL-00846.F1.02" },
  { type: "frame",    label: "ES-MAD-GV-00118.D1.01" },
  { type: "frame",    label: "ES-MAD-GV-00119.D1.02" },
  { type: "frame",    label: "ES-MAD-PC-00301.D1.01" },
];

const FRAME_OPTIONS = ["Available Frames", "Booked Frames"];

/* ── icons ──────────────────────────────────────── */
function SearchIcon({ fill = "#42414E" }: { fill?: string }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: "9.29% 9.37% 9.37% 9.29%" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2676 16.2676">
          <path d={svgR.p397dcfc0} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: "34.37% 15.62% 28.12% 15.62%" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7507 7.50084">
          <path d={svgR.p1276f900} fill="#52515E" />
        </svg>
      </div>
    </div>
  );
}

function FrameIcon({ fill = "#42414E" }: { fill?: string }) {
  return (
    <div className="overflow-clip relative shrink-0" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: "6.25% 21.88%" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 17.5">
          <path d={svgR.p3ee33100} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

function LocationPinIcon() {
  return (
    <div className="drop-shadow-[0px_1px_1px_rgba(16,16,52,0.08)] overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
      <div className="absolute" style={{ inset: "6.25% 15.63%" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 13.9999">
          <path d={svgX.p47f0f00} fill="#605F6B" />
        </svg>
      </div>
    </div>
  );
}

function ResultFrameIcon() {
  return (
    <div className="drop-shadow-[0px_1px_1px_rgba(16,16,52,0.08)] overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
      <div className="absolute" style={{ inset: "6.25% 21.88%" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
          <path d={svgX.p789d080} fill="#605F6B" />
        </svg>
      </div>
    </div>
  );
}

/* ── search input with dropdown results ─────────── */
function SearchInput({
  value,
  onChange,
  onClear,
  results,
  onSelectResult,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  results: typeof SEARCH_DATA;
  onSelectResult: (item: (typeof SEARCH_DATA)[0]) => void;
}) {
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const showDropdown = focused && value.length > 0 && results.length > 0;

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ width: 328 }}>
      {/* Input field */}
      <div
        className="bg-white relative"
        style={{
          height: 36,
          borderRadius: showDropdown ? "6px 6px 0 0" : 6,
          border: focused ? "2px solid #2c24c3" : "1px solid rgba(19,18,33,0.1)",
          boxShadow: focused ? "none" : "0px 1px 2px 0px rgba(16,16,52,0.08)",
        }}
      >
        <div className="flex items-center justify-center overflow-clip size-full" style={{ borderRadius: "inherit", paddingLeft: 12, paddingRight: 8, gap: 4 }}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search for frames or locations"
            className="flex-1 min-w-0 bg-transparent border-none outline-none"
            style={{
              fontSize: 13,
              lineHeight: "20px",
              color: value ? "#131221" : "#7c7b87",
              fontFamily: "Inter, sans-serif",
            }}
          />
          <button
            className="flex items-center justify-center cursor-pointer bg-transparent border-none p-0 shrink-0"
            onClick={() => {
              if (value) {
                onClear();
              } else {
                inputRef.current?.focus();
              }
            }}
          >
            <SearchIcon fill={value ? "#131221" : "#42414E"} />
          </button>
        </div>
      </div>

      {/* Results dropdown */}
      {showDropdown && (
        <div
          className="absolute left-0 right-0 bg-white z-50"
          style={{
            top: "100%",
            borderRadius: "0 0 8px 8px",
            border: "2px solid #2c24c3",
            borderTop: "1px solid rgba(19,18,33,0.12)",
            boxShadow: "0px 3px 8px rgba(16,16,52,0.12)",
            paddingTop: 4,
            paddingBottom: 6,
          }}
        >
          <div className="px-[8px] py-[4px]">
            <span style={{ fontSize: 13, color: "#7c7b87", lineHeight: "20px", fontFamily: "Inter, sans-serif" }}>
              {results.length} result{results.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            {results.map((item, i) => (
              <button
                key={i}
                className="w-full text-left cursor-pointer bg-transparent border-none hover:bg-[rgba(19,18,33,0.04)] transition-colors"
                style={{ borderRadius: 3, padding: "4px 12px 4px 8px", height: 28 }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectResult(item);
                  setFocused(false);
                }}
              >
                <div className="flex items-center gap-[8px]">
                  {item.type === "location" ? <LocationPinIcon /> : <ResultFrameIcon />}
                  <span style={{ fontSize: 13, lineHeight: "20px", color: "#131221", fontFamily: "Inter, sans-serif" }}>
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── frame type dropdown ─────────────────────────── */
function FrameTypeDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ width: 328 }}>
      {/* Trigger */}
      <button
        className="w-full bg-white flex items-center cursor-pointer border-none"
        style={{
          height: 36,
          borderRadius: open ? "6px 6px 0 0" : 6,
          border: "1px solid rgba(19,18,33,0.1)",
          boxShadow: "0px 1px 2px 0px rgba(16,16,52,0.08), inset 0px -1px 0px 0px rgba(16,16,52,0.08)",
          paddingLeft: 12,
          paddingRight: 12,
          gap: 4,
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <FrameIcon />
        <span className="flex-1 min-w-0 text-left truncate" style={{ fontSize: 13, color: "#7c7b87", lineHeight: "20px", fontFamily: "Inter, sans-serif" }}>
          {value}
        </span>
        <div style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.18s ease" }}>
          <ChevronIcon />
        </div>
      </button>

      {/* Dropdown options */}
      {open && (
        <div
          className="absolute left-0 right-0 bg-white z-50"
          style={{
            top: "100%",
            borderRadius: "0 0 6px 6px",
            border: "1px solid rgba(19,18,33,0.15)",
            borderTop: "none",
            boxShadow: "0px 3px 8px rgba(16,16,52,0.1)",
          }}
        >
          {FRAME_OPTIONS.map((opt) => (
            <button
              key={opt}
              className="w-full text-left cursor-pointer border-none hover:bg-[rgba(19,18,33,0.04)] transition-colors"
              style={{
                padding: "8px 12px",
                fontSize: 13,
                lineHeight: "20px",
                color: opt === value ? "#2c24c3" : "#131221",
                fontWeight: opt === value ? 500 : 400,
                fontFamily: "Inter, sans-serif",
                background: opt === value ? "rgba(44,36,195,0.05)" : "transparent",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── public component ───────────────────────────── */
interface MapSearchFilterProps {
  frameFilter: string;
  onFrameFilterChange: (v: string) => void;
}

export function MapSearchFilter({ frameFilter, onFrameFilterChange }: MapSearchFilterProps) {
  const [query, setQuery] = useState("");

  const results = query.trim().length === 0
    ? []
    : SEARCH_DATA.filter((d) =>
        d.label.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);

  return (
    <div
      className="absolute top-4 left-4 z-40 flex gap-[8px] items-start"
      style={{ pointerEvents: "auto" }}
    >
      <SearchInput
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
        results={results}
        onSelectResult={(item) => setQuery(item.label)}
      />
      <FrameTypeDropdown value={frameFilter} onChange={onFrameFilterChange} />
    </div>
  );
}
