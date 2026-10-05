"use client";

import { Carousel } from "@/components/ui/carousel";
import { PRODUCTS } from "../content/products";
import { useProductSelect } from "./product-select";

const slideArt: Record<string, string> = {
  "settlement-mesh": "/products/match-iq.png?v=7",
  "exception-resolution": "/products/exception-resolution.png?v=4",
  "control-views": "/products/control-views.png?v=3",
  "risk-signals": "/products/risk-signals.png?v=3",
  "close-orchestration": "/products/close-orchestration.png?v=5",
};

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const select = useProductSelect();
  const product = PRODUCTS.find((item) => item.slug === currentSlug);
  const currentIndex = Math.max(
    0,
    PRODUCTS.findIndex((item) => item.slug === currentSlug),
  );

  return (
    <div className="not-typeset relative mt-6 md:mt-8" data-not-typeset>
      <Carousel
        label={product ? `${product.name} gallery` : "Product gallery"}
        index={currentIndex}
        onIndexChange={(nextIndex) => {
          const next = PRODUCTS[nextIndex];
          if (!next || next.slug === currentSlug || !select) return;
          select(next.slug);
        }}
        slideSize="min(78cqw, 440px)"
        slideLabel={(index) => PRODUCTS[index]?.name ?? `${index + 1} of ${PRODUCTS.length}`}
      >
        {PRODUCTS.map((item) => (
          <div
            key={item.slug}
            className="aspect-square overflow-hidden border border-black/15 bg-[#E4E4E4]"
          >
            {slideArt[item.slug] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slideArt[item.slug]}
                alt=""
                className="pointer-events-none size-full object-contain"
              />
            ) : null}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
