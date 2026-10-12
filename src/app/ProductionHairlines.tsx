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
  slow: 1.35,
  loupe: 1.15,
  riffle: 1.3,
  vault: 1.2,
} as const;

/** Soft wash on the faces, pastel strokes on the lines, a white field behind. */
const palette = {
  slow: { plate: "#F7FBFA", edge: "#7EAEA6", mid: "#B7D4CE", lo: "#E4F1EE", hi: "#3E756E", card: "transparent" },
  loupe: { plate: "#F8F6FC", edge: "#A399C9", mid: "#CBC4E2", lo: "#EBE7F6", hi: "#655C92", card: "transparent" },
  riffle: { plate: "#FBF7F3", edge: "#C9A88C", mid: "#E0C9B4", lo: "#F6EBE3", hi: "#8E684C", card: "transparent" },
  vault: { plate: "#F5F8FC", edge: "#8EABCB", mid: "#BFD0E4", lo: "#E6EEF6", hi: "#456488", card: "transparent" },
} as const;

export function productionCardColor(figure: keyof typeof figures) {
  return palette[figure].card;
}

/** One line per rule on the loupe sheet. The glass enlarges whichever line it covers. */
const RECORD = [
  "EXC-1842 INVESTIGATING AGE 2D",
  "LEDGER 44821  14,820.00 USD",
  "SETTLE 9F2A   14,806.40 USD",
  "DELTA 13.60 SCHEME FEE BREAK",
  "CAUSE NOT A TIMING GAP 4812",
  "OWNER DISPUTES DESK APPROVAL",
  "TRACE ACQUIRER INTO NOSTRO",
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
  ground.setAttribute("fill", "#F8F6FC");
  lensBody.append(ground);
  lens.append(lensBody);

  const font = "var(--font-ibm-plex-mono), ui-monospace, monospace";
  const makeText = (line: string, opacity: string) => {
    const text = document.createElementNS(SVG_NS, "text");
    text.textContent = line;
    text.setAttribute("fill", "#655C92");
    text.setAttribute("fill-opacity", opacity);
    text.setAttribute("font-size", "7.4");
    text.setAttribute("font-family", font);
    text.setAttribute("font-weight", "500");
    return text;
  };

  segments.forEach((segment, index) => {
    const text = makeText(RECORD[index] ?? "", "0.72");
    const length = Math.hypot(segment.x2 - segment.x1, segment.y2 - segment.y1);
    const angle = (Math.atan2(segment.y2 - segment.y1, segment.x2 - segment.x1) * 180) / Math.PI;
    text.setAttribute("x", String(segment.x1));
    text.setAttribute("y", String(segment.y1));
    text.setAttribute("dy", "-2.8");
    text.setAttribute("textLength", String(Math.max(0, length - 8)));
    text.setAttribute("lengthAdjust", "spacing");
    text.setAttribute("transform", `rotate(${angle} ${segment.x1} ${segment.y1})`);
    sheet.append(text);
  });

  const lensText = segments.map((segment, index) => {
    const text = makeText(RECORD[index] ?? "", "1");
    text.setAttribute("font-size", "10");
    text.setAttribute("dy", "-2.2");
    text.setAttribute(
      "textLength",
      String(Math.hypot(segment.x2 - segment.x1, segment.y2 - segment.y1)),
    );
    text.setAttribute("lengthAdjust", "spacing");
    lensBody.append(text);
    return text;
  });

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
    let along = 0.5;
    segments.forEach((segment, index) => {
      const dx = segment.x2 - segment.x1;
      const dy = segment.y2 - segment.y1;
      const span = dx * dx + dy * dy || 1;
      const t = Math.min(1, Math.max(0, ((cx - segment.x1) * dx + (cy - segment.y1) * dy) / span));
      const distance = Math.hypot(cx - (segment.x1 + dx * t), cy - (segment.y1 + dy * t));
      if (distance < nearest) {
        nearest = distance;
        focus = index;
        along = t;
      }
    });

    const row = segments[focus]!;
    const angle = (Math.atan2(row.y2 - row.y1, row.x2 - row.x1) * 180) / Math.PI;
    const rad = (angle * Math.PI) / 180;
    const neighbor = segments[Math.min(focus + 1, segments.length - 1)] ?? row;
    const step = -(neighbor.x1 - row.x1) * Math.sin(rad) + (neighbor.y1 - row.y1) * Math.cos(rad);
    lensBody.setAttribute("transform", `translate(${cx} ${cy}) rotate(${angle}) scale(${LOUPE_MAG})`);
    lensText.forEach((text, index) => {
      const segment = segments[index]!;
      const length = Math.hypot(segment.x2 - segment.x1, segment.y2 - segment.y1);
      text.setAttribute("x", String(-along * length));
      text.setAttribute("y", String((index - focus) * (Math.abs(step) > 1 ? step : 16)));
      text.setAttribute("fill-opacity", index === focus ? "1" : "0.38");
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
