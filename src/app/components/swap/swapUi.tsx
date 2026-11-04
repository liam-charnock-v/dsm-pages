import { ReactNode, useEffect, useRef, useState } from "react";
import { Check, Info, Lock, Minus, Search, TriangleAlert, CircleCheck, X } from "lucide-react";
import type { ChipTone } from "./swapData";

/* ─────────────────────────────────────────────
   Small building blocks for the swap panel.
   Styling follows the prototype theme (theme.css).
───────────────────────────────────────────── */

export const MONO = "'Inter', sans-serif";
export const FG = "var(--foreground)";
export const FG2 = "var(--essential-secondary)";
export const FG3 = "var(--essential-tertiary)";
export const ACCENT = "var(--accent)";
export const BORDER = "var(--neutral-300)";
export const DIVIDER = "var(--neutral-300)";
export const TINT = "var(--primary-50)";

const CHIP: Record<ChipTone, { bg: string; fg: string }> = {
  info: { bg: "var(--blue-100)", fg: "var(--blue-900)" },
  warning: { bg: "var(--yellow-100)", fg: "var(--yellow-900)" },
  danger: { bg: "var(--pink-100)", fg: "var(--pink-800)" },
  success: { bg: "var(--green-100)", fg: "var(--green-900)" },
  brand: { bg: "var(--primary-100)", fg: "var(--primary-600)" },
  neutral: { bg: "var(--neutral-200)", fg: "var(--neutral-900)" },
};

export function Chip({ tone, children }: { tone: ChipTone; children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        height: 24,
        fontSize: "var(--text-sm)",
        lineHeight: "20px",
        fontWeight: "var(--font-weight-normal)",
        color: CHIP[tone].fg,
        backgroundColor: CHIP[tone].bg,
        borderRadius: "var(--radius-full)",
        padding: "0 8px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export const Mono = ({ children, size = 12, color = FG }: { children: ReactNode; size?: number; color?: string }) => (
  <span style={{ fontFamily: MONO, fontSize: size, lineHeight: "16px", color, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{children}</span>
);

export const Caption = ({ children, color = FG3, style }: { children: ReactNode; color?: string; style?: React.CSSProperties }) => (
  <span style={{ fontSize: "var(--text-xs)", lineHeight: "16px", color, ...style }}>{children}</span>
);

/* ── Tooltip: shown on hover or keyboard focus ── */
export function Tooltip({ content, children }: { content: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative block"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      style={{ outline: "none", cursor: "default" }}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className="absolute"
          style={{ left: 0, right: 0, bottom: "calc(100% + 6px)", zIndex: 30, padding: "8px 10px", borderRadius: 6, backgroundColor: "#131221", color: "#fff", fontSize: "var(--text-xs)", lineHeight: "16px", boxShadow: "0px 4px 12px rgba(16,16,52,0.2)", pointerEvents: "none" }}
        >
          {content}
        </span>
      )}
    </span>
  );
}

export const Micro = ({ children }: { children: ReactNode }) => (
  <span style={{ fontSize: "var(--text-xs)", lineHeight: "16px", fontWeight: "var(--font-weight-medium)", color: FG3 }}>
    {children}
  </span>
);

export const Title = ({ children, size = "md" }: { children: ReactNode; size?: "sm" | "md" }) => (
  <span style={{ fontSize: size === "md" ? "var(--text-base)" : "var(--text-sm)", lineHeight: "20px", fontWeight: size === "md" ? "var(--font-weight-semibold)" : "var(--font-weight-medium)", color: FG }}>
    {children}
  </span>
);

/* ── Buttons ── */
type BtnVariant = "primary" | "secondary" | "ghost" | "link";
export function Btn({
  children, onClick, variant = "secondary", size = "md", disabled, iconStart, iconEnd, ariaLabel, fullWidth,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  ariaLabel?: string;
  fullWidth?: boolean;
}) {
  const h = size === "sm" ? 28 : size === "lg" ? 37 : 32;
  const look =
    variant === "primary"
      ? { backgroundColor: "var(--primary)", color: "var(--primary-foreground)", border: "1px solid transparent", boxShadow: "var(--elevation-sm)" }
      : variant === "secondary"
        ? { backgroundColor: "#fff", color: "var(--primary-600)", border: "1px solid var(--neutral-300)", boxShadow: "var(--elevation-sm)" }
        : variant === "link"
          ? { backgroundColor: "transparent", color: ACCENT, border: "1px solid transparent", boxShadow: "none" }
          : { backgroundColor: "transparent", color: FG, border: "1px solid transparent", boxShadow: "none" };
  const link = variant === "link";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer outline-none transition-opacity hover:opacity-90${link ? " hover:underline" : ""} disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1`}
      style={{
        height: h,
        gap: 6,
        padding: link ? 0 : `0 ${size === "sm" ? 10 : size === "lg" ? 18 : 14}px`,
        borderRadius: "var(--radius)",
        fontSize: "var(--text-sm)",
        fontWeight: link ? "var(--font-weight-normal)" : "var(--font-weight-medium)",
        lineHeight: "20px",
        whiteSpace: "nowrap",
        width: fullWidth ? "100%" : undefined,
        ...look,
      }}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}

export function TextLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer border-none bg-transparent p-0 hover:underline outline-none focus-visible:underline"
      style={{ fontSize: "var(--text-xs)", lineHeight: "16px", fontWeight: "var(--font-weight-medium)", color: ACCENT }}
    >
      {children}
    </button>
  );
}

/* ── Checkbox ── */
export function Checkbox({
  checked, indeterminate, disabled, onChange, label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  label: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  const on = checked || indeterminate;
  return (
    <span className="relative inline-flex shrink-0" style={{ width: 16, height: 16 }}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange?.(e.target.checked)}
        onClick={(e) => e.stopPropagation()}
        className="peer absolute inset-0 m-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none flex items-center justify-center size-full peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-1"
        style={{
          borderRadius: 4,
          border: on ? "1px solid #2c24c3" : "1px solid rgba(19,18,33,0.3)",
          backgroundColor: disabled ? "rgba(19,18,33,0.06)" : on ? "#2c24c3" : "#fff",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {indeterminate ? <Minus size={12} color="#fff" strokeWidth={3} /> : checked ? <Check size={12} color="#fff" strokeWidth={3} /> : null}
      </span>
    </span>
  );
}

/* ── Inline alert ── */
const ALERT = {
  info: { bg: "var(--primary-50)", border: "var(--primary-300)", fg: "var(--primary-900)", icon: <Info size={14} color="var(--primary-600)" /> },
  warning: { bg: "var(--yellow-100)", border: "#fce9ba", fg: "var(--yellow-900)", icon: <TriangleAlert size={14} color="#be8f17" /> },
  danger: { bg: "var(--pink-100)", border: "#fcbadd", fg: "var(--pink-800)", icon: <TriangleAlert size={14} color="#be1770" /> },
  success: { bg: "#e8fef5", border: "#a0f8d5", fg: "var(--green-900)", icon: <CircleCheck size={14} color="var(--green-600)" /> },
};
export function Alert({ tone, children, role = "note" }: { tone: keyof typeof ALERT; children: ReactNode; role?: string }) {
  const a = ALERT[tone];
  return (
    <div
      role={role}
      className="flex"
      style={{ gap: 8, padding: "8px 10px", borderRadius: "var(--radius)", backgroundColor: a.bg, border: `1px solid ${a.border}`, color: a.fg, fontSize: "var(--text-xs)", lineHeight: "16px" }}
    >
      <span className="shrink-0" style={{ marginTop: 1 }}>{a.icon}</span>
      <span>{children}</span>
    </div>
  );
}

/* ── Card shell: 12px radius, 1px border, tint when selected, never a coloured edge ── */
export function Card({
  children, selected, highlighted, disabled, onClick, onMouseEnter, onMouseLeave, cardRef, padding = 12,
}: {
  children: ReactNode;
  selected?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  cardRef?: (el: HTMLDivElement | null) => void;
  padding?: number;
}) {
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col transition-colors duration-150"
      style={{
        gap: 6,
        padding,
        borderRadius: 12,
        border: `1px solid ${selected ? "var(--primary-600)" : highlighted ? "var(--primary-300)" : BORDER}`,
        backgroundColor: selected ? TINT : disabled ? "var(--neutral-100)" : "#fff",
        boxShadow: highlighted ? "0 0 0 3px rgba(44,36,195,0.12)" : "var(--elevation-sm)",
        cursor: onClick && !disabled ? "pointer" : "default",
      }}
    >
      {children}
    </div>
  );
}

/* ── Search input ── */
export function SearchField({
  value, onChange, placeholder, onFocus, onBlur, onKeyDown, inputRef,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <div
      className="flex items-center focus-within:ring-2 focus-within:ring-[var(--ring)]"
      style={{ gap: 8, height: 34, padding: "0 12px", borderRadius: "var(--radius)", border: `1px solid ${BORDER}`, backgroundColor: "#fff", boxShadow: "var(--elevation-sm)" }}
    >
      <Search size={14} color="var(--essential-tertiary)" aria-hidden="true" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 min-w-0 border-none outline-none bg-transparent placeholder:text-[#7c7b87]"
        style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: FG }}
      />
      {value && (
        <button type="button" aria-label="Clear search" onClick={() => onChange("")} className="flex items-center justify-center cursor-pointer border-none bg-transparent p-0">
          <X size={14} color="#7c7b87" />
        </button>
      )}
    </div>
  );
}

/* ── Filter chip (deal-line criteria) ── */
export function FilterChip({ label, set, onClear }: { label: string; set?: boolean; onClear?: () => void }) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        gap: 4,
        height: 24,
        padding: set && onClear ? "0 4px 0 8px" : "0 8px",
        borderRadius: "var(--radius-full)",
        fontSize: 11,
        lineHeight: "16px",
        fontWeight: "var(--font-weight-normal)",
        color: set ? "#2c24c3" : FG2,
        backgroundColor: set ? "rgba(44,36,195,0.08)" : "#fff",
        border: `1px solid ${set ? "rgba(44,36,195,0.25)" : BORDER}`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {set && onClear && (
        <button type="button" aria-label={`Clear ${label}`} onClick={onClear} className="flex items-center justify-center cursor-pointer border-none bg-transparent p-0" style={{ width: 16, height: 16 }}>
          <X size={11} color="#2c24c3" />
        </button>
      )}
    </span>
  );
}

/* ── Stepper: done / current / upcoming / locked ── */
export const STEP_NAMES = ["Schedule", "Discover", "Replace", "Review"] as const;
export function Stepper({ step, locked }: { step: number; locked: boolean }) {
  return (
    <nav aria-label="Swap steps" style={{ padding: "14px 16px 10px", borderBottom: `1px solid ${DIVIDER}`, backgroundColor: "#fff" }}>
      <ol className="relative flex m-0 p-0" style={{ listStyle: "none" }}>
        <span aria-hidden="true" className="absolute" style={{ left: "12.5%", right: "12.5%", top: 10, height: 1, backgroundColor: "rgba(19,18,33,0.15)" }} />
        <span aria-hidden="true" className="absolute" style={{ left: "12.5%", top: 10, height: 1, width: `${Math.max(0, Math.min(3, step - 1)) * 25}%`, backgroundColor: "#2c24c3", transition: "width 0.2s cubic-bezier(0.2,0,0,1)" }} />
        {STEP_NAMES.map((label, i) => {
          const n = i + 1;
          const done = n < step;
          const current = n === step;
          const isLocked = locked && n > step;
          return (
            <li key={label} aria-current={current ? "step" : undefined} className="relative flex flex-col items-center" style={{ flex: 1, gap: 4, zIndex: 1 }}>
              <span
                className="flex items-center justify-center"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  fontSize: 10,
                  fontWeight: "var(--font-weight-medium)",
                  fontFamily: MONO,
                  backgroundColor: done ? "var(--primary-600)" : current ? "var(--primary-900)" : isLocked ? "var(--neutral-200)" : "#fff",
                  color: done || current ? "#fff" : "var(--neutral-500)",
                  border: done || current || isLocked ? "none" : "1px solid var(--neutral-400)",
                  boxShadow: current ? "0 0 0 4px rgba(44,36,195,0.12)" : "none",
                }}
              >
                {done ? <Check size={11} strokeWidth={3} /> : isLocked ? <Lock size={10} /> : n}
              </span>
              <span style={{ fontSize: 11, lineHeight: "14px", whiteSpace: "nowrap", fontWeight: current ? "var(--font-weight-medium)" : "var(--font-weight-normal)", color: current ? FG : done ? FG2 : "var(--neutral-500)" }}>
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── Skeleton block ── */
export const Skeleton = ({ w, h, r = 4 }: { w: number | string; h: number; r?: number }) => (
  <span className="block" style={{ width: w, height: h, borderRadius: r, backgroundColor: "rgba(19,18,33,0.08)", animation: "swapSkeleton 1.2s cubic-bezier(0.2,0,0,1) infinite alternate" }} />
);
export const SKELETON_KEYFRAMES = `@keyframes swapSkeleton{from{opacity:1}to{opacity:.45}}@keyframes swapSpin{to{transform:rotate(360deg)}}`;

/* ── Panel body / footer ── */
export function PanelFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center shrink-0" style={{ gap: 8, minHeight: 60, padding: "12px 16px", borderTop: `1px solid ${DIVIDER}`, backgroundColor: "#fff" }}>
      {children}
    </div>
  );
}
