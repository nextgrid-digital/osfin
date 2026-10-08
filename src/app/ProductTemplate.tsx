import type { Product } from "../content/products";
import PlatformSplit from "./PlatformSplit";
import ProductHeroCarousel from "./ProductHeroCarousel";
import ProductSheet, { schemeForIcon } from "./ProductSheet";
import ProductTabs from "./ProductTabs";
import SectionHeading from "./SectionHeading";
import SiteContainer from "./SiteContainer";
import SiteFooter from "./SiteFooter";

export default function ProductTemplate({ product }: { product: Product }) {
  return (
    <div
      data-transition="container"
      data-namespace="product"
      className="site-shell typeset typeset-docs min-h-screen bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]"
    >
      <main className="pt-14 md:pt-16">
        <SiteContainer className="pt-8 pb-28 md:pt-10 md:pb-36">
          <h1 className="mx-auto max-w-full text-center">
            <span className="block">Architecting the</span>
            <span className="block">Transaction-Intelligent Enterprise</span>
          </h1>

          <ProductTabs currentSlug={product.slug} />

          <SectionHeading
            className="mt-4 pt-4 pb-0 md:mt-6 md:pt-6 md:pb-0 [&_h3]:py-1"
            title={product.headline}
            titleAs="h3"
            aside={product.lede || product.cardBody}
            cta={null}
          />

          <ProductHeroCarousel currentSlug={product.slug} />

          <section className="mt-24 md:mt-32">
            <div className="mx-auto flex w-max max-w-full flex-col items-start gap-4 text-left md:flex-row md:items-baseline md:gap-16">
              <p className="not-typeset shrink-0 !m-0 !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-black/45 uppercase" data-not-typeset>
                Problem
              </p>
              <div className="!mt-0 w-full max-w-xl text-[rgba(0,0,0,0.875)] [&>p]:!mt-4 [&>p:first-child]:!mt-0">
                {product.problem.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          {product.platform ? (
            <section className="mt-24 md:mt-32">
              <PlatformSplit
                copy={
                  <>
                    <h2 className="!mb-0 !mt-0 max-w-full text-[rgba(0,0,0,0.875)]">
                      {product.platform.heading.split("\n").map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>
                    {product.platform.body.map((paragraph) => (
                      <p key={paragraph} className="!mb-0 !mt-8 max-w-xl text-black/60">
                        {paragraph}
                      </p>
                    ))}
                    <p className="!mb-0 !mt-8 text-[rgba(0,0,0,0.875)]">{product.platform.kicker}</p>
                    <p className="!mb-0 !mt-8 max-w-xl text-black/60">{product.platform.close}</p>
                  </>
                }
                visual={
                  <ProductSheet
                    name={product.name}
                    scheme={schemeForIcon(product.icon)}
                    wordmark={false}
                    indexes={false}
                    cluster
                  />
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
                  <h3 className="!mb-0 !mt-0 text-[rgba(0,0,0,0.875)]">
                    {cap.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <div className="!mt-0 [&>:first-child]:!mt-0">
                    {cap.lead ? <p className="text-[rgba(0,0,0,0.875)]">{cap.lead}</p> : null}
                    <p className="text-black/60">{cap.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </SiteContainer>
      </main>

      <SiteFooter />
    </div>
  );
}
