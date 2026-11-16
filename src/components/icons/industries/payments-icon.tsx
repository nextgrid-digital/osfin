"use client"

import type React from "react"
import { Box, Plate } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

const BASE = { x: 0, y: 0, z: 0, w: 76, d: 112, h: 12 }
const RISER = { x: 0, y: 0, z: BASE.h, w: 76, d: 42, h: 24 }
const SLOT = { x: 10, y: 15, z: RISER.z + RISER.h, w: 56, d: 8, h: 2 }
const CARD = { x: 13, y: 17.5, z: SLOT.z, w: 50, d: 3, h: 40 }
const KEY = { w: 17, d: 11, h: 4, gap: 5.5 }
const KEY_ROWS = 4
const KEY_COLS = 3
const KEYPAD = { x: (BASE.w - (KEY_COLS * KEY.w + (KEY_COLS - 1) * KEY.gap)) / 2, y: RISER.d + 8 }
const KEYS = Array.from({ length: KEY_ROWS * KEY_COLS }, (_, k) => ({
  x: KEYPAD.x + (k % KEY_COLS) * (KEY.w + KEY.gap),
  y: KEYPAD.y + Math.floor(k / KEY_COLS) * (KEY.d + KEY.gap * 0.6),
}))
const SCREEN = { x: 9, y: 4, w: BASE.w - 18, h: RISER.h - 9 }
const RECEIPT = { x: 20, y: 5, z: RISER.z + RISER.h, w: 36, d: 1.5, h: 30 }
const PRINTER = { x: 16, y: 3, z: RISER.z + RISER.h, w: 44, d: 6, h: 2 }
const LEDS = [10, 16, 22]
const FIT = [BASE, RISER, CARD, RECEIPT]

export default function PaymentsIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="orange" motion="pay" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.08} label="Card payment terminal">
        <path className="ix-shadow" d={groundShadow(BASE.x, BASE.y, BASE.w, BASE.d)} />
        <Box
          {...BASE}
          r={8}
          front={LEDS.map((u) => <circle key={u} className="ik-fill" cx={u} cy={BASE.h / 2} r={1.2} />)}
          side={<path className="ik-detail" d={`M60 ${BASE.h / 2}h${BASE.d - 70}`} />}
        />
        <Box
          {...RISER}
          r={8}
          front={
            <>
              <rect className="ik-screen ix-glow" x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx={3} />
              <path className="ix-draw" pathLength={1} style={{ fill: "none", stroke: "#5D524B", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" }} d={`M${SCREEN.w / 2 + 3} ${SCREEN.y + 8}l4 4l8 -8`} />
              <path className="ik-detail" d={`M${SCREEN.x + 5} ${SCREEN.y + 5}h18M${SCREEN.x + 5} ${SCREEN.y + 9}h12`} />
              <path className="ik-line" d={`M${SCREEN.x + SCREEN.w - 14} ${SCREEN.y + 4}a4 4 0 0 1 0 7M${SCREEN.x + SCREEN.w - 10} ${SCREEN.y + 2.5}a6 6 0 0 1 0 10`} />
            </>
          }
          side={
            <>
              <path className="ik-detail" d={`M8 ${RISER.h / 2}h${RISER.d - 16}`} />
              <rect className="ik-well" x={RISER.d - 14} y={RISER.h - 9} width={7} height={4} rx={1} />
            </>
          }
        />
        <Box {...PRINTER} r={1} />
        <g className="ix-part ix-lift ix-lift-lg">
        <Box
          {...RECEIPT}
          r={0.5}
          front={
            <>
              <path className="ik-detail" d={`M5 6h20M5 10h14M5 14h22M5 18h10`} />
              <path className="ik-detail" d={`M0 ${RECEIPT.h - 2}l3 2l3 -2l3 2l3 -2l3 2l3 -2l3 2l3 -2l3 2l3 -2l3 2l3 -2`} />
            </>
          }
        />
        </g>
        <Box {...SLOT} r={1.5} />
        <g className="ix-part ix-lift">
        <Box
          {...CARD}
          className="ik-accent-all"
          r={1}
          front={
            <>
              <rect className="ik-detail" x={6} y={CARD.h - 16} width={11} height={8} rx={1.5} />
              <path className="ik-detail" d={`M22 ${CARD.h - 14}h20M22 ${CARD.h - 10}h14`} />
            </>
          }
        />
        </g>
        {KEYS.map(({ x, y }, k) => (
          <g key={`${x}-${y}`} className="ix-part ix-press" style={{ "--d": `${[4, 0, 8, 11][k % 4] * 45}ms` } as React.CSSProperties}>
            <Box x={x} y={y} z={BASE.h} w={KEY.w} d={KEY.d} h={KEY.h} r={2.5} />
          </g>
        ))}
      </Plate>
    </IconShell>
  )
}
