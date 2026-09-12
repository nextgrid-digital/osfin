export type MediaCardData = {
  title: string;
  text: string;
  href: string;
  label: string;
  imgSrc: string;
  id?: string;
};
/** A card with media + heading. */
export default function MediaCard({ d }: { d: MediaCardData }) {
  return (
    <section id={d.id} className="min-h-201.5 flex sticky top-0 pt-12.5 justify-center overflow-clip bg-background max-md:min-h-[42.6875rem] max-md:relative max-md:bottom-0 max-md:inset-x-0 max-md:pb-[2.8125rem] max-md:pt-0 md:max-lg:min-h-[31.2rem] 2xl:min-h-271.5">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <hr className="w-full border-t border-solid border-t-color-002 block mb-[2.8125rem] col-start-2 [grid-column-end:-2] overflow-hidden h-px" />
        {" "}
        <div className="flex justify-between col-start-2 [grid-column-end:-2] max-md:flex-col-reverse">
          <div className="flex flex-col basis-1/3 max-lg:basis-[45%]">
            <h3 className="block mb-7.5 text-[3.4375rem] [font-weight:420] leading-[3.4375rem] tracking-[-1.1px] [font-feature-settings:'calt'] max-md:text-[2rem] max-md:leading-8 max-md:tracking-[-0.64px] md:max-lg:text-[2.5rem] md:max-lg:leading-10 md:max-lg:tracking-[-0.8px]" data-component="heading">
              {d.title}
            </h3>
            {" "}
            <span className="w-[70%] block max-w-[39.75rem] mb-7.5 [font-weight:358] leading-[1.375rem] tracking-[0.32px] max-md:w-full max-lg:max-w-[37.2625rem] max-lg:text-[0.9375rem] max-lg:leading-[1.3125rem] max-lg:tracking-[0.3px]">
              {d.text}
            </span>
            {" "}
            <div className="block">
              <a className="inline-flex relative z-0 items-center gap-2.5 overflow-clip [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase whitespace-nowrap text-nowrap cursor-pointer h-[2.8125rem]" data-component="link" aria-disabled="false" href={d.href}>
                <span className="border border-solid border-border flex relative z-0 rounded-full justify-center items-center overflow-clip aspect-square h-[2.8125rem]">
                  {" "}
                  <span className="w-[2.6875rem] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-foreground [scale:0_1]" />
                  {" "}
                  <svg className="w-[0.9375rem] h-[0.9375rem] block overflow-hidden align-middle focus:outline-clr-11 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" aria-hidden="true" height="15" role="presentation" width="15" fill="currentColor">
                    <use xlinkHref="/sprite.svg#arrow-forward" />
                  </svg>
                  {" "}
                </span>
                {" "}
                <span className="block">
                  {d.label}
                </span>
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div className="h-177.5 flex justify-center shrink-0 basis-1/2 overflow-clip aspect-[5/6] max-h-[calc(100vh-(--spacing(18)))] max-md:h-82.5 max-md:mb-7.5 max-md:basis-[initial] max-md:aspect-square md:max-lg:h-[25.2rem] 2xl:h-247.5">
            <div className="w-187.5 max-w-full block shrink-0 max-md:w-[25.6375rem] md:max-lg:w-105 2xl:w-[1031.3px]">
              <img className="w-187.5 h-225 block max-w-full overflow-clip aspect-[auto_900/1080] align-middle max-md:w-102.5 max-md:h-123 md:max-lg:w-105 md:max-lg:h-126 2xl:w-[64.4375rem] 2xl:h-309.5" data-component="image" alt="Abstract visual placeholder" height="1080" src={d.imgSrc} width="900" />
              {" "}
            </div>
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
