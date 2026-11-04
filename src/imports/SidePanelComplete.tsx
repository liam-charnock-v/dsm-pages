function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[8px] py-[4px] relative w-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-end leading-[0] not-italic relative shrink-0 text-[#2c24c3] text-[11px] whitespace-nowrap">
            <p className="leading-[20px]">AVAILABILITY</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailBar() {
  return <div className="-translate-y-1/2 absolute bg-[#170bf2] h-[8px] left-0 rounded-bl-[100px] rounded-tl-[100px] top-1/2 w-[113px]" data-name="Avail bar" />;
}

function Bar() {
  return (
    <div className="bg-[#f4fcff] h-[8px] relative rounded-[100px] shrink-0 w-full" data-name="Bar">
      <AvailBar />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#136588] h-[12px] left-1/2 top-1/2 w-[2px]" data-name="Target" />
    </div>
  );
}

function Avail() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Avail">
      <div className="relative shrink-0 size-[8px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #170BF2)" id="Ellipse 4" r="4" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">Available</p>
    </div>
  );
}

function Target() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Target">
      <div className="bg-[#136588] h-[12px] shrink-0 w-[2px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">Target</p>
    </div>
  );
}

function Total() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Total">
      <div className="relative shrink-0 size-[8px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #F4FCFF)" id="Ellipse 4" r="4" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">Total</p>
    </div>
  );
}

function Key() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Key">
      <Avail />
      <Target />
      <Total />
    </div>
  );
}

function Total1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Total">
      <div className="relative shrink-0 size-[8px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #F4FCFF)" id="Ellipse 4" r="4" />
        </svg>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">1,034,892</p>
    </div>
  );
}

function Key1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start justify-end relative shrink-0 w-full" data-name="Key">
      <Total1 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start mb-[-56px] p-[8px] relative rounded-[12px] shrink-0 w-[316px]" data-name="Card 2">
      <div aria-hidden="true" className="absolute border border-[#eaeaef] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
      <div className="relative shrink-0 w-full" data-name=".Content/Card">
        <div className="content-stretch flex flex-col items-start px-[5px] py-[4px] relative w-full">
          <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Title">
            <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-baseline min-h-px min-w-px not-italic relative self-stretch text-[#131221]" data-name=".Base/Card/Line">
              <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium h-[21px] leading-[20px] min-h-px min-w-px relative text-[13px]">Impressions</p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[20px] text-right whitespace-nowrap">1,034,892</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name=".items/Chart/placeholder">
        <Key1 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[56px] relative rounded-[14px] shrink-0">
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-start mb-[-56px] p-[8px] relative rounded-[12px] shrink-0 w-[316px]" data-name="Card 1">
        <div aria-hidden="true" className="absolute border border-[#eaeaef] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <div className="relative shrink-0 w-full" data-name=".Content/Card">
          <div className="content-stretch flex flex-col items-start px-[5px] py-[4px] relative w-full">
            <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Title">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-baseline min-h-px min-w-px not-italic relative self-stretch text-[#131221]" data-name=".Base/Card/Line">
                <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium h-[21px] leading-[20px] min-h-px min-w-px relative text-[13px]">Frames</p>
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] relative shrink-0 text-[20px] text-right whitespace-nowrap">{`121 `}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name=".items/Chart/placeholder">
          <Bar />
          <Key />
        </div>
      </div>
      <Card />
    </div>
  );
}

function BaseSidePanelStack() {
  return (
    <div className="bg-[#ebeefe] content-stretch flex flex-col items-start relative rounded-[12px] shrink-0" data-name=".Base/Side Panel/Stack">
      <div aria-hidden="true" className="absolute border-2 border-[#ebeefe] border-solid inset-[-2px] pointer-events-none rounded-[14px]" />
      <Frame1 />
      <Frame />
    </div>
  );
}

function SidePanelStack() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 shadow-[0px_3px_4px_0px_rgba(16,16,52,0.06)] top-0" data-name="Side Panel/Stack">
      <BaseSidePanelStack />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

export default function SidePanelComplete() {
  return (
    <div className="relative size-full" data-name="Side Panel Complete">
      <SidePanelStack />
    </div>
  );
}