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
  { label: "Customers", href: "/customers" },
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
  const mono =
    "font-[family-name:var(--font-mono)] font-medium tracking-[-0.02em] uppercase";

  return (
    <footer
      className={`site-footer not-typeset px-0 pt-12 pb-16 text-[12px] md:pt-16 md:pb-24 md:text-[13px] ${
        dark ? "bg-[#141412] text-white/55" : "bg-background text-[#5D524B]/60"
      }`}
      data-not-typeset
    >
      <SiteContainer>
        <div className="mb-10 flex flex-wrap gap-2 md:mb-16 md:gap-3">
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
              className={`rounded-none border px-3 py-1.5 text-[12px] ${mono} ${
                dark
                  ? "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                  : "border-black/15 text-[#5D524B]/70 hover:bg-black/5 hover:text-[#5D524B]"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-5 lg:gap-10">
          <div className="min-w-0">
            <p className={`mb-4 font-medium ${strong}`}>Osfin for</p>
            <ul className="space-y-2.5">
              {SOLUTIONS.map(({ id, label, href }) => (
                <li key={id}>
                  <TextReveal as={Link} href={href} text={label} className={`${mono} ${muted} ${hover}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <p className={`mb-4 font-medium ${strong}`}>Product</p>
            <ul className="space-y-2.5">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <TextReveal
                    as={Link}
                    href={`/products/${product.slug}`}
                    text={product.name}
                    className={`${mono} ${muted} ${hover}`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <p className={`mb-4 font-medium ${strong}`}>Company</p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <TextReveal as={Link} href={href} text={label} className={`${mono} ${muted} ${hover}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <p className={`mb-4 font-medium ${strong}`}>Legal</p>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <TextReveal as={Link} href={href} text={label} className={`${mono} ${muted} ${hover}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <p className={`mb-4 font-medium ${strong}`}>Social</p>
            <ul className="space-y-2.5">
              <li>
                <TextReveal
                  as="a"
                  href="https://www.linkedin.com/company/osfin-ai"
                  target="_blank"
                  text="LinkedIn"
                  className={`${mono} ${muted} ${hover}`}
                />
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 flex flex-col gap-4 border-t pt-8 md:mt-20 md:flex-row md:items-center md:justify-between md:pt-10 ${rule} ${strong}`}>
          <SiteLogo wordmark markFill="currentColor" />
          <div className={`max-w-xl text-[12px] leading-5 ${dark ? "text-white/45" : "text-[#5D524B]/50"}`}>
            <p>Copyright © 2026 Osfin, Inc. All rights reserved.</p>
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}
