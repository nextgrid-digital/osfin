"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "motion/react";
import SiteContainer from "./SiteContainer";

const LEAD =
  "We envision a world where every team runs a fleet of AI agents to handle operational work, freeing people to do what humans do best:";
const CLOSE = "exercise judgment, show empathy, and create.";
const FOLLOW =
  "The result is better outcomes, more room to innovate, and far less time and money spent on the mundane.";

function Words({ text }: { text: string }) {
  return text.split(/(\s+)/).map((part, partIndex) =>
    part.trim() ? (
      <span key={`${part}-${partIndex}`} data-word>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

const unread = 0.14;
const read = 0.9;

export default function HomeVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const root = wordsRef.current;
    if (!root) return;

    const words = [...root.querySelectorAll<HTMLElement>("[data-word]")];
    const total = Math.max(1, words.length);

    const syncField = () => {
      const box = leadRef.current?.getBoundingClientRect();
      const root = document.documentElement;
      if (!box) {
        root.style.setProperty("--field-mix", "0%");
        return;
      }
      const view = window.innerHeight;
      const travel = view * 0.45;
      const enter = Math.min(1, Math.max(0, (view - box.top) / travel));
      const leave = Math.min(1, Math.max(0, box.bottom / travel));
      const mix = Math.min(enter, leave);
      root.style.setProperty("--field-mix", `${(mix * 100).toFixed(1)}%`);
    };

    const paint = (progress: number) => {
      syncField();
      words.forEach((word, index) => {
        const start = (index / total) * 0.55 + 0.12;
        const span = 0.12;
        const local = Math.min(1, Math.max(0, (progress - start) / span));
        const alpha = unread + (read - unread) * local;
        word.style.color = `rgba(93, 82, 75, ${alpha})`;
      });
    };

    paint(scrollYProgress.get());
    const stop = scrollYProgress.on("change", paint);
    window.addEventListener("scroll", syncField, { passive: true });
    window.addEventListener("resize", syncField);
    return () => {
      stop();
      window.removeEventListener("scroll", syncField);
      window.removeEventListener("resize", syncField);
      document.documentElement.style.setProperty("--field-mix", "0%");
    };
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="h-[170svh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden bg-background">
          <SiteContainer className="relative z-10 w-full">
            <div
              ref={wordsRef}
              data-not-typeset
              className="not-typeset mx-auto w-full max-w-[20em] text-left font-[family-name:var(--font-season)] text-[clamp(1.375rem,2.6vw,40px)] leading-[1.18] font-normal tracking-[-0.03em] text-[#5D524B]/15"
            >
              <p ref={leadRef} className="!m-0">
                <Words text={LEAD} />
                <br />
                <Words text={CLOSE} />
              </p>
              <p className="!mb-0 !mt-[0.9em]">
                <Words text={FOLLOW} />
              </p>
            </div>
          </SiteContainer>
        </div>
      </div>
    </section>
  );
}
