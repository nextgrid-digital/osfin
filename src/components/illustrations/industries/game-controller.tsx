"use client"

import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 0, w: 300, h: 208 }
const PAD = { x: 62, y: 86, w: 156, h: 70, r: 28 }
const BUMPER = { x: 78, y: 42, w: 48, h: 16, r: 6 }

export default function GameController({ className }: { className?: string }) {
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Game controller pulled apart, seen straight on: bumper, pad, buttons and a cartridge">
        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={BUMPER.x + 4} y={BUMPER.y} width={BUMPER.w} height={BUMPER.h} rx={BUMPER.r} />
        <rect className="ik-face" x={BUMPER.x} y={BUMPER.y} width={BUMPER.w} height={BUMPER.h} rx={BUMPER.r} />
        <rect className="ik-face" x={PAD.x + 78} y={BUMPER.y} width={BUMPER.w} height={BUMPER.h} rx={BUMPER.r} />

        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={PAD.x + 8} y={PAD.y} width={PAD.w} height={PAD.h} rx={PAD.r} />
        <rect className="ik-face" x={PAD.x} y={PAD.y} width={PAD.w} height={PAD.h} rx={PAD.r} />
        <rect className="ik-face ik-top" x={PAD.x + 22} y={PAD.y + 22} width={28} height={10} rx={2} />
        <rect className="ik-face ik-top" x={PAD.x + 31} y={PAD.y + 13} width={10} height={28} rx={2} />

        <circle className="ik-face ex-orange" cx={PAD.x + 108} cy={PAD.y + 24} r={8} />
        <circle className="ik-face ex-green" cx={PAD.x + 126} cy={PAD.y + 42} r={8} />
        <rect className="ik-well" x={PAD.x + PAD.w / 2 - 8} y={PAD.y + 30} width={16} height={6} rx={2} />

        <rect className="ik-face ex-blue-deep" x={236} y={100} width={32} height={48} rx={3} />
        <rect className="ik-face ex-blue" x={232} y={96} width={32} height={48} rx={3} />
        <path className="ik-detail" d="M240 108h16M240 120h16" />
        <rect className="ik-well" x={244} y={130} width={12} height={8} rx={1} />
      </Plate>
    </div>
  )
}
