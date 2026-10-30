export const INDUSTRIES = [
  {
    id: "banks",
    label: "Banks & Credit Unions",
    summary: "Cores and ledgers on one settlement record.",
    useCases: [
      {
        title: "ACH Reconciliation",
        body: "Osfin ingests ACH files, Fed reports and core data automatically, matches every entry at transaction level, and routes returns and breaks to the right queue with full context.",
      },
      {
        title: "Wire, RTP & FedNow Reconciliation",
        body: "Osfin reconciles Fedwire, SWIFT, RTP and FedNow activity against the core and Fed account continuously, so exceptions are caught the same day.",
      },
      {
        title: "Card & ATM Network Settlement",
        body: "Osfin matches network settlement reports to cardholder and ATM activity, explains every variance, and clears settlement accounts daily.",
      },
      {
        title: "Fed Account & Correspondent Reconciliation",
        body: "Osfin reconciles Fed and correspondent statements against each rail's activity, isolating which rail and transaction caused a difference.",
      },
      {
        title: "GL Balancing & Account Reconciliation",
        body: "Osfin's Automated GL Balancing ties GL accounts to subledgers and source systems daily, flags aging items, and keeps a complete audit trail.",
      },
      {
        title: "Card Disputes & Chargebacks (Reg E)",
        body: "Osfin links each dispute to its original transaction, provisional credit and network chargeback, and tracks every case against its regulatory deadline.",
      },
      {
        title: "Interchange Income & Network Fee Validation",
        body: "Osfin recalculates interchange and fees at transaction level against network and contract rates, surfacing under-payments and over-billing.",
      },
      {
        title: "BaaS & Sponsor Bank FBO Reconciliation",
        body: "Osfin reconciles FBO accounts against partner ledgers daily, giving sponsor banks an independent, auditable view of customer funds.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Osfin's Certification module tracks every account through review and sign-off, with reconciliation evidence attached and ready for exam.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    summary: "Gateways, processors, and banks on one settlement record.",
    useCases: [
      {
        title: "Three-Way Settlement Reconciliation",
        body: "Osfin matches gateway, processor and bank data in one pass, pinpointing exactly where a transaction or settlement went missing.",
      },
      {
        title: "Acquirer Settlement & Merchant Funding Reconciliation",
        body: "Osfin reconciles network settlement to merchant funding daily, catching short-funds, duplicates and delays before merchants do.",
      },
      {
        title: "Issuer Processing & Network Settlement Reconciliation",
        body: "Osfin ties every authorization, clearing record and network settlement to the cardholder ledger, program by program.",
      },
      {
        title: "Interchange & Pricing Validation",
        body: "Osfin reads pricing contracts and recalculates fees for every transaction, flagging mispriced merchants and downgrades.",
      },
      {
        title: "Network Fee Validation",
        body: "Osfin validates network invoices against actual volumes and fee schedules, surfacing overcharges for recovery.",
      },
      {
        title: "Residuals & ISO Commission Validation",
        body: "Osfin computes residuals from contract terms at transaction level, producing payouts partners can trace and trust.",
      },
      {
        title: "Reserve & Holdback Reconciliation",
        body: "Osfin tracks each merchant's reserve balance against contract terms and settlement activity, flagging releases as they come due.",
      },
      {
        title: "Disputes & Chargebacks",
        body: "Osfin links each dispute to its original transaction and merchant debit, tracking every case from first notice to final ruling.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Osfin's Certification module clears settlement accounts daily and gives controllers signed-off, evidence-backed balances at close.",
      },
    ],
  },
  {
    id: "fintech",
    label: "Fintech",
    summary: "High-velocity flows on one operating record.",
    useCases: [
      {
        title: "Ledger-to-Bank Reconciliation",
        body: "Osfin reconciles your product ledger to every bank account daily, explaining each difference down to the transaction.",
      },
      {
        title: "FBO & Custodial Account Reconciliation",
        body: "Osfin ties end-user balances to FBO and custodial account statements daily, with an audit trail your sponsor bank can review.",
      },
      {
        title: "Wallet & Stored Value Balance Reconciliation",
        body: "Osfin rebuilds wallet balances from every movement and flags accounts where the ledger and actual funds disagree.",
      },
      {
        title: "Payment Processor & Gateway Reconciliation",
        body: "Osfin normalizes processor and gateway data into one view and matches every payment to your ledger and bank.",
      },
      {
        title: "Loan Disbursement & Repayment Reconciliation",
        body: "Osfin matches every disbursement and repayment to the loan ledger across rails and geographies, flagging failed or misapplied payments.",
      },
      {
        title: "Card Program Settlement Reconciliation",
        body: "Osfin reconciles processor data to network settlement and sponsor bank activity, program by program.",
      },
      {
        title: "Partner Fee & Revenue Share Validation",
        body: "Osfin reads partner contracts and recalculates fees and revenue share at transaction level, surfacing overcharges and underpayments.",
      },
      {
        title: "Disputes & Chargebacks",
        body: "Osfin links every dispute to its original transaction and ledger impact, tracking each case to resolution.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Osfin's Certification module gives you a repeatable, evidence-backed close from day one.",
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    summary: "Premiums, claims, and remittance in one mesh.",
    useCases: [
      {
        title: "Premium Reconciliation (Direct Bill & Agency Bill)",
        body: "Osfin matches every premium receipt to its policy and billing record, flagging short-pays, overpayments and unapplied cash.",
      },
      {
        title: "Claims Payment Reconciliation",
        body: "Osfin reconciles claims system payments to bank clearing daily, catching duplicates, voids and failed payments.",
      },
      {
        title: "Agent & Broker Commission Reconciliation",
        body: "Osfin reads commission agreements and recalculates every payout at policy level before it goes out.",
      },
      {
        title: "Reinsurance Reconciliation",
        body: "Osfin applies treaty terms to policy and claims data, reconciling amounts ceded and recovered with each reinsurer.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Osfin's Certification module reconciles and signs off every account with supporting evidence, ready for auditors and regulators.",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "Ecommerce & Retail",
    summary: "Stores, platforms, and every tender type.",
    useCases: [
      {
        title: "Order-to-Cash Reconciliation",
        body: "Osfin matches every order to its payment and bank deposit, flagging unpaid, unsettled and unfulfilled orders.",
      },
      {
        title: "Payment Gateway & PSP Settlement Reconciliation",
        body: "Osfin breaks each payout into its underlying transactions, fees and adjustments, and ties it to the bank deposit.",
      },
      {
        title: "Marketplace Payout Reconciliation",
        body: "Osfin unpacks marketplace settlement reports and reconciles each line to orders and bank receipts.",
      },
      {
        title: "Alternative Payment Reconciliation",
        body: "Osfin brings every payment method into one reconciliation, with method-specific matching rules.",
      },
      {
        title: "Refunds & Returns Reconciliation",
        body: "Osfin links each refund to its return and payment reversal, catching refunds without returns and returns without refunds.",
      },
      {
        title: "Processing Fee & Marketplace Fee Validation",
        body: "Osfin recalculates fees at transaction level against your contracts and flags overcharges for recovery.",
      },
      {
        title: "Store Cash & POS Reconciliation",
        body: "Osfin reconciles POS sales to cash deposits and card settlements for every store, every day.",
      },
      {
        title: "Disputes & Chargebacks",
        body: "Osfin links every chargeback to its order and settlement impact, tracking each case to final outcome.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Osfin's Certification module reconciles and signs off every account with evidence attached, shortening the close.",
      },
    ],
  },
  {
    id: "travel",
    label: "Travel & Logistics",
    summary: "Fares, freight, and payouts across every hop.",
    useCases: [
      {
        title: "Booking-to-Payment Reconciliation",
        body: "Osfin matches every booking and change to its payment and settlement, flagging unpaid and over-refunded bookings.",
      },
      {
        title: "Supplier Settlement Reconciliation",
        body: "Osfin normalizes supplier statements and reconciles them to bookings, catching overbilling and missed credits.",
      },
      {
        title: "BSP & ARC Settlement Reconciliation",
        body: "Osfin reconciles BSP and ARC settlement reports to ticketing records, isolating disputed ADMs and missing refunds.",
      },
      {
        title: "Virtual Card Reconciliation",
        body: "Osfin links each virtual card transaction to its booking and supplier invoice, flagging unused and overcharged cards.",
      },
      {
        title: "Freight Audit & Invoice Reconciliation",
        body: "Osfin reads carrier contracts and audits every invoice line against contracted rates and actual shipments.",
      },
      {
        title: "Fuel Surcharge & Accessorial Charge Validation",
        body: "Osfin recalculates surcharges and accessorials from contract terms and published indices for every shipment.",
      },
      {
        title: "Carrier & Driver Payout Reconciliation",
        body: "Osfin reconciles trip and delivery records to payouts, catching missed, duplicate and incorrect payments.",
      },
      {
        title: "Multi-Currency & FX Reconciliation",
        body: "Osfin reconciles transactions across currencies and rails, separating FX variance from genuine breaks.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Osfin's Certification module reconciles and signs off every account with evidence attached, ready for audit.",
      },
    ],
  },
  {
    id: "crypto",
    label: "Crypto",
    summary: "Wallets, exchanges, and on-chain movement.",
    useCases: [
      {
        title: "Fiat On-Ramp & Off-Ramp Reconciliation",
        body: "Osfin reconciles fiat deposits and withdrawals against bank and processor statements and your customer ledger, every day.",
      },
      {
        title: "Customer Asset Segregation Reconciliation",
        body: "Osfin ties customer balances to custodial, omnibus and bank holdings daily, with an audit trail for every difference.",
      },
      {
        title: "Exchange & Custodian Balance Reconciliation",
        body: "Osfin consolidates custodian and exchange balances and reconciles them to your internal ledger, asset by asset.",
      },
      {
        title: "On-Chain to Internal Ledger Reconciliation",
        body: "Osfin matches on-chain transfers to internal ledger entries and flags missing, duplicate or unconfirmed transactions.",
      },
      {
        title: "Stablecoin Reserve Reconciliation",
        body: "Osfin reconciles mint and burn activity against reserve accounts, giving issuers a daily, evidence-backed view.",
      },
      {
        title: "Trading, Network & Staking Fee Reconciliation",
        body: "Osfin recalculates fees and rewards from transaction-level data and reconciles them to revenue and cost accounts.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Osfin's Certification module brings fiat and digital asset accounts into one evidence-backed, signed-off close.",
      },
    ],
  },
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const SOLUTIONS = INDUSTRIES.map(({ id, label }) => ({
  id,
  label,
  href: `/industries/${id}`,
}));
