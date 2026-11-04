import svgPaths from "./svg-3nopv9zsz9";

function Actions() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
              <path d={svgPaths.p1a706900} fill="var(--fill-0, #2C24C3)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[12.49%_9.36%_12.5%_9.36%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0036 12.0018">
              <path d={svgPaths.p14c20f80} fill="var(--fill-0, #2C24C3)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[6.25%_12.5%_12.5%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
              <path d={svgPaths.pe337380} fill="var(--fill-0, #2C24C3)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[3.13%_12.5%_12.5%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
              <path d={svgPaths.p19474a00} fill="var(--fill-0, #2C24C3)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-end leading-[0] min-h-px min-w-px not-italic relative text-[#131221] text-[15px]">
        <p className="leading-[18px] whitespace-pre-wrap">Deal Line 1</p>
      </div>
      <Actions />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[12px] py-[16px] relative w-full">
        <Header />
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex items-start justify-between px-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">
          <p className="leading-[20px]">Status:</p>
        </div>
        <div className="overflow-clip shrink-0 size-[24px]" data-name="caret-up" />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Status</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p1bf4b000} fill="var(--fill-0, #605F6B)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading />
    </div>
  );
}

function RightIcon() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType />
      <RightIcon />
    </div>
  );
}

function MainHeading() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading />
    </div>
  );
}

function ItemList() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading />
    </div>
  );
}

function SectionTop() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Section/Top">
      <Section />
      <div className="bg-white relative rounded-[6px] shrink-0 w-[348px]" data-name="Status">
        <div className="content-stretch flex flex-col items-center overflow-clip p-[4px] relative rounded-[inherit] w-full">
          <ItemList />
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading">
      <div className="content-stretch flex items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">
          <p className="leading-[20px]">Deal Line Info:</p>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[6.25%_12.5%_12.5%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
            <path d={svgPaths.p3f356000} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading2 />
    </div>
  );
}

function RightIcon1() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType1 />
      <RightIcon1 />
    </div>
  );
}

function MainHeading1() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading1 />
    </div>
  );
}

function ItemList1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Channel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[6.25%_3.13%_12.5%_3.13%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 13.0006">
            <path d={svgPaths.p12e0fb00} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading3 />
    </div>
  );
}

function RightIcon2() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading2() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType2 />
      <RightIcon2 />
    </div>
  );
}

function MainHeading2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading2 />
    </div>
  );
}

function ItemList2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading2 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Media Type</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[6.25%_21.88%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
            <path d={svgPaths.p789d080} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading4 />
    </div>
  );
}

function RightIcon3() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading3() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType3 />
      <RightIcon3 />
    </div>
  );
}

function MainHeading3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading3 />
    </div>
  );
}

function ItemList3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#2c24c3] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Product Template</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus-add">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3132d800} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame1 />
    </div>
  );
}

function TileHeading4() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-[289px]" data-name="tile-heading">
      <TileType4 />
    </div>
  );
}

function SectionDealLineInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section/Deal line info">
      <Heading1 />
      <div className="bg-white relative rounded-[6px] shrink-0 w-[348px]" data-name="Updated Deal creation card">
        <div className="content-stretch flex flex-col items-center overflow-clip p-[4px] relative rounded-[inherit] w-full">
          <ItemList1 />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-[348px]" data-name="Updated Deal creation card">
        <div className="content-stretch flex flex-col items-center overflow-clip p-[4px] relative rounded-[inherit] w-full">
          <ItemList2 />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-[348px]" data-name="Updated Deal creation card">
        <div className="content-stretch flex flex-col items-center overflow-clip p-[4px] relative rounded-[inherit] w-full">
          <ItemList3 />
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center pl-[8px] pr-[4px] py-[2px] relative w-full">
            <TileHeading4 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2c24c3] border-dashed inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">
          <p className="leading-[20px]">Targets:</p>
        </div>
      </div>
    </div>
  );
}

function DealLineInfo() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Deal line info">
      <Frame12 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center px-[4px] relative shrink-0 w-[62px]">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Impression</p>
      </div>
    </div>
  );
}

function TileType5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="eye">
        <div className="absolute inset-[18.75%_3.13%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 10">
            <path d={svgPaths.p24abf100} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame2 />
    </div>
  );
}

function PaddingText() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#272199] text-[13px]">100,000</p>
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

function PaddingText1() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#272199] text-[13px]">1</p>
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

function Chips() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="chips 1">
      <div className="bg-[rgba(44,36,195,0.05)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent />
      </div>
      <div className="bg-[rgba(44,36,195,0.05)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent1 />
      </div>
    </div>
  );
}

function Icons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="Icons">
      <Chips />
    </div>
  );
}

function RightAction() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0 w-[130px]" data-name="right-action">
      <Icons />
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute flex inset-[19.79%_44.79%] items-center justify-center">
            <div className="flex-none h-[2.5px] rotate-90 w-[14.5px]">
              <div className="relative size-full" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66602 1.66602">
                  <path d={svgPaths.p3f8c0f80} fill="var(--fill-0, #605F6B)" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileHeading5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative w-full" data-name="tile-heading">
      <TileType5 />
      <RightAction />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center px-[4px] relative shrink-0 w-[62px]">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Frame</p>
      </div>
    </div>
  );
}

function TileType6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="frame">
        <div className="absolute inset-[6.25%_21.88%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 14">
            <path d={svgPaths.p789d080} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame3 />
    </div>
  );
}

function PaddingText2() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#272199] text-[13px]">100,000</p>
    </div>
  );
}

function ParentContent2() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="parent-content">
      <PaddingText2 />
    </div>
  );
}

function PaddingText3() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#272199] text-[13px]">1</p>
    </div>
  );
}

function ParentContent3() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="parent-content">
      <PaddingText3 />
    </div>
  );
}

function Chips1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="chips 1">
      <div className="bg-[rgba(44,36,195,0.05)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent2 />
      </div>
      <div className="bg-[rgba(44,36,195,0.05)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent3 />
      </div>
    </div>
  );
}

function Icons1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="Icons">
      <Chips1 />
    </div>
  );
}

function RightAction1() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0 w-[130px]" data-name="right-action">
      <Icons1 />
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute flex inset-[19.79%_44.79%] items-center justify-center">
            <div className="flex-none h-[2.5px] rotate-90 w-[14.5px]">
              <div className="relative size-full" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66602 1.66602">
                  <path d={svgPaths.p3f8c0f80} fill="var(--fill-0, #138859)" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileHeading6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative w-full" data-name="tile-heading">
      <TileType6 />
      <RightAction1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center px-[4px] relative shrink-0 w-[62px]">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Budget</p>
      </div>
    </div>
  );
}

function TileType7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="premium">
        <div className="absolute bottom-[15.62%] left-[18.75%] right-1/4 top-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11.4999">
            <path d={svgPaths.p3858d00} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function PaddingText4() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#272199] text-[13px]">100,000</p>
    </div>
  );
}

function ParentContent4() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="parent-content">
      <PaddingText4 />
    </div>
  );
}

function PaddingText5() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#272199] text-[13px]">1</p>
    </div>
  );
}

function ParentContent5() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="parent-content">
      <PaddingText5 />
    </div>
  );
}

function Chips2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="chips 1">
      <div className="bg-[rgba(44,36,195,0.05)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent4 />
      </div>
      <div className="bg-[rgba(44,36,195,0.05)] content-stretch flex h-[24px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shrink-0" data-name="chip">
        <ParentContent5 />
      </div>
    </div>
  );
}

function Icons2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative" data-name="Icons">
      <Chips2 />
    </div>
  );
}

function RightAction2() {
  return (
    <div className="content-stretch flex gap-[4px] h-full items-center justify-end relative shrink-0 w-[130px]" data-name="right-action">
      <Icons2 />
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute flex inset-[19.79%_44.79%] items-center justify-center">
            <div className="flex-none h-[2.5px] rotate-90 w-[14.5px]">
              <div className="relative size-full" data-name="vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.66602 1.66602">
                  <path d={svgPaths.p3f8c0f80} fill="var(--fill-0, #605F6B)" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileHeading7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative w-full" data-name="tile-heading">
      <TileType7 />
      <RightAction2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-px relative shrink-0 w-full">
      <div className="bg-white h-[36px] mb-[-1px] relative rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-full" data-name="_Tile (old)">
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[8px] pr-[4px] py-[4px] relative size-full">
            <TileHeading5 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border-[rgba(5,5,38,0.12)] border-b-[0.1px] border-l border-r border-solid border-t inset-0 pointer-events-none rounded-tl-[6px] rounded-tr-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white h-[36px] mb-[-1px] relative shrink-0 w-full" data-name="_Tile (old)">
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[8px] pr-[4px] py-[4px] relative size-full">
            <TileHeading6 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[#d3d4db] border-solid inset-0 pointer-events-none shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white h-[36px] mb-[-1px] relative rounded-bl-[6px] rounded-br-[6px] shrink-0 w-full" data-name="_Tile (old)">
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[2px] items-start justify-center pl-[8px] pr-[4px] py-[4px] relative size-full">
            <TileHeading7 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[#d3d4db] border-solid inset-0 pointer-events-none rounded-bl-[6px] rounded-br-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#2c24c3] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Networks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus-add">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3132d800} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame5 />
    </div>
  );
}

function TileHeading8() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-[289px]" data-name="tile-heading">
      <TileType8 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#2c24c3] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">SOT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus-add">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3132d800} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame6 />
    </div>
  );
}

function TileHeading9() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-[289px]" data-name="tile-heading">
      <TileType9 />
    </div>
  );
}

function SectionTargets() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section/Targets">
      <DealLineInfo />
      <Frame />
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center pl-[8px] pr-[4px] py-[2px] relative w-full">
            <TileHeading8 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2c24c3] border-dashed inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center pl-[8px] pr-[4px] py-[2px] relative w-full">
            <TileHeading9 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2c24c3] border-dashed inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">
          <p className="leading-[20px]">Filters:</p>
        </div>
      </div>
    </div>
  );
}

function DealLineInfo1() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Deal line info">
      <Frame13 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Format</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[15.63%_9.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 11">
            <path d={svgPaths.p2c84cc00} fill="var(--fill-0, #605F6B)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading5 />
    </div>
  );
}

function RightIcon4() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading10() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType10 />
      <RightIcon4 />
    </div>
  );
}

function MainHeading4() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading10 />
    </div>
  );
}

function ItemList4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading4 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Location</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[6.25%_15.63%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 13.9999">
            <path d={svgPaths.p47f0f00} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading6 />
    </div>
  );
}

function RightIcon5() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading11() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType11 />
      <RightIcon5 />
    </div>
  );
}

function MainHeading5() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading11 />
    </div>
  );
}

function ItemList5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading5 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Tag</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[18.75%_3.13%_18.75%_9.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9994 10">
            <path d={svgPaths.p3a450580} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading7 />
    </div>
  );
}

function RightIcon6() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading12() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType12 />
      <RightIcon6 />
    </div>
  );
}

function MainHeading6() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading12 />
    </div>
  );
}

function ItemList6() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#2c24c3] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Frame list</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus-add">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3132d800} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame7 />
    </div>
  );
}

function TileHeading13() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-[289px]" data-name="tile-heading">
      <TileType13 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#2c24c3] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">MTB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus-add">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3132d800} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame8 />
    </div>
  );
}

function TileHeading14() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-[289px]" data-name="tile-heading">
      <TileType14 />
    </div>
  );
}

function SectionFilters() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Section/Filters">
      <DealLineInfo1 />
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center p-[4px] relative w-full">
            <ItemList4 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center p-[4px] relative w-full">
            <ItemList5 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center p-[4px] relative w-full">
            <ItemList6 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center pl-[8px] pr-[4px] py-[2px] relative w-full">
            <TileHeading13 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2c24c3] border-dashed inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center pl-[8px] pr-[4px] py-[2px] relative w-full">
            <TileHeading14 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2c24c3] border-dashed inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">
          <p className="leading-[20px]">Data Targeting:</p>
        </div>
      </div>
    </div>
  );
}

function DealLineInfo2() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Deal line info">
      <Frame14 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#2c24c3] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">POI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus-add">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3132d800} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame9 />
    </div>
  );
}

function TileHeading15() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-[289px]" data-name="tile-heading">
      <TileType15 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#2c24c3] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Segments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="plus-add">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p3132d800} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame10 />
    </div>
  );
}

function TileHeading16() {
  return (
    <div className="content-stretch flex gap-[4px] h-[28px] items-center relative shrink-0 w-[289px]" data-name="tile-heading">
      <TileType16 />
    </div>
  );
}

function SectionDataTargeting() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Section/Data Targeting">
      <DealLineInfo2 />
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center pl-[8px] pr-[4px] py-[2px] relative w-full">
            <TileHeading15 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2c24c3] border-dashed inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex items-center pl-[8px] pr-[4px] py-[2px] relative w-full">
            <TileHeading16 />
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#2c24c3] border-dashed inset-0 pointer-events-none rounded-[6px]" />
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start px-[4px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">
          <p className="leading-[20px]">Objectives:</p>
        </div>
      </div>
    </div>
  );
}

function DealLineInfo3() {
  return (
    <div className="content-stretch flex flex-col h-[20px] items-start justify-between relative shrink-0 w-full" data-name="Deal line info">
      <Frame15 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Heading">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[13px] text-ellipsis whitespace-nowrap">
            <p className="leading-[20px] overflow-hidden">Objectives</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TileType17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="tile-type">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Left Icoon">
        <div className="absolute inset-[12.5%_12.5%_3.13%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
            <path d={svgPaths.p1a56e500} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <Heading8 />
    </div>
  );
}

function RightIcon7() {
  return <div className="content-stretch flex items-center shrink-0" data-name="right-icon" />;
}

function TileHeading17() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="tile-heading">
      <TileType17 />
      <RightIcon7 />
    </div>
  );
}

function MainHeading7() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-name="Main heading">
      <TileHeading17 />
    </div>
  );
}

function ItemList7() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Item list">
      <MainHeading7 />
    </div>
  );
}

function SectionObjectives() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Section/Objectives">
      <DealLineInfo3 />
      <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Updated Deal creation card">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center p-[4px] relative w-full">
            <ItemList7 />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.2)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

function Panel() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[348px]" data-name="Panel">
      <SectionTop />
      <SectionDealLineInfo />
      <SectionTargets />
      <SectionFilters />
      <SectionDataTargeting />
      <SectionObjectives />
    </div>
  );
}

function PaddingLabel() {
  return (
    <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#bab9c3] text-[13px]">Check allocation</p>
    </div>
  );
}

function PaddingLabel1() {
  return (
    <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f4f5ff] text-[13px]">Check Allocate</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col h-[83px] items-center justify-end px-[16px] py-[24px] relative shrink-0 w-[350px]">
      <div className="bg-[#15115e] content-stretch flex gap-[4px] h-[36px] items-center justify-center min-w-[36px] px-[12px] relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0 w-[350px]" data-name="Button">
        <PaddingLabel1 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

export default function DealStrip() {
  return (
    <div className="bg-white relative size-full" data-name="Deal Strip">
      <div className="content-stretch flex flex-col gap-[12px] items-center px-[8px] py-[12px] relative size-full">
        <Frame11 />
        <Panel />
        <div className="absolute bg-white bottom-[-220px] content-stretch flex items-center justify-between left-[16px] px-[16px] py-[8px] w-[380px]" data-name="Panel">
          <div aria-hidden="true" className="absolute border-[rgba(5,5,38,0.12)] border-solid border-t inset-0 pointer-events-none" />
          <div className="bg-[#eaeaef] flex-[1_0_0] h-[24px] min-h-px min-w-[36px] relative rounded-[4px]" data-name="Button">
            <div className="flex flex-row items-center justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[8px] relative size-full">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
                  <div className="absolute inset-[13.56%_12.35%_12.95%_12.65%]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 11.7585">
                      <path d={svgPaths.p26f71e00} fill="var(--fill-0, #BAB9C3)" id="Vector" />
                    </svg>
                  </div>
                </div>
                <PaddingLabel />
              </div>
            </div>
          </div>
        </div>
        <Frame16 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}