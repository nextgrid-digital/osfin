import { TextReveal } from "@/components/ui/cascade-text";
import { POSTS, POST_CATEGORIES, type PostCategory } from "../../content/posts";
import SiteContainer from "../SiteContainer";
import SiteFooter from "../SiteFooter";
import TransitionLink from "../TransitionLink";

const FILTERS = ["All", ...POST_CATEGORIES] as const;
type SortOrder = "newest" | "oldest";

function isCategory(value: string | undefined): value is PostCategory {
  return value === "Product" || value === "Research";
}

function listHref(category: string, sort: SortOrder) {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (sort !== "newest") params.set("sort", sort);
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { category, sort } = await searchParams;
  const active = isCategory(category) ? category : "All";
  const order: SortOrder = sort === "oldest" ? "oldest" : "newest";
  const posts = (active === "All" ? POSTS : POSTS.filter((post) => post.category === active))
    .slice()
    .sort((a, b) => {
      const delta = Date.parse(a.date) - Date.parse(b.date);
      return order === "oldest" ? delta : -delta;
    });

  return (
    <div
      data-transition="container"
      data-namespace="blog"
      className="site-shell typeset typeset-docs min-h-screen bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]"
    >
      <main className="pt-14 md:pt-16">
        <SiteContainer className="py-16 md:py-24">
          <h1 className="!mb-0">{active}</h1>
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
                        ? "text-[rgba(0,0,0,0.875)]"
                        : "text-black/40 hover:text-[rgba(0,0,0,0.875)]"
                    }`}
                  >
                    {filter}
                  </TransitionLink>
                );
              })}
            </nav>
            <TransitionLink
              href={listHref(active, order === "newest" ? "oldest" : "newest")}
              className="group/cascade inline-flex items-center text-[14px] text-black/45 no-underline hover:text-[rgba(0,0,0,0.875)] hover:no-underline"
            >
              <TextReveal as="span" text="Sort" />
              <TextReveal
                as="span"
                text={order === "newest" ? "Newest" : "Oldest"}
                className="ml-2 text-black/35"
              />
            </TransitionLink>
          </div>
          <div className="grid grid-cols-1 border-x border-b border-black/15 md:grid-cols-3">
            {posts.map((post, index) => {
              const columns = 3;
              const lastRowStart = posts.length - ((posts.length % columns) || columns);
              const hasCardBelow = index + columns < posts.length;
              const closesRow = !hasCardBelow && index < lastRowStart;
              return (
              <TransitionLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`not-typeset flex flex-col border-black/15 px-8 py-8 no-underline hover:no-underline md:py-10 ${
                  index > 0 ? "border-t" : ""
                } ${index >= columns ? "md:border-t" : index > 0 ? "md:border-t-0" : ""} ${
                  closesRow ? "md:border-b" : ""
                } ${
                  index % columns === 0 ? "md:border-l md:border-l-transparent" : "md:border-l"
                }`}
                data-not-typeset
              >
                <div className="aspect-[16/10] w-full overflow-hidden border border-black/15 bg-black/[0.03]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.cover} alt="" className="size-full object-cover" />
                </div>
                <h2 className="!mb-0 !mt-8 !text-[22px] !font-normal !leading-[1.25] !tracking-normal text-[rgba(0,0,0,0.875)] normal-case md:!text-[24px]">
                  {post.title.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <div className="mt-auto flex items-center justify-between gap-4 pt-12">
                  <p className="!m-0 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[14px] leading-5 tracking-[-0.02em] text-black/55 uppercase">
                    <span>{post.category}</span>
                    <span className="inline-block size-1 bg-current" aria-hidden />
                    <span>{post.date}</span>
                  </p>
                  <span className="inline-flex size-8 shrink-0 items-center justify-center border border-black/15 text-black/55">
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
      <SiteFooter />
    </div>
  );
}
