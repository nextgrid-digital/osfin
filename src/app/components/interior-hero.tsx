import HeroCodeStrip from "./hero-code-strip";

type InteriorHeroProps = {
  kicker: string;
  title: string;
  lede: string;
  cta: {
    href: string;
    label: string;
  };
};

/** Interior page lead — same split as the payments-clone hero. */
export default function InteriorHero({ kicker, title, lede, cta }: InteriorHeroProps) {
  return (
    <section className="h-200 min-h-screen flex relative justify-center grid-rows-1 overflow-clip bg-clr-5 max-md:h-203 max-md:grid-rows-[1fr_203px] max-lg:min-h-0 md:max-lg:h-256 md:max-lg:grid-rows-[1fr_256px] 2xl:h-270">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <div className="flex flex-col items-start self-center gap-[2.8125rem] col-start-2 col-end-19 max-lg:gap-7.5 max-lg:[grid-column-end:-2]">
          <p className="block [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase">
            {kicker}
          </p>
          <h1
            className="block text-[5.625rem] [font-weight:335] leading-[5.375rem] tracking-[-1.8px] [font-feature-settings:'calt'] max-md:text-[2.75rem] max-md:leading-[2.625rem] max-md:tracking-[-0.88px] md:max-lg:text-[3.5rem] md:max-lg:leading-[3.3125rem] md:max-lg:tracking-[-1.12px]"
            data-component="heading"
          >
            {title}
          </h1>
          <p className="w-full max-w-[34rem] block [font-weight:358] leading-[1.375rem] tracking-[0.32px] max-lg:text-[0.9375rem] max-lg:leading-[1.3125rem]">
            {lede}
          </p>
          <a
            className="flex relative z-0 px-5 rounded-full items-center gap-2.5 overflow-clip text-background [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase whitespace-nowrap text-nowrap bg-foreground cursor-pointer h-[2.8125rem]"
            data-component="link"
            href={cta.href}
          >
            <span className="w-full h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-clr-4 [scale:0_1]" />
            <span className="block">{cta.label}</span>
          </a>
        </div>
        <HeroCodeStrip className="w-80 h-200 block col-start-21 col-end-29 bg-primary max-lg:hidden lg:absolute lg:inset-y-0 lg:left-[calc(50%+10rem)] lg:h-auto lg:min-w-0 2xl:w-110 2xl:left-[calc(50%+13.75rem)]" />
        <div className="w-40 h-200 block col-start-29 col-end-[-1] max-md:w-full max-md:h-[326.7px] max-lg:col-start-1 md:max-lg:w-full md:max-lg:h-[421.3px] lg:absolute lg:inset-y-0 lg:left-[calc(50%+30rem)] lg:right-0 lg:w-auto lg:h-auto lg:min-w-0 2xl:left-[calc(50%+41.25rem)]">
          <div className="block h-full w-full" aria-hidden="true">
            <div className="h-full hidden relative isolate overflow-hidden max-lg:block">
              <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--foreground)_-1px_0px_0px_0px_inset]" />
              <div
                className="h-full block absolute top-0 inset-x-0 shadow-[var(--clr-6)_-1px_0px_0px_0px_inset]"
                style={{
                  maskImage:
                    "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")",
                }}
              />
              <div
                className="h-full block absolute top-0 inset-x-0 shadow-[var(--clr-6)_-1px_0px_0px_0px_inset]"
                style={{
                  maskImage:
                    "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")",
                }}
              />
            </div>
            <div className="h-full block relative isolate overflow-hidden max-lg:hidden">
              <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--foreground)_-1px_0px_0px_0px_inset]" />
              <div
                className="h-full block absolute top-0 inset-x-0 shadow-[var(--clr-6)_-1px_0px_0px_0px_inset]"
                style={{
                  maskImage:
                    "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")",
                }}
              />
              <div
                className="h-full block absolute top-0 inset-x-0 shadow-[var(--clr-6)_-1px_0px_0px_0px_inset]"
                style={{
                  maskImage:
                    "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
