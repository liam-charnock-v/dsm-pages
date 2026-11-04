import React from "react";
import svgSingle from "../../imports/InfoContainer/svg-5lj6qgxpqp";
import svgMulti from "../../imports/InfoContainer-1/svg-hkjv9v1f7o";

/* ── shared icons ─────────────────────────────────── */
const CopyIcon = ({ svg }: { svg: typeof svgSingle }) => (
  <div className="overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
    <div className="absolute" style={{ inset: "8.33%" }}>
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.633 13.633">
        <path d={svg.p32328000} fill="#42414E" />
      </svg>
    </div>
  </div>
);

const CloseIcon = ({ svg }: { svg: typeof svgSingle }) => (
  <div className="overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
    <div className="absolute" style={{ inset: "18.75%" }}>
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2253 10.2253">
        <path d={svg.p3bdbe980} fill="#131221" />
      </svg>
    </div>
  </div>
);

const PlusIcon = ({ svg }: { svg: typeof svgMulti }) => (
  <div className="overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
    <div className="absolute" style={{ inset: "12.5%" }}>
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2697 12.2697">
        <path d={svg.pa72b600} fill="#605F6B" />
      </svg>
    </div>
  </div>
);

const AddIcon = ({ svg }: { svg: typeof svgMulti }) => (
  <div className="overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
    <div className="absolute" style={{ inset: "12.5%" }}>
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2697 12.2697">
        <path d={svg.p3330eb00} fill="#2C24C3" />
      </svg>
    </div>
  </div>
);

const PinIcon = ({ svg }: { svg: typeof svgSingle }) => (
  <div className="overflow-clip relative shrink-0" style={{ width: 16, height: 16 }}>
    <div className="absolute" style={{ inset: "3.13% 9.36% 6.03% 9.38%" }}>
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.2939 14.8615">
        <path d={svg.p15768200} fill="#131221" />
      </svg>
    </div>
  </div>
);

/* ── frame card for multi-frame list ──────────────── */
interface FrameItemProps {
  frameCode: string;
  format: string;
  availableSot: string;
  impressions: string;
  price: string;
}

function FrameItem({ frameCode, format, availableSot, impressions, price }: FrameItemProps) {
  return (
    <div className="bg-white relative rounded-[8px] w-full" style={{ border: "1.022px solid rgba(19,18,33,0.1)" }}>
      <div className="flex flex-col gap-[16px] items-center overflow-clip pt-[16px]" style={{ borderRadius: "inherit" }}>
        {/* Frame code + format */}
        <div className="w-full px-[16px]">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="font-semibold text-[#131221]" style={{ fontSize: 15, lineHeight: "18.4px" }}>{frameCode}</span>
            <div className="bg-[rgba(44,36,195,0.05)] flex items-center justify-center rounded-full" style={{ minWidth: 20, height: 20 }}>
              <div className="bg-[#272199] flex items-center px-[4px] rounded-full h-full">
                <span className="text-[#f9fafe] whitespace-nowrap" style={{ fontSize: 11 }}>Digital</span>
              </div>
            </div>
          </div>
          <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{format}</span>
        </div>

        {/* Stats */}
        <div className="flex gap-[40px] w-full px-[16px]">
          <div className="flex flex-col gap-[4px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Available SOT</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{availableSot}</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Impressions</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{impressions}</span>
          </div>
        </div>

        {/* CTA row */}
        <div className="w-full" style={{ borderTop: "1.022px solid rgba(19,18,33,0.1)" }}>
          <div className="flex items-center justify-between px-[16px]" style={{ height: 49 }}>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{price}</span>
            <div className="bg-[rgba(19,18,33,0.05)] flex items-center justify-center rounded-full">
              <button className="flex items-center justify-center cursor-pointer px-[8px] rounded-full" style={{ height: 24 }}>
                <PlusIcon svg={svgMulti} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── single-frame card ────────────────────────────── */
interface SingleFrameCardProps {
  onClose: () => void;
  locationCode?: string;
  address?: string;
  city?: string;
  frameCode?: string;
  format?: string;
  availableSot?: string;
  impressions?: string;
  price?: string;
}

function SingleFrameCard({
  onClose,
  locationCode = "ES-MAD-OX-00123",
  address = "Gran Vía, 12, 28013",
  city = "Madrid, ES",
  frameCode = "ES-MAD-OX-00123.D1.01",
  format = "48-Sheet",
  availableSot = "68.2%",
  impressions = "6,281",
  price = "€102.36",
}: SingleFrameCardProps) {
  return (
    <div className="bg-white relative" style={{ borderRadius: 12, width: 332, border: "1.022px solid rgba(19,18,33,0.1)", boxShadow: "0 4px 24px rgba(19,18,33,0.12)" }}>
      <div className="flex flex-col gap-[16px] items-start overflow-clip" style={{ borderRadius: "inherit" }}>
        {/* Header */}
        <div className="bg-[#f8f8f9] flex items-center justify-between overflow-clip px-[16px] py-[16px] w-full" style={{ borderRadius: "12px 12px 0 0" }}>
          <span className="font-semibold text-[#131221]" style={{ fontSize: 15 }}>{locationCode}</span>
          <button
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer bg-[rgba(19,18,33,0.05)] rounded-[6px]"
            style={{ width: 28, height: 28 }}
          >
            <CloseIcon svg={svgSingle} />
          </button>
        </div>

        {/* Location details */}
        <div className="flex items-start justify-between overflow-clip px-[16px] w-full">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[#131221]" style={{ fontSize: 13 }}>{address}</span>
            <span className="text-[#131221]" style={{ fontSize: 13 }}>{city}</span>
          </div>
          <div className="flex gap-[8px] items-center">
            <div className="bg-[rgba(19,18,33,0.05)] flex items-center justify-center rounded-[4px]" style={{ width: 24, height: 24 }}>
              <PinIcon svg={svgSingle} />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-[40px] px-[16px] w-full">
          <div className="flex flex-col gap-[4px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Available SOT</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{availableSot}</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Impressions</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{impressions}</span>
          </div>
        </div>

        {/* Frame code + format */}
        <div className="flex flex-col gap-[4px] px-[16px] w-full">
          <div className="flex flex-col gap-[2px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Frame Code</span>
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{frameCode}</span>
              <button className="flex items-center justify-center cursor-pointer rounded-[6px]" style={{ width: 28, height: 28 }}>
                <CopyIcon svg={svgSingle} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Format</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{format}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full" style={{ borderTop: "1.022px solid rgba(19,18,33,0.1)" }}>
          <div className="flex items-center justify-between px-[16px]" style={{ height: 49 }}>
            <span className="font-semibold text-[#131221]" style={{ fontSize: 15 }}>{price}</span>
            <div className="bg-[rgba(19,18,33,0.05)] flex items-center justify-center rounded-full">
              <button className="flex items-center justify-center cursor-pointer px-[8px] rounded-full" style={{ height: 24 }}>
                <PlusIcon svg={svgMulti} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── multi-frame card ─────────────────────────────── */
interface MultiFrameCardProps {
  onClose: () => void;
  locationCode?: string;
  locationName?: string;
  address?: string;
  city?: string;
  frameCount?: number;
  frames?: FrameItemProps[];
}

const DEFAULT_FRAMES: FrameItemProps[] = [
  { frameCode: "ES-MAD-OX-00123.D1.01", format: "48-Sheet", availableSot: "68.2%", impressions: "6,281", price: "€102.36" },
  { frameCode: "ES-MAD-OX-00123.D1.02", format: "48-Sheet", availableSot: "72.4%", impressions: "5,940", price: "€98.20" },
  { frameCode: "ES-MAD-OX-00123.D1.03", format: "6x3-BB_PL", availableSot: "61.8%", impressions: "7,102", price: "€115.50" },
];

function MultiFrameCard({
  onClose,
  locationCode = "ES-MAD-OX-00123",
  locationName = "Gran Vía",
  address = "Gran Vía, 12, 28013",
  city = "Madrid, ES",
  frameCount,
  frames = DEFAULT_FRAMES,
}: MultiFrameCardProps) {
  const count = frameCount ?? frames.length;

  return (
    <div
      className="bg-white relative flex flex-col"
      style={{ borderRadius: 12, width: 332, border: "1.022px solid rgba(19,18,33,0.1)", boxShadow: "0 4px 24px rgba(19,18,33,0.12)", maxHeight: "80vh" }}
    >
      {/* Header */}
      <div className="bg-[#f8f8f9] flex items-center justify-between overflow-clip px-[16px] py-[16px] shrink-0" style={{ borderRadius: "12px 12px 0 0" }}>
        <span className="font-semibold text-[#131221]" style={{ fontSize: 15 }}>{locationCode}</span>
        <button
          onClick={onClose}
          className="flex items-center justify-center cursor-pointer bg-[rgba(19,18,33,0.05)] rounded-[6px]"
          style={{ width: 28, height: 28 }}
        >
          <CloseIcon svg={svgMulti} />
        </button>
      </div>

      {/* Location + frame count badge */}
      <div className="flex items-start gap-[5px] overflow-clip px-[16px] py-[16px] shrink-0">
        <div className="flex flex-col gap-[4px] flex-1">
          <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{locationName}</span>
          <span className="text-[#131221]" style={{ fontSize: 13 }}>{address}</span>
          <span className="text-[#131221]" style={{ fontSize: 13 }}>{city}</span>
        </div>
        <div className="bg-[rgba(19,18,33,0.05)] flex items-center justify-center rounded-full shrink-0" style={{ minWidth: 20, height: 20 }}>
          <div className="bg-[#52515e] flex items-center px-[4px] rounded-full h-full">
            <span className="text-white whitespace-nowrap" style={{ fontSize: 11 }}>{count} Frames</span>
          </div>
        </div>
      </div>

      {/* Scrollable frame list */}
      <div className="flex flex-col gap-[16px] items-center overflow-y-auto px-[16px]" style={{ flex: 1 }}>
        {frames.map((f, i) => (
          <FrameItem key={i} {...f} />
        ))}
      </div>

      {/* Add all CTA */}
      <div className="shrink-0 px-[16px] py-[16px]" style={{ borderTop: "1.022px solid rgba(19,18,33,0.1)" }}>
        <button
          className="flex items-center justify-center gap-[4px] cursor-pointer w-full"
          style={{
            backgroundColor: "rgba(44,36,195,0.05)",
            borderRadius: 6,
            height: 37,
          }}
        >
          <AddIcon svg={svgMulti} />
          <span className="font-medium text-[#2c24c3]" style={{ fontSize: 13 }}>Add all to Frame List</span>
        </button>
      </div>
    </div>
  );
}

/* ── frame booking mock data ──────────────────────── */
interface Booking {
  campaign: string;
  advertiser: string;
  period: string;
  status: "confirmed" | "option";
}

const FRAME_BOOKINGS: Record<string, Booking[]> = {
  "ES-MAD-OX-00123": [
    { campaign: "Summer Brand Awareness 2026", advertiser: "Coca-Cola", period: "15 May – 30 Sep 2026", status: "confirmed" },
  ],
  "ES-MAD-PC-00456": [
    { campaign: "Nike Summer Sprint 2026", advertiser: "Nike", period: "1 Jun – 31 Aug 2026", status: "confirmed" },
  ],
  "ES-MAD-KC-00789": [
    { campaign: "Kings Cross Retail Push Q3", advertiser: "H&M", period: "1 Jul – 30 Sep 2026", status: "confirmed" },
    { campaign: "Autumn Preview", advertiser: "Zara", period: "1 Aug – 30 Sep 2026", status: "option" },
  ],
  "ES-MAD-SB-00321": [
    { campaign: "Southbank Summer Series", advertiser: "Netflix", period: "15 Jun – 15 Aug 2026", status: "confirmed" },
  ],
  "ES-MAD-CS-00512": [
    { campaign: "Canary Wharf Finance Week", advertiser: "Barclays", period: "3 Jun – 28 Jun 2026", status: "confirmed" },
  ],
  "ES-MAD-CT-00634": [
    { campaign: "Covent Garden Festive", advertiser: "Apple", period: "1 Nov – 31 Dec 2026", status: "option" },
  ],
};

function getBookings(locationCode: string): Booking[] {
  // Try exact match first, then prefix match
  const key = Object.keys(FRAME_BOOKINGS).find(k => locationCode.startsWith(k));
  return key ? FRAME_BOOKINGS[key] : [];
}

/* ── swap-mode single frame card ──────────────────── */
interface SwapFrameCardProps {
  onClose: () => void;
  onSelectFrame: (frameId: string) => void;
  frameCode?: string;
  locationCode?: string;
  address?: string;
  city?: string;
  format?: string;
  availableSot?: string;
  impressions?: string;
}

function SwapFrameCard({
  onClose,
  onSelectFrame,
  locationCode = "ES-MAD-PC-00456",
  address = "Piccadilly Circus, 12, W1J 9HS",
  city = "Madrid, ES",
  frameCode = "ES-MAD-PC-00456.D2.02",
  format = "48-Sheet",
  availableSot = "68.2%",
  impressions = "6,281",
}: SwapFrameCardProps) {
  const bookings = getBookings(locationCode);

  return (
    <div className="bg-white relative" style={{ borderRadius: 12, width: 332, border: "1.022px solid rgba(19,18,33,0.1)", boxShadow: "0 4px 24px rgba(19,18,33,0.12)" }}>
      <div className="flex flex-col gap-[16px] items-start overflow-clip" style={{ borderRadius: "inherit" }}>
        {/* Header */}
        <div className="bg-[#f8f8f9] flex items-center justify-between overflow-clip px-[16px] py-[16px] w-full" style={{ borderRadius: "12px 12px 0 0" }}>
          <span className="font-semibold text-[#131221]" style={{ fontSize: 15 }}>{locationCode}</span>
          <button
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer bg-[rgba(19,18,33,0.05)] rounded-[6px]"
            style={{ width: 28, height: 28 }}
          >
            <CloseIcon svg={svgSingle} />
          </button>
        </div>

        {/* Location details */}
        <div className="flex items-start justify-between overflow-clip px-[16px] w-full">
          <div className="flex flex-col gap-[4px]">
            <span className="text-[#131221]" style={{ fontSize: 13 }}>{address}</span>
            <span className="text-[#131221]" style={{ fontSize: 13 }}>{city}</span>
          </div>
          <div className="flex gap-[8px] items-center">
            <div className="bg-[rgba(19,18,33,0.05)] flex items-center justify-center rounded-[4px]" style={{ width: 24, height: 24 }}>
              <PinIcon svg={svgSingle} />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-[40px] px-[16px] w-full">
          <div className="flex flex-col gap-[4px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Available SOT</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{availableSot}</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Impressions</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{impressions}</span>
          </div>
        </div>

        {/* Frame code + format */}
        <div className="flex flex-col gap-[4px] px-[16px] w-full">
          <div className="flex flex-col gap-[2px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Frame Code</span>
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{frameCode}</span>
              <button className="flex items-center justify-center cursor-pointer rounded-[6px]" style={{ width: 28, height: 28 }}>
                <CopyIcon svg={svgSingle} />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span style={{ fontSize: 11, color: "#7c7b87" }}>Format</span>
            <span className="font-medium text-[#131221]" style={{ fontSize: 13 }}>{format}</span>
          </div>
        </div>

        {/* Campaign bookings */}
        <div className="flex flex-col gap-[6px] px-[16px] w-full">
          <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>
            Booked by {bookings.length === 0 ? "" : `(${bookings.length})`}
          </span>
          {bookings.length === 0 ? (
            <div style={{ backgroundColor: "rgba(19,18,33,0.04)", borderRadius: 6, padding: "8px 10px" }}>
              <span style={{ fontSize: 12, color: "#9e9daa", fontFamily: "Inter, sans-serif" }}>No active bookings for this schedule</span>
            </div>
          ) : (
            <div className="flex flex-col gap-[6px]">
              {bookings.map((b, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: b.status === "confirmed" ? "rgba(44,36,195,0.05)" : "rgba(248,188,26,0.08)",
                    border: `1px solid ${b.status === "confirmed" ? "rgba(44,36,195,0.15)" : "rgba(248,188,26,0.3)"}`,
                    borderRadius: 6,
                    padding: "8px 10px",
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: 3,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#131221", fontFamily: "Inter, sans-serif", lineHeight: "18px", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {b.campaign}
                    </span>
                    <div style={{ flexShrink: 0, height: 16, borderRadius: 99, padding: "0 6px", backgroundColor: b.status === "confirmed" ? "rgba(44,36,195,0.12)" : "rgba(248,188,26,0.2)", display: "flex", alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 500, color: b.status === "confirmed" ? "#2c24c3" : "#9d7717", fontFamily: "Inter, sans-serif" }}>
                        {b.status === "confirmed" ? "Confirmed" : "Option"}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{b.advertiser}</span>
                  <span style={{ fontSize: 11, color: "#7c7b87", fontFamily: "Inter, sans-serif" }}>{b.period}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Select frame CTA */}
        <div className="w-full px-[12px] pb-[12px]">
          <button
            onClick={() => { onSelectFrame(frameCode); onClose(); }}
            className="w-full flex items-center justify-center cursor-pointer"
            style={{
              height: 37,
              borderRadius: 6,
              backgroundColor: "#2c24c3",
              border: "none",
              fontSize: 13,
              fontWeight: 500,
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              lineHeight: "20px",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Select frame
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── public component ─────────────────────────────── */
export interface SelectedMarker {
  count: number;
  lat: number;
  lng: number;
  /** Pixel coords relative to the map container */
  x: number;
  y: number;
}

const CARD_WIDTH = 332;
const GAP = 14; // gap between marker and card edge

function computeCardStyle(
  marker: SelectedMarker,
  containerW: number,
  containerH: number,
  cardH: number,
): React.CSSProperties {
  // Prefer above the marker; fall back to below if not enough room
  let top = marker.y - cardH - GAP;
  if (top < 8) top = marker.y + GAP + 16; // 16px for the marker dot radius

  // Center horizontally on the marker, then clamp inside the container
  let left = marker.x - CARD_WIDTH / 2;
  left = Math.max(8, Math.min(left, containerW - CARD_WIDTH - 8));

  return { position: "absolute", top, left, zIndex: 50, pointerEvents: "auto" };
}

interface FrameInfoCardProps {
  marker: SelectedMarker | null;
  onClose: () => void;
  /** Width/height of the map container in px (used to clamp position) */
  containerSize?: { width: number; height: number };
  swapMode?: boolean;
  onSelectFrame?: (frameId: string) => void;
}

export function FrameInfoCard({ marker, onClose, containerSize, swapMode, onSelectFrame }: FrameInfoCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = React.useState(400);

  React.useLayoutEffect(() => {
    if (cardRef.current) setCardH(cardRef.current.offsetHeight);
  });

  if (!marker) return null;

  const cw = containerSize?.width ?? 1000;
  const ch = containerSize?.height ?? 800;
  const style = computeCardStyle(marker, cw, ch, cardH);

  return (
    <div ref={cardRef} style={style}>
      {swapMode ? (
        <SwapFrameCard
          onClose={onClose}
          onSelectFrame={onSelectFrame ?? (() => {})}
        />
      ) : marker.count === 1 ? (
        <SingleFrameCard onClose={onClose} />
      ) : (
        <MultiFrameCard
          onClose={onClose}
          frameCount={marker.count}
          frames={DEFAULT_FRAMES.slice(0, Math.min(marker.count, 3))}
        />
      )}
    </div>
  );
}
