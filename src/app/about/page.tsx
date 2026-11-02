import type { Metadata } from "next";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { ABOUT } from "../../content/about";
import SiteContainer from "../SiteContainer";
import SiteClose from "../SiteClose";

export const metadata: Metadata = {
  title: "About — Osfin",
  description: ABOUT.manifesto,
};

const essayLabelClassName =
  "not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] leading-none font-medium tracking-[-0.02em] text-[#5D524B]/45";
const labelClassName = `${essayLabelClassName} uppercase`;

export default function AboutPage() {
  return (
    <div
      data-transition="container"
      data-namespace="about"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-[#5D524B]"
    >
      <main className="pt-14 md:pt-16">
        <section className="pt-16 pb-12 md:pt-28 md:pb-20">
          <SiteContainer>
            <p
              className="not-typeset !m-0 max-w-[18em] font-[family-name:var(--font-season)] text-[clamp(2rem,5vw,64px)] leading-none font-normal tracking-[-0.022em] text-[#5D524B]"
              data-not-typeset
            >
              {ABOUT.manifesto}
            </p>
          </SiteContainer>
        </section>

        <div className="relative h-[400px] w-full overflow-hidden">
          <GlyphMatrix
            glyphs="01.+*/<>="
            cellSize={14}
            mutationRate={0.04}
            interval={90}
            fadeBottom={0.6}
            color="#000000"
          />
        </div>

        <section className="py-20 md:py-28">
          <SiteContainer className="flex flex-col gap-14 md:gap-16">
            {ABOUT.proof.map((row) => (
              <div key={row.label}>
                <p className={labelClassName} data-not-typeset>
                  {row.label}
                </p>
                <div
                  className="not-typeset mt-4 overflow-hidden border border-black/10"
                  data-not-typeset
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4">
                  {row.items.map((item) => (
                    <article
                      key={item.name}
                      className="flex aspect-[5/3] flex-col text-[#5D524B] shadow-[1px_1px_0_0_rgba(0,0,0,0.08)]"
                    >
                      <div className="flex flex-1 items-center justify-center px-10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="h-8 w-auto max-w-[11rem] object-contain object-center md:h-9"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3 px-4 pb-3.5">
                        {Array.isArray(item.short) ? (
                          <p className="!m-0 flex min-w-0 items-center gap-2.5 font-sans text-[13px] font-medium tracking-[-0.02em]">
                            {item.short.map((line) => (
                              <span key={line} className="whitespace-nowrap">
                                {line}
                              </span>
                            ))}
                          </p>
                        ) : (
                          <p className="!m-0 min-w-0 truncate font-sans text-[13px] font-medium tracking-[-0.02em]">
                            {item.short}
                          </p>
                        )}
                        <span className="shrink-0 rounded-full border border-black/10 bg-black/[0.03] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] tracking-[-0.02em] text-[#5D524B]/55">
                          {row.label}
                        </span>
                      </div>
                    </article>
                  ))}
                  </div>
                </div>
                {"note" in row ? (
                  <p className="!mt-3 text-[13px] text-[#5D524B]/45">{row.note}</p>
                ) : null}
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
            <div className="mt-12 grid grid-cols-1 border-x border-b border-black/15 md:mt-16 md:grid-cols-3">
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
                      className="size-full object-cover grayscale"
                    />
                  </div>
                  <h3 className="!mb-0 !mt-8 !text-[20px] !font-normal !leading-[1.33] !tracking-[-0.012em] text-[#5D524B] normal-case">
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
