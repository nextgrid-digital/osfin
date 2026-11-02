import {
  aiToolsForFinance,
  bai2,
  bankLockboxes,
  monthEndReconciliation,
  recordToReport,
  sameDayAch,
} from "./blog-posts";

export type PostCategory = "Product" | "Research";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type PostSubsection = {
  heading: string;
  paragraphs?: string[];
  blocks?: PostBlock[];
};

export type PostSection = {
  heading: string;
  paragraphs?: string[];
  blocks?: PostBlock[];
  subsections?: PostSubsection[];
};

export type Post = {
  slug: string;
  title: string;
  category: PostCategory;
  date: string;
  cover?: string;
  sections: PostSection[];
};

export const POSTS: Post[] = [
  sameDayAch,
  recordToReport,
  bai2,
  bankLockboxes,
  monthEndReconciliation,
  aiToolsForFinance,
];

export const POST_CATEGORIES = ["Product", "Research"] as const;

export function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function postSlugs() {
  return POSTS.map((post) => post.slug);
}
