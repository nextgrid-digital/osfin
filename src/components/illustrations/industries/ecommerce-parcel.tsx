"use client"

import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 0, w: 300, h: 208 }
const BOX = { x: 96, y: 84, w: 120, h: 92, depth: 8 }
const LID = { x: 90, y: 28, w: 132, h: 36, r: 3 }

export default function EcommerceParcel({ className }: { className?: string }) {
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Parcel pulled apart, seen straight on: lifted lid, tape, box and a shipping tag">
        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={LID.x + 6} y={LID.y} width={LID.w} height={LID.h} rx={LID.r} />
        <rect className="ik-face" x={LID.x} y={LID.y} width={LID.w} height={LID.h} rx={LID.r} />
        <rect className="ex-orange" x={LID.x + LID.w / 2 - 7} y={LID.y} width={14} height={LID.h} />
        <path className="ik-detail" d={`M${LID.x + 16} ${LID.y + LID.h / 2}H${LID.x + LID.w / 2 - 12}M${LID.x + LID.w / 2 + 12} ${LID.y + LID.h / 2}H${LID.x + LID.w - 16}`} />

        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={BOX.x + BOX.depth} y={BOX.y} width={BOX.w} height={BOX.h} />
        <rect className="ik-face ik-top" x={BOX.x + 10} y={BOX.y + 8} width={BOX.w - 20} height={18} />
        <rect className="ik-face" x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} />
        <path className="ik-detail" d={`M${BOX.x} ${BOX.y + 22}H${BOX.x + BOX.w}`} />
        <rect className="ex-orange" x={BOX.x + BOX.w / 2 - 7} y={BOX.y} width={14} height={28} />
        <circle className="ik-face ex-green" cx={BOX.x + 28} cy={BOX.y + 58} r={10} />
        <path className="ik-line" d={`M${BOX.x + 23} ${BOX.y + 58}l3 3 7-7`} />

        <rect className="ik-face ex-blue-deep" x={232} y={118} width={34} height={44} rx={3} />
        <rect className="ik-face ex-blue" x={228} y={114} width={34} height={44} rx={3} />
        <path className="ik-detail" d="M236 128h18M236 136h18M236 144h12" />
      </Plate>
    </div>
  )
}
