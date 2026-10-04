export type ProductIconKind = "mesh" | "venn" | "hex" | "octagon" | "squares";

export type Product = {
  slug: string;
  name: string;
  headline: string;
  lede: string;
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
    homeTitle: "Start with the records\nthat do not agree.",
    homeBody:
      "Match IQ compares every source as it arrives, so a break is named before someone rebuilds the trail by hand. Bank files, processor reports, and the ledger land in one structure, and every match stays traceable to the records that produced it.",
    icon: "mesh",
    headline: "The cognitive layer for money in motion.",
    lede: "Match IQ is the reconciliation foundation for enterprises where millions of transactions must be matched, resolved, and accounted for.",
    problem: [
      "Reconciliation breaks because payment data is scattered, unsynchronized, and unexplained. Every bank, gateway, and processor keeps its own record, on its own clock, with its own identifiers. When two numbers disagree, no one can say why until someone rebuilds the trail by hand.",
      "Add a new payment rail, then a new market, and the gaps multiply. No single view. No shared truth.",
      "Match IQ closes that gap.",
    ],
    platform: {
      heading: "Match IQ Transaction\nIntelligence Platform",
      body: [
        "Teams can't keep pace with money in motion; systems can. Those systems run on Match, built from your transaction data, your matching logic, and the judgment of your finance teams. Every rule you write and every exception you resolve carries forward with its audit trail intact, so each new source, rail, or market starts ahead of the last. Over time, reconciliation stops being the work that holds up the close and becomes the financial intelligence that sets the pace of your growth.",
      ],
      kicker: "One platform. Every transaction.",
      close:
        "Four capabilities, built for enterprises that move money at scale. Data arrives from every source, transactions are matched as they land, exceptions are resolved at their cause, and every result is recorded. Every step is traceable, auditable, and compliant by design.",
    },
    capabilities: [
      {
        title: "From raw data\nto ready, automatically.",
        body: "ETL IQ is the foundation beneath every match. It detects new data the moment it arrives, in any format, from any bank, processor, gateway, or ledger, and resolves it into a single governed structure. Nothing waits for an upload. Every source you add strengthens the whole.",
      },
      {
        title: "Matching at the speed\nmoney moves.",
        body: "Recon IQ reconciles every transaction as it lands, against rules that encode how your business actually operates. Every match is exact, and every match is provable. The volume that once defined the close now clears in seconds.",
      },
      {
        title: "Every exception,\nexplained and owned.",
        body: "Exceptions IQ traces each break to its root cause across every connected system. What can be resolved autonomously is. What requires judgment reaches the right team as a ticket, with the cause, the evidence, and the deadline already attached. Every resolution makes the next one faster.",
      },
      {
        title: "A live record\nof financial truth.",
        body: "Reporting IQ captures every match, exception, and resolution as it happens, traceable to the source. Views adapt to every team while the record beneath them stays constant, so the close no longer produces the record; it simply confirms what already exists.",
      },
    ],
  },
  {
    slug: "exception-resolution",
    name: "Exception Resolution",
    cardLabel: "Dispute and Chargeback management",
    cardBody:
      "Exception Resolution turns payment breaks, disputes, and chargebacks into structured decisions, so every case arrives with its cause, its owner, and a clear next outcome.",
    cardBg: "#e2deec",
    homeLabel: "Exceptions",
    homeTitle: "Give every break\na cause and an owner.",
    homeBody:
      "Exception Resolution gathers the evidence across systems and moves the case to the team that can close it. A missing settlement, a dispute, or a failed refund arrives with its cause, its owner, and the next action already attached.",
    icon: "venn",
    headline: "Every break arrives with its cause and owner.",
    lede: "Exception Resolution turns payment breaks, disputes, and chargebacks into structured decisions, so every case arrives with its cause, its owner, and a clear next outcome.",
    problem: [
      "Payment exceptions rarely belong to one system. A missing settlement, duplicate transaction, failed refund, or disputed charge can involve a processor, merchant, bank, ledger, and customer support team at the same time.",
      "Most teams manage these breaks through shared inboxes, spreadsheets, and disconnected tickets. Context gets lost between handoffs. Analysts repeat the same investigation, and decisions are difficult to explain after the fact.",
      "Exception Resolution connects the evidence, identifies the cause, and coordinates the next action.",
    ],
    platform: {
      heading: "The case arrives\nwith its cause attached.",
      body: [
        "Every exception contains a sequence of events, records, policies, and decisions. Exception Resolution brings those elements together so teams can understand what happened, determine what should happen next, and preserve the reasoning behind the outcome.",
        "The system learns from how your teams investigate and resolve breaks. Each decision becomes part of the operating memory for the next exception.",
      ],
      kicker: "Every exception should arrive with its context.",
      close:
        "Exception Resolution gathers the records across processor, merchant, bank, and ledger, then reconstructs the event that produced the break. The case reaches the team that can close it with the cause, the evidence, and the next action already attached.",
    },
    capabilities: [
      {
        title: "The originating\nevent, named.",
        body: "Investigation IQ traces the exception across payment, settlement, ledger, and support systems until the event that started it is named. A missing settlement, a duplicate, or a disputed charge arrives with the records that explain it, so the work does not begin from an empty ticket.",
      },
      {
        title: "One view\nfor the decision.",
        body: "Decision IQ gathers the transaction history, the policy that applies, the correspondence, and the supporting documents into a single resolution view. The team sees what happened and what the policy allows before anyone writes the outcome by hand.",
      },
      {
        title: "The right team,\nwith the file attached.",
        body: "Workflow IQ sends each case to the team that can close it, with the cause, the priority, the evidence, and the next action already on it. The trail stays intact between the processor, the merchant, the bank, and support.",
      },
      {
        title: "The last resolution,\nstill in the room.",
        body: "Resolution Memory IQ keeps the decision, the pattern, and the outcome with the case. The next break of the same kind starts from that reasoning, so the investigation is not rebuilt from the first record.",
      },
    ],
  },
  {
    slug: "control-views",
    name: "Control Views",
    cardLabel: "Reporting and Compliance",
    cardBody:
      "Control Views turns payment activity into accountable reporting, compliance evidence, and operational clarity from one record that can be traced to its source.",
    cardBg: "#ebe2d8",
    homeLabel: "Control",
    homeTitle: "See the number and\nthe record behind it.",
    homeBody:
      "Control Views gives finance, operations, risk, and audit one governed record, each with the view they need. A reported number can be followed back to the source, the rule, and the decision, without waiting for the period to end.",
    icon: "hex",
    headline: "The operating record for financial control.",
    lede: "Control Views turns payment activity into accountable reporting, compliance evidence, and operational clarity from one record that can be traced to its source.",
    problem: [
      "Financial reporting becomes difficult when every team sees a different version of operational reality. Finance works from the ledger, operations works from processor files, risk works from cases, and compliance works from periodic extracts.",
      "By the time those views are assembled, the underlying activity has changed. Teams cannot easily trace a number back to its source, explain a movement, or prove how a decision was made.",
      "Control Views creates one governed record that every team can use.",
    ],
    platform: {
      heading: "Follow the number\nback to the record.",
      body: [
        "Control Views connects operational events to the financial record beneath them. It gives each team the view it needs while preserving one consistent source of truth underneath.",
        "Every number can be traced to the source record, the rule applied, the exception raised, and the decision made. Reporting becomes a continuous operating layer rather than a task performed at the end of the period.",
      ],
      kicker: "One record. Every operational view.",
      close:
        "Control Views turns transaction activity into one record that finance, operations, risk, audit, and compliance can each read in the view they need. A reported figure can be followed to the source, the rule, and the decision without waiting for the period to end.",
    },
    capabilities: [
      {
        title: "The record\nbehind the figure.",
        body: "Source IQ ties every dashboard and report to the transaction, settlement, case, or ledger entry that produced it. A number can be opened back to the record, so the explanation does not wait on a fresh extract.",
      },
      {
        title: "Policy, visible\nwhile the work moves.",
        body: "Policy IQ applies control requirements as activity passes through the system, and makes ownership and exceptions visible before a report is assembled. The rule is part of the workflow, not a check performed after the number is already published.",
      },
      {
        title: "Movement, seen\nas it happens.",
        body: "Control IQ surfaces changes, breaks, and unusual activity across operational and financial views without waiting for a reporting cycle. The team sees the movement while it can still be explained, not after the period has closed around it.",
      },
      {
        title: "Evidence that stands\nwithout a reconstruction.",
        body: "Audit IQ keeps the source, the rule, the action, and the approval behind every reported outcome. The evidence is already attached to the figure, so an audit does not have to rebuild the path by hand.",
      },
    ],
  },
  {
    slug: "risk-signals",
    name: "Risk Signals",
    cardLabel: "AML Reporting And Fraud Prevention",
    cardBody:
      "Risk Signals helps payment teams identify behavioral patterns, investigate suspicious activity, and coordinate action before risk becomes loss.",
    cardBg: "#d8e2ea",
    homeLabel: "Risk",
    homeTitle: "See the pattern before\nit becomes the loss.",
    homeBody:
      "Risk Signals connects velocity, counterparties, and prior decisions so an investigation starts with its context attached. Patterns across accounts, merchants, and instruments surface before they become a loss the team has to reconstruct.",
    icon: "octagon",
    headline: "Name the pattern before it becomes the loss.",
    lede: "Risk Signals helps payment teams identify behavioral patterns, investigate suspicious activity, and coordinate action before risk becomes loss.",
    problem: [
      "Payment risk does not arrive as a single event. It emerges through patterns across transactions, accounts, merchants, devices, geographies, and operational behavior.",
      "Traditional monitoring systems evaluate isolated signals and create alerts without enough context. Analysts then spend time assembling the pattern themselves, often after the exposure has already grown.",
      "Risk Signals connects weak signals into a living view of risk.",
    ],
    platform: {
      heading: "Name the pattern\nbefore it is a loss.",
      body: [
        "Risk Signals understands that risk is contextual. It connects transaction behavior, account history, operational events, policy thresholds, and prior decisions to show how a signal is forming.",
        "The system helps teams distinguish a meaningful pattern from noise, coordinate investigations, and carry the reasoning from one review into the next.",
      ],
      kicker: "See the pattern before it becomes the event.",
      close:
        "Risk Signals watches payment activity as it moves and names the change that matters. The investigation starts with the behavior, the related accounts, and the policy already attached, before the exposure has to be reconstructed.",
    },
    capabilities: [
      {
        title: "Behavior that does not\nfit the history.",
        body: "Signal IQ watches velocity, amounts, counterparties, geography, and account behavior for a change that does not fit what came before. The signal arrives with the history it broke from, so the review does not start as a bare alert.",
      },
      {
        title: "One exposure,\nacross the network.",
        body: "Pattern IQ links related activity across merchants, accounts, instruments, and operational events. What looked like separate alerts becomes one exposure the team can see before it spreads.",
      },
      {
        title: "From the alert\nto the file.",
        body: "Investigation IQ assembles the evidence, the history, and the policy context a review needs. The analyst opens a case that already holds the records, instead of collecting them from each system in turn.",
      },
      {
        title: "A decision that can\nbe explained later.",
        body: "Decision IQ records the action, the approval, the escalation, and the outcome of every review. The reasoning stays with the signal, so a later question does not depend on who happened to work the case.",
      },
    ],
  },
  {
    slug: "close-orchestration",
    name: "Close Orchestration",
    cardLabel: "Financial close-orchestration",
    cardBody:
      "Close Orchestration coordinates the records, controls, approvals, and decisions required to move from operational activity to a confident financial close.",
    cardBg: "#e6e6e6",
    homeLabel: "Close",
    homeTitle: "Carry the close\nforward.",
    homeBody:
      "Close Orchestration lines up reconciled records, open exceptions, approvals, and evidence so the period confirms what the business already knows. Unresolved work carries its context into the next period, so the close starts from the last one instead of a blank sheet.",
    icon: "squares",
    headline: "Close confirms what the books already hold.",
    lede: "Close Orchestration coordinates the records, controls, approvals, and decisions required to move from operational activity to a confident financial close.",
    problem: [
      "The close becomes difficult when financial truth is assembled manually from systems that were never designed to work together. Teams chase missing records, validate exceptions, request approvals, and reconcile changes across spreadsheets and email.",
      "The final close may be accurate, but the path to it is slow, repetitive, and difficult to audit. Every period begins with the same questions because the reasoning from the last close was not preserved.",
      "Close Orchestration turns the close into a continuous operating process.",
    ],
    platform: {
      heading: "The close confirms\nwhat the books already hold.",
      body: [
        "The close should confirm what the business already knows, not reveal what it failed to connect. Close Orchestration brings together reconciled records, open exceptions, control checks, approvals, and sign-offs in one operating sequence.",
        "Each close creates a stronger starting point for the next one. Decisions remain attached to the records they govern, and unresolved work moves forward with its context intact.",
      ],
      kicker: "From operational activity to a close you can explain.",
      close:
        "Close Orchestration lines up the reconciled records, the open exceptions, the control checks, and the approvals the period still needs. What remains unresolved carries its context forward, so the next close starts from the last one.",
    },
    capabilities: [
      {
        title: "The operating record,\nbefore the close begins.",
        body: "Close IQ brings together reconciled transactions, settlement positions, adjustments, and ledger activity before the period is assembled by hand. The close opens on a record that already exists, not on a stack of files still being chased.",
      },
      {
        title: "What still needs\na decision.",
        body: "Control IQ checks completeness, policy requirements, open exceptions, and unresolved movements across the close. The team sees what is ready and what is not, instead of discovering the gap at sign-off.",
      },
      {
        title: "Approvals, with\nthe evidence attached.",
        body: "Approval IQ routes each decision to the owner who can make it, with the evidence, the rationale, and the deadline already on the request. Sign-off does not wait on a thread that has lost the record.",
      },
      {
        title: "The last period,\nstill attached.",
        body: "Close Memory IQ keeps prior decisions, recurring issues, and control outcomes with the work they governed. The next period begins from that context, so the same questions are not asked of a blank sheet.",
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
