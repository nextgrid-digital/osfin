import type { Industry } from "../content/industries";
import IndustryHeroCarousel from "./IndustryHeroCarousel";
import IndustryTabs from "./IndustryTabs";
import SectionHeading from "./SectionHeading";
import SiteClose from "./SiteClose";
import SiteContainer from "./SiteContainer";

export default function IndustryTemplate({ industry }: { industry: Industry }) {
  return (
    <div
      data-transition="container"
      data-namespace="industry"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-[#5D524B]"
    >
      <main className="pt-14 md:pt-16">
        <SiteContainer className="pt-8 md:pt-10">
          <h1 className="mx-auto max-w-full text-center">
            <span className="block">One operating record</span>
            <span className="block">for every industry.</span>
          </h1>

          <IndustryTabs currentId={industry.id} />

          <SectionHeading
            className="mt-4 pt-4 pb-0 md:mt-6 md:pt-6 md:pb-0 [&_h3]:py-1"
            title={industry.label}
            titleAs="h3"
            aside={industry.summary}
            cta={null}
          />

          <IndustryHeroCarousel currentId={industry.id} />
        </SiteContainer>

        <SiteContainer className="pb-28 md:pb-36">
          <section className="mt-24 md:mt-32">
            <p
              className="not-typeset !m-0 text-left !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-[#5D524B]/45 uppercase"
              data-not-typeset
            >
              Capabilities
            </p>
            <div className="mt-8 border-t border-black/10">
              {industry.useCases.map((item, index) => (
                <div
                  key={item.title}
                  className="grid grid-cols-1 items-start gap-4 border-b border-black/10 py-10 md:grid-cols-[2.75rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-x-10"
                >
                  <span
                    className="not-typeset pt-1.5 !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-[#5D524B]/45 uppercase"
                    data-not-typeset
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="!mb-0 !mt-0 text-[#5D524B]">{item.title}</h3>
                  <p className="!mt-0 text-[#5D524B]/60">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        </SiteContainer>
      </main>
      <SiteClose />
    </div>
  );
}
