import type { Metadata } from "next";
import { ABOUT } from "../../content/about";
import { ColorGridField } from "../ProductSheet";
import SiteContainer from "../SiteContainer";
import SiteFooter from "../SiteFooter";

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
      className="site-shell typeset typeset-docs min-h-screen bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]"
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

        <ColorGridField />

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

        <section className="pb-8 md:pb-12">
          <SiteContainer>
            <p className={labelClassName} data-not-typeset>
              {ABOUT.who.label}
            </p>
            <h2 className="!mt-6 max-w-[14em] md:!mt-8">{ABOUT.who.title}</h2>

            <div className="mt-16 flex flex-col gap-16 md:mt-24 md:flex-row md:items-start md:gap-16 lg:gap-24">
              {ABOUT.who.columns.map((column) => (
                <div key={column.index} className="flex min-w-0 flex-1 flex-col items-start">
                  <div className="not-typeset flex items-center gap-3" data-not-typeset>
                    <span className="inline-flex h-6 min-w-7 items-center justify-center border border-black/15 px-1.5 font-[family-name:var(--font-mono)] text-[11px] tracking-[-0.02em] text-black/55">
                      {column.index}
                    </span>
                  </div>
                  <h3 className="!mb-0 !mt-6 !font-[family-name:var(--font-season)] !text-[clamp(1.75rem,6.2vw,48px)] !leading-[1.15] !font-normal text-[rgba(0,0,0,0.875)]">
                    {column.title}
                  </h3>
                  <p className="!mb-0 !mt-10 text-[15px] leading-6 text-black/55">{column.body}</p>
                  {column.index === "01" ? (
                    <p className="!mb-0 !mt-6 text-[15px] leading-6 text-black/55">
                      {column.points.join(" → ")}
                    </p>
                  ) : (
                    <ul className="not-typeset mt-6 space-y-2.5 text-[15px] leading-6 text-black/55" data-not-typeset>
                      {column.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-black/50" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
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
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className={labelClassName} data-not-typeset>
                  {ABOUT.places.label}
                </p>
                <h2 className="!mt-5 max-w-[12em] md:!mt-6">{ABOUT.places.title}</h2>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4 lg:col-span-8">
                {ABOUT.places.cities.map((city) => (
                  <figure key={city.name} className="not-typeset !m-0" data-not-typeset>
                    <div className="aspect-square overflow-hidden bg-black/[0.04]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={city.image} alt={city.imageAlt} className="size-full object-cover" />
                    </div>
                    <figcaption className="mt-3">
                      <p className="!m-0 font-sans text-[15px] font-medium text-[rgba(0,0,0,0.875)]">
                        {city.name}
                      </p>
                      <p className="!m-0 mt-0.5 font-sans text-[13px] text-black/45">{city.role}</p>
                      <p className="!m-0 mt-2 font-sans text-[13px] leading-5 text-black/55">{city.detail}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </SiteContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
