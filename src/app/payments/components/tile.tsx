export type TileData = {
  text: string;
  description: string;
};
/** A content tile. */
export default function Tile({ d }: { d: TileData }) {
  return (
    <div className="border-b border-solid border-b-color-002 flex pb-5 flex-col gap-5">
      <div className="flex items-start gap-[0.3125rem]">
        <span className="block text-6xl [font-weight:335] leading-[3.5625rem] tracking-[-1.8px] [font-feature-settings:'calt'] md:text-[5rem] md:leading-19 md:tracking-[-2.4px] xl:text-[7.5rem] xl:leading-28.5 xl:tracking-[-3.6px]">
          {d.text}
        </span>
        {"  "}
      </div>
      {" "}
      <p className="block text-[0.8125rem] [font-weight:358] leading-[1.125rem] tracking-[0.26px]">
        {d.description}
      </p>
      {" "}
    </div>
  );
}
