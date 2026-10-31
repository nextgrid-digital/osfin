import type { Logo2Styles } from "../_styles";
import { cn } from "@/lib/utils";
export type Logo2Data = {
  imgSrc: string;
  srcSet: string;
};
/** A logo. */
export default function Logo2({ d, styles }: { d: Logo2Data; styles: Logo2Styles }) {
  return (
    <div className={cn("block absolute pointer-events-none", styles.className)}>
      <img className="w-full h-full block absolute top-0 left-0 max-w-full overflow-clip object-cover align-middle text-clr-1 pointer-events-none" data-component="image" alt="" sizes="(min-width: 1704px) 780px, 50vw" src={d.imgSrc} srcSet={d.srcSet} />
    </div>
  );
}
