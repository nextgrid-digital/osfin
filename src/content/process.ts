export const FEATURES = [
  {
    id: "map",
    nav: "Map",
    title: ["See today’s work", "end to end"],
    body: "Our forward-deployed team and agents map your data, workflows, and internal policies. Together, we uncover opportunities to automate work, improve customer and employee experience, and reduce risk, giving leaders the evidence they need to drive change and free up resources.",
    copy: "max-w-[34.5rem]",
    figure: "branches" as const,
  },
  {
    id: "reimagine",
    nav: "Reimagine",
    title: ["Redesign how", "work gets done"],
    body: "We’re in the earliest innings of a fundamental shift in how work gets done. Osfin works alongside your teams to rethink how they operate, bringing lessons from across the industry and co-creating new ways of working.",
    copy: "max-w-[30rem]",
    figure: "loupe" as const,
  },
  {
    id: "transform",
    nav: "Configure",
    title: ["Deploy agents", "against your goals"],
    body: "Osfin deploys goal-oriented agents, purpose-built for finance, accounting, and payments operations, that get the job done. They stand up quickly, run your operational processes end to end, and bring your team in only when judgment is needed.",
    copy: "max-w-[32rem]",
    figure: "cabinet" as const,
  },
  {
    id: "learn",
    nav: "Learn",
    title: ["Agents that get", "better every day"],
    body: "Osfin’s agents learn from how your team resolves exceptions, edge cases, and escalations. Every decision makes them sharper, so they become a trusted coworker that knows how your team works.",
    copy: "max-w-[27.5rem]",
    figure: "phosphor" as const,
  },
  {
    id: "control",
    nav: "Control",
    title: ["You stay in", "the driver’s seat"],
    body: "Built for financial services, Osfin’s platform keeps agents within your internal policies, routes decisions to people where oversight is required, and records a full audit trail of every action they take.",
    copy: "max-w-[27rem]",
    figure: "vault" as const,
  },
] as const;

export type FeatureId = (typeof FEATURES)[number]["id"];
