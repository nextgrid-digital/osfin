import { CUSTOMER_STORIES } from "../content/customers";
import SiteContainer from "./SiteContainer";
import TransitionLink from "./TransitionLink";

type Span = "one" | "two" | "three";

type QuoteTile = {
  kind: "quote";
  slug: string;
  quote: string;
  /** Optional metric fused into the same story tile (e.g. PharmEasy). */
  metric?: { value: string; label: string };
  span: Span;
};

type MetricTile = {
  kind: "metric";
  slug: string;
  value: string;
  label: string;
  span: Span;
};

type MoreTile = {
  kind: "more";
  span: Span;
};

type Tile = QuoteTile | MetricTile | MoreTile;

const SPAN_CLASS: Record<Span, string> = {
  one: "md:col-span-1",
  two: "md:col-span-2",
  three: "md:col-span-3",
};

const TILE_CLASS =
  "flex h-full min-h-0 flex-col justify-between gap-3 border border-black/15 p-4 text-black no-underline transition hover:opacity-90 hover:no-underline md:p-5";

/**
 * Bento on a 4-col × 2-row track (desktop):
 * [ PharmEasy quote+99.5% ×2 ] [ $1.5M ] [ $500K ]
 * [ Games quote ×2           ] [ Manipal ×1 ] [ More ]
 */
const TILES: Tile[] = [
  {
    kind: "quote",
    slug: "pharmeasy",
    quote:
      "Real-time visibility of cashflows at an SKU level is achieved with Osfin's intuitive dashboards. We were able to not only manage customer transactions level but also complex recon of state-wise charges and taxes for our B2B business.",
    metric: { value: "99.5%", label: "auto-reconciliation" },
    span: "two",
  },
  {
    kind: "metric",
    slug: "atm-reconciliation",
    value: "$1.5M",
    label: "annual savings · 1,500+ ATMs",
    span: "one",
  },
  {
    kind: "metric",
    slug: "card-reconciliation",
    value: "$500K",
    label: "annual savings · 10M+ daily txns",
    span: "one",
  },
  {
    kind: "quote",
    slug: "games-24x7",
    quote:
      "Managing voluminous transaction data has become seamless using Osfin. We are able to achieve complete visibility on the cashflows across our Internal database, Payment Gateways and Banks. Moreover, Osfin also became our defacto auditor for PG charges and failure rates.",
    span: "two",
  },
  {
    kind: "quote",
    slug: "manipal-cigna",
    quote:
      "Osfin is a life saviour. With its support, we've been able to better administer payments to our partners. Timely settlement and distribution of payouts allow us to concentrate on expanding our primary business.",
    span: "one",
  },
  { kind: "more", span: "one" },
];

function storyMeta(slug: string) {
  const story = CUSTOMER_STORIES.find((entry) => entry.slug === slug);
  return {
    company: story?.company ?? slug,
    logo: story?.logo,
  };
}

function CompanyMark({ company, logo }: { company: string; logo?: string }) {
  if (!logo) {
    return (
      <span className="text-[12px] font-medium tracking-[-0.02em] text-black/55">{company}</span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={company}
      className="h-5 w-auto max-w-[7rem] object-contain object-left md:h-6"
    />
  );
}

function QuoteCard({ tile }: { tile: QuoteTile }) {
  const { company, logo } = storyMeta(tile.slug);
  const wide = tile.span !== "one";

  return (
    <TransitionLink
      href={`/customers/${tile.slug}`}
      className={`${TILE_CLASS} ${SPAN_CLASS[tile.span]}`}
    >
      <div className="flex min-h-0 flex-col gap-3">
        {tile.metric ? (
          <p className="!m-0 font-[family-name:var(--font-mono)] text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-none tracking-[-0.04em] text-black">
            {tile.metric.value}
            <span className="ml-2 text-[12px] font-normal tracking-[-0.02em] text-black/55 md:text-[13px]">
              {tile.metric.label}
            </span>
          </p>
        ) : null}
        <p
          className={`!m-0 leading-[1.35] tracking-[-0.02em] ${
            wide
              ? "line-clamp-5 text-[14px] md:line-clamp-6 md:text-[15px]"
              : "line-clamp-4 text-[13px] md:text-[14px]"
          }`}
        >
          &ldquo;{tile.quote}&rdquo;
        </p>
      </div>
      <CompanyMark company={company} logo={logo} />
    </TransitionLink>
  );
}

function MetricCard({ tile }: { tile: MetricTile }) {
  const { company, logo } = storyMeta(tile.slug);

  return (
    <TransitionLink
      href={`/customers/${tile.slug}`}
      className={`${TILE_CLASS} ${SPAN_CLASS[tile.span]}`}
    >
      <div>
        <p className="!m-0 font-[family-name:var(--font-mono)] text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-none tracking-[-0.04em] text-black">
          {tile.value}
        </p>
        <p className="!mb-0 !mt-2 text-[12px] leading-[1.3] text-black/55 md:text-[13px]">{tile.label}</p>
      </div>
      <CompanyMark company={company} logo={logo} />
    </TransitionLink>
  );
}

function MoreCard({ tile }: { tile: MoreTile }) {
  return (
    <TransitionLink
      href="/customers"
      className={`flex h-full min-h-0 items-end justify-between gap-3 border border-black/15 p-4 text-black no-underline transition hover:opacity-90 hover:no-underline md:p-5 ${SPAN_CLASS[tile.span]}`}
    >
      <span className="text-[14px] leading-[1.3] tracking-[-0.02em] md:text-[15px]">
        More case studies
      </span>
      <span className="inline-flex size-8 shrink-0 items-center justify-center border border-black/15" aria-hidden>
        <svg viewBox="0 0 16 16" className="size-3">
          <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      </span>
    </TransitionLink>
  );
}

export default function HomeCaseStudies() {
  return (
    <section
      id="case-studies"
      data-process-exit-next
      className="flex h-[100svh] flex-col justify-center bg-background py-8 md:py-10"
      aria-labelledby="case-studies-heading"
    >
      <SiteContainer className="flex min-h-0 w-full flex-1 flex-col">
        <div className="mx-auto flex shrink-0 flex-col items-center text-center">
          <h2
            id="case-studies-heading"
            data-process-exit-heading
            className="!mb-0 !mt-0 text-black"
          >
            <span className="block">Outcomes from teams</span>
            <span className="block">already in production</span>
          </h2>
          <TransitionLink
            href="/customers"
            className="not-typeset mt-4 inline-flex w-fit items-center gap-2 border border-black/15 px-3.5 py-2.5 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[-0.02em] text-black uppercase no-underline hover:opacity-70 hover:no-underline md:mt-5"
            data-not-typeset
          >
            See all customer stories
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </TransitionLink>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:grid-cols-4 md:grid-rows-2 md:gap-3.5">
          {TILES.map((tile, index) => {
            if (tile.kind === "quote") {
              return <QuoteCard key={`quote-${tile.slug}-${index}`} tile={tile} />;
            }
            if (tile.kind === "metric") {
              return <MetricCard key={`metric-${tile.slug}-${index}`} tile={tile} />;
            }
            return <MoreCard key="more" tile={tile} />;
          })}
        </div>
      </SiteContainer>
    </section>
  );
}
