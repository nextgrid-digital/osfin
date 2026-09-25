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
      className={`${paint ? "bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]" : ""} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
