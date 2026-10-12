"use client";

import { useEffect, useRef } from "react";
import { Loupe, Riffle, Slow, Vault } from "@lucasmarkes/hairline/react";

const figures = {
  slow: Slow,
  loupe: Loupe,
  riffle: Riffle,
  vault: Vault,
} as const;

/** Cover-scale each sculpture inside the shared frame. */
const scale = {
  slow: 1.7,
  loupe: 1.55,
  riffle: 1.65,
  vault: 1.6,
} as const;

/** Grayscale faces and strokes — same wash on every figure. */
const palette = {
  slow: { plate: "#ffffff", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", hi: "#232327", card: "transparent" },
  loupe: { plate: "#ffffff", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", hi: "#232327", card: "transparent" },
  riffle: { plate: "#ffffff", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", hi: "#232327", card: "transparent" },
  vault: { plate: "#ffffff", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", hi: "#232327", card: "transparent" },
} as const;

export function productionCardColor(figure: keyof typeof figures) {
  return palette[figure].card;
}

/** Grid on the loupe sheet: one row per rule, four columns across the card. */
const RECORD = [
  ["EXC-1842", "LEDGER", "14,820.00", "OPEN"],
  ["QUEUE", "BREAKS", "DESK 04", "AGE 2D"],
  ["44821", "POSTED", "14:02", "ACQR"],
  ["9F2A", "SETTLE", "14,806.40", "NET"],
  ["BATCH", "4812", "SCHEME", "NET"],
  ["DELTA", "FEE", "13.60", "BREAK"],
  ["CAUSE", "RULE", "MISMATCH", "HELD"],
  ["TIMING", "GAP", "NONE", "CLEAR"],
  ["OWNER", "DISPUTES", "DESK", "PEND"],
  ["TRACE", "ACQUIRER", "NOSTRO", "OPEN"],
  ["REF", "9F2A", "SETTLE", "IN"],
  ["ACTION", "RECLASS", "FEE", "13.60"],
  ["STATUS", "INVEST", "QUEUE", "LIVE"],
  ["MATCH", "FAIL", "ROW", "44821"],
  ["SIGN", "OFF", "BLOCKED", "HELD"],
];

const LOUPE_MAG = 1.8;
const SVG_NS = "http://www.w3.org/2000/svg";

function mountLoupeRecord(host: HTMLElement) {
  const drawing = host.querySelector("svg");
  if (!(drawing instanceof SVGSVGElement)) return () => {};

  const rules = [...drawing.querySelectorAll("path")].sort(
    (a, b) =>
      (b.getAttribute("d")?.match(/M/g)?.length ?? 0) -
      (a.getAttribute("d")?.match(/M/g)?.length ?? 0),
  )[0];
  const segments = [
    ...(rules?.getAttribute("d")?.matchAll(/M\s*(-?[\d.]+)\s+(-?[\d.]+)\s*L\s*(-?[\d.]+)\s+(-?[\d.]+)/g) ??
      []),
  ]
    .map((match) => ({
      x1: Number(match[1]),
      y1: Number(match[2]),
      x2: Number(match[3]),
      y2: Number(match[4]),
    }))
    .filter((segment) => segment.x2 > segment.x1);
  if (segments.length === 0) return () => {};

  const uid = Math.random().toString(36).slice(2, 8);
  const clipId = `loupe-lens-${uid}`;
  const maskId = `loupe-sheet-${uid}`;
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 400 320");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("data-loupe-record", "");
  Object.assign(svg.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  });

  const defs = document.createElementNS(SVG_NS, "defs");
  const clip = document.createElementNS(SVG_NS, "clipPath");
  clip.id = clipId;
  clip.setAttribute("clipPathUnits", "userSpaceOnUse");
  const clipShape = document.createElementNS(SVG_NS, "path");
  clip.append(clipShape);
  const mask = document.createElementNS(SVG_NS, "mask");
  mask.id = maskId;
  mask.setAttribute("maskUnits", "userSpaceOnUse");
  const maskRect = document.createElementNS(SVG_NS, "rect");
  maskRect.setAttribute("width", "400");
  maskRect.setAttribute("height", "320");
  maskRect.setAttribute("fill", "white");
  const maskHole = document.createElementNS(SVG_NS, "path");
  maskHole.setAttribute("fill", "black");
  mask.append(maskRect, maskHole);
  defs.append(clip, mask);

  const sheet = document.createElementNS(SVG_NS, "g");
  sheet.setAttribute("mask", `url(#${maskId})`);
  const lens = document.createElementNS(SVG_NS, "g");
  lens.setAttribute("clip-path", `url(#${clipId})`);
  const lensBody = document.createElementNS(SVG_NS, "g");
  const ground = document.createElementNS(SVG_NS, "rect");
  ground.setAttribute("x", "-800");
  ground.setAttribute("y", "-800");
  ground.setAttribute("width", "1600");
  ground.setAttribute("height", "1600");
  ground.setAttribute("fill", "#ffffff");
  lensBody.append(ground);
  lens.append(lensBody);

  const unit = (x: number, y: number) => {
    const length = Math.hypot(x, y) || 1;
    return [x / length, y / length] as const;
  };
  const rule = segments[0]!;
  const [ux, uy] = unit(rule.x2 - rule.x1, rule.y2 - rule.y1);
  const pitchX = (segments[1]?.x1 ?? rule.x1) - rule.x1;
  const pitchY = (segments[1]?.y1 ?? rule.y1) - rule.y1;
  const [px, py] = unit(pitchX, pitchY);
  const shift = (
    segment: (typeof segments)[number],
    steps: number,
    drawn: boolean,
  ) => ({
    x1: segment.x1 + pitchX * steps,
    y1: segment.y1 + pitchY * steps,
    x2: segment.x2 + pitchX * steps,
    y2: segment.y2 + pitchY * steps,
    drawn,
  });
  const rows = [shift(segments[0]!, -0.5, true)];
  segments.forEach((segment, index) => {
    rows.push({ ...segment, drawn: false });
    if (index < segments.length - 1) rows.push(shift(segment, 0.5, true));
  });
  rows.push(shift(segments[segments.length - 1]!, 0.5, true));

  const card = drawing.querySelector("path.sil:not(.hi)");
  const cardClip = document.createElementNS(SVG_NS, "clipPath");
  const cardClipId = `loupe-card-${uid}`;
  cardClip.id = cardClipId;
  cardClip.setAttribute("clipPathUnits", "userSpaceOnUse");
  const cardShape = document.createElementNS(SVG_NS, "path");
  cardShape.setAttribute("d", card?.getAttribute("d") ?? "");
  cardClip.append(cardShape);
  defs.append(cardClip);
  sheet.setAttribute("clip-path", `url(#${cardClipId})`);

  const ruleLength = Math.hypot(rule.x2 - rule.x1, rule.y2 - rule.y1);
  const columns = RECORD[0]?.length ?? 1;
  const inset = 5;
  const columnWidth = (ruleLength - inset * 2) / columns;
  const pointAt = (segment: (typeof rows)[number], along: number) => ({
    x: segment.x1 + ux * along,
    y: segment.y1 + uy * along,
  });
  const first = rows[0]!;
  const last = rows[rows.length - 1]!;
  const columnRules = Array.from({ length: columns - 1 }, (_, index) => {
    const along = inset + (index + 1) * columnWidth - 1.6;
    const start = pointAt(first, along);
    const end = pointAt(last, along);
    return `M${start.x} ${start.y}L${end.x} ${end.y}`;
  }).join("");
  const rowRules = rows
    .filter((row) => row.drawn)
    .map((row) => `M${row.x1} ${row.y1}L${row.x2} ${row.y2}`)
    .join("");

  const extra = document.createElementNS(SVG_NS, "path");
  extra.setAttribute("class", "nf lo");
  extra.setAttribute("d", rowRules + columnRules);
  sheet.append(extra);

  const font = "var(--font-ibm-plex-mono), ui-monospace, monospace";
  const size = 4.2;
  const makeText = (line: string, opacity: string) => {
    const text = document.createElementNS(SVG_NS, "text");
    text.textContent = line;
    text.setAttribute("fill", "#232327");
    text.setAttribute("fill-opacity", opacity);
    text.setAttribute("font-size", String(size));
    text.setAttribute("font-family", font);
    text.setAttribute("font-weight", "500");
    return text;
  };
  // Baseline follows the rule; glyph height follows the card's depth axis.
  const lay = (text: SVGTextElement, segment: (typeof rows)[number], column: number) => {
    const lift = 1.35;
    const along = inset + column * columnWidth;
    const ox = segment.x1 + ux * along - px * lift;
    const oy = segment.y1 + uy * along - py * lift;
    text.setAttribute("x", "0");
    text.setAttribute("y", "0");
    text.setAttribute("transform", `matrix(${ux} ${uy} ${px} ${py} ${ox} ${oy})`);
  };

  rows.forEach((segment, index) => {
    (RECORD[index] ?? []).forEach((cell, column) => {
      const text = makeText(cell, "0.8");
      lay(text, segment, column);
      sheet.append(text);
    });
  });

  const lensRules = document.createElementNS(SVG_NS, "path");
  lensRules.setAttribute("fill", "none");
  lensRules.setAttribute("stroke", "#e0e0e4");
  lensRules.setAttribute("stroke-width", "0.75");
  lensRules.setAttribute(
    "d",
    rows.map((row) => `M${row.x1} ${row.y1}L${row.x2} ${row.y2}`).join("") + columnRules,
  );
  lensBody.append(lensRules);

  const lensText = rows.flatMap((segment, index) =>
    (RECORD[index] ?? []).map((cell, column) => {
      const text = makeText(cell, "1");
      lay(text, segment, column);
      lensBody.append(text);
      return { text, row: index };
    }),
  );

  svg.append(defs, sheet, lens);
  host.append(svg);

  const place = () => {
    const rim = drawing.querySelector("path.sil.hi");
    const glass = rim?.parentElement?.querySelector("path.nf.lo");
    if (!(glass instanceof SVGPathElement)) return;
    const d = glass.getAttribute("d") ?? "";
    clipShape.setAttribute("d", d);
    maskHole.setAttribute("d", d);
    const box = glass.getBBox();
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    let focus = 0;
    let nearest = Infinity;
    rows.forEach((segment, index) => {
      const dx = segment.x2 - segment.x1;
      const dy = segment.y2 - segment.y1;
      const span = dx * dx + dy * dy || 1;
      const t = Math.min(1, Math.max(0, ((cx - segment.x1) * dx + (cy - segment.y1) * dy) / span));
      const distance = Math.hypot(cx - (segment.x1 + dx * t), cy - (segment.y1 + dy * t));
      if (distance < nearest) {
        nearest = distance;
        focus = index;
      }
    });

    lensBody.setAttribute(
      "transform",
      `translate(${cx} ${cy}) scale(${LOUPE_MAG}) translate(${-cx} ${-cy})`,
    );
    lensText.forEach(({ text, row }) => {
      const away = Math.abs(row - focus);
      text.setAttribute("fill-opacity", away === 0 ? "1" : away === 1 ? "0.5" : "0.22");
    });
  };

  place();
  const observer = new MutationObserver(place);
  observer.observe(drawing, { attributes: true, subtree: true, attributeFilter: ["d"] });
  return () => {
    observer.disconnect();
    svg.remove();
  };
}

/** Native Hairline package figures for the homepage production cards. */
export default function ProductionHairline({
  figure,
  className = "",
}: {
  figure: keyof typeof figures;
  className?: string;
}) {
  const Figure = figures[figure];
  const colors = palette[figure];
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (figure !== "loupe" || !hostRef.current) return;
    return mountLoupeRecord(hostRef.current);
  }, [figure]);

  return (
    <div
      className={`relative flex size-full items-center justify-center overflow-hidden ${className}`.trim()}
      style={{ backgroundColor: "transparent" }}
    >
      <Figure
        ref={hostRef}
        theme="light"
        className="max-w-none [&_[data-hairline-live]]:sr-only"
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "auto",
          transform: `scale(${scale[figure]})`,
          transformOrigin: "center center",
          ["--hairline-plate" as string]: colors.plate,
          ["--hairline-edge" as string]: colors.edge,
          ["--hairline-mid" as string]: colors.mid,
          ["--hairline-lo" as string]: colors.lo,
          ["--hairline-hi" as string]: colors.hi,
        }}
      />
    </div>
  );
}
