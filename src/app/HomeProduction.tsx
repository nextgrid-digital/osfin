"use client";

import { useEffect, useRef, useState } from "react";
import { AgentsGetBetter } from "@/components/hairline/AgentsGetBetter";
import { DeployAgents } from "@/components/hairline/DeployAgents";
import { DriverSeat } from "@/components/hairline/DriverSeat";
import { RedesignHowWorkGetsDone } from "@/components/hairline/RedesignHowWorkGetsDone";
import { SeeWorkEndToEnd } from "@/components/hairline/SeeWorkEndToEnd";
import SiteContainer from "./SiteContainer";

/** Plate matches the card; strokes stay in the site ink so hover still reads. */
const seeWorkWash = {
  "--hairline-plate": "#F7F1E3",
  "--hairline-hi": "#5D524B",
  "--hairline-edge": "#8F8378",
  "--hairline-mid": "#B7AB9F",
  "--hairline-lo": "#DDD3C6",
} as const;

const FEATURES = [
  {
    id: "map",
    nav: "Map",
    title: ["See today’s work", "end to end."],
    body: "Our forward-deployed team and agents map your data, workflows, and internal policies. Together, we uncover opportunities to automate work, improve customer and employee experience, and reduce risk, giving leaders the evidence they need to drive change and free up resources.",
    copy: "max-w-[34.5rem]",
    figure: "branches" as const,
  },
  {
    id: "reimagine",
    nav: "Reimagine",
    title: ["Redesign how", "work gets done."],
    body: "We’re in the earliest innings of a fundamental shift in how work gets done. Osfin works alongside your teams to rethink how they operate, bringing lessons from across the industry and co-creating new ways of working.",
    copy: "max-w-[30rem]",
    figure: "loupe" as const,
  },
  {
    id: "transform",
    nav: "Transform",
    title: ["Deploy agents", "against your goals."],
    body: "Osfin deploys goal-oriented agents, purpose-built for finance, accounting, and payments operations, that get the job done. They stand up quickly, run your operational processes end to end, and bring your team in only when judgment is needed.",
    copy: "max-w-[32rem]",
    figure: "cabinet" as const,
  },
  {
    id: "learn",
    nav: "Learn",
    title: ["Agents that get", "better every day."],
    body: "Osfin’s agents learn from how your team resolves exceptions, edge cases, and escalations. Every decision makes them sharper, so they become a trusted coworker that knows how your team works.",
    copy: "max-w-[27.5rem]",
    figure: "phosphor" as const,
  },
  {
    id: "control",
    nav: "Control",
    title: ["You stay in", "the driver’s seat."],
    body: "Built for financial services, Osfin’s platform keeps agents within your internal policies, routes decisions to people where oversight is required, and records a full audit trail of every action they take.",
    copy: "max-w-[27rem]",
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

  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const boxes = new Map<string, { x0: number; y0: number; x1: number; y1: number }>();

    const apply = (id: string, box: { x0: number; y0: number; x1: number; y1: number }) => {
      const article = itemRefs.current[id];
      const svg = article?.querySelector("svg");
      const wrap = svg?.parentElement;
      if (!svg || !wrap) return;
      const pad = 0.12;
      const bw = box.x1 - box.x0;
      const bh = box.y1 - box.y0;
      const x = box.x0 - bw * pad;
      const y = box.y0 - bh * pad;
      const w = bw * (1 + pad * 2);
      const h = bh * (1 + pad * 2);
      svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
      svg.setAttribute("preserveAspectRatio", "xMidYMax meet");
      wrap.style.aspectRatio = "auto";
      wrap.style.width = "100%";
      wrap.style.height = "100%";
      svg.style.width = "100%";
      svg.style.height = "100%";
    };

    const step = () => {
      for (const feature of FEATURES) {
        if (feature.id === "control") continue;
        const svg = itemRefs.current[feature.id]?.querySelector("svg");
        if (!svg) continue;
        const b = svg.getBBox();
        if (b.width < 1 || b.height < 1) continue;
        const next = { x0: b.x, y0: b.y, x1: b.x + b.width, y1: b.y + b.height };
        const prev = boxes.get(feature.id);
        const box = prev
          ? {
              x0: Math.min(prev.x0, next.x0),
              y0: Math.min(prev.y0, next.y0),
              x1: Math.max(prev.x1, next.x1),
              y1: Math.max(prev.y1, next.y1),
            }
          : next;
        const grew =
          !prev ||
          box.x0 < prev.x0 - 0.5 ||
          box.y0 < prev.y0 - 0.5 ||
          box.x1 > prev.x1 + 0.5 ||
          box.y1 > prev.y1 + 0.5;
        boxes.set(feature.id, box);
        if (grew) apply(feature.id, box);
      }
      if (performance.now() - started < 2500) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="process" className="py-28 md:py-40">
      <SiteContainer>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex w-full max-w-[36rem] flex-col gap-4">
            <h2 className="!mb-0 !mt-0 max-w-[18em] text-left !font-normal tracking-[-0.022em] text-[#5D524B]">
              We enable radical transformation in operations.
            </h2>
          </div>
          <p className="!mb-0 !mt-0 max-w-[26rem] !text-[16px] !leading-[1.45] text-[#5D524B]">
            A granular view of transaction lifecycle across banking, payments, and settlement before close.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
          <aside className="lg:sticky lg:top-24 lg:w-40 lg:self-start">
            <p
              className="not-typeset mb-5 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-[#5D524B]/45 uppercase"
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
                        ? "text-[#5D524B]"
                        : "text-[#5D524B]/35 hover:text-[#5D524B]/55"
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
                className="grid h-[46rem] min-w-0 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-[#F7F1E3] md:h-[min(38rem,72svh)] md:grid-cols-[minmax(0,39rem)_minmax(20rem,1fr)] md:grid-rows-1"
              >
                <div className="flex flex-col justify-between gap-10 px-7 py-8 md:px-9 md:py-10">
                  <h3 className="!mb-0 !mt-0 !text-[28px] !font-normal !leading-[1.15] !tracking-[-0.02em] text-[#5D524B] normal-case md:!text-[32px]">
                    <span className="block">{feature.title[0]}</span>
                    <span className="block">{feature.title[1]}</span>
                  </h3>
                  <p className={`!mb-0 !mt-0 text-[15px] leading-[1.5] text-[#5D524B] md:text-[16px] ${feature.copy}`}>
                    {feature.body}
                  </p>
                </div>
                <div className="relative min-h-0 overflow-hidden bg-[#F7F1E3]">
                  {feature.id === "map" ? (
                    <div className="absolute inset-x-3 top-3 bottom-0 flex items-end justify-center md:inset-x-5 md:top-5" style={seeWorkWash}>
                      <SeeWorkEndToEnd intensity={0.6} className="h-[88%] w-[88%]" />
                    </div>
                  ) : feature.id === "reimagine" ? (
                    <div className="absolute inset-x-3 top-3 bottom-0 md:inset-x-5 md:top-5" style={seeWorkWash}>
                      <RedesignHowWorkGetsDone intensity={0.6} className="h-full w-full" />
                    </div>
                  ) : feature.id === "transform" ? (
                    <div className="absolute inset-x-3 top-3 bottom-0 md:inset-x-5 md:top-5" style={seeWorkWash}>
                      <DeployAgents intensity={0.6} className="h-full w-full" />
                    </div>
                  ) : feature.id === "learn" ? (
                    <div className="absolute inset-x-3 top-3 bottom-0 md:inset-x-5 md:top-5" style={seeWorkWash}>
                      <AgentsGetBetter intensity={0.6} className="h-full w-full" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center md:items-start md:justify-start md:pl-2 md:pt-6" style={seeWorkWash}>
                      <DriverSeat intensity={0.6} className="w-full max-w-[520px] shrink-0 md:w-[118%] md:max-w-none" />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
