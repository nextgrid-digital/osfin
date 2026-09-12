export type ListRowData = {
  href: string;
  label: string;
  label2: string;
};
/** A list row. */
export default function ListRow({ d }: { d: ListRowData }) {
  return (
    <li className="list-item pointer-events-none">
      <a className="flex relative py-[0.9375rem] px-5 flex-col cursor-pointer pointer-events-none after:content-[''] after:block after:absolute after:inset-0 after:bg-clr-2 after:opacity-0" href={d.href} role="menuitem">
        {" "}
        <span className="block min-w-0 max-w-[39.75rem] [font-weight:358] leading-[1.375rem] tracking-[0.32px] pointer-events-none">
          {d.label}
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
