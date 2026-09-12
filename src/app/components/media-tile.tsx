export type MediaTileData = {
  href: string;
  label: string;
  label2: string;
};
/** A media tile. */
export default function MediaTile({ d }: { d: MediaTileData }) {
  return (
    <li className="list-item pointer-events-none">
      <a className="flex relative py-[0.9375rem] px-5 flex-col cursor-pointer pointer-events-none after:content-[''] after:block after:absolute after:inset-0 after:bg-clr-2 after:opacity-0" href={d.href} role="menuitem">
        {" "}
        <span className="block min-w-0 max-w-[39.75rem] [font-weight:358] leading-[1.375rem] tracking-[0.32px] pointer-events-none">
          {d.label}
          <span className="inline-flex ml-[1.5px] items-center pointer-events-none" aria-hidden="">
            {" "}
            <svg className="block min-w-0 overflow-hidden align-middle [translate:0px_0.8px] pointer-events-none w-[0.85rem] h-[0.85rem] max-lg:w-[0.7975rem] max-lg:h-[0.7975rem]" aria-hidden="true" height="15" role="presentation" width="15" fill="currentColor">
              <use xlinkHref="/sprite.svg#arrow-outward" />
            </svg>
            {" "}
          </span>
          {" "}
        </span>
        {" "}
        <span className="block min-w-0 text-clr-3 text-[0.8125rem] [font-weight:358] leading-[1.125rem] tracking-[0.26px] pointer-events-none">
          {d.label2}
        </span>
        {" "}
      </a>
      {" "}
    </li>
  );
}
