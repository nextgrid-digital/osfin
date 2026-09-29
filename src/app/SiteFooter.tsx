import { TextReveal } from "@/components/ui/cascade-text";
import Link from "next/link";
import FooterReveal from "./FooterReveal";
import SiteContainer from "./SiteContainer";
import SiteLogo from "./SiteLogo";

export default function SiteFooter() {
  return (
    <FooterReveal>
    <footer className="site-footer not-typeset border-t border-white/10 bg-[#001D20] px-0 py-20 text-[13px] text-white/60 md:py-24" data-not-typeset>
      <SiteContainer>
        <div className="mb-16 flex flex-wrap gap-3">
          <p className="mr-2 w-full text-[12px] text-white/50 sm:mr-4 sm:w-auto sm:self-center">
            Ask about Osfin on
          </p>
          {["ChatGPT", "Claude", "Perplexity", "Gemini", "Grok"].map((name) => (
            <TextReveal
              key={name}
              as={Link}
              href={`/#ask-${name.toLowerCase()}`}
              text={name}
              className="rounded-none border border-white/15 px-3 py-1.5 text-[12px] text-white/70 hover:bg-white/10 hover:text-white"
            />
          ))}
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          <div>
            <p className="mb-4 font-medium text-white/90">Osfin for</p>
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
                  <TextReveal as={Link} href="/#roles" text={l} className="hover:text-white" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-white/90">Product</p>
            <ul className="space-y-2.5">
              {["Request a demo", "Changelog", "Documentation", "Download"].map((l) => (
                <li key={l}>
                  <TextReveal as={Link} href="/#product" text={l} className="hover:text-white" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-white/90">Company</p>
            <ul className="space-y-2.5">
              {["About", "Careers", "Compliance", "Security"].map((l) => (
                <li key={l}>
                  <TextReveal
                    as={Link}
                    href={l === "About" ? "/about" : "/#company"}
                    text={l}
                    className="hover:text-white"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-white/90">Legal</p>
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
                  <TextReveal as={Link} href="/#legal" text={l} className="hover:text-white" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-medium text-white/90">Social</p>
            <ul className="space-y-2.5">
              {["X", "LinkedIn", "Discord"].map((l) => (
                <li key={l}>
                  <TextReveal as={Link} href="/#social" text={l} className="hover:text-white" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-10 text-white sm:flex-row sm:items-center sm:justify-between">
          <SiteLogo />
          <div className="max-w-xl text-[12px] leading-5 text-white/50">
            <p>Copyright © 2026 Osfin, Inc. All rights reserved.</p>
          </div>
        </div>
      </SiteContainer>
    </footer>
    </FooterReveal>
  );
}
