/* ─────────────────────────────────────────────
   Swap MVP — mock data and pure helpers.
   Data mirrors the "Swap — MVP happy path" flow (DSM · Spain).
───────────────────────────────────────────── */

/* ── Dates ─────────────────────────────────── */
export interface Period { start: Date; end: Date } // inclusive, local midnight

export const day = (y: number, m: number, d: number) => new Date(y, m - 1, d);
const DAY_MS = 86_400_000;
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function daysIn(p: Period) {
  return Math.round((p.end.getTime() - p.start.getTime()) / DAY_MS) + 1;
}
export function overlap(a: Period, b: Period): Period | null {
  const start = a.start > b.start ? a.start : b.start;
  const end = a.end < b.end ? a.end : b.end;
  return start <= end ? { start, end } : null;
}
export function samePeriod(a: Period | null, b: Period | null) {
  return !!a && !!b && a.start.getTime() === b.start.getTime() && a.end.getTime() === b.end.getTime();
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/** Parts of `p` not covered by any of `taken` */
export function gaps(p: Period, taken: Period[]): Period[] {
  const parts = taken.map((t) => overlap(t, p)).filter(Boolean) as Period[];
  parts.sort((a, b) => a.start.getTime() - b.start.getTime());
  const out: Period[] = [];
  let cursor = p.start;
  for (const t of parts) {
    if (t.start > cursor) out.push({ start: cursor, end: addDays(t.start, -1) });
    if (t.end >= cursor) cursor = addDays(t.end, 1);
  }
  if (cursor <= p.end) out.push({ start: cursor, end: p.end });
  return out;
}

/** "1–15 Jul" · "16 Jul – 31 Aug" */
export function fmtShort(p: Period) {
  const sm = MON[p.start.getMonth()], em = MON[p.end.getMonth()];
  if (p.start.getMonth() === p.end.getMonth() && p.start.getFullYear() === p.end.getFullYear()) {
    return p.start.getDate() === p.end.getDate()
      ? `${p.start.getDate()} ${sm}`
      : `${p.start.getDate()}–${p.end.getDate()} ${sm}`;
  }
  return `${p.start.getDate()} ${sm} – ${p.end.getDate()} ${em}`;
}
/** "1 Jul – 31 Jul 2026" */
export function fmtMid(p: Period) {
  return `${p.start.getDate()} ${MON[p.start.getMonth()]} – ${p.end.getDate()} ${MON[p.end.getMonth()]} ${p.end.getFullYear()}`;
}
/** "1 Jul 2026 – 31 Jul 2026" */
export function fmtLong(p: Period) {
  const f = (d: Date) => `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`;
  return `${f(p.start)} – ${f(p.end)}`;
}
export const monthLabel = (m: number) => MON[m];

/* ── Numbers ───────────────────────────────── */
export const fmtNum = (n: number) => n.toLocaleString("en-US");
export const fmtEur = (n: number) => `€${Math.round(n).toLocaleString("en-US")}`;
export const fmtMillions = (n: number) => `${parseFloat((n / 1_000_000).toFixed(2))}M`;
export const fmtDistance = (m: number) => (m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${m} m`);

/* ── Prototype version: ?v=2 shows the next phase (suggested frames) ── */
export const SWAP_VERSION: 1 | 2 =
  typeof window !== "undefined" && new URLSearchParams(window.location.search).get("v") === "2" ? 2 : 1;

/* ── Campaign + deal line ──────────────────── */
export const CAMPAIGN = {
  name: "Campaña Verano Refrescos 2026",
  advertiser: "Mahou",
  market: "Madrid",
};
export const FORMATS = ["6-Sheet", "48-Sheet", "96-Sheet", "Mupi"];
export const MEDIA_TYPES = ["Digital", "Paper"];
export const DEAL_LINE = {
  name: "Deal line 1",
  period: { start: day(2026, 7, 1), end: day(2026, 7, 31) } as Period,
  /** Deal line filters, pre-selected in swap */
  criteria: { format: ["6-Sheet", "48-Sheet", "Mupi"], mediaType: ["Digital", "Paper"] },
};

export interface Metrics { frames: number; impressions: number; budget: number }
export const TARGETS: Metrics = { frames: 120, impressions: 2_400_000, budget: 85_000 };
export const INITIAL_METRICS: Metrics = { frames: 117, impressions: 2_210_000, budget: 81_280 };

/* ── Donor campaigns ───────────────────────── */
export interface Donor { id: string; name: string; advertiser: string; code: string; run: Period; live?: boolean }
export const DONORS: Record<string, Donor> = {
  galaxy: { id: "galaxy", name: "Lanzamiento Galaxy S26", advertiser: "Samsung", code: "SA1G150626", run: { start: day(2026, 6, 15), end: day(2026, 9, 15) }, live: true },
  rebajas: { id: "rebajas", name: "Rebajas Verano", advertiser: "El Corte Inglés", code: "EC1R010726", run: { start: day(2026, 7, 1), end: day(2026, 7, 15) } },
  movistar: { id: "movistar", name: "Campaña Movistar+", advertiser: "Telefónica", code: "TE1M160726", run: { start: day(2026, 7, 16), end: day(2026, 8, 31) } },
  madcool: { id: "madcool", name: "Mad Cool Festival", advertiser: "Live Nation", code: "LN1F200626", run: { start: day(2026, 6, 20), end: day(2026, 8, 10) } },
};

/* ── Frames ────────────────────────────────── */
export type FrameStatus = "Available" | "Occupied" | "Partially occupied" | "Not matching";

export interface Occupant {
  donorId: string;
  /** Digital only: slots this donor holds */
  slots?: number;
  /** Price the replacement inherits when the full swap period overlaps as drawn in the flow */
  inherits: number;
}

export interface SwapFrame {
  id: string;
  address: string;
  area: string;
  lat: number;
  lng: number;
  format: string;
  media: "Paper" | "Digital";
  size: string;
  /** Paper: per frame. Digital: per slot */
  impressions: number;
  /** Paper: per frame for the deal line. Digital: per slot */
  price: number;
  /** Digital only */
  slots?: number;
  /** Digital only: slots sold to campaigns that can't be swapped */
  lockedSlots?: number;
  occupants: Occupant[];
  tags: string[];
  notMatching?: string;
}

export const FRAMES: SwapFrame[] = [
  { id: "ES-MAD-GV-00123.D1.01", address: "Gran Vía 32, Madrid", area: "gv", lat: 40.4200, lng: -3.7040, format: "Mupi", media: "Paper", size: "1.2 × 1.75 m", impressions: 82_000, price: 1_240,
    tags: ["High Traffic", "Premium"], occupants: [{ donorId: "galaxy", inherits: 1_240 }] },
  { id: "ES-MAD-PS-00456.D2.02", address: "Puerta del Sol 7, Madrid", area: "sol", lat: 40.4168, lng: -3.7030, format: "Mupi", media: "Digital", size: "6 slots", impressions: 32_000, price: 740, slots: 6, lockedSlots: 2,
    tags: ["High Traffic", "Transport Hub"], occupants: [{ donorId: "rebajas", slots: 2, inherits: 740 }, { donorId: "movistar", slots: 2, inherits: 740 }, { donorId: "galaxy", slots: 2, inherits: 1_480 }] },
  { id: "ES-MAD-PC-00321.D1.01", address: "Paseo de la Castellana 89, Madrid", area: "cas", lat: 40.4465, lng: -3.6915, format: "6-Sheet", media: "Paper", size: "1.2 × 1.8 m", impressions: 64_000, price: 1_000,
    tags: ["Premium"], occupants: [{ donorId: "rebajas", inherits: 520 }] },
  { id: "ES-MAD-PC-00330.D1.01", address: "Paseo de la Castellana 120, Madrid", area: "cas", lat: 40.4530, lng: -3.6905, format: "48-Sheet", media: "Paper", size: "6.1 × 3.05 m", impressions: 58_000, price: 1_850, tags: ["Premium", "Local"], occupants: [] },
  { id: "ES-MAD-GV-00140.D1.02", address: "Gran Vía 61, Madrid", area: "gv", lat: 40.4228, lng: -3.7110, format: "6-Sheet", media: "Paper", size: "1.2 × 1.8 m", impressions: 51_500, price: 980, tags: ["High Traffic"], occupants: [] },
  { id: "ES-MAD-GV-00131.D1.01", address: "Gran Vía 47, Madrid", area: "gv", lat: 40.4215, lng: -3.7085, format: "Mupi", media: "Paper", size: "1.2 × 1.75 m", impressions: 79_500, price: 1_180, tags: ["High Traffic", "Premium"], occupants: [] },
  { id: "ES-BCN-GV-00789.D1.01", address: "Gran Via de les Corts Catalanes 585, Barcelona", area: "bcn", lat: 41.3860, lng: 2.1640, format: "96-Sheet", media: "Paper", size: "12.2 × 3.05 m", impressions: 96_000, price: 3_200, tags: ["Premium"], occupants: [],
    notMatching: "outside the deal line location (Madrid)" },
  { id: "ES-MAD-PS-00461.D2.01", address: "Calle Mayor 1, Madrid", area: "sol", lat: 40.4160, lng: -3.7055, format: "Mupi", media: "Digital", size: "6 slots", impressions: 30_000, price: 700, slots: 6, lockedSlots: 2,
    tags: ["Local"], occupants: [{ donorId: "movistar", slots: 4, inherits: 1_400 }] },
  { id: "ES-MAD-AT-00215.D1.01", address: "Glorieta de Atocha, Madrid", area: "ato", lat: 40.4070, lng: -3.6905, format: "48-Sheet", media: "Paper", size: "6.1 × 3.05 m", impressions: 69_000, price: 1_620,
    tags: ["Transport Hub"], occupants: [{ donorId: "madcool", inherits: 1_620 }] },
  { id: "ES-MAD-PE-00610.D1.01", address: "Plaza de España 2, Madrid", area: "gv", lat: 40.4235, lng: -3.7125, format: "96-Sheet", media: "Paper", size: "12.2 × 3.05 m", impressions: 92_000, price: 2_900, tags: ["Premium", "High Traffic"], occupants: [] },
  { id: "ES-MAD-SA-00520.D1.01", address: "Calle de Goya 14, Madrid", area: "sal", lat: 40.4245, lng: -3.6845, format: "Mupi", media: "Paper", size: "1.2 × 1.75 m", impressions: 55_400, price: 1_060, tags: ["Local", "Premium"], occupants: [] },
];
export const frameById = (id: string) => FRAMES.find((f) => f.id === id);

/* ── V2: smart suggestions ranked against the deal line criteria ──
   Scores and reasons are mocked; in product they come from the matching service. */
export interface Suggestion { frameId: string; score: number; postcode: string; reasons: string[] }
export const SUGGESTIONS: Suggestion[] = [
  { frameId: "ES-MAD-GV-00123.D1.01", score: 98, postcode: "28013", reasons: ["Format and media type match the deal line", "Audience fit: 18–34, high footfall", "Free from Galaxy S26 for all of 1–31 Jul"] },
  { frameId: "ES-MAD-GV-00131.D1.01", score: 94, postcode: "28013", reasons: ["Format and media type match the deal line", "Audience fit: 18–34", "Available for all of 1–31 Jul"] },
  { frameId: "ES-MAD-PC-00321.D1.01", score: 89, postcode: "28046", reasons: ["Media type matches the deal line", "Premium business district", "Partly free; the rest comes from Rebajas Verano"] },
  { frameId: "ES-MAD-SA-00520.D1.01", score: 85, postcode: "28001", reasons: ["Format and media type match the deal line", "Audience fit: 25–44, high income", "Available for all of 1–31 Jul"] },
  { frameId: "ES-MAD-PS-00456.D2.02", score: 82, postcode: "28013", reasons: ["Digital share of time adds impressions", "Transport hub, very high footfall", "Slots come from three campaigns"] },
];

/* Typeahead locations — counts are inventory totals for the market */
export const LOCATIONS = [
  { area: "gv", label: "Gran Vía, Madrid", count: 46 },
  { area: "gv", label: "Gran Vía / Callao, Madrid", count: 12 },
  { area: "sol", label: "Puerta del Sol, Madrid", count: 31 },
  { area: "cas", label: "Paseo de la Castellana, Madrid", count: 58 },
  { area: "ato", label: "Atocha, Madrid", count: 22 },
  { area: "sal", label: "Salamanca, Madrid", count: 40 },
];

/* Upload list: the template round-trips to the flow's "8 frames found" */
export const TEMPLATE_ROWS = [
  "ES-MAD-GV-00123.D1.01",
  "ES-MAD-PS-00456.D2.02",
  "ES-MAD-PC-00321.D1.01",
  "ES-MAD-PC-00330.D1.01",
  "ES-MAD-GV-00140.D1.02",
  "ES-MAD-GV-0012",
  "ES-MAD-PS-00461.D2.01",
  "ES-MAD-AT-00215.D1.01",
  "ES-MAD-SA-00520.D1.01",
];

/* ── Replacement candidates, per (acquired frame, donor) ── */
export interface Candidate {
  id: string;
  address: string;
  format: string;
  media: "Paper" | "Digital";
  slotsLabel?: string;
  distanceM: number;
  impressions: number;
  /** Absent = free for the whole released period; otherwise free from this date only */
  freeFrom?: Date;
}
export const slotKey = (frameId: string, donorId: string) => `${frameId}::${donorId}`;

const PAPER_MUPI_GV: Candidate[] = [
  { id: "ES-MAD-GV-00131.D1.01", address: "Gran Vía 47, Madrid", format: "Mupi", media: "Paper", distanceM: 180, impressions: 79_500 },
  { id: "ES-MAD-GV-00135.D1.01", address: "Calle de Alcalá 2, Madrid", format: "Mupi", media: "Paper", distanceM: 420, impressions: 74_200 },
  { id: "ES-MAD-CA-00222.D1.01", address: "Plaza del Callao 4, Madrid", format: "Mupi", media: "Paper", distanceM: 650, impressions: 88_100, freeFrom: day(2026, 7, 8) },
  { id: "ES-MAD-ML-00340.D1.01", address: "Calle de Fuencarral 70, Madrid", format: "Mupi", media: "Paper", distanceM: 1_100, impressions: 61_800 },
];
const DIGITAL_SOL: Candidate[] = [
  { id: "ES-MAD-PS-00461.D2.01", address: "Calle Mayor 1, Madrid", format: "Mupi", media: "Digital", slotsLabel: "2 slots", distanceM: 220, impressions: 60_000 },
  { id: "ES-MAD-PS-00463.D2.02", address: "Calle de Preciados 9, Madrid", format: "Mupi", media: "Digital", slotsLabel: "2 slots", distanceM: 260, impressions: 58_400 },
  { id: "ES-MAD-PS-00470.D2.01", address: "Calle del Arenal 12, Madrid", format: "Mupi", media: "Digital", slotsLabel: "2 slots", distanceM: 380, impressions: 51_200 },
  { id: "ES-MAD-PS-00474.D2.02", address: "Calle del Carmen 21, Madrid", format: "Mupi", media: "Digital", slotsLabel: "2 slots", distanceM: 540, impressions: 49_900, freeFrom: day(2026, 7, 20) },
];

export const CANDIDATES: Record<string, Candidate[]> = {
  [slotKey("ES-MAD-GV-00123.D1.01", "galaxy")]: PAPER_MUPI_GV,
  [slotKey("ES-MAD-PS-00456.D2.02", "rebajas")]: DIGITAL_SOL,
  [slotKey("ES-MAD-PS-00456.D2.02", "movistar")]: DIGITAL_SOL,
  [slotKey("ES-MAD-PS-00456.D2.02", "galaxy")]: DIGITAL_SOL,
  [slotKey("ES-MAD-PS-00461.D2.01", "movistar")]: DIGITAL_SOL,
  [slotKey("ES-MAD-PC-00321.D1.01", "rebajas")]: [
    { id: "ES-MAD-PC-00318.D1.01", address: "Paseo de la Castellana 77, Madrid", format: "6-Sheet", media: "Paper", distanceM: 350, impressions: 61_200 },
    { id: "ES-MAD-PC-00342.D1.01", address: "Calle de Raimundo Fernández Villaverde 30, Madrid", format: "6-Sheet", media: "Paper", distanceM: 520, impressions: 57_800 },
    { id: "ES-MAD-CH-00702.D1.01", address: "Glorieta de Quevedo, Madrid", format: "6-Sheet", media: "Paper", distanceM: 1_400, impressions: 44_100, freeFrom: day(2026, 7, 10) },
  ],
  [slotKey("ES-MAD-AT-00215.D1.01", "madcool")]: [
    { id: "ES-MAD-AT-00210.D1.01", address: "Paseo del Prado 40, Madrid", format: "48-Sheet", media: "Paper", distanceM: 300, impressions: 66_500 },
    { id: "ES-MAD-AT-00228.D1.01", address: "Calle de Méndez Álvaro 12, Madrid", format: "48-Sheet", media: "Paper", distanceM: 900, impressions: 58_300 },
  ],
};

/* ── Derived frame state for a swap period ── */
export function activeOccupants(f: SwapFrame, period: Period) {
  return f.occupants
    .map((o) => ({ ...o, donor: DONORS[o.donorId], released: overlap(DONORS[o.donorId].run, period) }))
    .filter((o): o is typeof o & { released: Period } => !!o.released);
}

export function frameStatus(f: SwapFrame, period: Period): FrameStatus {
  if (f.notMatching) return "Not matching";
  const occ = activeOccupants(f, period);
  if (!occ.length) return "Available";
  return gaps(period, occ.map((o) => o.released)).length ? "Partially occupied" : "Occupied";
}

export type ChipTone = "info" | "warning" | "danger" | "success" | "brand" | "neutral";
export const statusTone = (s: FrameStatus): ChipTone =>
  s === "Available" ? "success" : s === "Not matching" ? "danger" : "neutral";
/** Sort weight: available first, occupied last */
export const statusRank = (s: FrameStatus) =>
  s === "Available" ? 0 : s === "Partially occupied" ? 1 : s === "Occupied" ? 2 : 3;

/** Inherited price, scaled if the swap period was narrowed from the deal line */
export function inheritedPrice(o: Occupant, period: Period) {
  const donor = DONORS[o.donorId];
  const full = overlap(donor.run, DEAL_LINE.period);
  const now = overlap(donor.run, period);
  if (!full || !now) return 0;
  return Math.round((o.inherits * daysIn(now)) / daysIn(full));
}

/* Digital share-of-time coverage, split at donor boundaries */
export interface Segment { period: Period; covered: number }
export function coverage(f: SwapFrame, period: Period, need: number, ticked: string[]): Segment[] {
  const occ = activeOccupants(f, period);
  const cuts = new Set<number>([period.start.getTime()]);
  occ.forEach((o) => {
    cuts.add(o.released.start.getTime());
    const after = addDays(o.released.end, 1);
    if (after <= period.end) cuts.add(after.getTime());
  });
  const starts = [...cuts].sort((a, b) => a - b).map((t) => new Date(t));
  return starts.map((s, i) => {
    const end = i < starts.length - 1 ? addDays(starts[i + 1], -1) : period.end;
    const seg = { start: s, end };
    const sold = occ.filter((o) => overlap(o.released, seg)).reduce((n, o) => n + (o.slots ?? 0), 0);
    const free = Math.max(0, (f.slots ?? 0) - (f.lockedSlots ?? 0) - sold);
    const taken = occ.filter((o) => ticked.includes(o.donorId) && overlap(o.released, seg)).reduce((n, o) => n + (o.slots ?? 0), 0);
    return { period: seg, covered: Math.min(need, free + taken) };
  });
}

/* ── Selection model ──────────────────────── */
export interface FrameChoice {
  /** Digital: slots needed */
  need: number;
  /** Digital: donors ticked. Paper: ignored (every overlapping donor releases its period) */
  donors: string[];
}
export const defaultChoice = (): FrameChoice => ({ need: 2, donors: [] });

export function takenDonors(f: SwapFrame, period: Period, choice: FrameChoice) {
  const occ = activeOccupants(f, period);
  return f.media === "Digital" ? occ.filter((o) => choice.donors.includes(o.donorId)) : occ;
}

export function isReady(f: SwapFrame, period: Period, choice: FrameChoice) {
  if (f.media === "Paper") return true;
  return coverage(f, period, choice.need, choice.donors).every((s) => s.covered >= choice.need);
}

export function frameImpressions(f: SwapFrame, choice: FrameChoice) {
  return f.media === "Digital" ? f.impressions * choice.need : f.impressions;
}
export function framePrice(f: SwapFrame, choice: FrameChoice) {
  return f.media === "Digital" ? f.price * choice.need : f.price;
}

export interface ReplacementSlot {
  key: string;
  frame: SwapFrame;
  donor: Donor;
  released: Period;
  price: number;
}
export function replacementSlots(ids: string[], period: Period, choices: Record<string, FrameChoice>): ReplacementSlot[] {
  return ids.flatMap((id) => {
    const f = frameById(id)!;
    return takenDonors(f, period, choices[id] ?? defaultChoice()).map((o) => ({
      key: slotKey(f.id, o.donorId),
      frame: f,
      donor: o.donor,
      released: o.released,
      price: inheritedPrice(o, period),
    }));
  });
}

/* ── Upload parsing ───────────────────────── */
export interface ParsedList {
  rows: number;
  matched: string[];
  unmatched: { row: number; value: string }[];
}
export function parseFrameList(text: string): ParsedList {
  const lines = text.split(/\r?\n/).map((l) => l.split(/[,;\t]/)[0].trim().replace(/^"|"$/g, "")).filter(Boolean);
  if (lines.length && !/^[A-Z]{2}-/i.test(lines[0])) lines.shift(); // header row
  const matched: string[] = [];
  const unmatched: ParsedList["unmatched"] = [];
  lines.forEach((v, i) => {
    const f = FRAMES.find((x) => x.id.toLowerCase() === v.toLowerCase());
    if (f) { if (!matched.includes(f.id)) matched.push(f.id); }
    else unmatched.push({ row: i + 1, value: v });
  });
  return { rows: lines.length, matched, unmatched };
}

/* ── Text matching (accent-insensitive) ───── */
export const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
/** Splits `text` around the first accent-insensitive match of `q` */
export function splitMatch(text: string, q: string): [string, string, string] | null {
  if (!q) return null;
  const folded = [...text].map((c) => fold(c)).join("");
  const i = folded.indexOf(fold(q));
  if (i < 0) return null;
  const chars = [...text];
  return [chars.slice(0, i).join(""), chars.slice(i, i + q.length).join(""), chars.slice(i + q.length).join("")];
}
