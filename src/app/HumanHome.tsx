import { TextReveal } from "@/components/ui/cascade-text";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import MetalLapJoint from "@/components/MetalLapJoint";
import { POSTS } from "../content/posts";
import HomePlatformMotion from "./HomePlatformMotion";
import PlatformGlyphField from "./PlatformGlyphField";
import PlatformSplit from "./PlatformSplit";
import ProductionHairline from "./ProductionHairlines";
import SiteContainer from "./SiteContainer";
import SiteFooter from "./SiteFooter";
import TransitionLink from "./TransitionLink";

function BtnPrimary({ href, children }: { href: string; children: string }) {
  return (
    <TextReveal
      href={href}
      text={children}
      className="btn-primary not-typeset inline-flex h-10 items-center rounded-none bg-black px-5 text-[13px] font-medium text-white transition hover:opacity-90"
      data-not-typeset=""
    />
  );
}

function BtnSecondary({ href, children }: { href: string; children: string }) {
  return (
    <TextReveal
      href={href}
      text={children}
      className="btn-secondary not-typeset inline-flex h-10 items-center rounded-none border border-black/15 bg-transparent px-5 text-[13px] font-medium text-[rgba(0,0,0,0.875)] transition hover:bg-black/5"
      data-not-typeset=""
    />
  );
}

function HomePlatform() {
  return (
    <HomePlatformMotion>
      <SiteContainer>
        <PlatformSplit
          flank
          copy={
            <h3 className="mx-auto !mb-0 !mt-0 max-w-xl text-center !font-normal !leading-[1.2] text-[rgba(0,0,0,0.875)]">
              <span className="block" data-platform-line="">
                Every payment creates context:
              </span>
              <span className="block" data-platform-line="">
                records, policies, exceptions, and decisions that generic AI cannot reliably connect.
              </span>
              <span className="mt-8 block" data-platform-line="">
                Osfin enables agentic financial operations intelligence that understands this context,
                coordinates agentic workflows, and turns every exception into
              </span>
              <span className="block" data-platform-line="">
                a clearer next action.
              </span>
            </h3>
          }
          flankStart={<PlatformGlyphField seed={2} />}
          visual={<PlatformGlyphField seed={11} />}
        />
      </SiteContainer>
    </HomePlatformMotion>
  );
}

export default function HumanHome() {
  return (
    <div className="site-shell typeset typeset-docs min-h-screen bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]">
      <main className="pt-14 md:pt-16">
        {/* Hero: copy left, image right — vertically centered in viewport below header */}
        <section className="hero-section relative flex min-h-[calc(100svh-3.5rem)] items-center bg-[#E4E4E4] md:min-h-[calc(100svh-4rem)]">
          <SiteContainer className="relative z-10 w-full">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
              <div className="flex w-full flex-col items-start text-left lg:w-max lg:shrink-0">
                <h1 className="text-[rgba(0,0,0,0.875)]">
                  <KineticTextReveal
                    text={"Architecting agentic\ntransactional intelligence"}
                    splitBy="lines"
                    startOnView
                    maskClassName="w-max shrink-0 whitespace-nowrap"
                    className="max-w-none justify-start"
                  />
                </h1>
                <p className="mt-8 max-w-[36rem] text-black/60 md:mt-10">
                  Osfin partners with the most ambitious enterprises to design
                  and operationalize agentic transactional intelligence. We do this by forward-deploying our
                  teams of engineers who own the outcome, and deploying purpose-built products customized to how
                  they move money.
                </p>
                <div
                  className="not-typeset mt-10 flex flex-wrap items-center justify-start gap-3 md:mt-12"
                  data-not-typeset
                >
                  <BtnPrimary href="#changelog">See how it works</BtnPrimary>
                  <BtnSecondary href="#contact">Talk to Sales</BtnSecondary>
                </div>
              </div>
              <div className="aspect-[4/3] w-full min-w-0 overflow-hidden lg:flex-1">
                <MetalLapJoint
                  background="transparent"
                  distance={11}
                  style={{ minWidth: 0, minHeight: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </SiteContainer>
        </section>

        <HomePlatform />

        <section className="py-28 md:py-40">
          <SiteContainer>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
              <div className="flex w-max max-w-full flex-col gap-4">
                <p
                  className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
                  data-not-typeset
                >
                  Built for production
                </p>
                <h2 className="!mb-0 !mt-0 w-max max-w-none text-left !text-[42px] !leading-[1.15] !font-normal tracking-[-0.02em] text-[rgba(0,0,0,0.875)]">
                  <span className="block whitespace-nowrap">Transaction integrity.</span>
                  <span className="block whitespace-nowrap">Institution wide control.</span>
                </h2>
              </div>
              <p className="!mb-0 !mt-0 max-w-[26rem] !text-[16px] !leading-[1.45] text-black">
                A consistent view of transaction integrity across banking,
                payments, and settlement, with governed exceptions and clear
                exposures before financial close.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 border-x border-y border-black/15 md:mt-10 md:grid-cols-3">
              {(
                [
                  {
                    fig: "FIG 0.1",
                    title: "Reconciled with context",
                    figure: "slow" as const,
                    body: [
                      "Connect ledger, payment, and settlement records",
                      "to distinguish timing differences from genuine breaks.",
                    ],
                  },
                  {
                    fig: "FIG 0.2",
                    title: "Resolved with accountability",
                    figure: "turntable" as const,
                    body: [
                      "Guide AI assisted exception investigation with",
                      "clear ownership and governed approvals.",
                    ],
                  },
                  {
                    fig: "FIG 0.3",
                    title: "Closed with confidence",
                    figure: "riffle" as const,
                    body: [
                      "See unresolved exposures and outstanding",
                      "dependencies before completing financial close.",
                    ],
                  },
                ] as const
              ).map((column, index) => (
                <div
                  key={column.fig}
                  className={`flex min-w-0 flex-col border-black/15 px-8 py-8 md:py-10 ${
                    index > 0
                      ? "border-t md:border-t-0 md:border-l"
                      : "md:border-l md:border-l-transparent"
                  }`}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6]">
                    <ProductionHairline figure={column.figure} />
                    <p className="not-typeset absolute top-0 left-0 z-10 !m-0 font-[family-name:var(--font-mono)] text-[14px] leading-5 tracking-[-0.02em] text-black/55 uppercase">
                      {column.fig}
                    </p>
                  </div>
                  <h3 className="!mb-0 !mt-8 !text-[22px] !font-normal !leading-[1.25] !tracking-normal text-[rgba(0,0,0,0.875)] normal-case md:!text-[24px]">
                    {column.title}
                  </h3>
                  <p className="!mb-0 !mt-3 text-[16px] leading-6 text-black">
                    {column.body[0]}
                    <br />
                    {column.body[1]}
                  </p>
                </div>
              ))}
            </div>
          </SiteContainer>
        </section>

        {/* Changelog */}
        <section id="changelog" className="py-28 md:py-40">
          <SiteContainer>
            <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-5">
              <h2 className="!mb-0 !mt-0 text-[rgba(0,0,0,0.875)]">From the frontier</h2>
              <TransitionLink
                href="/blog"
                className="not-typeset mb-1 inline-flex shrink-0 items-center gap-2 font-[family-name:var(--font-mono)] text-[15px] tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase no-underline hover:no-underline"
                data-not-typeset
              >
                <span className="underline underline-offset-4">View all</span>
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
              </TransitionLink>
            </div>
            <div className="grid grid-cols-1 border-x border-b border-black/15 md:grid-cols-3">
              {POSTS.slice(0, 3).map((post, index) => (
                <TransitionLink
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`not-typeset flex flex-col border-black/15 px-8 py-8 no-underline hover:no-underline md:py-10 ${
                    index > 0
                      ? "border-t md:border-t-0 md:border-l"
                      : "md:border-l md:border-l-transparent"
                  }`}
                  data-not-typeset
                >
                  <div className="aspect-[16/10] w-full overflow-hidden border border-black/15 bg-black/[0.03]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.cover} alt="" className="size-full object-cover" />
                  </div>
                  <h3 className="!mb-0 !mt-8 !text-[22px] !font-normal !leading-[1.25] !tracking-normal text-[rgba(0,0,0,0.875)] normal-case md:!text-[24px]">
                    {post.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-12">
                    <p className="!m-0 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[14px] leading-5 tracking-[-0.02em] text-black/55 uppercase">
                      <span>{post.category}</span>
                      <span className="inline-block size-1 bg-current" aria-hidden />
                      <span>{post.date}</span>
                    </p>
                    <span className="inline-flex size-8 shrink-0 items-center justify-center border border-black/15 text-black/55">
                      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                        <path
                          d="M4 12 12 4M6 4h6v6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        />
                      </svg>
                    </span>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </SiteContainer>
        </section>

        {/* Bottom CTA */}
        <section className="pb-20 md:pb-28">
          <SiteContainer>
            <div className="rounded-none bg-white px-6 py-20 text-center md:py-28">
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
