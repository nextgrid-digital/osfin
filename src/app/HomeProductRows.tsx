"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { PRODUCTS } from "../content/products";
import ControlViewsFigure from "./ControlViewsFigure";
import SiteContainer from "./SiteContainer";
import TransitionLink from "./TransitionLink";

const productArt: Record<string, string> = {
  "settlement-mesh": "/products/match-iq.png?v=7",
  "exception-resolution": "/products/exception-resolution.png?v=4",
  "control-views": "/products/control-views.png?v=3",
  "risk-signals": "/products/risk-signals.png?v=5",
  "close-orchestration": "/products/close-orchestration.png?v=5",
};

function SliderArrow({ direction }: { direction: "prev" | "next" }) {
  const d = direction === "prev" ? "M13 8H3M7 4 3 8l4 4" : "M3 8h10M9 4l4 4-4 4";
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export default function HomeProductRows() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setCanPrev(emblaApi.canGoToPrev());
      setCanNext(emblaApi.canGoToNext());
    };
    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reinit", sync);
    emblaApi.on("resize", sync);
    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reinit", sync);
      emblaApi.off("resize", sync);
    };
  }, [emblaApi]);

  return (
    <section className="py-28 md:py-40" aria-roledescription="carousel" aria-label="Products">
      <SiteContainer>
        <div className="flex items-end justify-end gap-2 border-b border-black/15 pb-5">
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center border border-black/15 text-[rgba(0,0,0,0.875)] disabled:opacity-30"
            aria-label="Previous products"
            disabled={!canPrev}
            onClick={() => emblaApi?.goToPrev()}
          >
            <SliderArrow direction="prev" />
          </button>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center border border-black/15 text-[rgba(0,0,0,0.875)] disabled:opacity-30"
            aria-label="Next products"
            disabled={!canNext}
            onClick={() => emblaApi?.goToNext()}
          >
            <SliderArrow direction="next" />
          </button>
        </div>
        <div className="overflow-hidden border-x border-b border-black/15" ref={emblaRef}>
          <div className="flex items-stretch">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.slug}
                className={`flex min-w-0 flex-[0_0_100%] md:flex-[0_0_33.333333%] ${
                  index > 0 ? "md:border-l md:border-black/15" : ""
                }`}
              >
                <TransitionLink
                  href={`/products/${product.slug}`}
                  className="not-typeset flex h-full w-full flex-col px-8 py-8 no-underline hover:no-underline md:py-10"
                  data-not-typeset
                >
                  <div className="aspect-[16/10] w-full overflow-hidden border border-black/15 bg-black/[0.03]">
                    {product.slug === "control-views" ? (
                      <ControlViewsFigure />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={productArt[product.slug]}
                        alt=""
                        className="size-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="!mb-0 !mt-8 !text-[22px] !font-normal !leading-[1.25] !tracking-normal text-[rgba(0,0,0,0.875)] normal-case md:!text-[24px]">
                    {product.homeTitle.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-12">
                    <p className="!m-0 font-[family-name:var(--font-mono)] text-[14px] leading-5 tracking-[-0.02em] text-black/55 uppercase">
                      {product.homeLabel}
                    </p>
                    <span className="inline-flex size-8 shrink-0 items-center justify-center border border-black/15 text-black/55">
                      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                        <path
                          d="M4 12 12 4M6 4h6v6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        />
                      </svg>
                    </span>
                  </div>
                </TransitionLink>
              </div>
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
