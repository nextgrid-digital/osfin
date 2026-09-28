import { TextReveal } from "@/components/ui/cascade-text";
import { PRODUCTS } from "../content/products";
import HomeProductPanel from "./HomeProductPanels";
import { schemeForIcon } from "./ProductSheet";
import SiteContainer from "./SiteContainer";
import TransitionLink from "./TransitionLink";

export default function HomeProductRows() {
  return (
    <section className="py-28 md:py-40">
      <SiteContainer>
        <div className="flex flex-col gap-28 md:gap-40">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.slug}
              className={`mx-auto flex w-full max-w-[76rem] flex-col items-stretch gap-12 lg:flex-row lg:justify-center lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex w-full flex-col items-start gap-10 lg:w-[30rem] lg:shrink-0 lg:justify-between">
                <div>
                  <div
                    className="not-typeset flex items-center gap-3"
                    data-not-typeset
                  >
                    <span className="inline-flex h-6 min-w-7 items-center justify-center border border-black/15 px-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[-0.02em] text-black/55">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[13px] tracking-[-0.02em] text-black/55">
                      {product.homeLabel}
                    </span>
                  </div>
                  <h2 className="!mb-0 !mt-6 text-[rgba(0,0,0,0.875)]">
                    {product.homeTitle.split("\n").map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
                <div>
                  <p className="!mb-0 !mt-0 max-w-[30rem] text-[15px] leading-6 text-black/55">
                    {product.homeBody}
                  </p>
                  <div
                    className="not-typeset mt-8 flex flex-wrap items-center gap-3"
                    data-not-typeset
                  >
                    <TransitionLink
                      href={`/products/${product.slug}`}
                      className="btn-primary not-typeset inline-flex h-10 items-center rounded-none bg-black px-5 text-[13px] font-medium text-white no-underline transition hover:opacity-90 hover:no-underline"
                    >
                      Explore
                    </TransitionLink>
                    <TextReveal
                      href="#contact"
                      text="Talk to Sales"
                      className="btn-secondary not-typeset inline-flex h-10 items-center rounded-none border border-black/15 bg-transparent px-5 text-[13px] font-medium text-[rgba(0,0,0,0.875)] transition hover:bg-black/5"
                      data-not-typeset=""
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border border-black/10 lg:w-[42rem] lg:shrink-0">
                <HomeProductPanel scheme={schemeForIcon(product.icon)} />
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
