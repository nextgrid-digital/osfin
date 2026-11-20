"use client"

import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 0, w: 300, h: 208 }
const CASE = { x: 112, y: 58, w: 96, h: 112, r: 12 }

export default function TravelCase({ className }: { className?: string }) {
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Suitcase pulled apart, seen straight on: grip, telescoping handle, case, latch and wheels">
        <rect className="ik-face" x={CASE.x + 30} y={14} width={36} height={12} rx={5} />
        <path className="ik-line" d={`M${CASE.x + 38} 26V46M${CASE.x + CASE.w - 38} 26V46`} />
        <path className="ik-line ik-thick" d={`M${CASE.x + 38} 52V${CASE.y}M${CASE.x + CASE.w - 38} 52V${CASE.y}`} />

        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={CASE.x + 8} y={CASE.y} width={CASE.w} height={CASE.h} rx={CASE.r} />
        <rect className="ik-face" x={CASE.x} y={CASE.y} width={CASE.w} height={CASE.h} rx={CASE.r} />
        <path className="ik-detail" d={`M${CASE.x + 8} ${CASE.y + 8}H${CASE.x + CASE.w - 8}V${CASE.y + CASE.h - 8}H${CASE.x + 8}Z`} />
        <rect className="ex-blue" x={CASE.x} y={CASE.y + 46} width={CASE.w} height={12} />
        <rect className="ik-face ex-green" x={CASE.x + CASE.w / 2 - 8} y={CASE.y + 8} width={16} height={10} rx={2} />
        <circle className="ik-well" cx={CASE.x + CASE.w / 2} cy={CASE.y + 13} r={1.6} />

        <circle className="ik-face" cx={CASE.x + 22} cy={CASE.y + CASE.h + 6} r={8} />
        <circle className="ik-well" cx={CASE.x + 22} cy={CASE.y + CASE.h + 6} r={3} />
        <circle className="ik-face" cx={CASE.x + CASE.w - 22} cy={CASE.y + CASE.h + 6} r={8} />
        <circle className="ik-well" cx={CASE.x + CASE.w - 22} cy={CASE.y + CASE.h + 6} r={3} />

        <rect className="ik-face ex-orange" x={CASE.x + CASE.w + 14} y={CASE.y + 28} width={26} height={34} rx={3} />
        <circle className="ik-well" cx={CASE.x + CASE.w + 27} cy={CASE.y + 36} r={2.2} />
        <path className="ik-detail" d={`M${CASE.x + CASE.w + 20} ${CASE.y + 46}h14M${CASE.x + CASE.w + 20} ${CASE.y + 52}h8`} />
      </Plate>
    </div>
  )
}
