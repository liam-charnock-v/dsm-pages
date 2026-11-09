import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, MapPin, Monitor } from "lucide-react";
import {
  DONORS, FORMATS, FRAMES, LOCATIONS, MEDIA_TYPES, Period, SwapFrame, activeOccupants, fmtNum, fmtShort, fold, frameStatus, splitMatch, statusRank, statusTone,
} from "./swapData";
import { FilterBar, FilterConfig, Filters, passesFilters } from "./SwapFilters";
import { BORDER, Caption, Card, Checkbox, Chip, FG, FG2, Mono, SearchField } from "./swapUi";

const uniq = (xs: string[]) => [...new Set(xs)];
const SWAPPABLE = FRAMES.filter((f) => !f.notMatching);
export const FIND_FILTERS: FilterConfig[] = [
  { id: "format", label: "Format", options: FORMATS },
  { id: "mediaType", label: "Media type", options: MEDIA_TYPES },
  { id: "frameSize", label: "Frame size", options: uniq(SWAPPABLE.map((f) => f.size)) },
  { id: "tags", label: "Tags", options: uniq(SWAPPABLE.flatMap((f) => f.tags)) },
];
const filterValues = (f: SwapFrame) => ({ format: [f.format], mediaType: [f.media], frameSize: [f.size], tags: f.tags });

const areaToken = (label: string) => label.replace(/, Madrid$/, "");
const tokensOf = (q: string) => q.split(",").map((t) => t.trim()).filter(Boolean);

function frameText(f: SwapFrame) {
  return fold([f.id, f.address, f.format, ...f.occupants.flatMap((o) => [DONORS[o.donorId].name, DONORS[o.donorId].advertiser])].join(" "));
}

/**
 * Frames matching any comma-separated token (an exact location, or free text) and the filters;
 * every frame when there's no query. Frames that don't match the deal line are never shown. Available first, occupied last,
 * then by impressions.
 */
export function searchFrames(query: string, period: Period, filters: Filters = {}): SwapFrame[] {
  const tokens = tokensOf(query);
  const imp = (f: SwapFrame) => f.impressions * (f.media === "Digital" ? 2 : 1);
  return SWAPPABLE.filter((f) =>
    passesFilters(filters, filterValues(f)) &&
    (!tokens.length || tokens.some((t) => {
      const loc = LOCATIONS.find((l) => fold(areaToken(l.label)) === fold(t));
      return loc ? f.area === loc.area || fold(f.address).includes(fold(t)) : frameText(f).includes(fold(t));
    })),
  ).sort((a, b) => statusRank(frameStatus(a, period)) - statusRank(frameStatus(b, period)) || imp(b) - imp(a));
}

function Highlight({ text, q }: { text: string; q: string }) {
  const m = splitMatch(text, q);
  if (!m) return <>{text}</>;
  return <>{m[0]}<b style={{ fontWeight: 700 }}>{m[1]}</b>{m[2]}</>;
}

/* Step 2 — Find a frame (flow 05–07) */
export function DiscoverFind({
  period, query, onQueryChange, filters, onFiltersChange, selected, onToggle, hoveredId, onHover, onFocusFrame,
}: {
  period: Period;
  query: string;
  onQueryChange: (q: string) => void;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  selected: string[];
  onToggle: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onFocusFrame: (f: SwapFrame) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const [flashId, setFlashId] = useState<string | null>(null);
  const cardRefs = useRef(new Map<string, HTMLDivElement>());

  const results = useMemo(() => searchFrames(query, period, filters), [query, period, filters]);
  const tokens = tokensOf(query);
  const last = query.endsWith(",") ? "" : (query.split(",").pop() ?? "").trim();

  // Typeahead: grouped frames (ID in mono) and locations, for the token being typed
  const suggestions = useMemo(() => {
    if (last.length < 2) return { frames: [] as SwapFrame[], locs: [] as typeof LOCATIONS };
    const isDone = LOCATIONS.some((l) => fold(areaToken(l.label)) === fold(last)) || FRAMES.some((f) => fold(f.id) === fold(last));
    if (isDone) return { frames: [], locs: [] };
    const q = fold(last);
    return {
      frames: SWAPPABLE.filter((f) => fold(f.id).includes(q) || fold(f.address).includes(q)).slice(0, 3),
      locs: LOCATIONS.filter((l) => fold(l.label).includes(q)).slice(0, 3),
    };
  }, [last]);
  const options = [
    ...suggestions.frames.map((f) => ({ kind: "frame" as const, f })),
    ...suggestions.locs.map((l) => ({ kind: "loc" as const, l })),
  ];
  const open = focused && options.length > 0;
  useEffect(() => setActive(0), [last]);

  const replaceLast = (token: string) => {
    const head = tokensOf(query);
    if (!query.endsWith(",")) head.pop();
    onQueryChange([...head, token].join(", "));
  };

  const pick = (i: number) => {
    const o = options[i];
    if (!o) return;
    if (o.kind === "loc") {
      replaceLast(areaToken(o.l.label));
    } else {
      // A frame jumps to its card: keep the earlier tokens, adding the frame's street if needed
      const head = query.endsWith(",") ? tokensOf(query) : tokensOf(query).slice(0, -1);
      const street = o.f.address.replace(/,.*$/, "").replace(/\s\d+$/, "");
      if (searchFrames(head.join(", "), period).some((f) => f.id === o.f.id)) onQueryChange(head.join(", "));
      else onQueryChange([...head, street].join(", "));
      setFlashId(o.f.id);
      onFocusFrame(o.f);
    }
    setFocused(false);
  };

  useEffect(() => {
    if (!flashId) return;
    cardRefs.current.get(flashId)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    const t = setTimeout(() => setFlashId(null), 1600);
    return () => clearTimeout(t);
  }, [flashId, results]);

  return (
    <div className="flex flex-col" style={{ gap: 12 }}>
      <div className="relative">
        <SearchField
          value={query}
          onChange={(v) => { onQueryChange(v); setFocused(true); }}
          placeholder="Search by frame ID, location or advertiser"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
          onKeyDown={(e) => {
            if (!open) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % options.length); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + options.length) % options.length); }
            if (e.key === "Enter") { e.preventDefault(); pick(active); }
            if (e.key === "Escape") setFocused(false);
          }}
        />
        {open && (
          <div
            role="listbox"
            aria-label="Suggestions"
            className="absolute left-0 right-0 flex flex-col"
            style={{ top: 40, zIndex: 20, padding: 4, backgroundColor: "#fff", borderRadius: 8, border: `1px solid ${BORDER}`, boxShadow: "0px 8px 24px rgba(16,16,52,0.12)" }}
          >
            {suggestions.frames.map((f, i) => (
              <Option key={f.id} active={active === i} onPick={() => pick(i)} onHover={() => setActive(i)}>
                <Monitor size={14} color="#7c7b87" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }} />
                <span className="flex flex-col min-w-0">
                  <Mono size={11}><Highlight text={f.id} q={last} /></Mono>
                  <Caption><Highlight text={f.address} q={last} /> · {f.format}</Caption>
                </span>
              </Option>
            ))}
            {suggestions.frames.length > 0 && suggestions.locs.length > 0 && (
              <div style={{ height: 1, backgroundColor: "rgba(19,18,33,0.07)", margin: "4px 0" }} />
            )}
            {suggestions.locs.length > 0 && <GroupLabel>Locations</GroupLabel>}
            {suggestions.locs.map((l, j) => {
              const i = suggestions.frames.length + j;
              return (
                <Option key={l.label} active={active === i} onPick={() => pick(i)} onHover={() => setActive(i)}>
                  <MapPin size={14} color="#7c7b87" aria-hidden="true" style={{ marginTop: 1, flexShrink: 0 }} />
                  <span className="flex-1" style={{ fontSize: "var(--text-sm)", lineHeight: "18px", color: FG }}><Highlight text={l.label} q={last} /></span>
                  <Caption>{l.count} frames</Caption>
                </Option>
              );
            })}
          </div>
        )}
      </div>

      <FilterBar config={FIND_FILTERS} filters={filters} onChange={onFiltersChange} />

      {results.length > 0 && <Caption>{results.length} {results.length === 1 ? "frame" : "frames"}</Caption>}

      {!results.length && (
        <div style={{ padding: "20px 12px", textAlign: "center" }}>
          <Caption>{tokens.length ? `No frames match “${query}”${Object.values(filters).some((x) => x.size) ? " with these filters" : ""}. Try a frame ID, street or advertiser.` : "No frames match these filters."}</Caption>
        </div>
      )}

      <div className="flex flex-col" style={{ gap: 8 }}>
        {results.map((f) => (
          <FrameResultCard
            key={f.id}
            frame={f}
            period={period}
            selected={selected.includes(f.id)}
            highlighted={hoveredId === f.id || flashId === f.id}
            onToggle={() => onToggle(f.id)}
            onHover={onHover}
            cardRef={(el) => { if (el) cardRefs.current.set(f.id, el); else cardRefs.current.delete(f.id); }}
          />
        ))}
      </div>
    </div>
  );
}

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{ padding: "6px 8px 2px", fontSize: "var(--text-xs)", lineHeight: "16px", fontWeight: "var(--font-weight-medium)", color: "#7c7b87" }}>
      {children}
    </span>
  );
}

function Option({ children, active, onPick, onHover }: { children: React.ReactNode; active: boolean; onPick: () => void; onHover: () => void }) {
  return (
    <div
      role="option"
      aria-selected={active}
      onMouseDown={(e) => { e.preventDefault(); onPick(); }}
      onMouseEnter={onHover}
      className="flex items-start cursor-pointer"
      style={{ gap: 8, padding: "6px 8px", borderRadius: 6, backgroundColor: active ? "rgba(44,36,195,0.06)" : "transparent" }}
    >
      {children}
    </div>
  );
}

/* Result card with status chip, occupying campaigns and selection */
export function FrameResultCard({
  frame: f, period, selected, highlighted, onToggle, onHover, cardRef,
}: {
  frame: SwapFrame;
  period: Period;
  selected: boolean;
  highlighted: boolean;
  onToggle: () => void;
  onHover: (id: string | null) => void;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const [showOcc, setShowOcc] = useState(false);
  const status = frameStatus(f, period);
  const off = status === "Not matching";
  const occ = activeOccupants(f, period);
  const imp = f.media === "Digital" ? f.impressions * 2 : f.impressions;
  return (
    <Card
      selected={selected}
      highlighted={highlighted}
      disabled={off}
      onClick={off ? undefined : onToggle}
      onMouseEnter={() => onHover(f.id)}
      onMouseLeave={() => onHover(null)}
      cardRef={cardRef}
    >
      <div className="flex items-start" style={{ gap: 10 }}>
        <span style={{ marginTop: 1 }}>
          <Checkbox checked={selected} disabled={off} onChange={onToggle} label={`Select ${f.id}`} />
        </span>
        <div className="flex flex-col flex-1 min-w-0" style={{ gap: 2 }}>
          <div className="flex items-center justify-between" style={{ gap: 8 }}>
            <Mono size={11}>{f.id}</Mono>
            <Chip tone={statusTone(status)}>{status}</Chip>
          </div>
          <span style={{ fontSize: "var(--text-sm)", lineHeight: "18px", color: off ? "#7c7b87" : FG }}>{f.address}</span>
          <Caption>{f.format} · {f.media} · {f.size} · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtNum(imp)}</span> imp.</Caption>
          {occ.length > 0 && (
            <button
              type="button"
              aria-expanded={showOcc}
              onClick={(e) => { e.stopPropagation(); setShowOcc((v) => !v); }}
              className="flex items-center self-start cursor-pointer border-none bg-transparent p-0 hover:underline"
              style={{ gap: 4, marginTop: 4, fontSize: "var(--text-xs)", lineHeight: "16px", fontWeight: "var(--font-weight-medium)", color: "var(--accent)" }}
            >
              {showOcc ? "Hide" : "Show"} occupying {occ.length === 1 ? "campaign" : `campaigns (${occ.length})`}
              <ChevronDown size={12} aria-hidden="true" style={{ transform: showOcc ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
            </button>
          )}
          {occ.length > 0 && showOcc && (
            <div className="flex flex-col" style={{ gap: 4, marginTop: 2, padding: "8px 10px", borderRadius: 8, backgroundColor: "rgba(19,18,33,0.03)" }}>
              {occ.map((o) => (
                <span key={o.donorId} className="flex items-center" style={{ gap: 6, fontSize: "var(--text-xs)", lineHeight: "16px", color: FG2 }}>
                  <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#a3a2ad", flexShrink: 0 }} />
                  <span className="min-w-0">{o.donor.name} · {o.donor.advertiser} · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtShort(o.donor.run)}</span></span>
                  {o.donor.live && <Chip tone="success">Live</Chip>}
                </span>
              ))}
            </div>
          )}
          {off && (
            <span style={{ marginTop: 4, fontSize: "var(--text-xs)", lineHeight: "16px", color: "#9f1234" }}>
              Not selectable: {f.notMatching}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
