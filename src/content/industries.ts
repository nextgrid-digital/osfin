export const INDUSTRIES = [
  {
    id: "banks",
    label: "Banks & Credit Unions",
    headline: "Every rail reconciled back to the core",
    summary: "Your core and your ledgers, on one settlement record.",
    useCases: [
      {
        title: "ACH Reconciliation",
        body: "ACH files, Fed reports and core data come into Osfin automatically. Each entry is matched at transaction level, and returns and breaks go to the right queue with context.",
      },
      {
        title: "Wire, RTP & FedNow Reconciliation",
        body: "Fedwire, SWIFT, RTP and FedNow activity is checked against the core and the Fed account continuously, so exceptions show up the same day.",
      },
      {
        title: "Card & ATM Network Settlement",
        body: "Settlement reports from the networks are matched to cardholder and ATM activity, and every variance gets an explanation. Settlement accounts are cleared daily.",
      },
      {
        title: "Fed Account & Correspondent Reconciliation",
        body: "Fed and correspondent statements are checked against what each rail did, so you can see which rail and which transaction caused a difference.",
      },
      {
        title: "GL Balancing & Account Reconciliation",
        body: "Automated GL Balancing ties GL accounts to subledgers and source systems each day, points out aging items and keeps a full audit trail.",
      },
      {
        title: "Card Disputes & Chargebacks (Reg E)",
        body: "Each dispute is tied to its original transaction, the provisional credit and the network chargeback, and Osfin keeps count of the regulatory deadline.",
      },
      {
        title: "Interchange Income & Network Fee Validation",
        body: "Osfin recalculates interchange and fees on each transaction against network and contract rates, which shows where you've been under-paid or over-billed.",
      },
      {
        title: "BaaS & Sponsor Bank FBO Reconciliation",
        body: "FBO accounts are reconciled against partner ledgers daily, so a sponsor bank has an independent, auditable view of customer funds.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "The Certification module follows every account through review and sign-off, with the reconciliation evidence attached and ready for an exam.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    headline: "Three parties, one settlement record",
    summary: "Where gateways, processors and banks finally agree.",
    useCases: [
      {
        title: "Three-Way Settlement Reconciliation",
        body: "Gateway, processor and bank data is matched in one pass, so you can see exactly where a transaction or settlement went missing.",
      },
      {
        title: "Acquirer Settlement & Merchant Funding Reconciliation",
        body: "Network settlement is reconciled to merchant funding every day. Short-funds, duplicates and delays get caught before the merchant calls.",
      },
      {
        title: "Issuer Processing & Network Settlement Reconciliation",
        body: "Authorizations, clearing records and network settlement are all tied back to the cardholder ledger, program by program.",
      },
      {
        title: "Interchange & Pricing Validation",
        body: "Pricing contracts go in, and the right fee comes out for every transaction. Mispriced merchants and downgrades show up.",
      },
      {
        title: "Network Fee Validation",
        body: "Network invoices are checked against actual volumes and fee schedules, and overcharges are surfaced so you can recover the money.",
      },
      {
        title: "Residuals & ISO Commission Validation",
        body: "Residuals are worked out from contract terms at transaction level, so partners get payouts they can trace back.",
      },
      {
        title: "Reserve & Holdback Reconciliation",
        body: "Osfin tracks each merchant's reserve balance against contract terms and settlement activity, and tells you when a release comes due.",
      },
      {
        title: "Disputes & Chargebacks",
        body: "Disputes run from first notice to final ruling, and Osfin ties each one to the original transaction and the merchant debit along the way.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Controllers get balances that are signed off and backed by evidence at close, and settlement accounts are cleared daily.",
      },
    ],
  },
  {
    id: "fintech",
    label: "Fintech",
    headline: "The ledger and the bank, kept in step",
    summary: "Fast-moving money, one record you can trust.",
    useCases: [
      {
        title: "Ledger-to-Bank Reconciliation",
        body: "Your product ledger is reconciled to every bank account each day, and every difference is explained down to the transaction.",
      },
      {
        title: "FBO & Custodial Account Reconciliation",
        body: "End-user balances are tied to FBO and custodial account statements daily, and the audit trail is one your sponsor bank can review.",
      },
      {
        title: "Wallet & Stored Value Balance Reconciliation",
        body: "Osfin rebuilds wallet balances from every movement and shows you the accounts where the ledger and the actual funds disagree.",
      },
      {
        title: "Payment Processor & Gateway Reconciliation",
        body: "Processor and gateway data is normalized into one view, and every payment is matched to your ledger and your bank.",
      },
      {
        title: "Loan Disbursement & Repayment Reconciliation",
        body: "Each disbursement and repayment is matched to the loan ledger across rails and geographies. Failed or misapplied payments don't go unnoticed.",
      },
      {
        title: "Card Program Settlement Reconciliation",
        body: "Processor data is reconciled to network settlement and sponsor bank activity, one program at a time.",
      },
      {
        title: "Partner Fee & Revenue Share Validation",
        body: "Partner contracts set the fees and the revenue share, and Osfin checks every transaction against them, so overcharges and underpayments come to light.",
      },
      {
        title: "Disputes & Chargebacks",
        body: "Osfin connects a dispute to the transaction it came from and to what it did to your ledger, then follows it to resolution.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "You get a close you can repeat, with evidence behind it, from day one.",
      },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    headline: "The money movement behind every policy",
    summary: "Premiums, claims and remittance in one place.",
    useCases: [
      {
        title: "Premium Reconciliation (Direct Bill & Agency Bill)",
        body: "Each premium receipt is matched to its policy and billing record. Short-pays, overpayments and unapplied cash get picked out.",
      },
      {
        title: "Claims Payment Reconciliation",
        body: "Payments from the claims system are reconciled to bank clearing daily, which catches duplicates, voids and failed payments.",
      },
      {
        title: "Agent & Broker Commission Reconciliation",
        body: "Before a commission goes out, Osfin checks it against the agreement at policy level.",
      },
      {
        title: "Reinsurance Reconciliation",
        body: "Treaty terms are applied to policy and claims data, so amounts ceded and recovered reconcile with each reinsurer.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Auditors and regulators get every account reconciled and signed off, with the supporting evidence in the same place.",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "Ecommerce & Retail",
    headline: "From the order to the deposit",
    summary: "Online, in-store and every payment type in between.",
    useCases: [
      {
        title: "Order-to-Cash Reconciliation",
        body: "Every order is matched to its payment and its bank deposit, so unpaid, unsettled and unfulfilled orders are easy to see.",
      },
      {
        title: "Payment Gateway & PSP Settlement Reconciliation",
        body: "Osfin breaks a payout into its transactions, fees and adjustments, then ties the total to the bank deposit.",
      },
      {
        title: "Marketplace Payout Reconciliation",
        body: "Osfin unpacks marketplace settlement reports and reconciles each line to orders and bank receipts.",
      },
      {
        title: "Alternative Payment Reconciliation",
        body: "Every payment method goes into one reconciliation, and each method keeps its own matching rules.",
      },
      {
        title: "Refunds & Returns Reconciliation",
        body: "A refund is linked to its return and its payment reversal, which catches refunds with no return and returns with no refund.",
      },
      {
        title: "Processing Fee & Marketplace Fee Validation",
        body: "Fees are recalculated at transaction level against your contracts, and you can recover what you were overcharged.",
      },
      {
        title: "Store Cash & POS Reconciliation",
        body: "POS sales are reconciled to cash deposits and card settlements, store by store and every day.",
      },
      {
        title: "Disputes & Chargebacks",
        body: "When a chargeback arrives, Osfin links it to the order and to the settlement it affects, and follows it to the final outcome.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "The close gets shorter when accounts are reconciled and signed off with the evidence already attached.",
      },
    ],
  },
  {
    id: "travel",
    label: "Travel & Logistics",
    headline: "Every hop, one payout record",
    summary: "Fares, freight and payouts, followed across every hop.",
    useCases: [
      {
        title: "Booking-to-Payment Reconciliation",
        body: "Each booking, and every change to it, is matched to its payment and settlement. Unpaid and over-refunded bookings stand out.",
      },
      {
        title: "Supplier Settlement Reconciliation",
        body: "Supplier statements are normalized and reconciled to bookings, which catches overbilling and missed credits.",
      },
      {
        title: "BSP & ARC Settlement Reconciliation",
        body: "BSP and ARC settlement reports are reconciled to ticketing records, which isolates disputed ADMs and missing refunds.",
      },
      {
        title: "Virtual Card Reconciliation",
        body: "Each virtual card transaction is linked to its booking and its supplier invoice. Unused cards and overcharged cards become visible.",
      },
      {
        title: "Freight Audit & Invoice Reconciliation",
        body: "Carrier contracts set the rates. Osfin checks every invoice line against them and against the shipments that actually moved.",
      },
      {
        title: "Fuel Surcharge & Accessorial Charge Validation",
        body: "Surcharges and accessorials are recalculated for each shipment from contract terms and published indices.",
      },
      {
        title: "Carrier & Driver Payout Reconciliation",
        body: "Trip and delivery records are reconciled to payouts, so missed, duplicate and incorrect payments surface.",
      },
      {
        title: "Multi-Currency & FX Reconciliation",
        body: "Transactions are reconciled across currencies and rails, and FX variance is kept apart from genuine breaks.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Each account goes into audit already reconciled and signed off, with evidence attached.",
      },
    ],
  },
  {
    id: "crypto",
    label: "Crypto",
    headline: "Fiat and the chain, on one record",
    summary: "Wallets, exchanges and what happens on-chain, reconciled.",
    useCases: [
      {
        title: "Fiat On-Ramp & Off-Ramp Reconciliation",
        body: "Fiat deposits and withdrawals are reconciled every day against bank and processor statements and your customer ledger.",
      },
      {
        title: "Customer Asset Segregation Reconciliation",
        body: "Customer balances are tied to custodial, omnibus and bank holdings daily, with an audit trail behind every difference.",
      },
      {
        title: "Exchange & Custodian Balance Reconciliation",
        body: "Osfin consolidates custodian and exchange balances and reconciles them to your internal ledger, asset by asset.",
      },
      {
        title: "On-Chain to Internal Ledger Reconciliation",
        body: "On-chain transfers are matched to internal ledger entries. Anything missing, duplicated or unconfirmed shows up.",
      },
      {
        title: "Stablecoin Reserve Reconciliation",
        body: "Mint and burn activity is reconciled against reserve accounts, and issuers get an evidence-backed view each day.",
      },
      {
        title: "Trading, Network & Staking Fee Reconciliation",
        body: "Fees and rewards are recalculated from transaction-level data and reconciled to your revenue and cost accounts.",
      },
      {
        title: "Financial Close & Account Certification",
        body: "Fiat and digital asset accounts close together, signed off, with evidence.",
      },
    ],
  },
  {
    id: "gaming",
    label: "Gaming",
    headline: "The player ledger, reconciled",
    summary: "Player wallets, wagers and payouts on one ledger.",
    useCases: [
      {
        title: "Player Deposit & Withdrawal Reconciliation",
        body: "Osfin matches player deposits and withdrawals across cards, ACH, wallets and PSPs to the player account and the bank. Failed, duplicate and stuck transactions get found before the player complains.",
      },
      {
        title: "Player Wallet Balance Reconciliation",
        body: "A player's wallet balance is rebuilt from deposits, wagers, wins, bonuses and withdrawals, and any account where the platform and the ledger disagree is picked out.",
      },
      {
        title: "Player Funds Segregation Reconciliation",
        body: "Total player liabilities are tied to segregated and protected bank accounts daily. Finance and compliance teams get evidence regulators can review.",
      },
      {
        title: "Wager & Settlement Reconciliation",
        body: "Bets that were placed, settled, voided or resettled are reconciled to wallet movements and the GL, so unsettled and mis-settled wagers don't slip through.",
      },
      {
        title: "Payment Processor & PSP Settlement Reconciliation",
        body: "PSP payouts are split back into the individual transactions, fees, refunds and reserves, and tied to the bank deposit.",
      },
      {
        title: "App Store & Platform Payout Reconciliation",
        body: "Apple, Google and console platform payouts are reconciled to in-game purchase data. Fees, refunds, taxes and FX are kept apart from genuine breaks.",
      },
      {
        title: "Chargebacks & Friendly Fraud",
        body: "Osfin links a chargeback to the player's deposit, gameplay and withdrawal history. Repeat offenders are easy to spot.",
      },
      {
        title: "Financial Close & Certification",
        body: "Player liability, clearing and revenue accounts are signed off with evidence attached, which is what auditors and gaming regulators ask for.",
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
