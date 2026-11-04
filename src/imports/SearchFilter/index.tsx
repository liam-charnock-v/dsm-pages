import svgPaths from "./svg-r3nrydamdj";

function PaddingContent() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="padding-content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[13px] text-ellipsis whitespace-nowrap">Search for frames or locations</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] relative size-full">
          <PaddingContent />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="end-icon">
            <div className="absolute inset-[9.29%_9.37%_9.37%_9.29%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2676 16.2676">
                <path d={svgPaths.p397dcfc0} fill="var(--fill-0, #42414E)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

function PaddingContent1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="padding-content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[13px] text-ellipsis whitespace-nowrap">Available Frames</p>
        </div>
      </div>
    </div>
  );
}

function PaddingResetIcon() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-center relative shrink-0" data-name="padding-reset-icon">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="end-icon">
        <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7507 7.50084">
            <path d={svgPaths.p1276f900} fill="var(--fill-0, #52515E)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full z-[2]" data-name="input">
      <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="start-icon">
            <div className="absolute inset-[6.25%_21.88%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 17.5">
                <path d={svgPaths.p3ee33100} fill="var(--fill-0, #42414E)" id="Vector" />
              </svg>
            </div>
          </div>
          <PaddingContent1 />
          <PaddingResetIcon />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

export default function SearchFilter() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip p-[8px] relative rounded-[6px] size-full" data-name="search-filter">
      <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Input">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-[328px]" data-name="Input">
          <Input />
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] isolate items-start justify-center relative shrink-0 w-[328px]" data-name="Dropdown">
        <Input1 />
      </div>
    </div>
  );
}