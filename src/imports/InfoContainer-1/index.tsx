import svgPaths from "./svg-hkjv9v1f7o";

function Header() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[10.225px] items-center overflow-clip relative shrink-0 w-[231.079px]" data-name="header">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold h-[18.405px] leading-[18.405px] not-italic relative shrink-0 text-[#131221] text-[15.34px] w-[190.18px]">PT-AMD-CL-00846</p>
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[6.135px] shrink-0 size-[28.629px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16.36px]" data-name="icon">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.633 13.633">
              <path d={svgPaths.p32328000} fill="var(--fill-0, #42414E)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 font-['Inter:Regular',sans-serif] font-normal h-[19.427px] leading-[20.449px] ml-0 mt-0 not-italic relative row-1 text-[#131221] text-[13.29px] w-[105.315px]">Lisboa, Portugal</p>
      <div className="col-1 content-stretch flex h-[19.427px] items-center justify-center ml-[107.68px] mt-0 overflow-clip relative rounded-[6.135px] row-1 w-[28.629px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16.36px]" data-name="icon">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.633 13.633">
              <path d={svgPaths.p32328000} fill="var(--fill-0, #42414E)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Details1() {
  return (
    <div className="content-stretch flex flex-col gap-[4.09px] items-start overflow-clip relative shrink-0 w-[180.978px]" data-name="details">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[19.427px] leading-[20.449px] min-w-full not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[min-content]">Location Name</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal h-[19.427px] leading-[20.449px] min-w-full not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[min-content]">Rua Augusta, 123, 1100-046</p>
      <Group4 />
    </div>
  );
}

function Details() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-[219.832px]" data-name="details">
      <Details1 />
    </div>
  );
}

function PaddingText() {
  return (
    <div className="content-stretch flex items-center px-[1.022px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20.449px] not-italic relative shrink-0 text-[11.25px] text-white whitespace-nowrap">16 Frames</p>
    </div>
  );
}

function ChildContent() {
  return (
    <div className="bg-[#52515e] content-stretch flex h-full items-center px-[4.09px] relative rounded-[1021.451px] shrink-0" data-name="child-content">
      <PaddingText />
    </div>
  );
}

function PaddingText1() {
  return (
    <div className="content-stretch flex items-center px-[1.022px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20.449px] not-italic relative shrink-0 text-[#f9fafe] text-[11.25px] whitespace-nowrap">Digital</p>
    </div>
  );
}

function ChildContent1() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[4.09px] relative rounded-[1021.451px] shrink-0" data-name="child-content">
      <PaddingText1 />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <p className="[word-break:break-word] col-1 font-['Inter:Semi_Bold',sans-serif] font-semibold h-[18.405px] leading-[18.405px] ml-0 mt-[2.09px] not-italic relative row-1 text-[#131221] text-[15.34px] w-[204.495px]">PT-AMD-CL-00846.F1.01</p>
      <div className="bg-[rgba(44,36,195,0.05)] col-1 content-stretch flex h-[20.449px] items-center justify-center min-w-[20.44947862625122px] ml-[223.56px] mt-0 overflow-clip relative rounded-[1021.451px] row-1" data-name="chip">
        <ChildContent1 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="col-1 content-stretch flex items-start ml-0 mt-[27.18px] relative row-1 w-[130.646px]">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20.449px] not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[71.573px]">8x3-BB_PL</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group />
      <Frame3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <p className="col-1 h-[16.36px] leading-[16.36px] ml-0 mt-0 relative row-1 text-[#7c7b87] text-[11.25px] w-[118.607px]">Available SOT</p>
      <p className="col-1 h-[18.405px] leading-[20.449px] ml-0 mt-[18.82px] relative row-1 text-[#131221] text-[13.29px] w-[136.241px]">68.2%</p>
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[160.46px] mt-0 place-items-start relative row-1">
      <p className="col-1 h-[16.36px] leading-[16.36px] ml-0 mt-0 relative row-1 text-[#7c7b87] text-[11.25px] w-[101.75px]">Impressions</p>
      <p className="col-1 h-[18.405px] leading-[20.449px] ml-0 mt-[18.82px] relative row-1 text-[#131221] text-[13.29px] w-[87.953px]">6,281</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0">
      <Group1 />
      <Group5 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <div className="bg-[rgba(19,18,33,0.05)] content-stretch flex items-center justify-center relative rounded-[1021.451px] shrink-0" data-name="include exclude">
        <button className="content-stretch cursor-pointer flex h-[24.539px] items-center justify-center overflow-clip px-[8.18px] relative rounded-[1021.451px] shrink-0" data-name="_item_button-switch">
          <div className="overflow-clip relative shrink-0 size-[16.36px]" data-name="icon">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2697 12.2697">
                <path d={svgPaths.pa72b600} fill="var(--fill-0, #605F6B)" id="Vector" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function PaddingText2() {
  return (
    <div className="content-stretch flex items-center px-[1.022px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20.449px] not-italic relative shrink-0 text-[#f9fafe] text-[11.25px] whitespace-nowrap">Digital</p>
    </div>
  );
}

function ChildContent2() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[4.09px] relative rounded-[1021.451px] shrink-0" data-name="child-content">
      <PaddingText2 />
    </div>
  );
}

function Group7() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <p className="[word-break:break-word] col-1 font-['Inter:Semi_Bold',sans-serif] font-semibold h-[18.405px] leading-[18.405px] ml-0 mt-[2.09px] not-italic relative row-1 text-[#131221] text-[15.34px] w-[204.495px]">PT-AMD-CL-00846.F1.01</p>
      <div className="bg-[rgba(44,36,195,0.05)] col-1 content-stretch flex h-[20.449px] items-center justify-center min-w-[20.44947862625122px] ml-[223.56px] mt-0 overflow-clip relative rounded-[1021.451px] row-1" data-name="chip">
        <ChildContent2 />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="col-1 content-stretch flex items-start ml-0 mt-[27.18px] relative row-1 w-[130.646px]">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20.449px] not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[71.573px]">8x3-BB_PL</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group7 />
      <Frame4 />
    </div>
  );
}

function Group9() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <p className="col-1 h-[16.36px] leading-[16.36px] ml-0 mt-0 relative row-1 text-[#7c7b87] text-[11.25px] w-[118.607px]">Available SOT</p>
      <p className="col-1 h-[18.405px] leading-[20.449px] ml-0 mt-[18.82px] relative row-1 text-[#131221] text-[13.29px] w-[136.241px]">68.2%</p>
    </div>
  );
}

function Group10() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[160.46px] mt-0 place-items-start relative row-1">
      <p className="col-1 h-[16.36px] leading-[16.36px] ml-0 mt-0 relative row-1 text-[#7c7b87] text-[11.25px] w-[101.75px]">Impressions</p>
      <p className="col-1 h-[18.405px] leading-[20.449px] ml-0 mt-[18.82px] relative row-1 text-[#131221] text-[13.29px] w-[87.953px]">6,281</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0">
      <Group9 />
      <Group10 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <div className="bg-[rgba(19,18,33,0.05)] content-stretch flex items-center justify-center relative rounded-[1021.451px] shrink-0" data-name="include exclude">
        <button className="content-stretch cursor-pointer flex h-[24.539px] items-center justify-center overflow-clip px-[8.18px] relative rounded-[1021.451px] shrink-0" data-name="_item_button-switch">
          <div className="overflow-clip relative shrink-0 size-[16.36px]" data-name="icon">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2697 12.2697">
                <path d={svgPaths.pa72b600} fill="var(--fill-0, #605F6B)" id="Vector" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function PaddingText3() {
  return (
    <div className="content-stretch flex items-center px-[1.022px] relative shrink-0" data-name="padding-text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20.449px] not-italic relative shrink-0 text-[#f9fafe] text-[11.25px] whitespace-nowrap">Digital</p>
    </div>
  );
}

function ChildContent3() {
  return (
    <div className="bg-[#272199] content-stretch flex h-full items-center px-[4.09px] relative rounded-[1021.451px] shrink-0" data-name="child-content">
      <PaddingText3 />
    </div>
  );
}

function Group12() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <p className="[word-break:break-word] col-1 font-['Inter:Semi_Bold',sans-serif] font-semibold h-[18.405px] leading-[18.405px] ml-0 mt-[2.09px] not-italic relative row-1 text-[#131221] text-[15.34px] w-[204.495px]">PT-AMD-CL-00846.F1.01</p>
      <div className="bg-[rgba(44,36,195,0.05)] col-1 content-stretch flex h-[20.449px] items-center justify-center min-w-[20.44947862625122px] ml-[223.56px] mt-0 overflow-clip relative rounded-[1021.451px] row-1" data-name="chip">
        <ChildContent3 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="col-1 content-stretch flex items-start ml-0 mt-[27.18px] relative row-1 w-[130.646px]">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20.449px] not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[71.573px]">8x3-BB_PL</p>
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group12 />
      <Frame5 />
    </div>
  );
}

function Group14() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <p className="col-1 h-[16.36px] leading-[16.36px] ml-0 mt-0 relative row-1 text-[#7c7b87] text-[11.25px] w-[118.607px]">Available SOT</p>
      <p className="col-1 h-[18.405px] leading-[20.449px] ml-0 mt-[18.82px] relative row-1 text-[#131221] text-[13.29px] w-[136.241px]">68.2%</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[160.46px] mt-0 place-items-start relative row-1">
      <p className="col-1 h-[16.36px] leading-[16.36px] ml-0 mt-0 relative row-1 text-[#7c7b87] text-[11.25px] w-[101.75px]">Impressions</p>
      <p className="col-1 h-[18.405px] leading-[20.449px] ml-0 mt-[18.82px] relative row-1 text-[#131221] text-[13.29px] w-[87.953px]">6,281</p>
    </div>
  );
}

function Group13() {
  return (
    <div className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0">
      <Group14 />
      <Group15 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <div className="bg-[rgba(19,18,33,0.05)] content-stretch flex items-center justify-center relative rounded-[1021.451px] shrink-0" data-name="include exclude">
        <button className="content-stretch cursor-pointer flex h-[24.539px] items-center justify-center overflow-clip px-[8.18px] relative rounded-[1021.451px] shrink-0" data-name="_item_button-switch">
          <div className="overflow-clip relative shrink-0 size-[16.36px]" data-name="icon">
            <div className="absolute inset-[12.5%]" data-name="Vector">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2697 12.2697">
                <path d={svgPaths.pa72b600} fill="var(--fill-0, #605F6B)" id="Vector" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function PaddingLabel() {
  return (
    <div className="content-stretch flex items-start px-[4.09px] relative shrink-0" data-name="padding-label">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20.449px] not-italic relative shrink-0 text-[#2c24c3] text-[13.29px] whitespace-nowrap">Add all to Frame List</p>
    </div>
  );
}

export default function InfoContainer() {
  return (
    <div className="bg-white relative rounded-[12.27px] size-full" data-name="info-container">
      <div className="content-stretch flex flex-col gap-[16.36px] items-center overflow-clip relative rounded-[inherit] size-full">
        <div className="bg-[#f8f8f9] content-stretch flex gap-[30.674px] items-center overflow-clip p-[16.36px] relative rounded-tl-[12.27px] rounded-tr-[12.27px] shrink-0 w-[331.282px]" data-name="header">
          <Header />
          <div className="bg-[rgba(19,18,33,0.05)] content-stretch flex items-center justify-center overflow-clip relative rounded-[6.135px] shrink-0 size-[28.629px]" data-name="iconButton">
            <div className="overflow-clip relative shrink-0 size-[16.36px]" data-name="icon">
              <div className="absolute inset-[18.75%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2253 10.2253">
                  <path d={svgPaths.p3bdbe980} fill="var(--fill-0, #131221)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[5.112px] h-[67.483px] items-start overflow-clip px-[16.36px] relative shrink-0 w-[331.282px]" data-name="location-details">
          <Details />
          <div className="bg-[rgba(19,18,33,0.05)] content-stretch flex h-[20.449px] items-center justify-center min-w-[20.44947862625122px] overflow-clip relative rounded-[1021.451px] shrink-0" data-name="chip">
            <ChildContent />
          </div>
        </div>
        <div className="bg-white relative rounded-[8px] shrink-0 w-[290.383px]" data-name="multi-frame-states">
          <div className="content-stretch flex flex-col gap-[16.36px] items-center overflow-clip pt-[16.36px] relative rounded-[inherit] size-full">
            <Group2 />
            <Group3 />
            <div className="h-[49.079px] relative shrink-0 w-full" data-name="cta-s">
              <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[10.225px] items-center justify-end px-[16.36px] relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[18.405px] leading-[20.449px] not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[218.809px]">£102.36</p>
                  <Frame />
                </div>
              </div>
              <div aria-hidden className="absolute border-[rgba(19,18,33,0.1)] border-solid border-t-[1.022px] inset-0 pointer-events-none" />
            </div>
          </div>
          <div aria-hidden className="absolute border-[1.022px] border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-white relative rounded-[8px] shrink-0 w-[290.383px]" data-name="multi-frame-states">
          <div className="content-stretch flex flex-col gap-[16.36px] items-center overflow-clip pt-[16.36px] relative rounded-[inherit] size-full">
            <Group6 />
            <Group8 />
            <div className="h-[49.079px] relative shrink-0 w-full" data-name="cta-s">
              <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[10.225px] items-center justify-end px-[16.36px] relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[18.405px] leading-[20.449px] not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[218.809px]">£102.36</p>
                  <Frame1 />
                </div>
              </div>
              <div aria-hidden className="absolute border-[rgba(19,18,33,0.1)] border-solid border-t-[1.022px] inset-0 pointer-events-none" />
            </div>
          </div>
          <div aria-hidden className="absolute border-[1.022px] border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-white relative rounded-[8px] shrink-0 w-[290.383px]" data-name="multi-frame-states">
          <div className="content-stretch flex flex-col gap-[16.36px] items-center overflow-clip pt-[16.36px] relative rounded-[inherit] size-full">
            <Group11 />
            <Group13 />
            <div className="h-[49.079px] relative shrink-0 w-full" data-name="cta-s">
              <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[10.225px] items-center justify-end px-[16.36px] relative size-full">
                  <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[18.405px] leading-[20.449px] not-italic relative shrink-0 text-[#131221] text-[13.29px] w-[218.809px]">£102.36</p>
                  <Frame2 />
                </div>
              </div>
              <div aria-hidden className="absolute border-[rgba(19,18,33,0.1)] border-solid border-t-[1.022px] inset-0 pointer-events-none" />
            </div>
          </div>
          <div aria-hidden className="absolute border-[1.022px] border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="absolute bg-white left-0 top-[706.53px] w-[331.282px]" data-name="cta">
          <div className="content-stretch flex flex-col items-start overflow-clip p-[16.36px] relative rounded-[inherit] size-full">
            <div className="bg-[rgba(44,36,195,0.05)] content-stretch flex gap-[4.09px] h-[36.809px] items-center justify-center min-w-[36.8090615272522px] overflow-clip px-[8.18px] relative rounded-[6.135px] shrink-0 w-[290.383px]" data-name="Button">
              <div className="overflow-clip relative shrink-0 size-[16.36px]" data-name="start-icon">
                <div className="absolute inset-[12.5%]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2697 12.2697">
                    <path d={svgPaths.p3330eb00} fill="var(--fill-0, #2C24C3)" id="Vector" />
                  </svg>
                </div>
              </div>
              <PaddingLabel />
            </div>
          </div>
          <div aria-hidden className="absolute border-[rgba(19,18,33,0.1)] border-solid border-t-[1.022px] inset-0 pointer-events-none" />
        </div>
      </div>
      <div aria-hidden className="absolute border-[1.022px] border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[12.27px]" />
    </div>
  );
}