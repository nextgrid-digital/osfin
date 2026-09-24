import type { Product } from "../content/products";
import ProductHeroCarousel from "./ProductHeroCarousel";
import ProductTabs from "./ProductTabs";
import SectionHeading from "./SectionHeading";
import SiteContainer from "./SiteContainer";
import SiteFooter from "./SiteFooter";

export default function ProductTemplate({ product }: { product: Product }) {
  return (
    <div
      data-transition="container"
      data-namespace="product"
      className="site-shell typeset typeset-docs min-h-screen bg-[#f4f4f4] text-[rgba(0,0,0,0.875)]"
    >
      <main className="pt-14 md:pt-16">
        <SiteContainer className="pt-20 pb-28 md:pt-28 md:pb-36">
          <h1 className="mx-auto max-w-[22ch] text-center">
            The autonomous layer
            <br />
            behind every transaction.
          </h1>

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
              <p>{product.problem[0]}</p>
              <p>{product.problem[1]}</p>
            </div>
          </section>

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
                    <p className="text-[rgba(0,0,0,0.875)]">{cap.lead}</p>
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
