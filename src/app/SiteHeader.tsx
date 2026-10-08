import SiteContainer from "./SiteContainer";
import SiteLogo from "./SiteLogo";
import SiteNav from "./SiteNav";

export const SITE_NAV = [
  { label: "Product", href: "/#product" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Blog", href: "/blog" },
  { label: "Company", href: "/#company" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  return (
    <header className="site-header not-typeset fixed inset-x-0 top-0 z-50 h-14 md:h-16" data-not-typeset>
      <SiteContainer className="flex h-full items-center justify-between">
        <SiteLogo />
        <SiteNav />
      </SiteContainer>
    </header>
  );
}
