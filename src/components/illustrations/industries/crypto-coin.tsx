"use client"

import { Plate } from "react-isokit"
import "./exploded.css"

const VIEW = { x: 18, y: 0, w: 300, h: 208 }
const COIN = { cx: 128, cy: 130, r: 52 }
const FACE = { cx: 128, cy: 42, r: 28 }

export default function CryptoCoin({ className }: { className?: string }) {
  return (
    <div className={className ? `osfin-exploded ${className}` : "osfin-exploded"}>
      <Plate role="img" credit={false} viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} label="Coin pulled apart, seen straight on: rim, lifted face, and a small token beside it">
        <circle className="ik-face" style={{ fill: "var(--ik-side)" }} cx={COIN.cx + 10} cy={COIN.cy} r={COIN.r} />
        <circle className="ik-line" cx={COIN.cx} cy={COIN.cy} r={COIN.r} />
        <circle className="ik-detail" cx={COIN.cx} cy={COIN.cy} r={COIN.r - 8} />

        <circle className="ik-face" cx={FACE.cx} cy={FACE.cy} r={FACE.r} />
        <circle className="ik-detail" cx={FACE.cx} cy={FACE.cy} r={FACE.r - 8} />
        <path className="ik-line" d={`M${FACE.cx} ${FACE.cy - 12}l8 12-8 12-8-12z`} />
        <circle className="ex-orange" cx={FACE.cx} cy={FACE.cy} r={2.6} />

        <rect className="ik-face ex-blue-deep" x={214} y={96} width={52} height={64} rx={6} />
        <rect className="ik-face ex-blue" x={210} y={92} width={52} height={64} rx={6} />
        <rect className="ik-screen" x={220} y={104} width={32} height={18} rx={3} />
        <circle className="ik-face ex-green" cx={236} cy={138} r={5} />
      </Plate>
    </div>
  )
}
