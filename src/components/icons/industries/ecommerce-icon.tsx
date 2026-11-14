"use client"

import type React from "react"
import { Box, front, Plate } from "react-isokit"
import { groundShadow, IconShell } from "./icon-shell"
import "./industry-icon.css"

const BAG = { x: 0, y: 0, z: 0, w: 54, d: 30, h: 62 }
const HANDLE = { from: 15, to: 39, rise: 20 }
const HANDLE_PLANES = [BAG.y + 8, BAG.y + BAG.d - 8]
const handlePath = `M${HANDLE.from} 0C${HANDLE.from} ${-HANDLE.rise * 1.3} ${HANDLE.to} ${-HANDLE.rise * 1.3} ${HANDLE.to} 0`
const PARCEL = { x: 62, y: 18, z: 0, w: 34, d: 34, h: 26 }
const SMALL_PARCEL = { x: 68, y: 24, z: PARCEL.h, w: 22, d: 20, h: 14 }
const TAG = { u: 6, v: 18, w: 12, h: 18 }
const FLOOR_BOX = { x: 4, y: 40, z: 0, w: 26, d: 22, h: 10 }
const FIT = [BAG, PARCEL, SMALL_PARCEL, FLOOR_BOX, { x: 0, y: 0, z: BAG.h + HANDLE.rise, w: BAG.w, d: BAG.d, h: 0 }]

export default function EcommerceIcon({ className }: { className?: string }) {
  return (
    <IconShell tone="pink" motion="shop" className={className}>
      <Plate role="img" credit={false} fit={FIT} aspect={1} pad={0.08} label="Shopping bag and parcel">
        <path className="ix-shadow" d={groundShadow(0, 0, 96, 62)} />
        <g className="ix-part ix-hop" style={{ "--d": "300ms" } as React.CSSProperties}>
        <Box {...FLOOR_BOX} r={1.5} top={<path className="ik-detail" d={`M${FLOOR_BOX.w / 2} 0V${FLOOR_BOX.d}`} />} />
        </g>
        <g transform={front(BAG.x, HANDLE_PLANES[0] ?? 0, BAG.h)}>
          <path className="ik-line ik-thick" d={handlePath} />
        </g>
        <Box
          {...BAG}
          r={2}
          top={
            <>
              <circle className="ik-well" cx={HANDLE.from} cy={HANDLE_PLANES[1] ?? 0} r={1.6} />
              <circle className="ik-well" cx={HANDLE.to} cy={HANDLE_PLANES[1] ?? 0} r={1.6} />
            </>
          }
          front={
            <>
              <path className="ik-detail" d={`M0 10h${BAG.w}`} />
              <path className="ik-detail" d={`M${BAG.w / 2 - 9} 26h18M${BAG.w / 2 - 6} 30h12`} />
              <rect className="ik-detail" x={BAG.w / 2 - 12} y={20} width={24} height={16} rx={2} />
            </>
          }
          side={<path className="ik-detail" d={`M0 10h${BAG.d}`} />}
        />
        <g transform={front(BAG.x, HANDLE_PLANES[1] ?? 0, BAG.h)}>
          <path className="ik-line ik-thick" d={handlePath} />
          <path className="ik-line" d={`M${HANDLE.to} -4L${HANDLE.to + 4} ${TAG.v}`} />
          <g transform={`translate(${HANDLE.to - 2} ${TAG.v}) rotate(-8)`}>
          <g className="ix-part ix-swing" style={{ transformOrigin: "40% 0%" }}>
            <path className="ik-face ik-accent-tag" d={`M3 0H${TAG.w}V${TAG.h}H0V3Z`} />
            <circle className="ik-detail" cx={5} cy={4} r={1.4} />
            <path className="ik-detail" d={`M3 10h6M3 13h4`} />
          </g>
          </g>
        </g>
        <Box
          {...PARCEL}
          className="ik-accent"
          r={2}
          top={
            <>
              <path className="ik-detail" d={`M${PARCEL.w / 2 - 4} 0V${PARCEL.d}M${PARCEL.w / 2 + 4} 0V${PARCEL.d}`} />
            </>
          }
          front={
            <>
              <path className="ik-detail" d={`M${PARCEL.w / 2 - 4} 0V9M${PARCEL.w / 2 + 4} 0V9`} />
              <rect className="ik-face ik-top" x={5} y={13} width={14} height={9} rx={1} />
              <path className="ik-detail" d={`M7.5 16h9M7.5 19h6`} />
            </>
          }
          side={<path className="ik-detail" d={`M${PARCEL.d - 9} 8v-4l-3 2.5M${PARCEL.d - 9} 4l3 2.5`} />}
        />
        <g className="ix-part ix-hop" style={{ "--d": "120ms" } as React.CSSProperties}>
        <Box
          {...SMALL_PARCEL}
          r={1.5}
          top={<path className="ik-detail" d={`M0 ${SMALL_PARCEL.d / 2}H${SMALL_PARCEL.w}`} />}
          front={<path className="ik-detail" d={`M${SMALL_PARCEL.w / 2} 0V${SMALL_PARCEL.h}`} />}
        />
        </g>
      </Plate>
    </IconShell>
  )
}
