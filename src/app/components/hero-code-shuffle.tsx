"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { runTypeShuffle } from "./type-shuffle";

type HeroCodeShuffleProps = {
  children: ReactNode;
};

/** Runs the Codrops type-shuffle once when the homepage hero code first paints. */
export default function HeroCodeShuffle({ children }: HeroCodeShuffleProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = root.querySelector<HTMLElement>("code") ?? root;
    let stop: (() => void) | undefined;
    const frame = window.requestAnimationFrame(() => {
      stop = runTypeShuffle(target);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      stop?.();
    };
  }, []);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
