"use client";

import { useEffect } from "react";

/** Marks the page dark while the fixed header overlaps the target section. */
export default function DarkWhenInView({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const section = document.getElementById(targetId);
    if (!section) return;

    let frame = 0;
    let over = root.classList.contains("over-dark");

    const sync = () => {
      frame = 0;
      const header = document.querySelector<HTMLElement>(".site-header");
      const line = header ? header.getBoundingClientRect().bottom : 0;
      const rect = section.getBoundingClientRect();
      const entering = rect.top <= line && rect.bottom >= line;
      const leaving = rect.top > line + 12 || rect.bottom < line - 12;
      const next = over ? !leaving : entering;
      if (next === over) return;
      over = next;
      root.classList.toggle("over-dark", over);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("over-dark");
    };
  }, [targetId]);

  return null;
}
