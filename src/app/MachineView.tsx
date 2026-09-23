"use client";

import { useMemo, type ReactNode } from "react";

type Block =
  | { type: "h1" | "h2" | "h3"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "hr" }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text))) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      parts.push(<code key={key++}>{token.slice(1, -1)}</code>);
    } else {
      const link = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (link) {
        parts.push(
          <a key={key++} href={link[2]}>
            {link[1]}
          </a>,
        );
      }
    }
    last = match.index + token.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function parseMarkdown(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      blocks.push({ type: "code", text: code.join("\n") });
      i += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      const text = line.slice(2).trim();
      blocks.push({ type: "h1", text, id: slugify(text) });
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      blocks.push({ type: "h2", text, id: slugify(text) });
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      blocks.push({ type: "h3", text, id: slugify(text) });
      i += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("```") &&
      !/^---+$/.test(lines[i].trim())
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}

export default function MachineView({ markdown }: { markdown: string }) {
  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <div className="not-typeset min-h-screen bg-[#0e0e0e] pb-28" data-not-typeset>
      <article className="typeset typeset-docs mx-auto max-w-[42em] px-5 py-16 sm:px-6 sm:py-24">
        {blocks.map((block, index) => {
          if (block.type === "h1") {
            return (
              <h1 key={index} id={block.id}>
                {block.text}
              </h1>
            );
          }
          if (block.type === "h2") {
            return (
              <h2 key={index} id={block.id}>
                {block.text}
              </h2>
            );
          }
          if (block.type === "h3") {
            return (
              <h3 key={index} id={block.id}>
                {block.text}
              </h3>
            );
          }
          if (block.type === "hr") {
            return <hr key={index} />;
          }
          if (block.type === "ul") {
            return (
              <ul key={index}>
                {block.items.map((item, j) => (
                  <li key={j}>{parseInline(item)}</li>
                ))}
              </ul>
            );
          }
          if (block.type === "code") {
            return (
              <pre key={index}>
                <code>{block.text}</code>
              </pre>
            );
          }
          return <p key={index}>{parseInline(block.text)}</p>;
        })}
      </article>
    </div>
  );
}
