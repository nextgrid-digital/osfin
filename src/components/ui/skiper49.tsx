"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
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

  const frames =
    slides ??
    images?.map((image) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={image.src} className="h-full w-full object-cover" src={image.src} alt={image.alt} />
    )) ??
    [];

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
          initialSlide={initialIndex}
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
          loop={loop}
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
          onSlideChangeTransitionEnd={(swiper) => {
            if (!userMove.current) return;
            userMove.current = false;
            onSettleRef.current?.(swiper.realIndex);
          }}
        >
          {frames.map((frame, index) => (
            <SwiperSlide key={index}>{frame}</SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-black/70" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-black/70" />
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
