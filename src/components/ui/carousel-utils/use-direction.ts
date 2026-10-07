"use client";

import * as React from "react";

export function useDirection(): "ltr" | "rtl" {
  const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr");

  React.useEffect(() => {
    const next = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
    setDirection(next);
  }, []);

  return direction;
}
