"use client";

import { INDUSTRIES } from "../content/industries";
import { useIndustrySelect } from "./industry-select";

export default function IndustryTabs({ currentId }: { currentId: string }) {
  const select = useIndustrySelect();

  return (
    <nav
      aria-label="Industries"
      className="not-typeset sticky top-14 z-40 -mx-5 mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-b border-black/10 bg-white px-5 py-4 sm:-mx-8 sm:px-8 md:top-16 md:mt-16 md:gap-x-4"
      data-not-typeset
    >
      {INDUSTRIES.map((item) => {
        const active = item.id === currentId;
        return (
          <a
            key={item.id}
            href={`/industries/${item.id}`}
            aria-current={active ? "page" : undefined}
            onClick={(event) => {
              if (!select) return;
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              select(item.id);
            }}
            className={`inline-flex items-center justify-center px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[14px] font-medium leading-none tracking-[-0.02em] uppercase no-underline ${
              active ? "text-[rgba(0,0,0,0.875)]" : "text-black/45 hover:text-black/70"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
