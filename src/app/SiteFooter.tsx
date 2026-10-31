import { TextReveal } from "@/components/ui/cascade-text";
import Link from "next/link";
import { SOLUTIONS } from "../content/industries";
import SiteContainer from "./SiteContainer";
import SiteLogo from "./SiteLogo";

export default function SiteFooter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const muted = dark ? "text-white/55" : "text-[#5D524B]/60";
  const strong = dark ? "text-white" : "text-[#5D524B]";
  const rule = dark ? "border-white/15" : "border-black/10";

  return (
    <footer
      className={`site-footer not-typeset px-0 pt-12 pb-20 text-[13px] md:pt-16 md:pb-24 ${
        dark ? "bg-black text-white/55" : "bg-background text-[#5D524B]/60"
      }`}
      data-not-typeset
    >
      <SiteContainer>
        <div className="mb-16 flex flex-wrap gap-3">
            <p className={`mr-2 w-full text-[12px] sm:mr-4 sm:w-auto sm:self-center ${dark ? "text-white/45" : "text-[#5D524B]/50"}`}>
            Ask about Osfin on
          </p>
          {["ChatGPT", "Claude", "Perplexity", "Gemini", "Grok"].map((name) => (
            <TextReveal
              key={name}
              as={Link}
              href={`/#ask-${name.toLowerCase()}`}
              text={name}
              className={`rounded-none border px-3 py-1.5 text-[12px] ${
                dark
                  ? "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                  : "border-black/15 text-[#5D524B]/70 hover:bg-black/5 hover:text-[#5D524B]"
              }`}
            />
          ))}
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Osfin for</p>
            <ul className="space-y-2.5">
              {SOLUTIONS.map(({ id, label, href }) => (
                <li key={id}>
                  <TextReveal as={Link} href={href} text={label} className={`${muted} ${dark ? "hover:text-white" : "hover:text-[#5D524B]"}`} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Product</p>
            <ul className="space-y-2.5">
              {["Changelog", "Documentation", "Download"].map((l) => (
                <li key={l}>
                  <TextReveal as={Link} href="/#product" text={l} className={`${muted} ${dark ? "hover:text-white" : "hover:text-[#5D524B]"}`} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Company</p>
            <ul className="space-y-2.5">
              {["About", "Careers", "Compliance", "Security"].map((l) => (
                <li key={l}>
                  <TextReveal
                    as={Link}
                    href={
                      l === "About"
                        ? "/about"
                        : l === "Careers"
                          ? "/careers"
                          : l === "Security"
                            ? "/security"
                            : "/#company"
                    }
                    text={l}
                    className={`${muted} ${dark ? "hover:text-white" : "hover:text-[#5D524B]"}`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Legal</p>
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
                  <TextReveal as={Link} href="/#legal" text={l} className={`${muted} ${dark ? "hover:text-white" : "hover:text-[#5D524B]"}`} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Social</p>
            <ul className="space-y-2.5">
              {["X", "LinkedIn", "Discord"].map((l) => (
                <li key={l}>
                  <TextReveal as={Link} href="/#social" text={l} className={`${muted} ${dark ? "hover:text-white" : "hover:text-[#5D524B]"}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-20 flex flex-col gap-4 border-t pt-10 sm:flex-row sm:items-center sm:justify-between ${rule} ${strong}`}>
          <SiteLogo />
          <div className={`max-w-xl text-[12px] leading-5 ${dark ? "text-white/45" : "text-[#5D524B]/50"}`}>
            <p>Copyright © 2026 Osfin, Inc. All rights reserved.</p>
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}
