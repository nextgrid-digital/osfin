"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export default function PlatformSplit({
  copy,
  visual,
  flank = false,
  flankStart,
}: {
  copy: ReactNode;
  visual: ReactNode;
  /** Draw a visual on both sides of the copy. */
  flank?: boolean;
  /** Left-hand visual when `flank` is set. Falls back to `visual`. */
  flankStart?: ReactNode;
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

  const frame = (side: "start" | "end", node: ReactNode) => (
    <div
      key={side}
      aria-hidden={flank ? true : undefined}
      className={
        flank
          ? "relative mx-auto aspect-square w-full max-w-xs bg-transparent lg:mx-0 lg:aspect-auto lg:h-full lg:max-w-none"
          : "relative aspect-square w-full max-w-md shrink-0 bg-transparent text-black/40 lg:aspect-auto lg:h-[var(--platform-visual,26rem)] lg:w-[var(--platform-visual,26rem)] lg:max-w-none"
      }
      style={
        !flank && height
          ? ({ "--platform-visual": `${height}px` } as CSSProperties)
          : undefined
      }
    >
      {node}
    </div>
  );

  return (
    <div
      data-platform-stage={flank ? "" : undefined}
      className={
        flank
          ? "mx-auto grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)_minmax(0,1fr)] lg:items-stretch lg:gap-16"
          : "mx-auto flex w-full flex-col items-center gap-12 lg:w-fit lg:flex-row lg:items-center lg:justify-center lg:gap-16"
      }
    >
      {flank ? frame("start", flankStart ?? visual) : null}
      <div
        ref={copyRef}
        className={
          flank
            ? "order-first w-full text-center lg:order-none"
            : "w-full lg:w-auto lg:max-w-xl lg:shrink-0"
        }
      >
        {copy}
      </div>
      {frame("end", visual)}
    </div>
  );
}
