"use client"

import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 0, w: 300, h: 208 }
const BODY = { x: 66, y: 56, w: 104, h: 132, r: 14, depth: 9 }
const CAP = { x: BODY.x + 6, y: 26, w: BODY.w - 12, h: 18, r: 8 }
const SCREEN = { x: BODY.x + 12, y: BODY.y + 12, w: BODY.w - 24, h: 36 }
const KEY = { w: 22, h: 11, cols: 3, rows: 4, gapX: 6, gapY: 5 }
const PAD = { x: BODY.x + (BODY.w - (KEY.cols * KEY.w + (KEY.cols - 1) * KEY.gapX)) / 2, y: SCREEN.y + SCREEN.h + 11 }
const KEYS = Array.from({ length: KEY.cols * KEY.rows }, (_, k) => ({
  x: PAD.x + (k % KEY.cols) * (KEY.w + KEY.gapX),
  y: PAD.y + Math.floor(k / KEY.cols) * (KEY.h + KEY.gapY),
}))
const SLOT = { x: BODY.x + BODY.w + 2, y: 118, w: 4, h: 50 }
const CARD = { x: 198, y: SLOT.y + 2, w: 74, h: 46, r: 4 }
const CANCEL_KEY = KEY.cols * (KEY.rows - 1)
const ENTER_KEY = KEY.cols * KEY.rows - 1
const keyTone = (k: number) => (k === CANCEL_KEY ? "ik-face ex-orange" : k === ENTER_KEY ? "ik-face ex-green" : "ik-face ik-top")
const SCREW_X = [BODY.x + 22, BODY.x + BODY.w - 22]
const SCREW = { head: 9, shaft: 12 }

function Screw({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  const dir = flip ? -1 : 1
  const shaftEnd = y + dir * SCREW.shaft
  return (
    <g>
      <path className="ik-line" d={`M${x} ${y}V${shaftEnd}`} />
      {Array.from({ length: 3 }, (_, k) => (
        <path key={k} className="ik-detail" d={`M${x - 2} ${y + dir * (4 + k * 3)}l4 ${dir * -1.5}`} />
      ))}
      <rect className="ik-face" x={x - SCREW.head / 2} y={flip ? y : y - 3} width={SCREW.head} height={3} rx={1} />
    </g>
  )
}

export default function PaymentTerminal({ className }: { className?: string }) {
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Card payment terminal, seen straight on and pulled apart: top cap, screws, keypad, screen and a card beside its slot">
        {SCREW_X.map((x) => (
          <Screw key={`t${x}`} x={x} y={8} />
        ))}

        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={CAP.x + 6} y={CAP.y} width={CAP.w} height={CAP.h} rx={CAP.r} />
        <rect className="ik-face" x={CAP.x} y={CAP.y} width={CAP.w} height={CAP.h} rx={CAP.r} />
        <path className="ik-detail" d={`M${CAP.x + 14} ${CAP.y + CAP.h / 2}H${CAP.x + CAP.w - 14}`} />
        {SCREW_X.map((x) => (
          <circle key={`h${x}`} className="ik-well" cx={x} cy={CAP.y + CAP.h / 2} r={2.2} />
        ))}

        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={BODY.x + BODY.depth} y={BODY.y} width={BODY.w} height={BODY.h} rx={BODY.r} />
        <rect className="ik-well" x={SLOT.x} y={SLOT.y} width={SLOT.w} height={SLOT.h} rx={1.5} />
        <rect className="ik-face" x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} rx={BODY.r} />
        <rect className="ik-detail" style={{ fill: "none" }} x={BODY.x + 5} y={BODY.y + 5} width={BODY.w - 10} height={BODY.h - 10} rx={BODY.r - 4} />
        <rect className="ik-screen" x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx={4} />
        <path className="ik-detail" d={`M${SCREEN.x + 8} ${SCREEN.y + 12}h28M${SCREEN.x + 8} ${SCREEN.y + 20}h44M${SCREEN.x + 8} ${SCREEN.y + 28}h18`} />
        {KEYS.map(({ x, y }, k) => (
          <rect key={`${x}-${y}`} className={keyTone(k)} x={x} y={y} width={KEY.w} height={KEY.h} rx={3} />
        ))}

        {SCREW_X.map((x) => (
          <Screw key={`b${x}`} x={x} y={VIEW.h - 6} flip />
        ))}

        <rect className="ik-face ex-blue-deep" x={CARD.x + 3} y={CARD.y} width={CARD.w} height={CARD.h} rx={CARD.r} />
        <rect className="ik-face ex-blue" x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx={CARD.r} />
        <rect className="ik-face ik-top" x={CARD.x + 9} y={CARD.y + 12} width={13} height={10} rx={2} />
        <path className="ik-detail" d={`M${CARD.x + 15.5} ${CARD.y + 12}v10M${CARD.x + 9} ${CARD.y + 17}h13`} />
        <path className="ik-detail" d={`M${CARD.x + 9} ${CARD.y + 33}h34M${CARD.x + 9} ${CARD.y + 38}h22`} />
      </Plate>
    </div>
  )
}
