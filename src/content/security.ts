export const SECURITY = {
  intro:
    "At Osfin, security isn't just a priority — it is our core commitment. We are entrusted by financial institutions with their most sensitive data, and we take that responsibility with the utmost seriousness.",
  mission:
    "Our mission is to provide you with a secure and resilient service, so you can operate with confidence and control.",
  principles: [
    {
      title: "256-bit encryption",
      body: "Osfin uses 256-bit SSL in transit so sensitive financial data stays protected between your systems.",
      icon: "lock" as const,
    },
    {
      title: "Regular security audits",
      body: "We run rigorous, recurring security audits to find and close gaps before they become incidents.",
      icon: "audit" as const,
    },
    {
      title: "VAPT testing",
      body: "Regular VAPT testing helps us identify and close security gaps before they can be exploited.",
      icon: "scan" as const,
    },
    {
      title: "Access you control",
      body: "Role-based access and two-factor authentication keep operators inside the policies you set.",
      icon: "key" as const,
    },
  ],
  audit: {
    heading: "Audit-ready, always.",
    items: [
      {
        title: "SOC 1 Type II",
        body: "Independently audited controls over financial reporting, so your close and vendor reviews have evidence attached.",
        logo: "/security/badges/AICPA_SOC.png",
        alt: "AICPA SOC",
      },
      {
        title: "SOC 2 Type II",
        body: "Security, availability, processing integrity, confidentiality, and privacy — audited against the SOC 2 trust criteria.",
        logo: "/security/badges/AICPA_SOC.png",
        alt: "AICPA SOC",
      },
      {
        title: "ISO 27001:2022",
        body: "Certified by BSI to ISO/IEC 27001, with an information security management system that protects client data.",
        logo: "/security/badges/ISO.png?v=2",
        alt: "ISO 27001",
      },
      {
        title: "GDPR",
        body: "With operations in Ireland, we operate under GDPR, the world's strictest standard for data privacy.",
        logo: "/security/badges/GDPR.png",
        alt: "GDPR",
      },
      {
        title: "HIPAA",
        body: "We safeguard protected health information with access controls, audit trails, and BAAs.",
        logo: "/security/badges/HIPAA.png",
        alt: "HIPAA",
      },
      {
        title: "PCI DSS & SSF",
        body: "DSS in the cloud and SSF for on-premise solutions, so payment data is handled to PCI standards.",
        logo: "/about/logos/pci.png?v=4",
        alt: "PCI DSS",
      },
    ],
  },
  practices: [
    {
      title: "Data Encryption",
      body: "Osfin uses 256-bit SSL/TLS to encrypt data in transit. Payment data is handled under PCI DSS in the cloud and PCI SSF for on-premise deployments. Encryption and key handling sit inside our ISO 27001 information security management system.",
    },
    {
      title: "Access Control",
      body: "Access is role-based and least-privilege. Two-factor authentication protects operator sessions. Agents stay inside internal policies, route exceptions to people, and keep a complete audit trail of every step.",
    },
    {
      title: "Infrastructure Security",
      body: "We operate an ISO 27001 ISMS certified by BSI. Regular vulnerability assessment and penetration testing, plus recurring security audits, are how we find and close gaps before they can be exploited.",
    },
    {
      title: "Business Continuity & Disaster Recovery",
      body: "Availability is a SOC 2 trust criterion we operate against. Monitoring, tested controls, and recovery procedures are maintained as part of our information security management system so finance operations can keep running.",
    },
    {
      title: "Privacy & Data Protection",
      body: "We operate under GDPR from Ireland, comply with CCPA, and safeguard protected health information under HIPAA. Personal and financial data is collected and processed only as needed to deliver the service, with BAAs where healthcare operations require them.",
    },
    {
      title: "People & Process",
      body: "Every agent action is recorded for close, SOX, and regulator review. Security is not a point tool — it is how we deploy, operate, and stay until the control environment holds. Regular audits keep people, process, and production aligned.",
    },
  ],
} as const;
