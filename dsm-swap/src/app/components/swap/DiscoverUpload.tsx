import { useEffect, useRef, useState } from "react";
import { Download, FileSpreadsheet, Upload, X } from "lucide-react";
import { ParsedList, Period, TEMPLATE_ROWS, fmtMid, frameById, frameStatus, parseFrameList, statusRank, statusTone } from "./swapData";
import { Alert, BORDER, Btn, Caption, Checkbox, Chip, FG, FG2, Mono, Skeleton, Title } from "./swapUi";

export interface UploadState {
  file: { name: string; size: number } | null;
  status: "idle" | "parsing" | "parsed";
  result: ParsedList | null;
  selected: string[];
}
export const EMPTY_UPLOAD: UploadState = { file: null, status: "idle", result: null, selected: [] };

const PARSE_MS = 1800;
const kb = (bytes: number) => `${Math.max(1, Math.round(bytes / 1024))} KB`;

function downloadTemplate() {
  const csv = ["frame_id", ...TEMPLATE_ROWS].join("\n") + "\n";
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "swap_frame_list_template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

/* Step 2 — Upload list (flow 10–12) */
export function DiscoverUpload({
  period, state, onChange,
}: {
  period: Period;
  state: UploadState;
  onChange: (s: UploadState) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const pending = useRef<{ text: string | null; timer?: ReturnType<typeof setInterval> }>({ text: null });

  const start = (file: File) => {
    onChange({ file: { name: file.name, size: file.size }, status: "parsing", result: null, selected: [] });
    pending.current.text = null;
    // .xlsx needs a spreadsheet parser; the prototype reads it as the template list
    if (/\.(csv|txt)$/i.test(file.name)) file.text().then((t) => { pending.current.text = t; });
    else pending.current.text = TEMPLATE_ROWS.join("\n");
  };

  // Simulated parse with an inline progress bar; cancellable
  useEffect(() => {
    if (state.status !== "parsing") return;
    setProgress(0);
    const began = Date.now();
    const timer = setInterval(() => {
      const p = Math.min(100, ((Date.now() - began) / PARSE_MS) * 100);
      setProgress(p);
      if (p >= 100 && pending.current.text !== null) {
        clearInterval(timer);
        const parsed = parseFrameList(pending.current.text);
        // Frames that don't match the deal line are never offered; available first, occupied last
        const matched = parsed.matched
          .filter((id) => frameStatus(frameById(id)!, period) !== "Not matching")
          .sort((a, b) => statusRank(frameStatus(frameById(a)!, period)) - statusRank(frameStatus(frameById(b)!, period)));
        onChange({ ...state, status: "parsed", result: { ...parsed, matched }, selected: matched });
      }
    }, 60);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, state.file?.name]);

  const filePicker = (
    <input
      ref={inputRef}
      type="file"
      accept=".csv,.txt,.xlsx"
      className="hidden"
      onChange={(e) => { const f = e.target.files?.[0]; if (f) start(f); e.target.value = ""; }}
    />
  );
  const dropProps = {
    onDragOver: (e: React.DragEvent) => { e.preventDefault(); setDrag(true); },
    onDragLeave: () => setDrag(false),
    onDrop: (e: React.DragEvent) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) start(f); },
  };

  if (state.status === "idle") {
    return (
      <div className="flex flex-col" style={{ gap: 12 }}>
        {filePicker}
        <div
          {...dropProps}
          className="flex flex-col items-center text-center transition-colors"
          style={{ gap: 6, padding: "28px 16px", borderRadius: 12, border: `1.5px dashed ${drag ? "#2c24c3" : "rgba(19,18,33,0.22)"}`, backgroundColor: drag ? "rgba(44,36,195,0.05)" : "rgba(19,18,33,0.03)" }}
        >
          <span className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#fff", border: `1px solid ${BORDER}`, marginBottom: 4 }}>
            <Upload size={18} color="#2c24c3" aria-hidden="true" />
          </span>
          <Title>Drop a frame list here</Title>
          <Caption>.csv, .txt or .xlsx · one frame ID per row</Caption>
          <span style={{ marginTop: 6 }}>
            <Btn onClick={() => inputRef.current?.click()}>Browse files</Btn>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Caption>Not sure about the format?</Caption>
          <Btn variant="ghost" size="sm" iconStart={<Download size={14} aria-hidden="true" />} onClick={downloadTemplate}>Download template</Btn>
        </div>
      </div>
    );
  }

  const fileRow = (sub: string, action: React.ReactNode, extra?: React.ReactNode) => (
    <div className="flex items-start" style={{ gap: 10, padding: 12, borderRadius: 12, border: `1px solid ${BORDER}`, backgroundColor: "#fff" }}>
      <FileSpreadsheet size={18} color="#2c24c3" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
      <div className="flex flex-col flex-1 min-w-0" style={{ gap: 2 }}>
        <span className="truncate" style={{ fontSize: "var(--text-sm)", lineHeight: "18px", fontWeight: "var(--font-weight-medium)", color: FG }}>{state.file?.name}</span>
        <Caption>{sub}</Caption>
        {extra}
      </div>
      {action}
    </div>
  );

  if (state.status === "parsing") {
    return (
      <div className="flex flex-col" style={{ gap: 12 }} role="status" aria-live="polite">
        {filePicker}
        {fileRow(
          `${kb(state.file!.size)} · Reading rows and matching frame IDs`,
          <button type="button" aria-label="Cancel upload" onClick={() => onChange(EMPTY_UPLOAD)} className="flex items-center justify-center cursor-pointer border-none bg-transparent rounded hover:bg-black/5" style={{ width: 28, height: 28 }}>
            <X size={14} color="#42414e" />
          </button>,
          <div role="progressbar" aria-label="Parsing file" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} style={{ height: 4, marginTop: 6, borderRadius: 99, backgroundColor: "rgba(19,18,33,0.08)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#2c24c3", borderRadius: 99, transition: "width 60ms linear" }} />
          </div>,
        )}
        <div {...dropProps} className="text-center" style={{ padding: 12, borderRadius: 12, border: `1.5px dashed ${drag ? "#2c24c3" : "rgba(19,18,33,0.18)"}` }}>
          <Caption>Drop another file to replace this one</Caption>
        </div>
        <div className="flex flex-col" style={{ gap: 8 }} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} w="100%" h={44} r={8} />)}
        </div>
      </div>
    );
  }

  const r = state.result!;
  const selectable = r.matched.filter((id) => frameStatus(frameById(id)!, period) !== "Not matching");
  const all = selectable.length > 0 && selectable.every((id) => state.selected.includes(id));
  const some = state.selected.length > 0 && !all;
  const toggle = (id: string) =>
    onChange({ ...state, selected: state.selected.includes(id) ? state.selected.filter((x) => x !== id) : [...state.selected, id] });

  return (
    <div className="flex flex-col" style={{ gap: 12 }}>
      {filePicker}
      {fileRow(`${r.rows} ${r.rows === 1 ? "row" : "rows"} read`, <Btn variant="ghost" size="sm" onClick={() => onChange(EMPTY_UPLOAD)}>Replace file</Btn>)}

      <div className="flex items-baseline justify-between">
        <Title>{r.matched.length} {r.matched.length === 1 ? "frame" : "frames"} found</Title>
        <Caption>for {fmtMid(period)}</Caption>
      </div>

      {r.unmatched.length > 0 && (
        <Alert tone="warning">
          {r.unmatched.length} {r.unmatched.length === 1 ? "row didn't" : "rows didn't"} match a frame:{" "}
          {r.unmatched.map((u, i) => (
            <span key={u.row}>{i ? ", " : ""}<Mono size={11} color="inherit">{u.value}</Mono> (row {u.row})</span>
          ))}
          . Fix it in the file and upload again, or continue without {r.unmatched.length === 1 ? "it" : "them"}.
        </Alert>
      )}

      {r.matched.length > 0 && (
        <div className="flex flex-col" style={{ borderRadius: 12, border: `1px solid ${BORDER}`, backgroundColor: "#fff", overflow: "hidden" }}>
          <label className="flex items-center cursor-pointer" style={{ gap: 10, padding: "10px 12px", backgroundColor: "rgba(19,18,33,0.03)", borderBottom: "1px solid rgba(19,18,33,0.07)" }}>
            <Checkbox checked={all} indeterminate={some} onChange={() => onChange({ ...state, selected: all ? [] : selectable })} label={`Select all ${selectable.length} frames`} />
            <span className="flex-1" style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: FG }}>Select all</span>
            <Caption>{state.selected.length} of {selectable.length} selected</Caption>
          </label>
          {r.matched.map((id, i) => {
            const f = frameById(id)!;
            const status = frameStatus(f, period);
            const off = status === "Not matching";
            return (
              <label key={id} className="flex items-center" style={{ gap: 10, padding: "8px 12px", borderTop: i ? "1px solid rgba(19,18,33,0.07)" : "none", cursor: off ? "default" : "pointer" }}>
                <Checkbox checked={state.selected.includes(id)} disabled={off} onChange={() => toggle(id)} label={`Select ${id}`} />
                <span className="flex flex-col flex-1 min-w-0">
                  <Mono size={11}>{id}</Mono>
                  <Caption color={FG2}>{f.address.replace(", Madrid", "")} · {f.format}</Caption>
                </span>
                <Chip tone={statusTone(status)}>{status}</Chip>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
