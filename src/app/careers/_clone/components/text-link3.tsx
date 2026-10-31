import type { TextLink3Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type TextLink3Data = {
  href: string;
  label: string;
};
/** A text link. */
export default function TextLink3({ d, styles }: { d: TextLink3Data; styles: TextLink3Styles }) {
  return (
    <a className={cn("block relative text-color-002 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-sm leading-[1.125rem] tracking-[0.84px] text-left uppercase whitespace-nowrap text-nowrap cursor-pointer max-lg:text-xs max-lg:leading-[1rem] max-lg:tracking-[0.72px] max-lg:[white-space:inherit] max-lg:[text-wrap:initial] after:content-[''] after:block after:absolute after:top-[1.075rem] after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-background max-lg:after:top-[0.9125rem] hover:opacity-[0.973138] focus:opacity-100", styles.className)} data-component="link" href={d.href}>
      {d.label}
    </a>
  );
}
