import MediaTile2, { type MediaTile2Data } from "../components/media-tile2";
import { MediaTile2_meta } from "../ditto-meta";
import { MediaTile2_styles } from "../_styles";
import { CAREERS } from "@/content/careers";
const BELIEF_ICONS = [
    { imgSrc: "/ditto-careers/assets/cloned/svg/919b7c4fcff6.svg", srcSet: "/ditto-careers/assets/cloned/svg/919b7c4fcff6.svg 1x, /ditto-careers/assets/cloned/svg/919b7c4fcff6.svg 2x" },
    { imgSrc: "/ditto-careers/assets/cloned/svg/9907cc46bd64.svg", srcSet: "/ditto-careers/assets/cloned/svg/9907cc46bd64.svg 1x, /ditto-careers/assets/cloned/svg/9907cc46bd64.svg 2x" },
    { imgSrc: "/ditto-careers/assets/cloned/svg/2a42917c6924.svg", srcSet: "/ditto-careers/assets/cloned/svg/2a42917c6924.svg 1x, /ditto-careers/assets/cloned/svg/2a42917c6924.svg 2x" },
    { imgSrc: "/ditto-careers/assets/cloned/svg/63c731e210c2.svg", srcSet: "/ditto-careers/assets/cloned/svg/63c731e210c2.svg 1x, /ditto-careers/assets/cloned/svg/63c731e210c2.svg 2x" },
    { imgSrc: "/ditto-careers/assets/cloned/svg/8a0b03383e29.svg", srcSet: "/ditto-careers/assets/cloned/svg/8a0b03383e29.svg 1x, /ditto-careers/assets/cloned/svg/8a0b03383e29.svg 2x" },
    { imgSrc: "/ditto-careers/assets/cloned/svg/9a89fbe95631.svg", srcSet: "/ditto-careers/assets/cloned/svg/9a89fbe95631.svg 1x, /ditto-careers/assets/cloned/svg/9a89fbe95631.svg 2x" }
];
const MediaTile2_data: MediaTile2Data[] = CAREERS.beliefs.items.map((item, i) => ({
    ...BELIEF_ICONS[i],
    description: item.index,
    description2: item.title,
    description3: item.body,
}));
/** Gallery Showcase section. */
export default function GalleryShowcaseSection2({ mediaTile2Data = MediaTile2_data } = {}) {
  return (
    <section className="flex py-30 px-18 justify-center bg-color-012 max-md:py-16 max-md:px-6 md:max-lg:py-24">
      <div className="flex max-w-390 flex-col items-center gap-10 mx-auto w-full">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-start">
            <div className="border border-dashed border-surface-3 flex -mr-px py-1 px-2 justify-center items-center h-auto">
              <p className="block text-color-002 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.625rem] leading-[0.9375rem] tracking-[0.8px] uppercase">
                Values
              </p>
            </div>
          </div>
          <h2 className="block text-foreground [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-[2.75rem] leading-11 tracking-[-1.1px] whitespace-nowrap max-md:text-4xl max-md:leading-9 max-md:tracking-[-1.44px]" data-ditto-id="motion-heading" data-component="heading">
            {CAREERS.beliefs.title}
          </h2>
        </div>
        <div className="border border-dashed border-color-009 grid w-full grid-cols-3 max-md:grid-cols-1 md:max-lg:grid-cols-2">
          {mediaTile2Data.map((d, i) => <MediaTile2 key={i} d={d} meta={MediaTile2_meta[i]} styles={MediaTile2_styles[i]} />)}
        </div>
      </div>
    </section>
  );
}
