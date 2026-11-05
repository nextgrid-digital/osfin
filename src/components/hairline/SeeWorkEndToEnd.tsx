"use client";

import { useEffect, useRef } from "react";
import { seeWorkEndToEnd } from "./see-work-end-to-end";

type Props = {
  intensity?: number;                       // 0 to 1, how far the layers open and how wide the ripple spreads
  theme?: "auto" | "light" | "dark";
  onRead?: (caption: string) => void;       // "rest", "cell 3·2 · on route", ...
  className?: string;
};

export function SeeWorkEndToEnd({ intensity = 0.6, theme = "auto", onRead, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fig = useRef<ReturnType<typeof seeWorkEndToEnd> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    fig.current = seeWorkEndToEnd(ref.current, { intensity, theme, onRead });
    return () => fig.current?.destroy();
    // mount once; option changes go through update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fig.current?.update({ intensity, theme, onRead }); }, [intensity, theme, onRead]);

  return <div ref={ref} className={className} />;
}
