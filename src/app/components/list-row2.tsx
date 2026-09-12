export type ListRow2Data = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow2({ d }: { d: ListRow2Data }) {
  return (
    <li className="list-item">
      <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href={d.href}>
        {d.label}
      </a>
      {" "}
    </li>
  );
}
