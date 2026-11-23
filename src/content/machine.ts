import { CUSTOMER_STORIES, type CustomerStory } from "./customers";
import { INDUSTRIES } from "./industries";
import { POSTS } from "./posts";
import { FEATURES } from "./process";
import { PRODUCTS } from "./products";
import { SECURITY } from "./security";

export const SITE_ORIGIN = "https://osfin.ai";

export type MachineBlock =
  | { type: "text"; text: string }
  | { type: "link"; label: string; href: string };

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Security", href: "/security" },
  { label: "Customers", href: "/customers" },
] as const;

const LEGAL = [
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
] as const;

function firstSentence(text: string) {
  const match = text.match(/^[\s\S]{12,}?[.!?]/);
  const sentence = (match ? match[0] : text).replace(/\s+/g, " ").trim();
  return sentence.length > 220 ? `${sentence.slice(0, 217).trimEnd()}…` : sentence;
}

function storyQuote(story: CustomerStory) {
  for (const section of story.sections) {
    for (const block of section.blocks ?? []) {
      if (block.type === "p") return firstSentence(block.text);
    }
    const paragraph = section.paragraphs?.[0];
    if (paragraph) return firstSentence(paragraph);
  }
  return story.title;
}

export function absoluteHref(href: string) {
  if (href.startsWith("mailto:") || href.startsWith("http://") || href.startsWith("https://")) return href;
  return `${SITE_ORIGIN}${href}`;
}

export function machineBlocks(): MachineBlock[] {
  const blocks: MachineBlock[] = [
    { type: "text", text: "OSFIN" },
    { type: "text", text: "" },
    { type: "text", text: "The finance automation platform built for enterprise complexity." },
    { type: "text", text: "" },
    {
      type: "text",
      text: "Osfin partners with the most ambitious enterprises and leaders to drive transformation in finance operations. We do this by deploying our teams of forward-deployed engineers and purpose-built agents who own the outcome and act as a catalyst for change across your finance, accounting and payments functions.",
    },
    { type: "text", text: "" },
    { type: "link", label: "Get in touch", href: "mailto:socials@osfin.ai" },
    { type: "text", text: "" },
    { type: "text", text: "Process" },
  ];

  for (const feature of FEATURES) {
    blocks.push({ type: "text", text: "" });
    blocks.push({ type: "text", text: feature.title.join(" ") });
    blocks.push({ type: "text", text: feature.body });
  }

  blocks.push({ type: "text", text: "" }, { type: "text", text: "Products" });
  for (const product of PRODUCTS) {
    blocks.push({ type: "text", text: "" });
    blocks.push({ type: "link", label: product.name, href: `/products/${product.slug}` });
    blocks.push({ type: "text", text: product.lede });
  }

  blocks.push({ type: "text", text: "" }, { type: "text", text: "Industries" });
  for (const industry of INDUSTRIES) {
    blocks.push({ type: "text", text: "" });
    blocks.push({ type: "link", label: industry.label, href: `/industries/${industry.id}` });
    blocks.push({ type: "text", text: industry.summary });
  }

  blocks.push({ type: "text", text: "" }, { type: "text", text: "Customers" });
  for (const story of CUSTOMER_STORIES) {
    blocks.push({ type: "text", text: "" });
    blocks.push({
      type: "link",
      label: story.company ?? story.title,
      href: `/customers/${story.slug}`,
    });
    blocks.push({ type: "text", text: storyQuote(story) });
  }

  blocks.push({ type: "text", text: "" }, { type: "text", text: "Blog" });
  for (const post of POSTS) {
    blocks.push({ type: "text", text: "" });
    blocks.push({ type: "link", label: post.title, href: `/blog/${post.slug}` });
  }

  blocks.push({ type: "text", text: "" }, { type: "text", text: "Company" });
  for (const item of COMPANY) {
    blocks.push({ type: "link", label: item.label, href: item.href });
  }

  blocks.push({ type: "text", text: "" }, { type: "text", text: "Security" });
  blocks.push({ type: "text", text: SECURITY.intro });
  blocks.push({ type: "link", label: "Security", href: "/security" });

  blocks.push({ type: "text", text: "" }, { type: "text", text: "Legal" });
  for (const item of LEGAL) {
    blocks.push({ type: "link", label: item.label, href: item.href });
  }

  return blocks;
}

export function machinePlainText() {
  return machineBlocks()
    .map((block) => (block.type === "link" ? `[${block.label}](${absoluteHref(block.href)})` : block.text))
    .join("\n");
}
