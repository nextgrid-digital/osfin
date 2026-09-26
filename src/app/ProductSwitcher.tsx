"use client";

import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { getProduct } from "../content/products";
import ProductTemplate from "./ProductTemplate";
import { ProductSelectContext } from "./product-select";

let heldScroll: number | null = null;

export default function ProductSwitcher({ initialSlug }: { initialSlug: string }) {
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

  const product = getProduct(slug) ?? getProduct(initialSlug);
  if (!product) return null;

  const select = (nextSlug: string) => {
    if (nextSlug === slug) return;
    heldScroll = window.scrollY;
    flushSync(() => setSlug(nextSlug));
    const current = window.history.state;
    window.history.pushState(
      current && current.__NA ? current : { ...current, __NA: true },
      "",
      `/products/${nextSlug}`,
    );
  };

  return (
    <ProductSelectContext.Provider value={select}>
      <ProductTemplate product={product} />
    </ProductSelectContext.Provider>
  );
}
