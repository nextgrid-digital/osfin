"use client";

import {
  Airplane,
  Bitcoin,
  BuildingThree,
  GameHandle,
  Shop,
  Trend,
  Umbrella,
  Wallet,
} from "@icon-park/react";
import type { Icon } from "@icon-park/react/es/runtime";
import type { Industry } from "../content/industries";

const marks: Record<Industry["id"], { Icon: Icon; fill: string[] }> = {
  banks: { Icon: BuildingThree, fill: ["#1E3A5F", "#F6C453", "#1E3A5F", "#FFF4CC"] },
  payments: { Icon: Wallet, fill: ["#C2410C", "#FDBA74", "#9A3412", "#FFF7ED"] },
  fintech: { Icon: Trend, fill: ["#0F766E", "#5EEAD4", "#115E59", "#CCFBF1"] },
  insurance: { Icon: Umbrella, fill: ["#1D4ED8", "#93C5FD", "#1E3A8A", "#DBEAFE"] },
  ecommerce: { Icon: Shop, fill: ["#BE185D", "#F9A8D4", "#9D174D", "#FCE7F3"] },
  travel: { Icon: Airplane, fill: ["#0369A1", "#7DD3FC", "#0C4A6E", "#E0F2FE"] },
  crypto: { Icon: Bitcoin, fill: ["#B45309", "#FCD34D", "#6D28D9", "#FEF3C7"] },
  gaming: { Icon: GameHandle, fill: ["#6D28D9", "#C4B5FD", "#DB2777", "#FDE68A"] },
};

export default function IndustryMark({ id }: { id: Industry["id"] }) {
  const { Icon, fill } = marks[id];

  return (
    <Icon
      theme="multi-color"
      size={92}
      fill={fill}
      strokeWidth={3}
      aria-hidden
    />
  );
}
