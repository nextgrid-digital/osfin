import type { DittoNodeMetaMap } from "../ditto-meta";
import type { FeatureCardStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type FeatureCardData = {
  description: string;
  description2: string;
  title: string;
};
/** A feature card. */
export default function FeatureCard({ d, meta, styles }: { d: FeatureCardData; meta: DittoNodeMetaMap; styles: FeatureCardStyles }) {
  return (
    <div className={cn("h-[14.05rem] min-h-45 flex p-6 flex-col justify-between gap-10 bg-color-004 max-lg:p-5 2xl:h-[16.75rem]", styles.className)}>
      <span className="w-8 h-8 flex justify-center items-center shrink-0 text-color-018 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.625rem] leading-[0.9375rem] bg-surface-2">
        {d.title}
      </span>
      <div className="flex flex-col gap-3">
        <p data-ditto-id={meta[3]?.anchor} className="block text-foreground [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-xl leading-7">
          {d.description}
        </p>
        <p className="block text-color-015 text-sm leading-[1.25rem] tracking-[-0.42px]">
          {d.description2}
        </p>
      </div>
    </div>
  );
}
