import type { Metadata } from "next";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { ABOUT } from "../../content/about";
import CompanyHero from "../CompanyHero";
import SiteContainer from "../SiteContainer";
import SiteClose from "../SiteClose";

export const metadata: Metadata = {
  title: "About — Osfin",
  description: ABOUT.description,
};

const essayLabelClassName =
  "not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] leading-none font-medium tracking-[-0.02em] text-black/45 uppercase";
const labelClassName = essayLabelClassName;

export default function AboutPage() {
  return (
    <div
      data-transition="container"
      data-namespace="about"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-black"
    >
      <main className="pt-14 md:pt-16">
        <CompanyHero
          lines={["Product speed.", "Enterprise fit."]}
          backdrop={
            <div
              className="h-full w-full"
              style={{
                maskImage:
                  "radial-gradient(ellipse 42% 38% at 50% 42%, transparent 0%, black 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 42% 38% at 50% 42%, transparent 0%, black 70%)",
              }}
            >
              <GlyphMatrix
                glyphs="01.+*/<>="
                cellSize={14}
                mutationRate={0.04}
                interval={90}
                fadeBottom={0.55}
                color="#000000"
                className="h-full w-full"
              />
            </div>
          }
        />

        <section className="section !pt-12 md:!pt-16">
          <SiteContainer>
            <div
              className="not-typeset grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12"
              data-not-typeset
            >
              {ABOUT.fit.map((item) => (
                <div key={item.title}>
                  <h2 className="!m-0 font-[family-name:var(--font-crimson)] !text-[clamp(1.5rem,2vw,28px)] !leading-none !font-light !tracking-[-1px] text-black">
                    {item.title}
                  </h2>
                  <p className="!mb-0 !mt-4 text-[18px] !leading-[1.5] text-black">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </SiteContainer>
        </section>

        <section className="section">
          <SiteContainer className="flex flex-col items-center gap-14 md:gap-16">
            {ABOUT.proof.map((row) => (
              <div key={row.label} className="flex w-full flex-col items-center">
                <p className={`${labelClassName} text-center`} data-not-typeset>
                  {row.label}
                </p>
                {row.label === "Standards" ? (
                  <div
                    className="not-typeset mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-8 md:gap-x-14"
                    data-not-typeset
                  >
                    {row.items.map((item) => (
                      <figure key={item.name} className="!m-0 flex w-[7.25rem] flex-col items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="h-16 w-auto max-w-full object-contain object-center md:h-20"
                        />
                      </figure>
                    ))}
                  </div>
                ) : (
                  <div
                    className="not-typeset mt-4 flex max-w-full flex-wrap justify-center"
                    data-not-typeset
                  >
                    {row.items.map((item) => (
                      <article
                        key={item.name}
                        className="flex aspect-[5/3] w-44 shrink-0 items-center justify-center px-5 sm:w-52"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="h-8 w-auto max-w-[8rem] object-contain object-center sm:h-9"
                        />
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </SiteContainer>
        </section>

        <section className="pt-8 pb-24 md:pt-12 md:pb-36">
          <SiteContainer>
            <p className={labelClassName} data-not-typeset>
              {ABOUT.places.label}
            </p>
            <h2 className="!mt-5 max-w-[16em] md:!mt-6">{ABOUT.places.title}</h2>
            <div className="mt-12 grid grid-cols-1 border border-black/15 md:mt-16 md:grid-cols-3">
              {ABOUT.places.cities.map((city, index) => (
                <figure
                  key={city.name}
                  className={`not-typeset !m-0 flex flex-col border-black/15 px-8 py-8 md:py-10 ${
                    index > 0
                      ? "border-t md:border-t-0 md:border-l"
                      : "md:border-l md:border-l-transparent"
                  }`}
                  data-not-typeset
                >
                  <div className="aspect-square w-full overflow-hidden border border-black/15 bg-black/[0.03]">
                    <img
                      src={city.image}
                      alt={city.imageAlt}
                      className="size-full object-cover"
                    />
                  </div>
                  <h3 className="!mb-0 !mt-8 !text-[20px] !font-light !leading-[1.33] !tracking-[-0.012em] text-black normal-case">
                    {city.name}
                  </h3>
                </figure>
              ))}
            </div>
          </SiteContainer>
        </section>
      </main>
      <SiteClose />
    </div>
  );
}
