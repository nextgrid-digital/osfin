"use client";

import { useEffect, useRef } from "react";
import { driverSeat } from "./driver-seat";

type Props = {
  intensity?: number;                       // 0 to 1, how far agents drift toward the policy fences
  theme?: "auto" | "light" | "dark";
  onRead?: (caption: string) => void;       // "auto · within policy · 12 logged", "you · gate open", "audit · record 3 of 16 · approved by you"
  className?: string;
};

export function DriverSeat({ intensity = 0.6, theme = "auto", onRead, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fig = useRef<ReturnType<typeof driverSeat> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    fig.current = driverSeat(ref.current, { intensity, theme, onRead });
    return () => fig.current?.destroy();
    // mount once; option changes go through update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fig.current?.update({ intensity, theme, onRead }); }, [intensity, theme, onRead]);

  return <div ref={ref} className={className} />;
}
