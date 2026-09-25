"use client";

import { useRouter } from "next/navigation";
import { Carousel_003 } from "@/components/ui/skiper49";
import { PRODUCTS } from "../content/products";
import ProductIcon from "./ProductIcon";

export function ReconDiagram() {
  const r = 168;
  const d = 96;
  const cx = 600;
  const cy = 228;
  const left = cx - d;
  const right = cx + d;
  const halfH = Math.sqrt(r * r - d * d);
  const lineCount = 8;
  const chords = Array.from({ length: lineCount }, (_, i) => {
    const y = cy - halfH + ((2 * halfH) * (i + 0.5)) / lineCount;
    const span = Math.sqrt(r * r - (y - cy) * (y - cy));
    return { y, x1: right - span, x2: left + span };
  });

  return (
    <svg viewBox="0 0 1200 520" className="h-[78%] w-[92%] text-black/40" aria-hidden>
      <circle cx={left} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx={right} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="1.25" />
      {chords.map((chord) => (
        <line
          key={chord.y}
          x1={chord.x1}
          y1={chord.y}
          x2={chord.x2}
          y2={chord.y}
          stroke="currentColor"
          strokeWidth="1.25"
        />
      ))}
      <text
        x={left - r - 56}
        y={cy}
        textAnchor="end"
        dominantBaseline="middle"
        fill="currentColor"
        fontSize="15"
        letterSpacing="0.32em"
        className="font-mono"
      >
        RECORDS
      </text>
      <text
        x={right + r + 56}
        y={cy}
        textAnchor="start"
        dominantBaseline="middle"
        fill="currentColor"
        fontSize="15"
        letterSpacing="0.32em"
        className="font-mono"
      >
        LEDGER
      </text>
      <text
        x={cx}
        y={cy + r + 52}
        textAnchor="middle"
        fill="currentColor"
        fontSize="15"
        letterSpacing="0.32em"
        className="font-mono"
      >
        MATCH
      </text>
    </svg>
  );
}

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const router = useRouter();
  const product = PRODUCTS.find((item) => item.slug === currentSlug);
  const currentIndex = Math.max(
    0,
    PRODUCTS.findIndex((item) => item.slug === currentSlug),
  );

  const slides = PRODUCTS.map((item) => (
    <div key={item.slug} className="flex h-full w-full items-center justify-center bg-[#E4E4E4] text-black/40">
      {item.slug === "settlement-mesh" ? (
        <ReconDiagram />
      ) : (
        <ProductIcon kind={item.icon} className="h-[55%] w-[55%]" />
      )}
    </div>
  ));

  return (
    <div className="not-typeset relative mt-14 md:mt-16" data-not-typeset>
      <Carousel_003
        key={currentSlug}
        slides={slides}
        initialIndex={currentIndex}
        showNavigation
        loop
        className="max-w-none px-0"
        label={product ? `${product.name} gallery` : "Product gallery"}
        onSettle={(index) => {
          const next = PRODUCTS[index];
          if (!next || next.slug === currentSlug) return;
          router.push(`/products/${next.slug}`, { scroll: false });
        }}
      />
    </div>
  );
}
