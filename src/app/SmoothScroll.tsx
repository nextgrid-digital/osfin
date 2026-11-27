"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { syncPageWash } from "./pageWash";

gsap.registerPlugin(ScrollTrigger);

function ScrollSync() {
  useLenis(() => {
    syncPageWash();
    ScrollTrigger.update();
  });

  useEffect(() => {
    syncPageWash();
    window.addEventListener("resize", syncPageWash);
    return () => window.removeEventListener("resize", syncPageWash);
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        // Offset for the fixed site header so in-page section links land cleanly.
        anchors: { offset: -80 },
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
