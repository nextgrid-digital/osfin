export type PostCategory = "Product" | "Research";

export type PostSection = {
  heading: string;
  paragraphs: string[];
};

export type Post = {
  slug: string;
  title: string;
  category: PostCategory;
  date: string;
  cover: string;
  sections: PostSection[];
};

export const POSTS: Post[] = [
  {
    slug: "users-view",
    title: "Users View for each team\non a single record",
    category: "Product",
    date: "Sep 21, 2026",
    cover: "/changelog/cover.png",
    sections: [
      {
        heading: "One record, more than one desk",
        paragraphs: [
          "Finance, operations, risk, and audit do not need the same screen. They do need the same record. Users View is the layer that keeps those screens attached to one source, so a number on a dashboard can be followed back to the transaction that produced it.",
          "The view changes with the person. The record does not. A controller sees the position. An operator sees the break. An auditor sees the rule, the source, and the decision. None of them rebuilds the trail by hand.",
        ],
      },
      {
        heading: "What the view is allowed to hide",
        paragraphs: [
          "A useful view leaves out noise. It does not leave out the path back. Every figure in Users View keeps its source, the match that settled it, and the exception that is still open.",
          "That is the difference between a report and an operating record. The report can be exported. The record stays live, and the next person who opens it starts from the same place.",
        ],
      },
    ],
  },
  {
    slug: "introducing-consent-management",
    title: "Consent stays beside\neach payment it covers",
    category: "Product",
    date: "Mar 12, 2026",
    cover: "/changelog/cover-2.png",
    sections: [
      {
        heading: "Consent belongs on the payment",
        paragraphs: [
          "A payment can be correct and still be unauthorized. Consent Management keeps the permission next to the transaction it governs, instead of in a separate archive that someone has to retrieve after the fact.",
          "When a charge, a mandate, or a data use is challenged, the team can see what was agreed, when it was agreed, and which record it covers.",
        ],
      },
      {
        heading: "What the product records",
        paragraphs: [
          "Each consent carries the party, the scope, the channel, and the moment it was given or withdrawn. A later payment either sits inside that scope or it does not. The system does not infer permission from a similar case.",
          "Withdrawn consent stays on the record. It is not deleted to make the current state look clean. The history is the evidence.",
        ],
      },
    ],
  },
  {
    slug: "timeline-improvements",
    title: "A clearer timeline of\nevery payment handoff",
    category: "Research",
    date: "Feb 11, 2026",
    cover: "/changelog/cover-3.jpg",
    sections: [
      {
        heading: "The trail was hard to read",
        paragraphs: [
          "A payment moves through files, processors, ledgers, and case notes that do not share a clock. Teams were reconstructing that sequence in spreadsheets, and the order of events changed depending on who assembled it.",
          "The research question was simple: can the operating record show one sequence that every team will accept, without flattening the detail that made the sequence true.",
        ],
      },
      {
        heading: "What the timeline now holds",
        paragraphs: [
          "Each event keeps its source system and its own timestamp. The timeline orders them, and it marks where two sources disagree about the time. Disagreement stays visible. It is not smoothed into a single official minute.",
          "Early reviews with operations teams showed that the useful unit is the handoff, not the raw log line. The next pass of this work is tighter grouping around those handoffs, still tied to the original records.",
        ],
      },
    ],
  },
  {
    slug: "exception-routing",
    title: "Each break finds the\nteam that can close it",
    category: "Research",
    date: "Jan 8, 2026",
    cover: "/changelog/cover-4.jpg",
    sections: [
      {
        heading: "Breaks were landing in the wrong queue",
        paragraphs: [
          "A missing settlement, a duplicate, and a customer dispute can look alike in a shared inbox. The first team to open the case often spent the time discovering that it belonged somewhere else.",
          "Routing research started from closed cases. The question was which facts, known at the moment the break appeared, would have sent it to the team that eventually resolved it.",
        ],
      },
      {
        heading: "How a case finds an owner",
        paragraphs: [
          "The route uses the cause, the rail, the amount, and the evidence already attached. It does not wait for an analyst to name the owner. When the evidence is thin, the case still moves, and the missing piece is named on the way.",
          "Some breaks still need a person to choose. The research treats that as a real outcome, not a failure of the route. The goal is that the person starts with the cause and the record, not with an empty ticket.",
        ],
      },
    ],
  },
];

export const POST_CATEGORIES = ["Product", "Research"] as const;

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function postSlugs() {
  return POSTS.map((post) => post.slug);
}
