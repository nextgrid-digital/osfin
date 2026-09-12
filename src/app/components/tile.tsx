import type { TileStyles } from "../_styles";
import { cn } from "../../lib/utils";
export type TileData = Record<string, never>;
/** A content tile. */
export default function Tile({ d, styles }: { d: TileData; styles: TileStyles }) {
  return (
    <div className={cn("w-max max-w-none shrink-0 block whitespace-nowrap [animation-name:marquee-rtl] [animation-duration:18.265s] [animation-timing-function:linear] [animation-iteration-count:infinite] max-md:[animation-duration:9.13281s] md:max-lg:[animation-duration:12.1766s]", styles.className)} aria-hidden="true">
      {" THE WORK IN CONTEXT"}
      <span className="inline px-[1.85rem] max-md:px-[0.925rem] md:max-lg:px-5" aria-hidden="true" role="separator">
        ·
      </span>
      {" "}
    </div>
  );
}
