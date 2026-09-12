import Icon7 from "../svgs/svg-icon7";
import MediaLink, { type MediaLinkData } from "../components/media-link";
const MediaLink_data: MediaLinkData[] = [
    { href: "#industries", srcSet: "/assets/cloned/images/b2b4d73abe84.png 90w, /assets/cloned/images/ca0dbca464da.png 135w, /assets/cloned/images/6d8951fc9c32.png 180w, /assets/cloned/images/07e6627f6d4f.png 270w, /assets/cloned/images/86566cd14a28.png 360w, /assets/cloned/images/fe7033f0fbae.png 540w, /assets/cloned/images/51b594cfcec5.png 720w", imgSrc: "/assets/cloned/images/6d8951fc9c32.png", label: " Insurance ", label2: " Connect premiums, claims, commissions and settlement data with clear ownership and evidence. " },
    { href: "#industries", srcSet: "/assets/cloned/images/d98c124a2eef.png 90w, /assets/cloned/images/9315c7adc376.png 135w, /assets/cloned/images/d0e55e659a05.png 180w, /assets/cloned/images/9da15dd44329.png 270w, /assets/cloned/images/b25dc3710124.png 360w, /assets/cloned/images/bd372d9bb376.png 540w, /assets/cloned/images/6f8d3449c7ab.png 720w", imgSrc: "/assets/cloned/images/d0e55e659a05.png", label: " Capital markets ", label2: " Validate trades, positions, cash movements and downstream accounting records. " },
    { href: "#industries", srcSet: "/assets/cloned/images/9704310db3b2.png 90w, /assets/cloned/images/e3ee1d44242b.png 135w, /assets/cloned/images/1dce8653f630.png 180w, /assets/cloned/images/daf897c828df.png 270w, /assets/cloned/images/8742b9ec9f10.png 360w, /assets/cloned/images/1712bce376c0.png 540w, /assets/cloned/images/f7068337c7db.png 720w", imgSrc: "/assets/cloned/images/1dce8653f630.png", label: " Marketplaces ", label2: " Reconcile high-frequency transactions, wallet activity, payouts and partner obligations. " },
    { href: "#industries", srcSet: "/assets/cloned/images/25027dc932c8.png 90w, /assets/cloned/images/ffae5360799b.png 135w, /assets/cloned/images/19421ac58756.png 180w, /assets/cloned/images/3537a6831e2c.png 270w, /assets/cloned/images/931a9901b063.png 360w, /assets/cloned/images/c5b8aa8b4ed7.png 540w, /assets/cloned/images/6e7cf143bb4d.png 720w", imgSrc: "/assets/cloned/images/19421ac58756.png", label: " Gaming ", label2: " Keep wallet activity, payouts and partner obligations aligned as volume grows. " },
    { href: "#approvals", srcSet: "/assets/cloned/images/8dfa5332ec70.png 90w, /assets/cloned/images/e1c94f10efcb.png 135w, /assets/cloned/images/d2e1558a0f2d.png 180w, /assets/cloned/images/b0f27603c675.png 270w, /assets/cloned/images/7cb030c3c5dd.png 360w, /assets/cloned/images/866f28c59664.png 540w, /assets/cloned/images/401462537b3e.png 720w", imgSrc: "/assets/cloned/images/d2e1558a0f2d.png", label: " Access control ", label2: " Role-based permissions, approval checkpoints and scoped actions for every exception. " },
    { href: "#workflow", srcSet: "/assets/cloned/images/4c662b06e180.png 90w, /assets/cloned/images/7e625a5f78da.png 135w, /assets/cloned/images/dc09ecd256b8.png 180w, /assets/cloned/images/def08242edc6.png 270w, /assets/cloned/images/ae84b38b63bf.png 360w, /assets/cloned/images/8111ec88ab02.png 540w, /assets/cloned/images/a85e30c0422f.png 720w", imgSrc: "/assets/cloned/images/dc09ecd256b8.png", label: " Auditability ", label2: " Activity, decisions and outcomes remain traceable from mismatch to close. " }
];
/** Gallery Showcase section. */
export default function GalleryShowcaseSection({ mediaLinkData = MediaLink_data } = {}) {
  return (
    <section className="flex relative pb-45 justify-center overflow-clip bg-background max-lg:pb-22.5">
      <div className="grid max-w-320 grid-rows-1 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <div className="grid items-start gap-2.5 col-start-2 [grid-column-end:-2] grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))] max-md:grid-cols-1">
          <a className="flex relative min-w-[min(100%,_330px)] p-7.5 flex-col gap-7.5 text-background bg-color-001 cursor-pointer aspect-square hover:bg-clr-8" data-component="link" aria-disabled="false" href="#industries">
            <div className="w-22.5 h-22.5 block">
              <picture className="inline">
                {" "}
                <source className="inline" sizes="(max-width: 180px) 100vw, 180px" srcSet="/assets/cloned/images/00f54c60e37c.png 90w, /assets/cloned/images/a0299a150cc0.png 135w, /assets/cloned/images/b436e17f65a1.png 180w, /assets/cloned/images/32e0d6a2bc8f.png 270w, /assets/cloned/images/e0de0093c5ff.png 360w, /assets/cloned/images/7496d2ec1a8e.png 540w, /assets/cloned/images/f850b4ef7c8c.png 720w" />
                {" "}
                <img className="w-22.5 h-22.5 block max-w-45 overflow-clip aspect-square align-middle text-clr-0 bg-cover [background-position:50%_50%] bg-no-repeat" data-component="image" alt="Abstract visual placeholder" sizes="(max-width: 180px) 100vw, 180px" src="/assets/cloned/images/b436e17f65a1.png" />
                {" "}
              </picture>
              {" "}
            </div>
            {" "}
            <div className="flex mt-[107.3px] justify-between items-end gap-5 max-md:mt-[44.3px] md:max-lg:mt-[2.875rem] 2xl:mt-[7.4375rem]">
              <div className="flex pb-[0.3125rem] flex-col gap-5">
                <span className="block text-2xl [font-weight:420] leading-[1.625rem] tracking-[-0.48px] [font-feature-settings:'calt'] max-md:text-[1.375rem] max-md:leading-[1.5rem] max-md:tracking-[-0.44px] md:max-lg:text-[1.4375rem] md:max-lg:leading-[1.5625rem] md:max-lg:tracking-[-0.46px]">
                  {" Data protection "}
                </span>
                {" "}
                <span className="overflow-hidden text-[0.8125rem] [font-weight:358] leading-[1.125rem] tracking-[0.26px] line-clamp-3">
                  {" Encryption, isolation and retention are handled under approved controls. Certification details appear only when independently verified. "}
                </span>
                {" "}
              </div>
              {" "}
              <span className="border border-solid border-surface flex relative z-0 rounded-full justify-center items-center overflow-clip aspect-square h-[2.8125rem]">
                {" "}
                <span className="w-[2.6875rem] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-background [scale:0_1]" />
                {" "}
                <Icon7 />
                {" "}
              </span>
              {" "}
            </div>
          </a>
          {mediaLinkData.map((d, i) => <MediaLink key={i} d={d} />)}
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </section>
  );
}
