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
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
            {posts.map((post) => (
              <TransitionLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="not-typeset group/cascade flex flex-col no-underline hover:no-underline"
                data-not-typeset
              >
                <div className="aspect-[4/3] overflow-hidden rounded-none bg-black/[0.03]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.cover} alt="" className="size-full object-cover" />
                </div>
                <h2 className="!mb-0 !mt-4 !font-sans !text-[17px] !font-medium !leading-snug !tracking-normal text-[rgba(0,0,0,0.875)] normal-case">
                  {post.title.split("\n").map((line) => (
                    <span key={line} className="block whitespace-nowrap">
                      <TextReveal as="span" text={line} />
                    </span>
                  ))}
                </h2>
                <p className="!mb-0 !mt-2 flex gap-4 font-sans text-[13px] leading-5 text-black/40">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </p>
              </TransitionLink>
            ))}
          </div>
        </SiteContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
