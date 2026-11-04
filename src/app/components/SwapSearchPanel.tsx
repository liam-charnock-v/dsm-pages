import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import svgSearch from "../../imports/Group1739327682/svg-ot52x6f1yq";
import svgFrame from "../../imports/MultiFrameStates/svg-5xrpxposjg";
import { DateRangePicker, DateRange } from "./DateRangePicker";

/* ── mock data ───────────────────────────────────────────────────── */
const FRAME_RESULTS = [
  { type: "frame" as const, label: "GB-LON-OX-00123.D1.01", location: "Oxford Street, London",     lat: 51.5154, lng: -0.1415 },
  { type: "frame" as const, label: "GB-LON-PC-00456.D2.02", location: "Piccadilly Circus, London", lat: 51.5099, lng: -0.1337 },
  { type: "frame" as const, label: "GB-LON-KC-00789.D1.01", location: "Kings Cross, London",       lat: 51.5308, lng: -0.1238 },
  { type: "frame" as const, label: "GB-LON-SB-00321.D1.01", location: "Southbank, London",         lat: 51.5074, lng: -0.1193 },
  { type: "frame" as const, label: "GB-LON-CS-00512.D2.01", location: "Canary Wharf, London",      lat: 51.5055, lng: -0.0235 },
  { type: "frame" as const, label: "GB-LON-CT-00634.D1.02", location: "Covent Garden, London",     lat: 51.5129, lng: -0.1243 },
  { type: "frame" as const, label: "GB-LON-BG-00847.D2.01", location: "Borough Market, London",    lat: 51.5055, lng: -0.0910 },
];

const LOCATION_RESULTS = [
  { type: "location" as const, label: "Oxford Street, London W1C 1JN",     lat: 51.5154, lng: -0.1415 },
  { type: "location" as const, label: "Piccadilly Circus, London W1J 9HS", lat: 51.5099, lng: -0.1337 },
  { type: "location" as const, label: "Kings Cross, London N1C 4AB",       lat: 51.5308, lng: -0.1238 },
  { type: "location" as const, label: "Canary Wharf, London E14 5AB",      lat: 51.5055, lng: -0.0235 },
];

const ALL_RESULTS = [...FRAME_RESULTS, ...LOCATION_RESULTS];

const SUGGESTED_FRAMES = [
  { id: "GB-LON-OX-00123.D1.01", match: 98, city: "London, UK", address: "Oxford Street, 234, W1C 1JN",     lat: 51.5154, lng: -0.1415, campaign: "Summer Brand Awareness 2026",   campaignCode: "SB1D176565", impressions: "6,281", format: "48 Sheet",  frameSize: "12192×3048mm", mediaType: "Digital",  advertiser: "Coca-Cola" },
  { id: "GB-LON-PC-00456.D2.02", match: 94, city: "London, UK", address: "Piccadilly Circus, 12, W1J 9HS",  lat: 51.5099, lng: -0.1337, campaign: null,                            campaignCode: null,        impressions: "5,940", format: "D6",        frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Nike" },
  { id: "GB-LON-KC-00789.D1.01", match: 87, city: "London, UK", address: "Kings Cross, 45, N1C 4AB",        lat: 51.5308, lng: -0.1238, campaign: "Kings Cross Retail Push Q3",   campaignCode: "KC3R284891", impressions: "7,102", format: "6-Sheet",   frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "H&M" },
  { id: "GB-LON-SB-00321.D1.01", match: 82, city: "London, UK", address: "Southbank, 78, SE1 9PP",          lat: 51.5074, lng: -0.1193, campaign: null,                            campaignCode: null,        impressions: "5,480", format: "D6",        frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Netflix" },
];

// Replacement frames offered to donor campaigns
const REPLACEMENT_POOL: Record<string, ReplacementFrame[]> = {
  default: [
    { id: "GB-LON-NB-00991.D1.01", address: "Notting Hill Gate, 45, W11 3HQ", city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Adidas",  impressions: "5,420", distanceM: 320, match: 94, campaign: "Adidas Run for It 2026",     campaignCode: "AR2I556677", tags: ["Local", "High Traffic"] },
    { id: "GB-LON-HS-00654.D2.01", address: "High St Kensington, 12, W8 4PT", city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "Zara",    impressions: "6,150", distanceM: 450, match: 91, campaign: null,                          campaignCode: null,         tags: ["Premium", "Local"] },
    { id: "GB-LON-MP-00823.D1.02", address: "Marble Arch, 8, W1H 7EJ",        city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Apple",   impressions: "7,280", distanceM: 680, match: 88, campaign: "Apple Watch Series 12",      campaignCode: "AW1S234567", tags: ["Premium", "National"] },
  ],
  alternatives: [
    { id: "GB-LON-VX-01012.D1.01", address: "Victoria Station, 3, SW1V 1JU",  city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Amazon",  impressions: "8,140", distanceM: 900,  match: 85, campaign: "Amazon Prime Day 2026",      campaignCode: "AP2D334455", tags: ["High Traffic", "Transport Hub"] },
    { id: "GB-LON-WM-00731.D2.02", address: "Westminster, 22, SW1A 0AA",      city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "HSBC",    impressions: "5,680", distanceM: 540,  match: 83, campaign: "HSBC Global Campaign 2026",  campaignCode: "HG2C119034", tags: ["Premium", "National"] },
    { id: "GB-LON-LD-00442.D1.01", address: "London Bridge, 1, SE1 9BG",      city: "London, UK", format: "48 Sheet", frameSize: "12192×3048mm", mediaType: "Classic",  advertiser: "Barclays",impressions: "6,920", distanceM: 1100, match: 80, campaign: "Barclays Open Banking Push", campaignCode: "BO2B445678", tags: ["National", "High Traffic"] },
  ],
};

/* ── bulk upload mock data ───────────────────────────────────────── */
interface BulkFrame {
  id: string; address: string; city: string;
  format: string; frameSize: string; mediaType: string; advertiser: string;
}

const BULK_UPLOAD_FRAMES: BulkFrame[] = [
  { id: "GB-LON-BG-00847.D2.01", address: "Borough Market, 2, SE1 1TL",          city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Spotify"  },
  { id: "GB-LON-SH-00334.D1.01", address: "Shoreditch High St, 156, E1 6JE",     city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "H&M"      },
  { id: "GB-LON-EC-00221.D2.01", address: "Angel Islington, 34, EC1V 9LT",       city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Amazon"   },
  { id: "GB-LON-ST-00569.D1.02", address: "Stratford Westfield, 5, E20 1EJ",     city: "London, UK", format: "48 Sheet", frameSize: "12192×3048mm", mediaType: "Classic",  advertiser: "Samsung"  },
  { id: "GB-LON-CX-00712.D1.01", address: "Chelsea, 88, SW3 4LY",                city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Rolex"    },
  { id: "GB-LON-SE-00490.D2.02", address: "London Bridge, 76, SE1 7PB",          city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Netflix"  },
  { id: "GB-LON-IS-00385.D1.01", address: "Islington Upper St, 42, N1 2XH",      city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "Zara"     },
  { id: "GB-LON-HM-00674.D1.02", address: "Hammersmith Broadway, 9, W6 8DL",     city: "London, UK", format: "48 Sheet", frameSize: "12192×3048mm", mediaType: "Digital",  advertiser: "Apple"    },
];

const BULK_REPLACEMENT_POOL: ReplacementFrame[] = [
  { id: "GB-LON-WC-00341.D1.01", address: "Waterloo Station, 1, SE1 8SW",        city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Spotify",  impressions: "9,120", distanceM: 280,  match: 93, campaign: "Spotify Summer Hits 2026",      campaignCode: "SS2H891023", tags: ["High Traffic", "Transport Hub"] },
  { id: "GB-LON-PD-00582.D2.01", address: "Paddington Station, 4, W2 1HB",       city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Apple",    impressions: "7,640", distanceM: 410,  match: 90, campaign: "Apple Watch Series 12",         campaignCode: "AW1S234567", tags: ["Premium", "Transport Hub"] },
  { id: "GB-LON-EL-00887.D1.01", address: "Elephant & Castle, 32, SE1 6TG",      city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "H&M",      impressions: "5,890", distanceM: 560,  match: 87, campaign: null,                            campaignCode: null,         tags: ["Local"] },
  { id: "GB-LON-BW-00943.D1.02", address: "Brixton, 114, SW2 1JF",               city: "London, UK", format: "48 Sheet", frameSize: "12192×3048mm", mediaType: "Classic",  advertiser: "Samsung",  impressions: "6,410", distanceM: 720,  match: 84, campaign: "Samsung Galaxy S26 Launch",     campaignCode: "SG2L774412", tags: ["National", "High Traffic"] },
  { id: "GB-LON-CW-00256.D2.01", address: "Clapham Common, 67, SW4 7AA",         city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Netflix",  impressions: "5,240", distanceM: 380,  match: 89, campaign: "Netflix Q3 Originals",          campaignCode: "NF3O556231", tags: ["Local"] },
  { id: "GB-LON-FP-00764.D1.01", address: "Finsbury Park, 23, N4 2PN",           city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Adidas",   impressions: "4,970", distanceM: 490,  match: 82, campaign: null,                            campaignCode: null,         tags: ["Local"] },
  { id: "GB-LON-LB-00193.D2.02", address: "Liverpool Street, 7, EC2M 7PN",       city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "HSBC",     impressions: "8,340", distanceM: 330,  match: 91, campaign: "HSBC Global Campaign 2026",     campaignCode: "HG2C119034", tags: ["Premium", "National", "High Traffic"] },
  { id: "GB-LON-EW-00429.D1.02", address: "Ealing Broadway, 12, W5 2NU",         city: "London, UK", format: "48 Sheet", frameSize: "12192×3048mm", mediaType: "Classic",  advertiser: "Barclays", impressions: "6,970", distanceM: 650,  match: 85, campaign: "Barclays Open Banking Push",    campaignCode: "BO2B445678", tags: ["National"] },
  { id: "GB-LON-CR-00816.D1.01", address: "Croydon East, 45, CR0 1LP",           city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "Zara",     impressions: "4,580", distanceM: 820,  match: 79, campaign: null,                            campaignCode: null,         tags: ["Local"] },
  { id: "GB-LON-HT-00614.D1.01", address: "Heathrow Terminal 5, TW6 2GA",        city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Rolex",    impressions: "11,240", distanceM: 1100, match: 76, campaign: "Rolex Perpetual 2026",          campaignCode: "RP2A667890", tags: ["Premium", "Airport"] },
  { id: "GB-LON-HT-00615.D1.02", address: "Heathrow Terminal 2, TW6 1EW",        city: "London, UK", format: "48 Sheet", frameSize: "12192×3048mm", mediaType: "Digital",  advertiser: "LVMH",     impressions: "10,880", distanceM: 1200, match: 74, campaign: "LVMH Prestige Q3",             campaignCode: "LV3P223344", tags: ["Premium", "Airport", "National"] },
  { id: "GB-LON-VX-01012.D1.01", address: "Victoria Station, 3, SW1V 1JU",       city: "London, UK", format: "6-Sheet",  frameSize: "1800×1200mm",  mediaType: "Digital",  advertiser: "Amazon",   impressions: "8,140", distanceM: 900,  match: 88, campaign: "Amazon Prime Day 2026",         campaignCode: "AP2D334455", tags: ["High Traffic", "Transport Hub", "National"] },
  { id: "GB-LON-WM-00731.D2.02", address: "Westminster, 22, SW1A 0AA",           city: "London, UK", format: "D6",       frameSize: "1800×1200mm",  mediaType: "Classic",  advertiser: "Nike",     impressions: "5,680", distanceM: 540,  match: 83, campaign: null,                            campaignCode: null,         tags: ["Premium", "National"] },
  { id: "GB-LON-LD-00442.D1.01", address: "London Bridge, 1, SE1 9BG",           city: "London, UK", format: "48 Sheet", frameSize: "12192×3048mm", mediaType: "Classic",  advertiser: "Coca-Cola",impressions: "6,920", distanceM: 1100, match: 80, campaign: "Coca-Cola Taste the Feeling",   campaignCode: "CC2T778899", tags: ["National", "High Traffic"] },
];

/* ── types ───────────────────────────────────────────────────────── */
type SearchResult = typeof ALL_RESULTS[number];
type SwapTab = "suggested" | "find" | "bulk";
type SwapStep = "schedule" | "discover" | "replacements";

interface CandidateFrame {
  id: string;
  address: string;
  city: string;
  campaign: string | null;
  campaignCode?: string | null;
  format?: string;
  frameSize?: string;
  mediaType?: string;
  advertiser?: string;
  impressions?: string;
}

interface ReplacementFrame {
  id: string;
  address: string;
  city: string;
  format: string;
  frameSize: string;
  mediaType: string;
  advertiser: string;
  impressions: string;
  distanceM: number;
  match: number;
  tags?: string[];
  campaign?: string | null;
  campaignCode?: string | null;
}

/* ── icons ───────────────────────────────────────────────────────── */
function SearchIcon({ fill = "#42414E" }: { fill?: string }) {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 16, height: 16, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "9.29% 9.37% 9.37% 9.29%" }}>
        <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 16.2676 16.2676">
          <path d={svgSearch.p397dcfc0} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

function FrameIconSmall({ fill = "#7C7B87" }: { fill?: string }) {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 14, height: 14, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "6.25% 21.88%" }}>
        <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
          <path d={svgFrame.p789d080} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

function PinIconSmall({ fill = "#7C7B87" }: { fill?: string }) {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 14, height: 14, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "6.25% 15.63%" }}>
        <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 11 13.9999">
          <path d={svgFrame.p47f0f00} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

function MonitorIcon({ fill = "#7C7B87" }: { fill?: string }) {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 14, height: 14, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "15.63% 9.38%" }}>
        <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 13 11">
          <path d={svgFrame.p2c84cc00} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

function CalendarIcon({ fill = "#7C7B87" }: { fill?: string }) {
  return (
    <div style={{ position: "relative", flexShrink: 0, width: 16, height: 16, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "6.25% 12.5% 12.5% 12.5%" }}>
        <svg style={{ position: "absolute", display: "block", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
          <path d={svgSearch.p3f356000} fill={fill} />
        </svg>
      </div>
    </div>
  );
}

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="#2c24c3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── search dropdown via portal ──────────────────────────────────── */
function SearchDropdown({ anchorRect, results, onSelectFrame, onSelectLocation, onClose }: {
  anchorRect: DOMRect;
  results: SearchResult[];
  onSelectFrame: (item: SearchResult) => void;
  onSelectLocation: (item: SearchResult) => void;
  onClose: () => void;
}) {
  const frameResults    = results.filter(r => r.type === "frame");
  const locationResults = results.filter(r => r.type === "location");

  return createPortal(
    <div style={{ position: "fixed", top: anchorRect.bottom, left: anchorRect.left, width: anchorRect.width, zIndex: 9999, backgroundColor: "#fff", borderRadius: "0 0 8px 8px", border: "1.5px solid #2c24c3", borderTop: "1px solid rgba(19,18,33,0.1)", boxShadow: "0px 4px 12px rgba(16,16,52,0.12)", paddingTop: 4, paddingBottom: 6 }}>
      {frameResults.length > 0 && (
        <>
          <div style={{ padding: "2px 10px 2px" }}>
            <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.06em", fontWeight: 500 }}>Frames</span>
          </div>
          {frameResults.map((item, i) => (
            <button key={`frame-${i}`} onMouseDown={(e) => { e.preventDefault(); onSelectFrame(item); onClose(); }} style={{ display: "flex", alignItems: "flex-start", gap: 8, width: "100%", padding: "5px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(19,18,33,0.04)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
              <div style={{ marginTop: 3 }}><FrameIconSmall fill="#605F6B" /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontSize: 13, lineHeight: "20px", color: "#131221", fontFamily: "Inter, sans-serif" }}>{item.label}</span>
                {"location" in item && item.location && (
                  <span style={{ fontSize: 11, lineHeight: "16px", color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{item.location}</span>
                )}
              </div>
            </button>
          ))}
        </>
      )}
      {locationResults.length > 0 && (
        <>
          {frameResults.length > 0 && <div style={{ height: 1, backgroundColor: "rgba(19,18,33,0.07)", margin: "4px 12px" }} />}
          <div style={{ padding: "4px 10px 2px" }}>
            <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.06em", fontWeight: 500 }}>Locations</span>
          </div>
          {locationResults.map((item, i) => (
            <button key={`loc-${i}`} onMouseDown={(e) => { e.preventDefault(); onSelectLocation(item); onClose(); }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "5px 12px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(19,18,33,0.04)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <PinIconSmall fill="#605F6B" />
                <span style={{ fontSize: 13, lineHeight: "20px", color: "#131221", fontFamily: "Inter, sans-serif" }}>{item.label}</span>
              </div>
              <span style={{ fontSize: 11, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500, flexShrink: 0, marginLeft: 8 }}>Navigate →</span>
            </button>
          ))}
        </>
      )}
    </div>,
    document.body
  );
}

/* ── search input ────────────────────────────────────────────────── */
function SearchInput({ value, onChange, results, onSelectFrame, onSelectLocation }: {
  value: string;
  onChange: (v: string) => void;
  results: SearchResult[];
  onSelectFrame: (item: SearchResult) => void;
  onSelectLocation: (item: SearchResult) => void;
}) {
  const [focused, setFocused] = useState(false);
  const inputRef   = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const showDropdown = focused && value.length > 0 && results.length > 0;

  useEffect(() => {
    if (showDropdown && wrapperRef.current) setAnchorRect(wrapperRef.current.getBoundingClientRect());
  }, [showDropdown, value]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setFocused(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <div style={{ height: 36, borderRadius: 6, backgroundColor: "#f8f8f9", border: focused ? "1.5px solid #2c24c3" : "1px solid rgba(19,18,33,0.1)", boxShadow: focused ? "none" : "0px 1px 2px 0px rgba(16,16,52,0.08)", display: "flex", alignItems: "center", gap: 4, padding: "0 12px" }}>
        <SearchIcon fill={value ? "#131221" : "#42414E"} />
        <input ref={inputRef} type="text" value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} placeholder="Search frame ID or location" style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", fontSize: 13, lineHeight: "20px", color: value ? "#131221" : "#7c7b87", fontFamily: "Inter, sans-serif" }} />
        {value && (
          <button onMouseDown={(e) => { e.preventDefault(); onChange(""); inputRef.current?.focus(); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "#7c7b87", fontSize: 18, lineHeight: 1 }}>×</button>
        )}
      </div>
      {showDropdown && anchorRect && (
        <SearchDropdown anchorRect={anchorRect} results={results} onSelectFrame={onSelectFrame} onSelectLocation={onSelectLocation} onClose={() => setFocused(false)} />
      )}
    </div>
  );
}

/* ── schedule tile ───────────────────────────────────────────────── */
function ScheduleTile({ dateRange, onOpenPicker }: { dateRange: DateRange | null; onOpenPicker: (rect: DOMRect) => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasDate   = !!(dateRange?.start && dateRange?.end);
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const label = hasDate && dateRange?.start && dateRange?.end ? `${fmt(dateRange.start)} – ${fmt(dateRange.end)}` : "";

  return (
    <div style={{ borderRadius: 6, backgroundColor: "#fff", border: hasDate ? "1.5px solid rgba(44,36,195,0.3)" : "1.5px solid rgba(19,18,33,0.15)", boxShadow: "0px 1px 3px rgba(16,16,52,0.06)", overflow: "hidden" }}>
      <button
        ref={buttonRef}
        onClick={() => buttonRef.current && onOpenPicker(buttonRef.current.getBoundingClientRect())}
        style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", height: 40, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <CalendarIcon fill={hasDate ? "#2c24c3" : "#7C7B87"} />
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "14px" }}>Schedule</span>
          <span style={{ fontSize: 13, fontWeight: hasDate ? 500 : 400, color: hasDate ? "#131221" : "#9e9daa", fontFamily: "Inter, sans-serif", lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {label || "Select date range"}
          </span>
        </div>
        {!hasDate && (
          <span style={{ fontSize: 11, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500, flexShrink: 0, backgroundColor: "rgba(44,36,195,0.08)", borderRadius: 99, padding: "2px 7px" }}>Required</span>
        )}
        {hasDate && (
          <span style={{ fontSize: 11, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500, flexShrink: 0, backgroundColor: "rgba(44,36,195,0.1)", borderRadius: 99, padding: "2px 7px" }}>Set ✓</span>
        )}
      </button>
    </div>
  );
}

/* ── selected candidate pill ─────────────────────────────────────── */
function CandidatePill({ frame, onClear }: { frame: CandidateFrame; onClear: () => void }) {
  return (
    <div style={{ backgroundColor: "rgba(44,36,195,0.06)", border: "1px solid rgba(44,36,195,0.2)", borderRadius: 6, padding: "8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <FrameIconSmall fill="#2c24c3" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#2c24c3", fontFamily: "Inter, sans-serif", lineHeight: "20px" }}>{frame.id}</span>
        </div>
        <button onClick={onClear} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c7b87", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
      </div>
      <div style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>
          {frame.address}
        </span>
        {(frame.advertiser || frame.format || frame.frameSize || frame.mediaType) && (
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 4 }}>
            {[
              { label: "Advertiser", value: frame.advertiser },
              { label: "Format", value: frame.format },
              { label: "Frame Size", value: frame.frameSize },
              { label: "Media Type", value: frame.mediaType },
            ].filter(m => m.value).map(({ label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 3, backgroundColor: "rgba(44,36,195,0.07)", borderRadius: 4, padding: "2px 6px" }}>
                <span style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{label}:</span>
                <span style={{ fontSize: 10, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ backgroundColor: frame.campaign ? "rgba(44,36,195,0.05)" : "rgba(19,18,33,0.04)", borderRadius: 4, padding: "4px 6px", display: "flex", flexDirection: "column" as const, gap: 2, alignSelf: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontWeight: 500 }}>From Campaign: </span>
            <span style={{ fontSize: 10, fontWeight: 500, color: frame.campaign ? "#131221" : "#9e9daa", fontFamily: "Inter, sans-serif" }}>
              {frame.campaign ?? "Unassigned"}
            </span>
          </div>
          {frame.campaignCode && (
            <span style={{ fontSize: 10, fontFamily: "Inter, sans-serif", color: "#2c24c3", backgroundColor: "rgba(44,36,195,0.08)", borderRadius: 3, padding: "1px 5px", alignSelf: "flex-start", letterSpacing: "0.04em", fontWeight: 600 }}>
              {frame.campaignCode}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── match chip + tooltip ────────────────────────────────────────── */
const MATCH_FACTORS = [
  {
    label: "Location",
    desc: "Proximity of the frame to the target area and audience geography",
  },
  {
    label: "Format",
    desc: "How closely the frame format matches — e.g. 6-Sheet, 48 Sheet, D6",
  },
  {
    label: "Frame size",
    desc: "Alignment of the physical panel dimensions to your original frame",
  },
];

function MatchChip({ match }: { match: number }) {
  const [hovered, setHovered] = useState(false);
  const [rect, setRect]       = useState<DOMRect | null>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter() {
    if (chipRef.current) setRect(chipRef.current.getBoundingClientRect());
    setHovered(true);
  }

  const tooltipW = 228;
  const tooltipEstH = 148;

  return (
    <>
      <div
        ref={chipRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "flex", alignItems: "center", backgroundColor: "rgba(44,36,195,0.07)", borderRadius: 999, padding: "1px 7px", flexShrink: 0, cursor: "default", userSelect: "none" as const }}
      >
        <span style={{ fontSize: 11, color: "#272199", fontFamily: "Inter, sans-serif", lineHeight: "18px", whiteSpace: "nowrap" as const }}>{match}% match</span>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ marginLeft: 4, flexShrink: 0 }}>
          <circle cx="5.5" cy="5.5" r="5" stroke="#7c7b87" strokeWidth="1" />
          <path d="M5.5 4.8v3M5.5 3.5v.5" stroke="#7c7b87" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {hovered && rect && createPortal(
        <div style={{
          position: "fixed",
          top: Math.max(8, rect.top - tooltipEstH - 8),
          left: Math.max(8, rect.right - tooltipW),
          width: tooltipW,
          zIndex: 9999,
          backgroundColor: "#fff",
          borderRadius: 8,
          border: "1px solid rgba(19,18,33,0.12)",
          boxShadow: "0 4px 16px rgba(16,16,52,0.14)",
          padding: "10px 12px",
          pointerEvents: "none",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#131221", fontFamily: "Inter, sans-serif", marginBottom: 6, letterSpacing: "0.01em" }}>Match score — {match}%</p>
          <p style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "15px", marginBottom: 8 }}>Calculated using three factors:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {MATCH_FACTORS.map(f => (
              <div key={f.label} style={{ display: "flex", gap: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#2c24c3", flexShrink: 0, marginTop: 4 }} />
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif" }}>{f.label}</span>
                  <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "15px", display: "block" }}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/* ── suggested frame card ────────────────────────────────────────── */
function SuggestedFrameCard({ frame, selected, hovered, onSelect, onMouseEnter, onMouseLeave }: {
  frame: typeof SUGGESTED_FRAMES[number];
  selected: boolean;
  hovered: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const highlight = hovered && !selected;
  return (
    <div
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        backgroundColor: selected ? "rgba(44,36,195,0.08)" : highlight ? "rgba(44,36,195,0.05)" : "#f2ebff",
        borderRadius: 8,
        border: selected ? "1.5px solid rgba(44,36,195,0.35)" : highlight ? "1.5px solid rgba(44,36,195,0.45)" : "1px solid rgba(19,18,33,0.1)",
        boxShadow: highlight ? "0 0 0 3px rgba(44,36,195,0.1)" : "none",
        padding: "12px 12px 10px",
        cursor: "pointer",
        transition: "border 0.15s, background-color 0.15s, box-shadow 0.15s",
      }}
    >
      {/* Row 1: frame ID + match chip */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "18px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{frame.id}</span>
        <MatchChip match={frame.match} />
      </div>
      {/* Row 2: location + address */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <PinIconSmall />
          <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "16px", whiteSpace: "nowrap" }}>{frame.city}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0 }}>
          <MonitorIcon />
          <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{frame.address}</span>
        </div>
      </div>
      {/* Row 3: metadata chips */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 4, marginBottom: 7 }}>
        {[
          { label: "Advertiser", value: frame.advertiser },
          { label: "Format", value: frame.format },
          { label: "Frame Size", value: frame.frameSize },
          { label: "Media Type", value: frame.mediaType },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 3, backgroundColor: "rgba(19,18,33,0.05)", borderRadius: 4, padding: "2px 6px" }}>
            <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{label}:</span>
            <span style={{ fontSize: 10, color: "#131221", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>
      {/* Row 4: From Campaign */}
      <div style={{ backgroundColor: frame.campaign ? "rgba(44,36,195,0.05)" : "rgba(19,18,33,0.04)", borderRadius: 5, padding: "5px 7px", display: "flex", flexDirection: "column" as const, gap: 2 }}>
        <span style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontWeight: 500 }}>From Campaign</span>
        <span style={{ fontSize: 11, fontWeight: frame.campaign ? 500 : 400, color: frame.campaign ? "#131221" : "#9e9daa", fontFamily: "Inter, sans-serif", lineHeight: "16px" }}>
          {frame.campaign ?? "Unassigned"}
        </span>
        {frame.campaignCode && (
          <span style={{ fontSize: 10, fontFamily: "Inter, sans-serif", color: "#2c24c3", backgroundColor: "rgba(44,36,195,0.08)", borderRadius: 3, padding: "1px 5px", alignSelf: "flex-start", letterSpacing: "0.04em", fontWeight: 600 }}>
            {frame.campaignCode}
          </span>
        )}
      </div>
      {/* Selected tick */}
      {selected && (
        <div style={{ position: "absolute", top: 8, right: 8, width: 16, height: 16, borderRadius: "50%", backgroundColor: "#2c24c3", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckIcon />
        </div>
      )}
    </div>
  );
}

/* ── replacement frame card ──────────────────────────────────────── */
function ReplacementCard({ frame, accepted, onAccept, onSelectReplacement }: {
  frame: ReplacementFrame;
  accepted: boolean;
  onAccept: () => void;
  onSelectReplacement: (frame: ReplacementFrame) => void;
}) {
  const [searchMode, setSearchMode]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState("");
  const [searchFilters, setSearchFilters] = useState<Record<string, Set<string>>>({});

  function toggleSearchFilter(filterId: string, opt: string) {
    setSearchFilters(prev => {
      const s = new Set(prev[filterId] ?? []);
      s.has(opt) ? s.delete(opt) : s.add(opt);
      return { ...prev, [filterId]: new Set(s) };
    });
  }
  function clearSearchFilter(filterId: string) {
    setSearchFilters(prev => ({ ...prev, [filterId]: new Set() }));
  }
  function exitSearch() { setSearchMode(false); setSearchQuery(""); setSearchFilters({}); }

  const searchResults = BULK_REPLACEMENT_POOL.filter(f => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const campaignMatch = f.campaign?.toLowerCase().includes(q) || f.campaignCode?.toLowerCase().includes(q) || f.advertiser.toLowerCase().includes(q);
      if (!f.id.toLowerCase().includes(q) && !f.address.toLowerCase().includes(q) && !campaignMatch) return false;
    }
    for (const [fid, opts] of Object.entries(searchFilters)) {
      if (opts.size === 0) continue;
      if (fid === "format"    && !opts.has(f.format))    return false;
      if (fid === "mediaType" && !opts.has(f.mediaType)) return false;
      if (fid === "frameSize" && !opts.has(f.frameSize)) return false;
      if (fid === "tags"      && !f.tags?.some(t => opts.has(t))) return false;
    }
    return true;
  }).slice(0, 8);

  const distLabel = frame.distanceM >= 1000 ? `${(frame.distanceM / 1000).toFixed(1)}km` : `${frame.distanceM}m`;

  /* ── Search mode ── */
  if (searchMode) {
    return (
      <div style={{ backgroundColor: "#fff", border: "1.5px solid rgba(44,36,195,0.25)", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Find replacement</span>
          <button onClick={exitSearch} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", fontWeight: 500, padding: 0 }}>Cancel</button>
        </div>
        {/* Replacing indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 7px", backgroundColor: "rgba(19,18,33,0.04)", borderRadius: 5 }}>
          <FrameIconSmall fill="#7c7b87" />
          <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>Replacing:</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{frame.id}</span>
        </div>
        {/* Search input */}
        <div style={{ height: 32, borderRadius: 5, backgroundColor: "#f8f8f9", border: "1px solid rgba(19,18,33,0.1)", display: "flex", alignItems: "center", gap: 6, padding: "0 8px" }}>
          <SearchIcon fill="#7c7b87" />
          <input
            autoFocus
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search frame ID or location"
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 12, color: "#131221", fontFamily: "Inter, sans-serif" }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c7b87", fontSize: 17, lineHeight: 1, padding: 0 }}>×</button>
          )}
        </div>
        {/* Filters — same set as Find a frame tab */}
        <FilterBar filters={searchFilters} onToggle={toggleSearchFilter} onClear={clearSearchFilter} />
        {/* Divider + results count */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ flex: 1, height: 1, backgroundColor: "rgba(19,18,33,0.07)" }} />
          <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif", flexShrink: 0 }}>{searchResults.length} result{searchResults.length !== 1 ? "s" : ""}</span>
          <div style={{ flex: 1, height: 1, backgroundColor: "rgba(19,18,33,0.07)" }} />
        </div>
        {/* Results */}
        {searchResults.length === 0 ? (
          <div style={{ padding: "10px 0", textAlign: "center" as const }}>
            <span style={{ fontSize: 11, color: "#9e9daa", fontFamily: "Inter, sans-serif" }}>No frames match your search</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
            {searchResults.map(result => {
              const dL = result.distanceM >= 1000 ? `${(result.distanceM / 1000).toFixed(1)}km` : `${result.distanceM}m`;
              return (
                <button
                  key={result.id}
                  onClick={() => { onSelectReplacement(result); exitSearch(); }}
                  style={{ display: "flex", flexDirection: "column" as const, gap: 4, padding: "8px 10px", borderRadius: 6, border: "1px solid rgba(19,18,33,0.1)", backgroundColor: "#fafaf9", cursor: "pointer", textAlign: "left" as const, width: "100%", transition: "all 0.12s" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(44,36,195,0.04)"; e.currentTarget.style.borderColor = "rgba(44,36,195,0.28)"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fafaf9"; e.currentTarget.style.borderColor = "rgba(19,18,33,0.1)"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                      <FrameIconSmall fill="#2c24c3" />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#2c24c3", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{result.id}</span>
                    </div>
                    <MatchChip match={result.match} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 19 }}>
                    <PinIconSmall />
                    <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{result.address}</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, paddingLeft: 19, flexWrap: "wrap" as const }}>
                    {[result.format, result.mediaType, result.frameSize].map((v, i) => (
                      <span key={i} style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", backgroundColor: "rgba(19,18,33,0.05)", borderRadius: 3, padding: "1px 5px" }}>{v}</span>
                    ))}
                    {result.tags?.slice(0, 2).map(tag => (
                      <span key={tag} style={{ fontSize: 10, color: "#5b8def", fontFamily: "Inter, sans-serif", backgroundColor: "rgba(91,141,239,0.1)", borderRadius: 3, padding: "1px 5px" }}>{tag}</span>
                    ))}
                    <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif" }}>~{dL} away</span>
                  </div>
                  {result.campaign && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, paddingLeft: 19, flexWrap: "wrap" as const }}>
                      <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif" }}>Campaign:</span>
                      <span style={{ fontSize: 10, fontWeight: 500, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{result.campaign}</span>
                      {result.campaignCode && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#2c24c3", backgroundColor: "rgba(44,36,195,0.08)", borderRadius: 3, padding: "1px 5px", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em" }}>{result.campaignCode}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* ── Normal card ── */
  return (
    <div style={{ backgroundColor: accepted ? "rgba(44,36,195,0.05)" : "#fff", border: accepted ? "1.5px solid rgba(44,36,195,0.3)" : "1px solid rgba(19,18,33,0.1)", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column" as const, gap: 8 }}>
      {/* Frame ID + match */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <FrameIconSmall fill={accepted ? "#2c24c3" : "#7c7b87"} />
          <span style={{ fontSize: 12, fontWeight: 600, color: accepted ? "#2c24c3" : "#131221", fontFamily: "Inter, sans-serif", lineHeight: "18px" }}>{frame.id}</span>
        </div>
        <MatchChip match={frame.match} />
      </div>
      {/* Address */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <PinIconSmall />
        <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{frame.address}</span>
      </div>
      {/* Metadata chips */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 4 }}>
        {[
          { label: "Advertiser", value: frame.advertiser },
          { label: "Format", value: frame.format },
          { label: "Frame Size", value: frame.frameSize },
          { label: "Media Type", value: frame.mediaType },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 3, backgroundColor: "rgba(19,18,33,0.05)", borderRadius: 4, padding: "2px 6px" }}>
            <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{label}:</span>
            <span style={{ fontSize: 10, color: "#131221", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>
      {/* Stats */}
      <div style={{ display: "flex", gap: 10 }}>
        <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>Impressions: <strong style={{ color: "#131221" }}>{frame.impressions}</strong></span>
        <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>~<strong style={{ color: "#131221" }}>{distLabel}</strong> away</span>
      </div>
      {/* Campaign */}
      {frame.campaign && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" as const }}>
          <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.04em", fontWeight: 500 }}>Campaign:</span>
          <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{frame.campaign}</span>
          {frame.campaignCode && (
            <span style={{ fontSize: 10, fontWeight: 700, color: "#2c24c3", backgroundColor: "rgba(44,36,195,0.1)", borderRadius: 3, padding: "1px 6px", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em" }}>{frame.campaignCode}</span>
          )}
        </div>
      )}
      {/* Actions */}
      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={onAccept}
          style={{ flex: 1, height: 28, borderRadius: 5, border: accepted ? "none" : "1px solid rgba(44,36,195,0.3)", backgroundColor: accepted ? "#2c24c3" : "transparent", color: accepted ? "#fff" : "#2c24c3", fontSize: 12, fontWeight: 500, fontFamily: "Inter, sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}
        >
          {accepted && <CheckIcon />}
          {accepted ? "Accepted" : "Accept"}
        </button>
        {!accepted && (
          <button
            onClick={() => setSearchMode(true)}
            style={{ height: 28, padding: "0 12px", borderRadius: 5, border: "1px solid rgba(19,18,33,0.15)", backgroundColor: "transparent", color: "#7c7b87", fontSize: 12, fontWeight: 500, fontFamily: "Inter, sans-serif", cursor: "pointer" }}
          >
            Change
          </button>
        )}
      </div>
    </div>
  );
}

/* ── small checkbox ─────────────────────────────────────────────── */
function SmallCheckbox({ checked, indeterminate = false }: { checked: boolean; indeterminate?: boolean }) {
  return (
    <div style={{ width: 14, height: 14, borderRadius: 3, border: checked || indeterminate ? "none" : "1.5px solid rgba(19,18,33,0.22)", backgroundColor: checked || indeterminate ? "#2c24c3" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.1s" }}>
      {checked && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      {!checked && indeterminate && <div style={{ width: 6, height: 2, backgroundColor: "#fff", borderRadius: 1 }} />}
    </div>
  );
}

/* ── bulk upload tab ─────────────────────────────────────────────── */
function BulkUploadTab({ frames, selected, uploading, fileName, onFileSelect, onReset, onToggle, onToggleAll }: {
  frames: BulkFrame[];
  selected: Set<string>;
  uploading: boolean;
  fileName: string | null;
  onFileSelect: (file: File) => void;
  onReset: () => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}) {
  const inputRef    = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const allSelected = frames.length > 0 && selected.size === frames.length;
  const someSelected = selected.size > 0 && !allSelected;

  if (uploading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "28px 8px" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(44,36,195,0.2)", borderTopColor: "#2c24c3", animation: "swapSpin 0.7s linear infinite" }} />
        <span style={{ fontSize: 12, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>Parsing frame list…</span>
      </div>
    );
  }

  if (frames.length === 0) {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFileSelect(f); }}
        onClick={() => inputRef.current?.click()}
        style={{ border: `1.5px dashed ${drag ? "#2c24c3" : "rgba(19,18,33,0.2)"}`, borderRadius: 8, padding: "24px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", backgroundColor: drag ? "rgba(44,36,195,0.04)" : "rgba(19,18,33,0.02)", transition: "all 0.15s" }}
      >
        <input ref={inputRef} type="file" accept=".csv,.txt,.xlsx" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) onFileSelect(f); e.target.value = ""; }} />
        <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(44,36,195,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 13V5M10 5L7 8M10 5L13 8" stroke="#2c24c3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16h12" stroke="#2c24c3" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 3 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif" }}>Upload a frame list</p>
          <p style={{ fontSize: 11, color: "#9e9daa", fontFamily: "Inter, sans-serif" }}>.csv, .txt or .xlsx · one frame ID per row</p>
        </div>
        <span style={{ fontSize: 11, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500, backgroundColor: "rgba(44,36,195,0.08)", borderRadius: 99, padding: "3px 12px" }}>Browse files</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {/* File pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(44,36,195,0.06)", border: "1px solid rgba(44,36,195,0.2)", borderRadius: 6, padding: "6px 10px" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="1" width="8.5" height="12" rx="1.5" stroke="#2c24c3" strokeWidth="1.2" />
          <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3" stroke="#2c24c3" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        <span style={{ flex: 1, fontSize: 12, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{fileName}</span>
        <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", flexShrink: 0 }}>{frames.length} frames</span>
        <button onClick={(e) => { e.stopPropagation(); onReset(); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c7b87", fontSize: 17, lineHeight: 1, padding: 0 }}>×</button>
      </div>

      {/* Select all row */}
      <button onClick={onToggleAll} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 2px", background: "none", border: "none", cursor: "pointer", textAlign: "left" as const, width: "100%" }}>
        <SmallCheckbox checked={allSelected} indeterminate={someSelected} />
        <span style={{ fontSize: 12, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif", flex: 1 }}>
          {allSelected ? "Deselect all" : `Select all (${frames.length})`}
        </span>
        {selected.size > 0 && (
          <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{selected.size} selected</span>
        )}
      </button>

      <div style={{ height: 1, backgroundColor: "rgba(19,18,33,0.08)" }} />

      {/* Frame rows */}
      {frames.map(f => {
        const checked = selected.has(f.id);
        return (
          <button key={f.id} onClick={() => onToggle(f.id)} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", borderRadius: 6, border: checked ? "1.5px solid rgba(44,36,195,0.3)" : "1px solid rgba(19,18,33,0.1)", backgroundColor: checked ? "rgba(44,36,195,0.05)" : "#fff", cursor: "pointer", textAlign: "left" as const, width: "100%", transition: "all 0.12s" }}>
            <div style={{ marginTop: 1 }}>
              <SmallCheckbox checked={checked} />
            </div>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: checked ? "#2c24c3" : "#131221", fontFamily: "Inter, sans-serif", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{f.id}</span>
              <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{f.address}</span>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" as const }}>
                {[f.format, f.mediaType, f.frameSize].map((v, i) => (
                  <span key={i} style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", backgroundColor: "rgba(19,18,33,0.05)", borderRadius: 3, padding: "1px 5px" }}>{v}</span>
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ── filter config ───────────────────────────────────────────────── */
const FILTER_CONFIG = [
  { id: "format",    label: "Format",     options: ["6-Sheet", "48 Sheet", "96 Sheet", "D6", "D48"] },
  { id: "mediaType", label: "Media Type", options: ["Digital", "Classic"] },
  { id: "frameSize", label: "Frame Size", options: ["600×400mm", "1800×1200mm", "3000×2000mm", "12192×3048mm"] },
  { id: "tags",      label: "Tags",       options: ["Local", "National", "Premium", "High Traffic", "Airport", "Transport Hub"] },
];

/* ── filter dropdown ─────────────────────────────────────────────── */
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

  const top  = Math.min(anchorRect.bottom + 4, window.innerHeight - (options.length * 32 + 56) - 8);
  const left = Math.min(anchorRect.left, window.innerWidth - 200 - 8);

  return createPortal(
    <div data-filter-id={filterId} style={{ position: "fixed", top, left, width: 192, zIndex: 9999, backgroundColor: "#fff", borderRadius: 8, border: "1px solid rgba(19,18,33,0.12)", boxShadow: "0 4px 16px rgba(16,16,52,0.14)", overflow: "hidden" }}>
      <div style={{ padding: "8px 10px 6px", borderBottom: "1px solid rgba(19,18,33,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{label}</span>
        {selected.size > 0 && (
          <button onClick={onClear} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500, padding: 0 }}>Clear</button>
        )}
      </div>
      <div style={{ padding: "4px 0" }}>
        {options.map(opt => {
          const active = selected.has(opt);
          return (
            <button key={opt} onClick={() => onToggle(opt)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" as const }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(19,18,33,0.04)")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
              <div style={{ width: 14, height: 14, borderRadius: 3, border: active ? "none" : "1.5px solid rgba(19,18,33,0.2)", backgroundColor: active ? "#2c24c3" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.1s" }}>
                {active && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span style={{ fontSize: 12, color: active ? "#131221" : "#42414e", fontFamily: "Inter, sans-serif", fontWeight: active ? 500 : 400 }}>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>,
    document.body
  );
}

/* ── filter bar ──────────────────────────────────────────────────── */
function FilterBar({ filters, onToggle, onClear }: {
  filters: Record<string, Set<string>>;
  onToggle: (filterId: string, opt: string) => void;
  onClear: (filterId: string) => void;
}) {
  const [openId, setOpenId]         = useState<string | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function handleClick(filterId: string) {
    if (openId === filterId) { setOpenId(null); setAnchorRect(null); return; }
    const rect = btnRefs.current[filterId]?.getBoundingClientRect() ?? null;
    setOpenId(filterId);
    setAnchorRect(rect);
  }

  const openConfig = FILTER_CONFIG.find(f => f.id === openId);

  return (
    <>
      <div style={{ display: "flex", gap: 4, overflowX: "auto" as const, paddingBottom: 2 }}>
        {FILTER_CONFIG.map(f => {
          const count   = filters[f.id]?.size ?? 0;
          const isOpen  = openId === f.id;
          const active  = count > 0;
          return (
            <button
              key={f.id}
              ref={(el) => { btnRefs.current[f.id] = el; }}
              onClick={() => handleClick(f.id)}
              style={{ display: "flex", alignItems: "center", gap: 4, height: 26, padding: "0 8px", borderRadius: 5, border: active || isOpen ? "1.5px solid rgba(44,36,195,0.35)" : "1px solid rgba(19,18,33,0.14)", backgroundColor: active ? "rgba(44,36,195,0.07)" : isOpen ? "rgba(19,18,33,0.04)" : "#f8f8f9", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" as const, transition: "all 0.12s" }}
            >
              <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? "#2c24c3" : "#42414e", fontFamily: "Inter, sans-serif" }}>{f.label}</span>
              {active ? (
                <span style={{ fontSize: 10, fontWeight: 600, color: "#fff", backgroundColor: "#2c24c3", borderRadius: 99, padding: "0 4px", minWidth: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 3.75L5 6.25L7.5 3.75" stroke={isOpen ? "#131221" : "#7c7b87"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
          onToggle={(opt) => onToggle(openId, opt)}
          onClear={() => onClear(openId)}
          onClose={() => { setOpenId(null); setAnchorRect(null); }}
        />
      )}
    </>
  );
}

/* ── step indicator ──────────────────────────────────────────────── */
function StepIndicator({ currentStep }: { currentStep: SwapStep }) {
  const steps = [
    { id: "schedule",     label: "Schedule" },
    { id: "discover",     label: "Discover" },
    { id: "replacements", label: "Replace" },
  ];
  const idx = steps.findIndex(s => s.id === currentStep);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "10px 12px 8px" }}>
      {steps.map((step, i) => {
        const done    = i < idx;
        const active  = i === idx;
        return (
          <div key={step.id} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 3, flexShrink: 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: done || active ? "#2c24c3" : "rgba(19,18,33,0.1)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.2s" }}>
                {done ? (
                  <CheckIcon />
                ) : (
                  <span style={{ fontSize: 10, fontWeight: 600, color: active ? "#fff" : "#9e9daa", fontFamily: "Inter, sans-serif" }}>{i + 1}</span>
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? "#2c24c3" : done ? "#2c24c3" : "#9e9daa", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap" as const }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1.5, backgroundColor: done ? "#2c24c3" : "rgba(19,18,33,0.1)", margin: "0 4px", marginBottom: 14, transition: "background-color 0.2s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── public component ────────────────────────────────────────────── */
interface SwapSearchPanelProps {
  selectedFrame?: string | null;
  onFrameSelect?: (frameId: string) => void;
  onFrameFocus?: (lat: number, lng: number) => void;
  onConfirmSwap?: () => void;
  onScheduleSet?: () => void;
  hoveredFrameId?: string | null;
  onFrameHover?: (id: string | null) => void;
}

export function SwapSearchPanel({ selectedFrame, onFrameSelect, onFrameFocus, onConfirmSwap, onScheduleSet, hoveredFrameId, onFrameHover }: SwapSearchPanelProps) {
  const [step, setStep]                 = useState<SwapStep>("schedule");
  const [dateRange, setDateRange]       = useState<DateRange | null>(null);
  const [datePickerAnchor, setDatePickerAnchor] = useState<DOMRect | null>(null);
  const [activeTab, setActiveTab]       = useState<SwapTab>("suggested");
  const [candidate, setCandidate]       = useState<CandidateFrame | null>(null);
  const [selectedSuggested, setSelectedSuggested] = useState<string | null>(null);

  // Find-a-frame tab
  const [findQuery, setFindQuery]       = useState("");
  const [findLocationHint, setFindLocationHint] = useState<string | null>(null);
  const [findSelection, setFindSelection] = useState<CandidateFrame | null>(null);
  const [findFilters, setFindFilters]   = useState<Record<string, Set<string>>>({});

  // Bulk upload tab
  const [bulkFrames, setBulkFrames]     = useState<BulkFrame[]>([]);
  const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set());
  const [bulkUploading, setBulkUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  // Bulk replacements (step 3 in bulk mode)
  const [bulkReplacements, setBulkReplacements] = useState<Record<string, ReplacementFrame[]>>({});
  const [bulkAccepted, setBulkAccepted] = useState<Record<string, Set<string>>>({});

  function toggleFindFilter(filterId: string, opt: string) {
    setFindFilters(prev => {
      const current = new Set(prev[filterId] ?? []);
      current.has(opt) ? current.delete(opt) : current.add(opt);
      return { ...prev, [filterId]: new Set(current) };
    });
  }
  function clearFindFilter(filterId: string) {
    setFindFilters(prev => ({ ...prev, [filterId]: new Set() }));
  }

  function handleFileSelect(file: File) {
    setBulkUploading(true);
    setUploadFileName(file.name);
    const delay = 1000 + Math.random() * 800;
    setTimeout(() => {
      setBulkFrames(BULK_UPLOAD_FRAMES);
      setBulkSelected(new Set(BULK_UPLOAD_FRAMES.map(f => f.id)));
      setBulkUploading(false);
    }, delay);
  }

  function handleBulkReset() {
    setBulkFrames([]);
    setBulkSelected(new Set());
    setUploadFileName(null);
  }

  function toggleBulkFrame(id: string) {
    setBulkSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAllBulkFrames() {
    if (bulkSelected.size === bulkFrames.length) {
      setBulkSelected(new Set());
    } else {
      setBulkSelected(new Set(bulkFrames.map(f => f.id)));
    }
  }

  function handleFindBulkReplacements() {
    if (bulkSelected.size === 0) return;
    setRepLoading(true);
    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
      const pool = BULK_REPLACEMENT_POOL;
      const reps: Record<string, ReplacementFrame[]> = {};
      const accs: Record<string, Set<string>> = {};
      [...bulkSelected].forEach((fid, i) => {
        const a = pool[(i * 2)     % pool.length];
        const b = pool[(i * 2 + 1) % pool.length];
        const r0 = { ...a, id: `${a.id}-${i}a` };
        const r1 = { ...b, id: `${b.id}-${i}b` };
        reps[fid] = [r0, r1];
        accs[fid] = new Set([r0.id]);
      });
      setBulkReplacements(reps);
      setBulkAccepted(accs);
      setRepLoading(false);
      setStep("replacements");
    }, delay);
  }

  function toggleBulkAccepted(acquiringId: string, repId: string) {
    setBulkAccepted(prev => {
      const current = new Set(prev[acquiringId] ?? []);
      current.has(repId) ? current.delete(repId) : current.add(repId);
      return { ...prev, [acquiringId]: new Set(current) };
    });
  }

  // Replacement step
  const [repLoading, setRepLoading] = useState(false);
  const [accepted, setAccepted]     = useState<Set<string>>(new Set());

  // Manual replacement search (single-mode)
  const [replaceQuery, setReplaceQuery]     = useState("");
  const [replaceFilters, setReplaceFilters] = useState<Record<string, Set<string>>>({});

  function toggleReplaceFilter(filterId: string, opt: string) {
    setReplaceFilters(prev => {
      const s = new Set(prev[filterId] ?? []);
      s.has(opt) ? s.delete(opt) : s.add(opt);
      return { ...prev, [filterId]: new Set(s) };
    });
  }
  function clearReplaceFilter(filterId: string) {
    setReplaceFilters(prev => ({ ...prev, [filterId]: new Set() }));
  }

  const replaceResults = BULK_REPLACEMENT_POOL.filter(f => {
    if (replaceQuery.trim()) {
      const q = replaceQuery.toLowerCase();
      const campaignMatch = f.campaign?.toLowerCase().includes(q) || f.campaignCode?.toLowerCase().includes(q) || f.advertiser.toLowerCase().includes(q);
      if (!f.id.toLowerCase().includes(q) && !f.address.toLowerCase().includes(q) && !campaignMatch) return false;
    }
    for (const [fid, opts] of Object.entries(replaceFilters)) {
      if (opts.size === 0) continue;
      if (fid === "format"    && !opts.has(f.format))    return false;
      if (fid === "mediaType" && !opts.has(f.mediaType)) return false;
      if (fid === "frameSize" && !opts.has(f.frameSize)) return false;
      if (fid === "tags"      && !f.tags?.some(t => opts.has(t))) return false;
    }
    return true;
  });

  const hasSchedule = !!(dateRange?.start && dateRange?.end);

  // Auto-advance to discover when schedule is set; notify parent to show map frames
  useEffect(() => {
    if (hasSchedule && step === "schedule") {
      setStep("discover");
      onScheduleSet?.();
    }
  }, [hasSchedule]);

  // Sync candidate when frame selected via map click
  const prevFrame = useRef(selectedFrame);
  if (prevFrame.current !== selectedFrame) {
    prevFrame.current = selectedFrame;
    if (selectedFrame && step === "discover") {
      const fr = FRAME_RESULTS.find(f => f.label === selectedFrame);
      const sg = SUGGESTED_FRAMES.find(f => f.id === selectedFrame);
      setCandidate({
        id: selectedFrame,
        address: sg?.address ?? fr?.location ?? "",
        city: sg?.city ?? "London, UK",
        campaign: sg?.campaign ?? null,
        campaignCode: sg?.campaignCode ?? null,
        format: sg?.format,
        frameSize: sg?.frameSize,
        mediaType: sg?.mediaType,
        advertiser: sg?.advertiser,
        impressions: sg?.impressions,
      });
      setSelectedSuggested(selectedFrame);
      setFindSelection(null);
    }
  }

  const findResults = findQuery.trim().length === 0
    ? []
    : ALL_RESULTS.filter(d => d.label.toLowerCase().includes(findQuery.toLowerCase())).slice(0, 8);

  function handleSuggestedSelect(frame: typeof SUGGESTED_FRAMES[number]) {
    const next = frame.id === selectedSuggested ? null : frame.id;
    setSelectedSuggested(next);
    setFindSelection(null);
    if (next) {
      onFrameFocus?.(frame.lat, frame.lng);
      setCandidate({ id: frame.id, address: frame.address, city: frame.city, campaign: frame.campaign, campaignCode: frame.campaignCode, format: frame.format, frameSize: frame.frameSize, mediaType: frame.mediaType, advertiser: frame.advertiser, impressions: frame.impressions });
    } else {
      setCandidate(null);
    }
  }

  function handleFindSelectFrame(item: SearchResult) {
    const fr = FRAME_RESULTS.find(f => f.label === item.label);
    const sg = SUGGESTED_FRAMES.find(f => f.id === item.label);
    setFindQuery(item.label);
    setFindLocationHint(null);
    setSelectedSuggested(null);
    const sel: CandidateFrame = { id: item.label, address: sg?.address ?? ("location" in item ? item.location ?? "" : ""), city: "London, UK", campaign: sg?.campaign ?? null };
    setFindSelection(sel);
    setCandidate(sel);
    if (fr) onFrameFocus?.(fr.lat, fr.lng);
  }

  function handleFindSelectLocation(item: SearchResult) {
    setFindLocationHint(item.label);
    setFindQuery("");
    setFindSelection(null);
    if ("lat" in item) onFrameFocus?.(item.lat, item.lng);
  }

  function handleFindReplacements() {
    if (!candidate) return;
    setRepLoading(true);
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      setAccepted(new Set());
      setReplaceQuery("");
      setReplaceFilters({});
      setRepLoading(false);
      setStep("replacements");
    }, delay);
  }

  const isBulkReplacement = Object.keys(bulkReplacements).length > 0;
  const canConfirm = isBulkReplacement
    ? Object.values(bulkAccepted).some(s => s.size > 0)
    : accepted.size > 0;

  return (
    <div className="absolute z-40" style={{ top: 56, left: 16, width: 357, pointerEvents: "auto", maxHeight: "calc(100% - 72px)", display: "flex", flexDirection: "column" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: 8, border: "1px solid rgba(19,18,33,0.1)", boxShadow: "0px 4px 12px rgba(16,16,52,0.1), 0px 1px 3px rgba(16,16,52,0.06)", display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>

        {/* Step indicator + optional back button */}
        <div style={{ borderBottom: "1px solid rgba(19,18,33,0.08)", flexShrink: 0 }}>
          {step === "replacements" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px" }}>
              <button onClick={() => { setStep("discover"); setAccepted(new Set()); setReplaceQuery(""); setReplaceFilters({}); setBulkReplacements({}); setBulkAccepted({}); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500 }}>
                <BackArrow /> Back
              </button>
              <div style={{ flex: 1, height: 1, backgroundColor: "rgba(19,18,33,0.08)" }} />
              <span style={{ fontSize: 12, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>Step 3 · Review</span>
            </div>
          ) : (
            <StepIndicator currentStep={step} />
          )}
        </div>

        {/* ─── STEP 1: Schedule ─────────────────────────────────── */}
        {step === "schedule" && (
          <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "20px", marginBottom: 2 }}>Define your schedule</p>
              <p style={{ fontSize: 12, color: "#7c7b87", fontFamily: "Inter, sans-serif", lineHeight: "18px" }}>Set the date range for the frames you want to acquire. Only valid swap candidates for this period will be shown.</p>
            </div>
            <ScheduleTile dateRange={dateRange} onOpenPicker={(rect) => setDatePickerAnchor(rect)} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", backgroundColor: "rgba(19,18,33,0.03)", borderRadius: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="6.5" stroke="#9e9daa" />
                <path d="M7 6v4M7 4.5v.5" stroke="#9e9daa" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 11, color: "#9e9daa", fontFamily: "Inter, sans-serif", lineHeight: "16px" }}>Frame discovery and replacement generation are locked until a schedule is defined.</span>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Discover ─────────────────────────────────── */}
        {step === "discover" && (
          <>
            <div style={{ overflowY: "auto", padding: 8, display: "flex", flexDirection: "column", gap: 6, minHeight: 0 }}>
              {/* Schedule summary (compact) */}
              <button onClick={() => { setStep("schedule"); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", backgroundColor: "rgba(44,36,195,0.05)", border: "1px solid rgba(44,36,195,0.15)", borderRadius: 6, cursor: "pointer", background: "none", textAlign: "left", width: "100%" }}>
                <CalendarIcon fill="#2c24c3" />
                <span style={{ fontSize: 12, color: "#2c24c3", fontFamily: "Inter, sans-serif", flex: 1 }}>
                  {dateRange?.start && dateRange?.end
                    ? `${dateRange.start.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${dateRange.end.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                    : ""}
                </span>
                <span style={{ fontSize: 11, color: "#2c24c3", fontFamily: "Inter, sans-serif" }}>Edit</span>
              </button>

              {/* Tabs */}
              <div style={{ display: "flex", backgroundColor: "rgba(19,18,33,0.05)", borderRadius: 6, padding: 3, gap: 2 }}>
                {([["suggested", "Suggested"], ["find", "Find a frame"], ["bulk", "Bulk upload"]] as [SwapTab, string][]).map(([tab, label]) => {
                  const isActive = activeTab === tab;
                  return (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, height: 28, borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, fontWeight: isActive ? 600 : 400, color: isActive ? "#131221" : "#7c7b87", backgroundColor: isActive ? "#ffffff" : "transparent", fontFamily: "Inter, sans-serif", boxShadow: isActive ? "0 1px 3px rgba(19,18,33,0.12)" : "none", transition: "all 0.15s", whiteSpace: "nowrap" as const, padding: "0 4px" }}>
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Suggested tab */}
              {activeTab === "suggested" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 2px 0" }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#7c7b87", fontFamily: "Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.07em" }}>Suggested frames</span>
                    <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{SUGGESTED_FRAMES.length} candidates</span>
                  </div>
                  {SUGGESTED_FRAMES.map(f => (
                    <SuggestedFrameCard
                      key={f.id}
                      frame={f}
                      selected={selectedSuggested === f.id}
                      hovered={hoveredFrameId === f.id}
                      onSelect={() => handleSuggestedSelect(f)}
                      onMouseEnter={() => onFrameHover?.(f.id)}
                      onMouseLeave={() => onFrameHover?.(null)}
                    />
                  ))}
                </div>
              )}

              {/* Find a frame tab */}
              {activeTab === "find" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <SearchInput
                    value={findQuery}
                    onChange={(v) => { setFindQuery(v); if (!v) { setFindSelection(null); setFindLocationHint(null); if (findSelection) setCandidate(null); } }}
                    results={findSelection ? [] : findResults}
                    onSelectFrame={handleFindSelectFrame}
                    onSelectLocation={handleFindSelectLocation}
                  />
                  <FilterBar filters={findFilters} onToggle={toggleFindFilter} onClear={clearFindFilter} />
                  {findLocationHint && !findSelection && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(44,36,195,0.05)", border: "1px solid rgba(44,36,195,0.15)", borderRadius: 6, padding: "6px 10px" }}>
                      <PinIconSmall fill="#2c24c3" />
                      <span style={{ flex: 1, fontSize: 12, color: "#2c24c3", fontFamily: "Inter, sans-serif", lineHeight: "18px" }}>
                        Navigated to <strong>{findLocationHint}</strong> — click a frame on the map
                      </span>
                      <button onClick={() => setFindLocationHint(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c7b87", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
                    </div>
                  )}
                  {findSelection && (
                    <div style={{ backgroundColor: "rgba(44,36,195,0.06)", border: "1px solid rgba(44,36,195,0.2)", borderRadius: 6, padding: "7px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                      <FrameIconSmall fill="#2c24c3" />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#2c24c3", fontFamily: "Inter, sans-serif", flex: 1 }}>{findSelection.id}</span>
                      <button onClick={() => { setFindSelection(null); setFindQuery(""); setCandidate(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c7b87", fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
                    </div>
                  )}
                  {!findSelection && !findLocationHint && findQuery.trim().length === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "16px 8px", color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>
                      <SearchIcon fill="#bbb" />
                      <span style={{ fontSize: 12, textAlign: "center", lineHeight: "18px" }}>Search by frame ID or location to find a specific candidate frame</span>
                    </div>
                  )}
                </div>
              )}

              {/* Bulk upload tab */}
              {activeTab === "bulk" && (
                <BulkUploadTab
                  frames={bulkFrames}
                  selected={bulkSelected}
                  uploading={bulkUploading}
                  fileName={uploadFileName}
                  onFileSelect={handleFileSelect}
                  onReset={handleBulkReset}
                  onToggle={toggleBulkFrame}
                  onToggleAll={toggleAllBulkFrames}
                />
              )}
            </div>

            {/* CTA footer — single or bulk */}
            {(candidate && activeTab !== "bulk") && (
              <div style={{ flexShrink: 0, borderTop: "1px solid rgba(19,18,33,0.08)", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 8, backgroundColor: "#fff" }}>
                <CandidatePill frame={candidate} onClear={() => { setCandidate(null); setSelectedSuggested(null); setFindSelection(null); onFrameSelect?.(""); }} />
                <button
                  onClick={handleFindReplacements}
                  disabled={repLoading}
                  style={{ width: "100%", height: 36, borderRadius: 6, backgroundColor: repLoading ? "rgba(44,36,195,0.5)" : "#2c24c3", border: "none", cursor: repLoading ? "default" : "pointer", fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: "Inter, sans-serif", lineHeight: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  {repLoading ? (
                    <>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "swapSpin 0.7s linear infinite" }} />
                      Generating replacements…
                    </>
                  ) : "Find replacements →"}
                </button>
              </div>
            )}

            {/* Bulk CTA footer */}
            {activeTab === "bulk" && bulkSelected.size > 0 && (
              <div style={{ flexShrink: 0, borderTop: "1px solid rgba(19,18,33,0.08)", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 8, backgroundColor: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(44,36,195,0.05)", border: "1px solid rgba(44,36,195,0.15)", borderRadius: 6, padding: "7px 10px" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: "#2c24c3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "Inter, sans-serif" }}>{bulkSelected.size}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#131221", fontFamily: "Inter, sans-serif", flex: 1 }}>
                    <strong>{bulkSelected.size}</strong> frame{bulkSelected.size !== 1 ? "s" : ""} selected for bulk swap
                  </span>
                  <button onClick={() => setBulkSelected(new Set())} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", padding: 0 }}>Clear</button>
                </div>
                <button
                  onClick={handleFindBulkReplacements}
                  disabled={repLoading}
                  style={{ width: "100%", height: 36, borderRadius: 6, backgroundColor: repLoading ? "rgba(44,36,195,0.5)" : "#2c24c3", border: "none", cursor: repLoading ? "default" : "pointer", fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: "Inter, sans-serif", lineHeight: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  {repLoading ? (
                    <>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "swapSpin 0.7s linear infinite" }} />
                      Generating replacements…
                    </>
                  ) : `Find replacements for ${bulkSelected.size} frame${bulkSelected.size !== 1 ? "s" : ""} →`}
                </button>
              </div>
            )}
          </>
        )}

        {/* ─── STEP 3: Review Replacements ──────────────────────── */}
        {step === "replacements" && (
          <>
            <div style={{ overflowY: "auto", flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>

              {/* ── BULK replacement mode ── */}
              {isBulkReplacement && (
                <>
                  {/* Bulk summary header */}
                  <div style={{ backgroundColor: "rgba(44,36,195,0.05)", border: "1px solid rgba(44,36,195,0.15)", borderRadius: 6, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: "#2c24c3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "Inter, sans-serif" }}>{Object.keys(bulkReplacements).length}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif" }}>Bulk swap — {Object.keys(bulkReplacements).length} frames acquiring</p>
                      <p style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>Accept or change replacements for each frame below</p>
                    </div>
                  </div>

                  {/* Groups per acquiring frame */}
                  {Object.entries(bulkReplacements).map(([acquiringId, reps], groupIdx) => {
                    const bulkFr = bulkFrames.find(f => f.id === acquiringId);
                    const groupAccepted = bulkAccepted[acquiringId] ?? new Set<string>();
                    return (
                      <div key={acquiringId} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {/* Acquiring frame header */}
                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", backgroundColor: "rgba(19,18,33,0.03)", borderRadius: 5, borderLeft: "3px solid #2c24c3" }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <FrameIconSmall fill="#2c24c3" />
                              <span style={{ fontSize: 11, fontWeight: 600, color: "#2c24c3", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{acquiringId}</span>
                            </div>
                            {bulkFr && (
                              <span style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", marginTop: 1, display: "block" }}>{bulkFr.address}</span>
                            )}
                          </div>
                          <span style={{ fontSize: 10, color: groupAccepted.size > 0 ? "#2c24c3" : "#9e9daa", fontFamily: "Inter, sans-serif", fontWeight: 500, flexShrink: 0 }}>
                            {groupAccepted.size}/{reps.length} accepted
                          </span>
                        </div>
                        {/* Replacement cards for this group */}
                        {reps.map(f => (
                          <ReplacementCard
                            key={f.id}
                            frame={f}
                            accepted={groupAccepted.has(f.id)}
                            onAccept={() => toggleBulkAccepted(acquiringId, f.id)}
                            onSelectReplacement={(newFrame) => setBulkReplacements(prev => ({ ...prev, [acquiringId]: prev[acquiringId].map(r => r.id === f.id ? newFrame : r) }))}
                          />
                        ))}
                        {groupIdx < Object.keys(bulkReplacements).length - 1 && (
                          <div style={{ height: 1, backgroundColor: "rgba(19,18,33,0.07)", margin: "2px 0" }} />
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {/* ── SINGLE replacement mode ── */}
              {!isBulkReplacement && (
                <>
                  {/* Acquiring / donor frame */}
                  {candidate && (
                    <div style={{ backgroundColor: "rgba(44,36,195,0.05)", border: "1px solid rgba(44,36,195,0.15)", borderRadius: 6, padding: "8px 10px", flexShrink: 0 }}>
                      <p style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500, marginBottom: 3 }}>Acquiring</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <FrameIconSmall fill="#2c24c3" />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#2c24c3", fontFamily: "Inter, sans-serif" }}>{candidate.id}</span>
                      </div>
                      <p style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", marginTop: 2 }}>{candidate.address}</p>
                      {candidate.campaign && (
                        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>Donor Campaign</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" as const }}>
                            <span style={{ fontSize: 12, fontWeight: 500, color: "#131221", fontFamily: "Inter, sans-serif" }}>{candidate.campaign}</span>
                            {candidate.campaignCode && (
                              <span style={{ fontSize: 11, fontWeight: 700, color: "#2c24c3", backgroundColor: "rgba(44,36,195,0.1)", borderRadius: 4, padding: "1px 7px", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em" }}>
                                {candidate.campaignCode}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Section header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Find replacement frame</span>
                    {accepted.size > 0 && (
                      <span style={{ fontSize: 11, color: "#2c24c3", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{accepted.size} selected</span>
                    )}
                  </div>

                  {/* Selected frames summary */}
                  {accepted.size > 0 && (
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, flexShrink: 0 }}>
                      {[...accepted].map(id => {
                        const f = BULK_REPLACEMENT_POOL.find(x => x.id === id);
                        return (
                          <div key={id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", backgroundColor: "rgba(44,36,195,0.06)", border: "1px solid rgba(44,36,195,0.2)", borderRadius: 5 }}>
                            <FrameIconSmall fill="#2c24c3" />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontSize: 11, fontWeight: 600, color: "#2c24c3", fontFamily: "Inter, sans-serif", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{id}</span>
                              {f && <span style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{f.address}</span>}
                            </div>
                            <button
                              onClick={() => setAccepted(prev => { const n = new Set(prev); n.delete(id); return n; })}
                              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1, color: "#9e9daa", padding: 0, flexShrink: 0 }}
                            >×</button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Search input */}
                  <div style={{ height: 34, borderRadius: 6, backgroundColor: "#f8f8f9", border: "1px solid rgba(19,18,33,0.1)", display: "flex", alignItems: "center", gap: 6, padding: "0 10px", flexShrink: 0 }}>
                    <SearchIcon fill="#7c7b87" />
                    <input
                      type="text"
                      value={replaceQuery}
                      onChange={e => setReplaceQuery(e.target.value)}
                      placeholder="Search by frame ID, location or advertiser"
                      style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 12, color: "#131221", fontFamily: "Inter, sans-serif" }}
                    />
                    {replaceQuery && (
                      <button onClick={() => setReplaceQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#7c7b87", fontSize: 17, lineHeight: 1, padding: 0 }}>×</button>
                    )}
                  </div>

                  {/* Filters — same as Find a frame tab */}
                  <div style={{ flexShrink: 0 }}>
                    <FilterBar filters={replaceFilters} onToggle={toggleReplaceFilter} onClear={clearReplaceFilter} />
                  </div>

                  {/* Results divider */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <div style={{ flex: 1, height: 1, backgroundColor: "rgba(19,18,33,0.07)" }} />
                    <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif", flexShrink: 0 }}>{replaceResults.length} result{replaceResults.length !== 1 ? "s" : ""}</span>
                    <div style={{ flex: 1, height: 1, backgroundColor: "rgba(19,18,33,0.07)" }} />
                  </div>

                  {/* Results list */}
                  {replaceResults.length === 0 ? (
                    <div style={{ padding: "16px 0", textAlign: "center" as const, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: "#9e9daa", fontFamily: "Inter, sans-serif" }}>No frames match your search</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
                      {replaceResults.map(f => {
                        const isSelected = accepted.has(f.id);
                        const dL = f.distanceM >= 1000 ? `${(f.distanceM / 1000).toFixed(1)}km` : `${f.distanceM}m`;
                        return (
                          <div
                            key={f.id}
                            onClick={() => setAccepted(prev => { const n = new Set(prev); n.has(f.id) ? n.delete(f.id) : n.add(f.id); return n; })}
                            style={{ padding: "8px 10px", borderRadius: 7, border: isSelected ? "1.5px solid rgba(44,36,195,0.4)" : "1px solid rgba(19,18,33,0.1)", backgroundColor: isSelected ? "rgba(44,36,195,0.04)" : "#fff", cursor: "pointer", display: "flex", flexDirection: "column" as const, gap: 5, transition: "all 0.12s" }}
                          >
                            {/* ID + match + checkbox */}
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <div style={{ width: 14, height: 14, borderRadius: 3, border: isSelected ? "none" : "1.5px solid rgba(19,18,33,0.22)", backgroundColor: isSelected ? "#2c24c3" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {isSelected && <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0, flex: 1 }}>
                                <FrameIconSmall fill={isSelected ? "#2c24c3" : "#7c7b87"} />
                                <span style={{ fontSize: 12, fontWeight: 600, color: isSelected ? "#2c24c3" : "#131221", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{f.id}</span>
                              </div>
                              <MatchChip match={f.match} />
                            </div>
                            {/* Address */}
                            <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 20 }}>
                              <PinIconSmall />
                              <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{f.address}</span>
                            </div>
                            {/* Metadata chips */}
                            <div style={{ display: "flex", gap: 4, paddingLeft: 20, flexWrap: "wrap" as const }}>
                              {[f.format, f.mediaType, f.frameSize].map((v, i) => (
                                <span key={i} style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif", backgroundColor: "rgba(19,18,33,0.05)", borderRadius: 3, padding: "1px 5px" }}>{v}</span>
                              ))}
                              {f.tags?.slice(0, 2).map(tag => (
                                <span key={tag} style={{ fontSize: 10, color: "#5b8def", fontFamily: "Inter, sans-serif", backgroundColor: "rgba(91,141,239,0.1)", borderRadius: 3, padding: "1px 5px" }}>{tag}</span>
                              ))}
                              <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif" }}>~{dL} away</span>
                            </div>
                            {/* Campaign row */}
                            {f.campaign && (
                              <div style={{ display: "flex", alignItems: "center", gap: 5, paddingLeft: 20, flexWrap: "wrap" as const }}>
                                <span style={{ fontSize: 10, color: "#9e9daa", fontFamily: "Inter, sans-serif", textTransform: "uppercase" as const, letterSpacing: "0.04em", fontWeight: 500 }}>Campaign:</span>
                                <span style={{ fontSize: 10, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{f.campaign}</span>
                                {f.campaignCode && (
                                  <span style={{ fontSize: 10, fontWeight: 700, color: "#2c24c3", backgroundColor: "rgba(44,36,195,0.08)", borderRadius: 3, padding: "1px 5px", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em" }}>{f.campaignCode}</span>
                                )}
                              </div>
                            )}
                            {/* Impressions + distance */}
                            <div style={{ display: "flex", gap: 10, paddingLeft: 20 }}>
                              <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>Impressions: <strong style={{ color: "#131221" }}>{f.impressions}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Confirm CTA */}
            <div style={{ flexShrink: 0, borderTop: "1px solid rgba(19,18,33,0.08)", padding: "10px 8px", backgroundColor: "#fff", display: "flex", flexDirection: "column", gap: 6 }}>
              {!canConfirm && (
                <p style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif", textAlign: "center", lineHeight: "16px" }}>
                  {isBulkReplacement ? "Accept at least one replacement across all frames to confirm" : "Select at least one replacement frame to confirm the swap"}
                </p>
              )}
              <button
                onClick={() => { if (canConfirm) onConfirmSwap?.(); }}
                style={{ width: "100%", height: 36, borderRadius: 6, backgroundColor: canConfirm ? "#2c24c3" : "rgba(19,18,33,0.1)", border: "none", cursor: canConfirm ? "pointer" : "default", fontSize: 13, fontWeight: 600, color: canConfirm ? "#fff" : "#9e9daa", fontFamily: "Inter, sans-serif", lineHeight: "20px", transition: "background-color 0.2s, color 0.2s" }}
              >
                {isBulkReplacement
                  ? `Confirm bulk swap (${Object.values(bulkAccepted).reduce((n, s) => n + s.size, 0)} accepted)`
                  : accepted.size > 0 ? `Confirm swap (${accepted.size} frame${accepted.size > 1 ? "s" : ""})` : "Confirm swap"
                }
              </button>
            </div>
          </>
        )}
      </div>

      {/* Date picker portal */}
      {datePickerAnchor && (
        <DateRangePicker
          value={dateRange ?? undefined}
          anchorRect={datePickerAnchor}
          onClose={() => setDatePickerAnchor(null)}
          onApply={(range) => { setDateRange(range); setDatePickerAnchor(null); }}
        />
      )}
    </div>
  );
}
