import svgPaths from "./svg-fp0z0az7an";

function CampaignName() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[8px] shrink-0" data-name="campaign-name">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[#131221] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">Availability report</p>
      </div>
    </div>
  );
}

function PaddingLabel() {
  return (
    <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Check availability</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-end justify-center min-h-px min-w-px relative">
      <div className="bg-[#15115e] content-stretch flex gap-px h-[28px] items-center justify-center min-w-[36px] px-[8px] relative rounded-[6px] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.08)] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
          <div className="absolute inset-[13.28%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.75 11.75">
              <path d={svgPaths.p14f6ea80} fill="var(--fill-0, #F9FAFE)" id="Vector" />
            </svg>
          </div>
        </div>
        <PaddingLabel />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-center leading-[20px] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap">
      <p className="overflow-hidden relative shrink-0 text-[#7c7b87] text-[11px]">From :</p>
      <p className="overflow-hidden relative shrink-0 text-[#131221] text-[13px]">12/12/23</p>
    </div>
  );
}

function PaddingContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="padding-content">
      <Frame3 />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[28px] mr-[-1px] relative rounded-bl-[6px] rounded-tl-[6px] shrink-0 w-[156px]" data-name="input">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <PaddingContent />
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Calendar-timeframe">
          <div className="absolute inset-[6.25%_12.5%_12.5%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
              <path d={svgPaths.p3f356000} fill="var(--fill-0, #15115E)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-bl-[6px] rounded-tl-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal gap-[4px] items-center leading-[20px] min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap">
      <p className="overflow-hidden relative shrink-0 text-[#7c7b87] text-[11px]">To :</p>
      <p className="overflow-hidden relative shrink-0 text-[#131221] text-[13px]">26/12/23</p>
    </div>
  );
}

function PaddingContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="padding-content">
      <Frame4 />
    </div>
  );
}

function Divider() {
  return <div className="bg-[rgba(66,65,78,0.1)] h-full rounded-[2000px] shrink-0 w-px" data-name="divider" />;
}

function ResetValue() {
  return (
    <div className="h-full relative shrink-0" data-name="reset-value">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-full items-center justify-center pl-[4px] pr-[8px] py-[8px] relative">
          <Divider />
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[28px] mr-[-1px] relative rounded-br-[6px] rounded-tr-[6px] shrink-0 w-[156px]" data-name="input">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[10px] relative rounded-[inherit] size-full">
        <PaddingContent1 />
        <ResetValue />
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Calendar-timeframe">
          <div className="absolute inset-[6.25%_12.5%_12.5%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
              <path d={svgPaths.p3f356000} fill="var(--fill-0, #15115E)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-br-[6px] rounded-tr-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">Media Type</p>
    </div>
  );
}

function PaddingContent2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="padding-content">
      <Frame6 />
    </div>
  );
}

function PaddingText() {
  return (
    <div className="content-stretch flex items-center px-px relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[11px] text-[rgba(10,0,185,0.86)] whitespace-nowrap">1</p>
    </div>
  );
}

function ParentContent() {
  return (
    <div className="content-stretch flex items-center px-[4px] relative shrink-0" data-name="parent-content">
      <PaddingText />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="bg-[rgba(35,55,255,0.05)] content-stretch flex h-[20px] items-center justify-center min-w-[20px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="end-icon">
        <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
            <path d={svgPaths.p10c93a80} fill="var(--fill-0, #131221)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame />
      <Frame8 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">Channel</p>
    </div>
  );
}

function PaddingContent3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="padding-content">
      <Frame7 />
    </div>
  );
}

function PaddingText1() {
  return (
    <div className="content-stretch flex items-center px-px relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[11px] text-[rgba(10,0,185,0.86)] whitespace-nowrap">1</p>
    </div>
  );
}

function ParentContent1() {
  return (
    <div className="content-stretch flex items-center px-[4px] relative shrink-0" data-name="parent-content">
      <PaddingText1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="bg-[rgba(35,55,255,0.05)] content-stretch flex h-[20px] items-center justify-center min-w-[20px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent1 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="end-icon">
        <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
            <path d={svgPaths.p10c93a80} fill="var(--fill-0, #131221)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame1 />
      <Frame9 />
    </div>
  );
}

function PaddingContent4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="padding-content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">Add filter</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[28px] relative rounded-[6px] shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[10px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                <path d={svgPaths.p3132d800} fill="var(--fill-0, #7C7B87)" id="Vector" />
              </svg>
            </div>
          </div>
          <PaddingContent4 />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

function Collum() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Collum">
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Date range">
        <div className="content-stretch flex items-end justify-end pr-px relative shrink-0" data-name="Filter">
          <Input />
          <Input1 />
        </div>
      </div>
      <div className="bg-white h-[28px] relative rounded-[6px] shrink-0" data-name="input_reviewed">
        <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                <path d={svgPaths.p1fa40700} fill="var(--fill-0, #7C7B87)" id="Vector" />
              </svg>
            </div>
          </div>
          <PaddingContent2 />
          <Frame27 />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white h-[28px] relative rounded-[6px] shrink-0" data-name="input_reviewed">
        <div className="content-stretch flex gap-[4px] h-full items-center justify-center overflow-clip px-[10px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
            <div className="absolute inset-[6.25%_3.13%_12.5%_3.13%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 13.0006">
                <path d={svgPaths.p12e0fb00} fill="var(--fill-0, #7C7B87)" id="Vector" />
              </svg>
            </div>
          </div>
          <PaddingContent3 />
          <Frame28 />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-[126px]" data-name="Add filter">
        <Input2 />
      </div>
    </div>
  );
}

function AvalibilityFilter() {
  return (
    <div className="content-stretch flex h-full items-center relative shrink-0 w-[1408px]" data-name="Avalibility filter">
      <Collum />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-[28px] items-center min-h-px min-w-px relative">
      <AvalibilityFilter />
    </div>
  );
}

function PaddingLabel1() {
  return (
    <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#2c24c3] text-[13px] whitespace-nowrap">Clear</p>
    </div>
  );
}

function PaddingLabel2() {
  return (
    <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#15115e] text-[13px] whitespace-nowrap">Group by</p>
    </div>
  );
}

function PaddingLabel3() {
  return (
    <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#15115e] text-[13px] whitespace-nowrap">Metrics</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-end relative shrink-0">
      <div className="bg-[rgba(35,55,255,0.05)] content-stretch flex gap-px h-[28px] items-center justify-center min-w-[36px] overflow-clip px-[8px] relative rounded-[6px] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
          <div className="absolute inset-[18.75%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
              <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
            </svg>
          </div>
        </div>
        <PaddingLabel1 />
      </div>
      <div className="bg-white h-[28px] min-w-[36px] relative rounded-[6px] shrink-0" data-name="Button">
        <div className="content-stretch flex gap-px h-full items-center justify-center min-w-[inherit] overflow-clip px-[8px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
            <div className="absolute inset-[12.5%_9.38%_12.5%_6.25%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 12">
                <path d={svgPaths.p3c5cfc00} fill="var(--fill-0, #15115E)" id="Vector" />
              </svg>
            </div>
          </div>
          <PaddingLabel2 />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white h-[28px] min-w-[36px] relative rounded-[6px] shrink-0" data-name="Button">
        <div className="content-stretch flex gap-px h-full items-center justify-center min-w-[inherit] overflow-clip px-[8px] relative rounded-[inherit]">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
            <div className="absolute inset-[12.5%_9.38%_15.63%_9.38%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 11.5">
                <path d={svgPaths.p1acaa9c0} fill="var(--fill-0, #15115E)" id="Vector" />
              </svg>
            </div>
          </div>
          <PaddingLabel3 />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

function AvailabilityHeadingFilter() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Availability - Heading/filter">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pb-[40px] pt-[16px] px-[20px] relative w-full">
          <Frame20 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="_title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[4px] pt-[12px] px-[20px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">Other filter</p>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
        <div className="absolute inset-[6.25%_15.63%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.25 10.4999">
            <path d={svgPaths.p39e2ba00} fill="var(--fill-0, #131221)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#131221] text-[13px] w-[150px]">Location</p>
    </div>
  );
}

function Item() {
  return (
    <div className="bg-[rgba(24,22,55,0.03)] h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[12px] py-[4px] relative size-full">
          <Frame22 />
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
        <div className="absolute inset-[15.63%_9.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.75 8.25">
            <path d={svgPaths.p5e5de00} fill="var(--fill-0, #131221)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">Format</p>
    </div>
  );
}

function Item1() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center px-[12px] py-[4px] relative size-full">
          <Frame23 />
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[2px] items-start px-[8px] relative w-full">
        <Item />
        <Item1 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Title />
      <Frame12 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(66,65,78,0)] border-solid border-t inset-0 pointer-events-none" />
      <Frame17 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame11 />
    </div>
  );
}

function PaddingContent5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="padding-content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[2px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[13px] text-ellipsis whitespace-nowrap">{`Search `}</p>
        </div>
      </div>
    </div>
  );
}

function PaddingResetIcon() {
  return (
    <div className="content-stretch flex h-full items-center justify-center relative shrink-0" data-name="padding-reset-icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="end-icon">
        <div className="absolute inset-[9.29%_9.37%_9.37%_9.29%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0141 13.0141">
            <path d={svgPaths.p2bb90e00} fill="var(--fill-0, #42414E)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="h-[24px] relative rounded-[4px] shrink-0 w-full z-[2]" data-name="input">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[2px] items-center justify-center px-[8px] relative size-full">
          <PaddingContent5 />
          <PaddingResetIcon />
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
        <div className="content-stretch flex flex-col gap-[8px] isolate items-start justify-center relative shrink-0 w-full" data-name="Dropdown">
          <Input3 />
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="h-[24px] relative rounded-[4px] shrink-0 w-full z-[2]" data-name="input">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[2px] items-center justify-center px-[8px] size-full" />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center pb-[4px] px-[8px] relative w-full">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] isolate items-start justify-center min-h-px min-w-px relative" data-name="Dropdown">
            <Input4 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-[36px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(66,65,78,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[8px] relative size-full">
        <Frame29 />
        <Frame13 />
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div className="relative shrink-0 w-full" data-name="_title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[4px] pt-[12px] px-[20px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">Select</p>
        </div>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="bg-[rgba(24,22,55,0.03)] h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">City</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[13px] text-right w-[12px]">3</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">Country</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[13px] text-right w-[12px]">2</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">County</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[13px] text-right w-[12px]">2</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">Conurbation</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[13px] text-right w-[12px]">2</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">District</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[13px] text-right w-[12px]">2</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">RouteTown</p>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#7c7b87] text-[13px] text-right">2</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">Town</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[13px] text-right w-[12px]">2</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[4px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#131221] text-[13px]">TVArea</p>
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#7c7b87] text-[13px] text-right">4</p>
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="end-icon">
            <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5005 8.25042">
                <path d={svgPaths.pddb2800} fill="var(--fill-0, #131221)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[2px] items-start px-[8px] relative w-full">
        <Item2 />
        <Item3 />
        <Item4 />
        <Item5 />
        <Item6 />
        <Item7 />
        <Item8 />
        <Item9 />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Title1 />
      <Frame15 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pb-[4px] relative shrink-0 w-full">
      <Frame10 />
      <Frame19 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame14 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-start left-[646px] top-[48px]">
      <div className="bg-white content-stretch flex flex-col items-start pb-[8px] pt-[4px] relative rounded-[6px] shrink-0 w-[224px]" data-name="Filter options">
        <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
        <Frame16 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white content-stretch flex flex-col items-start pb-[8px] pt-[4px] relative rounded-[6px] shrink-0 w-[220px]" data-name="Filter options">
        <div aria-hidden="true" className="absolute border border-[rgba(5,5,38,0.12)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
        <Frame18 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative shrink-0 w-full">
      <AvailabilityHeadingFilter />
      <Frame24 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[calc(50%-0.5px)] not-italic text-[#7c7b87] text-[17px] text-center top-[calc(50%-13px)] whitespace-nowrap">Add filters to query availability</p>
    </div>
  );
}

export default function Frame25() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] size-full">
      <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Availability - Heading/filter">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[20px] items-center pb-[12px] pt-[16px] px-[20px] relative w-full">
            <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative" data-name="_title-header-campaign-creation">
              <CampaignName />
            </div>
            <Frame2 />
          </div>
        </div>
      </div>
      <Frame5 />
      <Frame26 />
    </div>
  );
}