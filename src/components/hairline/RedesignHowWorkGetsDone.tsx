"use client";

import { useEffect, useRef } from "react";
import { redesignHowWorkGetsDone } from "./redesign-how-work-gets-done";

type Props = {
  intensity?: number;                       // 0 to 1, how high columns rise under the pointer
  theme?: "auto" | "light" | "dark";
  onRead?: (caption: string) => void;       // "today", "rethinking", "redesigning", "redesigned"
  className?: string;
};

export function RedesignHowWorkGetsDone({ intensity = 0.6, theme = "auto", onRead, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fig = useRef<ReturnType<typeof redesignHowWorkGetsDone> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    fig.current = redesignHowWorkGetsDone(ref.current, { intensity, theme, onRead });
    return () => fig.current?.destroy();
    // mount once; option changes go through update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fig.current?.update({ intensity, theme, onRead }); }, [intensity, theme, onRead]);

  return <div ref={ref} className={className} />;
}
