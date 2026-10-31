"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export default function RevealFooter({ children }: { children: ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const spacer = spacerRef.current;
    if (!footer || !spacer) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const height = footer.offsetHeight;
      spacer.style.height = `${height}px`;
      const overflow = Math.max(0, height - window.innerHeight);
      if (overflow === 0) {
        footer.style.transform = "";
        return;
      }
      const revealed = Math.min(height, Math.max(0, window.innerHeight - spacer.getBoundingClientRect().top));
      const shift = Math.max(0, revealed - window.innerHeight);
      footer.style.transform = shift ? `translate3d(0, ${-shift}px, 0)` : "";
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(footer);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={spacerRef} aria-hidden />
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        {children}
      </div>
    </>
  );
}
