"use client";

import { useState } from "react";
import SiteContainer from "./SiteContainer";

type Stat = {
  label: string;
  value: string;
};

type Testimonial = {
  name: string;
  designation: string;
  company: string;
  quote: string;
  image: string;
  stats: readonly Stat[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Salmon",
    designation: "Chief Financial Officer",
    company: "Hale",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/case-studies/salmon.jpg",
    stats: [
      { label: "Days to close", value: "4.2" },
      { label: "Hand journals", value: "17" },
      { label: "Sign-off gap", value: "$8.4k" },
    ],
  },
  {
    name: "Baku",
    designation: "Head of Payments",
    company: "Keel",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    image: "/case-studies/baku.jpg",
    stats: [
      { label: "Matched same day", value: "94.6%" },
      { label: "Items still open", value: "286" },
      { label: "Breaks over 5 days", value: "14" },
    ],
  },
  {
    name: "Fiserv",
    designation: "Controller",
    company: "Meridian",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    image: "/case-studies/fiserv.jpg",
    stats: [
      { label: "Fee gap found", value: "$1.7M" },
      { label: "Rate cards checked", value: "11" },
      { label: "Off-contract lines", value: "2.4%" },
    ],
  },
  {
    name: "IDFC",
    designation: "VP, Finance Operations",
    company: "Harbor",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: "/case-studies/harbor.jpg",
    stats: [
      { label: "Hours on close", value: "64" },
      { label: "Files built by hand", value: "9" },
      { label: "Open handoffs", value: "6" },
    ],
  },
  {
    name: "Ooredoo",
    designation: "Treasury Lead",
    company: "Sable",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
    image: "/case-studies/ooredoo.jpg",
    stats: [
      { label: "Recon finished", value: "6.5h" },
      { label: "Accounts tied", value: "37" },
      { label: "Nostro breaks", value: "4" },
    ],
  },
  {
    name: "FirstCry",
    designation: "Head of Reconciliation",
    company: "Northline",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    image: "/case-studies/firstcry.jpg",
    stats: [
      { label: "Exceptions open", value: "73" },
      { label: "Older than 7 days", value: "8" },
      { label: "Cleared unattended", value: "88.7%" },
    ],
  },
];

const linkClassName =
  "not-typeset !m-0 w-fit border-b border-current pb-0.5 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase";

function Arrow({ direction }: { direction: "prev" | "next" }) {
  const d = direction === "prev" ? "M13 8H3M7 4 3 8l4 4" : "M3 8h10M9 4l4 4-4 4";
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function CornerMarks() {
  const mark = "pointer-events-none absolute size-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]";
  return (
    <>
      <span className={`${mark} top-2 left-2`} aria-hidden>
        +
      </span>
      <span className={`${mark} top-2 right-2`} aria-hidden>
        +
      </span>
      <span className={`${mark} bottom-2 left-2`} aria-hidden>
        +
      </span>
      <span className={`${mark} right-2 bottom-2`} aria-hidden>
        +
      </span>
    </>
  );
}

export default function HomeCaseStudies() {
  const [selected, setSelected] = useState(0);
  const count = TESTIMONIALS.length;
  const active = TESTIMONIALS[selected];
  const go = (step: number) => setSelected((index) => (index + step + count) % count);

  return (
    <section id="case-studies" className="py-28 md:py-40" aria-labelledby="case-studies-heading">
      <SiteContainer>
        <div className="flex items-end justify-between gap-6">
          <h2 id="case-studies-heading" className="!mb-0 !mt-0 max-w-none text-[rgba(0,0,0,0.875)]">
            Outcomes from teams
            <br />
            already in production.
          </h2>
          <p className={`${linkClassName} shrink-0`} data-not-typeset style={{ display: "inline-flex", width: "fit-content" }}>
            See all customer stories
          </p>
        </div>

        <div className="relative mt-12 border-t border-black/15 md:mt-16">
          <span
            className="absolute top-0 right-0 flex size-9 -translate-y-1/2 items-center justify-center border border-black/15 bg-white font-[family-name:var(--font-season)] text-[22px] leading-none text-[rgba(0,0,0,0.875)]"
            aria-hidden
          >
            ”
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-12 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-14">
          <div className="not-typeset relative aspect-square overflow-hidden" data-not-typeset>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt="" className="size-full object-cover object-[center_20%]" />
            <CornerMarks />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 pt-24 pb-4 text-white">
              <ul className="flex flex-col">
                {active.stats.map((stat) => (
                  <li key={stat.label} className="flex items-end justify-between gap-4 border-t border-white/30 py-2.5 first:border-t-0 first:pt-0">
                    <p className="!mb-0 !mt-0 font-[family-name:var(--font-mono)] text-[11px] leading-[1.3] font-medium tracking-[-0.02em] uppercase">
                      {stat.label}
                    </p>
                    <p className="!mb-0 !mt-0 font-[family-name:var(--font-season)] text-[28px] leading-none tracking-[-0.04em]">
                      {stat.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex min-h-full flex-col md:min-h-[28rem]">
            <p
              className="!mb-0 !mt-0 text-[22px] leading-none font-semibold tracking-[-0.03em] text-[rgba(0,0,0,0.875)]"
              style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
              {active.company}
            </p>
            <p className="!mb-0 !mt-8 max-w-[34rem] text-[22px] leading-[1.35] text-[rgba(0,0,0,0.875)] md:text-[28px]">
              {active.quote}
            </p>
            <p
              className={linkClassName.replace("!m-0 ", "")}
              data-not-typeset
              style={{ display: "inline-flex", width: "fit-content", marginTop: "5rem" }}
            >
              Read full story
            </p>

            <div className="mt-auto flex flex-col gap-4 pt-12 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="not-typeset !m-0 border border-black/15 px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase"
                data-not-typeset
              >
                {active.name}
                <span className="px-2 text-black/30">|</span>
                {active.designation} @ {active.company}
              </p>
              <div className="flex shrink-0">
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center border border-black/15 text-[rgba(0,0,0,0.875)]"
                  aria-label="Previous case study"
                  onClick={() => go(-1)}
                >
                  <Arrow direction="prev" />
                </button>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center border border-l-0 border-black/15 text-[rgba(0,0,0,0.875)]"
                  aria-label="Next case study"
                  onClick={() => go(1)}
                >
                  <Arrow direction="next" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
