export type ProductIconKind = "mesh" | "venn" | "hex" | "octagon" | "squares";

export type Product = {
  slug: string;
  name: string;
  headline: string;
  lede: string;
  seoDescription?: string;
  problem: string[];
  capabilities: { title: string; lead?: string; body: string }[];
  icon: ProductIconKind;
  /** Homepage card accent */
  cardLabel: string;
  cardBody: string;
  cardBg: string;
  homeLabel: string;
  homeTitle: string;
  homeBody: string;
  /** Built-in ServicesStack scene id */
  sceneId: "growth" | "technology" | "ai" | "legal";
  platform?: {
    heading: string;
    body: string[];
    kicker: string;
    close: string;
  };
};

export const PRODUCTS: Product[] = [
  {
    slug: "match-iq",
    name: "Match IQ",
    cardLabel: "Reconciliation",
    cardBody:
      "Match IQ is the reconciliation foundation for enterprises that builds the cognitive layer for money in motion.",
    cardBg: "#d8dcec",
    homeLabel: "Reconciliation",
    homeTitle: "One platform. Every transaction",
    homeBody:
      "Teams can't keep pace with money in motion; systems can. Those systems run on Match, built from your transaction data, your matching logic, and the judgment of your finance teams.",
    sceneId: "technology",
    icon: "mesh",
    headline: "Match IQ is the reconciliation foundation for enterprises that builds the cognitive layer for money in motion",
    lede: "Data arrives from every source and gets matched at transaction level as it lands. Breaks are explained, resolved agentically and routed to the right owners when needed.",
    seoDescription:
      "Match IQ is the reconciliation foundation for enterprises that builds the cognitive layer for money in motion.",
    problem: [
      "Reconciliation breaks because payment data is scattered, unsynchronized, and unexplained. Every bank, gateway, processor and intermediary keeps its own record, on its own clock. When numbers disagree, identifying where and why breaks originated can become incredibly complex.",
    ],
    platform: {
      heading: "Match IQ Transaction Intelligence Platform",
      body: [
        "Teams can't keep pace with money in motion; systems can. Those systems run on Match, built from your transaction data, your matching logic, and the judgment of your finance teams. Every rule you write and every exception you resolve carries forward with its audit trail intact, so each new source, rail, or market starts ahead of the last. Over time, reconciliation stops being the work that holds up the close and becomes the financial intelligence that sets the pace of your growth.",
      ],
      kicker: "One platform. Every transaction",
      close:
        "Four capabilities, built for enterprises that move money at scale. Data arrives from every source, transactions are matched as they land, exceptions are resolved at their cause, and every result is recorded. Every step is traceable, auditable, and compliant by design.",
    },
    capabilities: [
      {
        title: "From raw data to ready, automatically",
        body: "ETL IQ sits underneath every match. New data is picked up the moment it arrives, whatever the format and whether it comes from a bank, processor, gateway or ledger, and it's turned into one governed structure. Nobody waits for an upload.",
      },
      {
        title: "Matching at the speed money moves",
        body: "Recon IQ reconciles a transaction as it lands, using rules that reflect how your business actually works. Every match is exact and can be proven. Volume that used to define the close clears in seconds.",
      },
      {
        title: "Every exception, explained and owned",
        body: "Every break gets traced to its root cause across your payments stack. Exceptions IQ resolves what it can on its own, and sends the rest to the right team with the evidence and the deadline attached.",
      },
      {
        title: "A live record of financial truth",
        body: "Reporting IQ leverages transaction data as the foundation to enable your organization to configure and access custom reports.",
      },
    ],
  },
  {
    slug: "exception-desk",
    name: "Exception Desk",
    cardLabel: "Exception management",
    cardBody:
      "Exception Desk finds the reason behind each break, fixes what it can by itself and sends the rest to the right person with the answer attached.",
    cardBg: "#e2deec",
    homeLabel: "Exceptions",
    homeTitle: "One desk. Every break",
    homeBody:
      "Exception Desk picks up where matching stops. It finds the reason behind every break, fixes what it can on its own, and sends the rest to the right person with the answer already attached. Every fix teaches it the next one. The queue gets shorter.",
    sceneId: "ai",
    icon: "venn",
    headline: "Exception Desk finds the reason behind each break",
    lede: "It fixes what it can by itself and sends the rest to the right person with the answer attached.",
    seoDescription:
      "Exception Desk by Osfin gives every payment break a reason code, resolves known fixes on its own, routes the rest to the right stakeholder, and learns from every resolution.",
    problem: [
      "The complexity in identifying and resolving breaks often leads to revenue leakage, write offs and reduced operational efficiency. This complexity is driven by the nature of how money moves, as well as the cognitive load of coordinating amongst internal and external systems and people to close a break.",
    ],
    platform: {
      heading: "Autonomous Payment Exception Resolution",
      body: [
        "Exception Desk picks up where matching stops. It finds the reason behind every break, fixes what it can on its own, and sends the rest to the right person with the answer already attached. Every fix teaches it the next one. The queue gets shorter.",
      ],
      kicker: "One desk. Every break",
      close:
        "Built for teams that clear breaks every day. Four capabilities take each break from reason to resolution. Every step is recorded and auditable.",
    },
    capabilities: [
      {
        title: "Every break gets a reason code",
        body: "A break is traced across the processor, the bank, the merchant and the ledger, then tagged with a plain reason code: fee mismatch, timing difference, duplicate, failed reversal or others. Your team sees what is breaking and how much of it.",
      },
      {
        title: "Resolved on its own, when the fix is known",
        body: "If a reason code has a standard fix, Exception Desk applies it. That could be a write-off within tolerance, a reversal or a retry, with the reason recorded, and a person never sees the break. To do this Exception Desk learns how your team solves new edge cases and stores it in our agent harness, after which our goal oriented agents take the necessary actions to resolve the break.",
      },
      {
        title: "Assigned to the right stakeholder",
        body: "Each reason code has an owner: operations, disputes, treasury, the merchant or the partner bank. The case goes to whoever can close it with the reason, the proof and the deadline attached, so nothing sits in the wrong inbox.",
      },
      {
        title: "Self-learning, with every break",
        body: "New patterns become new reason codes. Decisions your team keeps repeating become rules that Exception Desk applies by itself.",
      },
    ],
  },
  {
    slug: "regulatory-reporting",
    name: "Regulatory Reporting",
    cardLabel: "Reporting and Compliance",
    cardBody:
      "Regulatory Reporting builds each report from data Osfin has already matched, checks it against the regulator's rules and tracks every deadline.",
    cardBg: "#ebe2d8",
    homeLabel: "Reporting",
    homeTitle: "One record. Every regulator",
    homeBody:
      "Regulatory Reporting does the work every day, so the deadline is just a click. It builds each report from data Osfin has already matched, checks it against the regulator's rules, and tracks every deadline. When a regulator asks where a number came from, the answer is already there.",
    sceneId: "legal",
    icon: "hex",
    headline: "Where every regulatory report is ready before it's due",
    lede: "Regulatory Reporting builds each report from data Osfin has already matched, checks it against the regulator's rules and tracks every deadline.",
    seoDescription:
      "Regulatory Reporting by Osfin builds regulatory reports from matched data, catches errors before regulators do, tracks every deadline on one calendar, and proves every number in one click.",
    problem: [
      "Every regulatory report promises that the numbers are right: customer funds held, transactions processed, activity flagged as suspicious. But the numbers sit in processors, banks and ledgers that rarely agree, so teams reconcile by hand and paste into templates the night before the deadline. Regulators keep asking for more reports, more often, in more detail, and the work grows while the team doesn't.",
    ],
    platform: {
      heading: "Automated Reporting for Payments",
      body: [
        "Regulatory Reporting does the work every day, so the deadline is just a click. It builds each report from data Osfin has already matched, checks it against the regulator's rules, and tracks every deadline. When a regulator asks where a number came from, the answer is already there.",
      ],
      kicker: "One record. Every regulator",
      close:
        "Built for compliance and finance teams at banks, payment companies and fintechs.",
    },
    capabilities: [
      {
        title: "Reports that write themselves",
        body: "Regulators ask for the same numbers in different formats: customer funds held, transaction volumes, suspicious activity. Regulatory Reporting pulls them from your matched data and fills in each regulator's template. Copy-paste is retired.",
      },
      {
        title: "Caught by you, not the regulator",
        body: "Before a report goes out, it runs through the regulator's own checks, gets compared with the last period and is tied back to the bank and the ledger. If a field is missing or a number doesn't add up, you hear about it while there's time to fix it.",
      },
      {
        title: "Every deadline, one calendar",
        body: "Each regulator comes with its own rhythm of monthly, quarterly, and annual reports. Regulatory Reporting keeps them on one calendar, assigns who prepares and who approves, and moves each report toward submission. Late reports stop being a risk.",
      },
      {
        title: "Proof for every number",
        body: "When a regulator or auditor asks how you got a figure, one click shows the transactions, reconciliations and approvals behind it.",
      },
    ],
  },
  {
    slug: "risk-signals",
    name: "Risk Signals",
    cardLabel: "AML Reporting And Fraud Prevention",
    cardBody:
      "Risk Signals watches every payment as it moves, scores risk in real time, links related accounts and merchants, and opens a case with the evidence already gathered.",
    cardBg: "#d5e2d4",
    homeLabel: "Risk",
    homeTitle: "One view. Every rail",
    homeBody:
      "Risk Signals connects each payment to everything around it. Analyst decisions feed back in, so alerts get sharper.",
    sceneId: "growth",
    icon: "octagon",
    headline: "Where risk is seen before it becomes loss",
    lede: "Risk Signals watches every payment as it moves, scores risk in real time, links related accounts and merchants, and opens a case with the evidence already gathered.",
    seoDescription:
      "Risk Signals by Osfin links accounts to the people behind them, catches fraud rings whole, follows stolen money to where it lands, and investigates every alert in one place.",
    problem: [
      "Most fraud doesn't look like fraud. A card test, a refund or a new account looks normal on its own, and the risk only shows in the pattern across merchants, accounts and devices that separate systems never connect. Alerts fire one at a time and analysts clear the noise by hand, and the real loss turns up after the money has gone.",
    ],
    platform: {
      heading: "Risk Signals — Real-Time Payment Risk Intelligence",
      body: [
        "Risk Signals connects each payment to everything around it. Analyst decisions feed back in, so alerts get sharper.",
      ],
      kicker: "One view. Every rail",
      close:
        "Risk Signals is built for risk and compliance teams at acquirers, issuers, payment platforms and banks, and every action is logged for risk teams and regulators.",
    },
    capabilities: [
      {
        title: "Every account, linked to who's behind it",
        body: "Fraudsters open many accounts under different names but reuse the same phone, device or address. Risk Signals connects those details, so five strangers can be connected based on these inputs and revealed to be one person.",
      },
      {
        title: "The whole ring, not one account",
        body: "Fraud is organised. One account collects from many, or money passes through a chain and circles back. Risk Signals recognises these patterns across your network, so flagging one account brings up every account working with it.",
      },
      {
        title: "The money, followed to where it lands",
        body: "Stolen funds move fast through layers of accounts to hide where they end up. Risk Signals follows each transfer to the account that finally receives it, so your team acts on the one that matters.",
      },
      {
        title: "Every alert, investigated in one place",
        body: "An alert opens as a case with the linked accounts, the money trail and past decisions attached. Analysts decide and report to regulators without switching tools.",
      },
    ],
  },
  {
    slug: "close-orchestration",
    name: "Close Orchestration",
    cardLabel: "Financial close",
    cardBody:
      "Close Orchestration is the financial close foundation for enterprises where every entity has to be reconciled, certified and signed off.",
    cardBg: "#cfe8ec",
    homeLabel: "Close",
    homeTitle: "One close. Every entity",
    homeBody:
      "Close Orchestration does the finding every day. It pulls matched transactions and resolved breaks into the books as they happen, points out what's missing the day it goes missing and sends every sign-off with its proof attached.",
    sceneId: "technology",
    icon: "squares",
    headline: "Where the close stops being a search",
    lede: "Close Orchestration is the financial close foundation for enterprises where every entity has to be reconciled, certified and signed off.",
    seoDescription:
      "Close Orchestration by Osfin runs the financial close in one place: task management, self-certifying reconciliations, journal entries posted to your ERP, and variance analysis with live close status.",
    problem: [
      "Most of the close is finding things: the missing settlement file, the unbooked fee, the approval stuck in someone's inbox. The books take days because the answers are scattered across ledgers, processor files and spreadsheets. Add an entity or a new currency and there's more to find.",
    ],
    platform: {
      heading: "Close Orchestration — Continuous Financial Close",
      body: [
        "Close Orchestration does the finding every day. It pulls matched transactions and resolved breaks into the books as they happen, points out what's missing the day it goes missing and sends every sign-off with its proof attached.",
      ],
      kicker: "One close. Every entity",
      close:
        "It's built for finance teams closing high-volume payment businesses.",
    },
    capabilities: [
      {
        title: "Task management for the entire close",
        body: "Every close task sits in one checklist with a preparer, a reviewer, a due date and the tasks it depends on. Recurring tasks roll forward each period, and the owner is told when something slips.",
      },
      {
        title: "Reconciliations that certify themselves",
        body: "Each balance sheet account is tied to its sub-ledger and supporting data. Accounts that agree within your thresholds are certified automatically, and the rest go to a preparer with the difference and the backup attached.",
      },
      {
        title: "Journal entries, straight to your ERP",
        body: "Accruals, fee adjustments and corrections are drafted from matched data, reviewed, approved and posted to your ERP in one flow. Each entry keeps its support and approval history, so nothing gets re-keyed from a spreadsheet.",
      },
      {
        title: "Variance analysis with live close status",
        body: "Balances are compared period over period, and big moves are explained before sign-off. One dashboard shows what's done, what's open and which entity is behind, and audit evidence builds as the work happens.",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
