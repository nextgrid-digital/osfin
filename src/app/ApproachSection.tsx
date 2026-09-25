"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ApproachProgressionDiagram from "./ApproachProgressionDiagram";
import SiteContainer from "./SiteContainer";

const STEPS = [
  {
    title: "Context mapping",
    lines: ["We map records, policies, exceptions, and decisions", "across your payment operation."],
  },
  {
    title: "Workflow design",
    lines: ["We define the handoffs and controls", "that make each decision explainable."],
  },
  {
    title: "Production deployment",
    lines: ["Forward-deployed engineers ship the system", "alongside your operating team."],
  },
  {
    title: "Continuous learning",
    lines: ["Every reviewed outcome becomes", "reusable operational knowledge."],
  },
] as const;

const TAB_MS = 5000;
const ACCENT = "#1d6fe8";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function ApproachSection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);

  const select = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(0);
      return;
    }

    startRef.current = performance.now();
    setProgress(0);

    const tick = (now: number) => {
      const p = Math.min(1, (now - startRef.current) / TAB_MS);
      setProgress(p);
      if (p >= 1) {
        setActive((prev) => (prev + 1) % STEPS.length);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, reducedMotion]);

  return (
    <section className="approach-section relative flex min-h-svh items-center overflow-hidden bg-[#E4E4E4] py-28 text-[rgba(0,0,0,0.875)] md:py-40">
      <SiteContainer className="grid grid-cols-1 items-stretch gap-20 lg:h-[min(40rem,72vh)] lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-20">
        <div className="flex min-w-0 flex-col lg:h-full">
          <h2 className="max-w-[16em]">
            From payment records to human-governed autonomy.
          </h2>

          <div
            className="not-typeset mt-20 lg:mt-auto"
            role="tablist"
            aria-label="Approach steps"
            data-not-typeset
          >
            {STEPS.map((step, i) => {
              const isCurrent = i === active;
              const expanded = reducedMotion || isCurrent;
              const bright = reducedMotion || isCurrent;
              const num = String(i + 1).padStart(2, "0");

              return (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => select(i)}
                  className="block w-full border-0 border-t border-solid border-black/15 bg-transparent py-4 text-left shadow-none outline-none last:border-b focus-visible:ring-2 focus-visible:ring-black/30"
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className="shrink-0 text-[13px] tabular-nums tracking-[-0.02em]"
                      style={{
                        fontFamily: "var(--font-mono), ui-monospace, monospace",
                        color: bright ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {num}
                    </span>
                    <span
                      className="text-[15px] font-medium sm:text-[16px]"
                      style={{ color: bright ? "rgba(0,0,0,0.875)" : "rgba(0,0,0,0.4)" }}
                    >
                      {step.title}
                    </span>
                  </span>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                    style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                  >
                    <div className="min-h-0 overflow-hidden" aria-hidden={!expanded}>
                      <p className="mt-3 max-w-[36rem] text-[14px] leading-6 text-black/65">
                        <span className="block">{step.lines[0]}</span>
                        <span className="block">{step.lines[1]}</span>
                      </p>
                      {!reducedMotion ? (
                        <div
                          className="mt-4 w-full max-w-md overflow-hidden rounded-none"
                          style={{ height: 2, backgroundColor: "rgba(0,0,0,0.12)" }}
                        >
                          <div
                            className="h-full rounded-none"
                            style={{
                              width: `${isCurrent ? progress * 100 : 0}%`,
                              backgroundColor: ACCENT,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="not-typeset flex min-h-0 min-w-0 lg:h-full lg:pl-2" data-not-typeset>
          <ApproachProgressionDiagram
            activeStep={active}
            onStepChange={select}
            reducedMotion={reducedMotion}
          />
        </div>
      </SiteContainer>
    </section>
  );
}
