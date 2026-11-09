import svgPaths from "./svg-81ibrgj3wk";

export default function AvailabilityHeadingFilter() {
  return (
    <div className="bg-white content-stretch flex gap-[20px] items-center pb-[12px] pt-[16px] px-[20px] relative rounded-[4px] size-full" data-name="Availability - Heading/filter">
      <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="_title-header-campaign-creation">
        <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[8px] shrink-0" data-name="campaign-name">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[#131221] text-[20px] whitespace-nowrap">
            <p className="leading-[28px]">Availability report</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-center min-h-px min-w-px relative">
        <div className="bg-[#e1e1e5] content-stretch flex gap-px h-[28px] items-center justify-center min-w-[36px] overflow-clip px-[8px] relative rounded-[6px] shrink-0" data-name="Button">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
            <div className="absolute inset-[13.28%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.75 11.75">
                <path d={svgPaths.p14f6ea80} fill="var(--fill-0, #BAB9C3)" id="Vector" />
              </svg>
            </div>
          </div>
          <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#bab9c3] text-[13px] whitespace-nowrap">Check availability</p>
          </div>
        </div>
      </div>
    </div>
  );
}