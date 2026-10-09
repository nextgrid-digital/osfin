"use client";

import { Loupe, Riffle, Slow, Vault } from "@lucasmarkes/hairline/react";

const figures = {
  slow: Slow,
  loupe: Loupe,
  riffle: Riffle,
  vault: Vault,
} as const;

/** Cover-scale each sculpture inside the shared frame. */
const scale = {
  slow: 1.35,
  loupe: 1.15,
  riffle: 1.3,
  vault: 1.2,
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
    <div
      className={`relative flex size-full items-center justify-center overflow-hidden bg-white ${className}`.trim()}
    >
      <Figure
        theme="light"
        className="max-w-none [&_[data-hairline-live]]:sr-only"
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          transform: `scale(${scale[figure]})`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
}
