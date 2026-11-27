export type FinanceCapability = {
  title: string;
  body: string;
};

export type FinanceOperation = {
  slug: string;
  name: string;
  /** Display heading. Newlines are line breaks; metadata uses the sentence with spaces. */
  tagline: string;
  agents: string;
  capabilities: FinanceCapability[];
};

export const FINANCE_OPERATIONS: FinanceOperation[] = [
  {
    slug: "record-to-report",
    name: "Record-to-Report",
    tagline: "Every account reconciled,\nevery balance explained,\nevery close on time.",
    agents:
      "Osfin's agents pull trial balances, subledgers and bank data from every system, then match and explain every balance. They book adjustments, route open items and assemble the close package your controllers review.",
    capabilities: [
      {
        title: "Account & Balance Sheet Reconciliation",
        body: "Osfin reconciles every GL account to subledgers, bank statements and source systems daily, explaining each variance at transaction level.",
      },
      {
        title: "Suspense & Clearing Account Management",
        body: "Osfin clears suspense and clearing accounts continuously, investigating aged items and routing them to owners before they reach month-end.",
      },
      {
        title: "Intercompany Reconciliation & Eliminations",
        body: "Osfin matches intercompany balances and transactions across entities and currencies, flagging mismatches and preparing elimination entries.",
      },
      {
        title: "Journal Entry Preparation",
        body: "Osfin drafts accruals, reclasses and adjusting entries from reconciliation results, with supporting calculations attached for review.",
      },
      {
        title: "Flux & Variance Analysis",
        body: "Osfin compares balances period over period and against budget, and drafts plain-language explanations of material movements.",
      },
      {
        title: "Financial Close Management",
        body: "Osfin tracks every close task and account through review, with reconciliation evidence attached and ready for auditors.",
      },
    ],
  },
  {
    slug: "order-to-cash",
    name: "Order-to-Cash",
    tagline: "From invoice to cash in the bank,\nmatched and applied without the manual work.",
    agents:
      "Osfin's agents collect remittances, lockbox files, payment processor data and bank statements, and match cash to invoices and contracts. They apply cash, chase short-pays and route disputes to the right owner.",
    capabilities: [
      {
        title: "Payments Reconciliation",
        body: "Osfin matches every incoming payment across ACH, wires, cards and real-time rails to bank deposits and the AR ledger.",
      },
      {
        title: "Cash Application",
        body: "Osfin reads remittance detail from emails, portals and lockbox files and applies cash to the right invoices, even with partial or bundled payments.",
      },
      {
        title: "Deductions & Short-Pay Resolution",
        body: "Osfin identifies the reason behind each short-pay, validates it against contract terms, and drafts customer outreach or dispute responses.",
      },
      {
        title: "Billing & Pricing Validation",
        body: "Osfin reads customer contracts and recalculates invoices at line level, catching under-billing and pricing errors before they reach the customer.",
      },
      {
        title: "Collections Prioritization & Outreach",
        body: "Osfin ranks overdue accounts by risk and value and drafts tailored follow-ups for your collections team to send.",
      },
      {
        title: "Revenue Reconciliation",
        body: "Osfin ties billed, collected and recognized revenue together, explaining gaps between your billing system, payments and the GL.",
      },
    ],
  },
  {
    slug: "tax",
    name: "Tax",
    tagline: "Return-ready data, calculated and tied out,\nacross every jurisdiction.",
    agents:
      "Osfin's agents gather trial balances, entity data and state-level sales, payroll and property figures, run the calculations and tie every number back to the books. They watch tax authority portals, track deadlines and requests, and assemble the workpapers your tax team reviews.",
    capabilities: [
      {
        title: "Tax Provision Support (ASC 740)",
        body: "Osfin assembles entity-level trial balances, computes book-to-tax differences and current and deferred tax, and prepares provision workpapers tied to the GL.",
      },
      {
        title: "State Apportionment & Return Data Preparation",
        body: "Osfin collects sales, payroll and property data by state, calculates apportionment factors and prepares return-ready data for thousands of state filings.",
      },
      {
        title: "Federal & International Return Data Preparation",
        body: "Osfin maps entity financials to federal and international return requirements and flags gaps before they reach your preparers or advisors.",
      },
      {
        title: "Effective Tax Rate (ETR) Forecasting",
        body: "Osfin recalculates the forecast ETR whenever forecasts, entity mix or rates change, and explains what moved it.",
      },
      {
        title: "Tax Account Reconciliation",
        body: "Osfin reconciles tax payable, receivable and deferred tax accounts to payments, filings and provision calculations every period.",
      },
      {
        title: "Transfer Pricing & Intercompany Charge Validation",
        body: "Osfin recalculates intercompany charges against transfer pricing policies and flags entities outside agreed margins.",
      },
      {
        title: "Tax Notice & Audit Response Management",
        body: "Osfin monitors tax authority portals for new notices, tracks every response deadline and assembles information-request responses from existing workpapers.",
      },
    ],
  },
  {
    slug: "treasury",
    name: "Treasury",
    tagline: "Know where every dollar is, every morning,\nacross every bank and entity.",
    agents:
      "Osfin's agents pull statements from every bank, custodian and portal, including those without file feeds. They reconcile positions and forecasts, check them against policy limits, and deliver the daily cash, liquidity and investment reports treasury relies on.",
    capabilities: [
      {
        title: "Cash Visibility & Positioning",
        body: "Osfin consolidates balances and activity across thousands of bank accounts into a reconciled daily cash position, before investment and funding decisions are made.",
      },
      {
        title: "Cash Forecasting & Variance Analysis",
        body: "Osfin compares forecast to actual cash flows by entity and category, explains the variances and feeds the learnings into the next forecast.",
      },
      {
        title: "Liquidity & Intercompany Funding",
        body: "Osfin tracks cash concentration and intercompany funding across entities, checking positions against capital and liquidity limits.",
      },
      {
        title: "Capital Management & Dividend Capacity",
        body: "Osfin models each regulated subsidiary's capital and dividend capacity against regulatory minimums from current, reconciled balances.",
      },
      {
        title: "Investment Accounting & Custodian Reconciliation",
        body: "Osfin reconciles custodian and investment manager data to the GL, and prepares the supporting schedules and footnote data.",
      },
      {
        title: "Bank Fee Analysis",
        body: "Osfin reads bank account analysis statements and validates every fee against pricing agreements, flagging overcharges for recovery.",
      },
    ],
  },
  {
    slug: "procure-to-pay",
    name: "Procure-to-Pay",
    tagline: "Pay the right supplier\nthe right amount, every time.",
    agents:
      "Osfin's agents read invoices, purchase orders, receipts and supplier statements in any format, and check every invoice against contracts and orders. They work in supplier portals, route exceptions and supplier queries, and surface spend and savings insights for procurement.",
    capabilities: [
      {
        title: "Invoice Capture & Three-Way Match",
        body: "Osfin extracts invoice data from any format and matches it to purchase orders and receipts, routing only true exceptions for review.",
      },
      {
        title: "Contract Compliance & Pricing Validation",
        body: "Osfin reads supplier contracts and validates every invoice line against agreed pricing, discounts and terms, flagging overbilling before payment.",
      },
      {
        title: "Duplicate & Erroneous Payment Prevention",
        body: "Osfin scans invoices and payments across entities and systems to catch duplicates, overpayments and payments to the wrong supplier.",
      },
      {
        title: "Supplier Statement Reconciliation",
        body: "Osfin reconciles supplier statements to the AP ledger, surfacing missing invoices, unapplied credits and open disputes.",
      },
      {
        title: "Supplier Onboarding & Vendor Master Validation",
        body: "Osfin checks new supplier and bank detail changes against submitted documents and public sources, flagging risks before the first payment.",
      },
      {
        title: "Spend Analysis & Negotiation Prep",
        body: "Osfin consolidates spend by supplier and category and prepares pricing benchmarks and term comparisons ahead of negotiations.",
      },
      {
        title: "Travel & Expense Audit",
        body: "Osfin reviews every expense report against policy and receipts, flagging high-risk items so reviewers focus only on true anomalies.",
      },
    ],
  },
  {
    slug: "reporting",
    name: "Reporting",
    tagline: "Every number in every report,\ntraced back to the books.",
    agents:
      "Osfin's agents pull reconciled balances, supporting schedules and prior filings, tie every figure to its source and explain movements. They draft packs, filings and commentary for your team to review.",
    capabilities: [
      {
        title: "SEC Reporting Tie-Out (10-K & 10-Q)",
        body: "Osfin ties every number in your filings to the trial balance and supporting schedules, flagging breaks before the locked trial balance and filing deadline.",
      },
      {
        title: "Statutory & Regulatory Reporting",
        body: "Osfin prepares and reconciles statutory and regulatory statements, such as NAIC filings and Call Reports, across every legal entity from a single reconciled source.",
      },
      {
        title: "Board & Committee Reporting",
        body: "Osfin assembles board, audit and finance committee materials from reconciled data each cycle, with commentary drafted for review.",
      },
      {
        title: "Management Reporting & Flux Commentary",
        body: "Osfin produces monthly management reports and drafts plain-language explanations of material variances by entity and line item.",
      },
      {
        title: "Cost Allocation & Cost Reporting",
        body: "Osfin applies allocation rules across entities and cost centers, reconciles allocated totals to source and reports the results.",
      },
      {
        title: "Disclosure & Footnote Support",
        body: "Osfin prepares footnote data and supporting schedules from reconciled balances, so disclosures tie to the financial statements.",
      },
    ],
  },
  {
    slug: "audit",
    name: "Audit",
    tagline: "Test every transaction, not a sample,\nand spend audit time on real risk.",
    agents:
      "Osfin's agents collect populations, evidence and control documentation, test entire populations against controls and rules, and investigate anomalies. They track requests and remediation, and draft plans, workpapers and findings for auditor review.",
    capabilities: [
      {
        title: "Risk Assessment & Audit Planning",
        body: "Osfin synthesizes prior findings, control results and financial data into a first-pass risk assessment and draft annual audit plan.",
      },
      {
        title: "Audit Scoping",
        body: "Osfin proposes audit scope from risk scores, materiality and transaction volumes, for your audit team to confirm.",
      },
      {
        title: "Full-Population Testing",
        body: "Osfin tests 100% of transactions against controls, policies and contract terms instead of samples, surfacing only true anomalies for follow-up.",
      },
      {
        title: "SOX & ICFR Controls Testing",
        body: "Osfin automates evidence collection and testing for recurring ICFR controls, freeing auditors for risk-based and judgmental work.",
      },
      {
        title: "Evidence & Request (PBC) Management",
        body: "Osfin tracks every audit request, gathers evidence from source systems and follows up with owners until each request is complete.",
      },
      {
        title: "Issue Remediation & Retesting",
        body: "Osfin tracks each finding to its owner and deadline, and retests remediated controls automatically to confirm the fix holds.",
      },
    ],
  },
  {
    slug: "investor-relations",
    name: "Investor Relations",
    tagline: "Earnings-ready numbers and narrative,\nwithout the late nights.",
    agents:
      "Osfin's agents monitor analyst research, peer releases and market sentiment, and tie every published figure back to reconciled financials. They draft scripts, Q&A and briefing materials, and keep investor follow-ups on track.",
    capabilities: [
      {
        title: "Market, Consensus & Peer Monitoring",
        body: "Osfin aggregates analyst estimates, peer releases and investor sentiment from multiple sources into a single briefing ahead of each cycle.",
      },
      {
        title: "Earnings Script & Q&A Drafting",
        body: "Osfin drafts the first pass of earnings scripts and anticipated Q&A from reconciled results and prior calls, for your team to refine.",
      },
      {
        title: "Earnings Release Tie-Out",
        body: "Osfin ties every figure in the press release, script and deck back to the financial statements and supporting schedules before publication.",
      },
      {
        title: "Investor Interaction Tracking & Follow-Up",
        body: "Osfin logs investor meetings, questions and commitments, and drafts follow-ups so nothing promised goes unanswered.",
      },
    ],
  },
  {
    slug: "corporate-development",
    name: "Corporate Development & Integration",
    tagline: "Faster diligence, cleaner integration,\nand synergies you can actually track.",
    agents:
      "Osfin's agents research targets and market landscapes, ingest data rooms and target financials, test them for anomalies and map them to your books. They track integration tasks and draft screens, models and synergy reports.",
    capabilities: [
      {
        title: "Target Sourcing & Screening",
        body: "Osfin researches markets and builds target landscapes against your criteria, preparing first-pass screens for deal team review.",
      },
      {
        title: "Financial Diligence & Data Room Analysis",
        body: "Osfin ingests target financials and data room files, tests them at transaction level for anomalies, and flags issues for the deal team.",
      },
      {
        title: "Valuation & Deal Model First Drafts",
        body: "Osfin builds first-pass valuation and deal models from diligence data, so your team starts from a populated model instead of a blank sheet.",
      },
      {
        title: "Deal Document Review",
        body: "Osfin reads deal documents and target contracts, extracting key terms, obligations and non-standard clauses for legal and deal team review.",
      },
      {
        title: "Post-Close Integration & Opening Balance Reconciliation",
        body: "Osfin maps the acquired chart of accounts to yours, reconciles opening balances and runs reconciliations on the new entity from day one.",
      },
      {
        title: "Synergy Tracking & Integration Monitoring",
        body: "Osfin tracks realized synergies against the deal thesis using reconciled actuals, and reports integration progress to leadership.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "Every lease, site and landlord charge,\nvalidated across your whole portfolio.",
    agents:
      "Osfin's agents read leases, landlord statements and facilities invoices, validate every charge against lease terms and calculate lease accounting. They work in landlord and facilities portals, draft journal entries and landlord disputes, and report portfolio cost and occupancy.",
    capabilities: [
      {
        title: "Lease Abstraction & Lease Accounting (ASC 842)",
        body: "Osfin extracts critical dates and payment terms from every lease, calculates right-of-use assets and lease liabilities, and drafts the accounting entries.",
      },
      {
        title: "CAM & Operating Expense Reconciliation",
        body: "Osfin validates landlord CAM, tax and operating expense charges against lease terms across thousands of sites, flagging overcharges for recovery.",
      },
      {
        title: "Rent Payment Reconciliation",
        body: "Osfin reconciles scheduled rent to payments made and landlord statements, catching missed, duplicate and incorrect payments.",
      },
      {
        title: "Facilities Invoice & Work Order Validation",
        body: "Osfin matches facilities vendor invoices to completed work orders and contracted rates across every site.",
      },
      {
        title: "Portfolio, Occupancy & Site Analysis",
        body: "Osfin combines occupancy, lease cost and cost-per-seat data across sites to surface consolidation and savings opportunities.",
      },
    ],
  },
];

export function financeTaglinePlain(tagline: string) {
  return tagline.replace(/\n/g, " ");
}

export function getFinanceOperation(slug: string) {
  return FINANCE_OPERATIONS.find((item) => item.slug === slug);
}

export function financeOperationSlugs() {
  return FINANCE_OPERATIONS.map((item) => item.slug);
}
