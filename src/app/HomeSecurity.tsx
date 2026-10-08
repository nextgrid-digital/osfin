import SiteContainer from "./SiteContainer";

const ITEMS = [
  {
    title: "SOC Type 2",
    body: "We meet SOC 2 requirements to ensure secure and compliant management of data across all our systems.",
    icon: "soc" as const,
  },
  {
    title: "GDPR",
    body: "With our operations in Ireland, we operate under GDPR — the world's strictest standard for data privacy.",
    icon: "gdpr" as const,
  },
  {
    title: "PCI DSS",
    body: "We protect cardholder and payment data in line with PCI DSS standards, ensuring secure processing across all transactions.",
    icon: "pci" as const,
  },
  {
    title: "Encryption",
    body: "We encrypt your data with AES-256 at rest and TLS in transit, ensuring end-to-end protection for every byte.",
    icon: "encryption" as const,
  },
] as const;

function CertIcon({ kind }: { kind: (typeof ITEMS)[number]["icon"] }) {
  if (kind === "soc") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="size-14 text-white/80"
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
          className="fill-current"
          style={{ fontSize: 7, fontFamily: "var(--font-mono), monospace" }}
        >
          AICPA
        </text>
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill="white"
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
        className="size-14 text-white/80"
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
          fill="white"
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

  if (kind === "pci") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="size-14 text-white/80"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden
      >
        <rect x="8" y="20" width="40" height="28" rx="4" />
        <path d="M8 28h40" />
        <path d="M16 38h12" />
        <circle cx="52" cy="20" r="10" />
        <path d="M48 20l3 3 6-6" stroke="white" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className="size-14 text-white/80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <path d="M32 6l22 8v14c0 14-9 24-22 28C19 52 10 42 10 28V14l22-8z" />
      <path d="M24 32l5 5 11-11" stroke="white" />
    </svg>
  );
}

export default function HomeSecurity() {
  return (
    <section id="security" className="bg-[#0A0A0A] py-28 text-white md:py-40">
      <SiteContainer>
        <h2 className="!mb-0 !mt-0 max-w-2xl !text-[36px] !font-normal !leading-[1.15] tracking-[-0.02em] text-white md:!text-[42px]">
          Compliance and security guardrails built in.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex min-h-[420px] min-w-0 flex-col justify-between border border-white/15 bg-[#141414] px-8 py-8 md:py-10"
            >
              <CertIcon kind={item.icon} />
              <div>
                <h3 className="!mb-0 !mt-0 !text-[22px] !font-medium !leading-[1.2] !tracking-[-0.01em] text-white normal-case">
                  {item.title}
                </h3>
                <p className="!mb-0 !mt-3 text-[15px] leading-6 text-white/45">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
