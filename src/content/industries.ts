export const INDUSTRIES = [
  {
    id: "banking",
    label: "Banking",
    headline: "Cores and ledgers on one settlement record.",
    description:
      "Payment reconciliation, AP/AR reconciliation, financial close, reporting, fee validation, disputes, and AML & STR.",
  },
  {
    id: "insurance",
    label: "Insurance",
    headline: "Premiums, claims, and remittance in one mesh.",
    description: "Financial close and commission calculation.",
  },
  {
    id: "fintech",
    label: "Fintech",
    headline: "High-velocity flows on one operating record.",
    description: "Govern payments across gateways, ledgers, and payouts.",
  },
  {
    id: "crypto",
    label: "Crypto",
    headline: "Wallets, exchanges, and on-chain movement.",
    description: "Reconcile wallets, exchanges, and on-chain movement.",
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    headline: "Stores, platforms, and every tender type.",
    description: "One mesh for stores, platforms, and tender types.",
  },
  {
    id: "gaming",
    label: "Gaming",
    headline: "Wallets, payouts, and risk in one loop.",
    description: "Track wallets, payouts, and settlement in real time.",
  },
  {
    id: "travel",
    label: "Travel",
    headline: "Fares, freight, and payouts across every hop.",
    description: "Match fares, freight, and payouts across every hop.",
  },
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const SOLUTIONS = INDUSTRIES.map(({ label, description }) => ({
  label,
  description,
}));
