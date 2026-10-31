import GatewayFlow from "@/components/ui/gateway-flow";
import { TextReveal } from "@/components/ui/cascade-text";
import MetalLapJoint from "@/components/MetalLapJoint";
import { POSTS } from "../content/posts";
import HomeSecurity from "./HomeSecurity";
import HomeCaseStudies from "./HomeCaseStudies";
import HomeIndustries from "./HomeIndustries";
import HomeProduction from "./HomeProduction";
import ColorStrip from "./ColorStrip";
import HomeVision from "./HomeVision";
import SiteClose from "./SiteClose";
import SiteContainer from "./SiteContainer";
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

export default function HumanHome() {
  return (
    <div className="site-shell typeset typeset-docs min-h-screen bg-background text-[#5D524B]">
      <main className="pt-14 md:pt-16">
        {/* Hero: copy left, image right — vertically centered in viewport below header */}
        <section className="hero-section relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden bg-background md:min-h-[calc(100svh-4rem)]">
          <GatewayFlow
            mode="light"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />
          {/* Same line field as the close, flipped so it sits at the bottom. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: [
                "radial-gradient(ellipse 42% 48% at 50% 48%, color-mix(in srgb, var(--background) 72%, transparent) 0%, color-mix(in srgb, var(--background) 42%, transparent) 45%, color-mix(in srgb, var(--background) 12%, transparent) 70%, transparent 88%)",
                "linear-gradient(to top, transparent 0%, transparent 18%, color-mix(in srgb, var(--background) 12%, transparent) 42%, color-mix(in srgb, var(--background) 45%, transparent) 72%, var(--background) 94%)",
              ].join(", "),
              maskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          />
          <SiteContainer className="relative z-10 w-full">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
              <div className="relative flex w-full flex-col items-start text-left lg:w-max lg:shrink-0">
                {/* Wash the top-left field through the button row. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-[50vw] -top-[100vh] -bottom-8 z-[-1] w-[calc(100%+50vw)]"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--background) 0%, var(--background) calc(100% - 5rem), transparent 100%)",
                    maskImage:
                      "linear-gradient(to right, #000 0%, #000 calc(100% - 8rem), transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, #000 0%, #000 calc(100% - 8rem), transparent 100%)",
                  }}
                />
                <h1 className="text-[#5D524B]">
                  <span className="block">Orchestrating Transformation</span>
                  <span className="block">in Finance Operations</span>
                </h1>
                <p className="mt-8 max-w-[36rem] text-[#5D524B] md:mt-10">
                  Osfin partners with the most ambitious enterprises and leaders to drive transformation in finance
                  operations. We do this by deploying our teams of forward-deployed engineers and purpose-built agents
                  who own the outcome and act as a catalyst for change across your finance, accounting and payments
                  functions.
                </p>
                <div
                  className="not-typeset mt-10 flex flex-wrap items-center justify-start gap-3 md:mt-12"
                  data-not-typeset
                >
                  <BtnPrimary href="/#contact">Get in touch</BtnPrimary>
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

        <ColorStrip />

        <HomeVision />

        <HomeProduction />

        <HomeIndustries />

        <HomeCaseStudies />

        <HomeSecurity />

        {/* Changelog */}
        <section id="changelog" className="pt-28 pb-0 md:pt-40">
          <SiteContainer>
            <div className="flex items-end justify-between gap-6 border-b border-black/15 pb-5">
              <h2 className="!mb-0 !mt-0 text-[#5D524B]">From the frontier</h2>
              <TransitionLink
                href="/blog"
                className="not-typeset mb-1 inline-flex shrink-0 items-center gap-2 font-[family-name:var(--font-mono)] text-[15px] tracking-[-0.02em] text-[#5D524B] uppercase no-underline hover:no-underline"
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
                  <h3 className="!mb-0 !mt-8 !text-[22px] !font-normal !leading-[1.25] !tracking-normal text-[#5D524B] normal-case md:!text-[24px]">
                    {post.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-12">
                    <p className="!m-0 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[14px] leading-5 tracking-[-0.02em] text-[#5D524B]/55 uppercase">
                      <span>{post.category}</span>
                      <span className="inline-block size-1 bg-current" aria-hidden />
                      <span>{post.date}</span>
                    </p>
                    <span className="inline-flex size-8 shrink-0 items-center justify-center border border-black/15 text-[#5D524B]/55">
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

      </main>

      <SiteClose />
    </div>
  );
}
