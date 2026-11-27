import type { PostSection } from "./posts";

export const CUSTOMER_CATEGORIES = ["Customer"] as const;

export type CustomerCategory = (typeof CUSTOMER_CATEGORIES)[number];

export type CustomerStory = {
  slug: string;
  title: string;
  category: CustomerCategory;
  date: string;
  /** Background photograph for the card thumbnail. */
  cover?: string;
  logo?: string;
  company?: string;
  sections: PostSection[];
};

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    slug: "pharmeasy",
    title: "PharmEasy: SKU-level cashflow visibility",
    category: "Customer",
    date: "Jun 1, 2024",
    logo: "/customers/pharmeasy.svg",
    company: "PharmEasy",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "p",
            text: "“Real-time visibility of cashflows at an SKU level is achieved with Osfin's intuitive dashboards. We were able to not only manage customer transactions level but also complex recon of state-wise charges and taxes for our B2B business.”",
          },
          { type: "p", text: "Accounting Team, PharmEasy" },
          {
            type: "p",
            text: "PharmEasy's accounts team previously relied on Excel and an in-house platform for reconciliation, which could not keep the close on time. Osfin provided an end-to-end automated solution for B2B, inventory, and B2C reconciliation.",
          },
          {
            type: "ul",
            items: [
              "99% reduction in stockouts, with a live view of stocks at warehouses at SKU level",
              "4+ million transactions and refunds reconciled to track stock-in-transit",
              "99.5% auto-reconciliation with a flexible rule engine",
              "Complete visibility of money flow, revenues, and margins by retailer, order, and SKU",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "games-24x7",
    title: "Games 24*7: cashflow across gateways and banks",
    category: "Customer",
    date: "Jun 1, 2024",
    logo: "/customers/games-24x7.svg",
    company: "Games 24*7",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "p",
            text: "“Managing voluminous transaction data has become seamless using Osfin. We are able to achieve complete visibility on the cashflows across our Internal database, Payment Gateways and Banks. Moreover, Osfin also became our defacto auditor for PG charges and failure rates.”",
          },
          { type: "p", text: "Finance Team, Games 24*7" },
        ],
      },
    ],
  },
  {
    slug: "manipal-cigna",
    title: "Manipal Cigna: partner payouts on time",
    category: "Customer",
    date: "Jun 1, 2024",
    logo: "/customers/manipal-cigna-logo.png",
    company: "Manipal Cigna Health Insurance",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "p",
            text: "“Osfin is a life saviour. With its support, we've been able to better administer payments to our partners. Timely settlement and distribution of payouts allow us to concentrate on expanding our primary business. For handling partner compensation or commissions, I can't speak highly enough about Osfin.”",
          },
          { type: "p", text: "Accounting Team, Manipal Cigna Health Insurance" },
        ],
      },
    ],
  },
  {
    slug: "buku-warung",
    title: "Buku Warung: less dependency on the internal team",
    category: "Customer",
    date: "Jun 1, 2024",
    logo: "/customers/buku-warung.png?v=2",
    company: "Buku Warung",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "p",
            text: "“Osfin offers efficient financial reconciliation, enhancing accuracy and productivity. Recommended to decrease dependency on internal team.”",
          },
          { type: "p", text: "Finance Team, Buku Warung" },
        ],
      },
    ],
  },
];

export function getCustomerStory(slug: string) {
  return CUSTOMER_STORIES.find((story) => story.slug === slug);
}

export function customerSlugs() {
  return CUSTOMER_STORIES.map((story) => story.slug);
}

export function recommendedCustomerStories(slug: string, count = 3) {
  const index = CUSTOMER_STORIES.findIndex((story) => story.slug === slug);
  if (index === -1) return CUSTOMER_STORIES.slice(0, count);
  const next: CustomerStory[] = [];
  for (let step = 1; step < CUSTOMER_STORIES.length && next.length < count; step += 1) {
    next.push(CUSTOMER_STORIES[(index + step) % CUSTOMER_STORIES.length]!);
  }
  return next;
}
