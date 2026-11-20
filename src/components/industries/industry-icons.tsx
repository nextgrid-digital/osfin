// Osfin industry icons, Streamline Sharp style (24 x 24 grid, 1.5px stroke, sharp corners).
// Banks, Payments, Fintech, Ecommerce and Gaming are from Streamline Sharp (free), CC BY 4.0:
// "Icons by Streamline" https://www.streamlinehq.com
// Insurance (shield with tick), Travel (truck with clock) and Crypto (Bitcoin coin) are drawn to match.

export type IndustryKind = "banks" | "payments" | "fintech" | "insurance" | "ecommerce" | "travel" | "crypto" | "gaming"

export const INDUSTRY_ICONS: Record<IndustryKind, string[]> = {
  banks: [
    "M2 19V3h20v16zM5 8v6",
    "M12 11a3 3 0 1 0 6 0a3 3 0 1 0-6 0m3-3V6m0 8v2m2.598-3.5l1.732 1m-6.928-4l-1.732-1m6.928 1l1.732-1m-6.928 4l-1.732 1M4.5 19v4m15-4v4",
  ],
  payments: [
    "M4 2h16v12H4zM3 17h18v5H3zm9.143-3v3",
    "M10 9.5v.625c0 .483.42.875.938.875h2.41c.518 0 .938-.391.938-.875V8.948c0-.39-.275-.731-.675-.84l-2.936-.8c-.4-.108-.675-.45-.675-.84v-.593c0-.483.42-.875.938-.875h2.41c.518 0 .938.392.938.875v.626M11 19.5h2",
  ],
  fintech: [
    "m8.23 22l4.9-4.9l3.5 3.5l5.6-5.6",
    "M16.73 15h5.5v5.5m-7.783-7.246A7.187 7.187 0 1 0 10 16.024M8.687 5.957v-2m0 10v-2",
    "M10.937 7.457v-.5a1 1 0 0 0-1-1h-2.5a1 1 0 0 0-1 1v.447a1 1 0 0 0 .783.977l2.933.652a1 1 0 0 1 .784.976v.947a1 1 0 0 1-1 1h-2.5a1 1 0 0 1-1-1v-.5",
  ],
  insurance: [
    "M2.5 3.5V17l9.5 5l9.5-5V3.5l-.494.148a10 10 0 0 1-8.42-1.258L12 2l-1.056.634a10 10 0 0 1-8.307.912z",
    "m7.5 11.5l3 3l6-6",
  ],
  ecommerce: [
    "m14.18 9.547l.94-3.376l3.476.442L22 11.737l-4.416 2.934z",
    "M14.334 9.24H3.841L2 21.202h18.406l-1.159-7.53M6.602 9.239v-1.84a4.601 4.601 0 0 1 9.056-1.158",
  ],
  travel: [
    "M4 18H1.5V5.5h13V18M8 18h7.5m0 0h-1V9H19l3.5 3.5V18H19.5",
    "M4 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11.5 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    "M4.5 11.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M8 9.5v2h2",
  ],
  crypto: [
    "M2.5 12a9.5 9.5 0 1 0 19 0a9.5 9.5 0 1 0-19 0",
    "M8 6.5h5a2.75 2.75 0 0 1 0 5.5H9.5m0-5.5v11m0-5.5h4.5a2.75 2.75 0 0 1 0 5.5H8M10.5 4.5v2m2.5-2v2m-2.5 11v2m2.5-2v2",
  ],
  gaming: [
    "M6.974 22.112a4.96 4.96 0 0 0 4.136-2.222h1.78a4.96 4.96 0 0 0 4.136 2.222c2.747 0 4.974-2.239 4.974-5c0-2.76-2.23-4.997-4.974-5H6.974c-2.747 0-4.974 2.238-4.974 5s2.227 5 4.974 5ZM7 14.5v5M4.5 17h5m8.864-12.364a9 9 0 0 0-12.728 0m9.899 2.828a5 5 0 0 0-7.07 0M15 18h1.5m1-2H19",
  ],
}

export const INDUSTRIES: { kind: IndustryKind; title: string; href: string }[] = [
  { kind: "banks", title: "Banks & Credit Unions", href: "/industries/banks" },
  { kind: "payments", title: "Payments", href: "/industries/payments" },
  { kind: "fintech", title: "Fintech", href: "/industries/fintech" },
  { kind: "insurance", title: "Insurance", href: "/industries/insurance" },
  { kind: "ecommerce", title: "Ecommerce & Retail", href: "/industries/ecommerce" },
  { kind: "travel", title: "Travel & Logistics", href: "/industries/travel" },
  { kind: "crypto", title: "Crypto", href: "/industries/crypto" },
  { kind: "gaming", title: "Gaming", href: "/industries/gaming" },
]

export function IndustryIcon({ kind, size = 48, className }: { kind: IndustryKind; size?: number; className?: string }) {
  return (
    <svg
      className={className ? `osfin-sharp ${className}` : "osfin-sharp"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {INDUSTRY_ICONS[kind].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}
