const LETTERS_AND_SYMBOLS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "!",
  "@",
  "#",
  "$",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "+",
  "=",
  "/",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "<",
  ">",
  ",",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;

const FX6_COLORS = ["#2b4539", "#61dca3", "#61b3dc"] as const;
const MAX_CELL_ITERATIONS = 15;
const STEP_MIN_MS = 30;
const STEP_MAX_MS = 110;
const LINE_DELAY_MS = 80;

type ShuffleCell = {
  el: HTMLElement;
  original: string;
  originalColor: string;
  iteration: number;
  nextAt: number;
  write: boolean;
};

type ShuffleLine = {
  cells: ShuffleCell[];
};

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

function getRandomChar(): string {
  return randomItem(LETTERS_AND_SYMBOLS);
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function intersects(el: HTMLElement, clip: DOMRect): boolean {
  const rect = el.getBoundingClientRect();
  return rect.bottom > clip.top && rect.top < clip.bottom && rect.right > clip.left && rect.left < clip.right;
}

function wrapTextNodes(root: HTMLElement): ShuffleLine[] {
  if (root.dataset.typeShuffle === "ready") {
    return collectWrappedLines(root);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  const lines: ShuffleLine[] = [];
  let current: ShuffleCell[] = [];

  const flushLine = () => {
    if (current.length > 0) {
      lines.push({ cells: current });
      current = [];
    }
  };

  for (const node of textNodes) {
    const text = node.nodeValue ?? "";
    if (text.length === 0) continue;

    const fragment = document.createDocumentFragment();
    for (const char of text) {
      if (char === "\n") {
        flushLine();
        fragment.appendChild(document.createTextNode("\n"));
        continue;
      }

      const span = document.createElement("span");
      span.className = "ts-char";
      span.dataset.original = char;
      span.textContent = char;
      fragment.appendChild(span);
      current.push({
        el: span,
        original: char,
        originalColor: "",
        iteration: 0,
        nextAt: 0,
        write: true,
      });
    }

    node.parentNode?.replaceChild(fragment, node);
  }

  flushLine();
  root.dataset.typeShuffle = "ready";
  return lines;
}

function collectWrappedLines(root: HTMLElement): ShuffleLine[] {
  const lines: ShuffleLine[] = [];
  let current: ShuffleCell[] = [];

  const visit = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.includes("\n")) {
      const parts = (node.nodeValue ?? "").split("\n");
      parts.forEach((_, index) => {
        if (index > 0) {
          if (current.length > 0) {
            lines.push({ cells: current });
            current = [];
          }
        }
      });
      return;
    }

    if (node instanceof HTMLElement && node.classList.contains("ts-char")) {
      current.push({
        el: node,
        original: node.dataset.original ?? node.textContent ?? "",
        originalColor: "",
        iteration: 0,
        nextAt: 0,
        write: true,
      });
      return;
    }

    node.childNodes.forEach(visit);
  };

  visit(root);
  if (current.length > 0) {
    lines.push({ cells: current });
  }
  return lines;
}

/** Codrops TypeShuffle fx6 — random glyphs with color flicker, then the original text. */
export function runTypeShuffle(root: HTMLElement): () => void {
  const lines = wrapAndMarkVisible(root);
  const start = performance.now();
  let raf = 0;
  let stopped = false;

  for (const [lineIndex, line] of lines.entries()) {
    for (const cell of line.cells) {
      cell.nextAt = start + (lineIndex + 1) * LINE_DELAY_MS;
      cell.iteration = 0;
      if (cell.write) {
        cell.originalColor = cell.el.style.color;
      }
    }
  }

  const restoreCell = (cell: ShuffleCell) => {
    if (!cell.write || !cell.el.isConnected) return;
    cell.el.textContent = cell.original;
    cell.el.style.color = cell.originalColor;
  };

  const tick = (now: number) => {
    if (stopped) return;

    let pending = 0;
    for (const line of lines) {
      for (const cell of line.cells) {
        if (cell.iteration >= MAX_CELL_ITERATIONS) continue;
        pending += 1;
        if (now < cell.nextAt) continue;

        if (cell.iteration === MAX_CELL_ITERATIONS - 1) {
          restoreCell(cell);
          cell.iteration = MAX_CELL_ITERATIONS;
          continue;
        }

        if (cell.write) {
          cell.el.textContent = getRandomChar();
          cell.el.style.color = randomItem(FX6_COLORS);
        }

        cell.iteration += 1;
        cell.nextAt = now + randomNumber(STEP_MIN_MS, STEP_MAX_MS);
      }
    }

    if (pending > 0) {
      raf = window.requestAnimationFrame(tick);
    }
  };

  raf = window.requestAnimationFrame(tick);

  return () => {
    stopped = true;
    window.cancelAnimationFrame(raf);
    for (const line of lines) {
      for (const cell of line.cells) {
        restoreCell(cell);
      }
    }
  };
}

function wrapAndMarkVisible(root: HTMLElement): ShuffleLine[] {
  const lines = wrapTextNodes(root);
  const clipRoot = root.closest("[data-type-shuffle-clip]") ?? root;
  const clip = clipRoot.getBoundingClientRect();

  for (const line of lines) {
    for (const cell of line.cells) {
      cell.write = intersects(cell.el, clip);
    }
  }

  return lines;
}
