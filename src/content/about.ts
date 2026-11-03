export const ABOUT = {
  manifesto:
    "The books were never the problem. Institutions have tried, and hit the same wall: spreadsheets, point tools, and a break list.",
  who: {
    label: "Who we are",
    title: "An applied technology company that owns the outcome.",
    columns: [
      {
        index: "01",
        title: "Applied technology",
        body: "We deploy purpose-built systems across the life of the operation.",
        points: [
          "Context mapping",
          "Workflow design",
          "Production deployment",
          "Continuous learning",
        ],
      },
      {
        index: "02",
        title: "Relentless outcome ownership",
        body: "We do not ship a tool and leave. We stay until the operation changes.",
        points: [
          "Forward-deployed engineers beside finance, operations, and risk",
          "Reconciliation, disputes, controls, and close treated as one system",
          "Trusted by more than 50 institutions, with 170+ connectors, moving millions of records in minutes without losing the audit",
        ],
      },
    ],
  },
  proof: [
    {
      label: "Partners",
      items: [
        { name: "Fiserv", short: "Fiserv", logo: "/about/logos/fiserv.png?v=8" },
        { name: "McKinsey", short: "McKinsey", logo: "/about/logos/mckinsey.png?v=8" },
        { name: "KPMG", short: "KPMG", logo: "/about/logos/kpmg.png?v=4" },
      ],
    },
    {
      label: "Investors",
      items: [
        { name: "Peak XV Partners", short: "Peak XV", logo: "/about/logos/peak-xv.png?v=8" },
        { name: "Info Edge Ventures", short: "Info Edge", logo: "/about/logos/info-edge.png?v=4" },
        { name: "PointOne Capital", short: "PointOne", logo: "/about/logos/pointone.png?v=8" },
        { name: "Mitcon Credentia", short: "Mitcon Credentia", logo: "/about/logos/mitcon-credentia.png?v=1" },
      ],
    },
    {
      label: "Team",
      items: [
        { name: "BCG", short: "BCG", logo: "/about/logos/bcg.png?v=5" },
        { name: "Bain", short: "Bain", logo: "/about/logos/bain.png?v=8" },
        { name: "Deloitte", short: "Deloitte", logo: "/about/logos/deloitte.png?v=4" },
        { name: "University of California, Berkeley", short: "Berkeley", logo: "/about/logos/berkeley.png?v=4" },
        { name: "The Wharton School of the University of Pennsylvania", short: "Wharton", logo: "/about/logos/wharton.png?v=4" },
        { name: "University of North Carolina at Chapel Hill", short: "UNC", logo: "/about/logos/unc.png?v=8" },
        { name: "The University of Waterloo", short: "Waterloo", logo: "/about/logos/waterloo.png?v=8" },
        { name: "Indian Institute of Technology Kanpur", short: "IIT Kanpur", logo: "/about/logos/iit.png?v=7" },
      ],
    },
    {
      label: "Standards",
      items: [
        { name: "PCI DSS", short: "PCI DSS", logo: "/about/logos/pci.png?v=4" },
        { name: "SOC 1 Type II", short: "SOC 1", logo: "/about/logos/aicpa.png?v=5" },
        { name: "SOC 2 Type II", short: "SOC 2", logo: "/about/logos/aicpa.png?v=5" },
        { name: "ISO 27001:2022", short: "ISO 27001", logo: "/about/logos/iso.png?v=6" },
        { name: "GDPR", short: "GDPR", logo: "/about/logos/gdpr.png?v=11" },
        { name: "CCPA", short: "CCPA", logo: "/about/logos/california.png?v=11" },
        { name: "HIPAA", short: "HIPAA", logo: "/about/logos/hhs.png?v=11" },
      ],
    },
  ],
  places: {
    label: "Where the work sits",
    title: "The team sits where the money moves, and shows up where the industry does.",
    cities: [
      {
        name: "San Francisco",
        image: "/about/san-francisco.jpg?v=2",
        imageAlt: "Golden Gate Bridge, San Francisco",
      },
      {
        name: "Dubai",
        image: "/about/dubai.jpg?v=2",
        imageAlt: "Burj Khalifa, Dubai",
      },
      {
        name: "Bengaluru",
        image: "/about/bengaluru.jpg?v=2",
        imageAlt: "Vidhana Soudha, Bengaluru",
      },
    ],
  },
} as const;
