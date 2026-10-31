import type { DittoNodeMetaMap } from "../ditto-meta";
export type MediaTileData = {
  description: string;
  description2: string;
  description3: string;
};
/** A media tile. */
export default function MediaTile({ d, meta }: { d: MediaTileData; meta: DittoNodeMetaMap }) {
  return (
    <div className="block">
      <div className="h-85 min-h-85 border border-solid border-color-004 flex relative p-6 flex-col overflow-hidden text-color-001 max-md:h-70 max-md:min-h-70 max-md:p-5">
        <div className="flex relative flex-col gap-3">
          <p className="block text-color-019 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-xs leading-4 tracking-[0.3px] uppercase">
            {d.description}
          </p>
          <p className="block [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-[1.625rem] leading-[1.8125rem] tracking-[-0.22px] max-md:text-[1.375rem] max-md:leading-[1.5rem]">
            {d.description2}
          </p>
          <p className="block text-color-013 text-sm leading-[1.25rem]">
            {d.description3}
          </p>
        </div>
        <div className="w-4 h-4 block absolute -top-0.5 right-0 min-w-0 bg-color-001 [clip-path:polygon(100%_0px,_0px_0px,_100%_100%)]" />
        <div data-ditto-id={meta[9]?.anchor} className="absolute inset-x-0 bottom-0 block min-w-0 overflow-hidden pointer-events-none h-[1.375rem] max-md:hidden" aria-hidden="true">
          <div className="block absolute inset-x-0 [background-size:100%_44px] [background-position:50%_0%] bg-no-repeat pointer-events-none h-11" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/87fa770d2f8c.png\")" }} />
        </div>
      </div>
    </div>
  );
}
