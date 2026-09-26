"use client";

import { useId } from "react";

type Pt = [number, number];

const DEPTH: Pt = [22, -30];

function outward(a: Pt, b: Pt): Pt {
  return [b[1] - a[1], a[0] - b[0]];
}

function dot(a: Pt, b: Pt) {
  return a[0] * b[0] + a[1] * b[1];
}

function square(size: number): Pt[] {
  const h = size / 2;
  return [
    [-h, -h],
    [h, -h],
    [h, h],
    [-h, h],
  ];
}

const FORESHORTEN = 0.82;

function place(pts: Pt[], angle: number, fy: number, origin: Pt): Pt[] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return pts.map(([x, y]) => {
    const rx = x * c - y * s;
    const ry = (x * s + y * c) * fy;
    return [origin[0] + rx, origin[1] + ry];
  });
}

function shift(pts: Pt[], by: Pt): Pt[] {
  return pts.map(([x, y]) => [x + by[0], y + by[1]]);
}

function outline(pts: Pt[]) {
  return (
    pts
      .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
      .join(" ") + " Z"
  );
}

function Frame({
  origin,
  size,
  hole,
  angle,
}: {
  origin: Pt;
  size: number;
  hole: number;
  angle: number;
}) {
  const fy = FORESHORTEN;
  const frontOuter = place(square(size), angle, fy, origin);
  const frontInner = place(square(hole), angle, fy, origin);
  const backOuter = shift(frontOuter, DEPTH);
  const backInner = shift(frontInner, DEPTH);
  const sides = frontOuter.flatMap((point, index) => {
    const next = (index + 1) % frontOuter.length;
    const normal = outward(point, frontOuter[next]);
    if (dot(normal, DEPTH) <= 0) return [];
    return [[point, frontOuter[next], backOuter[next], backOuter[index]] as Pt[]];
  });
  const walls = frontInner.flatMap((point, index) => {
    const next = (index + 1) % frontInner.length;
    const normal = outward(point, frontInner[next]);
    if (dot(normal, DEPTH) >= 0) return [];
    const midX = (point[0] + frontInner[next][0]) / 2 - origin[0];
    const midY = (point[1] + frontInner[next][1]) / 2 - origin[1];
    return [
      {
        pts: [point, frontInner[next], backInner[next], backInner[index]] as Pt[],
        fill: -midY > Math.abs(midX) * 0.2 ? "#f7f7f7" : "#2e2e2e",
      },
    ];
  });

  return (
    <g>
      {sides.map((pts, index) => (
        <path key={`side-${index}`} d={outline(pts)} fill="#2f2f2f" />
      ))}
      {walls.map((wall, index) => (
        <path key={`wall-${index}`} d={outline(wall.pts)} fill={wall.fill} />
      ))}
      <path
        d={`${outline(frontOuter)} ${outline([...frontInner].reverse())}`}
        fill="#f2f2f2"
        fillRule="evenodd"
      />
    </g>
  );
}

export default function MatchIqMark({
  className = "absolute inset-0 h-full w-full",
}: {
  className?: string;
}) {
  const rawId = useId().replace(/:/g, "");
  const big = `${rawId}-big`;
  const small = `${rawId}-small`;

  return (
    <svg
      viewBox="0 0 860 520"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Match IQ"
    >
      <defs>
        <radialGradient id={big} cx="36%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#f7f7f7" />
          <stop offset="42%" stopColor="#c8c8c8" />
          <stop offset="100%" stopColor="#5a5a5a" />
        </radialGradient>
        <radialGradient id={small} cx="34%" cy="30%" r="62%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#ececec" />
          <stop offset="100%" stopColor="#a3a3a3" />
        </radialGradient>
      </defs>
      <g stroke="#c6c6c6" strokeWidth="1.25">
        <line x1="-40" y1="470" x2="900" y2="-20" />
        <line x1="40" y1="560" x2="980" y2="70" />
        <line x1="-120" y1="390" x2="820" y2="-100" />
      </g>
      <circle cx="452" cy="262" r="72" fill={`url(#${big})`} />
      <Frame origin={[325, 328]} size={210} hole={102} angle={-0.32} />
      <Frame origin={[560, 188]} size={196} hole={96} angle={-0.32} />
      <circle cx="335" cy="314" r="20" fill={`url(#${small})`} />
      <circle cx="570" cy="174" r="18" fill={`url(#${small})`} />
    </svg>
  );
}
