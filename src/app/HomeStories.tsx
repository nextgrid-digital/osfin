"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { STORIES } from "../content/stories";
import SiteContainer from "./SiteContainer";
import TransitionLink from "./TransitionLink";

/** Matches SiteContainer left edge; track bleeds to the viewport right. */
const GUTTER =
  "pl-[max(1.25rem,calc((100vw-1440px)/2+1.25rem))] sm:pl-[max(2rem,calc((100vw-1440px)/2+2rem))]";

function SliderArrow({ direction }: { direction: "prev" | "next" }) {
  const d = direction === "prev" ? "M13 8H3M7 4 3 8l4 4" : "M3 8h10M9 4l4 4-4 4";
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export default function HomeStories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setCanPrev(emblaApi.canGoToPrev());
      setCanNext(emblaApi.canGoToNext());
      setSelected(emblaApi.selectedSnap());
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
    <section
      className="overflow-x-clip py-28 md:py-40"
      aria-roledescription="carousel"
      aria-label="Customer stories"
    >
      <SiteContainer>
        <div className="flex flex-col gap-6 border-b border-black/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-xl flex-col gap-3">
            <p
              className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
              data-not-typeset
            >
              Customer stories
            </p>
            <h2 className="!mb-0 !mt-0 text-[rgba(0,0,0,0.875)]">
              Grow with teams already in production.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center border border-black/15 text-[rgba(0,0,0,0.875)] disabled:opacity-30"
              aria-label="Previous story"
              disabled={!canPrev}
              onClick={() => emblaApi?.goToPrev()}
            >
              <SliderArrow direction="prev" />
            </button>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center border border-black/15 text-[rgba(0,0,0,0.875)] disabled:opacity-30"
              aria-label="Next story"
              disabled={!canNext}
              onClick={() => emblaApi?.goToNext()}
            >
              <SliderArrow direction="next" />
            </button>
          </div>
        </div>
      </SiteContainer>

      {/* Full-bleed to the right; first card lines up with SiteContainer content. */}
      <div className={`mt-8 overflow-hidden md:mt-10 ${GUTTER}`} ref={emblaRef}>
        <div className="flex items-stretch gap-5 pr-5 md:gap-7 sm:pr-8">
          {STORIES.map((story) => (
            <article
              key={story.slug}
              className="flex min-h-[28rem] min-w-0 flex-[0_0_min(92vw,64rem)] flex-col md:min-h-[32rem] md:flex-[0_0_min(82vw,72rem)]"
              style={{ backgroundColor: story.fill }}
            >
              <div className="grid flex-1 grid-cols-1 md:grid-cols-[minmax(0,1.55fr)_minmax(0,0.9fr)]">
                <div className="flex flex-col px-7 py-10 md:px-12 md:py-14">
                  <h3 className="!mb-0 !mt-0 !text-[28px] !font-normal !leading-[1.2] !tracking-normal text-[rgba(0,0,0,0.875)] normal-case md:!text-[40px]">
                    {story.company}
                  </h3>
                  <p className="!mb-0 !mt-6 max-w-2xl text-[18px] leading-[1.55] text-black/70 md:mt-8 md:text-[20px]">
                    “{story.quote}”
                  </p>
                  <div className="mt-auto pt-12 md:pt-16">
                    <TransitionLink
                      href={story.href}
                      className="not-typeset font-[family-name:var(--font-mono)] text-[13px] tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase underline underline-offset-4"
                      data-not-typeset
                    >
                      Read more
                    </TransitionLink>
                  </div>
                </div>

                {story.meta && story.meta.length > 0 ? (
                  <div className="flex flex-col justify-end border-t border-black/15 px-7 py-10 md:border-t-0 md:border-l md:px-10 md:py-14">
                    <div className="mb-10 flex items-center md:mb-12">
                      <img
                        src={story.logo}
                        alt=""
                        className={
                          story.logoClass ??
                          "h-11 w-auto max-w-[14rem] object-contain object-left md:h-14 md:max-w-[18rem]"
                        }
                      />
                    </div>
                    <ul className="!m-0 !list-none !p-0">
                      {story.meta.map((row) => (
                        <li
                          key={row.label}
                          className="border-b border-black/10 py-3 first:pt-0 last:border-b-0 last:pb-0"
                        >
                          <p
                            className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[11px] tracking-[-0.02em] text-black/45 uppercase"
                            data-not-typeset
                          >
                            {row.label}
                          </p>
                          <p className="!mb-0 !mt-1 text-[15px] leading-5 text-[rgba(0,0,0,0.875)]">
                            {row.value}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      <SiteContainer>
        <div className="mt-6 flex justify-center gap-2" aria-hidden>
          {STORIES.map((story, index) => (
            <button
              key={story.slug}
              type="button"
              className={`h-1.5 rounded-none transition-all ${
                index === selected
                  ? "w-5 bg-[rgba(0,0,0,0.875)]"
                  : "w-1.5 bg-black/20 hover:bg-black/40"
              }`}
              aria-label={`Go to story ${index + 1}`}
              onClick={() => emblaApi?.goTo(index)}
            />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
