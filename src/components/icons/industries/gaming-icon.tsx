"use client"

import type React from "react"
import { Box, Plate, path, top } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

const HEIGHT = 13
const WALL_STEP = 0.5
const OUTLINE =
  "M18 0H78A18 18 0 0 1 96 18V50A17 17 0 0 1 62 50Q48 40 34 50A17 17 0 0 1 0 50V18A18 18 0 0 1 18 0Z"
const EXTENT = { x: 0, y: 0, z: 0, w: 96, d: 67, h: HEIGHT }
const SILHOUETTE_EDGES = [
  [17 - 17 * Math.SQRT1_2, 50 + 17 * Math.SQRT1_2],
  [78 + 18 * Math.SQRT1_2, 18 - 18 * Math.SQRT1_2],
] as const
const WALLS = Array.from({ length: Math.round(HEIGHT / WALL_STEP) - 1 }, (_, k) => (k + 1) * WALL_STEP)
const PAD = { cx: 22, cy: 25, arm: 7, thick: 6 }
const DPAD = [
  { x: PAD.cx - PAD.arm - PAD.thick / 2, y: PAD.cy - PAD.thick / 2, z: HEIGHT, w: PAD.arm, d: PAD.thick, h: 3 },
  { x: PAD.cx - PAD.thick / 2, y: PAD.cy - PAD.arm - PAD.thick / 2, z: HEIGHT, w: PAD.thick, d: PAD.arm * 2 + PAD.thick, h: 3 },
  { x: PAD.cx + PAD.thick / 2, y: PAD.cy - PAD.thick / 2, z: HEIGHT, w: PAD.arm, d: PAD.thick, h: 3 },
]
const BTN = 7.5
const BTN_CENTER = { x: 74, y: 25, spread: 8 }
const BUTTONS = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
].map(([dx = 0, dy = 0]) => ({ x: BTN_CENTER.x + dx * BTN_CENTER.spread - BTN / 2, y: BTN_CENTER.y + dy * BTN_CENTER.spread - BTN / 2, z: HEIGHT, w: BTN, d: BTN, h: 2.5 }))
const STICKS = [
  { x: 31, y: 33, z: HEIGHT, w: 11, d: 11, h: 4 },
  { x: 54, y: 33, z: HEIGHT, w: 11, d: 11, h: 4 },
]
const SHOULDERS = [
  { x: 12, y: -4, z: 5, w: 22, d: 7, h: 8 },
  { x: 62, y: -4, z: 5, w: 22, d: 7, h: 8 },
]
const MIDDLE = [
  { x: 42, y: 16, z: HEIGHT, w: 5, d: 3, h: 1.5 },
  { x: 50, y: 16, z: HEIGHT, w: 5, d: 3, h: 1.5 },
]
const GRILLE = Array.from({ length: 5 }, (_, k) => 40 + k * 4)
const PARTS = [...DPAD, ...[...BUTTONS, ...STICKS, ...MIDDLE].sort((a, b) => a.x + a.y - (b.x + b.y))]
const FIT = [EXTENT, ...SHOULDERS]
const PRESS_ORDER = new Map([...DPAD.map((p, k) => [p, 120 + k * 40] as const), ...BUTTONS.map((p, k) => [p, 260 + k * 70] as const)])

export default function GamingIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="indigo" motion="pad" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.08} label="Game controller">
        <path className="ix-shadow" d={groundShadow(-2, -6, 100, 74)} />
        <g className="ix-part ix-lift">
        {SHOULDERS.map((b, k) => (
          <g key={b.x} className="ix-part ix-press" style={{ "--d": `${500 + k * 120}ms` } as React.CSSProperties}>
            <Box {...b} className="ik-accent" r={3} />
          </g>
        ))}
        <g transform={top(0, 0, 0)}>
          <path className="ik-face" style={{ fill: "var(--ik-front)" }} d={OUTLINE} />
        </g>
        {WALLS.map((z) => (
          <g key={z} transform={top(0, 0, z)}>
            <path style={{ fill: "var(--ik-front)", stroke: "none" }} d={OUTLINE} />
          </g>
        ))}
        {SILHOUETTE_EDGES.map(([x, y]) => (
          <path key={x} className="ik-line" d={path([[x, y, 0], [x, y, HEIGHT]])} />
        ))}
        <g transform={top(0, 0, HEIGHT)}>
          <path className="ik-face ik-top" d={OUTLINE} />
          {GRILLE.map((u) => (
            <circle key={u} className="ik-fill" cx={u} cy={27} r={0.9} />
          ))}
          <circle className="ik-well" cx={PAD.cx} cy={PAD.cy} r={13} />
          <circle className="ik-well" cx={BTN_CENTER.x} cy={BTN_CENTER.y} r={13} />
        </g>
        {PARTS.map((part) => (
          <g key={`${part.x}-${part.y}-${part.w}`} className="ix-part ix-press" style={{ "--d": `${PRESS_ORDER.get(part) ?? 0}ms` } as React.CSSProperties}>
            <Box {...part} className={BUTTONS.includes(part) || DPAD.includes(part) ? "ik-accent" : undefined} r={part.w === part.d ? part.w / 2 : 1.5} />
          </g>
        ))}
        </g>
      </Plate>
    </IconShell>
  )
}
