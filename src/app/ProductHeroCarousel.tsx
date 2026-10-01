"use client";

import { Carousel_003 } from "@/components/ui/skiper49";
import { PRODUCTS } from "../content/products";
import { useProductSelect } from "./product-select";

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const select = useProductSelect();
  const product = PRODUCTS.find((item) => item.slug === currentSlug);
  const currentIndex = Math.max(
    0,
    PRODUCTS.findIndex((item) => item.slug === currentSlug),
  );

  const slideArt: Record<string, string> = {
    "settlement-mesh": "/products/match-iq.png?v=3",
    "exception-resolution": "/products/exception-resolution.png?v=4",
    "control-views": "/products/control-views.png?v=3",
    "risk-signals": "/products/risk-signals.png?v=3",
    "close-orchestration": "/products/close-orchestration.png?v=5",
  };

  const slides = PRODUCTS.map((item) =>
    slideArt[item.slug] ? (
      <div key={item.slug} className="relative h-full w-full bg-[#E4E4E4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slideArt[item.slug]}
          alt=""
          className="pointer-events-none absolute inset-0 size-full object-contain"
        />
      </div>
    ) : (
      <div key={item.slug} className="h-full w-full bg-[#E4E4E4]" />
    ),
  );

  return (
    <div className="not-typeset relative mt-14 md:mt-16" data-not-typeset>
      <Carousel_003
        slides={slides}
        initialIndex={currentIndex}
        showNavigation
        loop
        className="max-w-none px-0"
        label={product ? `${product.name} gallery` : "Product gallery"}
        onSettle={(index) => {
          const next = PRODUCTS[index];
          if (!next || next.slug === currentSlug || !select) return;
          select(next.slug);
        }}
      />
    </div>
  );
}
