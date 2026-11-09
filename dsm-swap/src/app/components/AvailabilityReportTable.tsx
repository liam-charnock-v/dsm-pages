import { useState } from "react";
import svgPaths from "../../imports/svg-0uv5zuvhrp";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export type AvailStatus = "Available" | "Booked" | "Optioned" | "Dominated" | "Prohibited";

export type AvailabilityRow = {
  id: string;
  frameId: string;
  visualUnit: string;
  address: string;
  postcode: string;
  coordinates: string;
  availability: AvailStatus;
  /** Only populated when availability === "Available" */
  availabilityPct?: number;
  impressions: number;
  price: number;
  status: "Mounted" | "Pending" | "Offline";
  shareOfTime: number;
};

/* ─────────────────────────────────────────────
   Data generation
───────────────────────────────────────────── */
const ADDRESSES = [
  "Cinema 18 - Manchester",
  "Vue 12 - Bristol",
  "Odeon 6 - Oxford",
  "Showcase - Leeds",
  "Cineworld - Birmingham",
  "Light Cinema - Sheffield",
  "Everyman - London",
  "Empire - Coventry",
  "Picturehouse - Bath",
  "Curzon - Nottingham",
  "Odeon - Cardiff",
  "Showcase - Newcastle",
  "Vue - Liverpool",
];

const POSTCODES = [
  "BS1 2DS", "OX16 0AH", "BT1 2BX", "M1 1AE",
  "B2 4QA", "LS1 3AB", "S1 2GG", "CV1 5RR",
  "BA1 1LZ", "NG1 1GF", "CF10 1BH", "NE1 5DL",
  "L1 1JJ",
];

const VISUAL_UNITS = ["Visual unit 1", "Visual unit 2", "Default"];
const AVAILABILITIES: AvailStatus[] = ["Available", "Booked", "Optioned", "Dominated", "Prohibited"];
const STATUSES: AvailabilityRow["status"][] = ["Mounted", "Pending", "Offline"];
const SHARE_OPTIONS = [5, 10, 15, 20, 25];

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTableData(): AvailabilityRow[] {
  const count = rnd(16, 24);
  return Array.from({ length: count }, (_, i) => {
    const lat  = (51 + Math.random() * 1.5).toFixed(6);
    const lng  = (Math.random() * 3).toFixed(6);
    const frameNum = String(Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000);
    const avail = pick(AVAILABILITIES);
    return {
      id: `${i}-${frameNum}`,
      frameId: `FR${frameNum}`,
      visualUnit: pick(VISUAL_UNITS),
      address: pick(ADDRESSES),
      postcode: pick(POSTCODES),
      coordinates: `${lat} - ${lng}`,
      availability: avail,
      availabilityPct: avail === "Available" ? rnd(5, 100) : undefined,
      impressions: rnd(300_000, 2_500_000) + Math.random(),
      price: rnd(4, 30),
      status: pick(STATUSES),
      shareOfTime: pick(SHARE_OPTIONS),
    };
  });
}

/* ─────────────────────────────────────────────
   Availability badge + optional meter
───────────────────────────────────────────── */
const AVAIL_COLORS: Record<AvailStatus, { bg: string; fg: string }> = {
  Available:  { bg: "rgba(34,197,94,0.08)",    fg: "#16a34a" },
  Booked:     { bg: "rgba(239,68,68,0.08)",    fg: "#dc2626" },
  Optioned:   { bg: "rgba(234,179,8,0.08)",    fg: "#b45309" },
  Dominated:  { bg: "rgba(147,51,234,0.08)",   fg: "#7c3aed" },
  Prohibited: { bg: "rgba(55,65,81,0.08)",     fg: "#374151" },
};

function AvailabilityCell({
  value,
  pct,
}: {
  value: AvailStatus;
  pct?: number;
}) {
  const c = AVAIL_COLORS[value] ?? { bg: "rgba(107,114,128,0.08)", fg: "#6b7280" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Status chip */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexShrink: 0,
          height: 20,
          padding: "0 7px",
          borderRadius: 999,
          backgroundColor: c.bg,
          fontFamily: "'Inter', sans-serif",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-weight-medium)",
          color: c.fg,
          lineHeight: "20px",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>

      {/* Percentage meter — only for Available */}
      {value === "Available" && pct !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {/* Track + fill bar */}
          <div
            style={{
              position: "relative",
              width: 44,
              height: 3,
              borderRadius: 99,
              backgroundColor: "rgba(21,17,94,0.12)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${pct}%`,
                borderRadius: 99,
                backgroundColor: "var(--primary)",
              }}
            />
          </div>
          {/* Numeric value */}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--primary)",
              lineHeight: "16px",
              minWidth: 26,
              textAlign: "right",
            }}
          >
            {pct}%
          </span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Status badge
───────────────────────────────────────────── */
const STATUS_COLORS: Record<AvailabilityRow["status"], { bg: string; fg: string }> = {
  Mounted: { bg: "rgba(34,197,94,0.08)",  fg: "#16a34a" },
  Pending: { bg: "rgba(234,179,8,0.08)",  fg: "#b45309" },
  Offline: { bg: "rgba(107,114,128,0.1)", fg: "#6b7280" },
};

function StatusBadge({ value }: { value: AvailabilityRow["status"] }) {
  const c = STATUS_COLORS[value];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 20,
        padding: "0 7px",
        borderRadius: 999,
        backgroundColor: c.bg,
        fontFamily: "'Inter', sans-serif",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-weight-medium)",
        color: c.fg,
        lineHeight: "20px",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Sort icon
───────────────────────────────────────────── */
function CaretUpDown({ active }: { active: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d={svgPaths.p25b50700}
        fill={active ? "var(--primary)" : "var(--muted-foreground)"}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Column config
───────────────────────────────────────────── */
type SortKey = keyof AvailabilityRow;

const COLUMNS: {
  key: SortKey;
  label: string;
  width: number;
  align?: "right";
  firstCol?: boolean;
}[] = [
  { key: "frameId",         label: "Frame ID",      width: 148, firstCol: true },
  { key: "visualUnit",      label: "Visual unit",   width: 110 },
  { key: "address",         label: "Address",       width: 148 },
  { key: "postcode",        label: "Postcode",      width: 96  },
  { key: "coordinates",     label: "Coordinates",   width: 156 },
  { key: "availability",    label: "Availability",  width: 200 },
  { key: "impressions",     label: "Impressions",   width: 116, align: "right" },
  { key: "price",           label: "Price",         width: 72,  align: "right" },
  { key: "status",          label: "Status",        width: 90  },
  { key: "shareOfTime",     label: "Share of Time", width: 100, align: "right" },
];

/* ─────────────────────────────────────────────
   Table
───────────────────────────────────────────── */
export function AvailabilityReportTable({ rows }: { rows: AvailabilityRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("frameId");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...rows].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    let cmp = 0;
    if (typeof av === "number" && typeof bv === "number") {
      cmp = av - bv;
    } else {
      cmp = String(av ?? "").localeCompare(String(bv ?? ""));
    }
    return sortAsc ? cmp : -cmp;
  });

  const fmt = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "var(--background)",
      }}
    >
      <table
        style={{
          width: "100%",
          minWidth: COLUMNS.reduce((s, c) => s + c.width, 0),
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        {/* Column widths */}
        <colgroup>
          {COLUMNS.map((col) => (
            <col key={col.key} style={{ width: col.width }} />
          ))}
        </colgroup>

        {/* ── Header ── */}
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  height: 46,
                  padding: col.firstCol ? "2px 8px 0 12px" : "2px 8px 0 20px",
                  textAlign: "left",
                  verticalAlign: "middle",
                  cursor: "pointer",
                  userSelect: "none",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "var(--background)",
                  borderBottom: "1px solid rgba(19,18,33,0.1)",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--muted-foreground)",
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.label}
                  </span>
                  <CaretUpDown active={sortKey === col.key} />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Rows ── */}
        <tbody>
          {sorted.map((row) => (
            <tr
              key={row.id}
              style={{ borderTop: "1px solid rgba(19,18,33,0.1)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                  "rgba(24,22,55,0.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent";
              }}
            >
              {/* Frame ID — medium weight */}
              <td
                style={{
                  height: 36,
                  padding: "7px 8px 7px 20px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  lineHeight: "20px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {row.frameId}
              </td>

              <Td truncate>{row.visualUnit}</Td>
              <Td truncate>{row.address}</Td>
              <Td>{row.postcode}</Td>
              <Td>{row.coordinates}</Td>

              {/* Availability — chip + optional meter */}
              <td
                style={{
                  height: 36,
                  padding: "7px 8px 7px 20px",
                  verticalAlign: "middle",
                }}
              >
                <AvailabilityCell value={row.availability} pct={row.availabilityPct} />
              </td>

              <Td align="right">{fmt.format(row.impressions)}</Td>
              <Td align="right">£{row.price.toFixed(2)}</Td>

              {/* Status badge */}
              <td style={{ height: 36, padding: "7px 8px 7px 20px", verticalAlign: "middle" }}>
                <StatusBadge value={row.status} />
              </td>

              <Td align="right">{row.shareOfTime}%</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Generic table cell
───────────────────────────────────────────── */
function Td({
  children,
  align,
  truncate,
}: {
  children: React.ReactNode;
  align?: "right";
  truncate?: boolean;
}) {
  return (
    <td
      style={{
        height: 36,
        padding: "7px 8px 7px 20px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--font-weight-normal)",
        color: "var(--foreground)",
        lineHeight: "20px",
        textAlign: align ?? "left",
        verticalAlign: "middle",
        ...(truncate
          ? {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 0,
            }
          : { whiteSpace: "nowrap" }),
      }}
    >
      {children}
    </td>
  );
}