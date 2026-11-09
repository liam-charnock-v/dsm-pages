export default function ClusterLargeAvailable() {
  return (
    <div className="relative size-full" data-name="cluster-large-available">
      <div className="absolute bg-[rgba(44,36,195,0.2)] border border-[rgba(44,36,195,0.3)] border-solid inset-0 rounded-[100px]" data-name="radius" />
      <div className="absolute contents inset-[24.36%]" data-name="large-area">
        <div className="absolute aspect-[40/40] flex items-center justify-center left-[24.36%] right-[24.36%] top-[19px]">
          <div className="-rotate-90 flex-none size-[40px]">
            <div className="relative size-full" data-name="pin">
              <div className="absolute inset-[-5%_-10%_-15%_-10%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                  <g filter="url(#filter0_d_29_1200)" id="pin">
                    <circle cx="24" cy="22" fill="var(--fill-0, #2C24C3)" fillOpacity="0.8" r="20" shapeRendering="crispEdges" />
                    <circle cx="24" cy="22" r="19.5" shapeRendering="crispEdges" stroke="var(--stroke-0, #F0F2FE)" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_29_1200" width="48" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0745098 0 0 0 0 0.0705882 0 0 0 0 0.129412 0 0 0 0.16 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_29_1200" />
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow_29_1200" mode="normal" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold inset-[26.92%] justify-center leading-[0] not-italic text-[11px] text-center text-white tracking-[-0.44px] uppercase">
          <p className="leading-[12px]">1,000</p>
        </div>
      </div>
    </div>
  );
}