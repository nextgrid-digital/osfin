"use client";

import { motion } from "motion/react";
import { PRODUCTS } from "../content/products";
import { useProductSelect } from "./product-select";

export default function ProductTabs({ currentSlug }: { currentSlug: string }) {
  const select = useProductSelect();

  return (
    <nav
      aria-label="Products"
      className="not-typeset sticky top-14 z-40 -mx-5 mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-b border-black/10 bg-[#E4E4E4] px-5 py-4 sm:-mx-8 sm:px-8 md:top-16 md:mt-16 md:gap-x-4"
      data-not-typeset
    >
      {PRODUCTS.map((product) => {
        const active = product.slug === currentSlug;
        return (
          <a
            key={product.slug}
            href={`/products/${product.slug}`}
            onClick={(event) => {
              if (!select) return;
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              select(product.slug);
            }}
            className={`relative px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[14px] font-medium tracking-[-0.02em] uppercase ${
              active ? "text-[rgba(0,0,0,0.875)]" : "text-black/45 hover:text-black/70"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="product-tab-highlight"
                className="absolute inset-0 z-0 rounded-none bg-white"
                transition={{ duration: 0 }}
              />
            ) : null}
            <span className="relative z-10">{product.name}</span>
          </a>
        );
      })}
    </nav>
  );
}
