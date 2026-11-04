import svgPaths from "../../imports/svg-r0nxqn6pik";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  svgPath: string;
  viewBox: string;
  hasClipPath?: boolean;
  defaultOpacity: string;
}

const navItems: NavItem[] = [
  { id: "analytics", label: "Analytics", svgPath: svgPaths.p662e880, viewBox: "0 0 18 18", defaultOpacity: "0.7" },
  { id: "campaigns", label: "Campaigns", svgPath: svgPaths.p19a1d380, viewBox: "0 0 18 18", defaultOpacity: "1" },
  { id: "creative", label: "Creative Tools", svgPath: svgPaths.p2c3d9d70, viewBox: "0 0 18 18", hasClipPath: true, defaultOpacity: "0.7" },
  { id: "planning", label: "Planning", svgPath: svgPaths.pc624d00, viewBox: "0 0 18 18", defaultOpacity: "0.7" },
  { id: "settings", label: "Settings", svgPath: svgPaths.p17ec0380, viewBox: "0 0 18 18", defaultOpacity: "0.7" },
  { id: "profile", label: "Profile", svgPath: svgPaths.p22fafc00, viewBox: "0 0 18 18", defaultOpacity: "0.7" },
];

interface SidebarProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
}

export function Sidebar({ activeId: externalActiveId, onNavigate }: SidebarProps) {
  const [internalActiveId, setInternalActiveId] = useState("campaigns");
  const activeId = externalActiveId ?? internalActiveId;

  const handleClick = (id: string) => {
    setInternalActiveId(id);
    onNavigate?.(id);
  };

  return (
    <div
      className="bg-sidebar flex flex-col gap-[43.59px] items-center pt-4 w-[60px] shrink-0 z-50 h-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Logo */}
      <div className="flex items-start shrink-0">
        <div
          className="inline-grid place-items-start relative shrink-0 leading-[0]"
          style={{ gridTemplateColumns: "max-content", gridTemplateRows: "max-content" }}
        >
          <div className="col-start-1 row-start-1 relative w-[24.633px] h-[24.701px] mt-[22.81%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.6327 24.7005">
              <path d={svgPaths.p3ce11000} fill="var(--sidebar-foreground)" />
            </svg>
          </div>
          <div className="col-start-1 row-start-1 relative w-[5.281px] h-[7.035px] ml-[39.29%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.28116 7.03519">
              <path d={svgPaths.p245f6b00} fill="var(--sidebar-foreground)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex flex-col gap-5 items-start shrink-0 w-full">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div key={item.id} className="relative shrink-0 w-full">
              <div className="flex flex-col items-center size-full">
                <div className="flex flex-col items-center px-[13px] relative w-full">
                  <button
                    onClick={() => handleClick(item.id)}
                    className="flex items-start p-2 rounded-[var(--radius)] shrink-0 cursor-pointer bg-transparent border-none outline-none transition-all duration-150 hover:bg-[rgba(255,255,255,0.08)] focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                    title={item.label}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="relative shrink-0 size-[18px]">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={item.viewBox}>
                        {item.hasClipPath ? (
                          <>
                            <g clipPath={`url(#clip_${item.id})`}>
                              <path
                                d={item.svgPath}
                                fill="var(--sidebar-foreground)"
                                fillOpacity={isActive ? "1" : item.defaultOpacity}
                                className="transition-all duration-150"
                              />
                            </g>
                            <defs>
                              <clipPath id={`clip_${item.id}`}>
                                <rect fill="white" height="18" width="18" />
                              </clipPath>
                            </defs>
                          </>
                        ) : (
                          <path
                            d={item.svgPath}
                            fill="var(--sidebar-foreground)"
                            fillOpacity={isActive ? "1" : item.defaultOpacity}
                            className="transition-all duration-150"
                          />
                        )}
                      </svg>
                    </div>
                  </button>

                  {/* Active indicator tab */}
                  {isActive && (
                    <div className="absolute bg-sidebar-primary h-4 right-0 rounded-bl-[var(--radius-sm)] rounded-tl-[var(--radius-sm)] top-[9px] w-1" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spacer to push logout to bottom */}
      <div className="flex-1" />

      {/* Logout button - absolutely positioned at bottom */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center justify-center px-[18px]">
        <div className="flex flex-col items-start shrink-0">
          <button
            className="flex items-center overflow-clip p-[2px] rounded-[12px] shrink-0 size-6 cursor-pointer bg-transparent border-none outline-none transition-all duration-150 hover:bg-[rgba(255,255,255,0.08)] focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            title="Log out"
            aria-label="Log out"
          >
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-180">
                <div className="relative size-5">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p1b6d5000} fill="var(--sidebar-foreground)" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}