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
  "not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] leading-none font-medium tracking-[-0.02em] text-black/45";
const labelClassName = `${essayLabelClassName} uppercase`;

export default function AboutPage() {
  return (
    <div
      data-transition="container"
      data-namespace="about"
      className="site-shell typeset typeset-docs min-h-screen bg-white text-[rgba(0,0,0,0.875)]"
    >
      <main className="pt-14 md:pt-16">
        <section className="pt-16 pb-12 md:pt-28 md:pb-20">
          <SiteContainer>
            <p
              className="not-typeset !m-0 max-w-[18em] font-[family-name:var(--font-season)] text-[clamp(2rem,4.4vw,56px)] leading-[1.12] font-normal tracking-[-0.02em] text-[rgba(0,0,0,0.875)]"
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

        <section className="py-24 md:py-36">
          <SiteContainer className="flex flex-col gap-20 md:gap-32">
            {ABOUT.essays.map((essay) => (
              <div key={essay.label} className="grid gap-5 md:grid-cols-12 md:gap-8">
                <h2 className={`${essayLabelClassName} md:col-span-4`} data-not-typeset>
                  {essay.label}
                </h2>
                <div className="max-w-[38rem] md:col-span-7 md:col-start-6">
                  <p className="!mt-0 text-black/65">{essay.body}</p>
                  {"closer" in essay ? (
                    <p className="text-[15px] text-black/45">{essay.closer}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </SiteContainer>
        </section>

        <section className="py-20 md:py-28">
          <SiteContainer className="flex flex-col gap-14 md:gap-16">
            {ABOUT.proof.map((row) => (
              <div key={row.label}>
                <p className={labelClassName} data-not-typeset>
                  {row.label}
                </p>
                <div className="not-typeset mt-4 grid grid-cols-2 border border-black/10 lg:grid-cols-4" data-not-typeset>
                  {row.names.map((name) => (
                    <div
                      key={name}
                      className="flex min-h-24 items-center justify-center border-black/10 px-4 py-6 text-center font-sans text-[15px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.875)] not-last:border-b lg:min-h-28 lg:not-last:border-b-0 lg:[&:not(:nth-child(4n))]:border-r max-lg:[&:nth-child(odd)]:border-r"
                    >
                      {name}
                    </div>
                  ))}
                </div>
                {"note" in row ? (
                  <p className="!mt-3 text-[13px] text-black/45">{row.note}</p>
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
                  <h3 className="!mb-0 !mt-8 !text-[22px] !font-normal !leading-[1.25] !tracking-normal text-[rgba(0,0,0,0.875)] normal-case md:!text-[24px]">
                    {city.name}
                  </h3>
                  <div
                    className="mt-auto flex !flex-row items-start gap-2 pt-12 text-[14px] leading-5 text-black/55"
                    data-not-typeset
                  >
                    <span className="shrink-0 font-[family-name:var(--font-mono)] uppercase tracking-[-0.02em]">
                      {city.role}
                    </span>
                    <span className="mt-[0.55em] inline-block size-1 shrink-0 bg-current" aria-hidden />
                    <span className="min-w-0 flex-1 font-sans font-normal tracking-normal">
                      {city.detail}
                    </span>
                  </div>
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
