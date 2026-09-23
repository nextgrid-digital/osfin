import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import MetalLapJoint from "@/components/MetalLapJoint";
import SectionHeading from "./SectionHeading";
import SiteContainer from "./SiteContainer";
import SiteFooter from "./SiteFooter";

const CHANGELOG = [
  {
    date: "SEP 21, 2026",
    title: "Users View",
    cover: "/changelog/cover.png",
    category: "Product",
  },
  {
    date: "MAR 12, 2026",
    title: "Introducing Consent Management",
    cover: "/changelog/cover-2.png",
    category: "Product",
  },
  {
    date: "FEB 11, 2026",
    title: "Timeline Improvements",
    cover: "/changelog/cover-3.jpg",
    category: "Research",
  },
  {
    date: "JAN 8, 2026",
    title: "Exception routing",
    cover: "/changelog/cover-4.jpg",
    category: "Research",
  },
];

function BtnPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="btn-primary not-typeset inline-flex h-10 items-center rounded-full bg-black px-5 text-[13px] font-medium text-white transition hover:opacity-90"
      data-not-typeset
    >
      {children}
    </a>
  );
}

function BtnSecondary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="btn-secondary not-typeset inline-flex h-10 items-center rounded-full border border-black/15 bg-transparent px-5 text-[13px] font-medium text-[rgba(0,0,0,0.875)] transition hover:bg-black/5"
      data-not-typeset
    >
      {children}
    </a>
  );
}

export default function HumanHome() {
  return (
    <div className="site-shell typeset typeset-docs min-h-screen bg-[#f4f4f4] text-[rgba(0,0,0,0.875)]">
      <main className="pt-14 md:pt-16">
        {/* Hero: copy left, image right — vertically centered in viewport below header */}
        <section className="hero-section relative flex min-h-[calc(100svh-3.5rem)] items-center bg-[#f4f4f4] md:min-h-[calc(100svh-4rem)]">
          <SiteContainer className="relative z-10 w-full">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start text-left">
                <h1 className="max-w-[26ch] text-[rgba(0,0,0,0.875)]">
                  <KineticTextReveal
                    text={"Architecting\nagentic transactional\nintelligence"}
                    splitBy="lines"
                    startOnView
                    className="w-full max-w-full justify-start"
                  />
                </h1>
                <p className="mt-8 max-w-[36rem] text-black/60 md:mt-10">
                  Osfin partners with ambitious financial institutions and payment companies to operationalize
                  agentic payment operations, with forward-deployed teams who own the outcome.
                </p>
                <div
                  className="not-typeset mt-10 flex flex-wrap items-center justify-start gap-3 md:mt-12"
                  data-not-typeset
                >
                  <BtnPrimary href="#changelog">See how it works</BtnPrimary>
                  <BtnSecondary href="#contact">Talk to Sales</BtnSecondary>
                </div>
              </div>
              <div className="aspect-[4/3] w-full overflow-hidden">
                <MetalLapJoint
                  background="transparent"
                  distance={11}
                  style={{ minWidth: 0, minHeight: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </SiteContainer>
        </section>

        {/* Changelog */}
        <section id="changelog" className="flex min-h-svh items-center py-28 md:py-40">
          <SiteContainer>
            <SectionHeading title="From the frontier" cta={null} />
            <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
              {CHANGELOG.map((item) => (
                <a
                  key={item.title}
                  href="#changelog"
                  className="not-typeset group flex flex-col no-underline hover:no-underline"
                  data-not-typeset
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-black/[0.03]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.cover}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 !font-sans !text-[17px] !font-medium !leading-snug !tracking-normal text-[rgba(0,0,0,0.875)] normal-case">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans text-[13px] leading-5 text-black/45">{item.category}</p>
                </a>
              ))}
            </div>
            <div className="mt-14 flex justify-center md:mt-16">
              <a
                href="#changelog"
                className="not-typeset inline-flex h-10 items-center rounded-full border border-black/15 bg-white px-5 font-sans text-[15px] font-normal normal-case tracking-normal text-[rgba(0,0,0,0.875)] transition hover:bg-black/[0.03]"
                data-not-typeset
              >
                Read more
              </a>
            </div>
          </SiteContainer>
        </section>

        {/* Bottom CTA */}
        <section className="pb-20 md:pb-28">
          <SiteContainer>
            <div className="rounded-2xl bg-white px-6 py-20 text-center md:py-28">
              <div className="mx-auto max-w-[1000px]">
                <h2>
                  Architecting agentic
                  <br />
                  payment operations
                </h2>
                <div className="not-typeset mt-10 flex justify-center" data-not-typeset>
                  <BtnPrimary href="#signup">Talk to Sales</BtnPrimary>
                </div>
              </div>
            </div>
          </SiteContainer>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
