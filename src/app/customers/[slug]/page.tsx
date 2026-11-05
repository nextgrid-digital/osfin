import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PostBlock, PostSection, PostSubsection } from "../../../content/posts";
import {
  customerSlugs,
  getCustomerStory,
  recommendedCustomerStories,
} from "../../../content/customers";
import BlogShare from "../../blog/BlogShare";
import CustomerThumbnail from "../CustomerThumbnail";
import SiteClose from "../../SiteClose";
import SiteContainer from "../../SiteContainer";
import TransitionLink from "../../TransitionLink";

function BlockList({ blocks }: { blocks: PostBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return <p key={`p-${index}`}>{block.text}</p>;
        }
        if (block.type === "ul") {
          return (
            <ul key={`ul-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={`ol-${index}`}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          );
        }
        return (
          <div key={`table-${index}`} className="my-12 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-[14px] leading-[1.45]">
              <thead>
                <tr>
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      className="border-b border-black/15 px-0 py-2 pr-6 font-medium text-[#5D524B]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={row.join("|") + rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${cellIndex}-${cell}`}
                        className="border-b border-black/10 px-0 py-2.5 pr-6 align-top text-[#5D524B]/80"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

function SubsectionBody({ subsection }: { subsection: PostSubsection }) {
  return (
    <>
      <h3>{subsection.heading}</h3>
      {subsection.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {subsection.blocks ? <BlockList blocks={subsection.blocks} /> : null}
    </>
  );
}

function ArticleSection({ section }: { section: PostSection }) {
  const hideHeading = section.heading === "Overview";
  return (
    <section>
      {hideHeading ? null : <h2>{section.heading}</h2>}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.blocks ? <BlockList blocks={section.blocks} /> : null}
      {section.subsections?.map((subsection) => (
        <SubsectionBody key={subsection.heading} subsection={subsection} />
      ))}
    </section>
  );
}

export function generateStaticParams() {
  return customerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getCustomerStory(slug);
  if (!story) return { title: "Osfin" };
  return { title: `${story.title} | Osfin` };
}

export default async function CustomerStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getCustomerStory(slug);
  if (!story) notFound();

  const related = recommendedCustomerStories(slug, 3);

  return (
    <div
      data-transition="container"
      data-namespace="customer-story"
      className="site-shell min-h-screen bg-background text-[#5D524B]"
    >
      <main className="pt-14 md:pt-16">
        <article
          className="not-typeset mx-auto w-full max-w-[1024px] px-6 pb-16 pt-16 font-sans md:pb-20 md:pt-20"
          data-not-typeset
        >
          <p className="m-0 text-center font-[family-name:var(--font-mono)] text-[13px] font-medium tracking-[-0.02em] text-[#5D524B]/45 uppercase">
            <TransitionLink
              href="/customers"
              className="text-[#5D524B]/45 no-underline hover:text-[#5D524B] hover:no-underline"
            >
              Customers
            </TransitionLink>
            <span className="px-1.5">/</span>
            <span>{story.category}</span>
          </p>
          <h1 className="mx-auto mt-3 mb-0 max-w-[900px] text-center font-[family-name:var(--font-season)] text-[clamp(1.75rem,4.2vw,48px)] font-normal leading-none tracking-[-0.022em] text-[#5D524B]">
            {story.title}
          </h1>
          <div className="mt-12">
            <CustomerThumbnail
              background={story.cover}
              logo={story.logo}
              company={story.company}
              className="aspect-[21/9]"
            />
          </div>
          <p className="mt-6 mb-0 text-center text-[13px] font-medium tracking-[-0.01em] text-[#5D524B]/45">
            Osfin
            <span className="px-1.5">·</span>
            {story.date}
          </p>
          <div
            className="
              mx-auto mt-[4.625rem] max-w-[calc(624px+10ch)] text-[17px] leading-[1.6] text-[#5D524B]/80
              [&_p]:mt-5 [&_p]:mb-0
              [&_section:first-child_p:first-of-type]:mt-0
              [&_h2]:mt-14 [&_h2]:mb-0 [&_h2]:font-sans [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-[1.33] [&_h2]:tracking-[-0.012em] [&_h2]:text-[#5D524B]
              [&_h2+p]:mt-4
              [&_h3]:mt-7 [&_h3]:mb-0 [&_h3]:font-sans [&_h3]:text-[17px] [&_h3]:font-medium [&_h3]:leading-[1.4] [&_h3]:tracking-[-0.012em] [&_h3]:text-[#5D524B]
              [&_h3+p]:mt-2.5
              [&_ul]:mt-3 [&_ul]:mb-0 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:mt-3 [&_ol]:mb-0 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mt-1.5 [&_li]:pl-0.5
              [&_li]:marker:text-[#5D524B]/35
              [&_p+ul]:mt-3 [&_p+ol]:mt-3
            "
          >
            {story.sections.map((section) => (
              <ArticleSection key={section.heading} section={section} />
            ))}
            <div className="mt-16 flex items-center justify-between gap-4 border-t border-black/10 pt-6 text-[13px] font-medium tracking-[-0.01em] text-[#5D524B]/45">
              <p className="m-0">
                Osfin
                <span className="px-1.5">·</span>
                {story.date}
              </p>
              <BlogShare />
            </div>
          </div>
        </article>
        {related.length > 0 ? (
          <SiteContainer className="pb-24 md:pb-32">
            <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-5">
              <h2 className="!mb-0 !mt-0 font-[family-name:var(--font-season)] text-[clamp(1.5rem,3vw,32px)] font-normal tracking-[-0.022em] text-[#5D524B]">
                Recommended
              </h2>
              <TransitionLink
                href="/customers"
                className="not-typeset mb-1 inline-flex shrink-0 items-center gap-2 font-[family-name:var(--font-mono)] text-[13px] font-medium tracking-[-0.02em] text-[#5D524B] uppercase no-underline hover:no-underline"
                data-not-typeset
              >
                <span className="underline underline-offset-4">View all</span>
              </TransitionLink>
            </div>
            <div className="grid grid-cols-1 border-x border-b border-black/15 md:grid-cols-3">
              {related.map((item, index) => (
                <TransitionLink
                  key={item.slug}
                  href={`/customers/${item.slug}`}
                  className={`not-typeset flex flex-col border-black/15 px-8 py-8 no-underline hover:no-underline md:py-10 ${
                    index > 0
                      ? "border-t md:border-t-0 md:border-l"
                      : "md:border-l md:border-l-transparent"
                  }`}
                  data-not-typeset
                >
                  <CustomerThumbnail
                    background={item.cover}
                    logo={item.logo}
                    company={item.company}
                  />
                  <h3 className="!mb-0 !mt-8 !font-sans !text-[20px] !font-normal !leading-[1.33] !tracking-[-0.012em] text-[#5D524B] normal-case">
                    {item.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-12">
                    <p className="!m-0 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[14px] leading-5 tracking-[-0.02em] text-[#5D524B]/55 uppercase">
                      <span>{item.category}</span>
                      <span className="inline-block size-1 bg-current" aria-hidden />
                      <span>{item.date}</span>
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
              ))}
            </div>
          </SiteContainer>
        ) : null}
      </main>
      <SiteClose />
    </div>
  );
}
