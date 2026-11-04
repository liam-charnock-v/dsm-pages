import svgPaths from "./svg-ot52x6f1yq";

function PaddingContent() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="padding-content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[13px] text-ellipsis whitespace-nowrap">Search for a location or Frame ID</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="input">
      <div aria-hidden className="absolute bg-[#f8f8f9] inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="start-icon">
            <div className="absolute inset-[9.29%_9.37%_9.37%_9.29%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2676 16.2676">
                <path d={svgPaths.p397dcfc0} fill="var(--fill-0, #42414E)" id="Vector" />
              </svg>
            </div>
          </div>
          <PaddingContent />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-w-px not-italic overflow-hidden relative text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden text-ellipsis">Frame</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[6.25%_21.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
            <path d={svgPaths.p789d080} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading />
    </div>
  );
}

function PaddingText() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[rgba(10,0,185,0.86)] whitespace-nowrap">Required</p>
    </div>
  );
}

function ParentContent() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="parent-content">
      <PaddingText />
    </div>
  );
}

function Chips() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Chips">
      <div className="bg-[rgba(35,55,255,0)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip 1">
        <ParentContent />
      </div>
    </div>
  );
}

function RightIcon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="right-icon">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="size=small, priority=low, state=default">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute flex inset-[19.79%_44.79%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
              <div className="relative size-full" data-name="vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66602 1.66602">
                  <path d={svgPaths.p3f8c0f80} fill="var(--fill-0, #131221)" fillOpacity="0.7" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileHeading() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-full" data-name="tile-heading">
      <TileType />
      <Chips />
      <RightIcon />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Deal creation card">
        <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[6px]" />
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[8px] pr-[4px] py-[4px] relative size-full">
            <TileHeading />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden className="absolute border border-[rgba(5,5,45,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_3px_4px_0px_rgba(16,16,52,0.06)]" />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative size-full">
          <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-w-px not-italic overflow-hidden relative text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden text-ellipsis">{`Schedule `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[6.25%_12.5%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
            <path d={svgPaths.p3f356000} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading1 />
    </div>
  );
}

function PaddingText1() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[rgba(10,0,185,0.86)] whitespace-nowrap">Required</p>
    </div>
  );
}

function ParentContent1() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="parent-content">
      <PaddingText1 />
    </div>
  );
}

function Chips1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Chips">
      <div className="bg-[rgba(35,55,255,0)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip 1">
        <ParentContent1 />
      </div>
    </div>
  );
}

function RightIcon1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="right-icon">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="size=small, priority=low, state=default">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute flex inset-[19.79%_44.79%] items-center justify-center" style={{ containerType: "size" }}>
            <div className="flex-none h-[100cqw] rotate-90 w-[100cqh]">
              <div className="relative size-full" data-name="vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66602 1.66602">
                  <path d={svgPaths.p3f8c0f80} fill="var(--fill-0, #131221)" fillOpacity="0.7" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileHeading1() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-full" data-name="tile-heading">
      <TileType1 />
      <Chips1 />
      <RightIcon1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[8px] items-center left-0 p-[8px] rounded-[6px] top-0 w-[357px]">
      <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Input">
        <Input />
      </div>
      <Frame1 />
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Deal creation card">
        <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[6px]" />
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[8px] pr-[4px] py-[4px] relative size-full">
            <TileHeading1 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden className="absolute border border-[rgba(5,5,45,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_3px_4px_0px_rgba(16,16,52,0.06)]" />
      </div>
    </div>
  );
}

export default function Group() {
  return (
    <div className="contents relative size-full">
      <Frame />
    </div>
  );
}