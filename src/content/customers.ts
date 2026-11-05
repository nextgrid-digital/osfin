import type { PostBlock, PostSection } from "./posts";

export const CUSTOMER_CATEGORIES = [
  "Retail",
  "Banking",
  "Fintech",
  "Gaming",
  "Crypto",
  "Capital Markets",
  "Customer",
] as const;

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

function statsTable(headers: string[], rows: string[][]): PostBlock {
  return { type: "table", headers, rows };
}

export const CUSTOMER_STORIES: CustomerStory[] = [
  {
    slug: "e-commerce-payment-reconciliation",
    title: "E-commerce payment reconciliation: 99% automation",
    category: "Retail",
    date: "Sep 10, 2024",
    company: "E-commerce retailer",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Reconciliation process automated", "99%"],
              ["Accuracy maintained", "100%"],
              ["Manual processing time reduced", "85%"],
            ],
          ),
          {
            type: "p",
            text: "A prominent e-commerce retailer in India, processing over 1 million transactions monthly across multiple payment channels, faced significant challenges in reconciling payments. Their eight-person finance team struggled with discrepancies between various payment modes, internal data, and bank statements while using Excel to perform the reconciliation. Inconsistencies in payment gateway charges and settlement cycles led to revenue leakages and delayed reporting.",
          },
        ],
      },
      {
        heading: "The solution",
        blocks: [
          {
            type: "p",
            text: "Osfin implemented a comprehensive e-commerce payment reconciliation solution in under four weeks:",
          },
          {
            type: "ol",
            items: [
              "Multi-source data integration: automated ingestion from payment gateways, internal systems, and bank statements",
              "Intelligent matching across payment modes and settlement cycles",
              "AI-powered identification of discrepancies in gateway charges and settlements",
            ],
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "ul",
            items: [
              "99% of the reconciliation process automated, maintaining 100% accuracy",
              "Manual processing time reduced by 85%",
              "Discrepancies in payment gateway charges identified and resolved within 24 hours",
              "Financial reporting cycle shortened by 60%",
            ],
          },
          {
            type: "p",
            text: "“Osfin's payment reconciliation solution has revolutionized our financial operations. We now have complete accuracy and visibility across all our payment channels.” — Operations Manager",
          },
        ],
      },
    ],
  },
  {
    slug: "e-commerce-inventory-reconciliation",
    title: "E-commerce inventory reconciliation: 100% accuracy",
    category: "Retail",
    date: "Aug 6, 2024",
    company: "D2C brand",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Inventory accuracy", "100%"],
              ["Returns processing time", "−30%"],
              ["Unaccounted inventory", "−15%"],
            ],
          ),
          {
            type: "p",
            text: "A fast-growing direct-to-consumer fashion brand faced significant challenges managing inventory across multiple sales channels and warehouses. Discrepancies between their order management system and marketplace reports led to overselling and customer dissatisfaction. Returns processing was slow and error-prone, impacting cash flow and customer experience.",
          },
        ],
      },
      {
        heading: "The solution",
        blocks: [
          {
            type: "ol",
            items: [
              "Shipping reconciliation: automated order-level matching between OMS and courier partner reports",
              "Returns management: streamlined tracking and processing of returned items",
              "Stock reconciliation: real-time inventory tracking across all warehouses",
            ],
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "ul",
            items: [
              "Inventory accuracy increased from 85% to 100%",
              "Returns processing time reduced by 30%",
              "Unaccounted inventory decreased by 15%",
              "Customer satisfaction scores improved by 25%",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "loan-reconciliation",
    title: "Loan reconciliation automation: 90% efficiency boost",
    category: "Fintech",
    date: "Jul 4, 2024",
    company: "Indian fintech",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Estimated annual savings", "$200K"],
              ["Reduction in processing time", "90%"],
              ["Loans reconciled monthly", "2M+"],
            ],
          ),
          {
            type: "p",
            text: "A major fintech player in India, managing over 2 million active loans, faced significant challenges reconciling loan disbursal and collections data across multiple systems. Legacy processes struggled with data from core banking systems, payment gateways, and collection agencies, leading to delays, errors, and operational inefficiencies.",
          },
          {
            type: "p",
            text: "The reconciliation process took up to five days each month. That delay exposed the company to financial discrepancies and hindered timely reporting to regulators. Manual exception handling overwhelmed the operations team, with over 5,000 cases requiring investigation monthly. The existing setup lacked the agility to adapt to new loan products and changing data formats.",
          },
        ],
      },
      {
        heading: "The solution",
        blocks: [
          {
            type: "p",
            text: "Osfin implemented a multi-source data ingestion layer capable of handling various file formats, an intelligent normalization engine to standardize data, and a configurable matching engine for complex reconciliation scenarios. Implementation, including data migration, rule configuration, and staff training, was completed in six weeks — 40% faster than initially projected.",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "ul",
            items: [
              "End-to-end reconciliation now completes in under 12 hours, a 90% reduction from the previous five-day cycle",
              "Auto-reconciliation rates increased to 90%",
              "60% reduction in unreconciled items and a 10% decrease in write-offs",
              "Reconciliation processes consolidated from 500+ to 50, and 200+ Excel spreadsheets eliminated",
              "Two legacy reconciliation systems decommissioned",
              "Estimated annual savings of $200K",
            ],
          },
          {
            type: "p",
            text: "“Osfin has revolutionized our reconciliation process. What used to take days is now completed in hours, with unprecedented accuracy. The platform's flexibility in handling various data sources has significantly improved our operational efficiency and financial visibility.” — Head of Operations",
          },
        ],
      },
    ],
  },
  {
    slug: "gaming-finance-automation",
    title: "Gaming finance automation: Indian company boosts efficiency",
    category: "Gaming",
    date: "Jun 4, 2024",
    company: "Indian gaming company",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Faster reconciliation", "90%"],
              ["Daily transactions reconciled", "5M+"],
              ["Auto-reconciliation rate", "98%"],
            ],
          ),
          {
            type: "p",
            text: "A leading Indian gaming company, handling 5M+ daily transactions, struggled with reconciling pay-ins and payouts across multiple platforms. Their existing system caused delays in balance updates and withdrawals, frustrating players and overwhelming the finance team.",
          },
        ],
      },
      {
        heading: "The solution",
        blocks: [
          {
            type: "p",
            text: "Osfin's gaming finance automation platform was implemented in six weeks, including multi-source data ingestion, automated data normalization, and intelligent reconciliation matching.",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "ul",
            items: [
              "Reconciliation time cut from 12 hours to 1 hour",
              "98% auto-reconciliation rate",
              "40% reduction in finance-related support tickets",
              "Improved player satisfaction and retention",
            ],
          },
          {
            type: "p",
            text: "“Osfin's gaming finance automation significantly improved our operations. Faster reconciliations have enhanced our players' experience with quicker balance updates and withdrawals.” — Financial Operations Manager",
          },
        ],
      },
    ],
  },
  {
    slug: "crypto-reconciliation",
    title: "Crypto reconciliation: exchange enhances efficiency",
    category: "Crypto",
    date: "May 6, 2024",
    company: "Crypto exchange",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Accuracy maintained", "100%"],
              ["Process automated", "95%"],
              ["Manual processing time reduced", "90%"],
            ],
          ),
          {
            type: "p",
            text: "A growing cryptocurrency exchange, handling over 100,000 transactions daily across multiple blockchains and fiat currencies, faced challenges reconciling on-chain and off-chain transactions. The exchange encountered discrepancies between blockchain data, internal ledgers, and cold storage wallets. The volatility of crypto trading made timely reconciliation essential for accurate balances and regulatory requirements.",
          },
        ],
      },
      {
        heading: "The solution",
        blocks: [
          {
            type: "ol",
            items: [
              "Multi-chain data integration from blockchains and internal systems",
              "Improved matching for on-chain and off-chain transactions",
              "Advanced monitoring to identify unusual transactions faster",
            ],
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "ul",
            items: [
              "95% of the reconciliation process automated, maintaining 100% accuracy",
              "Manual processing time reduced by 90%",
              "Unusual transactions identified more quickly",
              "Regulatory reporting time decreased by 50%",
            ],
          },
          {
            type: "p",
            text: "“Osfin's crypto reconciliation solution has significantly improved our operations. We've maintained 100% accuracy while greatly increasing our efficiency across crypto and fiat transactions.” — Head of Operations",
          },
        ],
      },
    ],
  },
  {
    slug: "card-reconciliation",
    title: "Card reconciliation: from days to hours",
    category: "Banking",
    date: "Apr 9, 2024",
    company: "Indian bank",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Estimated annual savings", "$500K"],
              ["Faster reconciliation", "97%"],
              ["Daily transactions", "10 million+"],
            ],
          ),
          {
            type: "p",
            text: "A leading Indian bank with 25 million card customers faced significant challenges managing its vast transaction network. Legacy systems struggled with complex data flows from multiple sources, leading to 120-hour reconciliation cycles and 500+ daily manual exceptions. The bank needed a solution to reduce processing time, improve accuracy, and ensure regulatory compliance.",
          },
        ],
      },
      {
        heading: "The solution",
        blocks: [
          {
            type: "ul",
            items: [
              "Multi-source data ingestion with custom connectors for payment systems",
              "Intelligent data standardization and matching engines",
              "ML-powered exception handling",
              "Real-time dashboards and alerts",
            ],
          },
          {
            type: "p",
            text: "The 14-week implementation yielded results within three months.",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "ul",
            items: [
              "Reconciliation time reduced to 3 hours",
              "Exception automation increased from 10% to 95%",
              "70% reduction in fraud detection false positives",
              "$500K estimated annual savings",
            ],
          },
          {
            type: "p",
            text: "“Osfin's platform has transformed our operations, meeting the demands of India's evolving digital payment landscape while enhancing customer service.” — Operations Manager",
          },
        ],
      },
    ],
  },
  {
    slug: "capital-markets-reconciliation",
    title: "Capital markets reconciliation for asset managers",
    category: "Capital Markets",
    date: "Mar 6, 2024",
    company: "Asset managers",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Reconciliation accuracy", "100%"],
              ["Faster SLA achievement", "25%"],
            ],
          ),
          {
            type: "p",
            text: "Osfin's capital markets reconciliation solution is designed for the complex needs of asset managers, as an alternative to legacy systems and outsourced services. While not yet implemented with live customers, the platform is built to bring reconciliation in-house with greater control.",
          },
        ],
      },
      {
        heading: "Capabilities",
        blocks: [
          {
            type: "ol",
            items: [
              "Cloud-based SaaS model for scalability and accessibility",
              "No-code interface for user-driven reconciliation management",
              "Multi-source data integration",
              "Real-time data processing",
            ],
          },
          {
            type: "p",
            text: "Use cases include general ledger, custodian, cash account, NAV, and regulatory reporting reconciliation (CFTC, Dodd-Frank).",
          },
        ],
      },
      {
        heading: "Potential benefits",
        blocks: [
          {
            type: "ul",
            items: [
              "Cost savings compared with traditional outsourcing",
              "Ability to bring reconciliation in-house",
              "25% faster achievement of SLAs with internal teams",
              "Reduced dependency on IT",
            ],
          },
          {
            type: "p",
            text: "“Osfin's capital markets reconciliation solution has the potential to transform how asset managers handle their data. The platform's flexibility and user-friendly interface could significantly improve operational efficiency and accuracy.” — Capital Markets Industry Expert",
          },
        ],
      },
    ],
  },
  {
    slug: "atm-reconciliation",
    title: "ATM operations: $1.5M annual savings",
    category: "Banking",
    date: "Feb 5, 2024",
    company: "ATM network",
    sections: [
      {
        heading: "Overview",
        blocks: [
          statsTable(
            ["Metric", "Result"],
            [
              ["Annual savings", "$1.5M"],
              ["Reduction in processing time", "95%"],
              ["ATMs automated", "1,500+"],
            ],
          ),
          {
            type: "p",
            text: "A leading Indian bank with over 1,500 ATMs across 20 states faced significant challenges managing its ATM network. Legacy systems struggled with complex data streams from multiple ATM types, switch providers, and core banking systems. Reconciliation taking up to 72 hours left the bank exposed to cash discrepancies and potential fraud. The operations team addressed over 500 exception cases daily.",
          },
        ],
      },
      {
        heading: "The solution",
        blocks: [
          {
            type: "p",
            text: "Osfin deployed multi-source data ingestion with custom connectors, an intelligent engine to standardise data, a configurable matching engine, machine-learning exception handling, and real-time dashboards. Data migration, rule configuration, and staff training were completed in 12 weeks — 60% faster than initially projected.",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "ul",
            items: [
              "End-to-end reconciliation for 1,500+ ATMs now completes in under 4 hours, a 95% reduction from the previous 72-hour cycle",
              "Exception automation increased from 20% to 85%",
              "Idle cash reduced and ATM uptime improved",
              "Operations team can create rules without lengthy IT cycles",
            ],
          },
          {
            type: "p",
            text: "“With Osfin, we've achieved a level of data control and process automation that we never thought possible. It's not just about reconciliation anymore — we're using the platform to drive strategic decisions across our entire ATM network.” — Head of Operations",
          },
        ],
      },
    ],
  },
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
    logo: "/customers/buku-warung.png",
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
