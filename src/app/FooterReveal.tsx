"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export default function FooterReveal({ children }: { children: ReactNode }) {
  const slotRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = slotRef.current?.querySelector<HTMLElement>(".site-footer");
    if (!footer) return;

    const root = document.documentElement;

    const apply = () => {
      const height = footer.offsetHeight;
      const fits = height > 0 && height <= window.innerHeight;
      footer.classList.toggle("is-fixed", fits);
      root.style.setProperty("--site-footer-h", fits ? `${height}px` : "0px");
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(footer);
    window.addEventListener("resize", apply);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
      footer.classList.remove("is-fixed");
      root.style.removeProperty("--site-footer-h");
    };
  }, []);

  return (
    <div ref={slotRef} className="contents">
      {children}
    </div>
  );
}
