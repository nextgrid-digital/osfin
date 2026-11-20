"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import SiteContainer from "./SiteContainer";
import HomeVisionField from "./HomeVisionField";

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
  const paintRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = wordsRef.current;
    if (!root) return;

    const words = [...root.querySelectorAll<HTMLElement>("[data-word]")];
    const total = Math.max(1, words.length);
    const alphas = new Array<number>(words.length).fill(-1);

    paintRef.current = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const view = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (view - rect.top) / (rect.height + view)));
      words.forEach((word, index) => {
        const start = (index / total) * 0.55 + 0.12;
        const local = Math.min(1, Math.max(0, (progress - start) / 0.12));
        const alpha = unread + (read - unread) * local;
        if (Math.abs(alpha - alphas[index]!) < 0.008) return;
        alphas[index] = alpha;
        word.style.color = `rgba(0, 0, 0, ${alpha.toFixed(3)})`;
      });
    };

    paintRef.current();
    const onResize = () => paintRef.current();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLenis(() => {
    paintRef.current();
  });

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div className="h-[170svh]">
        <div
          data-vision-seam-sticky
          className="sticky top-0 flex h-[100svh] items-center overflow-hidden bg-background"
        >
          <HomeVisionField />
          <SiteContainer className="relative z-10 w-full">
            <div
              ref={wordsRef}
              data-vision-seam-copy
              data-not-typeset
              className="not-typeset mx-auto w-full max-w-[20em] text-left font-[family-name:var(--font-crimson)] text-[clamp(1.5rem,3.2vw,48px)] leading-[1.2] font-light tracking-[-2px] text-black/15"
            >
              <p ref={leadRef} data-field-wash className="!m-0">
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
