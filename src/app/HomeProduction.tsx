"use client";

import { useEffect, useRef, useState } from "react";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import ProductionHairline from "./ProductionHairlines";
import SiteContainer from "./SiteContainer";

const FEATURES = [
  {
    id: "map",
    nav: "Map",
    title: ["See today’s work", "end to end."],
    body: "Our forward-deployed team and agents map your data, workflows, and internal policies. Together, we uncover opportunities to automate work, improve customer and employee experience, and reduce risk, giving leaders the evidence they need to drive change and free up resources.",
    figure: "branches" as const,
  },
  {
    id: "reimagine",
    nav: "Re-Imagine",
    title: ["Redesign how", "work gets done."],
    body: "We’re in the earliest innings of a fundamental shift in how work gets done. Osfin works alongside your teams to rethink how they operate, bringing lessons from across the industry and co-creating new ways of working.",
    figure: "loupe" as const,
  },
  {
    id: "transform",
    nav: "Transform",
    title: ["Deploy agents", "against your goals."],
    body: "Osfin deploys goal-oriented agents, purpose-built for finance, accounting, and payments operations, that get the job done. They stand up quickly, run your operational processes end to end, and bring your team in only when judgment is needed.",
    figure: "cabinet" as const,
  },
  {
    id: "learn",
    nav: "Learn",
    title: ["Agents that get", "better every day."],
    body: "Osfin’s agents learn from how your team resolves exceptions, edge cases, and escalations. Every decision makes them sharper, so they become a trusted coworker that knows how your team works.",
    figure: "phosphor" as const,
  },
  {
    id: "control",
    nav: "Control",
    title: ["You stay in", "the driver’s seat."],
    body: "Built for financial services, Osfin’s platform keeps agents within your internal policies, routes decisions to people where oversight is required, and records a full audit trail of every action they take.",
    figure: "vault" as const,
  },
] as const;

type FeatureId = (typeof FEATURES)[number]["id"];

function isFeatureId(value: string | null): value is FeatureId {
  return FEATURES.some((feature) => feature.id === value);
}

export default function HomeProduction() {
  const [active, setActive] = useState<FeatureId>(FEATURES[0].id);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const nodes = FEATURES.map((f) => itemRefs.current[f.id]).filter(
      (n): n is HTMLElement => Boolean(n),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.getAttribute("data-feature-id") ?? null;
        if (isFeatureId(top)) setActive(top);
      },
      { rootMargin: "-30% 0px -40% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-28 md:py-40">
      <SiteContainer>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex w-full max-w-[36rem] flex-col gap-4">
            <p
              className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
              data-not-typeset
            >
              Process
            </p>
            <h2 className="!mb-0 !mt-0 max-w-[18em] text-left !text-[clamp(1.85rem,7vw,42px)] !leading-[1.15] !font-normal tracking-[-0.02em] text-[rgba(0,0,0,0.875)]">
              We enable radical transformation in operations.
            </h2>
          </div>
          <p className="!mb-0 !mt-0 max-w-[26rem] !text-[16px] !leading-[1.45] text-black">
            A granular view of transaction lifecycle across banking, payments, and settlement before close.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p
              className="not-typeset mb-5 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
              data-not-typeset
            >
              <span className="size-1.5 shrink-0 bg-[#001D20]" aria-hidden />
              Process
            </p>
            <nav aria-label="Capabilities" className="flex flex-col gap-3">
              {FEATURES.map((feature) => {
                const isActive = active === feature.id;
                return (
                  <a
                    key={feature.id}
                    href={`#feature-${feature.id}`}
                    className={`not-typeset block text-[15px] leading-snug no-underline transition-colors ${
                      isActive
                        ? "text-[rgba(0,0,0,0.875)]"
                        : "text-black/35 hover:text-black/55"
                    }`}
                    data-not-typeset
                    onClick={() => setActive(feature.id)}
                  >
                    {feature.nav}
                  </a>
                );
              })}
            </nav>
          </aside>

          <div className="flex flex-col gap-5 md:gap-6">
            {FEATURES.map((feature) => (
              <article
                key={feature.id}
                id={`feature-${feature.id}`}
                data-feature-id={feature.id}
                ref={(el) => {
                  itemRefs.current[feature.id] = el;
                }}
                className="grid min-h-[28rem] min-w-0 grid-cols-1 overflow-hidden bg-[#EDEDED] md:min-h-[36rem] md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:min-h-[min(38rem,72svh)]"
              >
                <div className="flex flex-col justify-between gap-10 px-7 py-8 md:px-9 md:py-10">
                  <h3 className="!mb-0 !mt-0 !text-[26px] !font-normal !leading-[1.2] !tracking-[-0.02em] text-[rgba(0,0,0,0.875)] normal-case md:!text-[32px]">
                    <span className="block">{feature.title[0]}</span>
                    <span className="block">{feature.title[1]}</span>
                  </h3>
                  <p className="!mb-0 !mt-0 max-w-[34rem] text-[15px] leading-[1.5] text-black/65 md:text-[16px]">
                    {feature.body}
                  </p>
                </div>
                <div className="relative flex min-h-[16rem] overflow-hidden bg-[#E4E4E4] p-2 md:min-h-0 md:p-3">
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <GlyphMatrix
                      glyphs="01.+*/<>="
                      cellSize={14}
                      mutationRate={0.04}
                      interval={90}
                      fadeBottom={0}
                      color="rgba(0, 0, 0, 0.16)"
                      className="h-full w-full"
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[1]"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 62% at 50% 50%, rgba(228,228,228,0.97) 0%, rgba(228,228,228,0.78) 42%, rgba(228,228,228,0.28) 68%, transparent 86%)",
                    }}
                  />
                  <div className="relative z-10 h-full min-h-0 w-full flex-1 overflow-hidden">
                    <ProductionHairline
                      figure={feature.figure}
                      label={`${feature.title[0]} ${feature.title[1]}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
