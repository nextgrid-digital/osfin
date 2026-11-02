import type { ReactNode } from "react";

/** Shared content shell: max 1440px (OpenAI), 32px horizontal padding. */
export default function SiteContainer({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[var(--max)] px-5 sm:px-8 ${className}`.trim()}>
      {children}
    </Tag>
  );
}
