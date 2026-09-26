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
      "Match IQ is the reconciliation foundation for enterprises where millions of transactions cross countless systems each day, and every one must be matched, resolved, and accounted for.",
    cardBg: "#d9e5d8",
    icon: "mesh",
    headline: "The cognitive layer for\nmoney in motion.",
    lede: "Match IQ is the reconciliation foundation for enterprises where millions of transactions cross countless systems each day, and every one must be matched, resolved, and accounted for.",
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
    name: "Exception Resolution",
    cardLabel: "Dispute and Chargeback management",
    cardBody:
      "Exception Resolution turns payment breaks, disputes, and chargebacks into structured decisions that move to the right outcome.",
    cardBg: "#e2deec",
    icon: "venn",
    headline: "The intelligence layer for every unresolved payment.",
    lede: "Exception Resolution turns payment breaks, disputes, and chargebacks into structured decisions that move to the right outcome.",
    problem: [
      "Payment exceptions rarely belong to one system. A missing settlement, duplicate transaction, failed refund, or disputed charge can involve a processor, merchant, bank, ledger, and customer support team at the same time.",
      "Most teams manage these breaks through shared inboxes, spreadsheets, and disconnected tickets. Context gets lost between handoffs. Analysts repeat the same investigation, and decisions are difficult to explain after the fact.",
      "Exception Resolution connects the evidence, identifies the cause, and coordinates the next action.",
    ],
    platform: {
      heading: "Exception Resolution\nDecision intelligence",
      body: [
        "Every exception contains a sequence of events, records, policies, and decisions. Exception Resolution brings those elements together so teams can understand what happened, determine what should happen next, and preserve the reasoning behind the outcome.",
        "The system learns from how your teams investigate and resolve breaks. Each decision becomes part of the operating memory for the next exception.",
      ],
      kicker: "Every exception should arrive with its context.",
      close:
        "Exception Resolution gathers the relevant records, reconstructs the event chain, applies the right policy, and routes the case with the evidence required for action.",
    },
    capabilities: [
      {
        title: "Find the cause behind the break.",
        body: "Investigation IQ traces exceptions across payment, settlement, ledger, and support systems to identify the originating event.",
      },
      {
        title: "Turn evidence into a decision.",
        body: "Decision IQ assembles transaction history, policy rules, correspondence, and supporting documents into one resolution view.",
      },
      {
        title: "Route work with context attached.",
        body: "Workflow IQ sends each case to the right team with the cause, priority, evidence, and next action already defined.",
      },
      {
        title: "Make every resolution reusable.",
        body: "Resolution Memory IQ carries decisions, patterns, and outcomes forward so recurring exceptions become faster to resolve.",
      },
    ],
  },
  {
    slug: "control-views",
    name: "Control Views",
    cardLabel: "Reporting and Compliance",
    cardBody:
      "Control Views turns payment activity into accountable reporting, compliance evidence, and operational clarity, so every team works from one record that can be traced to its source.",
    cardBg: "#ebe2d8",
    icon: "hex",
    headline: "The operating record for financial control.",
    lede: "Control Views turns payment activity into accountable reporting, compliance evidence, and operational clarity, so every team works from one record that can be traced to its source.",
    problem: [
      "Financial reporting becomes difficult when every team sees a different version of operational reality. Finance works from the ledger, operations works from processor files, risk works from cases, and compliance works from periodic extracts.",
      "By the time those views are assembled, the underlying activity has changed. Teams cannot easily trace a number back to its source, explain a movement, or prove how a decision was made.",
      "Control Views creates one governed record that every team can use.",
    ],
    platform: {
      heading: "Control Views\nA governed financial view",
      body: [
        "Control Views connects operational events to the financial record beneath them. It gives each team the view it needs while preserving one consistent source of truth underneath.",
        "Every number can be traced to the source record, the rule applied, the exception raised, and the decision made. Reporting becomes a continuous operating layer rather than a task performed at the end of the period.",
      ],
      kicker: "One record. Every operational view.",
      close:
        "Control Views transforms transaction activity into controlled, traceable views for finance, operations, risk, audit, and compliance.",
    },
    capabilities: [
      {
        title: "See the record behind every number.",
        body: "Source IQ connects dashboards and reports to the transaction, settlement, case, or ledger record that produced the result.",
      },
      {
        title: "Make policy visible in the workflow.",
        body: "Policy IQ applies control requirements as activity moves through the system, making ownership and exceptions visible before reporting begins.",
      },
      {
        title: "Monitor movement as it happens.",
        body: "Control IQ surfaces changes, breaks, and unusual activity across operational and financial views without waiting for a reporting cycle.",
      },
      {
        title: "Produce evidence that stands on its own.",
        body: "Audit IQ preserves the source, rule, action, and approval behind every reported outcome.",
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
    icon: "octagon",
    headline: "The intelligence layer for emerging payment risk.",
    lede: "Risk Signals helps payment teams identify behavioral patterns, investigate suspicious activity, and coordinate action before risk becomes loss.",
    problem: [
      "Payment risk does not arrive as a single event. It emerges through patterns across transactions, accounts, merchants, devices, geographies, and operational behavior.",
      "Traditional monitoring systems evaluate isolated signals and create alerts without enough context. Analysts then spend time assembling the pattern themselves, often after the exposure has already grown.",
      "Risk Signals connects weak signals into a living view of risk.",
    ],
    platform: {
      heading: "Risk Signals\nPattern intelligence for risk",
      body: [
        "Risk Signals understands that risk is contextual. It connects transaction behavior, account history, operational events, policy thresholds, and prior decisions to show how a signal is forming.",
        "The system helps teams distinguish a meaningful pattern from noise, coordinate investigations, and carry the reasoning from one review into the next.",
      ],
      kicker: "See the pattern before it becomes the event.",
      close:
        "Risk Signals continuously evaluates payment activity, detects meaningful changes, and gives risk teams the context required to investigate and act.",
    },
    capabilities: [
      {
        title: "Detect behavior that does not fit.",
        body: "Signal IQ identifies changes across transaction velocity, amounts, counterparties, geography, and account behavior.",
      },
      {
        title: "Connect signals across the payment network.",
        body: "Pattern IQ links related activity across merchants, accounts, instruments, and operational events to reveal broader exposure.",
      },
      {
        title: "Move from alert to investigation.",
        body: "Investigation IQ assembles the evidence, history, and policy context required to review a signal.",
      },
      {
        title: "Keep risk decisions accountable.",
        body: "Decision IQ records actions, approvals, escalations, and outcomes so every risk decision can be explained later.",
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
    icon: "squares",
    headline: "The intelligence layer that carries the close forward.",
    lede: "Close Orchestration coordinates the records, controls, approvals, and decisions required to move from operational activity to a confident financial close.",
    problem: [
      "The close becomes difficult when financial truth is assembled manually from systems that were never designed to work together. Teams chase missing records, validate exceptions, request approvals, and reconcile changes across spreadsheets and email.",
      "The final close may be accurate, but the path to it is slow, repetitive, and difficult to audit. Every period begins with the same questions because the reasoning from the last close was not preserved.",
      "Close Orchestration turns the close into a continuous operating process.",
    ],
    platform: {
      heading: "Close Orchestration\nIntelligence for the close",
      body: [
        "The close should confirm what the business already knows, not reveal what it failed to connect. Close Orchestration brings together reconciled records, open exceptions, control checks, approvals, and sign-offs in one operating sequence.",
        "Each close creates a stronger starting point for the next one. Decisions remain attached to the records they govern, and unresolved work moves forward with its context intact.",
      ],
      kicker: "From operational activity to a close you can explain.",
      close:
        "Close Orchestration coordinates every required control, identifies what still needs attention, and preserves the evidence behind the final financial position.",
    },
    capabilities: [
      {
        title: "Start with a complete operating record.",
        body: "Close IQ brings together reconciled transactions, settlement positions, adjustments, and ledger activity before the close begins.",
      },
      {
        title: "Verify what requires attention.",
        body: "Control IQ checks completeness, policy requirements, open exceptions, and unresolved movements across the close process.",
      },
      {
        title: "Coordinate approvals and sign-offs.",
        body: "Approval IQ routes decisions to the right owners with the evidence, rationale, and deadline already attached.",
      },
      {
        title: "Carry the close forward.",
        body: "Close Memory IQ preserves prior decisions, recurring issues, and control outcomes so every period begins with more context than the last.",
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
