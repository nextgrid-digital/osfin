import type { INDUSTRIES } from "../content/industries";

export const industryArt: Partial<Record<(typeof INDUSTRIES)[number]["id"], string>> = {
  banks: "/industries/banks.png?v=3",
  payments: "/industries/payments.png?v=2",
  fintech: "/industries/fintech.png?v=2",
  insurance: "/industries/insurance.png?v=3",
  ecommerce: "/industries/ecommerce.png?v=2",
  travel: "/industries/travel.png?v=2",
  crypto: "/industries/crypto.png?v=2",
};
