export const ABOUT = {
  label: "About",
  manifesto:
    "The books were never the problem. Every institution has a close it means to make. Most have tried, and hit the same wall. Spreadsheets, point tools, programs that run for years, and a break list that still owns the month. Osfin was founded because we kept watching this happen, and we knew exactly why.",
  essays: [
    {
      label: "AI-native is a mindset",
      body: "Automation is not the point. It changes how a finance operation thinks, matches, and signs off. The next generation of institutions will run with the transaction at the core: every file taken in its native form, every exception resolved before it becomes a project, the audit trail kept as the system of record. This is how banks, processors, and fintechs become operationally AI-native. By rebuilding the work itself.",
    },
    {
      label: "Experts inside the operation",
      body: "That takes a different kind of company. One built to sit with finance, operations, and risk, go deep enough to see how money actually moves, and rebuild the systems that reconcile, dispute, and close. Not a handoff. We are in it until the numbers hold.",
      closer:
        "Founded in 2021 by Pavan Rathore, Jainendra Batra, Vikash Goenka, and Shitikanth Kashyap.",
    },
  ],
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
      label: "In production",
      names: ["PharmEasy", "Games 24x7", "Manipal Cigna", "Buku Warung"],
    },
    {
      label: "Standards",
      names: ["SOC 2", "ISO 27001", "GDPR", "PCI DSS"],
    },
  ],
  places: {
    label: "Where the work sits",
    title: "The team sits where the money moves, and shows up where the industry does.",
    cities: [
      {
        name: "Bengaluru",
        role: "Headquarters",
        detail: "Koramangala.",
        image: "/about/bengaluru.jpg",
        imageAlt: "Bengaluru cityscape",
      },
      {
        name: "United States",
        role: "Office",
        detail:
          "In September 2025 the team gathered payments leaders from Visa, Mastercard, and L.E.K. at Finovate.",
        image: "/about/united-states.jpg",
        imageAlt: "Austin, Texas",
      },
      {
        name: "Dubai",
        role: "Field",
        detail:
          "Returning networking sponsor of MEBIS, 16–17 September 2026, Jumeirah Emirates Towers.",
        image: "/about/dubai.jpg",
        imageAlt: "Dubai skyline",
      },
    ],
  },
} as const;
