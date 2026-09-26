"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export default function PlatformSplit({
  copy,
  visual,
}: {
  copy: ReactNode;
  visual: ReactNode;
}) {
  const copyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col items-center gap-12 lg:w-fit lg:flex-row lg:items-center lg:justify-center lg:gap-16">
      <div ref={copyRef} className="w-full lg:w-auto lg:max-w-xl lg:shrink-0">
        {copy}
      </div>
      <div
        className="relative aspect-square w-full max-w-md shrink-0 bg-transparent text-black/40 lg:aspect-auto lg:h-[var(--platform-visual,26rem)] lg:w-[var(--platform-visual,26rem)] lg:max-w-none"
        style={
          height
            ? ({ "--platform-visual": `${height}px` } as CSSProperties)
            : undefined
        }
      >
        {visual}
      </div>
    </div>
  );
}
