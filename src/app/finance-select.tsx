"use client";

import { createContext, useContext } from "react";

export const FinanceSelectContext = createContext<((slug: string) => void) | null>(null);

export function useFinanceSelect() {
  return useContext(FinanceSelectContext);
}
