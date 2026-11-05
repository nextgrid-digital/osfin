"use client";

import { useState } from "react";
import SiteContainer from "./SiteContainer";
import TransitionLink from "./TransitionLink";

type Stat = {
  label: string;
  value: string;
};

type Testimonial = {
  name: string;
  designation: string;
  company: string;
  quote: string;
  logo?: string;
  href: string;
  stats: readonly Stat[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Accounting Team",
    designation: "Accounting",
    company: "PharmEasy",
    quote:
      "Real-time visibility of cashflows at an SKU level is achieved with Osfin's intuitive dashboards. We were able to not only manage customer transactions level but also complex recon of state-wise charges and taxes for our B2B business.",
    logo: "/customers/pharmeasy.svg",
    href: "/customers/pharmeasy",
    stats: [
      { label: "Stockouts cut", value: "99%" },
      { label: "Auto-recon", value: "99.5%" },
      { label: "Txns reconciled", value: "4M+" },
    ],
  },
  {
    name: "Finance Team",
    designation: "Finance",
    company: "Games 24*7",
    quote:
      "Managing voluminous transaction data has become seamless using Osfin. We are able to achieve complete visibility on the cashflows across our Internal database, Payment Gateways and Banks. Moreover, Osfin also became our defacto auditor for PG charges and failure rates.",
    logo: "/customers/games-24x7.svg",
    href: "/customers/games-24x7",
    stats: [
      { label: "Faster recon", value: "90%" },
      { label: "Daily transactions", value: "5M+" },
      { label: "Auto-recon", value: "98%" },
    ],
  },
  {
    name: "Accounting Team",
    designation: "Accounting",
    company: "Manipal Cigna",
    quote:
      "Osfin is a life saviour. With its support, we've been able to better administer payments to our partners. Timely settlement and distribution of payouts allow us to concentrate on expanding our primary business. For handling partner compensation or commissions, I can't speak highly enough about Osfin.",
    logo: "/customers/manipal-cigna-logo.png",
    href: "/customers/manipal-cigna",
    stats: [
      { label: "Focus", value: "Payouts" },
      { label: "Settlements", value: "On time" },
      { label: "Team", value: "Accounting" },
    ],
  },
  {
    name: "Finance Team",
    designation: "Finance",
    company: "Buku Warung",
    quote:
      "Osfin offers efficient financial reconciliation, enhancing accuracy and productivity. Recommended to decrease dependency on internal team.",
    logo: "/customers/buku-warung.png",
    href: "/customers/buku-warung",
    stats: [
      { label: "Focus", value: "Recon" },
      { label: "Result", value: "Less manual" },
      { label: "Team", value: "Finance" },
    ],
  },
  {
    name: "Operations Manager",
    designation: "Operations",
    company: "E-commerce retailer",
    quote:
      "Osfin's payment reconciliation solution has revolutionized our financial operations. We now have complete accuracy and visibility across all our payment channels.",
    href: "/customers/e-commerce-payment-reconciliation",
    stats: [
      { label: "Process automated", value: "99%" },
      { label: "Accuracy", value: "100%" },
      { label: "Less manual time", value: "85%" },
    ],
  },
  {
    name: "Head of Operations",
    designation: "Operations",
    company: "Indian fintech",
    quote:
      "Osfin has revolutionized our reconciliation process. What used to take days is now completed in hours, with unprecedented accuracy. The platform's flexibility in handling various data sources has significantly improved our operational efficiency and financial visibility.",
    href: "/customers/loan-reconciliation",
    stats: [
      { label: "Annual savings", value: "$200K" },
      { label: "Faster processing", value: "90%" },
      { label: "Loans / month", value: "2M+" },
    ],
  },
  {
    name: "Operations Manager",
    designation: "Operations",
    company: "Indian bank",
    quote:
      "Osfin's platform has transformed our operations, meeting the demands of India's evolving digital payment landscape while enhancing customer service.",
    href: "/customers/card-reconciliation",
    stats: [
      { label: "Annual savings", value: "$500K" },
      { label: "Faster recon", value: "97%" },
      { label: "Daily transactions", value: "10M+" },
    ],
  },
  {
    name: "Head of Operations",
    designation: "Operations",
    company: "ATM network",
    quote:
      "With Osfin, we've achieved a level of data control and process automation that we never thought possible. It's not just about reconciliation anymore — we're using the platform to drive strategic decisions across our entire ATM network.",
    href: "/customers/atm-reconciliation",
    stats: [
      { label: "Annual savings", value: "$1.5M" },
      { label: "Faster processing", value: "95%" },
      { label: "ATMs automated", value: "1,500+" },
    ],
  },
  {
    name: "Head of Operations",
    designation: "Operations",
    company: "Crypto exchange",
    quote:
      "Osfin's crypto reconciliation solution has significantly improved our operations. We've maintained 100% accuracy while greatly increasing our efficiency across crypto and fiat transactions.",
    href: "/customers/crypto-reconciliation",
    stats: [
      { label: "Accuracy", value: "100%" },
      { label: "Process automated", value: "95%" },
      { label: "Less manual time", value: "90%" },
    ],
  },
];

const linkClassName =
  "not-typeset !m-0 w-fit border-b border-current pb-0.5 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-[#5D524B] uppercase";

function Arrow({ direction }: { direction: "prev" | "next" }) {
  const d = direction === "prev" ? "M13 8H3M7 4 3 8l4 4" : "M3 8h10M9 4l4 4-4 4";
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
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
          <h2 id="case-studies-heading" className="!mb-0 !mt-0 max-w-none text-[#5D524B]">
            Outcomes from teams
            <br />
            already in production.
          </h2>
          <TransitionLink
            href="/customers"
            className={`${linkClassName} shrink-0 no-underline hover:no-underline`}
            data-not-typeset
            style={{ display: "inline-flex", width: "fit-content" }}
          >
            See all customer stories
          </TransitionLink>
        </div>

        <div className="relative mt-12 border-t border-black/15 md:mt-16">
          <span
            className="absolute top-0 right-0 flex size-9 -translate-y-1/2 items-center justify-center border border-black/15 bg-white font-[family-name:var(--font-season)] text-[22px] leading-none text-[#5D524B]"
            aria-hidden
          >
            ”
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-12 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-14">
          <div className="not-typeset relative aspect-square overflow-hidden border border-black/15 bg-[#F7F1E3]" data-not-typeset>
            <div className="absolute inset-x-0 top-0 bottom-[9.5rem] flex items-center justify-center px-10">
              {active.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.logo}
                  alt={active.company}
                  className="max-h-[48%] max-w-[72%] object-contain"
                />
              ) : (
                <p className="!m-0 max-w-[12rem] text-center font-[family-name:var(--font-season)] text-[32px] leading-[1.1] tracking-[-0.03em] text-[#5D524B]">
                  {active.company}
                </p>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 border-t border-black/15 bg-[#FEF9ED] px-4 py-3 text-[#5D524B]">
              <ul className="flex flex-col">
                {active.stats.map((stat) => (
                  <li key={stat.label} className="flex items-end justify-between gap-4 border-t border-black/10 py-2.5 first:border-t-0 first:pt-0">
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
              className="!mb-0 !mt-0 text-[22px] leading-none font-semibold tracking-[-0.03em] text-[#5D524B]"
              style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
            >
              {active.company}
            </p>
            <p className="!mb-0 !mt-8 max-w-[34rem] text-[22px] leading-[1.35] text-[#5D524B] md:text-[28px]">
              {active.quote}
            </p>
            <TransitionLink
              href={active.href}
              className={linkClassName.replace("!m-0 ", "")}
              data-not-typeset
              style={{ display: "inline-flex", width: "fit-content", marginTop: "5rem" }}
            >
              Read full story
            </TransitionLink>

            <div className="mt-auto flex flex-col gap-4 pt-12 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="not-typeset !m-0 border border-black/15 px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[-0.02em] text-[#5D524B] uppercase"
                data-not-typeset
              >
                {active.name}
                <span className="px-2 text-[#5D524B]/30">|</span>
                {active.designation} @ {active.company}
              </p>
              <div className="flex shrink-0">
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center border border-black/15 text-[#5D524B]"
                  aria-label="Previous case study"
                  onClick={() => go(-1)}
                >
                  <Arrow direction="prev" />
                </button>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center border border-l-0 border-black/15 text-[#5D524B]"
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
