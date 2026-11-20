import {
  ScrollReadParagraphs,
  TextScrollRead,
  TextScrollReadWrap,
} from "@/components/systaliko-ui/text/text-scroll-read";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import SlidingEaseVerticalBars from "@/components/ui/sliding-ease";
import type { Product } from "../content/products";
import PlatformSplit from "./PlatformSplit";
import ProductHeroCarousel from "./ProductHeroCarousel";
import ProductTabs from "./ProductTabs";
import SectionHeading from "./SectionHeading";
import SiteContainer from "./SiteContainer";
import SiteClose from "./SiteClose";

export default function ProductTemplate({ product }: { product: Product }) {
  return (
    <div
      data-transition="container"
      data-namespace="product"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-black"
    >
      <main className="pt-14 md:pt-16">
        <SiteContainer className="pt-8 md:pt-10">
          <h1 className="mx-auto max-w-full text-center">
            <span className="block">Transaction Intelligence</span>
            <span className="block">for the enterprise</span>
          </h1>

          <ProductTabs currentSlug={product.slug} />

          <SectionHeading
            className="mt-4 pt-4 pb-0 md:mt-6 md:pt-6 md:pb-0 [&_h3]:py-1 [&_h3]:!text-[clamp(1.5rem,3vw,40px)] [&_h3]:!leading-[1.12] [&_h3]:!tracking-[-0.022em]"
            title={product.headline}
            titleAs="h3"
            aside={product.lede || product.cardBody}
            cta={null}
          />

          <ProductHeroCarousel currentSlug={product.slug} />
        </SiteContainer>

        <section className="relative mt-24 overflow-hidden bg-background [--muted:rgba(0,0,0,0.5)] md:mt-32">
          <div className="pointer-events-none absolute inset-0">
            <GlyphMatrix
              glyphs="01.+*/<>="
              cellSize={14}
              mutationRate={0.04}
              interval={90}
              fadeBottom={0.6}
              fadeOrigin="bottom"
              color="rgba(0, 0, 0, 0.4)"
              className="h-full w-full"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: [
                "radial-gradient(ellipse 36% 62% at 50% 48%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.82) 38%, rgba(255,255,255,0.2) 62%, transparent 78%)",
                "linear-gradient(to top, transparent 0%, transparent 14%, rgba(255,255,255,0.25) 36%, rgba(255,255,255,0.78) 68%, #fff 90%)",
              ].join(", "),
            }}
          />
          <SiteContainer className="relative z-10 pb-16 md:pb-24">
            <div className="mx-auto flex w-full max-w-[42rem] flex-col items-center gap-4 text-center">
              <p className="not-typeset shrink-0 !m-0 !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-black/45 uppercase" data-not-typeset>
                Problem
              </p>
              <TextScrollRead className="w-full" spaceClass="h-16">
                <TextScrollReadWrap className="w-full" yRange={[0, 0]}>
                  <ScrollReadParagraphs paragraphs={product.problem} />
                </TextScrollReadWrap>
              </TextScrollRead>
            </div>
          </SiteContainer>
        </section>

        <SiteContainer className="pb-28 md:pb-36">

          {product.platform ? (
            <section className="mt-24 md:mt-32">
              <PlatformSplit
                copy={
                  <>
                    <h2 className="!mb-0 !mt-0 max-w-full text-black">
                      {product.platform.heading.split("\n").map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>
                    {product.platform.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="!mb-0 !mt-8 max-w-xl text-[17px] leading-[1.65] tracking-[-0.01em] text-black/75 md:text-[18px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    <p className="!mb-0 !mt-8 text-[17px] leading-[1.65] tracking-[-0.01em] text-black md:text-[18px]">
                      {product.platform.kicker}
                    </p>
                    <p className="!mb-0 !mt-8 max-w-xl text-[17px] leading-[1.65] tracking-[-0.01em] text-black/75 md:text-[18px]">
                      {product.platform.close}
                    </p>
                  </>
                }
                visual={
                  <>
                    <SlidingEaseVerticalBars
                      backgroundColor="#fff"
                      lineColor="rgba(0, 0, 0, 0.32)"
                      barColor="#8E8E8C"
                      horizontal
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.08) 58%, #fff 100%)",
                      }}
                    />
                  </>
                }
              />
            </section>
          ) : null}

          <section className="mt-24 md:mt-32">
            <p className="not-typeset !m-0 text-left !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-black/45 uppercase" data-not-typeset>
              Capabilities
            </p>
            <div className="mt-8 border-t border-black/10">
              {product.capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="grid grid-cols-1 items-start gap-4 border-b border-black/10 py-10 md:grid-cols-[2.75rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-x-10"
                >
                  <span className="not-typeset pt-1.5 !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-black/45 uppercase" data-not-typeset>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="!mb-0 !mt-0 !text-[28px] !font-light !leading-[1.2] !tracking-[-0.02em] text-black">
                    {cap.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <div className="!mt-0 max-w-[65ch] text-[17px] leading-[1.65] tracking-[-0.01em] md:text-[18px] [&>:first-child]:!mt-0">
                    {cap.lead ? <p className="text-black">{cap.lead}</p> : null}
                    <p className="text-black/75">{cap.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SiteContainer>
      </main>

      <SiteClose />
    </div>
  );
}
