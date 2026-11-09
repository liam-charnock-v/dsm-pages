import svgPaths from "./svg-9ob4c42aan";

function PaddingContent() {
  return (
    <div className="content-stretch flex items-center px-[4px] relative shrink-0" data-name="padding-content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[15px] text-center text-ellipsis">October 2023</p>
    </div>
  );
}

function MonthSelection() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[6px]" data-name="month selection">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center pl-[12px] pr-[56px] relative size-full">
          <PaddingContent />
        </div>
      </div>
    </div>
  );
}

function PaddingContent1() {
  return (
    <div className="content-stretch flex items-center px-[4px] relative shrink-0" data-name="padding-content">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#131221] text-[15px] text-center text-ellipsis">November 2023</p>
    </div>
  );
}

function MonthSelection1() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[6px]" data-name="month selection">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center pl-[56px] pr-[12px] relative size-full">
          <PaddingContent1 />
        </div>
      </div>
    </div>
  );
}

function Month() {
  return (
    <div className="relative shrink-0 w-full" data-name="_Month">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pt-[12px] px-[12px] relative w-full">
          <div className="bg-white relative rounded-[6px] shrink-0 size-[36px]" data-name="iconButton">
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="icon">
                <div className="absolute inset-[15.62%_34.37%_15.62%_28.12%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.50084 13.7507">
                    <path d={svgPaths.p331fd680} fill="var(--fill-0, #2C24C3)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <MonthSelection />
          </div>
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <MonthSelection1 />
          </div>
          <div className="bg-white relative rounded-[6px] shrink-0 size-[36px]" data-name="iconButton">
            <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="icon">
                <div className="absolute inset-[15.62%_28.12%_15.62%_34.37%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.50084 13.7507">
                    <path d={svgPaths.pb084e00} fill="var(--fill-0, #2C24C3)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
            <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Weekday() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Mo</p>
    </div>
  );
}

function Weekday1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Tu</p>
    </div>
  );
}

function Weekday2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">We</p>
    </div>
  );
}

function Weekday3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Th</p>
    </div>
  );
}

function Weekday4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Fr</p>
    </div>
  );
}

function Weekday5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Sa</p>
    </div>
  );
}

function Weekday6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Su</p>
    </div>
  );
}

function Week() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full" data-name="Week">
      <Weekday />
      <Weekday1 />
      <Weekday2 />
      <Weekday3 />
      <Weekday4 />
      <Weekday5 />
      <Weekday6 />
    </div>
  );
}

function Week1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week1">
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">3</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">4</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">5</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">6</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">7</p>
      </div>
    </div>
  );
}

function Week2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week2">
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">8</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">9</p>
      </div>
      <div className="bg-[#15115e] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative rounded-bl-[12px] rounded-tl-[12px]" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-white">10</p>
      </div>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">11</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">12</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">13</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">14</p>
      </button>
    </div>
  );
}

function Week3() {
  return (
    <div className="content-stretch cursor-pointer flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week3">
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">15</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">16</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">17</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">18</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">19</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">20</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">21</p>
      </button>
    </div>
  );
}

function Week4() {
  return (
    <div className="content-stretch cursor-pointer flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week4">
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">22</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">23</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">24</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">25</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">26</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">27</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">28</p>
      </button>
    </div>
  );
}

function Week5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week5">
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">29</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">30</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">31</p>
      </button>
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
    </div>
  );
}

function Dates() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Dates">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-end p-[12px] relative size-full">
          <Week />
          <Week1 />
          <Week2 />
          <Week3 />
          <Week4 />
          <Week5 />
        </div>
      </div>
    </div>
  );
}

function Weekday7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Mo</p>
    </div>
  );
}

function Weekday8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Tu</p>
    </div>
  );
}

function Weekday9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">We</p>
    </div>
  );
}

function Weekday10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Th</p>
    </div>
  );
}

function Weekday11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Fr</p>
    </div>
  );
}

function Weekday12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Sa</p>
    </div>
  );
}

function Weekday13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="_Weekday">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[12px] not-italic relative shrink-0 text-[#131221] text-[9px] tracking-[0.9px] uppercase">Su</p>
    </div>
  );
}

function Week6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative w-full" data-name="Week">
      <Weekday7 />
      <Weekday8 />
      <Weekday9 />
      <Weekday10 />
      <Weekday11 />
      <Weekday12 />
      <Weekday13 />
    </div>
  );
}

function Week7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week1">
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">3</p>
      </button>
      <button className="bg-[rgba(44,36,195,0.2)] content-stretch cursor-pointer flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px] text-left">4</p>
      </button>
      <div className="bg-[#15115e] content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative rounded-br-[12px] rounded-tr-[12px]" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-white">5</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">6</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">7</p>
      </div>
    </div>
  );
}

function Week8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week2">
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">8</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">9</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">10</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">11</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">12</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">13</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">14</p>
      </div>
    </div>
  );
}

function Week9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week3">
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">15</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">16</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">17</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">18</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">19</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">20</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">21</p>
      </div>
    </div>
  );
}

function Week10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week4">
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">22</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">23</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">24</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">25</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">26</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">27</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">28</p>
      </div>
    </div>
  );
}

function Week11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative w-full" data-name="Week5">
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">29</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">30</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-h-px min-w-px relative" data-name="cal-day">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[13px]">31</p>
      </div>
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
      <div className="flex-[1_0_0] h-full min-h-px min-w-px" data-name="cal-day" />
    </div>
  );
}

function Dates1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Dates">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-end p-[12px] relative size-full">
          <Week6 />
          <Week7 />
          <Week8 />
          <Week9 />
          <Week10 />
          <Week11 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-center min-h-px min-w-px relative w-full">
      <Dates />
      <Dates1 />
    </div>
  );
}

function DatePicker() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative rounded-br-[12px] rounded-tr-[12px] shrink-0 w-[640px]" data-name="Date picker">
      <Month />
      <Frame />
    </div>
  );
}

export default function Calendar() {
  return (
    <div className="bg-white content-stretch flex items-start relative rounded-[12px] size-full" data-name="Calendar">
      <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-[-1px] pointer-events-none rounded-[13px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
      <DatePicker />
      <div className="absolute inset-[-1px] pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}