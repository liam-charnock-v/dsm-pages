import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import type { SwappedInFrame } from "../DealLinePanel";
import { ScheduleStep } from "./ScheduleStep";
import { DiscoverFind, searchFrames } from "./DiscoverFind";
import { DiscoverSuggested, suggestedFrames } from "./DiscoverSuggested";
import type { Filters } from "./SwapFilters";
import { DiscoverUpload, EMPTY_UPLOAD, UploadState } from "./DiscoverUpload";
import { SelectedFrames } from "./SelectedFrames";
import { ReplaceStep } from "./ReplaceStep";
import { ReviewStep, reviewCounts } from "./ReviewStep";
import {
  Candidate, DEAL_LINE, SWAP_VERSION, FrameChoice, Metrics, Period, SwapFrame, activeOccupants, defaultChoice, fmtLong, fmtShort,
  autoChoice, frameById, frameImpressions, framePrice, isReady, replacementSlots,
} from "./swapData";
import { Btn, Caption, DIVIDER, FG, PanelFooter, SKELETON_KEYFRAMES, Skeleton, Stepper, TextLink, Title } from "./swapUi";

export interface MapPin { id: string; lat: number; lng: number }
export interface SwapResult {
  swappedIn: SwappedInFrame[];
  pins: MapPin[];
  delta: Metrics;
  replacements: number;
}

const NARROW = 372;
const TABS_V1 = [["find", "Find a frame"], ["upload", "Upload list"]] as const;
const TABS_V2 = [["suggested", "Suggested"], ["find", "Find a frame"], ["upload", "Bulk upload"]] as const;
const WIDE = 780;

export function SwapPanel({
  loading, before, hoveredId, onHover, onFocusFrame, onMapPins, onDirtyChange, onConfirm,
}: {
  loading: boolean;
  before: Metrics;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onFocusFrame: (f: SwapFrame) => void;
  onMapPins: (pins: MapPin[]) => void;
  onDirtyChange: (dirty: boolean) => void;
  onConfirm: (r: SwapResult) => void;
}) {
  // The swap period is pre-defined by the deal line, so the user starts on Discover
  const [step, setStep] = useState(2);
  const [schedule, setSchedule] = useState<Period | null>(DEAL_LINE.period);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [view, setView] = useState<"search" | "selected">("search");
  // V2 opens on smart suggestions; V1 on search
  const [tab, setTab] = useState<"suggested" | "find" | "upload">(SWAP_VERSION === 2 ? "suggested" : "find");
  const [query, setQuery] = useState("");
  // Pre-selected from the deal line's filters
  const [filters, setFilters] = useState<Filters>(() => ({
    format: new Set(DEAL_LINE.criteria.format),
    mediaType: new Set(DEAL_LINE.criteria.mediaType),
  }));
  const [upload, setUpload] = useState<UploadState>(EMPTY_UPLOAD);
  const [selected, setSelected] = useState<string[]>([]);
  const [choices, setChoices] = useState<Record<string, FrameChoice>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [chosen, setChosen] = useState<Record<string, Candidate>>({});
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Each view starts at the top
  useEffect(() => { bodyRef.current?.scrollTo(0, 0); }, [step, view, tab, activeSlot]);

  const period = schedule;
  const slots = useMemo(() => (period ? replacementSlots(selected, period, choices) : []), [selected, period, choices]);
  const liveChosen = useMemo(() => Object.fromEntries(Object.entries(chosen).filter(([k]) => slots.some((s) => s.key === k))), [chosen, slots]);
  const chosenCount = slots.filter((s) => liveChosen[s.key]).length;
  const readyCount = period ? selected.filter((id) => isReady(frameById(id)!, period, choices[id] ?? defaultChoice())).length : 0;

  const delta: Metrics = useMemo(() => selected.reduce(
    (d, id) => {
      const f = frameById(id)!;
      const c = choices[id] ?? defaultChoice();
      return { frames: d.frames + 1, impressions: d.impressions + frameImpressions(f, c), budget: d.budget + framePrice(f, c) };
    },
    { frames: 0, impressions: 0, budget: 0 },
  ), [selected, choices]);
  const after: Metrics = { frames: before.frames + delta.frames, impressions: before.impressions + delta.impressions, budget: before.budget + delta.budget };

  useEffect(() => { onDirtyChange(selected.length > 0); }, [selected.length, onDirtyChange]);

  // Map is context only: pins follow what the panel is showing
  useEffect(() => {
    let frames: SwapFrame[] = [];
    if (step === 2 && view === "search" && tab === "suggested") frames = suggestedFrames().map((s) => s.frame);
    else if (step === 2 && view === "search" && tab === "find" && period) frames = searchFrames(query, period, filters);
    else if (step === 2 && view === "search" && tab === "upload") frames = (upload.result?.matched ?? []).map((id) => frameById(id)!);
    else if (step >= 2) frames = selected.map((id) => frameById(id)!);
    onMapPins(frames.filter((f) => !f.notMatching).map((f) => ({ id: f.id, lat: f.lat, lng: f.lng })));
  }, [step, view, tab, query, filters, period, upload.result, selected, onMapPins]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const openSelected = (ids: string[]) => {
    // V2: digital frames arrive with their slots and donors already chosen
    let next = choices;
    if (SWAP_VERSION === 2 && period) {
      next = { ...choices };
      ids.forEach((id) => { if (!choices[id]) next[id] = autoChoice(frameById(id)!, period); });
      setChoices(next);
    }
    setSelected(ids);
    const firstNeeding = ids.find((id) => period && !isReady(frameById(id)!, period, next[id] ?? defaultChoice()));
    setExpandedId(firstNeeding ?? ids.find((id) => period && activeOccupants(frameById(id)!, period).length) ?? ids[0] ?? null);
    setView("selected");
  };
  const remove = (id: string) => {
    const next = selected.filter((x) => x !== id);
    setSelected(next);
    if (!next.length) setView("search");
  };

  const confirm = () => {
    if (!period) return;
    const swappedIn: SwappedInFrame[] = selected.map((id) => {
      const f = frameById(id)!;
      const taken = slots.filter((s) => s.frame.id === id);
      const released = taken.length
        ? { start: new Date(Math.min(...taken.map((t) => t.released.start.getTime()))), end: new Date(Math.max(...taken.map((t) => t.released.end.getTime()))) }
        : period;
      const extra = f.media === "Digital" ? `${(choices[id] ?? defaultChoice()).need} of ${f.slots} slots` : f.format;
      return {
        id,
        location: `${f.address} · ${extra}`,
        from: taken.length ? [...new Set(taken.map((t) => t.donor.name))].join(", ") : "available inventory",
        dates: fmtShort(released),
      };
    });
    onConfirm({
      swappedIn,
      pins: selected.map((id) => frameById(id)!).map((f) => ({ id: f.id, lat: f.lat, lng: f.lng })),
      delta,
      replacements: slots.length,
    });
  };

  /* ── Footer per view: Back always bottom-left, primary action bottom-right ── */
  const arrow = <ArrowRight size={14} />;
  const plural = (n: number) => `${n} ${n === 1 ? "frame" : "frames"}`;
  let back: (() => void) | null = null;
  let middle: React.ReactNode = null;
  let primary: React.ReactNode = null;
  if (step === 1) {
    back = () => { setPickerOpen(false); setStep(2); };
    primary = <Btn variant="primary" disabled={!schedule} onClick={() => setStep(2)} iconEnd={arrow}>Continue</Btn>;
  } else if (step === 2 && view === "search" && tab !== "upload") {
    back = () => setStep(1);
    primary = <Btn variant="primary" disabled={!selected.length} onClick={() => openSelected(selected)} iconEnd={arrow}>Continue</Btn>;
  } else if (step === 2 && view === "search") {
    const n = upload.status === "parsed" ? upload.selected.length : 0;
    back = () => (upload.status === "idle" ? setStep(1) : setUpload(EMPTY_UPLOAD));
    primary = (
      <Btn variant="primary" disabled={!n} onClick={() => openSelected([...selected, ...upload.selected.filter((id) => !selected.includes(id))])} iconEnd={arrow}>
        {n ? `Continue with ${plural(n)}` : "Continue"}
      </Btn>
    );
  } else if (step === 2) {
    const needs = selected.length - readyCount;
    back = () => setView("search");
    // Nothing to replace: skip straight to review
    primary = slots.length
      ? <Btn variant="primary" disabled={!!needs} onClick={() => { setStep(3); setActiveSlot(null); }} iconEnd={arrow}>Continue</Btn>
      : <Btn variant="primary" disabled={!!needs} onClick={() => { setActiveSlot(null); setStep(4); }} iconEnd={arrow}>Review swap</Btn>;
  } else if (step === 3) {
    back = () => (activeSlot ? setActiveSlot(null) : setStep(2));
    middle = <Caption>{chosenCount} of {slots.length} chosen</Caption>;
    primary = <Btn variant="primary" disabled={chosenCount < slots.length} onClick={() => { setActiveSlot(null); setStep(4); }} iconEnd={arrow}>Review swap</Btn>;
  } else {
    back = () => setStep(slots.length ? 3 : 2);
    primary = <Btn variant="primary" onClick={confirm}>Confirm swap</Btn>;
  }
  const footer = (
    <>
      <span className="shrink-0" style={{ width: 64 }}>{back && <Btn variant="link" onClick={back}>Back</Btn>}</span>
      <span className="flex-1 min-w-0 flex items-center justify-center">{middle}</span>
      {primary}
    </>
  );

  const counts = reviewCounts(selected, slots);
  const wide = step === 4 && !loading;

  return (
    <div className="relative shrink-0 h-full" style={{ width: NARROW, fontFamily: "'Inter', sans-serif" }}>
      <style>{SKELETON_KEYFRAMES}</style>
      <aside
        aria-label="Swap"
        aria-busy={loading}
        className="absolute left-0 top-0 bottom-0 flex flex-col"
        style={{
          width: wide ? WIDE : NARROW,
          zIndex: 30,
          backgroundColor: "#fff",
          borderRight: "1px solid rgba(19,18,33,0.1)",
          boxShadow: wide ? "0px 12px 40px rgba(16,16,52,0.18)" : "none",
          transition: "width 0.2s cubic-bezier(0.2,0,0,1), box-shadow 0.2s",
        }}
      >
        {loading ? (
          <>
            <div className="flex justify-between" style={{ padding: 16, borderBottom: `1px solid ${DIVIDER}` }}>
              {[0, 1, 2, 3].map((i) => <Skeleton key={i} w={64} h={20} r={99} />)}
            </div>
            <div className="flex flex-col" style={{ gap: 12, padding: 16 }}>
              <Skeleton w="60%" h={16} /><Skeleton w="90%" h={12} /><Skeleton w="100%" h={40} r={6} /><Skeleton w="100%" h={96} r={12} /><Skeleton w="100%" h={96} r={12} />
            </div>
          </>
        ) : (
          <>
            <div className="shrink-0">
              <Stepper step={step} locked={false} />
              {step === 4 && period && (
                <div className="flex items-center" style={{ padding: "8px 16px", borderBottom: `1px solid ${DIVIDER}`, backgroundColor: "rgba(19,18,33,0.02)" }}>
                  <Title size="sm">{plural(counts.frames)} · {counts.donors} {counts.donors === 1 ? "donor" : "donors"} · {counts.replacements} {counts.replacements === 1 ? "replacement" : "replacements"}</Title>
                </div>
              )}
            </div>

            <div ref={bodyRef} className="flex-1 min-h-0 overflow-y-auto flex flex-col" style={{ padding: 16, gap: 12 }}>
              {step === 1 && (
                <ScheduleStep
                  schedule={schedule}
                  pickerOpen={pickerOpen}
                  onOpenPicker={() => setPickerOpen(true)}
                  onClosePicker={() => setPickerOpen(false)}
                  onApply={(p) => { setSchedule(p); setPickerOpen(false); setStep(2); }}
                />
              )}

              {step === 2 && period && view === "search" && (
                <>
                  <div className="flex items-center" style={{ gap: 10, padding: "8px 12px", borderRadius: 6, backgroundColor: "var(--primary-50)", border: "1px solid var(--primary-300)" }}>
                    <Calendar size={14} color="#2c24c3" aria-hidden="true" />
                    <span className="flex-1" style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: FG, fontVariantNumeric: "tabular-nums" }}>{fmtLong(period)}</span>
                    <TextLink onClick={() => { setStep(1); setPickerOpen(true); }}>Edit</TextLink>
                  </div>
                  <div role="tablist" aria-label="Discover method" className="flex" style={{ backgroundColor: "var(--neutral-200)", borderRadius: 6, padding: 2, gap: 2 }}>
                    {(SWAP_VERSION === 2 ? TABS_V2 : TABS_V1).map(([id, label]) => (
                      <button
                        key={id}
                        role="tab"
                        aria-selected={tab === id}
                        onClick={() => setTab(id)}
                        className="cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        style={{ flex: 1, height: 32, borderRadius: 6, fontSize: "var(--text-sm)", color: tab === id ? "var(--essential-secondary)" : "var(--neutral-600)", backgroundColor: tab === id ? "#fff" : "transparent", border: tab === id ? "1px solid var(--neutral-300)" : "1px solid transparent", boxShadow: tab === id ? "var(--elevation-sm)" : "none" }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {tab === "suggested" ? (
                    <DiscoverSuggested period={period} selected={selected} onToggle={toggle} hoveredId={hoveredId} onHover={onHover} />
                  ) : tab === "find" ? (
                    <DiscoverFind
                      period={period}
                      query={query}
                      onQueryChange={setQuery}
                      filters={filters}
                      onFiltersChange={setFilters}
                      selected={selected}
                      onToggle={toggle}
                      hoveredId={hoveredId}
                      onHover={onHover}
                      onFocusFrame={onFocusFrame}
                    />
                  ) : (
                    <DiscoverUpload period={period} state={upload} onChange={setUpload} />
                  )}
                </>
              )}

              {step === 2 && period && view === "selected" && (
                <SelectedFrames
                  period={period}
                  ids={selected}
                  choices={choices}
                  onChoice={(id, c) => setChoices((m) => ({ ...m, [id]: c }))}
                  expandedId={expandedId}
                  onExpand={setExpandedId}
                  onRemove={remove}
                  hoveredId={hoveredId}
                  onHover={onHover}
                />
              )}

              {step === 3 && period && (
                <ReplaceStep
                  period={period}
                  slots={slots}
                  chosen={liveChosen}
                  activeKey={activeSlot}
                  onOpen={setActiveSlot}
                  onChoose={(k, c) => setChosen((m) => ({ ...m, [k]: c }))}
                  excluded={selected}
                />
              )}

              {step === 4 && period && (
                <ReviewStep period={period} ids={selected} choices={choices} slots={slots} chosen={liveChosen} before={before} after={after} />
              )}
            </div>

            <PanelFooter>{footer}</PanelFooter>
          </>
        )}
      </aside>
    </div>
  );
}
