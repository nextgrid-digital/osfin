"use client"

import type React from "react"
import { Box, front, Plate, path, project, side, type Vec3 } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

const ROAD = { x: -16, y: -18, z: 0, w: 82, d: 150, h: 4 }
const GROUND = ROAD.z + ROAD.h
const RIDE = GROUND + 8
const WIDTH = 42
const CHASSIS = { x: 5, y: 2, z: GROUND + 5, w: WIDTH - 10, d: 104, h: 5 }
const CARGO = { x: 0, y: 0, z: RIDE, w: WIDTH, d: 72, h: 44 }
const CAB_BACK = CARGO.d + 3
const CAB_FRONT = CAB_BACK + 32
const CAB_TOP = RIDE + 34
const HOOD_TOP = RIDE + 17
const WINDSHIELD_FOOT = CAB_FRONT - 7
const WINDSHIELD_HEAD = CAB_BACK + 14
const BUMPER = { x: -1, y: CAB_FRONT, z: RIDE - 1, w: WIDTH + 2, d: 3, h: 7 }
const WHEEL = { r: 9, hub: 3.6 }
const WHEELS = [CAB_FRONT - 12, CARGO.d - 14, CARGO.d - 34]
const LANE_DASHES = Array.from({ length: 9 }, (_, k) => ROAD.y + 6 + k * 16)
const SPEED_LINES = [RIDE + 10, RIDE + 22, RIDE + 34]
const PIN = { x: WIDTH / 2, y: CARGO.d / 2, z: RIDE + CARGO.h + 10 }
const STRIPE = { u: 8, v: 24, w: CARGO.d - 16, h: 7 }
const RIBS = Array.from({ length: 5 }, (_, k) => 12 + k * 12)

const quad = (points: Vec3[]) => `M${points.map(([x, y, z]) => project(x, y, z).join(" ")).join("L")}Z`
const CAB_ROOF = quad([[0, CAB_BACK, CAB_TOP], [WIDTH, CAB_BACK, CAB_TOP], [WIDTH, WINDSHIELD_HEAD, CAB_TOP], [0, WINDSHIELD_HEAD, CAB_TOP]])
const WINDSHIELD = quad([[0, WINDSHIELD_HEAD, CAB_TOP], [WIDTH, WINDSHIELD_HEAD, CAB_TOP], [WIDTH, WINDSHIELD_FOOT, HOOD_TOP + 2], [0, WINDSHIELD_FOOT, HOOD_TOP + 2]])
const HOOD = quad([[0, WINDSHIELD_FOOT, HOOD_TOP + 2], [WIDTH, WINDSHIELD_FOOT, HOOD_TOP + 2], [WIDTH, CAB_FRONT, HOOD_TOP], [0, CAB_FRONT, HOOD_TOP]])
const GRILLE_FACE = quad([[0, CAB_FRONT, HOOD_TOP], [WIDTH, CAB_FRONT, HOOD_TOP], [WIDTH, CAB_FRONT, RIDE], [0, CAB_FRONT, RIDE]])
const CAB_SIDE = quad([
  [WIDTH, CAB_BACK, RIDE],
  [WIDTH, CAB_FRONT, RIDE],
  [WIDTH, CAB_FRONT, HOOD_TOP],
  [WIDTH, WINDSHIELD_FOOT, HOOD_TOP + 2],
  [WIDTH, WINDSHIELD_HEAD, CAB_TOP],
  [WIDTH, CAB_BACK, CAB_TOP],
])
const SIDE_WINDOW = quad([
  [WIDTH, CAB_BACK + 4, CAB_TOP - 4],
  [WIDTH, WINDSHIELD_HEAD + 1, CAB_TOP - 4],
  [WIDTH, WINDSHIELD_FOOT - 3, HOOD_TOP + 5],
  [WIDTH, CAB_BACK + 4, HOOD_TOP + 5],
])
const PIN_PATH = "M0 0C-3 -6 -9 -10 -9 -17A9 9 0 0 1 9 -17C9 -10 3 -6 0 0Z"
const FIT: (Vec3 | typeof ROAD)[] = [ROAD, CARGO, [WIDTH / 2, -46, RIDE + 40], [PIN.x, PIN.y, PIN.z + 28]]

export default function TravelIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="amber" motion="truck" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.06} label="Delivery truck on a road, with a tracking pin">
        <path className="ix-shadow" d={groundShadow(ROAD.x, ROAD.y, ROAD.w, ROAD.d, 4)} />
        <Box
          {...ROAD}
          r={6}
          top={
            <>
              <path className="ik-detail" d={`M4 0V${ROAD.d}M${ROAD.w - 4} 0V${ROAD.d}`} />
              <g className="ix-dash" style={{ strokeDasharray: "8 8" }}>
                <path className="ik-line" style={{ strokeDasharray: "8 8" }} d={`M${ROAD.w - 12} 4V${ROAD.d - 4}`} />
              </g>
            </>
          }
        />
        {SPEED_LINES.map((z, k) => (
          <path key={z} className="ik-line ix-show ix-dash" style={{ strokeDasharray: "7 5", transitionDelay: `${k * 60}ms` }} d={path([[WIDTH * 0.5, -6 - k * 4, z], [WIDTH * 0.5, -38 - k * 4, z]])} />
        ))}
        <g className="ix-part ix-drive">
          <g className="ix-rumble">
            <Box {...CHASSIS} r={1} />
            <Box
              {...CARGO}
              r={2}
              top={
                <>
                  <rect className="ik-detail" x={4} y={4} width={CARGO.w - 8} height={CARGO.d - 8} rx={2} />
                  <path className="ik-detail" d={`M${CARGO.w / 2} 8V${CARGO.d - 8}`} />
                </>
              }
              front={
                <>
                  <path className="ik-detail" d={`M${CARGO.w / 2} 4V${CARGO.h - 4}`} />
                  <path className="ik-detail" d={`M4 ${CARGO.h - 6}h${CARGO.w - 8}`} />
                </>
              }
              side={
                <>
                  {RIBS.map((u) => (
                    <path key={u} className="ik-detail" d={`M${u} 6V${STRIPE.v - 3}M${u} ${STRIPE.v + STRIPE.h + 3}V${CARGO.h - 6}`} />
                  ))}
                  <rect className="ik-face ik-accent-tag" x={STRIPE.u} y={STRIPE.v} width={STRIPE.w} height={STRIPE.h} rx={1.5} />
                  <rect className="ik-well" x={CARGO.d - 14} y={CARGO.h - 10} width={9} height={6} rx={1} />
                </>
              }
            />
            <g className="ik-accent">
              <path className="ik-face" style={{ fill: "var(--ik-side)" }} d={CAB_SIDE} />
              <path className="ik-screen" d={SIDE_WINDOW} />
              <path className="ik-face ik-top" d={CAB_ROOF} />
              <path className="ik-face ik-top" d={HOOD} />
            </g>
            <path className="ik-screen ix-glow-glass" d={WINDSHIELD} />
            <path className="ik-face" d={GRILLE_FACE} />
            <g transform={front(0, CAB_FRONT, HOOD_TOP)}>
              <path className="ik-detail" d={`M12 4h${WIDTH - 24}M12 7h${WIDTH - 24}M12 10h${WIDTH - 24}`} />
              <rect className="ik-face ik-top ix-glow" x={3} y={3} width={6} height={4.5} rx={1.2} />
              <rect className="ik-face ik-top ix-glow" x={WIDTH - 9} y={3} width={6} height={4.5} rx={1.2} />
            </g>
            <Box {...BUMPER} r={1.5} front={<path className="ik-detail" d={`M12 ${BUMPER.h / 2}h${BUMPER.w - 24}`} />} />
            <Box x={WIDTH} y={CAB_BACK + 18} z={HOOD_TOP} w={4} d={3} h={9} r={1} />
            <g transform={side(WIDTH, CAB_FRONT, RIDE)}>
              {WHEELS.map((y) => {
                const u = CAB_FRONT - y
                return (
                  <g key={y}>
                    <path className="ik-well" d={`M${u - WHEEL.r - 2.5} 0A${WHEEL.r + 2.5} ${WHEEL.r + 2.5} 0 0 1 ${u + WHEEL.r + 2.5} 0Z`} />
                    <circle className="ik-face" style={{ fill: "var(--ik-line)" }} cx={u} cy={1} r={WHEEL.r} />
                    <g className="ix-part ix-roll">
                      <circle className="ik-face ik-top" cx={u} cy={1} r={WHEEL.hub + 1.5} />
                      <path className="ik-detail" d={`M${u - WHEEL.hub} 1h${WHEEL.hub * 2}M${u} ${1 - WHEEL.hub}v${WHEEL.hub * 2}`} />
                    </g>
                  </g>
                )
              })}
            </g>
          </g>
        </g>
        <g className="ix-part ix-hop" style={{ "--d": "120ms" } as React.CSSProperties}>
          <g className="ix-part ix-float">
            <path className="ik-detail" d={path([[PIN.x, PIN.y, RIDE + CARGO.h + 1], [PIN.x, PIN.y, PIN.z - 1]])} />
            <g transform={front(PIN.x, PIN.y, PIN.z)}>
              <path className="ik-face ik-accent-tag" d={PIN_PATH} />
              <circle className="ik-face ik-top" cx={0} cy={-17} r={3.6} />
            </g>
          </g>
        </g>
      </Plate>
    </IconShell>
  )
}
