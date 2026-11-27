"use client";

import { LayoutGroup } from "motion/react";

export default function FinanceOperationsLayout({ children }: { children: React.ReactNode }) {
  return <LayoutGroup id="finance-operations-tabs">{children}</LayoutGroup>;
}
