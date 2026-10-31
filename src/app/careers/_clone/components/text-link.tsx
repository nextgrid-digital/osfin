import type { TextLinkStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type TextLinkData = {
  ariapressed: "true" | "false";
  label: string;
  label2: string;
};
/** A text link. */
export default function TextLink({ d, styles, onClick }: { d: TextLinkData; styles: TextLinkStyles; onClick?: () => void }) {
  return (
    <button className={cn("h-14 min-h-14 flex py-4 justify-between items-center gap-3 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-xs leading-4 tracking-[0.3px] text-left uppercase cursor-pointer max-lg:px-6", styles.className)} data-component="button" aria-pressed={d.ariapressed} type="button" onClick={onClick}>
      <span className="block">
        {d.label}
      </span>
      <span className="block">
        {d.label2}
      </span>
    </button>
  );
}
