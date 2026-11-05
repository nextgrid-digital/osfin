"use client";

import { useEffect, useRef } from "react";
import { agentsGetBetter } from "./agents-get-better";

type Props = {
  intensity?: number;                       // 0 to 1, how wide the pointer teaches
  theme?: "auto" | "light" | "dark";
  onRead?: (caption: string) => void;       // "auto · 46% · asks the team", "auto · sharp · handles it", "teaching · 70%"
  className?: string;
};

export function AgentsGetBetter({ intensity = 0.6, theme = "auto", onRead, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fig = useRef<ReturnType<typeof agentsGetBetter> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    fig.current = agentsGetBetter(ref.current, { intensity, theme, onRead });
    return () => fig.current?.destroy();
    // mount once; option changes go through update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fig.current?.update({ intensity, theme, onRead }); }, [intensity, theme, onRead]);

  return <div ref={ref} className={className} />;
}
