import type { Product } from "../content/products";
import ProductHeroCarousel, { ReconDiagram } from "./ProductHeroCarousel";
import ProductIcon from "./ProductIcon";
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
        <SiteContainer className="pt-20 pb-28 md:pt-28 md:pb-36">
          {product.pageHero ? (
            <>
              <h1 className="mx-auto w-max max-w-none text-center">
                {product.pageHero.title.split("\n").map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h1>
            </>
          ) : (
            <h1 className="mx-auto max-w-[22ch] text-center">
              The autonomous layer
              <br />
              behind every transaction.
            </h1>
          )}

          <ProductTabs currentSlug={product.slug} />

          <SectionHeading
            className="mt-16 md:mt-20"
            title={product.headline}
            aside={product.cardBody}
            cta={null}
          />

          <ProductHeroCarousel currentSlug={product.slug} />

          <section className="mt-24 grid gap-8 md:mt-32 md:grid-cols-[minmax(7rem,0.28fr)_minmax(0,1fr)] md:gap-16">
            <div className="max-w-xl space-y-6 text-black/65 md:col-start-2">
              {product.problem.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {product.platform ? (
            <section className="mt-24 md:mt-32">
              <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
                <div className="w-full lg:w-max lg:shrink-0">
                  <h2 className="!mb-0 !mt-0 text-[rgba(0,0,0,0.875)]">
                    {product.platform.heading.split("\n").map((line) => (
                      <span key={line} className="block whitespace-nowrap">
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
                </div>
                <div className="flex aspect-[1200/520] w-full items-center justify-center text-black/40 lg:w-[min(46%,36rem)] lg:shrink-0">
                  {product.slug === "settlement-mesh" ? (
                    <ReconDiagram />
                  ) : (
                    <ProductIcon kind={product.icon} className="h-[62%] w-auto" />
                  )}
                </div>
              </div>
            </section>
          ) : null}

          <section className="mt-24 md:mt-32">
            <h6 className="text-black/45">Capabilities</h6>
            <div className="mt-8 border-t border-black/10">
              {product.capabilities.map((cap, i) => (
                <div
                  key={cap.title}
                  className="grid grid-cols-1 items-start gap-4 border-b border-black/10 py-10 md:grid-cols-[2.75rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-x-10"
                >
                  <h6 className="pt-1.5 text-black/40">
                    {String(i + 1).padStart(2, "0")}
                  </h6>
                  <h2 className="text-[rgba(0,0,0,0.875)]">{cap.title}</h2>
                  <div className="md:pt-1">
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
