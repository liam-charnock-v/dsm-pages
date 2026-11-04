import { ChevronDown, Info, Minus, Plus } from "lucide-react";
import {
  FrameChoice, Period, SwapFrame, activeOccupants, coverage, daysIn, defaultChoice, fmtEur, fmtMid, fmtNum, fmtShort,
  frameById, framePrice, frameStatus, gaps, isReady, monthLabel, statusTone,
} from "./swapData";
import { BORDER, Caption, Card, Checkbox, Chip, FG, FG2, Micro, Mono, Title, Tooltip } from "./swapUi";

/* Step 2 — confirm where each selected frame comes from (flow 08–09) */
export function SelectedFrames({
  period, ids, choices, onChoice, expandedId, onExpand, onRemove, hoveredId, onHover,
}: {
  period: Period;
  ids: string[];
  choices: Record<string, FrameChoice>;
  onChoice: (id: string, c: FrameChoice) => void;
  expandedId: string | null;
  onExpand: (id: string | null) => void;
  onRemove: (id: string) => void;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="flex flex-col" style={{ gap: 12 }}>
      <Title>Selected frames</Title>
      <Caption>Confirm where each frame comes from for {fmtMid(period)}.</Caption>
      {ids.map((id) => {
        const f = frameById(id)!;
        const choice = choices[id] ?? defaultChoice();
        const open = expandedId === id;
        return (
          <Card key={id} selected={open} highlighted={hoveredId === id && !open} onMouseEnter={() => onHover(id)} onMouseLeave={() => onHover(null)}>
            <FrameHeader frame={f} period={period} choice={choice} open={open} onToggleOpen={() => onExpand(open ? null : id)} onRemove={() => onRemove(id)} />
            {open && (
              <>
                <div style={{ height: 1, backgroundColor: "rgba(19,18,33,0.07)", margin: "6px 0" }} />
                {frameStatus(f, period) === "Available" ? (
                  <Caption>Available for {fmtShort(period)}. Added as normal, with no donor and no replacement.</Caption>
                ) : f.media === "Paper" ? (
                  <PaperDonors frame={f} period={period} />
                ) : (
                  <DigitalDonors frame={f} period={period} choice={choice} onChoice={(c) => onChoice(id, c)} />
                )}
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function summary(f: SwapFrame, period: Period, choice: FrameChoice) {
  const occ = activeOccupants(f, period);
  if (!occ.length) return { text: "Available · added as normal", ready: true };
  if (f.media === "Digital") {
    const ready = isReady(f, period, choice);
    const taken = occ.filter((o) => choice.donors.includes(o.donorId));
    return ready
      ? { text: `From ${taken.map((o) => o.donor.name).join(", ")} · ${choice.need} of ${f.slots} slots`, ready }
      : { text: "Choose donors · Digital, share of time", ready };
  }
  const free = gaps(period, occ.map((o) => o.released));
  const released = occ.map((o) => `From ${o.donor.name} · ${fmtShort(o.released)}`).join("; ");
  return { text: free.length ? `${released} released · ${free.map(fmtShort).join(", ")} already free` : released, ready: true };
}

function FrameHeader({
  frame: f, period, choice, open, onToggleOpen, onRemove,
}: {
  frame: SwapFrame; period: Period; choice: FrameChoice; open: boolean; onToggleOpen: () => void; onRemove: () => void;
}) {
  const status = frameStatus(f, period);
  const s = summary(f, period, choice);
  return (
    <div className="flex items-start" style={{ gap: 10 }}>
      <span style={{ marginTop: 1 }}>
        <Checkbox checked onChange={onRemove} label={`Remove ${f.id} from selection`} />
      </span>
      <button
        type="button"
        onClick={onToggleOpen}
        aria-expanded={open}
        className="flex flex-col flex-1 min-w-0 cursor-pointer border-none bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded"
        style={{ gap: 2 }}
      >
        <span className="flex items-center justify-between w-full" style={{ gap: 8 }}>
          <Mono>{f.id}</Mono>
          <span className="flex items-center" style={{ gap: 6 }}>
            {open ? <Chip tone={statusTone(status)}>{status}</Chip> : <Chip tone={s.ready ? "success" : "warning"}>{s.ready ? "Ready" : "Needs donors"}</Chip>}
            <ChevronDown size={14} color="#7c7b87" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
          </span>
        </span>
        <span style={{ fontSize: "var(--text-sm)", lineHeight: "18px", color: FG }}>{f.address}</span>
        {open ? (
          <Caption>
            {f.format} · {f.media} · {f.media === "Digital" ? `${f.slots} slots · ${fmtNum(f.impressions * choice.need)} imp. for ${choice.need} slots` : `${f.size} · ${fmtNum(f.impressions)} imp. · ${fmtEur(framePrice(f, choice))}`}
          </Caption>
        ) : (
          <Caption>{s.text}</Caption>
        )}
      </button>
    </div>
  );
}

/* Paper: one donor per period, auto-selected when only one overlaps */
function PaperDonors({ frame: f, period }: { frame: SwapFrame; period: Period }) {
  const occ = activeOccupants(f, period);
  const free = gaps(period, occ.map((o) => o.released));
  return (
    <div className="flex flex-col" style={{ gap: 8 }}>
      <div className="flex items-center justify-between">
        <Micro>Taking from</Micro>
        {occ.length > 1 && <Caption>One donor per period</Caption>}
      </div>
      {occ.map((o) => (
        <div key={o.donorId} className="flex flex-col" style={{ gap: 8, padding: 10, borderRadius: 8, border: `1px solid ${BORDER}`, backgroundColor: "#fff" }}>
          <label className="flex items-start" style={{ gap: 8 }}>
            <input type="radio" checked readOnly name={`donor-${f.id}-${o.donorId}`} aria-label={o.donor.name} style={{ marginTop: 3, accentColor: "#2c24c3" }} />
            <span className="flex flex-col" style={{ gap: 1 }}>
              <span className="flex items-center" style={{ gap: 6 }}>
                <Title size="sm">{o.donor.name}</Title>
                {o.donor.live && <Chip tone="success">Live</Chip>}
              </span>
              <Caption>{o.donor.advertiser} · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtShort(o.donor.run)} {o.donor.run.end.getFullYear()}</span></Caption>
            </span>
          </label>
          <Tooltip
            content={
              <>
                Only {fmtShort(o.released)} is released. The rest of this campaign stays unchanged.
                {free.length > 0 && ` ${free.map(fmtShort).join(", ")} is already free.`}
              </>
            }
          >
            <MonthTimeline run={o.donor.run} released={o.released} />
          </Tooltip>
        </div>
      ))}
    </div>
  );
}

const STAYS = "#8a8996";

/* Month-scaled bar: donor run, with the released part highlighted */
function MonthTimeline({ run, released }: { run: Period; released: Period }) {
  const axis: Period = {
    start: new Date(run.start.getFullYear(), run.start.getMonth(), 1),
    end: new Date(run.end.getFullYear(), run.end.getMonth() + 1, 0),
  };
  const total = daysIn(axis);
  const pos = (p: Period) => ({
    left: `${((daysIn({ start: axis.start, end: p.start }) - 1) / total) * 100}%`,
    width: `${(daysIn(p) / total) * 100}%`,
  });
  const months: number[] = [];
  for (let d = new Date(axis.start); d <= axis.end; d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) months.push(d.getMonth());
  return (
    <div className="flex flex-col" style={{ gap: 4 }}>
      <div role="img" aria-label={`Donor runs ${fmtShort(run)}. ${fmtShort(released)} is released.`} className="relative" style={{ height: 8, borderRadius: 99, backgroundColor: "rgba(19,18,33,0.06)" }}>
        <span className="absolute" style={{ top: 0, bottom: 0, borderRadius: 99, backgroundColor: STAYS, ...pos(run) }} />
        <span className="absolute" style={{ top: 0, bottom: 0, borderRadius: 99, backgroundColor: "#2c24c3", ...pos(released) }} />
      </div>
      <div className="flex justify-between" aria-hidden="true">
        {months.map((m) => <Caption key={m}>{monthLabel(m)}</Caption>)}
      </div>
      <div className="flex items-center" style={{ gap: 12 }}>
        <Legend color="#2c24c3">Released to you</Legend>
        <Legend color={STAYS}>Stays with donor</Legend>
        <Info size={12} color="#7c7b87" aria-hidden="true" style={{ marginLeft: "auto" }} />
      </div>
    </div>
  );
}

const Legend = ({ color, children }: { color: string; children: string }) => (
  <span className="flex items-center" style={{ gap: 4 }}>
    <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: color }} />
    <Caption>{children}</Caption>
  </span>
);

/* Digital: set share of time, tick donors until every period is covered */
function DigitalDonors({
  frame: f, period, choice, onChoice,
}: {
  frame: SwapFrame; period: Period; choice: FrameChoice; onChoice: (c: FrameChoice) => void;
}) {
  const occ = activeOccupants(f, period);
  const segs = coverage(f, period, choice.need, choice.donors);
  const covered = Math.min(...segs.map((s) => s.covered));
  const full = covered >= choice.need;
  const total = daysIn(period);
  const pos = (p: Period) => ({
    left: `${((daysIn({ start: period.start, end: p.start }) - 1) / total) * 100}%`,
    width: `${(daysIn(p) / total) * 100}%`,
  });
  const soldOut = coverage(f, period, choice.need, []).every((s) => s.covered === 0);
  const maxSlots = (f.slots ?? 0) - (f.lockedSlots ?? 0);
  const setNeed = (n: number) => onChoice({ ...choice, need: Math.max(1, Math.min(maxSlots, n)) });
  const toggle = (id: string) =>
    onChoice({ ...choice, donors: choice.donors.includes(id) ? choice.donors.filter((d) => d !== id) : [...choice.donors, id] });
  const mid = new Date(period.start.getTime() + (period.end.getTime() - period.start.getTime()) / 2);

  return (
    <div className="flex flex-col" style={{ gap: 12 }}>
      <div className="flex items-center justify-between" style={{ gap: 8 }}>
        <span className="flex flex-col">
          <Title size="sm">Share of time needed</Title>
          <Caption>{soldOut ? `All ${f.slots} slots are sold for ${fmtShort(period)}` : `${f.slots} slots, some free for ${fmtShort(period)}`}</Caption>
        </span>
        <span className="flex items-center" style={{ gap: 6 }}>
          <span className="flex items-center" style={{ border: `1px solid ${BORDER}`, borderRadius: "var(--radius)", backgroundColor: "#fff" }}>
            <StepBtn label="Fewer slots" onClick={() => setNeed(choice.need - 1)} disabled={choice.need <= 1}><Minus size={12} /></StepBtn>
            <output aria-live="polite" style={{ width: 24, textAlign: "center", fontFamily: "'Inter', sans-serif", fontVariantNumeric: "tabular-nums", fontSize: 13, color: FG }}>{choice.need}</output>
            <StepBtn label="More slots" onClick={() => setNeed(choice.need + 1)} disabled={choice.need >= maxSlots}><Plus size={12} /></StepBtn>
          </span>
          <Caption>of {f.slots} slots</Caption>
        </span>
      </div>

      <div className="flex flex-col" style={{ gap: 6 }}>
        <div className="flex items-center justify-between">
          <Micro>Taking from</Micro>
          <Caption>Tick donors until covered</Caption>
        </div>
        {occ.map((o) => {
          const on = choice.donors.includes(o.donorId);
          return (
            <label
              key={o.donorId}
              className="flex items-start cursor-pointer"
              style={{ gap: 8, padding: 10, borderRadius: 8, border: `1px solid ${on ? "rgba(44,36,195,0.4)" : BORDER}`, backgroundColor: on ? "rgba(44,36,195,0.04)" : "#fff" }}
            >
              <span style={{ marginTop: 2 }}><Checkbox checked={on} onChange={() => toggle(o.donorId)} label={`Take from ${o.donor.name}`} /></span>
              <span className="flex flex-col flex-1 min-w-0" style={{ gap: 3 }}>
                <span className="flex items-center justify-between" style={{ gap: 6 }}>
                  <span className="flex items-center" style={{ gap: 6 }}>
                    <Title size="sm">{o.donor.name}</Title>
                    {o.donor.live && <Chip tone="success">Live</Chip>}
                  </span>
                  <Mono size={11} color={FG2}>{o.slots} of {f.slots} slots</Mono>
                </span>
                <Caption>{o.donor.advertiser} · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtShort(o.donor.run)}</span></Caption>
                <span aria-hidden="true" className="relative block" style={{ height: 6, marginTop: 2, borderRadius: 99, backgroundColor: "rgba(19,18,33,0.06)" }}>
                  <span className="absolute" style={{ top: 0, bottom: 0, borderRadius: 99, backgroundColor: on ? "#2c24c3" : "#a3a2ad", ...pos(o.released) }} />
                </span>
              </span>
            </label>
          );
        })}
        <div className="flex justify-between" aria-hidden="true" style={{ paddingLeft: 34 }}>
          <Caption>{fmtShort({ start: period.start, end: period.start })}</Caption>
          <Caption>{fmtShort({ start: mid, end: mid })}</Caption>
          <Caption>{fmtShort({ start: period.end, end: period.end })}</Caption>
        </div>
      </div>

      <div role="status" aria-live="polite" className="flex flex-col" style={{ gap: 6, padding: 10, borderRadius: 8, backgroundColor: "rgba(19,18,33,0.03)" }}>
        <div className="flex items-center justify-between">
          <Title size="sm">{covered} of {choice.need} slots covered</Title>
          <Chip tone={full ? "success" : "warning"}>{full ? "Covered" : "Not covered"}</Chip>
        </div>
        <div className="flex" style={{ gap: 3 }}>
          {segs.map((s) => (
            <span key={s.period.start.getTime()} className="block overflow-hidden" style={{ height: 8, borderRadius: 99, backgroundColor: "rgba(19,18,33,0.08)", flex: daysIn(s.period) }}>
              <span className="block h-full" style={{ width: `${(s.covered / choice.need) * 100}%`, borderRadius: 99, backgroundColor: s.covered >= choice.need ? "#12a05c" : "#d99a06", transition: "width 0.2s" }} />
            </span>
          ))}
        </div>
        <Caption>
          {segs.map((s, i) => (
            <span key={i}>{i ? " · " : ""}{fmtShort(s.period)}: <span style={{ fontVariantNumeric: "tabular-nums" }}>{s.covered} of {choice.need}</span></span>
          ))}
        </Caption>
      </div>
    </div>
  );
}

const StepBtn = ({ children, label, onClick, disabled }: { children: React.ReactNode; label: string; onClick: () => void; disabled?: boolean }) => (
  <button type="button" aria-label={label} onClick={onClick} disabled={disabled} className="flex items-center justify-center cursor-pointer border-none bg-transparent disabled:opacity-30 disabled:cursor-not-allowed" style={{ width: 26, height: 26, color: "#2c24c3" }}>
    {children}
  </button>
);
