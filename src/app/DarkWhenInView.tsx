"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

/** Dark nav once the process intro hits mid-viewport; stays until the section leaves. */
export default function DarkWhenInView({ targetId }: { targetId: string }) {
  const syncRef = useRef<() => void>(() => {});

  useLenis(() => {
    syncRef.current();
  });

  useEffect(() => {
    const root = document.documentElement;
    const section = document.getElementById(targetId);
    if (!section) return;

    const trigger =
      section.querySelector<HTMLElement>("[data-process-dark-trigger]") ?? section;

    let over = root.classList.contains("over-dark");

    const apply = () => {
      const mid = window.innerHeight * 0.5;
      const rect = section.getBoundingClientRect();
      const triggerTop = trigger.getBoundingClientRect().top;
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;

      // Enter early (intro at mid). Leave only once the black section is gone.
      const next = over
        ? inView
        : triggerTop <= mid && rect.bottom > mid;

      if (next === over) return;
      over = next;
      root.classList.toggle("over-dark", over);
    };

    syncRef.current = apply;
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      syncRef.current = () => {};
      root.classList.remove("over-dark");
    };
  }, [targetId]);

  return null;
}
