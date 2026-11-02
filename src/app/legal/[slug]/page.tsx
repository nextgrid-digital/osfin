import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLegalDoc,
  legalSlugs,
  type LegalBlock,
} from "../../../content/legal";
import SiteClose from "../../SiteClose";

function BlockList({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return <p key={`p-${index}`}>{block.text}</p>;
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
          <ul key={`ul-${index}`}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

export function generateStaticParams() {
  return legalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Osfin" };
  return {
    title: `${doc.title} — Osfin`,
    description: doc.description,
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <div
      data-transition="container"
      data-namespace="legal"
      className="site-shell min-h-screen bg-background text-[#5D524B]"
    >
      <main className="pt-14 md:pt-16">
        <article
          className="not-typeset mx-auto w-full max-w-[1024px] px-6 pb-16 pt-16 font-sans md:pb-20 md:pt-20"
          data-not-typeset
        >
          <p className="m-0 text-center font-[family-name:var(--font-mono)] text-[13px] font-medium tracking-[-0.02em] text-[#5D524B]/45 uppercase">
            Legal
          </p>
          <h1 className="mx-auto mt-3 mb-0 max-w-[900px] text-center font-[family-name:var(--font-season)] text-[clamp(1.75rem,4.2vw,48px)] font-normal leading-none tracking-[-0.022em] text-[#5D524B]">
            {doc.title}
          </h1>
          {doc.effectiveDate ? (
            <p className="mt-6 mb-0 text-center text-[13px] font-medium tracking-[-0.01em] text-[#5D524B]/45">
              Effective {doc.effectiveDate}
            </p>
          ) : null}
          <div
            className="
              mx-auto mt-[4.625rem] max-w-[calc(624px+10ch)] text-[17px] leading-[1.6] text-[#5D524B]/80
              [&_p]:mt-5 [&_p]:mb-0
              [&_h2]:mt-14 [&_h2]:mb-0 [&_h2]:font-sans [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:leading-[1.33] [&_h2]:tracking-[-0.012em] [&_h2]:text-[#5D524B]
              [&_h2+p]:mt-4 [&_h2+ul]:mt-3 [&_h2+ol]:mt-3
              [&_ul]:mt-3 [&_ul]:mb-0 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:mt-3 [&_ol]:mb-0 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mt-1.5 [&_li]:pl-0.5
              [&_li]:marker:text-[#5D524B]/35
              [&_p+ul]:mt-3 [&_p+ol]:mt-3
            "
          >
            {doc.intro ? <BlockList blocks={doc.intro} /> : null}
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <BlockList blocks={section.blocks} />
              </section>
            ))}
          </div>
        </article>
      </main>
      <SiteClose />
    </div>
  );
}
