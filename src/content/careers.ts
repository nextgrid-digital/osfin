export const CAREERS = {
  hero: {
    kicker: "Careers",
    title: "Every payment leaves a trail.\nWe stay until it resolves.",
    body: "Forward-deployed engineers and operators sit with finance, operations, and risk until reconciliation, disputes, controls, and close actually change.",
    plate: [
      { label: "Process", value: "Reconcile, resolve, audit" },
      { label: "Record", value: "OSF-2026-001 // Version 1.0" },
      { label: "Classification", value: "Payment operations" },
    ],
  },
  setup: {
    label: "How the work is set up",
    title: "A clearer place to build.",
    cards: [
      {
        index: "01",
        title: "Applied, next to the operation",
        points: [
          "Sit with finance, operations, and risk",
          "Map the records, policies, and exceptions as they are",
          "Deploy into the live operation",
        ],
      },
      {
        index: "02",
        title: "Stay until it changes",
        points: [
          "Do not ship a tool and leave",
          "Treat reconciliation, disputes, controls, and close as one system",
          "Bring people in when judgment is needed",
        ],
      },
      {
        index: "03",
        title: "Keep the audit",
        points: [
          "PCI DSS, SOC 1, SOC 2, and ISO 27001 are the floor",
          "Every exception keeps its source and its trail",
          "Speed that loses the record is not a result",
        ],
      },
    ],
  },
  test: {
    label: "The practical test",
    title: "The day is the operation.",
    columns: [
      {
        title: "What you actually touch",
        body: "Payment records across banks, gateways, processors, and ledgers. Breaks that do not fit a template. A close that has a date.",
      },
      {
        title: "What good looks like",
        body: "The books move. An exception becomes a next action. The audit is still there when someone asks.",
      },
    ],
  },
  beliefs: {
    title: "What we believe",
    items: [
      {
        index: "01",
        title: "The books were never the problem",
        body: "Institutions hit the same wall: spreadsheets, point tools, and a break list.",
      },
      {
        index: "02",
        title: "Context is the work",
        body: "Every payment creates records, policies, exceptions, and decisions. Generic tools cannot connect them.",
      },
      {
        index: "03",
        title: "One system, not five products",
        body: "Reconciliation, disputes, controls, risk, and close belong in the same operation.",
      },
      {
        index: "04",
        title: "Agents do the operational work",
        body: "People keep judgment, empathy, and the decisions that should not be automated.",
      },
      {
        index: "05",
        title: "We own the outcome",
        body: "We stay beside the team until the operation changes, then we keep learning from it.",
      },
      {
        index: "06",
        title: "The record has to survive",
        body: "Millions of records can move in minutes. The audit still has to hold.",
      },
    ],
  },
  roles: {
    label: "Open roles",
    title: "Every role, in full, right here.",
    groups: [
      {
        department: "Engineering",
        roles: [
          {
            id: "fde-san-francisco",
            title: "Forward-deployed engineer",
            location: "San Francisco",
            brief:
              "Build the systems beside finance, operations, and risk. Map the payment context, deploy into the live operation, and stay until reconciliation and close change.",
          },
          {
            id: "fde-bengaluru",
            title: "Forward-deployed engineer",
            location: "Bengaluru",
            brief:
              "Same work, from the team in Bengaluru. Connect banks, gateways, processors, and ledgers, and keep the audit intact while the records move.",
          },
          {
            id: "platform-bengaluru",
            title: "Platform engineer",
            location: "Bengaluru",
            brief:
              "Build the shared system the forward-deployed work runs on: connectors, agent workflows, and the controls that keep payment data accountable.",
          },
        ],
      },
      {
        department: "Product",
        roles: [
          {
            id: "product-san-francisco",
            title: "Product, payment operations",
            location: "San Francisco",
            brief:
              "Decide what the operation needs next. Sit with the teams who run reconciliation, disputes, and close, and turn that into a system that owns the outcome.",
          },
        ],
      },
      {
        department: "Operations",
        roles: [
          {
            id: "ops-dubai",
            title: "Operations, financial close",
            location: "Dubai",
            brief:
              "Run the close with the institutions we serve. Coordinate checks, approvals, and sign-off, and bring engineering in where the process still breaks.",
          },
          {
            id: "ops-bengaluru",
            title: "Operations, reconciliation",
            location: "Bengaluru",
            brief:
              "Work the breaks that do not fit a template. Keep each exception tied to its source, and turn it into a next action the books can stand on.",
          },
        ],
      },
    ],
  },
  close: {
    title: "If you want the outcome, not the tool.",
    button: "See the roles",
  },
} as const;
