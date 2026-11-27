"use client";

import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { FINANCE_OPERATIONS } from "../content/finance-operations";
import FinanceOperationsTemplate from "./FinanceOperationsTemplate";
import { FinanceSelectContext } from "./finance-select";

let heldScroll: number | null = null;

export default function FinanceOperationsSwitcher({ initialSlug }: { initialSlug: string }) {
  const [slug, setSlug] = useState(initialSlug);

  useLayoutEffect(() => {
    setSlug(initialSlug);
  }, [initialSlug]);

  useLayoutEffect(() => {
    if (heldScroll == null) return;
    const y = heldScroll;
    const restore = () => window.scrollTo(0, y);
    restore();
    const frame = requestAnimationFrame(restore);
    const timer = window.setTimeout(() => {
      restore();
      if (initialSlug === slug) heldScroll = null;
    }, 1200);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [slug, initialSlug]);

  const operation =
    FINANCE_OPERATIONS.find((item) => item.slug === slug) ??
    FINANCE_OPERATIONS.find((item) => item.slug === initialSlug);
  if (!operation) return null;

  const select = (nextSlug: string) => {
    if (nextSlug === slug) return;
    heldScroll = window.scrollY;
    flushSync(() => setSlug(nextSlug));
    const current = window.history.state;
    window.history.pushState(
      current && current.__NA ? current : { ...current, __NA: true },
      "",
      `/solutions/${nextSlug}`,
    );
  };

  return (
    <FinanceSelectContext.Provider value={select}>
      <FinanceOperationsTemplate operation={operation} />
    </FinanceSelectContext.Provider>
  );
}
