import SiteContainer from "./SiteContainer";
import SiteLogo from "./SiteLogo";
import SiteNav from "./SiteNav";

export const SITE_NAV = [
  { label: "Product", href: "/#product" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Blog", href: "/#blog" },
  { label: "Company", href: "/#company" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  return (
    <header className="site-header not-typeset fixed inset-x-0 top-0 z-50 h-14 md:h-16" data-not-typeset>
      <SiteContainer className="flex h-full items-center justify-between">
        <SiteLogo />
        <div className="flex items-center gap-4 md:gap-6">
          <SiteNav />
          <button type="button" className="rounded-none p-2 lg:hidden" aria-label="Open navigation">
            <span className="block h-px w-5 bg-current" />
            <span className="mt-1.5 block h-px w-5 bg-current" />
          </button>
        </div>
      </SiteContainer>
    </header>
  );
}
