"use client"

import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 0, w: 300, h: 208 }
const APEX = { x: 146, y: 58 }

export default function InsuranceUmbrella({ className }: { className?: string }) {
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Umbrella pulled apart, seen straight on: canopy, tip, shaft, runner and handle">
        <path className="ik-face" style={{ fill: "var(--ik-side)" }} d="M78 124C104 46 188 46 222 124C190 90 110 90 78 124Z" />
        <path className="ik-face" d="M70 120C98 36 194 36 230 120C198 84 102 84 70 120Z" />
        <path className="ik-detail" d={`M${APEX.x} ${APEX.y}L86 114M${APEX.x} ${APEX.y}L116 108M${APEX.x} ${APEX.y}L176 108M${APEX.x} ${APEX.y}L214 114`} />
        <circle className="ik-face ex-orange" cx={APEX.x} cy={34} r={6} />
        <path className="ik-line" d={`M${APEX.x} 40V52`} />

        <path className="ik-line ik-thick" d={`M${APEX.x} 132V168`} />
        <rect className="ik-face ex-green" x={APEX.x - 8} y={142} width={16} height={8} rx={2} />
        <path className="ik-line ik-thick" d={`M${APEX.x} 168C${APEX.x} 192 112 194 112 172`} />
        <circle className="ik-face" cx={112} cy={172} r={5} />

        <rect className="ik-face ex-blue-deep" x={196} y={142} width={28} height={36} rx={3} />
        <rect className="ik-face ex-blue" x={192} y={138} width={28} height={36} rx={3} />
        <circle className="ik-well" cx={206} cy={148} r={2.2} />
        <path className="ik-detail" d="M200 160h16M200 166h10" />
      </Plate>
    </div>
  )
}
