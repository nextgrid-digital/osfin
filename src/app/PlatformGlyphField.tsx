const INK = "#001D20";
const CELL = 18;
const GAP = 2;
const STEP = CELL + GAP;
const COLS = 22;
const ROWS = 28;
const PAD = 12;
const WIDTH = PAD * 2 + COLS * STEP - GAP;
const HEIGHT = PAD * 2 + ROWS * STEP - GAP;

type CellKind = "x" | "dot" | "solid";

type Cell = {
  col: number;
  row: number;
  kind: CellKind;
};

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Place a rectangle of cells if it fits and does not collide. */
function placeBlock(
  occupied: Set<string>,
  cells: Cell[],
  col: number,
  row: number,
  w: number,
  h: number,
  kind: CellKind,
) {
  if (col < 0 || row < 0 || col + w > COLS || row + h > ROWS) return false;
  for (let r = row; r < row + h; r++) {
    for (let c = col; c < col + w; c++) {
      if (occupied.has(`${c},${r}`)) return false;
    }
  }
  for (let r = row; r < row + h; r++) {
    for (let c = col; c < col + w; c++) {
      occupied.add(`${c},${r}`);
      cells.push({ col: c, row: r, kind });
    }
  }
  return true;
}

function buildCells(seed: number): Cell[] {
  const rand = mulberry32(seed);
  const occupied = new Set<string>();
  const cells: Cell[] = [];

  // Horizontal bands: denser mid-field, X blocks and long dot runs.
  const bandCount = 5 + Math.floor(rand() * 2);
  for (let b = 0; b < bandCount; b++) {
    const bandRow = 2 + Math.floor((b / bandCount) * (ROWS - 8)) + Math.floor(rand() * 2);
    const invert = b % 2 === 1;
    const xW = 3 + Math.floor(rand() * 4);
    const xH = 1 + Math.floor(rand() * 3);
    const xCol = invert
      ? COLS - 4 - xW - Math.floor(rand() * 3)
      : 2 + Math.floor(rand() * 3);
    placeBlock(occupied, cells, xCol, bandRow, xW, xH, "x");

    // Stepped second X block
    if (rand() > 0.35) {
      const x2W = 2 + Math.floor(rand() * 3);
      const x2H = 1 + Math.floor(rand() * 2);
      const x2Col = invert ? xCol - x2W - 1 : xCol + xW + 1;
      const x2Row = bandRow + (rand() > 0.5 ? xH : -x2H);
      placeBlock(occupied, cells, x2Col, Math.max(0, x2Row), x2W, x2H, "x");
    }

    const dotH = rand() > 0.55 ? 2 : 1;
    const dotW = 6 + Math.floor(rand() * 8);
    const dotCol = invert
      ? Math.max(1, xCol - dotW - 1 - Math.floor(rand() * 2))
      : Math.min(COLS - dotW - 1, xCol + xW + 1);
    const dotRow = bandRow + Math.floor(rand() * Math.max(1, xH));
    placeBlock(occupied, cells, dotCol, dotRow, dotW, dotH, "dot");

    // Secondary shorter dot run
    if (rand() > 0.4) {
      const d2W = 4 + Math.floor(rand() * 5);
      const d2Row = dotRow + (rand() > 0.5 ? dotH + 1 : -(dotH + 1));
      const d2Col = invert ? dotCol + Math.floor(rand() * 3) : Math.max(1, dotCol - 2);
      placeBlock(occupied, cells, d2Col, Math.max(0, d2Row), d2W, 1, "dot");
    }
  }

  // Sparse trailing solids toward the outer edge
  const trailSide = seed % 2 === 0 ? "left" : "right";
  const trailCount = 4 + Math.floor(rand() * 4);
  for (let i = 0; i < trailCount; i++) {
    const col =
      trailSide === "left"
        ? Math.floor(rand() * 3)
        : COLS - 1 - Math.floor(rand() * 3);
    const row = 4 + Math.floor(rand() * (ROWS - 8));
    placeBlock(occupied, cells, col, row, 1, 1, "solid");
  }

  return cells;
}

function CellMark({ col, row, kind }: Cell) {
  const x = PAD + col * STEP;
  const y = PAD + row * STEP;
  const key = `${col}-${row}-${kind}`;

  if (kind === "solid") {
    return (
      <rect
        key={key}
        data-glyph-cell=""
        x={x + 4}
        y={y + 4}
        width={CELL - 8}
        height={CELL - 8}
        fill={INK}
      />
    );
  }

  if (kind === "dot") {
    return (
      <g key={key} data-glyph-cell="">
        <rect x={x} y={y} width={CELL} height={CELL} fill={INK} />
        <circle cx={x + CELL / 2} cy={y + CELL / 2} r={3.2} fill="#fff" />
      </g>
    );
  }

  // X cell: white fill, ink border and X
  const inset = 3.5;
  return (
    <g key={key} data-glyph-cell="">
      <rect x={x} y={y} width={CELL} height={CELL} fill="#fff" stroke={INK} strokeWidth={1.25} />
      <path
        d={`M${x + inset} ${y + inset}L${x + CELL - inset} ${y + CELL - inset}M${x + CELL - inset} ${y + inset}L${x + inset} ${y + CELL - inset}`}
        fill="none"
        stroke={INK}
        strokeWidth={1.6}
        strokeLinecap="square"
      />
    </g>
  );
}

/** Seeded X / dot glyph field for the homepage platform flanks. */
export default function PlatformGlyphField({
  seed,
  className = "absolute inset-0 h-full w-full",
  "aria-label": ariaLabel = "Signal field",
}: {
  seed: number;
  className?: string;
  "aria-label"?: string;
}) {
  const cells = buildCells(seed);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {cells.map((cell) => (
        <CellMark key={`${cell.col}-${cell.row}`} {...cell} />
      ))}
    </svg>
  );
}
