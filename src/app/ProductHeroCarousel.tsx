"use client";

import { Carousel_003 } from "@/components/ui/skiper49";
import { PRODUCTS } from "../content/products";
import MatchIqMark from "./MatchIqMark";
import ProductSheet, { schemeForIcon } from "./ProductSheet";
import { useProductSelect } from "./product-select";

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const select = useProductSelect();
  const product = PRODUCTS.find((item) => item.slug === currentSlug);
  const currentIndex = Math.max(
    0,
    PRODUCTS.findIndex((item) => item.slug === currentSlug),
  );

  const slides = PRODUCTS.map((item) => {
    const scheme = schemeForIcon(item.icon);
    return (
      <div
        key={item.slug}
        className="relative h-full w-full bg-transparent text-black/40"
      >
        {item.name === "Match IQ" ? (
          <MatchIqMark />
        ) : (
          <ProductSheet
            name={item.name}
            scheme={scheme}
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
