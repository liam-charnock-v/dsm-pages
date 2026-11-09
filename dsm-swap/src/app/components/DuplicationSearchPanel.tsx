import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Search, Check } from "lucide-react";

const MOCK_ADVERTISERS = [
  "IKEA PORTUGAL",
  "IKEA SPAIN",
  "IKEA FRANCE",
  "LOJAS DE MOBILIÁRIO",
  "ZARA PORTUGAL",
  "ZARA ESPAÑA",
  "H&M GROUP",
  "MANGO FASHION",
  "PRIMARK STORES",
  "NIKE INC",
  "ADIDAS AG",
  "PUMA SE",
  "UNILEVER NV",
  "PROCTER & GAMBLE",
  "HENKEL AG",
  "NESTLÉ SA",
  "COCA-COLA IBERIA",
  "PEPSICO INC",
  "DANONE SA",
  "APPLE INC",
  "SAMSUNG GROUP",
  "LG ELECTRONICS",
  "L'ORÉAL GROUP",
  "BEIERSDORF AG",
  "MCDONALDS IBERIA",
  "BURGER KING IBERIA",
  "TELEPIZZA GROUP",
  "EL CORTE INGLÉS",
  "INDITEX GROUP",
  "MERCADONA SA",
];

interface DuplicationSearchPanelProps {
  title: string;
  selectedItems: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  onClose: () => void;
}

function PanelContent({
  title,
  selectedItems,
  onAdd,
  onRemove,
  onClose,
}: DuplicationSearchPanelProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = MOCK_ADVERTISERS.filter((a) =>
    a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed",
        left: 440,
        top: 4,
        bottom: 4,
        width: 392,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#fdfdfd",
        border: "1px solid rgba(5,5,38,0.12)",
        boxShadow: "0px 4px 16px rgba(16,16,52,0.12), 0px 1px_2px rgba(16,16,52,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          borderBottom: "1px solid rgba(5,5,38,0.12)",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            lineHeight: "20px",
            color: "#131221",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#7c7b87",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            SB12308732
          </span>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              background: "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer",
              borderRadius: 2,
              color: "#42414E",
              padding: 0,
            }}
            className="hover:bg-[rgba(5,5,38,0.06)] transition-colors duration-150"
          >
            <X size={10} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ flexShrink: 0, padding: 12 }}>
        <div
          style={{
            position: "relative",
            height: 28,
            borderRadius: 6,
            backgroundColor: "#fff",
            border: "1px solid rgba(5,5,38,0.12)",
            boxShadow: "0px 1px 2px rgba(16,16,52,0.08)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              padding: "0 10px",
              fontSize: 13,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#131221",
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", paddingRight: 10 }}>
            <Search size={13} color="#7c7b87" />
          </div>
        </div>
      </div>

      {/* Results list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 80,
              fontSize: 13,
              color: "#7c7b87",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            No results found
          </div>
        ) : (
          filtered.map((advertiser) => {
            const selected = selectedItems.includes(advertiser);
            return (
              <button
                key={advertiser}
                onClick={() => selected ? onRemove(advertiser) : onAdd(advertiser)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 20px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  borderBottom: "1px solid rgba(5,5,38,0.06)",
                  transition: "background-color 100ms",
                }}
                className="hover:bg-[rgba(5,5,38,0.04)]"
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: selected ? 500 : 400,
                    lineHeight: "20px",
                    color: selected ? "#131221" : "#42414E",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {advertiser}
                </span>
                {selected && (
                  <Check size={14} strokeWidth={2.5} color="var(--accent)" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export function DuplicationSearchPanel(props: DuplicationSearchPanelProps) {
  return createPortal(<PanelContent {...props} />, document.body);
}
