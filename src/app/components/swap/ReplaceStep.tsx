import { useMemo, useState } from "react";
import { CircleCheck, MapPin, Search } from "lucide-react";
import {
  CANDIDATES, Candidate, Period, ReplacementSlot, fmtDistance, fmtEur, fmtNum, fmtShort, fold,
} from "./swapData";
import { FilterBar, FilterConfig, Filters, passesFilters } from "./SwapFilters";
import { BORDER, Btn, Caption, Card, Chip, FG, FG2, Micro, Mono, SearchField, TINT, Title } from "./swapUi";

/* Step 3 — one replacement per donor that gives up a frame (flow 13–15) */
export function ReplaceStep({
  period, slots, chosen, activeKey, onOpen, onChoose, excluded,
}: {
  period: Period;
  slots: ReplacementSlot[];
  chosen: Record<string, Candidate>;
  activeKey: string | null;
  onOpen: (key: string | null) => void;
  onChoose: (key: string, c: Candidate) => void;
  /** Frame IDs that can't be offered: acquired frames */
  excluded: string[];
}) {
  const count = slots.filter((s) => chosen[s.key]).length;
  const active = slots.find((s) => s.key === activeKey);

  if (active) {
    return (
      <FindReplacement
        slot={active}
        count={count}
        total={slots.length}
        taken={[...excluded, ...Object.entries(chosen).filter(([k]) => k !== active.key).map(([, c]) => c.id)]}
        current={chosen[active.key]}
        onChoose={(c) => { onChoose(active.key, c); onOpen(null); }}
      />
    );
  }

  if (!slots.length) {
    return (
      <div className="flex flex-col" style={{ gap: 8 }}>
        <Title>Choose replacements</Title>
        <Caption>None of the selected frames come from another campaign, so no replacements are needed. Continue to review.</Caption>
      </div>
    );
  }

  const groups = slots.reduce<{ frameId: string; slots: ReplacementSlot[] }[]>((acc, s) => {
    const g = acc.find((x) => x.frameId === s.frame.id);
    if (g) g.slots.push(s); else acc.push({ frameId: s.frame.id, slots: [s] });
    return acc;
  }, []);

  return (
    <div className="flex flex-col" style={{ gap: 12 }}>
      <div className="flex items-center justify-between">
        <Title>Choose replacements</Title>
        <Chip tone={count === slots.length ? "success" : "warning"}>{count} of {slots.length} chosen</Chip>
      </div>
      {count < slots.length && (
        <Caption>Each donor that gives up a frame gets a replacement for the released dates. It inherits the price of the frame it replaces.</Caption>
      )}
      {groups.map((g) => {
        const f = g.slots[0].frame;
        return (
          <section key={g.frameId} aria-label={`Acquiring ${f.id}`} className="flex flex-col" style={{ borderRadius: 12, border: `1px solid ${BORDER}`, backgroundColor: "#fff", overflow: "hidden" }}>
            <div className="flex flex-col" style={{ gap: 2, padding: "10px 12px", backgroundColor: "rgba(19,18,33,0.03)", borderBottom: "1px solid rgba(19,18,33,0.07)" }}>
              <Micro>Acquiring</Micro>
              <Mono>{f.id}</Mono>
              <Caption>{f.address} · {f.format} · {f.media}</Caption>
            </div>
            {g.slots.map((s, i) => {
              const c = chosen[s.key];
              return (
                <div key={s.key} className="flex flex-col" style={{ gap: 8, padding: 12, borderTop: i ? "1px solid rgba(19,18,33,0.07)" : "none" }}>
                  <div className="flex items-start justify-between" style={{ gap: 8 }}>
                    <span className="flex flex-col" style={{ gap: 1 }}>
                      <Caption>From</Caption>
                      <Title size="sm">{s.donor.name}</Title>
                      <Caption>{s.donor.advertiser} · releases <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtShort(s.released)}</span></Caption>
                    </span>
                    {s.donor.live && <Chip tone="success">Live</Chip>}
                  </div>
                  {c ? (
                    <div className="flex items-start" style={{ gap: 8, padding: 10, borderRadius: 8, backgroundColor: "rgba(18,160,92,0.06)", border: "1px solid rgba(18,160,92,0.25)" }}>
                      <CircleCheck size={16} color="#12a05c" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span className="flex flex-col flex-1 min-w-0" style={{ gap: 1 }}>
                        <Caption>Replacement</Caption>
                        <Mono>{c.id}</Mono>
                        <Caption color={FG2}>{c.address.replace(", Madrid", "")} · {c.format}{c.slotsLabel ? ` · ${c.slotsLabel}` : ""} · {fmtDistance(c.distanceM)} away</Caption>
                        <Caption>Inherits <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtEur(s.price)}</span> · tagged as swap</Caption>
                      </span>
                      <Btn variant="ghost" size="sm" onClick={() => onOpen(s.key)} ariaLabel={`Change replacement for ${s.donor.name}`}>Change</Btn>
                    </div>
                  ) : (
                    <div className="flex flex-col" style={{ gap: 6, padding: 10, borderRadius: 8, border: `1px dashed rgba(19,18,33,0.2)` }}>
                      <div className="flex items-center justify-between">
                        <Title size="sm">Replacement</Title>
                        <Chip tone="brand">Required</Chip>
                      </div>
                      <Caption>Replacement inherits <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtEur(s.price)}</span> from the frame it replaces</Caption>
                      <span>
                        <Btn size="sm" iconStart={<Search size={13} aria-hidden="true" />} onClick={() => onOpen(s.key)} ariaLabel={`Find replacement for ${s.donor.name}`}>Find replacement</Btn>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        );
      })}
      {count === slots.length && <Caption>All replacements chosen. Review the swap before confirming.</Caption>}
    </div>
  );
}

/* Inline search scoped to the donor's criteria and released dates (flow 14) */
function FindReplacement({
  slot, count, total, taken, current, onChoose,
}: {
  slot: ReplacementSlot;
  count: number;
  total: number;
  taken: string[];
  current?: Candidate;
  onChoose: (c: Candidate) => void;
}) {
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  // Only frames free for the whole released period can be chosen, so only those are shown
  const all = (CANDIDATES[slot.key] ?? []).filter((c) => !taken.includes(c.id) && (!c.freeFrom || c.freeFrom <= slot.released.start));
  const config: FilterConfig[] = [
    { id: "format", label: "Format", options: [...new Set(all.map((c) => c.format))] },
    { id: "mediaType", label: "Media Type", options: [...new Set(all.map((c) => c.media))] },
  ];
  const pool = useMemo(
    () => all
      .filter((c) => passesFilters(filters, { format: [c.format], mediaType: [c.media] }))
      .filter((c) => !q || fold(`${c.id} ${c.address}`).includes(fold(q)))
      .sort((a, b) => a.distanceM - b.distanceM),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slot.key, taken.join(), q, filters],
  );
  const best = pool[0];

  return (
    <div className="flex flex-col" style={{ gap: 12 }}>
      <div className="flex items-center justify-between">
        <Title>Find a replacement</Title>
        <Chip tone={count === total ? "success" : "warning"}>{count} of {total} chosen</Chip>
      </div>
      <div className="flex flex-col" style={{ gap: 2, padding: 12, borderRadius: 12, backgroundColor: TINT, border: "1px solid rgba(44,36,195,0.18)" }}>
        <Micro>Replacement for</Micro>
        <Title size="sm">{slot.donor.name} · {slot.donor.advertiser}</Title>
        <Caption>
          Losing <Mono size={11} color="inherit">{slot.frame.id}</Mono> · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtShort(slot.released)}</span> · inherits {fmtEur(slot.price)}
        </Caption>
      </div>
      <SearchField value={q} onChange={setQ} placeholder="Search replacement frames" />
      <FilterBar config={config} filters={filters} onChange={setFilters} />
      <Caption>Matches the donor's criteria · nearest first</Caption>
      {!pool.length && <Caption>No frames match. Clear the search or filters to see every candidate.</Caption>}
      {pool.map((c) => {
        const isBest = c === best;
        const isCurrent = current?.id === c.id;
        return (
          <Card key={c.id} highlighted={isBest && !isCurrent} selected={isCurrent}>
            <div className="flex items-center justify-between" style={{ gap: 8 }}>
              <Mono>{c.id}</Mono>
              <Chip tone="success">Available</Chip>
            </div>
            <span style={{ fontSize: "var(--text-sm)", lineHeight: "18px", color: FG }}>
              {c.address} · {c.format}{c.slotsLabel ? ` · ${c.slotsLabel}` : ""}
            </span>
            <span className="flex items-center" style={{ gap: 4 }}>
              <MapPin size={12} color="#7c7b87" aria-hidden="true" />
              <Caption><span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtDistance(c.distanceM)}</span> from removed frame · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtNum(c.impressions)}</span> imp.</Caption>
            </span>
            <div className="flex items-center justify-between" style={{ gap: 8, marginTop: 2 }}>
              <Caption color={FG2}>Free for all of {fmtShort(slot.released)}</Caption>
              {isCurrent ? (
                <Chip tone="success">Chosen</Chip>
              ) : (
                <Btn size="sm" variant={isBest ? "primary" : "secondary"} onClick={() => onChoose(c)} ariaLabel={`Choose ${c.id}`}>Choose</Btn>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
