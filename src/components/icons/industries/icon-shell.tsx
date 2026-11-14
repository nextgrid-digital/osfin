"use client"

import { type ReactNode, useState } from "react"

export type IconTone = "blue" | "orange" | "emerald" | "violet" | "pink" | "amber" | "cyan" | "indigo"

export function IconShell({ tone, motion, className, children }: { tone: IconTone; motion: string; className?: string; children: ReactNode }) {
  const [on, setOn] = useState(false)
  return (
    <div
      className={["osfin-icon", `ic-${tone}`, `ix-${motion}`, className].filter(Boolean).join(" ")}
      data-on={on ? "" : undefined}
      onPointerEnter={(event) => event.pointerType === "mouse" && setOn(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setOn(false)}
      onClick={(event) => event.nativeEvent instanceof PointerEvent && event.nativeEvent.pointerType !== "mouse" && setOn((value) => !value)}
    >
      {children}
    </div>
  )
}

const ISO = Math.sqrt(3) / 2

export function groundShadow(x: number, y: number, w: number, d: number, pad = 6) {
  const corners = [
    [x - pad, y - pad],
    [x + w + pad, y - pad],
    [x + w + pad, y + d + pad],
    [x - pad, y + d + pad],
  ]
  return `M${corners.map(([cx = 0, cy = 0]) => `${((cx - cy) * ISO).toFixed(2)} ${((cx + cy) / 2 + pad * 0.6).toFixed(2)}`).join("L")}Z`
}
