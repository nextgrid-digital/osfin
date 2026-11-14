"use client"

import type React from "react"
import { Box, front, Plate, project, type Vec3 } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

const STEP_BASE = { x: -6, y: -6, z: 0, w: 112, d: 144, h: 5 }
const STEP_LOW = { x: 0, y: 0, z: 5, w: 100, d: 132, h: 5 }
const STEP_TOP = { x: 6, y: 6, z: 10, w: 88, d: 120, h: 5 }
const FLOOR = STEP_TOP.z + STEP_TOP.h
const CELLA = { x: 22, y: 20, z: FLOOR, w: 52, d: 88, h: 40 }
const SHAFT = { w: 10, h: 40 }
const COLUMN_CAP = { w: 14, h: 3 }
const COLUMN_BASE = { w: 13, h: 2.5 }
const FRONT_ROW = 116
const SIDE_ROW = 84
const FRONT_COLUMNS = [16, 37, 58, 79].map((x) => ({ x, y: FRONT_ROW }))
const SIDE_COLUMNS = [20, 44, 68, 92].map((y) => ({ x: SIDE_ROW, y }))
const COLUMNS = [...SIDE_COLUMNS, ...FRONT_COLUMNS].sort((a, b) => a.x + a.y - (b.x + b.y))
const BEAM = { x: 9, y: 10, z: FLOOR + SHAFT.h, w: 82, d: 114, h: 8 }
const EAVE = BEAM.z + BEAM.h
const RIDGE = EAVE + 28
const FRONT = BEAM.y + BEAM.d
const BACK = BEAM.y
const MID = BEAM.x + BEAM.w / 2
const LEFT = BEAM.x
const RIGHT = BEAM.x + BEAM.w
const toPath = (points: Vec3[]) => `M${points.map(([x, y, z]) => project(x, y, z).join(" ")).join("L")}Z`
const LEFT_SLOPE: Vec3[] = [[LEFT, BACK, EAVE], [LEFT, FRONT, EAVE], [MID, FRONT, RIDGE], [MID, BACK, RIDGE]]
const RIGHT_SLOPE: Vec3[] = [[RIGHT, BACK, EAVE], [RIGHT, FRONT, EAVE], [MID, FRONT, RIDGE], [MID, BACK, RIDGE]]
const GABLE = { w: BEAM.w, h: RIDGE - EAVE }
const SIDE_FILL = { fill: "var(--ik-side)" }
const TILE_LINES = Array.from({ length: 9 }, (_, k) => BACK + 8 + k * ((FRONT - BACK - 16) / 8))
const DENTILS = Array.from({ length: 13 }, (_, k) => 5 + k * 6)
const DOOR = { w: 16, h: 26 }
const WINDOWS = [22, 50]
const FIT = [STEP_BASE, BEAM, [MID, FRONT, RIDGE] as Vec3, [MID, BACK, RIDGE] as Vec3]

export default function BanksIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="blue" motion="bank" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.06} label="Bank">
        <path className="ix-shadow" d={groundShadow(STEP_BASE.x, STEP_BASE.y, STEP_BASE.w, STEP_BASE.d)} />
        <Box {...STEP_BASE} r={4} />
        <Box {...STEP_LOW} r={3} />
        <Box {...STEP_TOP} r={3} />
        <Box
          {...CELLA}
          r={1}
          front={
            <>
              <rect className="ik-well ix-glow" x={(CELLA.w - DOOR.w) / 2} y={CELLA.h - DOOR.h} width={DOOR.w} height={DOOR.h} rx={1.5} />
              <path className="ik-detail" d={`M${CELLA.w / 2} ${CELLA.h - DOOR.h + 2}V${CELLA.h}`} />
            </>
          }
          side={WINDOWS.map((u) => (
            <rect key={u} className="ik-well" x={u} y={10} width={12} height={16} rx={1} />
          ))}
        />
        {COLUMNS.map(({ x, y }) => (
          <g key={`${x}-${y}`}>
            <Box x={x - COLUMN_BASE.w / 2} y={y - COLUMN_BASE.w / 2} z={FLOOR} w={COLUMN_BASE.w} d={COLUMN_BASE.w} h={COLUMN_BASE.h} r={1} />
            <Box x={x - SHAFT.w / 2} y={y - SHAFT.w / 2} z={FLOOR + COLUMN_BASE.h} w={SHAFT.w} d={SHAFT.w} h={SHAFT.h - COLUMN_BASE.h - COLUMN_CAP.h} r={SHAFT.w / 2} />
            <Box x={x - COLUMN_CAP.w / 2} y={y - COLUMN_CAP.w / 2} z={FLOOR + SHAFT.h - COLUMN_CAP.h} w={COLUMN_CAP.w} d={COLUMN_CAP.w} h={COLUMN_CAP.h} r={1} />
          </g>
        ))}
        <Box
          {...BEAM}
          r={2}
          front={DENTILS.map((u) => <rect key={u} className="ik-detail" x={u} y={BEAM.h - 4} width={3} height={3} />)}
          side={<path className="ik-detail" d={`M5 ${BEAM.h / 2}h${BEAM.d - 10}`} />}
        />
        <g className="ik-accent ix-part ix-lift ix-lift-lg">
        <path className="ik-face ik-top" d={toPath(LEFT_SLOPE)} />
        {TILE_LINES.map((y) => (
          <path key={`l${y}`} className="ik-detail" d={toPath([[LEFT + 2, y, EAVE + 1], [MID, y, RIDGE]]).replace("Z", "")} />
        ))}
        <path className="ik-face" style={SIDE_FILL} d={toPath(RIGHT_SLOPE)} />
        {TILE_LINES.map((y) => (
          <path key={`r${y}`} className="ik-detail" d={toPath([[RIGHT - 2, y, EAVE + 1], [MID, y, RIDGE]]).replace("Z", "")} />
        ))}
        <g transform={front(LEFT, FRONT, RIDGE)}>
          <path className="ik-face" d={`M0 ${GABLE.h}L${GABLE.w / 2} 0L${GABLE.w} ${GABLE.h}Z`} />
          <path className="ik-detail" d={`M11 ${GABLE.h - 4}L${GABLE.w / 2} 7L${GABLE.w - 11} ${GABLE.h - 4}Z`} />
          <circle className="ik-face ik-top ix-part ix-spin" cx={GABLE.w / 2} cy={GABLE.h * 0.62} r={5} />
          <circle className="ik-detail" cx={GABLE.w / 2} cy={GABLE.h * 0.62} r={2.5} />
        </g>
        </g>
      </Plate>
    </IconShell>
  )
}
