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
              className="not-typeset !m-0 max-w-[18em] font-[family-name:var(--font-season)] text-[clamp(2rem,4.4vw,56px)] leading-[1.12] font-normal tracking-[-0.02em] text-[#5D524B]"
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
            {ABOUT.proof.map((row) => {
              const columns = row.names.length % 4 === 0 ? 4 : row.names.length % 3 === 0 ? 3 : 4;
              return (
              <div key={row.label}>
                <p className={labelClassName} data-not-typeset>
                  {row.label}
                </p>
                <div
                  className={`not-typeset mt-4 grid grid-cols-2 border border-black/10 ${
                    columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
                  }`}
                  data-not-typeset
                >
                  {row.names.map((name) => (
                    <div
                      key={name}
                      className={`flex min-h-24 items-center justify-center border-black/10 px-4 py-6 text-center font-sans text-[15px] font-medium tracking-[-0.02em] text-balance text-[#5D524B] not-last:border-b max-lg:[&:nth-child(odd)]:border-r lg:min-h-28 lg:not-last:border-b-0 ${
                        columns === 3
                          ? "lg:[&:not(:nth-child(3n))]:border-r lg:[&:nth-child(n+4)]:border-t"
                          : "lg:[&:not(:nth-child(4n))]:border-r lg:[&:nth-child(n+5)]:border-t"
                      }`}
                    >
                      {name}
                    </div>
                  ))}
                </div>
                {"note" in row ? (
                  <p className="!mt-3 text-[13px] text-[#5D524B]/45">{row.note}</p>
                ) : null}
              </div>
              );
            })}
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
                  <h3 className="!mb-0 !mt-8 !text-[22px] !font-normal !leading-[1.25] !tracking-normal text-[#5D524B] normal-case md:!text-[24px]">
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
