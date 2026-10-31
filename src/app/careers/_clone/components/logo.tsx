import type { LogoStyles } from "../_styles";
import { cn } from "@/lib/utils";
export type LogoData = {
  imgSrc: string;
  srcSet: string;
};
/** A logo. */
export default function Logo({ d, styles }: { d: LogoData; styles: LogoStyles }) {
  return (
    <div className={cn("block absolute pointer-events-none", styles.className)}>
      <img className="w-full h-full block absolute top-0 left-0 max-w-full overflow-clip object-contain align-middle text-clr-1 pointer-events-none" alt="" sizes="60vw" src={d.imgSrc} srcSet={d.srcSet} />
    </div>
  );
}
