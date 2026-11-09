import svgPaths from "./svg-dqzac272r9";

function DialogTitle() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[135px]" data-name="Dialog / Title">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#131221] text-[15px] whitespace-nowrap">Share campaign</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[24px] items-start min-w-px relative">
      <DialogTitle />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] h-[24px] items-start min-w-px relative">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Share">
        <div className="absolute inset-[18.75%_9.37%_12.5%_9.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5006 16.5004">
            <path d={svgPaths.p934da80} fill="var(--fill-0, #605F6B)" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame />
    </div>
  );
}

function Dialog1() {
  return (
    <div className="content-stretch flex h-[24px] items-start relative shrink-0 w-full" data-name="Dialog">
      <Frame1 />
    </div>
  );
}

function DialogBody() {
  return (
    <div className="col-1 content-stretch flex items-start ml-0 mt-0 relative row-1 w-[395px]" data-name="Dialog / Body">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] w-[408px]">Allocation report</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <DialogBody />
    </div>
  );
}

function DialogBody1() {
  return (
    <div className="col-1 content-stretch flex items-start ml-0 mt-0 relative row-1 w-[395px]" data-name="Dialog / Body">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] w-[408px]">Select which allocation metrics to include on the Campaign plan</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <DialogBody1 />
    </div>
  );
}

function Item() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#131221] text-[13px]">Share of time</p>
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
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#131221] text-[13px]">Impressions</p>
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
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#131221] text-[13px]">Indexed Price</p>
        </div>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#131221] text-[13px]">Gross Price</p>
        </div>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="h-[28px] relative rounded-[3px] shrink-0 w-full" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#131221] text-[13px]">Repetitions</p>
        </div>
      </div>
    </div>
  );
}

function SelectOpen() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-[299px]" data-name="_select-open">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[30px] leading-[20px] not-italic relative shrink-0 text-[#131221] text-[13px] w-[81px] whitespace-pre-wrap">{`  Metric`}</p>
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
    </div>
  );
}

function Item5() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen1() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item5 />
    </div>
  );
}

function Item6() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen2() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item6 />
    </div>
  );
}

function Item7() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen3() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item7 />
    </div>
  );
}

function Item8() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen4() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item8 />
    </div>
  );
}

function Item9() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen5() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item9 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[30px] leading-[20px] not-italic relative shrink-0 text-[#131221] text-[13px] w-[81px]">Planned</p>
      <SelectOpen1 />
      <SelectOpen2 />
      <SelectOpen3 />
      <SelectOpen4 />
      <SelectOpen5 />
    </div>
  );
}

function Item10() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen6() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item10 />
    </div>
  );
}

function Item11() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen7() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item11 />
    </div>
  );
}

function Item12() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen8() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item12 />
    </div>
  );
}

function Item13() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen9() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item13 />
    </div>
  );
}

function Item14() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative rounded-[3px]" data-name="_item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[8px] pr-[12px] py-[4px] relative size-full">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="checkbox">
            <div aria-hidden className="absolute bg-white inset-0 pointer-events-none rounded-[2px]" />
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full" />
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[2px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOpen10() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0 w-[79px]" data-name="_select-open">
      <Item14 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[30px] leading-[20px] not-italic relative shrink-0 text-[#131221] text-[13px] w-[81px]">Delivered</p>
      <SelectOpen6 />
      <SelectOpen7 />
      <SelectOpen8 />
      <SelectOpen9 />
      <SelectOpen10 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white content-stretch flex items-start overflow-clip relative shrink-0">
      <SelectOpen />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function DialogBody2() {
  return (
    <div className="absolute content-stretch flex items-start left-[9px] top-0 w-[168px]" data-name="Dialog / Body">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] w-[339px]">Include Group by’s</p>
    </div>
  );
}

function Item15() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[386px] pl-[8px] pr-[12px] py-[4px] right-0 rounded-[3px] top-[-4px]" data-name="_item">
      <div className="content-stretch flex h-[16px] items-center justify-end overflow-clip p-[2px] pointer-events-none relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0 w-[32px]" data-name="toggle">
        <div aria-hidden className="absolute bg-[#272199] inset-0 rounded-[999px]" />
        <div className="relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0 size-[12px]" data-name="handle">
          <div aria-hidden className="absolute bg-white inset-0 rounded-[999px]" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        </div>
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

function IPhoneSe() {
  return (
    <div className="bg-white h-[24px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="iPhone SE - 2">
      <DialogBody2 />
      <Item15 />
    </div>
  );
}

function PaddingText() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Channel</p>
    </div>
  );
}

function ChildContent() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText />
    </div>
  );
}

function Remove() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText1() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Size code</p>
    </div>
  );
}

function ChildContent1() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText1 />
    </div>
  );
}

function Remove1() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText2() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Frame Size</p>
    </div>
  );
}

function ChildContent2() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText2 />
    </div>
  );
}

function Remove2() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText3() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Business Area</p>
    </div>
  );
}

function ChildContent3() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText3 />
    </div>
  );
}

function Remove3() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText4() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Revenue Stream</p>
    </div>
  );
}

function ChildContent4() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText4 />
    </div>
  );
}

function Remove4() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText5() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Product Format</p>
    </div>
  );
}

function ChildContent5() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText5 />
    </div>
  );
}

function Remove5() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText6() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Country</p>
    </div>
  );
}

function ChildContent6() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText6 />
    </div>
  );
}

function Remove6() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText7() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">County</p>
    </div>
  );
}

function ChildContent7() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText7 />
    </div>
  );
}

function Remove7() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText8() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">City</p>
    </div>
  );
}

function ChildContent8() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText8 />
    </div>
  );
}

function Remove8() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText9() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">TV Area</p>
    </div>
  );
}

function ChildContent9() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText9 />
    </div>
  );
}

function Remove9() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PaddingText10() {
  return (
    <div className="content-stretch flex items-center pb-px px-[2px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Conurbation</p>
    </div>
  );
}

function ChildContent10() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[6px] relative rounded-[999px] shrink-0" data-name="child-content">
      <PaddingText10 />
    </div>
  );
}

function Remove10() {
  return (
    <div className="content-stretch flex items-center px-[6px] relative shrink-0" data-name="remove">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0006 10.0006">
            <path d={svgPaths.p2662980} fill="var(--fill-0, #2C24C3)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function GroupingChips() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-[443px]" data-name="grouping-chips">
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent />
        <Remove />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent1 />
        <Remove1 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent2 />
        <Remove2 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent3 />
        <Remove3 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent4 />
        <Remove4 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent5 />
        <Remove5 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent6 />
        <Remove6 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent7 />
        <Remove7 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent8 />
        <Remove8 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent9 />
        <Remove9 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
      <div className="content-stretch flex h-[28px] items-center justify-center min-w-[24px] overflow-clip relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0" data-name="chip">
        <div aria-hidden className="absolute bg-[rgba(44,36,195,0.05)] inset-0 pointer-events-none rounded-[999px]" />
        <ChildContent10 />
        <Remove10 />
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

function DialogBody3() {
  return (
    <div className="col-1 content-stretch flex items-start ml-0 mt-0 relative row-1 w-[445px]" data-name="Dialog / Body">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] w-[408px]">Configure Map</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <DialogBody3 />
    </div>
  );
}

function DialogBody4() {
  return (
    <div className="absolute content-stretch flex items-start left-[9px] top-0 w-[168px]" data-name="Dialog / Body">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] w-[339px]">Include map on Campaign plan</p>
    </div>
  );
}

function Item16() {
  return (
    <div className="absolute content-stretch flex h-[28px] items-center left-[386px] pl-[8px] pr-[12px] py-[4px] right-0 rounded-[3px] top-[-4px]" data-name="_item">
      <div className="content-stretch flex h-[16px] items-center justify-end overflow-clip p-[2px] pointer-events-none relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0 w-[32px]" data-name="toggle">
        <div aria-hidden className="absolute bg-[#272199] inset-0 rounded-[999px]" />
        <div className="relative rounded-[999px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)] shrink-0 size-[12px]" data-name="handle">
          <div aria-hidden className="absolute bg-white inset-0 rounded-[999px]" />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
        </div>
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      </div>
    </div>
  );
}

function IPhoneSe1() {
  return (
    <div className="bg-white h-[24px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="iPhone SE - 3">
      <DialogBody4 />
      <Item16 />
    </div>
  );
}

function Tv() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="TV - 5">
      <IPhoneSe />
      <GroupingChips />
      <div className="h-0 relative shrink-0 w-[461px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 461 1">
            <line id="Line 2" stroke="var(--stroke-0, #131221)" strokeOpacity="0.1" x2="461" y1="0.5" y2="0.5001" />
          </svg>
        </div>
      </div>
      <Group2 />
      <IPhoneSe1 />
    </div>
  );
}

function Dialog2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[337px] items-start relative shrink-0 w-[461px]" data-name="Dialog">
      <Group />
      <Group1 />
      <Frame2 />
      <div className="h-0 relative shrink-0 w-[461px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 461 1">
            <line id="Line 2" stroke="var(--stroke-0, #131221)" strokeOpacity="0.1" x2="461" y1="0.5" y2="0.5001" />
          </svg>
        </div>
      </div>
      <Tv />
    </div>
  );
}

function Dialog() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] h-[664px] items-start p-[24px] relative shrink-0 w-[509px]" data-name="Dialog">
      <Dialog1 />
      <div className="absolute left-[473px] overflow-clip size-[24px] top-[12px]" data-name="close-cancel">
        <div className="absolute inset-[18.75%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0008 15.0008">
            <path d={svgPaths.p3bbf7480} fill="var(--fill-0, #605F6B)" id="Vector" />
          </svg>
        </div>
      </div>
      <Dialog2 />
    </div>
  );
}

function PaddingLabel() {
  return (
    <div className="content-stretch flex items-start px-px relative shrink-0" data-name="padding-label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#f9fafe] text-[13px] whitespace-nowrap">Generate link</p>
    </div>
  );
}

function Tv1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[429px]" data-name="TV - 8">
      <div className="bg-[#15115e] drop-shadow-[0px_2px_1.5px_rgba(0,0,0,0.08)] h-[36px] min-w-[28px] relative rounded-[6px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center min-w-[inherit] px-[12px] relative size-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="start-icon">
              <div className="absolute inset-[12.49%_6.24%_12.5%_6.25%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0016 12.0008">
                  <path d={svgPaths.p1bda3480} fill="var(--fill-0, #F9FAFE)" id="Vector" />
                </svg>
              </div>
            </div>
            <PaddingLabel />
          </div>
        </div>
      </div>
    </div>
  );
}

function DialogBody5() {
  return (
    <div className="absolute content-stretch flex items-start left-[47px] top-[35px] w-[350px]" data-name="Dialog / Body">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#42414e] text-[13px]">Turning this on will deactivate the campaign plan link.</p>
    </div>
  );
}

function IPhoneSe2() {
  return (
    <div className="bg-white h-[67px] relative rounded-[4px] shrink-0 w-full" data-name="iPhone SE - 2">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute bg-[#52515e] content-stretch flex h-[16px] items-center left-[12px] overflow-clip p-[2px] rounded-[999px] top-[14px] w-[28px]" data-name="toggle">
          <div className="pointer-events-none relative rounded-[999px] shadow-[0px_3px_4px_0px_rgba(16,16,52,0.06)] shrink-0 size-[12px]" data-name="handle">
            <div aria-hidden className="absolute bg-white inset-0 rounded-[999px]" />
            <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium h-[19px] leading-[20px] left-[47px] not-italic text-[#131221] text-[13px] top-[12px] w-[211px]">Disable campaign plan access</p>
        <DialogBody5 />
      </div>
      <div aria-hidden className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Tv2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 w-[429px]" data-name="TV - 9">
      <IPhoneSe2 />
    </div>
  );
}

function DialogBody6() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-[429px]" data-name="Dialog / Body">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#42414e] text-[13px]">This read-only link will be accessible by anyone.</p>
    </div>
  );
}

function Dialog3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center py-[16px] relative shrink-0 w-[509px]" data-name="Dialog">
      <div aria-hidden className="absolute border-[rgba(19,18,33,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Tv1 />
      <Tv2 />
      <DialogBody6 />
    </div>
  );
}

export default function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-center relative size-full">
      <Dialog />
      <Dialog3 />
    </div>
  );
}