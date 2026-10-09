import DarkWhenInView from "./DarkWhenInView";
import SiteContainer from "./SiteContainer";

const ITEMS = [
  {
    title: "GDPR Compliant",
    kicker: null,
    body: "With our operations in Ireland, we operate under GDPR, the world's strictest standard for data privacy.",
    icon: "gdpr" as const,
  },
  {
    title: "ISO 27001 Certification",
    kicker: "BSI",
    body: "Certified by BSI to ISO/IEC 27001, with an information security management system that protects client data.",
    icon: "iso" as const,
  },
  {
    title: "SOC 2 Compliance",
    kicker: null,
    body: "We meet SOC 2 requirements to ensure secure and compliant management of data across all our systems.",
    icon: "soc" as const,
  },
  {
    title: "PCI DSS & PCI SSF Standards",
    kicker: "DSS Compliant - Osfin",
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
  const mark = ink === "white" ? "text-white/80" : "text-black/70";
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
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 ${className}`.trim()}>
      {ITEMS.map((item) => (
        <div
          key={item.title}
          className={
            light
              ? "flex min-h-0 min-w-0 flex-col justify-between gap-16 bg-[#E4E4E4] px-6 py-8 md:min-h-[420px] md:px-8 md:py-10"
              : "flex min-h-0 min-w-0 flex-col justify-between gap-16 bg-[#0A3034] px-6 py-8 md:min-h-[420px] md:px-8 md:py-10"
          }
        >
          <CertIcon kind={item.icon} ink={light ? "dark" : "white"} />
          <div>
            {item.kicker ? (
              <p
                className={`not-typeset !mb-2 !mt-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] uppercase ${light ? "text-black/45" : "text-white/45"}`}
              >
                {item.kicker}
              </p>
            ) : null}
            <h3
              className={`!mb-0 !mt-0 !text-[22px] !font-medium !leading-[1.2] !tracking-[-0.01em] normal-case ${light ? "text-[rgba(0,0,0,0.875)]" : "text-white"}`}
            >
              {item.title}
            </h3>
            <p className={`!mb-0 !mt-3 text-[15px] leading-6 ${light ? "text-black/60" : "text-white/45"}`}>
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomeSecurity({ watch = true }: { watch?: boolean }) {
  return (
    <section id="security" className="bg-[#001D20] pt-16 pb-28 text-white md:pt-20 md:pb-40">
      {watch ? <DarkWhenInView targetId="security" /> : null}
      <SiteContainer>
        <h2 className="mx-auto !mb-0 !mt-0 max-w-2xl text-center !text-[clamp(1.85rem,7vw,36px)] !font-normal !leading-[1.15] tracking-[-0.02em] text-white md:!text-[42px]">
          Compliance and security guardrails built in.
        </h2>
        <SecurityCards className="mt-12 md:mt-16" />
      </SiteContainer>
    </section>
  );
}
