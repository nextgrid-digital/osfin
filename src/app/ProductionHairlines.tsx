"use client";

import type { CSSProperties } from "react";
import { Riffle, Slow, Turntable } from "@lucasmarkes/hairline/react";

const plateStyle = {
  ["--hairline-plate" as string]: "#E4E4E4",
  ["--hairline-edge" as string]: "#001D20",
  ["--hairline-mid" as string]: "rgba(0, 29, 32, 0.55)",
  ["--hairline-lo" as string]: "rgba(0, 29, 32, 0.28)",
  ["--hairline-hi" as string]: "#001D20",
  ["--hairline-stroke" as string]: "0.95",
} as CSSProperties;

const figures = {
  slow: Slow,
  turntable: Turntable,
  riffle: Riffle,
} as const;

/** Cover-scale each sculpture inside the shared frame. */
const scale = {
  slow: 1.55,
  turntable: 1.15,
  riffle: 1.5,
} as const;

/** Native Hairline package figures for the homepage production cards. */
export default function ProductionHairline({
  figure,
  className = "",
}: {
  figure: keyof typeof figures;
  className?: string;
}) {
  const Figure = figures[figure];

  return (
    <div className={`relative size-full overflow-hidden ${className}`.trim()} style={plateStyle}>
      <Figure
        theme="light"
        className="absolute inset-0 max-w-none [&_[data-hairline-live]]:sr-only [&_svg]:h-full [&_svg]:w-full"
        style={{
          aspectRatio: "auto",
          width: "100%",
          height: "100%",
          transform: `scale(${scale[figure]})`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}
