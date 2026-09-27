import { SchemeArt, SHEET_VIEWBOX, SheetGridLines, type ProductSheetScheme } from "./ProductSheet";

export default function HomeProductPanel({ scheme }: { scheme: ProductSheetScheme }) {
  return (
    <div
      className="not-typeset relative h-full min-h-[28rem] w-full overflow-hidden bg-white lg:min-h-[32rem]"
      data-not-typeset
      aria-hidden
    >
      <svg
        viewBox={SHEET_VIEWBOX}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <SheetGridLines />
        <SchemeArt scheme={scheme} />
      </svg>
    </div>
  );
}
