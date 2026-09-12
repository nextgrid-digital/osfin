export type MediaLinkData = {
  href: string;
  srcSet: string;
  imgSrc: string;
  label: string;
  label2: string;
};
/** A linked media tile. */
export default function MediaLink({ d }: { d: MediaLinkData }) {
  return (
    <a className="flex relative min-w-[min(100%,_330px)] p-7.5 flex-col gap-7.5 text-background bg-color-001 cursor-pointer aspect-square hover:bg-clr-8" data-component="link" aria-disabled="false" href={d.href}>
      <div className="w-22.5 h-22.5 block">
        <picture className="inline">
          {" "}
          <source className="inline" sizes="(max-width: 180px) 100vw, 180px" srcSet={d.srcSet} />
          {" "}
          <img className="w-22.5 h-22.5 block max-w-45 overflow-clip aspect-square align-middle text-clr-0 bg-cover [background-position:50%_50%] bg-no-repeat" data-component="image" alt="Abstract visual placeholder" sizes="(max-width: 180px) 100vw, 180px" src={d.imgSrc} />
          {" "}
        </picture>
        {" "}
      </div>
      {" "}
      <div className="flex mt-[107.3px] justify-between items-end gap-5 max-md:mt-[44.3px] md:max-lg:mt-[2.875rem] 2xl:mt-[7.4375rem]">
        <div className="flex pb-[0.3125rem] flex-col gap-5">
          <span className="block text-2xl [font-weight:420] leading-[1.625rem] tracking-[-0.48px] [font-feature-settings:'calt'] max-md:text-[1.375rem] max-md:leading-[1.5rem] max-md:tracking-[-0.44px] md:max-lg:text-[1.4375rem] md:max-lg:leading-[1.5625rem] md:max-lg:tracking-[-0.46px]">
            {d.label}
          </span>
          {" "}
          <span className="overflow-hidden text-[0.8125rem] [font-weight:358] leading-[1.125rem] tracking-[0.26px] line-clamp-3">
            {d.label2}
          </span>
          {" "}
        </div>
        {" "}
        <span className="border border-solid border-surface flex relative z-0 rounded-full justify-center items-center overflow-clip aspect-square h-[2.8125rem]">
          {" "}
          <span className="w-[2.6875rem] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-background [scale:0_1]" />
          {" "}
          <svg className="w-[0.9375rem] h-[0.9375rem] block overflow-hidden align-middle focus:outline-clr-11 focus:[outline-style:auto] focus:outline-[5px]" data-component="icon" aria-hidden="true" height="15" role="presentation" width="15" fill="currentColor">
            <use xlinkHref="/sprite.svg#arrow-forward" />
          </svg>
          {" "}
        </span>
        {" "}
      </div>
    </a>
  );
}
