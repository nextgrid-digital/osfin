"use client";

import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { INDUSTRIES } from "../content/industries";
import IndustryTemplate from "./IndustryTemplate";
import { IndustrySelectContext } from "./industry-select";

let heldScroll: number | null = null;

export default function IndustrySwitcher({ initialSlug }: { initialSlug: string }) {
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

  const industry = INDUSTRIES.find((item) => item.id === slug) ?? INDUSTRIES.find((item) => item.id === initialSlug);
  if (!industry) return null;

  const select = (nextId: string) => {
    if (nextId === slug) return;
    heldScroll = window.scrollY;
    flushSync(() => setSlug(nextId));
    const current = window.history.state;
    window.history.pushState(
      current && current.__NA ? current : { ...current, __NA: true },
      "",
      `/industries/${nextId}`,
    );
  };

  return (
    <IndustrySelectContext.Provider value={select}>
      <IndustryTemplate industry={industry} />
    </IndustrySelectContext.Provider>
  );
}
