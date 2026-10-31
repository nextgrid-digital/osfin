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
      names: [
        "Peak XV Partners",
        "PointOne Capital",
        "Info Edge Ventures",
        "QED Innovation Labs",
      ],
    },
    {
      label: "Partners",
      names: ["Fiserv", "Fiserv AgentOS", "McKinsey", "KPMG"],
    },
    {
      label: "Team",
      names: [
        "BCG",
        "Bain",
        "Deloitte",
        "University of California, Berkeley",
        "The Wharton School of the University of Pennsylvania",
        "University of North Carolina at Chapel Hill",
        "The University of Waterloo",
        "Indian Institutes of Technology",
      ],
    },
    {
      label: "Standards",
      names: ["PCI DSS", "SOC 1 Type II", "SOC 2 Type II", "ISO 27001:2022", "GDPR", "CCPA", "HIPAA"],
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
