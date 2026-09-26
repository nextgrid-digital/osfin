"use client";

import { createContext, useContext } from "react";

export const ProductSelectContext = createContext<((slug: string) => void) | null>(null);

export function useProductSelect() {
  return useContext(ProductSelectContext);
}
