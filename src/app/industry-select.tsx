"use client";

import { createContext, useContext } from "react";

export const IndustrySelectContext = createContext<((id: string) => void) | null>(null);

export function useIndustrySelect() {
  return useContext(IndustrySelectContext);
}
