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

const FIELD_COLS = 6;
const FIELD_ROWS = 6;
const FIELD_CELL = 100;
const FIELD_VIEWBOX = `0 0 ${FIELD_COLS * FIELD_CELL} ${FIELD_ROWS * FIELD_CELL}`;

const TILE_PALETTE = [
  "#F3C07A",
  "#E8923A",
  "#F6D3A8",
  "#EFE8E0",
  "#F0B15C",
  "#E39B45",
  "#F8E2C8",
  "#F6C98A",
] as const;

type GradientTile = {
  col: number;
  row: number;
  span: number;
  color: string;
  strength: number;
  flip: boolean;
};

function hashSeed(text: string) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Sparse warm squares. Placement, height, and tone come from the seed. */
function gradientTiles(seed: number): GradientTile[] {
  const rand = mulberry32(seed);
  const taken = new Set<string>();
  const tiles: GradientTile[] = [];
  const target = 8 + Math.floor(rand() * 5);
  let guard = 0;
  while (tiles.length < target && guard < 240) {
    guard += 1;
    const col = Math.floor(rand() * FIELD_COLS);
    const row = Math.floor(rand() * FIELD_ROWS);
    const span = rand() < 0.36 && row < FIELD_ROWS - 1 ? 2 : 1;
    const cells = Array.from({ length: span }, (_, index) => `${col},${row + index}`);
    if (cells.some((key) => taken.has(key))) continue;
    cells.forEach((key) => taken.add(key));
    tiles.push({
      col,
      row,
      span,
      color: TILE_PALETTE[Math.floor(rand() * TILE_PALETTE.length)]!,
      strength: 0.78 + rand() * 0.22,
      flip: rand() < 0.2,
    });
  }
  return tiles;
}

function GradientField({ seed }: { seed: number }) {
  const tiles = gradientTiles(seed);
  const inset = 8;
  return (
    <g>
      <g stroke="rgba(0,0,0,0.12)" strokeWidth="1">
        {Array.from({ length: FIELD_COLS + 1 }, (_, index) => (
          <line
            key={`v${index}`}
            x1={index * FIELD_CELL}
            y1={0}
            x2={index * FIELD_CELL}
            y2={FIELD_ROWS * FIELD_CELL}
          />
        ))}
        {Array.from({ length: FIELD_ROWS + 1 }, (_, index) => (
          <line
            key={`h${index}`}
            x1={0}
            y1={index * FIELD_CELL}
            x2={FIELD_COLS * FIELD_CELL}
            y2={index * FIELD_CELL}
          />
        ))}
      </g>
      <defs>
        {tiles.map((tile, index) => (
          <linearGradient
            key={index}
            id={`tile-${seed}-${index}`}
            x1="0"
            y1={tile.flip ? "1" : "0"}
            x2="0"
            y2={tile.flip ? "0" : "1"}
          >
            <stop offset="0%" stopColor={tile.color} stopOpacity="0" />
            <stop offset="28%" stopColor={tile.color} stopOpacity={tile.strength * 0.22} />
            <stop offset="100%" stopColor={tile.color} stopOpacity={tile.strength} />
          </linearGradient>
        ))}
      </defs>
      {tiles.map((tile, index) => (
        <rect
          key={index}
          x={tile.col * FIELD_CELL + inset}
          y={tile.row * FIELD_CELL + inset}
          width={FIELD_CELL - inset * 2}
          height={tile.span * FIELD_CELL - inset * 2}
          fill={`url(#tile-${seed}-${index})`}
        />
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
  /** Seed for the random square field. Defaults to a hash of `name`. */
  seed?: number;
  className?: string;
}) {
  const title = titleLines(name);
  const kickerY = title.lines.length > 1 ? 268 : 286;
  const firstLineY = title.lines.length > 1 ? 322 : 348;

  return (
    <svg
      viewBox={cluster ? FIELD_VIEWBOX : SHEET_VIEWBOX}
      preserveAspectRatio={cluster ? "xMidYMid meet" : "xMidYMid slice"}
      className={className}
      role="img"
      aria-label={name}
    >
      {cluster ? (
        <GradientField seed={seed ?? hashSeed(name)} />
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
