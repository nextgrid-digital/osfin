"use client";

import { useEffect, useRef, useState } from "react";
import ProductionHairline from "./ProductionHairlines";
import SiteContainer from "./SiteContainer";

const FEATURES = [
  {
    id: "reconcile",
    nav: "Match with context",
    title: ["Timing gaps and genuine breaks.", "Separated with context."],
    body: "Connect ledger, payment & settlement records to distinguish timing differences from genuine breaks.",
    figure: "slow" as const,
  },
  {
    id: "resolve",
    nav: "Resolve with ownership",
    title: ["Every exception investigated.", "Owned end to end."],
    body: "Guide AI assisted exception investigation with clear ownership and governed approvals.",
    figure: "loupe" as const,
  },
  {
    id: "close",
    nav: "Close with evidence",
    title: ["Exposures visible before close.", "Nothing left assumed."],
    body: "See unresolved exposures and outstanding dependencies before completing financial close.",
    figure: "riffle" as const,
  },
  {
    id: "control",
    nav: "Control across teams",
    title: ["One integrity standard.", "Shared across the institution."],
    body: "Keep banking, payments, and settlement on the same governed view so ops, finance, and risk work from one picture of what still needs work.",
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
    <section className="py-28 md:py-40">
      <SiteContainer>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="flex w-full max-w-full flex-col gap-4">
            <p
              className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
              data-not-typeset
            >
              Built for production
            </p>
            <h2 className="!mb-0 !mt-0 max-w-full text-left !text-[clamp(1.85rem,7vw,42px)] !leading-[1.15] !font-normal tracking-[-0.02em] text-[rgba(0,0,0,0.875)]">
              <span className="block">Transaction integrity.</span>
              <span className="block">Institution wide control.</span>
            </h2>
          </div>
          <p className="!mb-0 !mt-0 max-w-[26rem] !text-[16px] !leading-[1.45] text-black">
            A consistent view of transaction integrity across banking,
            payments, and settlement, with governed exceptions and clear
            exposures before financial close.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p
              className="not-typeset mb-5 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
              data-not-typeset
            >
              <span className="size-1.5 shrink-0 bg-[#001D20]" aria-hidden />
              Capabilities
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
                  <p className="!mb-0 !mt-0 max-w-md text-[15px] leading-[1.5] text-black/65 md:text-[16px]">
                    {feature.body}
                  </p>
                </div>
                <div
                  className={`relative flex min-h-[16rem] md:min-h-0 ${
                    feature.id === "control" ? "bg-[#EDEDED]" : "bg-white p-4 md:p-5"
                  }`}
                >
                  <div className="relative h-full min-h-0 w-full flex-1 overflow-hidden">
                    <ProductionHairline figure={feature.figure} />
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
