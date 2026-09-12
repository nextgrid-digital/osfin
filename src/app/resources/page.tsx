import InteriorPage from "../components/interior-page";
import DiscoverWhatBeingSection from "../sections/discover-what-being-section";

const RESOURCE_LINKS = [
  { href: "/demo", label: "Demo" },
  { href: "/platform", label: "Workflow" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const metadata = {
  title: "Osfin — Resources",
};

export default function ResourcesPage() {
  return (
    <InteriorPage
      kicker="Resources"
      title="Workflow notes and the demo"
      lede="See how settlement, payout, and approval cases are investigated — then open the live demo."
    >
      <section className="flex relative justify-center overflow-clip bg-background py-16 max-lg:py-10">
        <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
          <ul className="flex flex-wrap gap-3 col-start-2 col-end-21 max-lg:[grid-column-end:-2]">
            {RESOURCE_LINKS.map((link) => (
              <li key={link.href} className="list-none">
                <a
                  className="flex px-5 rounded-full items-center text-background [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase bg-foreground h-[2.8125rem]"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <DiscoverWhatBeingSection />
    </InteriorPage>
  );
}
