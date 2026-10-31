import MediaTile, { type MediaTileData } from "../components/media-tile";
import { MediaTile_meta } from "../ditto-meta";
import { CAREERS } from "@/content/careers";
const MediaTile_data: MediaTileData[] = CAREERS.setup.cards.map((card) => ({
  description: card.index,
  description2: card.title,
  description3: card.points.join(". ") + ".",
}));
/** Gallery Showcase section. */
export default function GalleryShowcaseSection({ mediaTileData = MediaTile_data } = {}) {
  return (
    <section className="flex relative px-18 justify-center overflow-hidden bg-[var(--header-bg)] max-md:px-3">
      <div className="border border-dashed border-color-010 block relative max-w-390 mx-auto w-full">
        <div className="h-full flex py-20 px-10 flex-col gap-10 max-md:py-16 max-md:px-3">
          <div className="w-full max-w-140 flex flex-col items-start gap-6">
            <div className="flex items-start">
              <div className="border border-dashed border-color-008 flex -mr-px py-1 px-2 justify-center items-center h-auto">
                <p className="block text-color-013 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.625rem] leading-[0.9375rem] tracking-[0.8px] uppercase whitespace-nowrap">
                  {CAREERS.setup.label}
                </p>
              </div>
            </div>
            <h2 className="block text-color-001 [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-[2.75rem] leading-11 tracking-[-1.1px] max-md:text-4xl max-md:leading-9 max-md:tracking-[-1.44px]" data-component="heading">
              {CAREERS.setup.title}
            </h2>
          </div>
          <div className="grid gap-5 grid-cols-3 max-lg:gap-3 max-lg:grid-cols-1">
            {mediaTileData.map((d, i) => <MediaTile key={i} d={d} meta={MediaTile_meta[i]} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
