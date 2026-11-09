import { useEffect, useRef, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { Btn, FG, FG2 } from "./swapUi";

/* Blocking scrim with a centred card; fades in over 200ms */
function Scrim({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999, backgroundColor: "rgba(19,18,33,0.4)", backdropFilter: "blur(2px)", animation: "swapFade 200ms cubic-bezier(0.2,0,0,1)" }}
    >
      <style>{`@keyframes swapFade{from{opacity:0}to{opacity:1}}@keyframes swapSpin{to{transform:rotate(360deg)}}`}</style>
      <div
        className="flex flex-col"
        style={{ width: 360, gap: 12, padding: 24, backgroundColor: "#fff", borderRadius: 12, boxShadow: "0px 16px 48px rgba(16,16,52,0.24)" }}
      >
        {children}
      </div>
    </div>
  );
}

const Spinner = ({ size = 28 }: { size?: number }) => (
  <LoaderCircle size={size} color="#2c24c3" aria-hidden="true" style={{ animation: "swapSpin 800ms linear infinite" }} />
);

/* Flow 17 — commit in progress; no cancel */
export function ConfirmingSwapOverlay({ frames, replacements, onDone }: { frames: number; replacements: number; onDone: () => void }) {
  const [done, setDone] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    const timers = [900, 1900, 2800].map((ms, i) => setTimeout(() => setDone(i + 1), ms));
    timers.push(setTimeout(() => onDoneRef.current(), 3300));
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    `Moved ${frames} ${frames === 1 ? "frame" : "frames"} into Deal line 1`,
    replacements ? `Adding ${replacements} ${replacements === 1 ? "replacement" : "replacements"} to donor campaigns` : "Recording the swap",
    replacements ? "Notifying donor campaign owners" : "Updating availability",
  ];
  return (
    <Scrim label="Confirming swap">
      <div role="status" aria-live="polite" className="flex flex-col" style={{ gap: 16 }}>
        <div className="flex flex-col" style={{ gap: 4 }}>
          <span style={{ fontSize: "var(--text-base)", lineHeight: "22px", fontWeight: "var(--font-weight-medium)", color: FG }}>Confirming swap</span>
          <span style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: FG2 }}>Keep this page open. This usually takes a few seconds.</span>
        </div>
        <div className="flex flex-col" style={{ gap: 10 }}>
          {steps.map((s, i) => {
            const state = i < done ? "done" : i === done ? "active" : "wait";
            return (
              <span key={s} className="flex items-center" style={{ gap: 10 }}>
                <span className="flex items-center justify-center shrink-0" style={{ width: 18, height: 18 }}>
                  {state === "done" ? (
                    <span className="flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#12a05c" }}><Check size={11} color="#fff" strokeWidth={3} /></span>
                  ) : state === "active" ? (
                    <Spinner size={16} />
                  ) : (
                    <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid rgba(19,18,33,0.2)" }} />
                  )}
                </span>
                <span style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: state === "wait" ? "#9e9daa" : FG, fontWeight: state === "active" ? "var(--font-weight-medium)" : 400 }}>{s}</span>
              </span>
            );
          })}
        </div>
      </div>
    </Scrim>
  );
}

/* Shown when Cancel swap is pressed after step 1 */
export function CancelSwapDialog({ onKeep, onCancel }: { onKeep: () => void; onCancel: () => void }) {
  const keepRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    keepRef.current?.querySelector("button")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onKeep();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKeep]);
  return (
    <Scrim label="Cancel swap?">
      <span style={{ fontSize: "var(--text-base)", lineHeight: "22px", fontWeight: "var(--font-weight-medium)", color: FG }}>Cancel swap?</span>
      <span style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: FG2 }}>Your selections and replacements will be lost. No campaigns have changed.</span>
      <div className="flex justify-end" style={{ gap: 8, marginTop: 8 }}>
        <div ref={keepRef}><Btn onClick={onKeep}>Keep editing</Btn></div>
        <Btn variant="primary" onClick={onCancel}>Cancel swap</Btn>
      </div>
    </Scrim>
  );
}
