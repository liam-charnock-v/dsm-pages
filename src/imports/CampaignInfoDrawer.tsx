import svgPaths from "./svg-wkq091htnl";

function Title1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95px]" data-name="Title">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[13px] text-black top-0">Direct Sales</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Title">
      <Title1 />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="caret-down">
        <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
            <path d={svgPaths.p10c93a80} fill="var(--fill-0, #131221)" fillOpacity="0.7" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TitleIcon() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[6px] shrink-0" data-name="Title + icon">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Logo / Direct Sales">
        <div className="bg-[#fcdcca] content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
            <div className="absolute inset-[9.38%_9.38%_9.37%_9.37%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                <path d={svgPaths.p11cdc972} fill="var(--fill-0, #E4712E)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Title />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
              <path d={svgPaths.p1a706900} fill="var(--fill-0, #030213)" fillOpacity="0.75" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[12.49%_12.5%_12.47%_12.48%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0035 12.0057">
              <path d={svgPaths.p360335c0} fill="var(--fill-0, #030213)" fillOpacity="0.75" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[15.63%_9.38%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 11">
              <path d={svgPaths.p1aae9760} fill="var(--fill-0, #030213)" fillOpacity="0.75" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderCard() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header card">
      <div className="content-stretch flex items-center pl-[4px] pr-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Campaign selection">
        <TitleIcon />
      </div>
      <Frame12 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Bold_Italic',sans-serif] font-bold italic justify-center leading-[0] min-h-px min-w-px opacity-80 relative text-[#7c7b87] text-[14px]">
        <p className="leading-[20px] whitespace-pre-wrap">New Campaign</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame1 />
    </div>
  );
}

function CampaignNameId() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Campaign name + ID">
      <div className="content-stretch flex h-[24px] items-start relative shrink-0 w-full" data-name="Title Edit">
        <div className="flex-[1_0_0] h-[24px] min-h-px min-w-[184px] relative rounded-[4px]" data-name=".base/Title Edit">
          <div className="flex flex-row items-center min-w-[inherit] size-full">
            <div className="content-stretch flex gap-[4px] items-center min-w-[inherit] pl-[2px] relative size-full">
              <Frame />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="ID click to copy">
        <div className="flex-[1_0_0] h-[24px] min-h-px min-w-px relative rounded-[4px]" data-name=".base/ID click to copy">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between pl-[2px] relative size-full">
              <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[11px] text-ellipsis whitespace-nowrap">
                <p className="leading-[20px] overflow-hidden">Campaign ID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[8px] pl-[24px] pr-[8px] pt-[4px] relative w-full">
        <HeaderCard />
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Hedaer">
          <CampaignNameId />
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#131221] text-[11px]">{`Advertiser `}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#131221] text-[11px]">*</p>
    </div>
  );
}

function PaddingContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#131221] text-[11px] text-ellipsis whitespace-nowrap">&nbsp;</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">{`Brand  `}</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">*</p>
    </div>
  );
}

function PaddingContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#131221] text-[11px] text-ellipsis whitespace-nowrap">&nbsp;</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">Product Category</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">*</p>
    </div>
  );
}

function PaddingContent2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#131221] text-[11px] text-ellipsis whitespace-nowrap">&nbsp;</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent2 />
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="end-icon">
        <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
            <path d={svgPaths.p10c93a80} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[8px] items-start px-[24px] py-[12px] relative w-full">
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame9 />
          <Input />
        </div>
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame10 />
          <Input1 />
        </div>
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame11 />
          <Input2 />
        </div>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">Agency</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label3 />
    </div>
  );
}

function PaddingContent3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[11px] text-ellipsis whitespace-nowrap">{` `}</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">Specialist</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label4 />
    </div>
  );
}

function PaddingContent4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[11px] text-ellipsis whitespace-nowrap">{` `}</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent4 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">Sales person*</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label5 />
    </div>
  );
}

function PaddingContent5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[11px] text-ellipsis whitespace-nowrap">{` `}</p>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent5 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">Sales team*</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label6 />
    </div>
  );
}

function PaddingContent6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[11px] text-ellipsis whitespace-nowrap">{` `}</p>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="label">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#42414e] text-[11px]">Admin Person*</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <Label7 />
    </div>
  );
}

function PaddingContent7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#7c7b87] text-[11px] text-ellipsis whitespace-nowrap">{` `}</p>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-[#f8f8f9] content-stretch flex gap-[2px] h-[24px] items-center justify-end overflow-clip px-[8px] relative rounded-[4px] shrink-0 w-[179px]" data-name="input">
      <PaddingContent7 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[8px] items-start px-[24px] py-[12px] relative w-full">
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame13 />
          <Input3 />
        </div>
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame14 />
          <Input4 />
        </div>
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame15 />
          <Input5 />
        </div>
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame16 />
          <Input6 />
        </div>
        <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Input">
          <Frame17 />
          <Input7 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame6 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="exclude">
        <div className="absolute inset-[9.38%_9.38%_9.37%_9.37%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
            <path d={svgPaths.p73ad70} fill="var(--fill-0, #7C7B87)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7c7b87] text-[11px] whitespace-nowrap">
        <p className="leading-[20px]">Exclusion Criteria</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame2 />
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-[24px]" data-name="iconButton">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="icon">
          <div className="absolute inset-[12.5%_9.38%_12.5%_9.35%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0039 12">
              <path d={svgPaths.p3db63780} fill="var(--fill-0, #42414E)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignSettings() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Campaign settings">
      <div aria-hidden="true" className="absolute border-[rgba(19,18,33,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative size-full">
        <Frame3 />
      </div>
    </div>
  );
}

function PaddingLabel() {
  return (
    <div className="content-stretch flex items-start px-[4px] relative shrink-0" data-name="padding-label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#bab9c3] text-[13px]">Save</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col h-[546px] items-center justify-end pb-[24px] pt-[12px] px-[16px] relative shrink-0 w-[350px]">
      <div className="bg-[#f3f3f5] content-stretch flex gap-[4px] h-[36px] items-center justify-center min-w-[36px] overflow-clip px-[12px] relative rounded-[6px] shrink-0 w-[320px]" data-name="Button">
        <PaddingLabel />
      </div>
    </div>
  );
}

export default function CampaignInfoDrawer() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Campaign info drawer">
      <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none" />
      <Frame8 />
      <Frame5 />
      <CampaignSettings />
      <Frame7 />
    </div>
  );
}