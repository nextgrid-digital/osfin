"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SiteContainer from "./SiteContainer";

const LIST = [
  "PCI DSS",
  "SOC 2 Type II",
  "SOC 1 Type II",
  "ISO 27001:2022",
  "GDPR Compliant",
  "CCPA",
  "HIPAA Compliant",
] as const;

const kickerClassName =
  "not-typeset !m-0 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[0.08em] uppercase";

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
  {
    title: "HIPAA Compliant",
    titleLines: ["HIPAA", "Compliant"],
    kicker: null,
    body: "We safeguard protected health information under HIPAA, with access controls, audit trails, and BAAs for healthcare operations.",
    icon: "hipaa" as const,
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

  if (kind === "hipaa") {
    return (
      <svg
        viewBox="0 0 64 64"
        className={`size-14 ${mark}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden
      >
        <path d="M32 8 54 18v16c0 14-9 24-22 30C19 58 10 48 10 34V18Z" />
        <path d="M32 22v20M22 32h20" />
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
      className={`grid grid-cols-1 border-r border-b md:grid-cols-2 lg:grid-cols-3 ${light ? "border-black/[0.06]" : "border-white/15"}`}
    >
      {ITEMS.map((item) => (
        <div
          key={item.title}
          className={
            light
              ? "flex min-h-0 min-w-0 flex-col justify-between gap-16 border-t border-l border-black/[0.06] bg-white px-6 py-8 md:min-h-[420px] md:px-8 md:py-10"
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
              className={`!mb-0 !mt-0 !text-[20px] !font-medium !leading-[1.33] !tracking-[-0.012em] normal-case ${light ? "text-[#5D524B]" : "text-white"}`}
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
    <section
      ref={sectionRef}
      id="security"
      className="flex min-h-[100svh] flex-col justify-center bg-background py-28 md:py-40"
    >
      <SiteContainer>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <h2 ref={leadRef} className="!mb-0 !mt-0 max-w-[40rem] text-left text-[#5D524B]">
            Compliance and security guardrails built in.
          </h2>
          <Link
            href="/security"
            data-not-typeset=""
            className="security-cta not-typeset inline-flex h-10 shrink-0 items-center justify-center rounded-none border px-5 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] uppercase no-underline"
          >
            View security
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:h-[min(50svh,32rem)] md:grid-cols-[1.1fr_1fr]">
          <div className="flex min-h-[16rem] flex-col justify-between border border-black/[0.06] bg-background p-6 md:min-h-0 md:h-full md:p-8">
            <p className={`${kickerClassName} text-[#5D524B]/45`} data-not-typeset>
              <span className="size-1.5 shrink-0 bg-current" aria-hidden />
              Policy bound
            </p>
            <p className="not-typeset !m-0 max-w-[18em] font-[family-name:var(--font-season)] text-[clamp(1.5rem,2.4vw,32px)] leading-none font-normal tracking-[-0.022em] text-[#5D524B]" data-not-typeset>
              Osfin is built so finance teams can run agents without giving up control.
            </p>
          </div>

          <div className="grid min-h-0 grid-cols-1 gap-3 sm:grid-cols-2 md:h-full md:grid-rows-[0.85fr_1.4fr_0.85fr]">
            <div className="relative flex min-h-[14rem] flex-col justify-between overflow-hidden border border-black/[0.06] p-5 md:col-start-1 md:row-span-2 md:min-h-0 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/security/pci-grid.jpg"
                alt=""
                data-not-typeset=""
                className="absolute inset-0 !m-0 size-full !h-full !max-w-none object-cover"
              />
              <p className={`${kickerClassName} relative z-10 text-white`} data-not-typeset>
                <span className="size-1.5 shrink-0 bg-current" aria-hidden />
                PCI DSS & PCI SSF
              </p>
              <h3 className="relative z-10 !mb-0 !mt-4 !font-[family-name:var(--font-season)] !text-[clamp(1.25rem,1.8vw,28px)] !font-normal !leading-none !tracking-[-0.022em] text-white">
                Payment-grade encryption
              </h3>
            </div>

            <div className="flex min-h-[8rem] flex-col overflow-hidden border border-black/[0.06] bg-[#0B1633] text-[#F7F1E3] md:col-start-2 md:row-start-1 md:min-h-0">
              <p className="not-typeset !m-0 shrink-0 p-4 text-[15px] leading-5 md:p-5" data-not-typeset>
                Every agent action is recorded for close, SOX, and regulator review.
              </p>
              <div className="relative min-h-[2.5rem] flex-1 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/security/audit-grain.png"
                  alt=""
                  data-not-typeset=""
                  className="absolute inset-0 !m-0 size-full !h-full !max-w-none object-cover"
                />
              </div>
            </div>

            <div className="flex min-h-[8rem] flex-col justify-center border border-black/[0.06] bg-[#F7F1E3] p-4 md:col-start-1 md:row-start-3 md:min-h-0 md:p-5">
              <p className="!mb-0 !mt-0 text-[14px] leading-5 text-[#5D524B]/80">
                Agents stay inside internal policies, route exceptions to people, and keep a complete audit trail of every step.
              </p>
            </div>

            <div className="relative flex min-h-[12rem] min-h-0 flex-col items-start justify-between overflow-hidden border border-black/[0.06] bg-background p-5 md:col-start-2 md:row-span-2 md:row-start-2 md:min-h-0 md:p-6">
              <svg
                viewBox="0 0 32 36"
                className="relative z-10 block h-10 w-9 shrink-0 text-[#5D524B]"
                fill="none"
                aria-hidden
                data-not-typeset=""
              >
                <path
                  d="M16 2.5 29 8.2v12.2c0 7.4-5.8 12.6-13 15.6C8.8 33 3 27.8 3 20.4V8.2Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.4 18.6 14.2 22.4 22.2 13.4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="relative z-10 !m-0 !font-[family-name:var(--font-season)] !text-[clamp(1.25rem,1.8vw,28px)] !font-normal !leading-none !tracking-[-0.022em] text-[#5D524B]">
                SOC 2 Type II and ISO 27001
              </h3>
            </div>
          </div>
        </div>

        <ul
          className="not-typeset mt-5 m-0 grid list-none grid-cols-1 p-0 md:mt-6 md:grid-cols-2"
          data-not-typeset=""
        >
          {LIST.map((label, index) => (
            <li
              key={label}
              className={`flex items-center gap-4 py-2.5 ${index > 0 ? "security-rule border-t" : ""} ${
                index % 2 === 1 ? "md:border-l md:pl-6" : "md:pr-6"
              } ${index === 1 ? "md:border-t-0" : ""}`}
            >
              <span className="min-w-0 flex-1 text-[15px] leading-none md:text-[16px]">{label}</span>
              <Link
                href="/security"
                className="security-details inline-flex shrink-0 items-center gap-2 text-[13px] no-underline hover:no-underline"
              >
                Details
                <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
                  <path
                    d="M4 12 12 4M6 4h6v6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </SiteContainer>
    </section>
  );
}
