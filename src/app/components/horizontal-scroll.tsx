"use client";

import { useCallback, useRef, type ReactNode } from "react";

/** Industries carousel: native scrollbar hidden; thin progress line matches the Aptos hairline. */
export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const syncProgress = useCallback(() => {
    const track = trackRef.current;
    const bar = progressRef.current;
    if (!track || !bar) return;
    const max = track.scrollWidth - track.clientWidth;
    bar.value = max > 0 ? (track.scrollLeft / max) * 100 : 0;
  }, []);

  return (
    <horizontal-scroll class="w-320 flex flex-col items-center col-span-full max-md:w-[23.4375rem] md:max-lg:w-192 2xl:w-480 2xl:-ml-20">
      <div
        ref={trackRef}
        onScroll={syncProgress}
        className="industry-scroll-track flex py-[0.3125rem] px-10 gap-2.5 overflow-x-auto overflow-y-hidden cursor-grab w-full max-md:px-[1.4625rem] md:max-lg:px-12 2xl:pr-[3.4375rem] 2xl:pl-[8.4375rem]"
      >
        {children}
      </div>
      <progress
        ref={progressRef}
        className="industry-scroll-progress block mt-15 bg-border h-px w-[22.5rem] max-lg:mt-[2.8125rem] max-lg:w-[11.25rem]"
        aria-label="Horizontal scroll progress"
        max={100}
        value={0}
      />
    </horizontal-scroll>
  );
}
