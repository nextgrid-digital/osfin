"use client";

import { motion } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { FINANCE_OPERATIONS } from "../content/finance-operations";
import { useFinanceSelect } from "./finance-select";

const TAB_FONT_PX = 14;
const MIN_TAB_FONT_PX = 10;

export default function FinanceOperationsTabs({ currentSlug }: { currentSlug: string }) {
  const select = useFinanceSelect();
  const scrollerRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const nav = scrollerRef.current;
    const row = rowRef.current;
    if (!nav || !row) return;

    const fit = () => {
      row.style.fontSize = `${TAB_FONT_PX}px`;
      const styles = getComputedStyle(nav);
      const available =
        nav.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
      const needed = row.scrollWidth;
      const next =
        needed > available + 1
          ? Math.max(MIN_TAB_FONT_PX, (TAB_FONT_PX * available) / needed)
          : TAB_FONT_PX;
      row.style.fontSize = `${next}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>("[aria-current='page']");
    if (!scroller || !active) return;
    if (scroller.scrollWidth <= scroller.clientWidth + 1) return;
    const scrollerBox = scroller.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    const nextLeft =
      scroller.scrollLeft + (activeBox.left - scrollerBox.left) - (scrollerBox.width - activeBox.width) / 2;
    scroller.scrollTo({ left: Math.max(0, nextLeft) });
  }, [currentSlug]);

  return (
    <nav
      ref={scrollerRef}
      aria-label="Finance operations"
      className="not-typeset sticky top-14 z-40 -mx-5 mt-14 overflow-x-auto overscroll-x-contain border-b border-black/10 bg-background px-5 py-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:top-16 md:mt-16 [&::-webkit-scrollbar]:hidden"
      data-not-typeset
    >
      <div
        ref={rowRef}
        className="mx-auto flex w-max min-w-full flex-nowrap items-center justify-center gap-x-[1em] text-[14px]"
      >
        {FINANCE_OPERATIONS.map((item) => {
          const active = item.slug === currentSlug;
          return (
            <a
              key={item.slug}
              href={`/finance-operations/${item.slug}`}
              aria-current={active ? "page" : undefined}
              onClick={(event) => {
                if (!select) return;
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                select(item.slug);
              }}
              className={`relative inline-flex shrink-0 items-center justify-center px-[0.7em] py-[0.4em] font-[family-name:var(--font-mono)] text-[1em] font-medium leading-none tracking-[-0.02em] whitespace-nowrap uppercase no-underline ${
                active ? "text-black" : "text-black/45 hover:text-black/70"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="finance-tab-highlight"
                  className="absolute inset-0 z-0 rounded-none bg-black/10"
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{item.name}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
