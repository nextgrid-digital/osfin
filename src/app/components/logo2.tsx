import type { ReactNode } from "react";
export type Logo2Data = {
  ariaLabel: string;
  href: string;
  icon: ReactNode;
};
/** A logo. */
export default function Logo2({ d }: { d: Logo2Data }) {
  return (
    <li className="list-item">
      <a className="inline-flex relative z-0 items-center gap-2.5 overflow-clip [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase whitespace-nowrap text-nowrap cursor-pointer h-[2.8125rem]" data-component="link" aria-disabled="false" aria-label={d.ariaLabel} href={d.href} rel="noopener noreferrer">
        <span className="border border-solid border-border flex relative z-0 rounded-full justify-center items-center overflow-clip aspect-square h-[2.8125rem]">
          {" "}
          <span className="w-[2.6875rem] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-foreground [scale:0_1]" />
          {" "}
          <svg className="w-4.5 h-4.5 block overflow-hidden align-middle focus:outline-clr-11 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" aria-hidden="true" height="18" role="presentation" width="18" fill="currentColor">{d.icon}</svg>
          {" "}
        </span>
      </a>
      {" "}
    </li>
  );
}
