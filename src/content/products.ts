export type ProductIconKind = "mesh" | "venn" | "hex" | "octagon" | "squares";

export type Product = {
  slug: string;
  name: string;
  headline: string;
  lede: string;
  problem: [string, string];
  capabilities: { title: string; lead: string; body: string }[];
  icon: ProductIconKind;
  /** Homepage card accent */
  cardLabel: string;
  cardBody: string;
  cardBg: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "settlement-mesh",
    name: "Settlement Mesh",
    cardLabel: "Reconciliation",
    cardBody:
      "Reconciliation infrastructure that connects payment records across banks, gateways, processors, and internal ledgers.",
    cardBg: "#d9e5d8",
    icon: "mesh",
    headline: "One mesh for every\npayment record.",
    lede: "Connects banks, gateways, processors, and ledgers so matching happens against a single, current set of records, not five exports.",
    problem: [
      "Payment records live in different systems, on different clocks, with different identifiers. Finance teams spend the close stitching files together before they can even ask why two numbers disagree.",
      "When a match fails, the evidence is scattered. The mesh is built so records converge first, then exceptions have a place to go.",
    ],
    capabilities: [
      {
        title: "Source connection",
        lead: "Bring the rails in, without another spreadsheet.",
        body: "Connect banks, processors, gateways, and ledgers through a configurable mesh. New sources join the same matching surface instead of a one-off file drop.",
      },
      {
        title: "Match at volume",
        lead: "Compare what should already agree.",
        body: "Rules and agents work against the mesh, not against inbox attachments. High-volume matching stays in the workflow that finance already owns.",
      },
      {
        title: "A durable record",
        lead: "Keep the evidence with the match.",
        body: "Every comparison leaves a trail: what was compared, what matched, and what still needs a human or an agent. Close does not start from a blank page.",
      },
    ],
  },
  {
    slug: "exception-resolution",
    name: "Exception Resolution",
    cardLabel: "Dispute and Chargeback management",
    cardBody:
      "Dispute and chargeback management that carries contested payments from evidence to action.",
    cardBg: "#e2deec",
    icon: "venn",
    headline: "From contested payment\nto clear next action.",
    lede: "Carries disputes and chargebacks from scattered evidence to a governed path, so exceptions resolve without leaving the operating system.",
    problem: [
      "When a payment is contested, the story lives in emails, processor portals, and spreadsheets. Teams lose days reconstructing what happened before they can act.",
      "Without a shared case surface, the same break gets reworked every cycle. Exception Resolution keeps evidence, owners, and decisions in one place until the item closes.",
    ],
    capabilities: [
      {
        title: "Case assembly",
        lead: "Pull the evidence into one thread.",
        body: "Link processor notices, ledger lines, and mesh matches to a single exception. The case starts with context, not an empty ticket.",
      },
      {
        title: "Guided resolution",
        lead: "Move from break to decision.",
        body: "Agents and playbooks propose next steps with the same controls your ops team already uses. Humans stay in the loop where policy requires it.",
      },
      {
        title: "Closed-loop learning",
        lead: "Turn resolved cases into reusable knowledge.",
        body: "Every outcome feeds the mesh and risk views, so the next similar break starts closer to done.",
      },
    ],
  },
  {
    slug: "control-views",
    name: "Control Views",
    cardLabel: "Reporting and Compliance",
    cardBody:
      "Reporting and compliance intelligence that turns operational data into accountable views.",
    cardBg: "#ebe2d8",
    icon: "hex",
    headline: "Accountable views\nfor every decision.",
    lede: "Turns operational payment data into compliance-ready surfaces, so reporting, audit, and ops share the same source of truth.",
    problem: [
      "Controls live in decks and month-end packs while the operation runs elsewhere. By the time a view is ready, the underlying records have already moved.",
      "Auditors and ops ask different questions of the same flow. Control Views keep policy, evidence, and status aligned without a separate reporting stack.",
    ],
    capabilities: [
      {
        title: "Live control surfaces",
        lead: "See the operation as it stands.",
        body: "Dashboards and attestations draw from the mesh and exception stream, not a stale export. What finance sees is what ran.",
      },
      {
        title: "Policy-aware reporting",
        lead: "Map activity to the controls you owe.",
        body: "Bind workflows to the frameworks you operate under, SOC, PCI, internal policy, so reports cite the same artifacts ops already produced.",
      },
      {
        title: "Audit-ready trails",
        lead: "Hand over evidence without a scramble.",
        body: "Every view preserves who saw what, when, and why. Requests for proof stop starting from a blank folder.",
      },
    ],
  },
  {
    slug: "risk-signals",
    name: "Risk Signals",
    cardLabel: "AML Reporting And Fraud Prevention",
    cardBody:
      "AML reporting and fraud prevention that surfaces suspicious patterns across payment activity.",
    cardBg: "#d8e2ea",
    icon: "octagon",
    headline: "Suspicious patterns,\nsurfaced in time.",
    lede: "Watches payment activity across the mesh for AML and fraud signals, so risk teams act on patterns, not isolated alerts.",
    problem: [
      "Fraud and AML tools see one rail at a time. Patterns that only appear across banks, gateways, and ledgers stay invisible until after the loss.",
      "Alerts without operational context become noise. Risk Signals ties detections to the same records finance already trusts.",
    ],
    capabilities: [
      {
        title: "Cross-rail detection",
        lead: "Watch the mesh, not a single feed.",
        body: "Correlate activity across sources so suspicious sequences show up where they actually form, between systems, not inside one silo.",
      },
      {
        title: "Explainable alerts",
        lead: "Show why the signal fired.",
        body: "Each alert carries the matching evidence and related exceptions, so investigators start with a narrative instead of a raw score.",
      },
      {
        title: "Governed escalation",
        lead: "Route risk into the same operating loop.",
        body: "Handoffs to ops, compliance, or agents follow the same controls as the rest of the platform, reviewable, attributable, and closed.",
      },
    ],
  },
  {
    slug: "close-orchestration",
    name: "Close Orchestration",
    cardLabel: "Financial close-orchestration",
    cardBody:
      "Financial close management that coordinates checks, approvals, and sign-off.",
    cardBg: "#e6e6e6",
    icon: "squares",
    headline: "Close that\ncoordinates itself.",
    lede: "Sequences checks, approvals, and sign-off across the payment stack, so financial close is a governed workflow, not a calendar scramble.",
    problem: [
      "Close depends on matching, exceptions, and controls finishing in the right order. When those live in separate tools, the calendar becomes the system of record.",
      "Sign-off without a durable trail means the next close starts from memory. Orchestration keeps owners, dependencies, and evidence in one path.",
    ],
    capabilities: [
      {
        title: "Dependency-aware close",
        lead: "Run the steps that are actually ready.",
        body: "Tasks unlock when mesh matches, exceptions, and controls clear, not when someone guesses the prior step is done.",
      },
      {
        title: "Approvals in-flow",
        lead: "Capture sign-off where the work happens.",
        body: "Owners approve against the same records and views used all month. No parallel checklist that drifts from reality.",
      },
      {
        title: "A close you can reopen",
        lead: "Leave a path for the next cycle.",
        body: "Every close stores what blocked, what cleared, and who signed. The next period starts from that history, not a blank template.",
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
