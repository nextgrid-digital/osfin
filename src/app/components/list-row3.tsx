export type ListRow3Data = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow3({ d }: { d: ListRow3Data }) {
  return (
    <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
      <a className="inline relative cursor-pointer" aria-disabled="false" href={d.href}>
        {d.label}
      </a>
      {" "}
    </li>
  );
}
