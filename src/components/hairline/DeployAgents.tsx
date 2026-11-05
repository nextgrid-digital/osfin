"use client";

import { useEffect, useRef } from "react";
import { deployAgents } from "./deploy-agents";

type Props = {
  intensity?: number;                       // 0 to 1, how high crates lift under the pointer
  theme?: "auto" | "light" | "dark";
  onRead?: (caption: string) => void;       // "auto · running · 12 done", "judgment · team"
  className?: string;
};

export function DeployAgents({ intensity = 0.6, theme = "auto", onRead, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fig = useRef<ReturnType<typeof deployAgents> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    fig.current = deployAgents(ref.current, { intensity, theme, onRead });
    return () => fig.current?.destroy();
    // mount once; option changes go through update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fig.current?.update({ intensity, theme, onRead }); }, [intensity, theme, onRead]);

  return <div ref={ref} className={className} />;
}
