"use client"

import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 0, w: 300, h: 208 }
const BODY = { x: 88, y: 62, w: 84, h: 128, r: 16, depth: 8 }
const GLASS = { x: 98, y: 16, w: 64, h: 36, r: 6 }
const CHIP = { x: 198, y: 86, w: 64, h: 50, r: 5 }

export default function FintechHandset({ className }: { className?: string }) {
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Phone pulled apart, seen straight on: lifted screen with a chart, handset body, and a chip beside it">
        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={BODY.x + BODY.depth} y={BODY.y} width={BODY.w} height={BODY.h} rx={BODY.r} />
        <rect className="ik-face" x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} rx={BODY.r} />
        <rect className="ik-well" x={BODY.x + 12} y={BODY.y + 16} width={BODY.w - 24} height={40} rx={4} />
        <path className="ik-detail" d={`M${BODY.x + 30} ${BODY.y + 8}h24`} />
        <circle className="ik-face ex-green" cx={BODY.x + BODY.w - 16} cy={BODY.y + 22} r={3.2} />
        <circle className="ik-line" cx={BODY.x + BODY.w / 2} cy={BODY.y + BODY.h - 18} r={8} />
        <circle className="ik-detail" cx={BODY.x + BODY.w / 2} cy={BODY.y + BODY.h - 18} r={3} />

        <rect className="ik-screen" x={GLASS.x + 5} y={GLASS.y} width={GLASS.w} height={GLASS.h} rx={GLASS.r} />
        <rect className="ik-screen" x={GLASS.x} y={GLASS.y} width={GLASS.w} height={GLASS.h} rx={GLASS.r} />
        <path className="ik-detail" d={`M${GLASS.x + 8} ${GLASS.y + 26}h${GLASS.w - 16}`} />
        <path className="ik-line ik-thick" d={`M${GLASS.x + 10} ${GLASS.y + 24}l12-10 10 6 16-12`} />
        <circle className="ex-orange" cx={GLASS.x + GLASS.w - 8} cy={GLASS.y + 8} r={2.4} />

        <rect className="ik-face ex-blue-deep" x={CHIP.x + 4} y={CHIP.y} width={CHIP.w} height={CHIP.h} rx={CHIP.r} />
        <rect className="ik-face ex-blue" x={CHIP.x} y={CHIP.y} width={CHIP.w} height={CHIP.h} rx={CHIP.r} />
        {[0, 1, 2].map((row) =>
          [0, 1].map((col) => (
            <rect key={`${row}-${col}`} className="ik-face ik-top" x={CHIP.x + 12 + col * 22} y={CHIP.y + 10 + row * 12} width={14} height={7} rx={1.5} />
          )),
        )}
      </Plate>
    </div>
  )
}
