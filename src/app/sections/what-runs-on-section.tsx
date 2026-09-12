import HorizontalScroll from "../components/horizontal-scroll";
import IndustryPostCard, { industryPostVariant, type IndustryPost } from "../components/industry-post-card";

const INDUSTRY_POSTS: IndustryPost[] = [
  {
    href: "/use-cases/payments",
    label: "Banking",
    lede: "Reconcile deposits, transfers, lending activity and settlement records across core systems.",
  },
  {
    href: "/use-cases/finance",
    label: "Payments",
    lede: "Trace collections, payouts, refunds, fees and settlement differences across gateways and processors.",
  },
  {
    href: "/use-cases/defi",
    label: "Fintech",
    lede: "Keep customer balances, partner records and internal ledgers aligned as transaction volume grows.",
  },
  {
    href: "#industries",
    label: "Insurance",
    lede: "Connect premiums, claims, commissions and settlement data with clear ownership and evidence.",
  },
  {
    href: "#industries",
    label: "Capital markets",
    lede: "Validate trades, positions, cash movements and downstream accounting records.",
  },
  {
    href: "#industries",
    label: "Marketplaces",
    lede: "Reconcile high-frequency transactions, wallet activity, payouts and partner obligations.",
  },
];

/** What Runs On section. */
export default function WhatRunsOnSection({
  mediaLinkData = INDUSTRY_POSTS,
}: {
  mediaLinkData?: IndustryPost[];
} = {}) {
  return (
    <section id="industries" className="flex relative py-45 justify-center overflow-clip bg-primary max-md:py-[2.8125rem] md:max-lg:py-22.5">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <div className="flex mb-22.5 flex-col items-start gap-7.5 col-start-2 col-end-16 max-lg:mb-[2.8125rem]">
          <h2 className="block text-[3.4375rem] [font-weight:420] leading-[3.4375rem] tracking-[-1.1px] [font-feature-settings:'calt'] max-md:text-[2rem] max-md:leading-8 max-md:tracking-[-0.64px] md:max-lg:text-[2.5rem] md:max-lg:leading-10 md:max-lg:tracking-[-0.8px]" data-component="heading">
            {" Where every transaction"}
            <br className="inline" />
            {" carries a story. "}
          </h2>
          {" "}
          <a className="w-[8.3125rem] flex relative z-0 px-5 rounded-full items-center gap-2.5 overflow-clip text-background [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase whitespace-nowrap text-nowrap bg-foreground cursor-pointer h-[2.8125rem]" data-component="link" aria-disabled="false" href="#industries">
            <span className="w-[8.3125rem] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-color-006 [scale:0_1]" />
            {" "}
            <span className="block">
              {" All industries "}
            </span>
          </a>
          {" "}
        </div>
        {" "}
        <HorizontalScroll>
          {mediaLinkData.map((post, index) => (
            <IndustryPostCard key={post.label} post={post} variant={industryPostVariant(index)} />
          ))}
        </HorizontalScroll>
        {" "}
      </div>
      {" "}
    </section>
  );
}
