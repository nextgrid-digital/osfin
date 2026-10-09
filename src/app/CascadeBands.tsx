"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BAND_COUNT = 12;
const MAX_HEIGHT = 18;
const STACK_HEIGHT = MAX_HEIGHT * BAND_COUNT;

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ];
}

function mixHex(from: string, to: string, t: number): string {
  const a = parseHex(from);
  const b = parseHex(to);
  const u = Math.min(1, Math.max(0, t));
  const rgb = a.map((c, i) => Math.round(c + (b[i]! - c) * u));
  return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
}

type CascadeBandsProps = {
  /** Section body color (top of blend). */
  from: string;
  /** Next section / footer body color (bottom of blend). */
  to: string;
};

/**
 * AngelList-style cascade: expands on enter, contracts on exit.
 * One hard-stop gradient (no per-band seams) scaled as a unit.
 */
export default function CascadeBands({ from, to }: CascadeBandsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const gradient = useMemo(() => {
    const stops = Array.from({ length: BAND_COUNT }, (_, i) => {
      const color = mixHex(from, to, BAND_COUNT === 1 ? 0 : i / (BAND_COUNT - 1));
      const start = (i / BAND_COUNT) * 100;
      const end = ((i + 1) / BAND_COUNT) * 100;
      return `${color} ${start}% ${end}%`;
    });
    return `linear-gradient(to bottom, ${stops.join(", ")})`;
  }, [from, to]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stack = stackRef.current;
    if (!root || !stack) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(stack, {
      scaleY: reduce ? 0.35 : 0,
      transformOrigin: "50% 0%",
    });

    if (reduce) return;

    const state = { t: 0 };
    const tween = gsap.to(state, {
      t: 1,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        gsap.set(stack, { scaleY: Math.sin(state.t * Math.PI) });
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [from, to]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none overflow-hidden"
      style={{ backgroundColor: to, height: STACK_HEIGHT }}
      aria-hidden="true"
    >
      <div
        ref={stackRef}
        className="w-full will-change-transform"
        style={{
          height: STACK_HEIGHT,
          backgroundImage: gradient,
        }}
      />
    </div>
  );
}
