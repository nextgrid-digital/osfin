"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BadgeCheck, CreditCard, HeartPulse, Lock, Scale, Shield, ShieldCheck, type LucideIcon } from "lucide-react";
import SiteContainer from "./SiteContainer";

const LIST: { label: string; icon: LucideIcon }[] = [
  { label: "PCI DSS", icon: CreditCard },
  { label: "SOC 1 Type II", icon: Shield },
  { label: "SOC 2 Type II", icon: ShieldCheck },
  { label: "ISO 27001:2022", icon: BadgeCheck },
  { label: "GDPR Compliant", icon: Lock },
  { label: "CCPA", icon: Scale },
  { label: "HIPAA Compliant", icon: HeartPulse },
];

const ITEMS = [
  {
    title: "GDPR Compliant",
    titleLines: ["GDPR", "Compliant"],
    kicker: null,
    body: "With our operations in Ireland, we operate under GDPR, the world's strictest standard for data privacy.",
    lines: [
      "With our operations in Ireland,",
      "we operate under GDPR, the",
      "world's strictest standard",
      "for data privacy.",
    ],
    icon: "gdpr" as const,
  },
  {
    title: "ISO 27001 Certification",
    titleLines: ["ISO 27001", "Certification"],
    kicker: null,
    body: "Certified by BSI to ISO/IEC 27001, with an information security management system that protects client data.",
    icon: "iso" as const,
  },
  {
    title: "SOC 2 Compliance",
    titleLines: ["SOC 2", "Compliance"],
    kicker: null,
    body: "We meet SOC 2 requirements to ensure secure and compliant management of data across all our systems.",
    icon: "soc" as const,
  },
  {
    title: "PCI DSS & PCI SSF Standards",
    titleLines: ["PCI DSS & PCI SSF", "Standards"],
    kicker: null,
    body: "Osfin is DSS compliant, protecting payment data to PCI DSS in the cloud and PCI SSF for on-premise solutions.",
    icon: "pci" as const,
  },
] as const;

function CertIcon({
  kind,
  ink = "white",
}: {
  kind: (typeof ITEMS)[number]["icon"];
  ink?: "white" | "dark";
}) {
  const label = ink === "white" ? "white" : "currentColor";
  const mark = ink === "white" ? "text-white/80" : "text-[#5D524B]/70";
  if (kind === "soc") {
    return (
      <svg
        viewBox="0 0 64 64"
        className={`size-14 ${mark}`}
        fill="none"
        aria-hidden
      >
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" />
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" />
        <text
          x="32"
          y="28"
          textAnchor="middle"
          fill="currentColor"
          style={{ fontSize: 7, fontFamily: "var(--font-mono), monospace" }}
        >
          AICPA
        </text>
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill={label}
          style={{
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          SOC
        </text>
      </svg>
    );
  }

  if (kind === "gdpr") {
    return (
      <svg
        viewBox="0 0 64 64"
        className={`size-14 ${mark}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden
      >
        <circle cx="32" cy="32" r="28" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 32 + Math.cos(rad) * 22;
          const y = 32 + Math.sin(rad) * 22;
          return (
            <circle key={deg} cx={x} cy={y} r="1.5" fill="currentColor" stroke="none" />
          );
        })}
        <text
          x="32"
          y="36"
          textAnchor="middle"
          fill={label}
          stroke="none"
          style={{
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          GDPR
        </text>
      </svg>
    );
  }

  if (kind === "iso") {
    return (
      <svg
        viewBox="0 0 64 64"
        className={`size-14 ${mark}`}
        fill="none"
        aria-hidden
      >
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1" />
        <text
          x="32"
          y="29"
          textAnchor="middle"
          fill="currentColor"
          style={{ fontSize: 7, fontFamily: "var(--font-mono), monospace" }}
        >
          ISO
        </text>
        <text
          x="32"
          y="41"
          textAnchor="middle"
          fill={label}
          style={{
            fontSize: 9,
            fontWeight: 600,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          27001
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className={`size-14 ${mark}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <rect x="8" y="20" width="40" height="28" rx="4" />
      <path d="M8 28h40" />
      <path d="M16 38h12" />
      <circle cx="52" cy="20" r="10" />
      <path d="M48 20l3 3 6-6" stroke={label} />
    </svg>
  );
}

export function SecurityCards({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className={className}>
    <div
      className={`grid grid-cols-1 border-r border-b md:grid-cols-2 lg:grid-cols-4 ${light ? "border-black/15" : "border-white/15"}`}
    >
      {ITEMS.map((item) => (
        <div
          key={item.title}
          className={
            light
              ? "flex min-h-0 min-w-0 flex-col justify-between gap-16 border-t border-l border-black/15 bg-white px-6 py-8 md:min-h-[420px] md:px-8 md:py-10"
              : "flex min-h-0 min-w-0 flex-col justify-between gap-16 border-t border-l border-white/15 bg-[#0A3034] px-6 py-8 md:min-h-[420px] md:px-8 md:py-10"
          }
        >
          <CertIcon kind={item.icon} ink={light ? "dark" : "white"} />
          <div>
            {item.kicker ? (
              <p
                className={`not-typeset !mb-2 !mt-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] uppercase ${light ? "text-[#5D524B]/45" : "text-white/45"}`}
              >
                {item.kicker}
              </p>
            ) : null}
            <h3
              className={`!mb-0 !mt-0 !text-[22px] !font-medium !leading-[1.2] !tracking-[-0.01em] normal-case ${light ? "text-[#5D524B]" : "text-white"}`}
            >
              {item.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <p className={`@container !mb-0 !mt-3 text-[15px] leading-6 ${light ? "text-[#5D524B]/60" : "text-white/45"}`}>
              {"lines" in item ? (
                <>
                  <span className="@min-[15rem]:hidden">{item.body}</span>
                  <span className="hidden @min-[15rem]:inline">
                    {item.lines.map((line, index) => (
                      <span key={line}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </span>
                </>
              ) : (
                item.body
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default function HomeSecurity() {
  const sectionRef = useRef<HTMLElement>(null);
  const leadRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const sync = () => {
      const section = sectionRef.current?.getBoundingClientRect();
      const lead = leadRef.current?.getBoundingClientRect();
      const root = document.documentElement;
      if (!section || !lead) {
        root.style.setProperty("--night-mix", "0%");
        return;
      }
      const view = window.innerHeight;
      const travel = view * 0.45;
      const enter = Math.min(1, Math.max(0, (view - lead.top) / travel));
      const leave = Math.min(1, Math.max(0, section.bottom / travel));
      const mix = Math.min(enter, leave);
      root.style.setProperty("--night-mix", `${(mix * 100).toFixed(1)}%`);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      document.documentElement.style.setProperty("--night-mix", "0%");
    };
  }, []);

  return (
    <section ref={sectionRef} id="security" className="bg-background py-28 md:py-40">
      <SiteContainer>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 ref={leadRef} className="!mb-0 !mt-0 max-w-[18em]">
              Compliance and security guardrails built in.
            </h2>
            <p className="security-copy !mb-0 !mt-5 max-w-[36rem] text-[15px] leading-6 md:!mt-6">
              Osfin operates under PCI DSS, SOC 1 Type II, SOC 2 Type II, ISO 27001:2022,
              GDPR, CCPA, and HIPAA, with controls that protect payment data and client
              information.
            </p>
            <Link
              href="/security"
              data-not-typeset=""
              className="security-cta not-typeset mt-8 inline-flex h-10 items-center justify-center rounded-none border px-5 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] uppercase no-underline md:mt-10"
            >
              View security
            </Link>
          </div>
          <ul className="not-typeset m-0 list-none p-0" data-not-typeset="">
            {LIST.map(({ label, icon: Icon }, index) => (
              <li
                key={label}
                className={`flex items-center gap-4 py-5 ${index > 0 ? "security-rule border-t" : ""}`}
              >
                <Icon aria-hidden className="size-6 shrink-0" strokeWidth={1.4} />
                <span className="min-w-0 flex-1 text-[16px] leading-none md:text-[18px]">{label}</span>
                <Link href="/security" className="security-details shrink-0 text-[14px] no-underline">
                  Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SiteContainer>
    </section>
  );
}
