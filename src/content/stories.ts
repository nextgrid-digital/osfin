export type StoryMeta = {
  label: string;
  value: string;
};

export type Story = {
  slug: string;
  badge: string;
  company: string;
  logo: string;
  /** Tailwind classes for logo size; defaults applied in HomeStories when omitted. */
  logoClass?: string;
  fill: string;
  quote: string;
  role: string;
  href: string;
  meta?: StoryMeta[];
};

/** Homepage testimonials from osfin.ai — linked to case-study placeholder routes. */
export const STORIES: Story[] = [
  {
    slug: "pharmeasy",
    badge: "Customer",
    company: "PharmEasy",
    logo: "/customers/pharmeasy.svg",
    fill: "#D5E5E2",
    quote:
      "Real-time visibility of cashflows at an SKU level is achieved with Osfin's intuitive dashboards. We were able to not only manage customer transactions level but also complex recon of state-wise charges and taxes for our B2B business.",
    role: "Accounting Team",
    href: "/customers/ecommerce-payment-reconciliation",
    meta: [
      { label: "Industry", value: "Healthcare retail" },
      { label: "Team", value: "Accounting" },
      { label: "Focus", value: "SKU cashflow & B2B recon" },
    ],
  },
  {
    slug: "games-24x7",
    badge: "Customer",
    company: "Games 24*7",
    logo: "/customers/games-24x7.svg",
    fill: "#D7DCE6",
    quote:
      "Managing voluminous transaction data has become seamless using Osfin. We are able to achieve complete visibility on the cashflows across our Internal database, Payment Gateways and Banks. Moreover, Osfin also became our defacto auditor for PG charges and failure rates.",
    role: "Finance Team",
    href: "/customers/gaming-finance-automation",
    meta: [
      { label: "Industry", value: "Gaming" },
      { label: "Team", value: "Finance" },
      { label: "Focus", value: "PG charges & settlements" },
    ],
  },
  {
    slug: "manipal-cigna",
    badge: "Customer",
    company: "Manipal Cigna Health Insurance",
    logo: "/customers/manipal-cigna-logo.png",
    logoClass: "h-10 w-auto max-w-[16rem] object-contain object-left md:h-12 md:max-w-[20rem]",
    fill: "#E8DDD4",
    quote:
      "Osfin is a life saviour. With its support, we've been able to better administer payments to our partners. Timely settlement and distribution of payouts allow us to concentrate on expanding our primary business. For handling partner compensation or commissions, I can't speak highly enough about Osfin.",
    role: "Accounting Team",
    href: "/customers/loan-reconciliation-automation",
    meta: [
      { label: "Industry", value: "Insurance" },
      { label: "Team", value: "Accounting" },
      { label: "Focus", value: "Partner payouts" },
    ],
  },
  {
    slug: "buku-warung",
    badge: "Customer",
    company: "Buku Warung",
    logo: "/customers/buku-warung.png",
    logoClass: "h-16 w-auto max-w-[20rem] object-contain object-left md:h-20 md:max-w-[24rem]",
    fill: "#D6DFEB",
    quote:
      "Osfin offers efficient financial reconciliation, enhancing accuracy and productivity. Recommended to decrease dependency on internal team.",
    role: "Finance Team",
    href: "/customers/ecommerce-inventory-reconciliation",
    meta: [
      { label: "Industry", value: "Fintech" },
      { label: "Team", value: "Finance" },
      { label: "Focus", value: "Ops efficiency" },
    ],
  },
];
