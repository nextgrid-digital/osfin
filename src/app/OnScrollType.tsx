"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

type OnScrollTypeProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export default function OnScrollType({
  as = "h2",
  className = "",
  children,
}: OnScrollTypeProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let killed = false;
    let tween: gsap.core.Tween | undefined;

    void (async () => {
      const { default: Splitting } = await import("splitting");
      if (killed || !ref.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.registerPlugin(ScrollTrigger);

      Splitting({ target: el, by: "chars" });
      const chars = el.querySelectorAll<HTMLElement>(".char");
      if (!chars.length) return;

      if (reduce) {
        gsap.set(chars, {
          opacity: 1,
          yPercent: 0,
          scaleX: 1,
          scaleY: 1,
          clearProps: "transform",
        });
        return;
      }

      tween = gsap.fromTo(
        chars,
        {
          willChange: "opacity, transform",
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: "50% 0%",
        },
        {
          duration: 1,
          ease: "back.inOut(2)",
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            start: "center bottom+=50%",
            end: "bottom top+=40%",
            scrub: true,
          },
        },
      );
    })();

    return () => {
      killed = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `on-scroll-type ${className}`.trim(),
      "data-splitting": true,
    },
    children,
  );
}
