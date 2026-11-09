import { ArrowRight } from "lucide-react";
import {
  Candidate, DEAL_LINE, FrameChoice, Metrics, Period, ReplacementSlot, TARGETS, activeOccupants, defaultChoice, fmtEur,
  fmtMid, fmtMillions, fmtNum, fmtShort, frameById,
} from "./swapData";
import { BORDER, Caption, Chip, FG, FG2, Mono, Title } from "./swapUi";

export function reviewCounts(ids: string[], slots: ReplacementSlot[]) {
  const donors = new Set(slots.map((s) => s.donor.id));
  return { frames: ids.length, donors: donors.size, replacements: slots.length };
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/* Step 4 — summary before the only commit point (flow 16) */
export function ReviewStep({
  period, ids, choices, slots, chosen, before, after,
}: {
  period: Period;
  ids: string[];
  choices: Record<string, FrameChoice>;
  slots: ReplacementSlot[];
  chosen: Record<string, Candidate>;
  before: Metrics;
  after: Metrics;
}) {
  const free = ids.filter((id) => !activeOccupants(frameById(id)!, period).length);

  const tiles = [
    { label: "Frames", b: fmtNum(before.frames), a: fmtNum(after.frames), t: fmtNum(TARGETS.frames), met: after.frames >= TARGETS.frames },
    { label: "Impressions", b: fmtMillions(before.impressions), a: fmtMillions(after.impressions), t: fmtMillions(TARGETS.impressions), met: after.impressions >= TARGETS.impressions },
    { label: "Budget", b: fmtEur(before.budget), a: fmtEur(after.budget), t: fmtEur(TARGETS.budget), met: after.budget >= TARGETS.budget },
  ];

  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      <div className="flex flex-col" style={{ gap: 2 }}>
        <Title>Review swap</Title>
        <span style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: FG2 }}>
          {plural(ids.length, "frame")} for {DEAL_LINE.name} · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtMid(period)}</span>
        </span>
      </div>

      <div style={{ borderRadius: 12, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "var(--text-sm)" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(19,18,33,0.03)" }}>
              {["Frame acquired", "From", "Replacement", "Price inherited"].map((h, i) => (
                <th key={h} scope="col" style={{ textAlign: i === 3 ? "right" : "left", padding: "8px 12px", fontSize: "var(--text-xs)", lineHeight: "16px", fontWeight: "var(--font-weight-medium)", color: "#7c7b87" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((s) => {
              const c = chosen[s.key];
              return (
                <tr key={s.key} style={{ borderTop: "1px solid rgba(19,18,33,0.07)", verticalAlign: "top" }}>
                  <Td><Mono size={11}>{s.frame.id}</Mono><Caption>{s.frame.address.replace(", Madrid", "")} · {s.frame.media === "Digital" ? `${(choices[s.frame.id] ?? defaultChoice()).need} of ${s.frame.slots} slots` : s.frame.format}</Caption></Td>
                  <Td>
                    <span className="flex items-center" style={{ gap: 6 }}><span style={{ fontWeight: "var(--font-weight-medium)", color: FG }}>{s.donor.name}</span>{s.donor.live && <Chip tone="success">Live</Chip>}</span>
                    <Caption>{s.donor.advertiser} · <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmtShort(s.released)}</span></Caption>
                  </Td>
                  <Td><Mono size={11}>{c?.id ?? "—"}</Mono><Caption>{c ? `${c.address.replace(", Madrid", "")} · ${c.slotsLabel ?? c.format}` : "Not chosen"}</Caption></Td>
                  <Td right><span style={{ fontVariantNumeric: "tabular-nums", color: FG }}>{fmtEur(s.price)}</span></Td>
                </tr>
              );
            })}
            {free.map((id) => {
              const f = frameById(id)!;
              return (
                <tr key={id} style={{ borderTop: "1px solid rgba(19,18,33,0.07)", verticalAlign: "top" }}>
                  <Td><Mono size={11}>{f.id}</Mono><Caption>{f.address.replace(", Madrid", "")} · {f.format}</Caption></Td>
                  <Td><span style={{ color: FG }}>Available inventory</span><Caption>No donor</Caption></Td>
                  <Td><Caption>Not needed</Caption></Td>
                  <Td right><Caption>—</Caption></Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col" style={{ gap: 8 }}>
        <Title size="sm">{DEAL_LINE.name} against targets</Title>
        <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {tiles.map((t) => (
            <div key={t.label} className="flex flex-col" style={{ gap: 4, padding: 12, borderRadius: 12, border: `1px solid ${BORDER}`, backgroundColor: "#fff" }}>
              <div className="flex items-center justify-between">
                <Caption>{t.label}</Caption>
                <Chip tone={t.met ? "success" : "warning"}>{t.met ? "Met" : "Short"}</Chip>
              </div>
              <div className="flex items-center" style={{ gap: 6, fontVariantNumeric: "tabular-nums" }}>
                <span style={{ fontSize: "var(--text-sm)", color: "#7c7b87" }}>{t.b}</span>
                <ArrowRight size={12} color="#7c7b87" aria-hidden="true" />
                <span style={{ fontSize: "var(--text-lg)", lineHeight: "26px", fontWeight: 700, color: FG }}>{t.a}</span>
              </div>
              <Caption>Target <span style={{ fontVariantNumeric: "tabular-nums" }}>{t.t}</span></Caption>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const Td = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
  <td style={{ padding: "10px 12px", textAlign: right ? "right" : "left" }}>
    <span className="flex flex-col" style={{ gap: 2, alignItems: right ? "flex-end" : "flex-start" }}>{children}</span>
  </td>
);

