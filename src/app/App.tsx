import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { CampaignInfoDrawer } from "./components/CampaignInfoDrawer";
import { DealLinePanel } from "./components/DealLinePanel";
import { MapView } from "./components/MapView";
import { AvailabilityPanel } from "./components/AvailabilityPanel";
import { AvailabilityReportPage } from "./components/AvailabilityReportPage";
import { FrameInfoCard, SelectedMarker } from "./components/FrameInfoCard";
import { MapSearchFilter } from "./components/MapSearchFilter";
import { SwapBanner } from "./components/SwapBanner";
import { SwapPanel, SwapResult, MapPin } from "./components/swap/SwapPanel";
import { CancelSwapDialog, ConfirmingSwapOverlay } from "./components/swap/SwapOverlays";
import { DEAL_LINE, INITIAL_METRICS, Metrics, SwapFrame, TARGETS } from "./components/swap/swapData";
import { Toaster } from "./components/ui/sonner";
import { Check, X } from "lucide-react";

interface DealLineTab {
  id: string;
  label: string;
}

const DEAL_LINE_RANGE = { start: DEAL_LINE.period.start, end: DEAL_LINE.period.end };
const DEAL_LINE_SELECTIONS = { format: DEAL_LINE.criteria.format, "media-type": DEAL_LINE.criteria.mediaType };
const BANNER_H = 40;

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [campaignSaved, setCampaignSaved] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [activePage, setActivePage] = useState("campaigns");

  // Lifted state for deal lines and views
  const [dealLines, setDealLines] = useState<DealLineTab[]>([
    { id: "dl1", label: "Deal line 1" },
  ]);
  const [activeDealLine, setActiveDealLine] = useState("dl1");
  const [activeView, setActiveView] = useState("map");
  const dealLineCounter = useRef(1);

  const handleCampaignSave = () => {
    setCampaignSaved(true);
    setDrawerOpen(false);
  };

  const handleAddDealLine = () => {
    dealLineCounter.current += 1;
    const newId = `dl${dealLineCounter.current}`;
    const newLabel = `Deal line ${dealLineCounter.current}`;
    setDealLines((prev) => [...prev, { id: newId, label: newLabel }]);
    setActiveDealLine(newId);
  };

  const handleNavigate = (id: string) => {
    setActivePage(id);
  };

  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(null);
  const [mapContainerSize, setMapContainerSize] = useState<{ width: number; height: number } | undefined>();
  const mapContainerRef = useRef<HTMLElement | null>(null);
  const [frameFilter, setFrameFilter] = useState("Available Frames");
  const [swapMode, setSwapMode] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const [swapDirty, setSwapDirty] = useState(false);
  const [cancelAsk, setCancelAsk] = useState(false);
  const [hoveredSwapFrame, setHoveredSwapFrame] = useState<string | null>(null);
  const [swapPins, setSwapPins] = useState<MapPin[]>([]);
  const [pendingSwap, setPendingSwap] = useState<SwapResult | null>(null);
  const [swapResult, setSwapResult] = useState<SwapResult | null>(null);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [swapFocusTarget, setSwapFocusTarget] = useState<{ lat: number; lng: number; nonce: number } | null>(null);
  const swapFocusNonce = useRef(0);

  // Overview copy/paste/undo
  const [selectedOverviewDl, setSelectedOverviewDl] = useState<string | null>(null);
  const [copiedOverviewDl, setCopiedOverviewDl] = useState<string | null>(null);
  const [pasteLoading, setPasteLoading] = useState(false);
  const [undoLoading, setUndoLoading] = useState(false);
  const undoStack = useRef<DealLineTab[][]>([]);

  const handleSwapFrameFocus = useCallback((f: SwapFrame) => {
    swapFocusNonce.current += 1;
    setSwapFocusTarget({ lat: f.lat, lng: f.lng, nonce: swapFocusNonce.current });
  }, []);

  // Keyed by the deal line target row ids
  const metTargets = {
    frame: metrics.frames >= TARGETS.frames,
    impressions: metrics.impressions >= TARGETS.impressions,
    budget: metrics.budget >= TARGETS.budget,
  };
  const targetsMet = metTargets.frame && metTargets.impressions && metTargets.budget;
  const swappedPins = useMemo(
    () => swapResult?.pins.map((p) => ({ ...p, tone: "success" as const })),
    [swapResult],
  );

  function enterSwap() {
    setSelectedMarker(null);
    setSwapMode(true);
    setSwapLoading(true);
    setTimeout(() => setSwapLoading(false), 1200 + Math.random() * 800);
  }

  function exitSwap() {
    setSwapMode(false);
    setCancelAsk(false);
    setSwapDirty(false);
    setSwapPins([]);
    setHoveredSwapFrame(null);
    setSwapFocusTarget(null);
    setSelectedMarker(null);
  }

  function handleSwapConfirmed() {
    const r = pendingSwap;
    if (!r) return;
    setPendingSwap(null);
    setMetrics((m) => ({
      frames: m.frames + r.delta.frames,
      impressions: m.impressions + r.delta.impressions,
      budget: m.budget + r.delta.budget,
    }));
    setSwapResult(r);
    exitSwap();
    const n = r.swappedIn.length;
    toast.custom(
      (id) => (
        <div
          role="status"
          className="flex items-start"
          style={{ gap: 12, width: "var(--width, 440px)", padding: "12px 12px 12px 16px", borderRadius: 8, backgroundColor: "#fff", border: "1px solid var(--neutral-300)", boxShadow: "0px 4px 12px rgba(16,16,52,0.08), 0px 1px 2px rgba(0,0,0,0.05)" }}
        >
          <Check size={16} color="var(--essential-secondary)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
          <span className="flex flex-col flex-1 min-w-0" style={{ gap: 2 }}>
            <span style={{ fontSize: "var(--text-sm)", lineHeight: "20px", fontWeight: "var(--font-weight-medium)", color: "var(--essential-primary)" }}>
              {n} {n === 1 ? "frame" : "frames"} swapped
            </span>
            <span style={{ fontSize: "var(--text-sm)", lineHeight: "20px", color: "var(--essential-secondary)" }}>
              {r.replacements ? "Donor campaigns have been updated with their replacements." : `Added to ${DEAL_LINE.name}.`}
            </span>
          </span>
          <button type="button" aria-label="Dismiss" onClick={() => toast.dismiss(id)} className="flex items-center justify-center cursor-pointer border-none bg-transparent p-0 shrink-0" style={{ width: 20, height: 20 }}>
            <X size={16} color="var(--essential-secondary)" />
          </button>
        </div>
      ),
      { duration: 6000 },
    );
  }

  const isOverview = activeView === "overview";
  const isMap = activeView === "map";

  useEffect(() => {
    if (!isOverview) {
      setSelectedOverviewDl(null);
      setCopiedOverviewDl(null);
      return;
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (!e.metaKey && !e.ctrlKey) return;
      if (e.key === "c" && selectedOverviewDl) {
        e.preventDefault();
        setCopiedOverviewDl(selectedOverviewDl);
        toast.success("Deal line copied");
      }
      if (e.key === "v" && copiedOverviewDl && !pasteLoading && !undoLoading) {
        e.preventDefault();
        setPasteLoading(true);
        const delay = 1000 + Math.random() * 1000;
        setTimeout(() => {
          setDealLines((prev) => {
            const idx = prev.findIndex((dl) => dl.id === copiedOverviewDl);
            if (idx === -1) return prev;
            // Snapshot before mutating so undo can restore
            undoStack.current.push(prev);
            dealLineCounter.current += 1;
            const source = prev[idx];
            const newDl = {
              id: `dl${dealLineCounter.current}`,
              label: source.label.replace(/ \(copy.*\)$/, "") + " (copy)",
            };
            const next = [...prev];
            next.splice(idx + 1, 0, newDl);
            return next;
          });
          setPasteLoading(false);
        }, delay);
      }
      if (e.key === "z" && !pasteLoading && !undoLoading && undoStack.current.length > 0) {
        e.preventDefault();
        setUndoLoading(true);
        const delay = 1000 + Math.random() * 1000;
        setTimeout(() => {
          const previous = undoStack.current.pop();
          if (previous) setDealLines(previous);
          setUndoLoading(false);
          toast.success("Action undone");
        }, delay);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOverview, selectedOverviewDl, copiedOverviewDl, pasteLoading, undoLoading]);

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: "var(--sidebar)" }}>
      <Sidebar activeId={activePage} onNavigate={handleNavigate} />
      {/* 4px border treatment wraps only the main content, not the sidebar */}
      <div className="flex-1 flex h-full" style={{ padding: 4 }}>
        <div className="flex-1 flex overflow-hidden" style={{ borderRadius: "var(--radius-sm)", backgroundColor: "var(--background)" }}>

          {activePage === "planning" ? (
            <AvailabilityReportPage />
          ) : (
            <div className="flex-1 flex overflow-hidden">
              {/* Campaign Info Drawer — full height, pushes content right */}
              <div
                className="shrink-0 h-full overflow-hidden transition-[width] duration-300 ease-in-out"
                style={{
                  width: drawerOpen ? 372 : 0,
                }}
              >
                <div className="h-full" style={{ width: 372 }}>
                  <CampaignInfoDrawer
                    onClose={() => setDrawerOpen(false)}
                    onSave={handleCampaignSave}
                  />
                </div>
              </div>

              {/* Header + content column */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header bar */}
                <div className="shrink-0 z-40">
                  <Header
                    drawerOpen={drawerOpen}
                    onToggleDrawer={() => setDrawerOpen((prev) => !prev)}
                    dealLines={dealLines}
                    activeDealLine={activeDealLine}
                    activeView={activeView}
                    onSetActiveDealLine={setActiveDealLine}
                    onAddDealLine={handleAddDealLine}
                    onSetActiveView={setActiveView}
                    swapMode={swapMode}
                  />
                </div>

                {/* Content area below header — fills remaining height */}
                <div className="flex flex-col flex-1 min-h-0">
                {swapMode && (
                  <SwapBanner onCancel={() => (swapDirty ? setCancelAsk(true) : exitSwap())} />
                )}
                <div className="flex flex-1 min-h-0 relative">
                  {campaignSaved && !swapMode && (
                    <>
                      {isOverview ? (
                        /* Overview mode: show ALL deal line panels side by side, scrollable */
                        <div
                          className="flex h-full overflow-x-auto"
                          onClick={() => setSelectedOverviewDl(null)}
                        >
                          {dealLines.map((dl) => {
                            const isSelected = selectedOverviewDl === dl.id;
                            const isCopied = copiedOverviewDl === dl.id;
                            return (
                              <div
                                key={dl.id}
                                className="shrink-0 h-full relative"
                                style={{ width: 372 }}
                                onClick={(e) => { e.stopPropagation(); setSelectedOverviewDl(dl.id); }}
                              >
                                <DealLinePanel
                                  dealLineName={dl.label}
                                  hideCheckAllocate
                                  initialDateRange={dl.id === "dl1" ? DEAL_LINE_RANGE : undefined}
                                  initialSelections={dl.id === "dl1" ? DEAL_LINE_SELECTIONS : undefined}
                                  metTargets={dl.id === "dl1" ? metTargets : undefined}
                                />
                                {/* Selection ring */}
                                {isSelected && (
                                  <div
                                    aria-hidden="true"
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                      outline: "2px solid var(--accent)",
                                      outlineOffset: "-2px",
                                      zIndex: 20,
                                    }}
                                  />
                                )}
                                {/* Copied badge */}
                                {isCopied && (
                                  <div
                                    className="absolute pointer-events-none"
                                    style={{
                                      top: 8,
                                      right: 8,
                                      zIndex: 21,
                                      backgroundColor: "var(--accent)",
                                      borderRadius: "var(--radius-full)",
                                      padding: "2px 8px",
                                    }}
                                  >
                                    <span style={{ fontSize: 11, fontWeight: 500, color: "#fff", fontFamily: "Inter, sans-serif" }}>
                                      Copied
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Map / Review mode: show only the active deal line panel */
                        <div className="shrink-0 h-full" style={{ width: 372 }}>
                          <DealLinePanel
                            key={activeDealLine}
                            dealLineName={
                              dealLines.find((dl) => dl.id === activeDealLine)
                                ?.label ?? "Deal Line 1"
                            }
                            onAvailabilityReady={() => setShowAvailability(true)}
                            initialDateRange={activeDealLine === "dl1" ? DEAL_LINE_RANGE : undefined}
                            initialSelections={activeDealLine === "dl1" ? DEAL_LINE_SELECTIONS : undefined}
                            metTargets={activeDealLine === "dl1" ? metTargets : undefined}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {swapMode && (
                    <SwapPanel
                      loading={swapLoading}
                      before={metrics}
                      hoveredId={hoveredSwapFrame}
                      onHover={setHoveredSwapFrame}
                      onFocusFrame={handleSwapFrameFocus}
                      onMapPins={setSwapPins}
                      onDirtyChange={setSwapDirty}
                      onConfirm={setPendingSwap}
                    />
                  )}

                  <main
                    className="flex-1 relative overflow-hidden"
                    ref={(el) => { mapContainerRef.current = el; }}
                  >
                    {/* Map fills the main content area in map mode */}
                    {isMap && (
                      <>
                        <MapView
                          showFrames={showAvailability || swapMode}
                          focusTarget={swapMode ? swapFocusTarget : null}
                          swapFrames={swapMode ? swapPins : swappedPins}
                          highlightedFrameId={hoveredSwapFrame}
                          onFrameHover={setHoveredSwapFrame}
                          onMarkerClick={(cluster) => {
                            // Map is context only while swapping
                            if (swapMode) return;
                            const el = mapContainerRef.current;
                            const size = el
                              ? { width: el.offsetWidth, height: el.offsetHeight }
                              : undefined;
                            setMapContainerSize(size);
                            setSelectedMarker(cluster);
                          }}
                        />
                        {!swapMode && (
                          <>
                            <MapSearchFilter
                              frameFilter={frameFilter}
                              onFrameFilterChange={setFrameFilter}
                            />
                            <FrameInfoCard
                              marker={selectedMarker}
                              onClose={() => setSelectedMarker(null)}
                              containerSize={mapContainerSize}
                            />
                          </>
                        )}
                      </>
                    )}
                  </main>

                  {/* Overview mode: single sticky Check Allocate button aligned right */}
                  {campaignSaved && isOverview && (
                    <div
                      className="absolute bottom-0 right-0 z-20 flex items-center justify-end"
                      style={{
                        padding: "12px 16px 24px 16px",
                      }}
                    >
                      <button
                        className="flex gap-1 h-9 items-center justify-center overflow-clip px-6 border-none outline-none cursor-pointer transition-colors duration-200 hover:opacity-90"
                        style={{
                          backgroundColor: "var(--primary)",
                          borderRadius: "var(--radius)",
                          minWidth: 160,
                          boxShadow: "var(--elevation-sm)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "var(--text-sm)",
                            fontWeight: "var(--font-weight-medium)",
                            lineHeight: "20px",
                            color: "var(--primary-foreground)",
                          }}
                        >
                          Check Allocate
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Availability panel — fixed over the map, only on map view */}
      <AvailabilityPanel
        visible={showAvailability && isMap && activePage !== "planning"}
        metrics={metrics}
        state={swapMode ? "swap" : targetsMet ? "done" : "missed"}
        top={swapMode ? 76 + BANNER_H : 76}
        onSwapFrame={enterSwap}
      />
      <Toaster position="bottom-right" style={{ "--width": "440px" } as React.CSSProperties} />
      <style>{`@keyframes swapSpin { to { transform: rotate(360deg); } }`}</style>

      {/* Paste loading overlay */}
      {pasteLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(19,18,33,0.35)",
            backdropFilter: "blur(2px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.25)",
              borderTopColor: "#ffffff",
              animation: "swapSpin 0.75s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Duplicating deal line
          </span>
        </div>
      )}

      {/* Undo loading overlay */}
      {undoLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(19,18,33,0.35)",
            backdropFilter: "blur(2px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.25)",
              borderTopColor: "#ffffff",
              animation: "swapSpin 0.75s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Undoing
          </span>
        </div>
      )}

      {pendingSwap && (
        <ConfirmingSwapOverlay
          frames={pendingSwap.swappedIn.length}
          replacements={pendingSwap.replacements}
          onDone={handleSwapConfirmed}
        />
      )}
      {cancelAsk && <CancelSwapDialog onKeep={() => setCancelAsk(false)} onCancel={exitSwap} />}
    </div>
  );
}