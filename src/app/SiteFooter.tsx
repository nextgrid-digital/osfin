import SiteContainer from "./SiteContainer";
import SiteLogo from "./SiteLogo";

export default function SiteFooter() {
  return (
    <footer className="not-typeset border-t border-black/10 bg-[#f4f4f4] px-0 py-20 text-[13px] text-black/50 md:py-24" data-not-typeset>
      <SiteContainer>
        <div className="mb-16 flex flex-wrap gap-3">
          <p className="mr-2 w-full text-[12px] text-black/40 sm:mr-4 sm:w-auto sm:self-center">
            Ask about Osfin on
          </p>
          {["ChatGPT", "Claude", "Perplexity", "Gemini", "Grok"].map((name) => (
            <a
              key={name}
              href={`/#ask-${name.toLowerCase()}`}
              className="rounded-full border border-black/10 px-3 py-1.5 text-[12px] text-black/60 hover:bg-black/[0.04] hover:text-black"
            >
              {name}
            </a>
          ))}
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          <div>
            <p className="mb-4 font-medium text-black/80">Osfin for</p>
            <ul className="space-y-2.5">
              {[
                "Banking",
                "Payments & Cards",
                "Fintech",
                "Insurance",
                "Capital Markets",
                "Gaming Platform",
                "Retail",
              ].map((l) => (
                <li key={l}>
                  <a href="/#roles" className="hover:text-black">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-black/80">Product</p>
            <ul className="space-y-2.5">
              {["Request a demo", "Changelog", "Documentation", "Download"].map((l) => (
                <li key={l}>
                  <a href="/#product" className="hover:text-black">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-black/80">Company</p>
            <ul className="space-y-2.5">
              {["Careers", "Compliance", "Security"].map((l) => (
                <li key={l}>
                  <a href="/#company" className="hover:text-black">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-black/80">Legal</p>
            <ul className="space-y-2.5">
              {[
                "Terms of Service",
                "Support Policy",
                "Privacy Policy",
                "Cookie Policy",
                "Service Level Agreement",
                "Data Processing Agreement",
              ].map((l) => (
                <li key={l}>
                  <a href="/#legal" className="hover:text-black">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-black/80">Social</p>
            <ul className="space-y-2.5">
              {["X", "LinkedIn", "Discord"].map((l) => (
                <li key={l}>
                  <a href="/#social" className="hover:text-black">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-black/10 pt-10 text-[rgba(0,0,0,0.875)] sm:flex-row sm:items-center sm:justify-between">
          <SiteLogo className="text-base" />
          <div className="max-w-xl text-[12px] leading-5 text-black/40">
            <p>Copyright © 2026 Osfin, Inc. All rights reserved.</p>
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}
