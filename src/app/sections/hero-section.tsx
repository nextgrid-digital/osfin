import HeroCodeStrip from "../components/hero-code-strip";
/** Hero section — the page's lead block. */
export default function HeroSection() {
  return (
    <section className="h-200 min-h-screen flex relative justify-center grid-rows-1 overflow-clip bg-primary max-md:h-203 max-md:grid-rows-[1fr_203px] max-lg:min-h-0 md:max-lg:h-256 md:max-lg:grid-rows-[1fr_256px] 2xl:h-270">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <div className="flex min-w-0 items-center col-start-2 col-end-21 max-lg:[grid-column-end:-2] lg:pr-8">
          <div className="flex flex-col items-start gap-[2.8125rem] max-lg:gap-7.5">
            <h1 className="block w-full min-w-0 mt-10 text-6xl [font-weight:335] leading-[3.5625rem] tracking-[-1.8px] [font-feature-settings:'calt'] max-md:mt-[2.5375rem] md:mt-[3.2rem] md:text-[3.5rem] md:leading-[3.25rem] lg:text-[4.25rem] lg:leading-[4.05rem] lg:tracking-[-2px] xl:mt-10 2xl:mt-13.5 2xl:text-[5.625rem] 2xl:leading-[5.375rem] 2xl:tracking-[-1.8px]" data-component="heading">
              <span className="inline">
                {" "}
                <span className="block">
                  {" Match "}
                  <span className="inline-block relative max-md:block">
                    {" "}
                    <span className="w-max max-w-full block [clip-path:polygon(0px_0px,_110%_0px,_110%_200%,_0px_200%)] [animation-name:text-mask-in] [animation-duration:2s] [animation-timing-function:cubic-bezier(0.76,_0,_0.24,_1)] [animation-fill-mode:forwards] max-md:h-[3.5625rem] max-md:absolute max-md:top-0 max-md:left-0 2xl:hidden">
                      volume
                    </span>
                    {" "}
                    <span className="w-max max-w-full h-[85.5px] block absolute top-0 left-0 [translate:50px] [clip-path:polygon(110%_0px,_110%_0px,_110%_200%,_110%_200%)] [animation-name:text-mask-out-light] [animation-duration:1s] [animation-timing-function:cubic-bezier(0.76,_0,_0.24,_1)] [animation-fill-mode:forwards] max-md:h-auto max-md:static max-md:top-auto max-md:left-auto md:max-lg:h-19 2xl:w-96 2xl:h-28.5">
                      volume
                    </span>
                    <span className="hidden 2xl:w-96 2xl:block 2xl:[clip-path:polygon(0px_0px,_110%_0px,_110%_200%,_0px_200%)] 2xl:[animation-name:text-mask-in] 2xl:[animation-duration:2s] 2xl:[animation-timing-function:cubic-bezier(0.76,_0,_0.24,_1)] 2xl:[animation-fill-mode:forwards]">
                      volume
                    </span>
                  </span>
                  {" "}
                </span>
                {" "}
                <span className="block">
                  {" Govern "}
                  <span className="inline-block relative">
                    {" "}
                    <span className="w-max max-w-full block [clip-path:polygon(0px_0px,_110%_0px,_110%_200%,_0px_200%)] [animation-name:text-mask-in] [animation-duration:2s] [animation-timing-function:cubic-bezier(0.76,_0,_0.24,_1)] [animation-fill-mode:forwards] md:max-lg:h-19 md:max-lg:absolute md:max-lg:top-0 md:max-lg:left-0 2xl:hidden">
                      exceptions
                    </span>
                    {" "}
                    <span className="w-max max-w-full h-[85.5px] block absolute top-0 left-0 [translate:50px] [clip-path:polygon(110%_0px,_110%_0px,_110%_200%,_110%_200%)] [animation-name:text-mask-out-light] [animation-duration:1s] [animation-timing-function:cubic-bezier(0.76,_0,_0.24,_1)] [animation-fill-mode:forwards] max-md:h-[3.5625rem] md:max-lg:h-auto md:max-lg:static md:max-lg:top-auto md:max-lg:left-auto 2xl:w-[34.3625rem] 2xl:h-28.5">
                      exceptions
                    </span>
                    <span className="hidden 2xl:w-[34.3625rem] 2xl:block 2xl:[clip-path:polygon(0px_0px,_110%_0px,_110%_200%,_0px_200%)] 2xl:[animation-name:text-mask-in] 2xl:[animation-duration:2s] 2xl:[animation-timing-function:cubic-bezier(0.76,_0,_0.24,_1)] 2xl:[animation-fill-mode:forwards]">
                      exceptions
                    </span>
                  </span>
                  {" "}
                </span>
                {" "}
              </span>
              {" "}
            </h1>
            {" "}
            <a className="flex relative z-0 px-5 rounded-full items-center gap-2.5 overflow-clip text-background [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase whitespace-nowrap text-nowrap bg-foreground cursor-pointer h-[2.8125rem]" data-component="link" aria-disabled="false" href="#contact">
              <span className="w-[118.7px] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-color-006 [scale:0_1]" />
              {" "}
              <span className="block">
                {" Talk to the team "}
              </span>
            </a>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <HeroCodeStrip className="w-40 h-200 block col-start-21 col-end-25 text-color-001 bg-background max-lg:hidden lg:absolute lg:inset-y-0 lg:left-[calc(50%+10rem)] lg:h-auto lg:min-w-0 2xl:w-55 2xl:left-[calc(50%+13.75rem)]" />
        {" "}
        <div className="w-80 h-200 block col-start-25 col-end-[-1] max-md:w-full max-md:h-[262.7px] max-lg:col-start-1 md:max-lg:w-full md:max-lg:h-[23.3125rem] lg:absolute lg:inset-y-0 lg:left-[calc(50%+20rem)] lg:right-0 lg:w-auto lg:h-auto lg:min-w-0 2xl:left-[calc(50%+27.5rem)]" aria-hidden="true">
          <div className="h-full hidden relative isolate overflow-hidden max-lg:block">
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--foreground)_-1px_0px_0px_0px_inset]" data-ditto-id="style-div" />
            {" "}
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--accent)_-1px_0px_0px_0px_inset]" style={{ maskImage: "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")" }} data-ditto-id="style-div-2" />
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--foreground)_-1px_0px_0px_0px_inset]" style={{ maskImage: "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")" }} data-ditto-id="style-div-3" />
            {" "}
          </div>
          <div className="h-full block relative isolate overflow-hidden max-lg:hidden">
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--foreground)_-1px_0px_0px_0px_inset]" data-ditto-id="style-div-4" />
            {" "}
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--accent)_-1px_0px_0px_0px_inset]" style={{ maskImage: "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")" }} data-ditto-id="style-div-5" />
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--foreground)_-1px_0px_0px_0px_inset]" style={{ maskImage: "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")" }} data-ditto-id="style-div-6" />
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--accent)_-1px_0px_0px_0px_inset]" style={{ maskImage: "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")" }} data-ditto-id="style-div-7" />
            <div className="h-full block absolute top-0 inset-x-0 shadow-[var(--foreground)_-1px_0px_0px_0px_inset]" style={{ maskImage: "url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%3e%3ccircle%20cx='5'%20cy='5'%20r='5'%20fill='%23fff'/%3e%3c/svg%3e\")" }} data-ditto-id="style-div-8" />
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </section>
  );
}
