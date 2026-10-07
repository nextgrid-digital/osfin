"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scrubs the platform heading and flanking glyph fields as the section enters. */
export default function HomePlatformMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stage = section.querySelector<HTMLElement>("[data-platform-stage]") ?? section;
    const heading = section.querySelector("h3");
    const text = section.querySelectorAll<HTMLElement>("[data-platform-line]");
    const sheets = stage.querySelectorAll("svg");

    if (reduce || text.length === 0) {
      gsap.set(text, { opacity: 1, y: 0, clearProps: "opacity,transform" });
      sheets.forEach((sheet) => {
        gsap.set(sheet.querySelectorAll("[data-glyph-cell]"), { opacity: 1 });
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const glyphFields = Array.from(sheets).map((sheet) => ({
      svg: sheet,
      cells: Array.from(sheet.querySelectorAll<SVGElement>("[data-glyph-cell]")),
    }));

    gsap.set(
      glyphFields.flatMap((field) => field.cells),
      { opacity: 0 },
    );

    const textTween = gsap.fromTo(
      text,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: heading ?? stage,
          start: "top 85%",
          end: "top 30%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );

    const sheetTweens = glyphFields.flatMap((field) => {
      if (field.cells.length === 0 || !field.svg) return [];
      return [
        gsap.fromTo(
          field.cells,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: { amount: 0.4 },
            ease: "none",
            scrollTrigger: {
              trigger: field.svg,
              start: "top 95%",
              end: "top 20%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        ),
      ];
    });

    ScrollTrigger.refresh();

    let alive = true;
    void document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      textTween.scrollTrigger?.kill();
      textTween.kill();
      sheetTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      gsap.set(text, { clearProps: "opacity,transform" });
      gsap.set(
        glyphFields.flatMap((field) => field.cells),
        { clearProps: "opacity" },
      );
    };
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40">
      {children}
    </section>
  );
}
