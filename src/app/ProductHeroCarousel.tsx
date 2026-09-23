"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "../content/products";

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const settleTimer = useRef<number | null>(null);
  const navigatingRef = useRef(false);
  const router = useRouter();
  const currentIndex = Math.max(
    0,
    PRODUCTS.findIndex((p) => p.slug === currentSlug),
  );

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const slide = scroller.children[index] as HTMLElement | undefined;
    if (!slide) return;
    scroller.scrollTo({ left: slide.offsetLeft, behavior });
  }, []);

  useEffect(() => {
    navigatingRef.current = false;
    scrollToIndex(currentIndex, "auto");
  }, [currentIndex, scrollToIndex]);

  const goToProduct = useCallback(
    (index: number) => {
      const product = PRODUCTS[index];
      if (!product || product.slug === currentSlug || navigatingRef.current) return;
      navigatingRef.current = true;
      router.push(`/products/${product.slug}`);
    },
    [currentSlug, router],
  );

  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const width = scroller.clientWidth;
      if (!width) return;
      const index = Math.round(scroller.scrollLeft / width);
      goToProduct(Math.min(Math.max(index, 0), PRODUCTS.length - 1));
    }, 120);
  };

  const step = (delta: number) => {
    const next = Math.min(Math.max(currentIndex + delta, 0), PRODUCTS.length - 1);
    if (next === currentIndex) return;
    scrollToIndex(next);
    goToProduct(next);
  };

  return (
    <div className="not-typeset relative mt-14 md:mt-16" data-not-typeset>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex aspect-[16/9] w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-md md:aspect-[2.2/1] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Product gallery"
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.slug}
            className="flex h-full w-full shrink-0 snap-center snap-always items-center justify-center bg-[#f7f2e8]"
            aria-label={product.name}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous product"
        disabled={currentIndex === 0}
        onClick={() => step(-1)}
        className="absolute top-1/2 left-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[rgba(0,0,0,0.875)] transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:left-4"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next product"
        disabled={currentIndex === PRODUCTS.length - 1}
        onClick={() => step(1)}
        className="absolute top-1/2 right-3 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[rgba(0,0,0,0.875)] transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 md:right-4"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
