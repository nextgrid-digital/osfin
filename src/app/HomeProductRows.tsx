import { PRODUCTS } from "../content/products";
import ProductIcon from "./ProductIcon";
import SiteContainer from "./SiteContainer";
import TransitionLink from "./TransitionLink";

export default function HomeProductRows() {
  return (
    <section className="py-28 md:py-40">
      <SiteContainer>
        <div className="flex flex-col gap-28 md:gap-40">
          {PRODUCTS.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16"
            >
              <div className="flex w-full flex-col items-start lg:max-w-xl lg:shrink-0 lg:flex-1">
                <h2 className="!mb-0 !mt-0 text-[rgba(0,0,0,0.875)]">{product.name}</h2>
                <p className="!mb-0 !mt-6 max-w-[36rem] text-black/60">{product.cardBody}</p>
                <div
                  className="not-typeset mt-10 flex flex-wrap items-center gap-3"
                  data-not-typeset
                >
                  <TransitionLink
                    href={`/products/${product.slug}`}
                    className="btn-primary not-typeset inline-flex h-10 items-center rounded-none bg-black px-5 text-[13px] font-medium text-white no-underline transition hover:opacity-90 hover:no-underline"
                  >
                    Explore
                  </TransitionLink>
                  <a
                    href="#contact"
                    className="btn-secondary not-typeset inline-flex h-10 items-center rounded-none border border-black/15 bg-transparent px-5 text-[13px] font-medium text-[rgba(0,0,0,0.875)] no-underline transition hover:bg-black/5 hover:no-underline"
                  >
                    Talk to Sales
                  </a>
                </div>
              </div>
              <div
                className="flex aspect-square w-full items-center justify-center text-black/40 lg:w-[min(48%,640px)] lg:shrink-0"
                style={{ backgroundColor: product.cardBg }}
              >
                <ProductIcon kind={product.icon} className="h-[46%] w-[46%]" />
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
