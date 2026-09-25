"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "../content/products";
import ProductIcon from "./ProductIcon";
import SectionHeading from "./SectionHeading";
import SiteContainer from "./SiteContainer";
import TransitionLink from "./TransitionLink";

export default function ProductsScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollDistance = () => Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);

    const tween = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance() + window.innerHeight * 0.35}`,
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="flex min-h-svh flex-col justify-center bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]"
    >
      <div className="flex flex-col justify-center py-28 md:py-40">
        <SiteContainer>
          <SectionHeading
            title="A connected operating system for reconciliation, disputes, compliance, risk, and financial close."
            cta={{ href: "#product", label: "Explore" }}
          />
        </SiteContainer>

        <div className="mt-16 overflow-hidden md:mt-20">
          <div
            ref={trackRef}
            className="flex w-max gap-6 px-5 will-change-transform sm:px-8 lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))]"
          >
            {PRODUCTS.map((product) => (
              <TransitionLink
                key={product.slug}
                href={`/products/${product.slug}`}
                className="flex min-w-[480px] w-[480px] shrink-0 flex-col rounded-none sm:min-w-[520px] sm:w-[520px]"
                style={{ backgroundColor: product.cardBg }}
              >
                <div className="flex shrink-0 flex-col p-6 text-[rgba(0,0,0,0.875)] sm:p-8">
                  <h6 className="text-black/40">{product.cardLabel}</h6>
                  <h3 className="mt-6 text-black">{product.name}</h3>
                  <p className="mt-4 max-w-[36ch] text-black/65">{product.cardBody}</p>
                </div>
                <div className="mx-6 mb-6 mt-0 flex aspect-[4/3] items-center justify-center rounded-none bg-white/50 sm:mx-8 sm:mb-8">
                  <ProductIcon kind={product.icon} className="h-[45%] w-[45%]" />
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
