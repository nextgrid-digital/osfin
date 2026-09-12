import type { Tile2Styles } from "../_styles";
import { cn } from "../../../lib/utils";
export type Tile2Data = Record<string, never>;
/** A content tile. */
export default function Tile2({ d, styles }: { d: Tile2Data; styles: Tile2Styles }) {
  return (
    <div className={cn("w-max max-w-none shrink-0 block whitespace-nowrap [animation-name:marquee-rtl] [animation-duration:27.8459s] [animation-timing-function:linear] [animation-iteration-count:infinite] max-md:[animation-duration:13.9231s] md:max-lg:[animation-duration:18.5641s]", styles.className)} aria-hidden="true">
      {" Fetch · Match · Trace · Resolve · Guard · Close"}
      <span className="inline px-[1.85rem] max-md:px-[0.925rem] md:max-lg:px-5" aria-hidden="true" role="separator">
        ·
      </span>
      {" "}
    </div>
  );
}
