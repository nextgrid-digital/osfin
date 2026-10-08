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
    slug: "settlement-mesh",
    name: "Match IQ",
    cardLabel: "Reconciliation",
    cardBody:
      "Match IQ is the reconciliation foundation for enterprises where millions of transactions must be matched, resolved, and accounted for.",
    cardBg: "#d9e5d8",
    homeLabel: "Reconciliation",
    homeTitle: "One platform. Every transaction.",
    homeBody:
      "Teams can't keep pace with money in motion; systems can. Those systems run on Match, built from your transaction data, your matching logic, and the judgment of your finance teams.",
    sceneId: "technology",
    icon: "mesh",
    headline: "The cognitive layer for money in motion.",
    lede: "Match IQ is the reconciliation foundation for enterprises where millions of transactions must be matched, resolved, and accounted for.",
    seoDescription:
      "Match IQ by Osfin is the reconciliation foundation for enterprises where millions of transactions must be matched, resolved, and accounted for.",
    problem: [
      "Reconciliation breaks because payment data is scattered, unsynchronized, and unexplained. Every bank, gateway, and processor keeps its own record, on its own clock, with its own identifiers. When two numbers disagree, no one can say why until someone rebuilds the trail by hand.",
      "Add a new payment rail, then a new market, and the gaps multiply. No single view. No shared truth.",
      "Match IQ closes that gap.",
    ],
    platform: {
      heading: "Match IQ Transaction Intelligence Platform",
      body: [
        "Teams can't keep pace with money in motion; systems can. Those systems run on Match, built from your transaction data, your matching logic, and the judgment of your finance teams. Every rule you write and every exception you resolve carries forward with its audit trail intact, so each new source, rail, or market starts ahead of the last. Over time, reconciliation stops being the work that holds up the close and becomes the financial intelligence that sets the pace of your growth.",
      ],
      kicker: "One platform. Every transaction.",
      close:
        "Four capabilities, built for enterprises that move money at scale. Data arrives from every source, transactions are matched as they land, exceptions are resolved at their cause, and every result is recorded. Every step is traceable, auditable, and compliant by design.",
    },
    capabilities: [
      {
        title: "From raw data to ready, automatically.",
        body: "ETL IQ is the foundation beneath every match. It detects new data the moment it arrives, in any format, from any bank, processor, gateway, or ledger, and resolves it into a single governed structure. Nothing waits for an upload. Every source you add strengthens the whole.",
      },
      {
        title: "Matching at the speed money moves.",
        body: "Recon IQ reconciles every transaction as it lands, against rules that encode how your business actually operates. Every match is exact, and every match is provable. The volume that once defined the close now clears in seconds.",
      },
      {
        title: "Every exception, explained and owned.",
        body: "Exceptions IQ traces each break to its root cause across every connected system. What can be resolved autonomously is. What requires judgment reaches the right team as a ticket, with the cause, the evidence, and the deadline already attached. Every resolution makes the next one faster.",
      },
      {
        title: "A live record of financial truth.",
        body: "Reporting IQ captures every match, exception, and resolution as it happens, traceable to the source. Views adapt to every team while the record beneath them stays constant, so the close no longer produces the record; it simply confirms what already exists.",
      },
    ],
  },
  {
    slug: "exception-resolution",
    name: "Exception Desk",
    cardLabel: "Exception management",
    cardBody:
      "Exception Desk finds the reason behind every break, fixes what it can on its own, and sends the rest to the right person with the answer already attached.",
    cardBg: "#e2deec",
    homeLabel: "Exceptions",
    homeTitle: "One desk. Every break.",
    homeBody:
      "Exception Desk picks up where matching stops. It finds the reason behind every break, fixes what it can on its own, and sends the rest to the right person with the answer already attached.",
    sceneId: "ai",
    icon: "venn",
    headline: "Where every break finds its reason.",
    lede: "Exception Desk finds the reason behind every break, fixes what it can on its own, and sends the rest to the right person with the answer already attached.",
    seoDescription:
      "Exception Desk by Osfin gives every payment break a reason code, resolves known fixes on its own, routes the rest to the right stakeholder, and learns from every resolution.",
    problem: [
      "A break without a reason can't be closed with confidence. It can be written off or left to age, but not explained to an auditor, a card scheme, or a customer waiting on a refund. The reason sits upstream, somewhere between the processor, the bank, the merchant, and the ledger, and someone has to rebuild it by hand.",
      "Add volume, then a new rail, and the hunt repeats for every break. No clear owner. No next step.",
      "Exception Desk finds the reason first.",
    ],
    platform: {
      heading: "Exception Desk — Autonomous Payment Exception Resolution",
      body: [
        "Exception Desk picks up where matching stops. It finds the reason behind every break, fixes what it can on its own, and sends the rest to the right person with the answer already attached. Every fix teaches it the next one. The queue gets shorter.",
      ],
      kicker: "One desk. Every break.",
      close:
        "Built for teams that clear breaks every day. Four capabilities take each break from reason to resolution. Every step is recorded and auditable.",
    },
    capabilities: [
      {
        title: "Every break gets a reason code.",
        body: "Exception Desk traces each break across the processor, the bank, the merchant, and the ledger, then tags it with a clear reason code: fee mismatch, timing difference, duplicate, failed reversal. Every break is named the same way, every time, so teams see what is breaking, not just how much.",
      },
      {
        title: "Resolved on its own, when the fix is known.",
        body: "When a reason code has a standard fix, Exception Desk applies it: a write-off within tolerance, a reversal, or a retry, with the reason recorded. Those breaks never reach a person. Your team sees only the ones that need judgment.",
      },
      {
        title: "Assigned to the right stakeholder.",
        body: "Each reason code maps to an owner: operations, disputes, treasury, the merchant, or the partner bank. Exception Desk sends every case to the stakeholder who can close it, with the reason, the proof, and the deadline attached. Nothing waits in the wrong inbox.",
      },
      {
        title: "Self-learning, with every break.",
        body: "Exception Desk learns from every resolution your team makes. New patterns become new reason codes, and repeated decisions become rules it applies on its own. The more breaks it sees, the fewer need a person. Every break makes the next one easier.",
      },
    ],
  },
  {
    slug: "control-views",
    name: "Regulatory Reporting",
    cardLabel: "Reporting and Compliance",
    cardBody:
      "Regulatory Reporting builds each report from data Osfin has already matched, checks it against the regulator's rules, and tracks every deadline.",
    cardBg: "#ebe2d8",
    homeLabel: "Reporting",
    homeTitle: "One record. Every regulator.",
    homeBody:
      "Regulatory Reporting does the work every day, so the deadline is just a click. It builds each report from data Osfin has already matched, checks it against the regulator's rules, and tracks every deadline.",
    sceneId: "legal",
    icon: "hex",
    headline: "Where every regulatory report is ready before it's due.",
    lede: "Regulatory Reporting builds each report from data Osfin has already matched, checks it against the regulator's rules, and tracks every deadline.",
    seoDescription:
      "Regulatory Reporting by Osfin builds regulatory reports from matched data, catches errors before regulators do, tracks every deadline on one calendar, and proves every number in one click.",
    problem: [
      "Every regulatory report is a promise that the numbers are right: customer funds held, transactions processed, activity flagged as suspicious. But those numbers live in processors, banks, and ledgers that rarely agree, so teams reconcile them by hand and paste them into templates the night before the deadline.",
      "Regulators keep asking for more: more reports, more often, in more detail. The work grows every year. The team doesn't.",
      "Regulatory Reporting keeps the promise for you.",
    ],
    platform: {
      heading: "Regulatory Reporting — Automated Reporting for Payments",
      body: [
        "Regulatory Reporting does the work every day, so the deadline is just a click. It builds each report from data Osfin has already matched, checks it against the regulator's rules, and tracks every deadline. When a regulator asks where a number came from, the answer is already there.",
      ],
      kicker: "One record. Every regulator.",
      close:
        "Built for compliance and finance teams at banks, payment companies, and fintechs. Four capabilities take each report from raw data to submission.",
    },
    capabilities: [
      {
        title: "Reports that write themselves.",
        body: "Regulators ask for the same numbers in different formats: customer funds held, transaction volumes, suspicious activity. Regulatory Reporting pulls them from your matched data and fills in each regulator's template. Copy-paste is retired.",
      },
      {
        title: "Caught by you, not the regulator.",
        body: "Every report runs through the regulator's own checks before it leaves, is compared with last period, and is tied back to the bank and the ledger. A missing field or a number that doesn't add up gets flagged while there's time to fix it. Resubmissions become rare.",
      },
      {
        title: "Every deadline, one calendar.",
        body: "Each regulator comes with its own rhythm of monthly, quarterly, and annual reports. Regulatory Reporting keeps them on one calendar, assigns who prepares and who approves, and moves each report toward submission. Late reports stop being a risk.",
      },
      {
        title: "Proof for every number.",
        body: "When a regulator or auditor asks how a figure was reached, one click shows the transactions, reconciliations, and approvals behind it. Every issue and its fix is on record. Hard questions get easy answers.",
      },
    ],
  },
  {
    slug: "risk-signals",
    name: "Risk Signals",
    cardLabel: "AML Reporting And Fraud Prevention",
    cardBody:
      "Risk Signals watches every payment as it moves, scores risk in real time, links related accounts and merchants, and opens a case with the evidence already gathered.",
    cardBg: "#d8e2ea",
    homeLabel: "Risk",
    homeTitle: "One view. Every rail.",
    homeBody:
      "Risk Signals watches every payment as it moves and connects it to everything around it. It scores risk in real time, links related accounts and merchants, and opens a case with the evidence already gathered.",
    sceneId: "growth",
    icon: "octagon",
    headline: "Where risk is seen before it becomes loss.",
    lede: "Risk Signals watches every payment as it moves, scores risk in real time, links related accounts and merchants, and opens a case with the evidence already gathered.",
    seoDescription:
      "Risk Signals by Osfin links accounts to the people behind them, catches fraud rings whole, follows stolen money to where it lands, and investigates every alert in one place.",
    problem: [
      "Most fraud doesn't look like fraud. One card test, one refund, one new account looks normal on its own. The risk only shows up in the pattern, across merchants, accounts, and devices that separate systems never connect. So alerts fire one at a time, analysts clear the noise by hand, and the real loss is found after the money has gone.",
      "Add volume, then a new rail, and the noise grows. More alerts. Less signal.",
      "Risk Signals sees the pattern first.",
    ],
    platform: {
      heading: "Risk Signals — Real-Time Payment Risk Intelligence",
      body: [
        "Risk Signals watches every payment as it moves and connects it to everything around it. It scores risk in real time, links related accounts and merchants, and opens a case with the evidence already gathered. Every analyst decision makes the next alert sharper. The noise gets quieter.",
      ],
      kicker: "One view. Every rail.",
      close:
        "Built for risk and compliance teams at acquirers, issuers, payment platforms, and wallets. Four capabilities take each signal from alert to decision. Every action is logged for regulators and partner banks.",
    },
    capabilities: [
      {
        title: "Every account, linked to who's behind it.",
        body: "Fraudsters open many accounts under different names, but reuse the same phone, device, or address. Risk Signals connects those details, so five strangers resolve into one person. Disguises stop working.",
      },
      {
        title: "The whole ring, not one account.",
        body: "Fraud is organised: one account collecting from many, or money passing through a chain and circling back. Risk Signals recognises these patterns across your network. Flag one account, and every account working with it surfaces too.",
      },
      {
        title: "The money, followed to where it lands.",
        body: "Stolen funds move fast through layers of accounts to hide where they end up. Risk Signals follows every transfer to the account that finally receives it. Your team acts on the one that matters, not the first in line.",
      },
      {
        title: "Every alert, investigated in one place.",
        body: "Each alert opens as a case with the linked accounts, the money trail, and past decisions attached. Analysts decide and report to regulators without switching tools. Every decision teaches the system, so false alarms keep falling.",
      },
    ],
  },
  {
    slug: "close-orchestration",
    name: "Close Orchestration",
    cardLabel: "Financial close",
    cardBody:
      "Close Orchestration is the financial close foundation for enterprises where every entity must be reconciled, certified, and signed off.",
    cardBg: "#e6e6e6",
    homeLabel: "Close",
    homeTitle: "One close. Every entity.",
    homeBody:
      "Close Orchestration does the finding every day, so the close doesn't have to. It pulls matched transactions and resolved breaks into the books as they happen, flags what's missing the day it goes missing, and sends every sign-off with its proof attached.",
    sceneId: "technology",
    icon: "squares",
    headline: "Where the close stops being a search.",
    lede: "Close Orchestration is the financial close foundation for enterprises where every entity must be reconciled, certified, and signed off.",
    seoDescription:
      "Close Orchestration by Osfin runs the financial close in one place: task management, self-certifying reconciliations, journal entries posted to your ERP, and variance analysis with live close status.",
    problem: [
      "Most of the close isn't closing. It's finding. The missing settlement file, the unbooked fee, the approval stuck in someone's inbox. The books take days not because the numbers are hard, but because the answers are scattered across ledgers, processor files, and spreadsheets.",
      "Add an entity, then a new currency, and there's more to find. Same hunt. Same late nights.",
      "Close Orchestration finds it before the close begins.",
    ],
    platform: {
      heading: "Close Orchestration — Continuous Financial Close",
      body: [
        "Close Orchestration does the finding every day, so the close doesn't have to. It pulls matched transactions and resolved breaks into the books as they happen, flags what's missing the day it goes missing, and sends every sign-off with its proof attached. Every close teaches it the next one. The close gets shorter.",
      ],
      kicker: "One close. Every entity.",
      close:
        "Built for finance teams closing high-volume payment businesses. Four capabilities take each period from open to signed off. Nothing is left to find at the end.",
    },
    capabilities: [
      {
        title: "Task management for the entire close.",
        body: "Every close task sits in one checklist with a preparer, a reviewer, a due date, and the tasks it depends on. Recurring tasks roll forward each period on their own. When anything slips or gets blocked, the owner knows right away.",
      },
      {
        title: "Reconciliations that certify themselves.",
        body: "Each balance sheet account is tied to its sub-ledger and supporting data. Accounts that agree within your thresholds are certified automatically. The rest reach a preparer with the difference, the detail, and the backup already attached.",
      },
      {
        title: "Journal entries, straight to your ERP.",
        body: "Accruals, fee adjustments, and corrections are drafted from matched data, reviewed, approved, and posted to your ERP in one flow. Each entry keeps its support and approval history. Nothing is re-keyed from a spreadsheet.",
      },
      {
        title: "Variance analysis with live close status.",
        body: "Balances are compared period over period, and significant moves are explained before sign-off. One dashboard shows the whole close: what's done, what's open, and which entity is behind. Audit evidence builds as the work happens.",
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
