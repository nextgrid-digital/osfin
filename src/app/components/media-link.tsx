import type { ReactNode } from "react";
import type { MediaLinkStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type MediaLinkData = {
  kind?: string;
  href: string;
  kind2?: string;
  icon: ReactNode;
  label: string;
  label2: string;
  kind3?: string;
};
/** A linked media tile. */
export default function MediaLink({ d, styles }: { d: MediaLinkData; styles: MediaLinkStyles }) {
  return (
    <a className="flex relative w-[21rem] shrink-0 p-6 flex-col gap-4 text-background bg-clr-6 cursor-pointer aspect-square max-lg:w-[16.5rem] max-lg:aspect-[3/4] 2xl:w-[24rem] hover:bg-clr-9" data-component={d.kind} aria-disabled="false" href={d.href}>
      <div className={cn("flex absolute top-[17%] left-[17%] w-[66%] h-[66%] opacity-50 min-w-0 items-center pointer-events-none", styles.className)} aria-hidden="true">
        <svg className="w-auto h-full max-h-full block overflow-hidden align-middle pointer-events-none focus:outline-clr-12 focus:[outline-style:auto] focus:outline-[5px]" data-component={d.kind2} viewBox="0 0 811 811" slot="image" fill="currentColor">{d.icon}</svg>
        {" "}
      </div>
      {" "}
      <span className="flex mb-2.5 items-center text-2xl [font-weight:420] leading-[1.625rem] tracking-[-0.48px] [font-feature-settings:'calt'] max-md:text-[1.375rem] max-md:leading-[1.5rem] max-md:tracking-[-0.44px] max-lg:mb-0 md:max-lg:text-[1.4375rem] md:max-lg:leading-[1.5625rem] md:max-lg:tracking-[-0.46px]">
        {d.label}
      </span>
      {" "}
      <span className={cn("block min-w-0 max-w-full [font-weight:358] leading-[1.375rem] tracking-[0.32px] max-lg:text-[0.9375rem] max-lg:leading-[1.3125rem] max-lg:tracking-[0.3px]", styles.className2)}>
        {d.label2}
      </span>
      {" "}
      <div className={cn("flex mt-auto items-center gap-2.5", styles.className3)}>
        <span className="border border-solid border-surface flex relative z-0 rounded-full justify-center items-center overflow-clip aspect-square h-[2.8125rem]">
          {" "}
          <span className="w-[2.6875rem] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-background [scale:0_1]" />
          {" "}
          <svg className="w-[0.9375rem] h-[0.9375rem] block overflow-hidden align-middle focus:outline-clr-12 focus:[outline-style:auto] focus:outline-[5px]" data-component={d.kind3} aria-hidden="true" height="15" role="presentation" width="15" fill="currentColor">
            <use xlinkHref="/sprite.svg#arrow-forward" />
          </svg>
          {" "}
        </span>
        {" "}
        <span className="block [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase">
          {" Discover "}
        </span>
        {" "}
      </div>
    </a>
  );
}
