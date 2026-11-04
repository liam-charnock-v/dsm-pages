import svgPaths from "./svg-x8q1bp8e0d";

function PaddingContent() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="padding-content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">Lg. Trindade Co|</p>
        </div>
      </div>
    </div>
  );
}

function PaddingResetIcon() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-center relative shrink-0" data-name="padding-reset-icon">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="end-icon">
        <div className="absolute inset-[9.29%_9.37%_9.37%_9.29%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2676 16.2676">
            <path d={svgPaths.p397dcfc0} fill="var(--fill-0, #131221)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-[328px]" data-name="input">
      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[12px] relative rounded-[inherit] size-full">
        <PaddingContent />
        <PaddingResetIcon />
      </div>
      <div aria-hidden className="absolute border-2 border-[#2c24c3] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="_title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[8px] py-[4px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[13px] whitespace-nowrap">3 results</p>
        </div>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="drop-shadow-[0px_1px_1px_rgba(16,16,52,0.08)] overflow-clip relative shrink-0 size-[16px]" data-name="loc">
            <div className="absolute inset-[6.25%_15.63%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 13.9999">
                <path d={svgPaths.p47f0f00} fill="var(--fill-0, #605F6B)" id="Vector" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#131221] text-[13px]">Lg. Trindade Coelho, 1200-339 Lisbon</p>
        </div>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="drop-shadow-[0px_1px_1px_rgba(16,16,52,0.08)] overflow-clip relative shrink-0 size-[16px]" data-name="frame">
            <div className="absolute inset-[6.25%_21.88%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
                <path d={svgPaths.p789d080} fill="var(--fill-0, #605F6B)" id="Vector" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#131221] text-[13px]">PT-LSB-AB-01521.D1.01</p>
        </div>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="drop-shadow-[0px_1px_1px_rgba(16,16,52,0.08)] overflow-clip relative shrink-0 size-[16px]" data-name="frame">
            <div className="absolute inset-[6.25%_21.88%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
                <path d={svgPaths.p789d080} fill="var(--fill-0, #605F6B)" id="Vector" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-w-px not-italic relative text-[#42414e] text-[13px]">PT-PRT-DD-00080.D2.02</p>
        </div>
      </div>
    </div>
  );
}

function SelectOpen() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[328px]" data-name="_select-open">
      <Title />
      <Item />
      <Item1 />
      <Item2 />
    </div>
  );
}

function OpenDd() {
  return (
    <div className="absolute content-stretch drop-shadow-[0px_3px_2px_rgba(16,16,52,0.06)] flex flex-col gap-[8px] items-start left-[-4px] pb-[6px] pt-[4px] px-[4px] rounded-[8px] top-[-4px]" data-name="open-dd">
      <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[8px]" />
      <div aria-hidden className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Input />
      <SelectOpen />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

function OpenDdMask() {
  return (
    <div className="bg-white h-[36px] relative shrink-0 w-[328px] z-[2]" data-name="open-dd-mask">
      <OpenDd />
    </div>
  );
}

function Dropdown() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] isolate items-start justify-center relative shrink-0 w-[328px]" data-name="Dropdown">
      <OpenDdMask />
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

function PaddingResetIcon1() {
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
          <PaddingResetIcon1 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

export default function SearchFilter() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip p-[8px] relative rounded-[6px] size-full" data-name="search-filter">
      <Dropdown />
      <div className="content-stretch flex flex-col gap-[8px] isolate items-start justify-center relative shrink-0 w-[328px]" data-name="Dropdown">
        <Input1 />
      </div>
    </div>
  );
}