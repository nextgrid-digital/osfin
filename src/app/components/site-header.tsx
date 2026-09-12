import "./site-header.css";

const NAV_LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/company", label: "Company" },
] as const;

/** Fixed primary navigation shown on every page. */
export default function SiteHeader() {
  return (
    <header className="demo-header">
      <a className="demo-brand" href="/">
        Osfin
      </a>
      <nav className="demo-nav" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="demo-nav-cta" href="/company#contact">
        Talk to an expert
      </a>
    </header>
  );
}
