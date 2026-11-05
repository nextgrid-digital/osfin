import type { Metadata } from "next";
import { TextReveal } from "@/components/ui/cascade-text";
import {
  CUSTOMER_CATEGORIES,
  CUSTOMER_STORIES,
  type CustomerCategory,
} from "../../content/customers";
import CustomerThumbnail from "./CustomerThumbnail";
import SiteClose from "../SiteClose";
import SiteContainer from "../SiteContainer";
import TransitionLink from "../TransitionLink";

const FILTERS = ["All", ...CUSTOMER_CATEGORIES] as const;
type SortOrder = "newest" | "oldest";

function isCategory(value: string | undefined): value is CustomerCategory {
  return (CUSTOMER_CATEGORIES as readonly string[]).includes(value ?? "");
}

export const metadata: Metadata = {
  title: "Customers — Osfin",
  description:
    "Customer stories and case studies from teams running finance operations with Osfin.",
};

function listHref(category: string, sort: SortOrder) {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (sort !== "newest") params.set("sort", sort);
  const query = params.toString();
  return query ? `/customers?${query}` : "/customers";
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;
  const active = isCategory(category) ? category : "All";
  const order: SortOrder = sort === "oldest" ? "oldest" : "newest";
  const stories = (
    active === "All" ? CUSTOMER_STORIES : CUSTOMER_STORIES.filter((story) => story.category === active)
  )
    .slice()
    .sort((a, b) => {
      const delta = Date.parse(a.date) - Date.parse(b.date);
      return order === "oldest" ? delta : -delta;
    });

  return (
    <div
      data-transition="container"
      data-namespace="customers"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-[#5D524B]"
    >
      <main className="pt-14 md:pt-16">
        <SiteContainer className="py-16 md:py-24">
          <h1 className="!mb-0">{active === "All" ? "Customers" : active}</h1>
          <div
            className="not-typeset mt-8 flex flex-col gap-4 border-b border-black/10 pb-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between"
            data-not-typeset
          >
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {FILTERS.map((filter) => {
                const selected = filter === active;
                return (
                  <TransitionLink
                    key={filter}
                    href={listHref(filter, order)}
                    className={`text-[15px] no-underline hover:no-underline ${
                      selected
                        ? "text-[#5D524B]"
                        : "text-[#5D524B]/40 hover:text-[#5D524B]"
                    }`}
                  >
                    {filter}
                  </TransitionLink>
                );
              })}
            </nav>
            <TransitionLink
              href={listHref(active, order === "newest" ? "oldest" : "newest")}
              className="group/cascade inline-flex items-center text-[14px] text-[#5D524B]/45 no-underline hover:text-[#5D524B] hover:no-underline"
            >
              <TextReveal as="span" text="Sort" />
              <TextReveal
                as="span"
                text={order === "newest" ? "Newest" : "Oldest"}
                className="ml-2 text-[#5D524B]/35"
              />
            </TransitionLink>
          </div>
          <div className="grid grid-cols-1 border-x border-b border-black/15 md:grid-cols-3">
            {stories.map((story, index) => {
              const columns = 3;
              const lastRowStart = stories.length - ((stories.length % columns) || columns);
              const hasCardBelow = index + columns < stories.length;
              const closesRow = !hasCardBelow && index < lastRowStart;
              return (
                <TransitionLink
                  key={story.slug}
                  href={`/customers/${story.slug}`}
                  className={`not-typeset flex flex-col border-black/15 px-8 py-8 no-underline hover:no-underline md:py-10 ${
                    index > 0 ? "border-t" : ""
                  } ${index >= columns ? "md:border-t" : index > 0 ? "md:border-t-0" : ""} ${
                    closesRow ? "md:border-b" : ""
                  } ${
                    index % columns === 0 ? "md:border-l md:border-l-transparent" : "md:border-l"
                  }`}
                  data-not-typeset
                >
                  <CustomerThumbnail
                    background={story.cover}
                    logo={story.logo}
                    company={story.company}
                  />
                  <h2 className="!mb-0 !mt-8 !text-[20px] !font-normal !leading-[1.33] !tracking-[-0.012em] text-[#5D524B] normal-case">
                    {story.title}
                  </h2>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-12">
                    <p className="!m-0 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[14px] leading-5 tracking-[-0.02em] text-[#5D524B]/55 uppercase">
                      <span>{story.category}</span>
                      <span className="inline-block size-1 bg-current" aria-hidden />
                      <span>{story.date}</span>
                    </p>
                    <span className="inline-flex size-8 shrink-0 items-center justify-center border border-black/15 text-[#5D524B]/55">
                      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                        <path
                          d="M4 12 12 4M6 4h6v6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        />
                      </svg>
                    </span>
                  </div>
                </TransitionLink>
              );
            })}
          </div>
        </SiteContainer>
      </main>
      <SiteClose />
    </div>
  );
}
