import type { Metadata } from "next";
import GatewayFlow from "@/components/ui/gateway-flow";
import { SECURITY } from "../../content/security";
import SiteContainer from "../SiteContainer";
import SiteClose from "../SiteClose";
import SecurityAccordion from "./SecurityAccordion";

export const metadata: Metadata = {
  title: "Security & Compliance — Osfin",
  description:
    "Enterprise-grade security and compliance. Osfin operates under PCI DSS, SOC 1 Type II, SOC 2 Type II, ISO 27001:2022, GDPR, CCPA, and HIPAA.",
};

const labelClassName =
  "not-typeset !m-0 font-[family-name:var(--font-mono)] text-[14px] font-medium leading-[1.4] tracking-[-0.02em] text-[#5D524B]/45 uppercase";

function PrincipleIcon({
  kind,
}: {
  kind: (typeof SECURITY.principles)[number]["icon"];
}) {
  const common = {
    viewBox: "0 0 48 48",
    className: "size-10 text-[#5D524B]/70",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "lock") {
    return (
      <svg {...common}>
        <rect x="12" y="22" width="24" height="18" rx="2.5" />
        <path d="M18 22V16a6 6 0 0 1 12 0v6" />
        <circle cx="24" cy="31" r="1.75" fill="currentColor" stroke="none" />
        <path d="M24 33v3" />
      </svg>
    );
  }

  if (kind === "audit") {
    return (
      <svg {...common}>
        <rect x="13" y="8" width="22" height="32" rx="2" />
        <path d="M18 8.5h12v5H18z" />
        <path d="M19 22h10M19 27h10M19 32h6" />
        <path d="M19 17l2 2 4-4" />
      </svg>
    );
  }

  if (kind === "scan") {
    return (
      <svg {...common}>
        <circle cx="24" cy="24" r="7" />
        <circle cx="24" cy="24" r="13" />
        <path d="M24 6v5M24 37v5M6 24h5M37 24h5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="20" cy="18" r="5.5" />
      <path d="M11 34c1.2-6 4.8-9 9-9s7.8 3 9 9" />
      <circle cx="34" cy="16" r="3.5" />
      <path d="M29.5 28.5c.8-3.2 2.6-5 4.5-5 1.4 0 2.6.9 3.5 2.4" />
    </svg>
  );
}

export default function SecurityPage() {
  return (
    <div
      data-transition="container"
      data-namespace="security"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-[#5D524B]"
    >
      <main className="pt-14 md:pt-16">
        <section className="relative overflow-hidden bg-background">
          <GatewayFlow
            mode="light"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />
          <SiteContainer className="relative z-10 pt-8 pb-16 md:pt-10 md:pb-24">
            <h1 className="mx-auto max-w-full text-center">
              <span className="block">Security and</span>
              <span className="block">compliance.</span>
            </h1>
          </SiteContainer>
        </section>

        <section className="py-20 md:py-28">
          <SiteContainer>
            <p className={`${labelClassName} text-center`} data-not-typeset>
              Practices
            </p>
            <p className="mx-auto !mt-5 max-w-[38rem] text-center md:!mt-6">
              {SECURITY.intro}
            </p>
            <p className="mx-auto !mt-4 max-w-[38rem] text-center text-[#5D524B]/60">
              {SECURITY.mission}
            </p>

            <div
              className="not-typeset mt-12 overflow-hidden border border-black/[0.06] md:mt-16"
              data-not-typeset
            >
              <div className="grid grid-cols-1 border-r border-b border-black/[0.06] sm:grid-cols-2 lg:grid-cols-4">
                {SECURITY.principles.map((item) => (
                  <article
                    key={item.title}
                    className="flex min-h-0 flex-col justify-between gap-16 border-t border-l border-black/[0.06] px-6 py-8 md:min-h-[320px] md:px-8 md:py-10"
                  >
                    <PrincipleIcon kind={item.icon} />
                    <div>
                      <h3 className="!mb-0 !mt-0 !text-[20px] !font-medium !leading-[1.33] !tracking-[-0.012em] normal-case text-[#5D524B]">
                        {item.title}
                      </h3>
                      <p className="!mb-0 !mt-3 line-clamp-3 text-[15px] leading-6 text-[#5D524B]/60">
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </SiteContainer>
        </section>

        <section className="pb-20 md:pb-28">
          <SiteContainer>
            <p className={labelClassName} data-not-typeset>
              Certifications
            </p>
            <h2 className="!mt-5 max-w-[16em] md:!mt-6">{SECURITY.audit.heading}</h2>
            <div
              className="not-typeset mt-12 overflow-hidden border-r border-b border-black/[0.06] md:mt-16"
              data-not-typeset
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {SECURITY.audit.items.map((item) => (
                  <article
                    key={item.title}
                    className="flex flex-col justify-between gap-10 border-t border-l border-black/[0.06] px-6 py-8 md:min-h-[280px] md:px-8 md:py-10"
                  >
                    <div className="flex h-14 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.logo}
                        alt={item.alt}
                        className="h-16 w-auto max-h-16 object-contain object-left"
                      />
                    </div>
                    <div>
                      <h3 className="!mb-0 !mt-0 !text-[20px] !font-medium !leading-[1.33] !tracking-[-0.012em] normal-case text-[#5D524B]">
                        {item.title}
                      </h3>
                      <p className="!mb-0 !mt-3 text-[15px] leading-6 text-[#5D524B]/60">
                        {item.body}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </SiteContainer>
        </section>

        <section className="pb-24 md:pb-36">
          <SiteContainer>
            <p className={labelClassName} data-not-typeset>
              Controls
            </p>
            <SecurityAccordion />
          </SiteContainer>
        </section>
      </main>
      <SiteClose />
    </div>
  );
}
