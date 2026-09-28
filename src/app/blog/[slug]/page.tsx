import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, postSlugs } from "../../../content/posts";
import SiteContainer from "../../SiteContainer";
import SiteFooter from "../../SiteFooter";
import BlogShare from "../BlogShare";

export function generateStaticParams() {
  return postSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Osfin" };
  return { title: `${post.title.replace("\n", " ")} | Osfin` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div
      data-transition="container"
      data-namespace="blog-post"
      className="site-shell typeset typeset-docs min-h-screen bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]"
    >
      <main className="pt-14 md:pt-16">
        <SiteContainer className="py-20 md:py-28">
          <article className="mx-auto max-w-[72rem]">
            <p className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] tracking-[-0.02em] text-black/55">
              {post.date}
              <span className="px-2">·</span>
              {post.category}
            </p>
            <h1 className="!mb-0 !mt-6 !text-[clamp(1.75rem,5vw,48px)] !leading-[1.15]">
              {post.title.split("\n").map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="not-typeset mt-8 flex justify-end" data-not-typeset>
              <BlogShare />
            </div>
            <div className="not-typeset mt-8 overflow-hidden rounded-none bg-black/[0.03]" data-not-typeset>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt="" className="aspect-[2/1] w-full object-cover" />
            </div>
            <div className="mt-10 max-w-[80ch] border-t border-black/10 pt-2">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="!mb-0 !text-[28px] !leading-[1.3]">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </SiteContainer>
      </main>
      <SiteFooter />
    </div>
  );
}
