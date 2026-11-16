"use client"

import type React from "react"
import { Box, front, Plate, project, type Vec3 } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

type Pt = [number, number]
type Coin = { cx: number; cz: number; r: number; back: number; face: number }

const BASE = { x: 0, y: 0, z: 0, w: 100, d: 80, h: 6 }
const PLINTH = { x: 8, y: 8, z: BASE.h, w: 84, d: 62, h: 3 }
const FLOOR = PLINTH.z + PLINTH.h
const BTC: Coin = { cx: 40, cz: FLOOR + 4 + 30, r: 30, back: 18, face: 28 }
const ETH: Coin = { cx: 76, cz: FLOOR + 3 + 18, r: 18, back: 40, face: 47 }
const BTC_CRADLE = { x: 22, y: 14, z: FLOOR, w: 36, d: 18, h: 7 }
const ETH_CRADLE = { x: 64, y: 37, z: FLOOR, w: 24, d: 13, h: 5 }
const STACK_COIN = { w: 20, h: 4 }
const STACK = Array.from({ length: 4 }, (_, k) => ({ x: 10, y: 46, z: FLOOR + k * STACK_COIN.h, w: STACK_COIN.w, d: STACK_COIN.w, h: STACK_COIN.h }))
const BITCOIN_B =
  "M-7 -12H3.5C10 -12 10 -1.5 3.5 -1.5H-7M-7 -1.5H5C12 -1.5 12 12 5 12H-7M-5 -12V12M-3 -16.5V-12M2.5 -16.5V-12M-3 12V16.5M2.5 12V16.5"
const ETH_TOP = "M0 -13L8.5 1L0 6L-8.5 1Z"
const ETH_BOTTOM = "M0 8.5L8.5 3.2L0 14L-8.5 3.2Z"
const MARK = { fill: "none", stroke: "#5D524B", strokeWidth: 3.4, strokeLinecap: "round", strokeLinejoin: "round" } as const

const ring = (r: number, steps = 48): Pt[] => Array.from({ length: steps }, (_, k) => [Math.cos((k / steps) * Math.PI * 2) * r, Math.sin((k / steps) * Math.PI * 2) * r])
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
const toD = (points: Pt[]) => `M${points.map((p) => p.map((n) => n.toFixed(2)).join(" ")).join("L")}Z`
const bodyOf = (coin: Coin) => toD(hull([coin.back, coin.face].flatMap((y) => ring(coin.r).map(([u, v]) => project(coin.cx + u, y, coin.cz + v)))))
const ridges = (r: number, count: number) => Array.from({ length: count }, (_, k) => (k * Math.PI * 2) / count)
const BTC_RIDGES = ridges(BTC.r, 36)
const ETH_RIDGES = ridges(ETH.r, 24)
const FIT: (Vec3 | typeof BASE)[] = [BASE, [BTC.cx, BTC.face, BTC.cz + BTC.r], [BTC.cx - BTC.r, BTC.face, BTC.cz], [ETH.cx + ETH.r, ETH.back, ETH.cz], ...STACK]

function UprightCoin({ coin, ticks, children }: { coin: Coin; ticks: number[]; children: React.ReactNode }) {
  return (
    <>
      <path className="ik-face" style={{ fill: "var(--ik-side)" }} d={bodyOf(coin)} />
      <g transform={front(coin.cx, coin.face, coin.cz)}>
        <circle className="ik-face" r={coin.r} />
        {ticks.map((a) => (
          <path key={a} className="ik-detail" d={`M${(Math.cos(a) * (coin.r - 1.5)).toFixed(2)} ${(Math.sin(a) * (coin.r - 1.5)).toFixed(2)}L${(Math.cos(a) * (coin.r - 4)).toFixed(2)} ${(Math.sin(a) * (coin.r - 4)).toFixed(2)}`} />
        ))}
        <circle className="ik-line" r={coin.r - 5} />
        {children}
      </g>
    </>
  )
}

export default function CryptoIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="cyan" motion="coin" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.08} label="Bitcoin and Ethereum coins on a stand">
        <path className="ix-shadow" d={groundShadow(BASE.x, BASE.y, BASE.w, BASE.d)} />
        <Box {...BASE} r={8} />
        <Box {...PLINTH} r={6} top={<rect className="ik-detail" x={5} y={5} width={PLINTH.w - 10} height={PLINTH.d - 10} rx={3} />} />
        <Box {...BTC_CRADLE} r={3} front={<path className="ik-detail" d={`M4 ${BTC_CRADLE.h / 2}h${BTC_CRADLE.w - 8}`} />} />
        <g className="ik-accent-all ix-part ix-lift ix-lift-sm">
          <g className="ix-part ix-spin">
            <UprightCoin coin={BTC} ticks={BTC_RIDGES}>
              <g transform="rotate(12)">
                <path style={MARK} d={BITCOIN_B} />
              </g>
            </UprightCoin>
          </g>
        </g>
        <Box {...ETH_CRADLE} r={2.5} />
        <g className="ix-part ix-hop" style={{ "--d": "240ms" } as React.CSSProperties}>
          <UprightCoin coin={ETH} ticks={ETH_RIDGES}>
            <path className="ik-face" style={{ fill: "var(--ik-line)" }} d={ETH_TOP} />
            <path className="ik-detail" style={{ stroke: "var(--ik-top)" }} d="M0 -13V6M-8.5 1L0 -2L8.5 1" />
            <path className="ik-face" style={{ fill: "var(--ik-line)" }} d={ETH_BOTTOM} />
          </UprightCoin>
        </g>
        {STACK.map((coin, k) => (
          <g key={coin.z} className={k === STACK.length - 1 ? "ix-part ix-hop" : undefined} style={{ "--d": "380ms" } as React.CSSProperties}>
            <Box
              {...coin}
              className={k === STACK.length - 1 ? "ik-accent" : undefined}
              r={STACK_COIN.w / 2}
              top={
                k === STACK.length - 1 ? (
                  <>
                    <circle className="ik-detail" cx={STACK_COIN.w / 2} cy={STACK_COIN.w / 2} r={STACK_COIN.w / 2 - 3} />
                    <g transform={`translate(${STACK_COIN.w / 2} ${STACK_COIN.w / 2}) scale(0.3) rotate(12)`}>
                      <path style={{ ...MARK, strokeWidth: 5 }} d={BITCOIN_B} />
                    </g>
                  </>
                ) : undefined
              }
            />
          </g>
        ))}
      </Plate>
    </IconShell>
  )
}
