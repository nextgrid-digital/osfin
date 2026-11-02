import { TextReveal } from "@/components/ui/cascade-text";
import Link from "next/link";
import { SOLUTIONS } from "../content/industries";
import { PRODUCTS } from "../content/products";
import SiteContainer from "./SiteContainer";
import SiteLogo from "./SiteLogo";

const ASK_PROMPT = encodeURIComponent(
  "What is Osfin and how does it automate financial operations and reconciliation?",
);

const ASK_LINKS: { name: string; href: string }[] = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${ASK_PROMPT}` },
  { name: "Claude", href: `https://claude.ai/new?q=${ASK_PROMPT}` },
  { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${ASK_PROMPT}` },
  { name: "Gemini", href: `https://www.google.com/search?udm=50&q=${ASK_PROMPT}` },
  { name: "Grok", href: `https://grok.com/?q=${ASK_PROMPT}` },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Security", href: "/security" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
] as const;

export default function SiteFooter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const muted = dark ? "text-white/55" : "text-[#5D524B]/60";
  const strong = dark ? "text-white" : "text-[#5D524B]";
  const rule = dark ? "border-white/15" : "border-black/10";
  const hover = dark ? "hover:text-white" : "hover:text-[#5D524B]";

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
          {ASK_LINKS.map(({ name, href }) => (
            <TextReveal
              key={name}
              as="a"
              href={href}
              target="_blank"
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
                  <TextReveal as={Link} href={href} text={label} className={`${muted} ${hover}`} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Product</p>
            <ul className="space-y-2.5">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <TextReveal
                    as={Link}
                    href={`/products/${product.slug}`}
                    text={product.name}
                    className={`${muted} ${hover}`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Company</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <TextReveal as={Link} href={href} text={label} className={`${muted} ${hover}`} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Legal</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <TextReveal as={Link} href={href} text={label} className={`${muted} ${hover}`} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`mb-4 font-medium ${strong}`}>Social</p>
            <ul className="space-y-2.5">
              <li>
                <TextReveal
                  as="a"
                  href="https://www.linkedin.com/company/osfin-ai"
                  target="_blank"
                  text="LinkedIn"
                  className={`${muted} ${hover}`}
                />
              </li>
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
