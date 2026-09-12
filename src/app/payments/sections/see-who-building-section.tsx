import Tile2, { type Tile2Data } from "../components/tile2";
import { Tile2_styles } from "../_styles";
const Tile2_data: Tile2Data[] = [
    {  },
    {  },
    {  },
    {  },
    {  }
];
/** See Who Building section. */
export default function SeeWhoBuildingSection({ tile2Data = Tile2_data } = {}) {
  return (
    <section className="flex relative py-45 justify-center overflow-clip bg-background max-lg:py-25">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <marquee-ticker class="w-320 flex flex-nowrap col-span-full overflow-x-clip text-6xl [font-weight:335] leading-[3.5625rem] tracking-[-1.8px] whitespace-nowrap [text-wrap:nowrap_pretty] [font-feature-settings:'calt'] max-md:w-[23.4375rem] md:w-192 md:text-[5rem] md:leading-19 md:tracking-[-2.4px] xl:w-320 xl:text-[7.5rem] xl:leading-28.5 xl:tracking-[-3.6px] 2xl:w-480 2xl:-ml-20 hover:[&>*]:[animation-play-state:paused]">
          <h2 className="w-max max-w-none shrink-0 block whitespace-nowrap [animation-name:marquee-rtl] [animation-duration:27.8459s] [animation-timing-function:linear] [animation-iteration-count:infinite] max-md:[animation-duration:13.9231s] md:max-lg:[animation-duration:18.5641s]" data-component="heading">
            {" Fetch · Match · Trace · Resolve · Guard · Close"}
            <span className="inline px-[1.85rem] max-md:px-[0.925rem] md:max-lg:px-5" aria-hidden="true" role="separator">
              ·
            </span>
            {" "}
          </h2>
          {tile2Data.map((d, i) => <Tile2 key={i} d={d} styles={Tile2_styles[i]} />)}
          {" "}
        </marquee-ticker>
        {" "}
      </div>
      {" "}
    </section>
  );
}
