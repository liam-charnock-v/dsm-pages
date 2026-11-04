import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { toast } from "sonner";
import svgPaths from "../../imports/svg-wkq091htnl";
import { DuplicationSearchPanel } from "./DuplicationSearchPanel";
import { ShareCampaignModal } from "./ShareCampaignModal";

interface FormState {
  campaignName: string;
  advertiser: string;
  brand: string;
  productCategory: string;
  agency: string;
  specialist: string;
  salesPerson: string;
  salesTeam: string;
  adminPerson: string;
}

const INITIAL_STATE: FormState = {
  campaignName: "",
  advertiser: "",
  brand: "",
  productCategory: "",
  agency: "",
  specialist: "",
  salesPerson: "",
  salesTeam: "",
  adminPerson: "",
};

/* ── Autocomplete datasets ─────────────────────────────────────── */
const ADVERTISERS = [
  "Apple", "Amazon", "BMW", "Coca-Cola", "EDP", "Google",
  "H&M", "IKEA", "L'Oréal", "McDonald's", "Nestlé", "Netflix",
  "Nike", "Samsung", "Spotify", "Unilever", "Volkswagen", "Zara",
];

const BRANDS = [
  // Apple
  "iPhone", "Mac", "iPad", "Apple Watch", "AirPods",
  // Amazon
  "Amazon Prime", "Kindle", "Alexa",
  // BMW
  "BMW", "MINI", "Rolls-Royce",
  // Coca-Cola
  "Coca-Cola", "Fanta", "Sprite", "Minute Maid", "Powerade",
  // H&M
  "H&M", "COS", "& Other Stories", "Weekday",
  // L'Oréal
  "L'Oréal Paris", "Maybelline", "Garnier", "Lancôme", "Kérastase",
  // McDonald's
  "McDonald's", "McCafé",
  // Nestlé
  "Nescafé", "KitKat", "Maggi", "Milo", "Nespresso",
  // Nike
  "Nike", "Jordan", "Converse",
  // Samsung
  "Galaxy", "Neo QLED", "Samsung Health",
  // Unilever
  "Dove", "Axe", "Rexona", "Knorr", "Hellmann's",
  // Volkswagen
  "Volkswagen", "Audi", "Porsche", "SEAT", "Škoda",
  // Zara
  "Zara", "Zara Home",
];

const SALES_PERSONS = [
  "Ana Costa", "Beatriz Carvalho", "Catarina Oliveira", "Filipa Gonçalves",
  "Inês Lopes", "João Silva", "Mariana Alves", "Miguel Pereira",
  "Pedro Ferreira", "Ricardo Gomes", "Rui Sousa", "Sofia Rodrigues",
  "Tiago Nunes",
];

const SALES_TEAMS = ["International", "National"];

const ADMIN_PERSONS = [
  "Ana Barbosa", "António Ribeiro", "Carlos Mendes", "Filipa Gonçalves",
  "Isabel Martins", "Mariana Alves", "Paulo Fernandes", "Ricardo Gomes",
  "Sara Pinto", "Vasco Cunha",
];

const PRODUCT_CATEGORIES = [
  "Automotive",
  "Consumer Electronics",
  "Fashion & Apparel",
  "Financial Services",
  "Food & Beverage",
  "Healthcare",
  "Real Estate",
  "Retail",
  "Technology",
  "Travel & Hospitality",
];

export function CampaignInfoDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave?: () => void;
}) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [editingName, setEditingName] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [exclusionOpen, setExclusionOpen] = useState(false);
  const [duplicationEnabled, setDuplicationEnabled] = useState(true);
  const [duplicationItems, setDuplicationItems] = useState<string[]>(["IKEA PORTUGAL"]);
  const [duplicationPanelOpen, setDuplicationPanelOpen] = useState(false);
  const [juxtapositionEnabled, setJuxtapositionEnabled] = useState(true);
  const [juxtapositionItems, setJuxtapositionItems] = useState<string[]>(["LOJAS DE MOBILIÁRIO"]);
  const [juxtapositionPanelOpen, setJuxtapositionPanelOpen] = useState(false);
  const [productCategoryExclusivity, setProductCategoryExclusivity] = useState("None");
  const [productExclusivityOpen, setProductExclusivityOpen] = useState(false);
  const [advertiserBlocklist, setAdvertiserBlocklist] = useState(true);
  const [agencyBlocklist, setAgencyBlocklist] = useState(true);
  const [specialistBlocklist, setSpecialistBlocklist] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const productExclusivityRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const markDirty = () => setIsDirty(true);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    markDirty();
  };

  const handleClose = () => {
    if (isDirty) {
      setShowUnsavedModal(true);
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    setIsDirty(false);
    setShowUnsavedModal(false);
    toast.success("Changes saved");
    if (onSave) {
      onSave();
    }
  };

  const handleDiscard = () => {
    setIsDirty(false);
    setShowUnsavedModal(false);
    onClose();
  };

  useEffect(() => {
    if (editingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editingName]);

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    };
    if (categoryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [categoryOpen]);

  // Close product exclusivity dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productExclusivityRef.current && !productExclusivityRef.current.contains(e.target as Node)) {
        setProductExclusivityOpen(false);
      }
    };
    if (productExclusivityOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productExclusivityOpen]);

  return (
    <div
      className="bg-background flex flex-col items-start relative h-full w-[372px]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Outer border */}
      <div
        aria-hidden="true"
        className="absolute border border-border border-solid inset-0 pointer-events-none z-10"
      />

      {/* ===== TOP HEADER CARD ===== */}
      <div className="shrink-0 w-full">
        <div className="flex flex-col gap-2 items-start pb-2 pl-6 pr-2 pt-1 w-full">
          {/* Header row: campaign type selector + action icons */}
          <div className="flex items-center justify-between shrink-0 w-full">
            {/* Campaign type selector */}
            <div className="flex items-center pl-1 pr-2 py-1 rounded-[var(--radius)] shrink-0">
              <div className="flex gap-2 items-center rounded-[var(--radius)] shrink-0">
                {/* Direct Sales logo */}
                <div className="shrink-0">
                  <div
                    className="flex items-center justify-center overflow-clip rounded-[var(--radius-sm)] size-6"
                    style={{ backgroundColor: "#fcdcca" }}
                  >
                    <div className="overflow-clip relative size-4">
                      <div className="absolute" style={{ inset: "9.38% 9.38% 9.37% 9.37%" }}>
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                          <path d={svgPaths.p11cdc972} fill="#E4712E" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Title + caret */}
                <div className="flex gap-1 items-center shrink-0 cursor-pointer">
                  <div className="h-5 relative shrink-0">
                    <p
                      className="shrink-0"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-weight-medium)",
                        lineHeight: "20px",
                        color: "var(--foreground)",
                      }}
                    >
                      Direct Sales
                    </p>
                  </div>
                  <div className="overflow-clip relative shrink-0 size-4">
                    <div className="absolute" style={{ inset: "34.37% 15.62% 28.12% 15.62%" }}>
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
                        <path d={svgPaths.p10c93a80} fill="var(--foreground)" fillOpacity="0.7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action icons */}
            <div className="flex gap-1 items-center shrink-0">
              {/* Duplicate icon */}
              <button
                className="flex items-center justify-center overflow-clip rounded-[var(--radius-sm)] size-6 cursor-pointer bg-transparent border-none outline-none transition-colors duration-150 hover:bg-muted"
                title="Duplicate"
              >
                <div className="overflow-clip relative shrink-0 size-4">
                  <div className="absolute" style={{ inset: "8.33%" }}>
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                      <path d={svgPaths.p1a706900} fill="var(--foreground)" fillOpacity="0.75" />
                    </svg>
                  </div>
                </div>
              </button>
              {/* Link icon */}
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center justify-center overflow-clip rounded-[var(--radius-sm)] size-6 cursor-pointer bg-transparent border-none outline-none transition-colors duration-150 hover:bg-muted"
                title="Share campaign"
              >
                <div className="overflow-clip relative shrink-0 size-4">
                  <div className="absolute" style={{ inset: "12.49% 12.5% 12.47% 12.48%" }}>
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0035 12.0057">
                      <path d={svgPaths.p360335c0} fill="var(--foreground)" fillOpacity="0.75" />
                    </svg>
                  </div>
                </div>
              </button>
              {/* Panel icon */}
              <button
                onClick={handleClose}
                className="flex items-center justify-center overflow-clip rounded-[var(--radius-sm)] size-6 cursor-pointer bg-transparent border-none outline-none transition-colors duration-150 hover:bg-muted"
                title="Hide panel"
              >
                <div className="overflow-clip relative shrink-0 size-4">
                  <div className="absolute" style={{ inset: "15.63% 9.38%" }}>
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 11">
                      <path d={svgPaths.p1aae9760} fill="var(--foreground)" fillOpacity="0.75" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Campaign name + ID */}
          <div className="flex flex-col items-start shrink-0 w-full">
            {/* Editable Campaign Name */}
            <div className="flex h-6 items-start shrink-0 w-full">
              <div className="flex-1 h-6 min-w-[184px] rounded-[var(--radius-sm)]">
                <div className="flex flex-row items-center size-full" style={{ minWidth: "inherit" }}>
                  <div className="flex gap-1 items-center pl-[2px] relative size-full" style={{ minWidth: "inherit" }}>
                    {editingName ? (
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={form.campaignName}
                        onChange={(e) => updateField("campaignName", e.target.value)}
                        onBlur={() => setEditingName(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditingName(false);
                        }}
                        placeholder="New Campaign"
                        className="flex-1 min-w-0 bg-transparent border-none outline-none p-0"
                        style={{
                          fontSize: "var(--text-base)",
                          fontWeight: "var(--font-weight-medium)",
                          fontStyle: form.campaignName ? "normal" : "italic",
                          lineHeight: "24px",
                          color: form.campaignName ? "var(--foreground)" : "var(--muted-foreground)",
                          opacity: 0.8,
                        }}
                      />
                    ) : (
                      <button
                        onClick={() => setEditingName(true)}
                        className="flex flex-1 items-center min-w-0 bg-transparent border-none outline-none p-0 cursor-text text-left"
                      >
                        <div
                          className="flex flex-1 flex-col justify-center min-w-0 overflow-hidden whitespace-nowrap"
                          style={{
                            fontSize: "var(--text-base)",
                            fontWeight: "var(--font-weight-medium)",
                            fontStyle: form.campaignName ? "normal" : "italic",
                            lineHeight: "20px",
                            color: form.campaignName ? "var(--foreground)" : "var(--muted-foreground)",
                            opacity: 0.8,
                            textOverflow: "ellipsis",
                          }}
                        >
                          <p style={{ lineHeight: "24px", overflow: "hidden" }}>
                            {form.campaignName || "New Campaign"}
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign ID */}
            <div className="flex items-start shrink-0 w-full">
              <div className="flex-1 h-6 rounded-[var(--radius-sm)]">
                <div className="flex flex-row items-center size-full">
                  <div className="flex items-center justify-between pl-[2px] relative size-full">
                    <div
                      className="flex flex-1 flex-col justify-center min-w-0 overflow-hidden whitespace-nowrap"
                      style={{
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-weight-normal)",
                        lineHeight: 0,
                        color: "var(--muted-foreground)",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <p style={{ lineHeight: "20px", overflow: "hidden" }}>Campaign ID</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FORM FIELDS ===== */}
      <div className="flex flex-col items-start shrink-0 w-full">
        {/* Section 1: Advertiser, Brand, Product Category */}
        <div className="shrink-0 w-full">
          <div className="flex flex-col gap-2 items-start px-6 py-3 w-full">
            <FormRow label="Advertiser" required requiredColor="var(--foreground)">
              <ComboInput
                value={form.advertiser}
                onChange={(v) => updateField("advertiser", v)}
                options={ADVERTISERS}
              />
            </FormRow>
            <FormRow label="Brand " required>
              <ComboInput
                value={form.brand}
                onChange={(v) => updateField("brand", v)}
                options={BRANDS}
              />
            </FormRow>
            <FormRow label="Product Category" required>
              <div ref={categoryRef} className="relative w-[179px] shrink-0">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex gap-[2px] h-[26px] items-center justify-end overflow-clip px-2 relative rounded-[var(--radius-sm)] shrink-0 w-full cursor-pointer border-none outline-none transition-colors duration-150 hover:brightness-95"
                  style={{ backgroundColor: "var(--muted)" }}
                >
                  <div className="flex flex-1 items-center min-w-0">
                    <p
                      className="flex-1 min-w-0 overflow-hidden whitespace-nowrap text-left"
                      style={{
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-weight-normal)",
                        lineHeight: "20px",
                        color: form.productCategory ? "var(--foreground)" : "var(--muted-foreground)",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {form.productCategory || "\u00A0"}
                    </p>
                  </div>
                  <div className="overflow-clip relative shrink-0 size-4">
                    <div className="absolute" style={{ inset: "34.37% 15.62% 28.12% 15.62%" }}>
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
                        <path d={svgPaths.p10c93a80} fill="var(--muted-foreground)" />
                      </svg>
                    </div>
                  </div>
                </button>
                {/* Dropdown */}
                {categoryOpen && (
                  <div
                    className="absolute left-0 right-0 top-full z-20 mt-1 rounded-[var(--radius)] overflow-hidden"
                    style={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--elevation-sm)",
                    }}
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          updateField("productCategory", cat);
                          setCategoryOpen(false);
                        }}
                        className="flex items-center w-full px-2 py-1 cursor-pointer bg-transparent border-none outline-none text-left transition-colors duration-100 hover:bg-muted"
                        style={{
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--font-weight-normal)",
                          lineHeight: "20px",
                          color: form.productCategory === cat ? "var(--accent)" : "var(--foreground)",
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </FormRow>
          </div>
        </div>

        {/* Section 2: Agency, Specialist, Sales person, Sales team, Admin Person */}
        <div className="shrink-0 w-full">
          <div className="flex flex-col gap-2 items-start px-6 py-3 pb-[16px] w-full">
            <FormRow label="Agency">
              <TextInput
                value={form.agency}
                onChange={(v) => updateField("agency", v)}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Specialist">
              <TextInput
                value={form.specialist}
                onChange={(v) => updateField("specialist", v)}
                placeholder=""
              />
            </FormRow>
            <FormRow label="Sales person" requiredInLabel>
              <ComboInput
                value={form.salesPerson}
                onChange={(v) => updateField("salesPerson", v)}
                options={SALES_PERSONS}
              />
            </FormRow>
            <FormRow label="Sales team" requiredInLabel>
              <ComboInput
                value={form.salesTeam}
                onChange={(v) => updateField("salesTeam", v)}
                options={SALES_TEAMS}
              />
            </FormRow>
            <FormRow label="Admin Person" requiredInLabel>
              <ComboInput
                value={form.adminPerson}
                onChange={(v) => updateField("adminPerson", v)}
                options={ADMIN_PERSONS}
              />
            </FormRow>
          </div>
        </div>
      </div>

      {/* ===== EXCLUSION CRITERIA ===== */}
      <div className="relative shrink-0 w-full">
        <div
          aria-hidden="true"
          className="absolute border-t border-border border-solid inset-0 pointer-events-none"
        />
        {/* Header row — clickable to expand/collapse */}
        <button
          onClick={() => setExclusionOpen((o) => !o)}
          className="flex items-center justify-between w-full px-6 py-3 bg-transparent border-none outline-none cursor-pointer text-left transition-colors duration-150 hover:bg-muted/40"
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: "var(--font-weight-medium)",
              lineHeight: "24px",
              color: "#131221",
            }}
          >
            Exclusion Criteria
          </span>
          {exclusionOpen
            ? <ChevronUp size={16} color="#131221" />
            : <ChevronDown size={16} color="#131221" />
          }
        </button>

        {/* Expanded content */}
        {exclusionOpen && (
          <div className="flex flex-col gap-0 px-6 pb-4">

            {/* Duplication */}
            <div className="flex flex-col gap-1" style={{ borderBottom: "1px solid var(--border)", paddingTop: 8, paddingBottom: 8 }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "#131221", lineHeight: "20px" }}>
                  Duplication
                </span>
                <Toggle checked={duplicationEnabled} onChange={(v) => { setDuplicationEnabled(v); markDirty(); }} />
              </div>
              {duplicationEnabled && (
                <div className="flex flex-wrap gap-1 mt-1 items-center">
                  <button
                    onClick={() => setDuplicationPanelOpen(true)}
                    className="flex items-center gap-0.5 bg-transparent border-none outline-none cursor-pointer p-0"
                    style={{ fontSize: "var(--text-xs)", color: "var(--accent)", lineHeight: "20px" }}
                  >
                    <Plus size={12} strokeWidth={2.5} />
                    Add
                  </button>
                  {duplicationItems.map((item, i) => (
                    <ExclusionChip key={i} label={item} onRemove={() => { setDuplicationItems((p) => p.filter((_, idx) => idx !== i)); markDirty(); }} />
                  ))}
                </div>
              )}
            </div>

            {duplicationPanelOpen && (
              <DuplicationSearchPanel
                title="Add duplication advertisers"
                selectedItems={duplicationItems}
                onAdd={(item) => { setDuplicationItems((p) => p.includes(item) ? p : [...p, item]); markDirty(); }}
                onRemove={(item) => { setDuplicationItems((p) => p.filter((x) => x !== item)); markDirty(); }}
                onClose={() => setDuplicationPanelOpen(false)}
              />
            )}

            {/* Juxtaposition */}
            <div className="flex flex-col gap-1" style={{ borderBottom: "1px solid var(--border)", paddingTop: 8, paddingBottom: 8 }}>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-medium)", color: "#131221", lineHeight: "20px" }}>
                  Juxtaposition
                </span>
                <Toggle checked={juxtapositionEnabled} onChange={(v) => { setJuxtapositionEnabled(v); markDirty(); }} />
              </div>
              {juxtapositionEnabled && (
                <div className="flex flex-wrap gap-1 mt-1 items-center">
                  <button
                    onClick={() => setJuxtapositionPanelOpen(true)}
                    className="flex items-center gap-0.5 bg-transparent border-none outline-none cursor-pointer p-0"
                    style={{ fontSize: "var(--text-xs)", color: "var(--accent)", lineHeight: "20px" }}
                  >
                    <Plus size={12} strokeWidth={2.5} />
                    Add
                  </button>
                  {juxtapositionItems.map((item, i) => (
                    <ExclusionChip key={i} label={item} onRemove={() => { setJuxtapositionItems((p) => p.filter((_, idx) => idx !== i)); markDirty(); }} />
                  ))}
                </div>
              )}
            </div>

            {juxtapositionPanelOpen && (
              <DuplicationSearchPanel
                title="Add juxtaposition advertisers"
                selectedItems={juxtapositionItems}
                onAdd={(item) => { setJuxtapositionItems((p) => p.includes(item) ? p : [...p, item]); markDirty(); }}
                onRemove={(item) => { setJuxtapositionItems((p) => p.filter((x) => x !== item)); markDirty(); }}
                onClose={() => setJuxtapositionPanelOpen(false)}
              />
            )}

            {/* Product category exclusivity */}
            <div className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)", paddingTop: 8, paddingBottom: 8 }}>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-normal)", color: "#131221", lineHeight: "20px" }}>
                Product category exclusivity
              </span>
              <div ref={productExclusivityRef} className="relative">
                <button
                  onClick={() => setProductExclusivityOpen((o) => !o)}
                  className="flex items-center gap-1 px-2 h-7 rounded-[var(--radius-sm)] border-none outline-none cursor-pointer transition-colors duration-150"
                  style={{ backgroundColor: "var(--muted)", minWidth: 80 }}
                >
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--foreground)", lineHeight: "20px" }}>
                    {productCategoryExclusivity}
                  </span>
                  <ChevronDown size={12} color="var(--muted-foreground)" />
                </button>
                {productExclusivityOpen && (
                  <div
                    className="absolute right-0 top-full mt-1 rounded-[var(--radius)] overflow-hidden z-20"
                    style={{ backgroundColor: "var(--popover)", border: "1px solid var(--border)", boxShadow: "var(--elevation-sm)", minWidth: 100 }}
                  >
                    {["None", "Category", "Sub-category"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setProductCategoryExclusivity(opt); setProductExclusivityOpen(false); markDirty(); }}
                        className="flex items-center w-full px-2 py-1 bg-transparent border-none outline-none cursor-pointer text-left transition-colors duration-100 hover:bg-muted"
                        style={{ fontSize: "var(--text-xs)", color: productCategoryExclusivity === opt ? "var(--accent)" : "var(--foreground)", lineHeight: "20px" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Advertiser blocklist */}
            <div className="flex items-center justify-between" style={{ paddingTop: 8, paddingBottom: 8 }}>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-normal)", color: "#131221", lineHeight: "20px" }}>
                Advertiser blocklist
              </span>
              <Toggle checked={advertiserBlocklist} onChange={(v) => { setAdvertiserBlocklist(v); markDirty(); }} />
            </div>

            {/* Agency blocklist */}
            <div className="flex items-center justify-between" style={{ paddingTop: 8, paddingBottom: 8 }}>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-normal)", color: "#131221", lineHeight: "20px" }}>
                Agency blocklist
              </span>
              <Toggle checked={agencyBlocklist} onChange={(v) => { setAgencyBlocklist(v); markDirty(); }} />
            </div>

            {/* Specialist blocklist */}
            <div className="flex items-center justify-between" style={{ paddingTop: 8, paddingBottom: 8 }}>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--font-weight-normal)", color: "#131221", lineHeight: "20px" }}>
                Specialist blocklist
              </span>
              <Toggle checked={specialistBlocklist} onChange={(v) => { setSpecialistBlocklist(v); markDirty(); }} />
            </div>

          </div>
        )}
      </div>

      {/* ===== SPACER + SAVE BUTTON ===== */}
      <div className="flex flex-col flex-1 items-center justify-end pb-6 pt-3 px-4 w-full">
        <button
          disabled={!isDirty}
          onClick={handleSave}
          className="flex gap-1 h-9 items-center justify-center overflow-clip px-3 rounded-[var(--radius)] shrink-0 w-[320px] border-none outline-none transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          style={{
            backgroundColor: isDirty ? "var(--accent)" : "var(--muted)",
            minWidth: "36px",
          }}
        >
          <div className="flex items-start px-1 shrink-0">
            <p
              className="shrink-0"
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "20px",
                color: isDirty ? "var(--accent-foreground)" : "var(--muted-foreground)",
              }}
            >
              Save
            </p>
          </div>
        </button>
      </div>

      {/* ===== UNSAVED CHANGES MODAL ===== */}
      {showUnsavedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowUnsavedModal(false); }}
        >
          <div
            className="flex flex-col gap-5 rounded-[var(--radius-lg)] p-6"
            style={{
              backgroundColor: "var(--background)",
              width: 360,
              boxShadow: "0px 8px 32px rgba(16,16,52,0.16), 0px 1px 4px rgba(16,16,52,0.08)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Title */}
            <div className="flex flex-col gap-1">
              <p
                style={{
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: "24px",
                  color: "var(--foreground)",
                }}
              >
                Unsaved changes
              </p>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-normal)",
                  lineHeight: "20px",
                  color: "var(--muted-foreground)",
                }}
              >
                Would you like to save your changes before continuing?
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleDiscard}
                className="flex items-center justify-center h-9 px-4 rounded-[var(--radius)] border-none outline-none cursor-pointer transition-colors duration-150"
                style={{
                  backgroundColor: "var(--muted)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: "20px",
                  color: "var(--foreground)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                className="flex items-center justify-center h-9 px-4 rounded-[var(--radius)] border-none outline-none cursor-pointer transition-colors duration-150"
                style={{
                  backgroundColor: "var(--accent)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  lineHeight: "20px",
                  color: "var(--accent-foreground)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "")}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SHARE CAMPAIGN MODAL ===== */}
      {showShareModal && (
        <ShareCampaignModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}

/* ===== SUBCOMPONENTS ===== */

function FormRow({
  label,
  required,
  requiredColor,
  requiredInLabel,
  children,
}: {
  label: string;
  required?: boolean;
  requiredColor?: string;
  requiredInLabel?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[26px] items-center justify-between shrink-0 w-full">
      <div className="flex gap-[2px] items-center shrink-0">
        <div className="flex gap-[2px] items-center shrink-0">
          <p
            className="shrink-0"
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-normal)",
              lineHeight: "20px",
              color: required && requiredColor ? requiredColor : "var(--muted-foreground)",
            }}
          >
            {label}{requiredInLabel ? "*" : ""}
          </p>
        </div>
        {required && !requiredInLabel && (
          <p
            className="shrink-0"
            style={{
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-normal)",
              lineHeight: "20px",
              color: required && requiredColor ? requiredColor : "var(--muted-foreground)",
            }}
          >
            *
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  return (
    <div
      className="flex gap-[2px] h-[26px] items-center justify-end overflow-clip px-2 rounded-[var(--radius-sm)] shrink-0 w-[179px]"
      style={{ backgroundColor: "var(--muted)" }}
    >
      <div className="flex flex-1 items-center min-w-0">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent border-none outline-none p-0"
          style={{
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-normal)",
            lineHeight: "20px",
            color: "var(--foreground)",
            textOverflow: "ellipsis",
          }}
        />
      </div>
    </div>
  );
}

function ComboInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(value.toLowerCase())
  );
  const showDropdown = focused && filtered.length > 0;

  useEffect(() => {
    if (showDropdown && wrapperRef.current) {
      setAnchorRect(wrapperRef.current.getBoundingClientRect());
    }
  }, [showDropdown, value]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: 179, flexShrink: 0, height: 26 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 26,
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: "var(--radius-sm)",
          backgroundColor: "var(--muted)",
          outline: focused ? "1px solid var(--accent)" : "none",
          outlineOffset: "-1px",
          boxSizing: "border-box",
          transition: "outline-color 0.12s",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-normal)",
            lineHeight: "20px",
            color: "var(--foreground)",
            textOverflow: "ellipsis",
            fontFamily: "inherit",
          }}
        />
      </div>

      {showDropdown && anchorRect && createPortal(
        <div
          style={{
            position: "fixed",
            top: anchorRect.bottom + 2,
            left: anchorRect.left,
            width: Math.max(anchorRect.width, 179),
            zIndex: 9999,
            backgroundColor: "var(--popover, #fff)",
            borderRadius: "var(--radius, 6px)",
            border: "1px solid var(--border, rgba(19,18,33,0.12))",
            boxShadow: "0px 4px 16px rgba(16,16,52,0.10)",
            overflow: "hidden",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {filtered.slice(0, 8).map((opt) => (
            <button
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(opt);
                setFocused(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "4px 8px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "var(--text-xs)",
                fontWeight: opt === value ? "var(--font-weight-medium)" : "var(--font-weight-normal)",
                lineHeight: "20px",
                color: opt === value ? "var(--accent)" : "var(--foreground)",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted, rgba(19,18,33,0.05))")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {opt}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex items-center shrink-0 cursor-pointer rounded-full border-none outline-none transition-colors duration-200 focus-visible:ring-2"
      style={{
        width: 36,
        height: 20,
        backgroundColor: checked ? "var(--accent)" : "var(--muted-foreground)",
        padding: 2,
      }}
    >
      <span
        style={{
          display: "block",
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#fff",
          transform: checked ? "translateX(16px)" : "translateX(0)",
          transition: "transform 200ms",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

function ExclusionChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: "var(--muted)",
        fontSize: "var(--text-xs)",
        color: "var(--foreground)",
        lineHeight: "18px",
        maxWidth: 140,
      }}
    >
      <span className="overflow-hidden whitespace-nowrap" style={{ textOverflow: "ellipsis", maxWidth: 110 }}>
        {label}
      </span>
      <button
        onClick={onRemove}
        className="flex items-center justify-center bg-transparent border-none outline-none cursor-pointer p-0 opacity-60 hover:opacity-100 transition-opacity shrink-0"
      >
        <X size={10} strokeWidth={2.5} />
      </button>
    </span>
  );
}