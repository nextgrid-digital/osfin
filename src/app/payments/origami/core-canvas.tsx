"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { CoreScene } from "./core-scene";

export default function CoreCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      setReducedMotion(media.matches);
    };
    syncMotion();
    media.addEventListener("change", syncMotion);

    const host = hostRef.current;
    if (!host) {
      return () => {
        media.removeEventListener("change", syncMotion);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(host);

    return () => {
      media.removeEventListener("change", syncMotion);
      observer.disconnect();
    };
  }, []);

  const playing = visible && !reducedMotion;

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 z-10 h-full min-h-[16rem] w-full"
      aria-hidden
      data-origami-core
      data-core-playing={playing ? "true" : "false"}
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 32 }}
        dpr={[1, 2]}
        frameloop={!visible ? "never" : reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: "transparent", height: "100%", width: "100%" }}
      >
        <Suspense fallback={null}>
          <CoreScene playing={playing} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
