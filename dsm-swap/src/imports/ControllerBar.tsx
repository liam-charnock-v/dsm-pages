import svgPaths from "./svg-vdmg2nffby";

function PaddingText() {
  return (
    <div className="content-stretch flex items-center px-px relative shrink-0" data-name="padding-text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#9d7717] text-[11px] whitespace-nowrap">Draft</p>
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

function PaddingContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative" data-name="padding-content">
      <div className="bg-[rgba(248,188,26,0.05)] content-stretch flex h-[20px] items-center justify-center min-w-[20px] overflow-clip relative rounded-[999px] shrink-0" data-name="Status">
        <ParentContent />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[28px] relative rounded-[4px] shrink-0 w-[284px]" data-name="input">
      <div className="content-stretch flex gap-[2px] items-center justify-end overflow-clip px-[8px] relative rounded-[inherit] size-full">
        <PaddingContent />
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="end-icon">
          <div className="absolute inset-[34.37%_15.62%_28.12%_15.62%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0006 6.00067">
              <path d={svgPaths.p10c93a80} fill="var(--fill-0, #7C7B87)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
      <div aria-hidden="true" className="absolute border border-[#eaeaef] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}

export default function ControllerBar() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-center justify-center px-[8px] py-[12px] relative rounded-[12px] size-full" data-name="Controller bar">
      <div aria-hidden="true" className="absolute border border-[rgba(19,18,33,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_3px_4px_0px_rgba(16,16,52,0.06)]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-end leading-[0] not-italic relative shrink-0 text-[#131221] text-[11px] w-[284px]">
        <p className="leading-[16px]">Campaign Status</p>
      </div>
      <Input />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_rgba(16,16,52,0.08)]" />
    </div>
  );
}