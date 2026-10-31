"use client";

import { useRef } from "react";

/** Lightweight section wrapper. Theme-dark chrome flipping removed for the light site. */
export default function DarkThemeSection({
  children,
  className = "",
  id,
  paint = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  paint?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id={id}
      ref={ref}
      className={`${paint ? "bg-background text-[#5D524B]" : ""} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
