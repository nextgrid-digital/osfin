"use client";

import { Carousel_003 } from "@/components/ui/skiper49";
import { PRODUCTS } from "../content/products";
import ProductSheet, { schemeForIcon } from "./ProductSheet";
import { useProductSelect } from "./product-select";

const SLIDE_ART: Record<string, string> = {
  "Match IQ": "/products/match-iq.svg",
  "Exception Resolution": "/products/exception-resolution.svg",
  "Risk Signals": "/products/risk-signals.svg",
  "Close Orchestration": "/products/close-orchestration.svg",
};

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const select = useProductSelect();
  const product = PRODUCTS.find((item) => item.slug === currentSlug);
  const currentIndex = Math.max(
    0,
    PRODUCTS.findIndex((item) => item.slug === currentSlug),
  );

  const slides = PRODUCTS.map((item) => {
    const art = SLIDE_ART[item.name];
    return (
      <div
        key={item.slug}
        className={`relative h-full w-full bg-transparent text-black/40${art ? " overflow-hidden" : ""}`}
      >
        {art ? (
          <img
            src={art}
            alt={item.name}
            className="pointer-events-none absolute inset-0 size-full object-contain"
          />
        ) : (
          <ProductSheet
            name={item.name}
            scheme={schemeForIcon(item.icon)}
            wordmark={false}
            indexes={false}
          />
        )}
      </div>
    );
  });

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
