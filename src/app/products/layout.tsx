"use client";

import { LayoutGroup } from "motion/react";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <LayoutGroup id="product-tabs">{children}</LayoutGroup>;
}
