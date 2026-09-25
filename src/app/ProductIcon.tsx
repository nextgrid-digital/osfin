import type { ProductIconKind } from "../content/products";

export default function ProductIcon({
  kind,
  className = "h-[55%] w-[55%]",
}: {
  kind: ProductIconKind;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      {kind === "mesh" && (
        <>
          {[0, 8, 16, 24].map((y) => (
            <path key={y} {...common} d={`M28 ${36 + y} H72 Q88 ${36 + y} 88 ${52 + y} V78`} />
          ))}
        </>
      )}
      {kind === "venn" && (
        <>
          <circle {...common} cx="48" cy="60" r="28" />
          <circle {...common} cx="72" cy="60" r="28" />
        </>
      )}
      {kind === "hex" && (
        <>
          <path {...common} d="M60 22 L96 42 V78 L60 98 L24 78 V42 Z" />
          <path {...common} d="M60 40 L80 52 V76 L60 88 L40 76 V52 Z" />
          <path {...common} d="M40 52 L60 64 L80 52 M60 64 V88" />
        </>
      )}
      {kind === "octagon" && (
        <>
          {[18, 28, 38, 48].map((s) => {
            const o = (120 - s * 2) / 2;
            return (
              <rect key={s} {...common} x={o} y={o} width={s * 2} height={s * 2} rx={s * 0.35} />
            );
          })}
        </>
      )}
      {kind === "squares" && (
        <>
          <rect {...common} x="28" y="28" width="44" height="44" />
          <rect {...common} x="40" y="40" width="44" height="44" />
          <rect {...common} x="52" y="52" width="44" height="44" />
        </>
      )}
    </svg>
  );
}
