"use client";

import { useEffect, useRef } from "react";

/** Homepage hero rail: the supplied workflow video, paused when motion is reduced. */
export default function HeroRailVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (media.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }
      void video.play();
    };

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="/assets/hero-rail.mp4" type="video/mp4" />
    </video>
  );
}
