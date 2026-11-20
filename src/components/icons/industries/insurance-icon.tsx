"use client"

import type React from "react"
import { Box, front, Plate, project } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

const BASE = { x: 0, y: 0, z: 0, w: 96, d: 56, h: 6 }
const PLINTH = { x: 12, y: 10, z: BASE.h, w: 72, d: 22, h: 4 }
const SHIELD = { x: 18, y: 14, z: PLINTH.z + PLINTH.h, w: 60, d: 12, h: 72 }
const OUTLINE = "M0 7L30 0L60 7V34C60 54 46 66 30 72C14 66 0 54 0 34Z"
const INNER = "M7 12L30 7L53 12V34C53 50 42 60 30 65C18 60 7 50 7 34Z"
const CHECK = "M18 36L27 45L43 27"
type Pt = [number, number]
const cubic = (a: Pt, b: Pt, c: Pt, d: Pt, steps: number): Pt[] =>
  Array.from({ length: steps + 1 }, (_, k) => {
    const t = k / steps
    const s = 1 - t
    return [
      s * s * s * a[0] + 3 * s * s * t * b[0] + 3 * s * t * t * c[0] + t * t * t * d[0],
      s * s * s * a[1] + 3 * s * s * t * b[1] + 3 * s * t * t * c[1] + t * t * t * d[1],
    ]
  })
const LOCAL: Pt[] = [[0, 7], [30, 0], [60, 7], [60, 34], ...cubic([60, 34], [60, 54], [46, 66], [30, 72], 16), ...cubic([30, 72], [14, 66], [0, 54], [0, 34], 16)]
const TOP_Z = SHIELD.z + SHIELD.h
const projected = [SHIELD.y, SHIELD.y + SHIELD.d].flatMap((y) => LOCAL.map(([u, v]) => project(SHIELD.x + u, y, TOP_Z - v)))
const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
const hull = (points: Pt[]) => {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const chain = (list: Pt[]) => {
    const out: Pt[] = []
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2] as Pt, out[out.length - 1] as Pt, p) <= 0) out.pop()
      out.push(p)
    }
    out.pop()
    return out
  }
  return [...chain(sorted), ...chain([...sorted].reverse())]
}
const BODY = `M${hull(projected).map((p) => p.map((n) => n.toFixed(2)).join(" ")).join("L")}Z`
const STUDS = [[8, 12], [30, 6], [52, 12], [8, 30], [52, 30]] as const
const POLICY = { x: 6, y: 36, z: BASE.h, w: 34, d: 16, h: 2 }
const SEAL = { x: 70, y: 38, z: BASE.h, w: 14, d: 14, h: 4 }
const FIT = [BASE, SHIELD, PLINTH]

export default function InsuranceIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="violet" motion="shield" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.08} label="Insurance shield">
        <path className="ix-shadow" d={groundShadow(BASE.x, BASE.y, BASE.w, BASE.d)} />
        <Box {...BASE} r={8} top={<rect className="ik-detail" x={6} y={6} width={BASE.w - 12} height={BASE.d - 12} rx={4} />} />
        <Box {...PLINTH} r={4} front={<path className="ik-detail" d={`M6 ${PLINTH.h / 2}h${PLINTH.w - 12}`} />} />
        <g className="ik-accent-all ix-part ix-lift ix-lift-lg">
        <path className="ik-face" style={{ fill: "var(--ik-side)" }} d={BODY} />
        <g transform={front(SHIELD.x, SHIELD.y + SHIELD.d, TOP_Z)}>
          <path className="ik-face" d={OUTLINE} />
          <path className="ik-detail" d={INNER} />
          <path className="ik-line ik-thick" d={CHECK} />
          <path className="ix-draw" pathLength={1} style={{ fill: "none", stroke: "var(--ik-line)", strokeWidth: 3.2, strokeLinecap: "round", strokeLinejoin: "round" }} d={CHECK} />
          {STUDS.map(([u, v]) => (
            <circle key={`${u}-${v}`} className="ik-face ik-top" cx={u} cy={v + 1} r={1.6} />
          ))}
        </g>
        </g>
        <g className="ix-part ix-lift ix-lift-sm">
        <Box
          {...POLICY}
          r={1.5}
          top={
            <>
              <path className="ik-detail" d={`M5 4h18M5 7.5h24M5 11h14`} />
              <path className="ik-detail" d={`M${POLICY.w - 9} ${POLICY.d - 3}l3 -3l3 2`} />
            </>
          }
        />
        </g>
        <g className="ix-part ix-hop" style={{ "--d": "260ms" } as React.CSSProperties}>
          <Box {...SEAL} className="ik-accent" r={7} top={<circle className="ik-detail" cx={7} cy={7} r={4} />} />
        </g>
      </Plate>
    </IconShell>
  )
}
