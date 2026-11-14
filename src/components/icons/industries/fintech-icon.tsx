"use client"

import type React from "react"
import { Box, Plate } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

const PHONE = { x: 0, y: 0, z: 0, w: 46, d: 7, h: 88 }
const SCREEN = { x: 4, y: 5, w: PHONE.w - 8, h: PHONE.h - 10 }
const BARS = [
  { x: 9, h: 14 },
  { x: 17, h: 22 },
  { x: 25, h: 18 },
  { x: 33, h: 30 },
]
const BAR_W = 5
const BAR_FLOOR = SCREEN.y + SCREEN.h - 10
const TREND = "M10 44L19 36L27 40L37 26"
const COIN = { w: 28, h: 5 }
const COINS = [0, 1, 2, 3].map((k) => ({ x: 56, y: -26, z: k * COIN.h, w: COIN.w, d: COIN.w, h: COIN.h }))
const SMALL_STACK = [0, 1].map((k) => ({ x: 64, y: 12, z: k * COIN.h, w: 22, d: 22, h: COIN.h }))
const CARD = { x: 2, y: 18, z: 0, w: 50, d: 32, h: 2.5 }
const TILES = [0, 1, 2].map((k) => 9 + k * 10)
const FIT = [PHONE, ...COINS, CARD, ...SMALL_STACK]

export default function FintechIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="emerald" motion="fin" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.08} label="Banking app on a phone">
        <path className="ix-shadow" d={groundShadow(-4, -28, 92, 82)} />
        <Box
          {...PHONE}
          r={3}
          front={
            <>
              <rect className="ik-screen" x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx={4} />
              <path className="ik-detail" d={`M${PHONE.w / 2 - 6} ${SCREEN.y + 4}h12`} />
              {BARS.map((bar) => (
                <rect key={bar.x} className="ik-detail ix-grow" style={{ "--d": `${bar.x * 9}ms` } as React.CSSProperties} x={bar.x} y={BAR_FLOOR - bar.h} width={BAR_W} height={bar.h} rx={1} />
              ))}
              <path className="ik-line" d={TREND} />
              <path className="ix-draw" pathLength={1} style={{ fill: "none", stroke: "var(--ic-accent)", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" }} d={TREND} />
              <rect className="ik-detail" x={9} y={SCREEN.y + 10} width={20} height={4} rx={2} />
              {TILES.map((u) => (
                <rect key={u} className="ik-detail" x={u} y={SCREEN.y + SCREEN.h - 8} width={7} height={5} rx={1.5} />
              ))}
              <circle className="ik-detail" cx={PHONE.w / 2} cy={PHONE.h - 2.6} r={1.4} />
            </>
          }
        />
        <g className="ix-part ix-lift ix-lift-sm">
        <Box
          {...CARD}
          r={3}
          top={
            <>
              <rect className="ik-face ik-top" x={6} y={7} width={9} height={7} rx={1.5} />
              <path className="ik-detail" d={`M6 ${CARD.d - 9}h24M6 ${CARD.d - 5}h14`} />
              <circle className="ik-detail" cx={CARD.w - 10} cy={CARD.d - 8} r={3} />
              <circle className="ik-detail" cx={CARD.w - 6} cy={CARD.d - 8} r={3} />
            </>
          }
        />
        </g>
        {COINS.map((coin, k) => (
          <g key={k} className={k === COINS.length - 1 ? "ix-part ix-hop" : undefined}>
          <Box
            {...coin}
            className="ik-accent"
            r={COIN.w / 2}
            top={k === COINS.length - 1 ? <circle className="ik-detail" cx={COIN.w / 2} cy={COIN.w / 2} r={COIN.w / 2 - 5} /> : undefined}
          />
          </g>
        ))}
        {SMALL_STACK.map((coin, k) => (
          <g key={`s${k}`} className={k === SMALL_STACK.length - 1 ? "ix-part ix-hop" : undefined} style={{ "--d": "160ms" } as React.CSSProperties}>
          <Box
            {...coin}
            className="ik-accent"
            r={11}
            top={k === SMALL_STACK.length - 1 ? <circle className="ik-detail" cx={11} cy={11} r={7} /> : undefined}
          />
          </g>
        ))}
      </Plate>
    </IconShell>
  )
}
