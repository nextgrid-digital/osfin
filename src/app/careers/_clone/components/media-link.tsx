import type { DittoNodeMetaMap } from "../ditto-meta";
import type { MediaLinkStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type MediaLinkData = {
  href: string;
  label: string;
  label2: string;
  location: string;
  description?: string;
};
/** A linked media tile. */
export default function MediaLink({ d, meta, styles }: { d: MediaLinkData; meta: DittoNodeMetaMap; styles: MediaLinkStyles }) {
  return (
    <a className={cn("border-b border-solid flex relative mx-6 p-5 items-start gap-4 text-left cursor-pointer max-lg:my-1.5 max-lg:mx-0 max-lg:px-0 hover:bg-clr-15 focus:bg-clr-1 group", styles.className)} data-component="link" href={d.href}>
      <span className="block mt-1 text-muted-foreground [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-xs leading-4">
        {d.label}
      </span>
      <span className="flex flex-col flex-1 gap-1">
        <span className={cn("block text-color-001 [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-lg leading-7 tracking-[-0.3px]", styles.className2)}>
          {d.label2}
        </span>
        <span className="flex flex-wrap gap-x-3 text-muted [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-xs leading-4 tracking-[0.3px] uppercase">
          <span className="block">
            {d.location}
          </span>
          <span data-ditto-id={meta[6]?.anchor} className="block">
            Full-time
          </span>
        </span>
        {d.description ? (
          <span className="block mt-1 text-color-007 text-sm leading-[1.25rem]">
            {d.description}
          </span>
        ) : null}
      </span>
      <span className="flex mt-1.5 items-center shrink-0 gap-1.5">
        <span className="block opacity-0 text-muted-foreground [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-xs leading-4 tracking-[0.3px] uppercase [translate:-4px] group-hover:opacity-100">
          Apply Now
        </span>
        <svg className="w-4 h-4 block overflow-hidden align-middle text-muted-foreground focus:outline-clr-16 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}
