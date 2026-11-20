"use client"

import { useId } from "react"
import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 26, w: 300, h: 208 }
const DOOR = { cx: 150, cy: 130, r: 86, depth: 14 }
const RIVETS = Array.from({ length: 18 }, (_, k) => (k * Math.PI * 2) / 18)
const WHEEL = { hub: 12, reach: 46, ring: 40, knob: 5 }
const SPOKES = Array.from({ length: 8 }, (_, k) => (k * Math.PI) / 4)
const HINGE = { x: 36, y: 50, w: 16, h: 160 }
const KNUCKLES = [72, 162].map((y) => ({ x: HINGE.x - 4, y, w: HINGE.w + 8, h: 26 }))
const STRAPS = KNUCKLES.map((k) => ({ x: HINGE.x + HINGE.w, y: k.y + 7, w: 54, h: 12 }))
const BOLT = { from: 200, to: 268, h: 14 }
const BOLTS = [96, 130, 164]
const WALL = { x: 276, y: 34, w: 30, h: 192 }
const HATCH = Array.from({ length: 26 }, (_, k) => WALL.y - WALL.w + k * 9)
const polar = (a: number, r: number, cx = 0, cy = 0) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const

export default function BankVault({ className }: { className?: string }) {
  const clip = useId()
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Bank vault door, seen straight on: hinge, door, wheel, locking bolts and the wall section">
        <defs>
          <clipPath id={clip}>
            <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} rx={2} />
          </clipPath>
        </defs>

        <rect className="ik-face" x={HINGE.x} y={HINGE.y} width={HINGE.w} height={HINGE.h} rx={HINGE.w / 2} />
        <path className="ik-detail" d={`M${HINGE.x + HINGE.w / 2} ${HINGE.y + 8}V${HINGE.y + HINGE.h - 8}`} />

        {BOLTS.map((y) => (
          <g key={y}>
            <rect className="ik-face" x={BOLT.from} y={y - BOLT.h / 2} width={BOLT.to - BOLT.from} height={BOLT.h} rx={BOLT.h / 2} />
            <path className="ik-detail" d={`M${BOLT.from + 10} ${y - 2}H${BOLT.to - 8}`} />
          </g>
        ))}

        <circle className="ik-face" style={{ fill: "var(--ik-side)" }} cx={DOOR.cx + DOOR.depth} cy={DOOR.cy} r={DOOR.r} />
        <rect style={{ fill: "var(--ik-side)" }} x={DOOR.cx} y={DOOR.cy - DOOR.r} width={DOOR.depth} height={DOOR.r * 2} />
        <path className="ik-line" d={`M${DOOR.cx} ${DOOR.cy - DOOR.r}h${DOOR.depth}M${DOOR.cx} ${DOOR.cy + DOOR.r}h${DOOR.depth}`} />
        <circle className="ik-face" cx={DOOR.cx} cy={DOOR.cy} r={DOOR.r} />
        <circle className="ik-detail" cx={DOOR.cx} cy={DOOR.cy} r={DOOR.r - 8} />
        <circle className="ik-line" cx={DOOR.cx} cy={DOOR.cy} r={DOOR.r - 24} />
        <circle className="ik-detail" cx={DOOR.cx} cy={DOOR.cy} r={DOOR.r - 28} />
        {RIVETS.map((a) => {
          const [x, y] = polar(a, DOOR.r - 16, DOOR.cx, DOOR.cy)
          return <circle key={a} className="ik-fill" cx={x} cy={y} r={1.8} />
        })}

        <circle className="ik-line" cx={DOOR.cx} cy={DOOR.cy} r={WHEEL.ring} />
        {SPOKES.map((a) => {
          const [x1, y1] = polar(a, WHEEL.hub, DOOR.cx, DOOR.cy)
          const [x2, y2] = polar(a, WHEEL.reach, DOOR.cx, DOOR.cy)
          return <path key={a} className="ik-line ik-thick" d={`M${x1} ${y1}L${x2} ${y2}`} />
        })}
        {SPOKES.map((a) => {
          const [x, y] = polar(a, WHEEL.reach, DOOR.cx, DOOR.cy)
          return <circle key={`k${a}`} className="ik-face" cx={x} cy={y} r={WHEEL.knob} />
        })}
        <circle className="ik-face" cx={DOOR.cx} cy={DOOR.cy} r={WHEEL.hub} />
        <circle className="ik-detail" cx={DOOR.cx} cy={DOOR.cy} r={WHEEL.hub - 5} />

        {KNUCKLES.map((k) => (
          <rect key={k.y} className="ik-face" x={k.x} y={k.y} width={k.w} height={k.h} rx={3} />
        ))}
        {STRAPS.map((s) => (
          <g key={s.y}>
            <rect className="ik-face" x={s.x} y={s.y} width={s.w} height={s.h} rx={2} />
            <circle className="ik-fill" cx={s.x + s.w - 8} cy={s.y + s.h / 2} r={1.6} />
            <circle className="ik-fill" cx={s.x + 10} cy={s.y + s.h / 2} r={1.6} />
          </g>
        ))}

        <rect className="ik-face" style={{ fill: "var(--ik-side)" }} x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} rx={2} />
        <g clipPath={`url(#${clip})`}>
          {HATCH.map((y) => (
            <path key={y} className="ik-detail" d={`M${WALL.x} ${y + WALL.w}L${WALL.x + WALL.w} ${y}`} />
          ))}
        </g>
        {BOLTS.map((y) => (
          <rect key={y} className="ik-well" x={WALL.x} y={y - BOLT.h / 2 - 2} width={WALL.w - 10} height={BOLT.h + 4} rx={2} />
        ))}
        <rect className="ik-line" style={{ fill: "none" }} x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} rx={2} />
      </Plate>
    </div>
  )
}
