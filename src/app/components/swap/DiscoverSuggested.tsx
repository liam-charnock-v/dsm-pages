import { useState } from "react";
import { ChevronDown, Info, MapPin, RectangleHorizontal } from "lucide-react";
import { DEAL_LINE, Period, SUGGESTIONS, SwapFrame, activeOccupants, fmtShort, frameById } from "./swapData";
import { Caption, Checkbox, Chip, FG, FG2, FG3, Mono, Tooltip } from "./swapUi";

/** V2: frames ranked against the deal line criteria, best match first */
export function suggestedFrames(): { frame: SwapFrame; score: number; postcode: string; reasons: string[] }[] {
  return SUGGESTIONS
    .map((s) => ({ ...s, frame: frameById(s.frameId)! }))
    .filter((s) => s.frame && !s.frame.notMatching)
    .sort((a, b) => b.score - a.score);
}

/* Step 2 — Suggested frames (next phase): pick from a ranked list instead of searching */
export function DiscoverSuggested({
  period, selected, onToggle, hoveredId, onHover,
}: {
  period: Period;
  selected: string[];
  onToggle: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const list = suggestedFrames();
  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "var(--text-xs)", lineHeight: "20px", color: FG3 }}>Suggested frames</span>
        <Caption>{list.length} candidates</Caption>
      </div>
      <Caption color={FG2}>Ranked by how closely each frame matches the {DEAL_LINE.name} criteria.</Caption>
      {list.map((s) => (
        <SuggestionCard
          key={s.frame.id}
          frame={s.frame}
          score={s.score}
          postcode={s.postcode}
          reasons={s.reasons}
          period={period}
          selected={selected.includes(s.frame.id)}
          highlighted={hoveredId === s.frame.id}
          onToggle={() => onToggle(s.frame.id)}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

function SuggestionCard({
  frame: f, score, postcode, reasons, period, selected, highlighted, onToggle, onHover,
}: {
  frame: SwapFrame;
  score: number;
  postcode: string;
  reasons: string[];
  period: Period;
  selected: boolean;
  highlighted: boolean;
  onToggle: () => void;
  onHover: (id: string | null) => void;
}) {
  const [showOcc, setShowOcc] = useState(false);
  const occ = activeOccupants(f, period);
  const street = f.address.replace(/, Madrid$/, "");
  const advertisers = [...new Set(occ.map((o) => o.donor.advertiser))];
  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => onHover(f.id)}
      onMouseLeave={() => onHover(null)}
      className="flex flex-col cursor-pointer transition-colors duration-150"
      style={{
        gap: 8,
        padding: 12,
        borderRadius: 12,
        backgroundColor: selected ? "#fff" : "var(--primary-100)",
        border: `1px solid ${selected ? "var(--primary-600)" : highlighted ? "var(--primary-400, #a0acf8)" : "var(--primary-300)"}`,
        boxShadow: selected ? "0 0 0 3px rgba(44,36,195,0.12)" : "var(--elevation-sm)",
      }}
    >
      <div className="flex items-center" style={{ gap: 8 }}>
        <Checkbox checked={selected} onChange={onToggle} label={`Select ${f.id}`} />
        <span className="flex-1 min-w-0" style={{ fontSize: "var(--text-sm)", lineHeight: "20px", fontWeight: "var(--font-weight-semibold)", color: FG, fontVariantNumeric: "tabular-nums" }}>
          {f.id}
        </span>
        <span onClick={(e) => e.stopPropagation()}>
          <Tooltip
            inline
            below
            width={236}
            content={
              <span className="flex flex-col" style={{ gap: 2 }}>
                <span style={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: "var(--font-weight-medium)" }}>Why {score}% match</span>
                {reasons.map((r) => <span key={r} style={{ fontSize: "inherit", lineHeight: "inherit" }}>· {r}</span>)}
              </span>
            }
          >
            <span
              className="inline-flex items-center"
              style={{ gap: 4, height: 24, padding: "0 8px", borderRadius: "var(--radius-full)", backgroundColor: "var(--primary-200)", color: "var(--primary-600)", fontSize: "var(--text-xs)", lineHeight: "16px", whiteSpace: "nowrap" }}
            >
              {score}% match
              <Info size={12} aria-hidden="true" />
            </span>
          </Tooltip>
        </span>
      </div>

      <div className="flex items-center flex-wrap" style={{ columnGap: 12, rowGap: 2 }}>
        <span className="flex items-center" style={{ gap: 4 }}>
          <MapPin size={13} color="#7c7b87" aria-hidden="true" />
          <Caption color={FG2}>Madrid, ES</Caption>
        </span>
        <span className="flex items-center min-w-0" style={{ gap: 4 }}>
          <RectangleHorizontal size={13} color="#7c7b87" aria-hidden="true" />
          <Caption color={FG2}>{street}, {postcode}</Caption>
        </span>
      </div>

      <div className="flex flex-wrap" style={{ gap: 4 }}>
        {advertisers.length > 0 && <Attr label="Advertiser" value={advertisers.join(", ")} />}
        <Attr label="Format" value={f.format} />
        <Attr label="Frame size" value={f.size} />
        <Attr label="Media type" value={f.media} />
      </div>

      {occ.length > 0 ? (
        <>
          {/* Same reveal as the Find results: occupying campaigns stay hidden until asked for */}
          <button
            type="button"
            aria-expanded={showOcc}
            onClick={(e) => { e.stopPropagation(); setShowOcc((v) => !v); }}
            className="flex items-center self-start cursor-pointer border-none bg-transparent p-0 hover:underline"
            style={{ gap: 4, fontSize: "var(--text-xs)", lineHeight: "16px", color: "var(--accent)" }}
          >
            {showOcc ? "Hide" : "Show"} occupying {occ.length === 1 ? "campaign" : `campaigns (${occ.length})`}
            <ChevronDown size={12} aria-hidden="true" style={{ transform: showOcc ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
          </button>
          {showOcc && (
            <div className="flex flex-col" style={{ gap: 8, padding: "8px 10px", borderRadius: 6, backgroundColor: selected ? "var(--primary-100)" : "var(--primary-200)" }}>
              <span style={{ fontSize: "var(--text-xs)", lineHeight: "16px", color: FG3 }}>From campaign</span>
              {occ.map((o) => (
                <span key={o.donorId} className="flex flex-col items-start" style={{ gap: 4 }}>
                  <span className="flex items-center" style={{ gap: 6 }}>
                    <span style={{ fontSize: "var(--text-sm)", lineHeight: "18px", color: FG }}>{o.donor.name}</span>
                    {o.donor.live && <Chip tone="success">Live</Chip>}
                  </span>
                  <Caption color={FG2}>{o.donor.advertiser} · <span style={{ fontSize: "inherit", fontVariantNumeric: "tabular-nums" }}>{fmtShort(o.donor.run)}</span></Caption>
                  <Mono size={11} color="var(--primary-600)">
                    <span style={{ display: "inline-block", fontSize: "inherit", lineHeight: "16px", padding: "1px 6px", borderRadius: 4, backgroundColor: "var(--primary-300)" }}>{o.donor.code}</span>
                  </Mono>
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <Caption>From campaign: Unassigned</Caption>
      )}
    </div>
  );
}

const Attr = ({ label, value }: { label: string; value: string }) => (
  <span className="inline-flex items-center" style={{ gap: 4, height: 22, padding: "0 6px", borderRadius: 4, backgroundColor: "rgba(19,18,33,0.06)", fontSize: "var(--text-xs)", lineHeight: "16px", whiteSpace: "nowrap" }}>
    <span style={{ fontSize: "inherit", lineHeight: "inherit", color: FG3 }}>{label}:</span>
    <span style={{ fontSize: "inherit", lineHeight: "inherit", color: FG }}>{value}</span>
  </span>
);
