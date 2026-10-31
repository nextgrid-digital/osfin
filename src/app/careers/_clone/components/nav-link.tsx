import type { DittoNodeMetaMap } from "../ditto-meta";
export type NavLinkData = {
  href: string;
  label: string;
};
/** A navigation link. */
export default function NavLink({ d, meta }: { d: NavLinkData; meta: DittoNodeMetaMap }) {
  return (
    <a data-ditto-id={meta[0]?.anchor} className="block text-color-017 text-sm leading-5 tracking-[-0.35px] cursor-pointer hover:border-color-006 hover:text-color-006 hover:outline-color-006 hover:[text-decoration-color:var(--color-006)]" data-component="link" href={d.href}>
      {d.label}
    </a>
  );
}
