import type { DittoNodeMetaMap } from "../ditto-meta";
import type { MediaTile2Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type MediaTile2Data = {
  imgSrc: string;
  srcSet: string;
  description: string;
  description2: string;
  description3: string;
};
/** A media tile. */
export default function MediaTile2({ d, meta, styles }: { d: MediaTile2Data; meta: DittoNodeMetaMap; styles: MediaTile2Styles }) {
  return (
    <div className={cn("h-60 min-h-60 flex p-6 flex-col justify-between bg-color-012 max-md:h-55 max-md:min-h-55 max-md:p-5", styles.className)}>
      <div className="flex justify-between items-center">
        <img className="w-6 h-6 block max-w-full overflow-clip aspect-[auto_24/24] align-middle text-clr-1 brightness-0 opacity-50" data-component="image" alt="" height="24" src={d.imgSrc} srcSet={d.srcSet} width="24" />
        <p className="block text-color-014 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-xs leading-4">
          {d.description}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p data-ditto-id={meta[5]?.anchor} className="block text-foreground [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-xl leading-7 tracking-[-0.4px]">
          {d.description2}
        </p>
        <p className="block text-color-002 text-sm leading-[1.25rem]">
          {d.description3}
        </p>
      </div>
    </div>
  );
}
