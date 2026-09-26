"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper49 = () => {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#E4E4E4]">
      <Carousel_003 className="" slides={[]} showPagination loop />
    </div>
  );
};

export { Skiper49 };

function CircleArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 44 44" className="h-5 w-5" aria-hidden>
      <path
        d={direction === "right" ? "M8 22h28M24 10l12 12-12 12" : "M36 22H8M20 10L8 22l12 12"}
        fill="none"
        stroke="#141414"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Carousel_003 = ({
  images,
  slides,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
  initialIndex = 0,
  onSettle,
  label = "Cover carousel",
}: {
  images?: { src: string; alt: string }[];
  slides?: React.ReactNode[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
  initialIndex?: number;
  onSettle?: (index: number) => void;
  label?: string;
}) => {
  const userMove = React.useRef(false);
  const onSettleRef = React.useRef(onSettle);
  onSettleRef.current = onSettle;

  const css = `
  .Carousal_003 {
    width: 100%;
    height: clamp(260px, 32vw, 460px);
    padding-bottom: 0 !important;
  }

  .Carousal_003 .swiper-slide {
    box-sizing: border-box;
    background-color: #E4E4E4;
    background-position: center;
    background-size: cover;
    width: clamp(220px, 28vw, 420px);
    height: clamp(220px, 28vw, 420px);
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    background-color: #000 !important;
  }
`;

  const swiperRef = React.useRef<SwiperInstance | null>(null);
  const frames =
    slides ??
    images?.map((image) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={image.src} className="h-full w-full object-cover" src={image.src} alt={image.alt} />
    )) ??
    [];
  const sourceCount = frames.length;
  // Swiper's own loop breaks with slidesPerView: "auto" and throws once the
  // page swaps underneath an in-flight slide. Repeat the set instead so both
  // sides of the centered card stay filled, and keep Swiper's loop off.
  const loopCopies = loop && sourceCount > 1 ? Math.max(3, Math.ceil(12 / sourceCount)) : 1;
  const loopedFrames = Array.from({ length: loopCopies }, () => frames).flat();
  const copyOrigin = loopCopies > 1 ? sourceCount * Math.floor((loopCopies - 1) / 2) : 0;
  const startIndex = copyOrigin + initialIndex;

  React.useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed || sourceCount === 0) return;
    const logical = ((swiper.realIndex % sourceCount) + sourceCount) % sourceCount;
    if (logical === initialIndex) return;
    swiper.slideTo(copyOrigin + initialIndex, 0, false);
  }, [copyOrigin, initialIndex, sourceCount]);

  return (
    <motion.div
      initial={{ opacity: 1, translateY: 0 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("relative w-full px-5", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          speed={0}
          initialSlide={startIndex}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={false}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          onTouchStart={() => {
            userMove.current = true;
          }}
          onNavigationNext={() => {
            userMove.current = true;
          }}
          onNavigationPrev={() => {
            userMove.current = true;
          }}
          onSlideChange={(swiper) => {
            if (swiper.destroyed || !swiper.slides) return;
            if (!userMove.current || swiper.touchEventsData?.isTouched) return;
            userMove.current = false;
            const logical = ((swiper.realIndex % sourceCount) + sourceCount) % sourceCount;
            // Let slideTo finish before the page swaps the product. Updating
            // during the call destroys this instance and Swiper then reads a
            // missing slide.
            window.setTimeout(() => {
              const current = swiperRef.current;
              if (current && !current.destroyed && loopCopies > 1) {
                const middle = copyOrigin + logical;
                if (current.activeIndex !== middle) {
                  current.slideTo(middle, 0, false);
                }
              }
              onSettleRef.current?.(logical);
            }, 0);
          }}
        >
          {loopedFrames.map((frame, index) => (
            <SwiperSlide key={index}>{frame}</SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div
                className="swiper-button-next after:hidden !flex !h-11 !w-11 items-center justify-center rounded-full !border-0 !bg-white/40 text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md transition hover:!bg-white/55"
                onPointerDown={() => {
                  userMove.current = true;
                }}
              >
                <CircleArrow direction="right" />
              </div>
              <div
                className="swiper-button-prev after:hidden !flex !h-11 !w-11 items-center justify-center rounded-full !border-0 !bg-white/40 text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md transition hover:!bg-white/55"
                onPointerDown={() => {
                  userMove.current = true;
                }}
              >
                <CircleArrow direction="left" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };
export default Skiper49;
