import type { ProductIconKind } from "../content/products";

const W = 640;
const H = 700;
const CELL = 80;

export type ProductSheetScheme = "mesh" | "rings" | "frames" | "signals" | "bars";

const SCHEME_BY_ICON = {
  mesh: "mesh",
  venn: "rings",
  hex: "frames",
  octagon: "signals",
  squares: "bars",
} as const satisfies Record<ProductIconKind, ProductSheetScheme>;

export function schemeForIcon(kind: ProductIconKind): ProductSheetScheme {
  return SCHEME_BY_ICON[kind];
}

type Bar = { x: number; y: number; w: number; h: number; fill: string };
type Label = { n: string; x: number; y: number };

const STRIPE_PAIR = ["#1A1A1A", "#CFCFCF"] as const;

const STRIPES: Record<ProductSheetScheme, readonly [string, string]> = {
  mesh: STRIPE_PAIR,
  rings: STRIPE_PAIR,
  frames: STRIPE_PAIR,
  signals: STRIPE_PAIR,
  bars: STRIPE_PAIR,
};

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function blockStripes(
  seed: number,
  x: number,
  y: number,
  size: number,
  pair: readonly [string, string],
): Bar[] {
  const rand = mulberry32(seed);
  const bars: Bar[] = [];
  let cursor = y;
  while (cursor < y + size - 0.5) {
    const height = Math.min(y + size - cursor, size * (0.14 + rand() * 0.16));
    bars.push({
      x,
      y: cursor,
      w: size,
      h: height,
      fill: pair[rand() > 0.45 ? 1 : 0],
    });
    cursor += height;
  }
  return bars;
}

function pickBlocks(seed: number, count: number) {
  const rand = mulberry32(seed);
  const used = new Set<string>();
  for (let col = 2; col <= 5; col++) {
    for (let row = 3; row <= 5; row++) used.add(`${col},${row}`);
  }
  const blocks: { x: number; y: number; size: number; seed: number }[] = [];
  let guard = 0;
  while (blocks.length < count && guard < 400) {
    guard += 1;
    const col = Math.floor(rand() * 8);
    const row = Math.floor(rand() * 8);
    const key = `${col},${row}`;
    if (used.has(key)) continue;
    used.add(key);
    blocks.push({
      x: col * CELL,
      y: row * CELL,
      size: CELL,
      seed: seed + col * 8 + row,
    });
  }
  return blocks;
}

const BLOCKS: Record<ProductSheetScheme, ReturnType<typeof pickBlocks>> = {
  mesh: pickBlocks(41 * 17, 3),
  rings: pickBlocks(41 * 17 + 29, 4),
  frames: pickBlocks(41 * 17 + 58, 5),
  signals: pickBlocks(41 * 17 + 87, 3),
  bars: pickBlocks(41 * 17 + 116, 4),
};

const MESH_LABELS: Label[] = [
  { n: "001", x: 200, y: 68 },
  { n: "002", x: 320, y: 28 },
  { n: "003", x: 440, y: 68 },
  { n: "004", x: 488, y: 188 },
  { n: "005", x: 600, y: 348 },
  { n: "006", x: 600, y: 508 },
  { n: "007", x: 560, y: 148 },
  { n: "008", x: 600, y: 68 },
  { n: "009", x: 440, y: 588 },
  { n: "001", x: 40, y: 188 },
  { n: "001", x: 120, y: 508 },
  { n: "001", x: 240, y: 668 },
];

const RING_LABELS: Label[] = [
  { n: "001", x: 118, y: 48 },
  { n: "002", x: 248, y: 36 },
  { n: "003", x: 392, y: 52 },
  { n: "004", x: 528, y: 96 },
  { n: "005", x: 96, y: 168 },
  { n: "006", x: 548, y: 248 },
  { n: "007", x: 72, y: 560 },
  { n: "008", x: 560, y: 620 },
];

const FRAME_LABELS: Label[] = [
  { n: "001", x: 48, y: 24 },
  { n: "002", x: 196, y: 24 },
  { n: "003", x: 320, y: 20 },
  { n: "004", x: 456, y: 20 },
  { n: "005", x: 600, y: 168 },
  { n: "006", x: 48, y: 520 },
  { n: "007", x: 392, y: 468 },
  { n: "008", x: 600, y: 612 },
];

const SIGNAL_LABELS: Label[] = [
  { n: "001", x: 48, y: 668 },
  { n: "002", x: 120, y: 612 },
  { n: "003", x: 188, y: 556 },
  { n: "004", x: 252, y: 500 },
  { n: "005", x: 316, y: 448 },
  { n: "006", x: 560, y: 28 },
  { n: "007", x: 600, y: 168 },
  { n: "008", x: 520, y: 168 },
];

const BAR_STEPS = [56, 84, 48, 120, 88, 156, 104, 196, 132, 248];
const BAR_W = 28;
const BAR_GAP = 12;
const BAR_BASE = 672;
const BAR_X0 = 24;

const BAR_LABELS: Label[] = [0, 2, 4, 6, 8].map((index, n) => ({
  n: String(n + 1).padStart(3, "0"),
  x: BAR_X0 + index * (BAR_W + BAR_GAP) + BAR_W / 2,
  y: BAR_BASE - BAR_STEPS[index] - 16,
}));

function CropMark({ x, y, dx, dy }: { x: number; y: number; dx: number; dy: number }) {
  const arm = 16;
  return (
    <path
      d={`M ${x + dx * arm} ${y} H ${x} V ${y + dy * arm}`}
      fill="none"
      stroke="#141414"
      strokeWidth="1.25"
    />
  );
}

function titleLines(name: string): { lines: string[]; size: number } {
  if (name === "Exception Desk") return { lines: ["Exception", "Desk"], size: 44 };
  if (name === "Close Orchestration") return { lines: ["Close", "Orchestration"], size: 40 };
  if (name === "Regulatory Reporting") return { lines: ["Regulatory", "Reporting"], size: 40 };
  if (name === "Risk Signals") return { lines: [name], size: 48 };
  return { lines: [name], size: 64 };
}

function blocksFor(scheme: ProductSheetScheme | ProductIconKind | undefined) {
  if (!scheme) return [];
  const key = scheme in BLOCKS ? (scheme as ProductSheetScheme) : SCHEME_BY_ICON[scheme as ProductIconKind];
  const blocks = key ? BLOCKS[key] : undefined;
  const pair = key ? STRIPES[key] : undefined;
  if (!blocks || !pair) return [];
  return blocks.flatMap((block) => blockStripes(block.seed, block.x, block.y, block.size, pair));
}

export function SchemeArt({ scheme }: { scheme: ProductSheetScheme | ProductIconKind }) {
  const bars = blocksFor(scheme);
  return (
    <>
      {bars.map((bar, index) => (
        <rect key={index} x={bar.x} y={bar.y} width={bar.w} height={bar.h} fill={bar.fill} />
      ))}
    </>
  );
}

const LABELS: Record<ProductSheetScheme, Label[]> = {
  mesh: MESH_LABELS,
  rings: RING_LABELS,
  frames: FRAME_LABELS,
  signals: SIGNAL_LABELS,
  bars: BAR_LABELS,
};

export function SheetGridLines() {
  const lines = [];
  for (let x = 0; x <= W; x += CELL) {
    lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} />);
  }
  for (let y = 0; y <= H; y += CELL) {
    lines.push(<line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} />);
  }
  return (
    <g stroke="rgba(0,0,0,0.14)" strokeWidth="1">
      {lines}
    </g>
  );
}

export const SHEET_VIEWBOX = `0 0 ${W} ${H}`;

const SIGNAL_VIEWBOX = "74.4 78 486.2 500";

// Dark vertical strokes traced from the reference. Faint full-height guides are omitted.
const SIGNAL_LINES: { x: number; w: number; segs: readonly (readonly [number, number])[] }[] = [
  { x: 75.7, w: 1.3, segs: [] },
  { x: 86.2, w: 1.2, segs: [] },
  { x: 96.7, w: 1.3, segs: [] },
  { x: 106.8, w: 1.3, segs: [] },
  { x: 116.8, w: 1.3, segs: [] },
  { x: 126.9, w: 1.3, segs: [] },
  { x: 137.9, w: 1.3, segs: [] },
  { x: 148, w: 1.3, segs: [] },
  { x: 158, w: 1.3, segs: [] },
  { x: 168.1, w: 1.3, segs: [] },
  { x: 179.1, w: 1.3, segs: [] },
  { x: 189.1, w: 1.3, segs: [] },
  { x: 199.2, w: 1.3, segs: [] },
  { x: 209.3, w: 1.3, segs: [] },
  { x: 220.3, w: 1.3, segs: [] },
  { x: 230.3, w: 1.3, segs: [] },
  { x: 240.4, w: 1.3, segs: [[533, 45]] },
  { x: 250.9, w: 2, segs: [[124, 181], [351, 227]] },
  { x: 261, w: 2, segs: [[79, 227], [351, 227]] },
  { x: 271.5, w: 2.6, segs: [[80, 226], [351, 227]] },
  { x: 281.6, w: 2.6, segs: [[124, 182], [351, 227]] },
  { x: 292.1, w: 2, segs: [[79, 227], [351, 227]] },
  { x: 302.2, w: 2, segs: [[79, 227], [351, 227]] },
  { x: 312.7, w: 2.6, segs: [[79, 227], [351, 227]] },
  { x: 322.7, w: 2.6, segs: [[79, 227], [351, 227]] },
  { x: 333.3, w: 2, segs: [[79, 227], [351, 227]] },
  { x: 343.3, w: 2, segs: [[79, 227], [351, 227]] },
  { x: 353.4, w: 2, segs: [[79, 227], [351, 227]] },
  { x: 363.9, w: 2.6, segs: [[124, 182], [351, 227]] },
  { x: 374.5, w: 2, segs: [[124, 182], [351, 227]] },
  { x: 384.5, w: 2, segs: [[124, 182], [351, 227]] },
  { x: 394.6, w: 2, segs: [[169, 47], [260, 46], [352, 136], [532, 46]] },
  { x: 405.1, w: 1.3, segs: [[125, 45], [533, 45]] },
  { x: 415.2, w: 1.3, segs: [] },
  { x: 425.7, w: 2, segs: [[124, 91]] },
  { x: 436.2, w: 1.3, segs: [[85, 35]] },
  { x: 446.3, w: 1.3, segs: [] },
  { x: 456.8, w: 2, segs: [[79, 46]] },
  { x: 466.9, w: 2, segs: [[79, 46], [170, 45]] },
  { x: 476.9, w: 2, segs: [[79, 46], [170, 45]] },
  { x: 487.5, w: 2.6, segs: [[79, 45], [170, 45], [261, 45]] },
  { x: 498, w: 2, segs: [[79, 46], [170, 45], [260, 46]] },
  { x: 508.1, w: 2, segs: [[79, 46], [170, 136], [397, 45]] },
  { x: 518.1, w: 2, segs: [[215, 91], [397, 45], [488, 44]] },
  { x: 528.6, w: 2.6, segs: [[215, 91], [397, 45]] },
  { x: 539.2, w: 2, segs: [[215, 91], [397, 45]] },
  { x: 549.2, w: 2, segs: [[215, 136], [488, 44]] },
  { x: 559.3, w: 2, segs: [[215, 46], [306, 45], [488, 44]] },
];

/** Vertical strokes in the same register as the traced cluster, arranged from a seed. */
function signalLines(seed: number) {
  const rand = mulberry32(seed);
  const lines: { x: number; w: number; segs: [number, number][] }[] = [];
  let cursor = 110 + rand() * 220;
  for (let i = 0; i < 48; i++) {
    const x = Math.round((76 + i * 10.05) * 10) / 10;
    const segs: [number, number][] = [];
    if (rand() > 0.16) {
      const count = rand() < 0.5 ? 2 : rand() < 0.82 ? 1 : 3;
      let y = cursor + (rand() - 0.5) * 90;
      for (let k = 0; k < count; k++) {
        const top = Math.max(82, Math.min(490, y));
        const height = Math.min(24 + rand() * (rand() < 0.3 ? 200 : 90), 568 - top);
        if (height > 16) segs.push([Math.round(top), Math.round(height)]);
        y = top + height + 18 + rand() * 46;
      }
      if (segs.length > 0) cursor = segs[0][0] + (rand() - 0.45) * 36;
    }
    const roll = rand();
    lines.push({ x, w: roll < 0.5 ? 1.3 : roll < 0.78 ? 2 : 2.6, segs });
  }
  return lines;
}

function SignalCluster({ seed }: { seed?: number }) {
  const lines = seed == null ? SIGNAL_LINES : signalLines(seed);
  return (
    <g stroke="#001D20" strokeOpacity="0.4" strokeLinecap="round">
      {lines.filter((line) => line.segs.length > 0).map((line, lineIndex) => (
        <g key={line.x}>
          {line.segs.map(([y, height], seg) => {
            const upward = (lineIndex + seg) % 2 === 0;
            return (
              <line
                key={`${line.x}-${seg}`}
                x1={line.x}
                x2={line.x}
                y1={y}
                y2={y + height}
                strokeWidth={Math.max(1.6, line.w)}
                strokeDasharray="1.2 5.5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to={upward ? "-40" : "40"}
                  dur={`${16 + ((lineIndex * 3 + seg * 5) % 12)}s`}
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>
      ))}
    </g>
  );
}

export default function ProductSheet({
  name,
  scheme,
  wordmark = true,
  art = true,
  indexes = true,
  cluster = false,
  seed,
  className = "absolute inset-0 h-full w-full",
}: {
  name: string;
  scheme: ProductSheetScheme;
  wordmark?: boolean;
  art?: boolean;
  indexes?: boolean;
  cluster?: boolean;
  /** When set, the cluster is generated instead of the traced drawing. */
  seed?: number;
  className?: string;
}) {
  const title = titleLines(name);
  const kickerY = title.lines.length > 1 ? 268 : 286;
  const firstLineY = title.lines.length > 1 ? 322 : 348;

  return (
    <svg
      viewBox={cluster ? SIGNAL_VIEWBOX : SHEET_VIEWBOX}
      preserveAspectRatio={cluster ? "none" : "xMidYMid slice"}
      className={className}
      role="img"
      aria-label={name}
    >
      {cluster ? (
        <SignalCluster seed={seed} />
      ) : (
        <>
          <SheetGridLines />
          {art ? <SchemeArt scheme={scheme} /> : null}
        </>
      )}
      {indexes ? (
        <g
          fill="rgba(0,0,0,0.45)"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="11"
          letterSpacing="0.08em"
        >
          {LABELS[scheme].map((label) => (
            <text key={`${label.n}-${label.x}-${label.y}`} x={label.x} y={label.y} textAnchor="middle">
              {label.n}
            </text>
          ))}
        </g>
      ) : null}
      {cluster ? null : (
        <>
          <CropMark x={168} y={248} dx={-1} dy={-1} />
          <CropMark x={472} y={248} dx={1} dy={-1} />
          <CropMark x={168} y={420} dx={-1} dy={1} />
          <CropMark x={472} y={420} dx={1} dy={1} />
        </>
      )}
      {wordmark ? (
        <>
          <text
            x="320"
            y={kickerY}
            textAnchor="middle"
            fill="rgba(0,0,0,0.55)"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="13"
            letterSpacing="0.18em"
          >
            OSFIN
          </text>
          {title.lines.map((line, index) => (
            <text
              key={line}
              x="320"
              y={firstLineY + index * (title.size + 6)}
              textAnchor="middle"
              fill="#141414"
              fontFamily="var(--font-inter), system-ui, sans-serif"
              fontSize={title.size}
              fontWeight="500"
            >
              {line}
            </text>
          ))}
          <text
            x="616"
            y="676"
            textAnchor="end"
            fill="#141414"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="13"
            letterSpacing="0.16em"
          >
            OSFIN
          </text>
        </>
      ) : null}
    </svg>
  );
}
