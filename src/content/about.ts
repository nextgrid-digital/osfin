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
      label: "Investors",
      note: "Seed in 2022. Peak XV partnered in 2024.",
      items: [
        { name: "Peak XV Partners", short: "Peak XV", logo: "/about/logos/peak-xv.png?v=4" },
        { name: "PointOne Capital", short: "PointOne", logo: "/about/logos/pointone.png?v=4" },
        { name: "Info Edge Ventures", short: "Info Edge", logo: "/about/logos/info-edge.png?v=4" },
        { name: "QED Innovation Labs", short: "QED", logo: "/about/logos/qed.png?v=4" },
      ],
    },
    {
      label: "Partners",
      items: [
        { name: "Fiserv", short: "Fiserv", logo: "/about/logos/fiserv.png?v=4" },
        { name: "Fiserv AgentOS", short: "agentOS", logo: "/about/logos/agentos.png?v=4" },
        { name: "McKinsey", short: "McKinsey", logo: "/about/logos/mckinsey.png?v=4" },
        { name: "KPMG", short: "KPMG", logo: "/about/logos/kpmg.png?v=4" },
      ],
    },
    {
      label: "Team",
      items: [
        { name: "BCG", short: "BCG", logo: "/about/logos/bcg.png?v=4" },
        { name: "Bain", short: "Bain", logo: "/about/logos/bain.png?v=4" },
        { name: "Deloitte", short: "Deloitte", logo: "/about/logos/deloitte.png?v=4" },
        { name: "University of California, Berkeley", short: "Berkeley", logo: "/about/logos/berkeley.png?v=4" },
        { name: "The Wharton School of the University of Pennsylvania", short: "Wharton", logo: "/about/logos/wharton.png?v=4" },
        { name: "University of North Carolina at Chapel Hill", short: "UNC", logo: "/about/logos/unc.png?v=4" },
        { name: "The University of Waterloo", short: "Waterloo", logo: "/about/logos/waterloo.png?v=4" },
        { name: "Indian Institutes of Technology", short: "IIT", logo: "/about/logos/iit.png?v=4" },
      ],
    },
    {
      label: "Standards",
      items: [
        { name: "PCI DSS", short: "PCI DSS", logo: "/about/logos/pci.png?v=4" },
        {
          name: "SOC 1 Type II & SOC 2 Type II",
          short: ["SOC 1 Type II", "SOC 2 Type II"],
          logo: "/about/logos/aicpa.png?v=4",
        },
        { name: "ISO 27001:2022", short: "ISO 27001", logo: "/about/logos/iso.png?v=4" },
        { name: "GDPR", short: "GDPR", logo: "/about/logos/gdpr.png?v=4" },
        { name: "CCPA", short: "CCPA", logo: "/about/logos/california.png?v=4" },
        { name: "HIPAA", short: "HIPAA", logo: "/about/logos/hhs.png?v=4" },
      ],
    },
  ],
  places: {
    label: "Where the work sits",
    title: "The team sits where the money moves, and shows up where the industry does.",
    // Landmark photos, Wikimedia Commons:
    // Golden Gate Bridge — Brocken Inaglory, CC BY-SA 3.0
    // Vidhana Soudha — Moheen Reeyad, CC BY-SA 4.0
    // Burj Khalifa — Laika ac, CC BY-SA 2.0
    cities: [
      {
        name: "San Francisco",
        image: "/about/san-francisco.jpg",
        imageAlt: "Golden Gate Bridge, San Francisco",
      },
      {
        name: "Dubai",
        image: "/about/dubai.jpg",
        imageAlt: "Burj Khalifa, Dubai",
      },
      {
        name: "Bengaluru",
        image: "/about/bengaluru.jpg",
        imageAlt: "Vidhana Soudha, Bengaluru",
      },
    ],
  },
} as const;
