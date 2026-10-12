"use client";

import { useEffect, useRef } from "react";

type HalftonePosterProps = {
  src: string;
  alt: string;
  from: string;
  to: string;
  className?: string;
};

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.slice(0, 2), 16),
    Number.parseInt(h.slice(2, 4), 16),
    Number.parseInt(h.slice(4, 6), 16),
  ];
}

function rgb([r, g, b]: [number, number, number]) {
  return `rgb(${r} ${g} ${b})`;
}

/**
 * Saturated vertical wash with a white square stipple of the source photo.
 * Brighter parts of the photo become larger marks, the way a poster halftone reads.
 */
export default function HalftonePoster({ src, alt, from, to, className }: HalftonePosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let alive = true;
    const image = new Image();
    image.decoding = "async";
    image.src = src;

    const draw = () => {
      if (!alive) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width < 1 || height < 1) return;

      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, pixelHeight);
      gradient.addColorStop(0, rgb(parseHex(from)));
      gradient.addColorStop(1, rgb(parseHex(to)));
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, pixelWidth, pixelHeight);

      if (!image.complete || image.naturalWidth === 0) return;

      const cell = Math.max(4, Math.round(5 * dpr));
      const cols = Math.ceil(pixelWidth / cell);
      const rows = Math.ceil(pixelHeight / cell);
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return;

      const scale = Math.max(cols / image.naturalWidth, rows / image.naturalHeight);
      const drawnWidth = image.naturalWidth * scale;
      const drawnHeight = image.naturalHeight * scale;
      sampleCtx.drawImage(
        image,
        (cols - drawnWidth) / 2,
        (rows - drawnHeight) / 2,
        drawnWidth,
        drawnHeight,
      );
      const pixels = sampleCtx.getImageData(0, 0, cols, rows).data;

      // Sky is the open field. The monument is whatever pulls away from that color,
      // so a light stone building and a dark tower both read as the figure.
      const skyRows = Math.max(1, Math.round(rows * 0.14));
      let skyR = 0;
      let skyG = 0;
      let skyB = 0;
      let skyCount = 0;
      for (let y = 0; y < skyRows; y++) {
        for (let x = 0; x < cols; x++) {
          const index = (y * cols + x) * 4;
          skyR += pixels[index]!;
          skyG += pixels[index + 1]!;
          skyB += pixels[index + 2]!;
          skyCount += 1;
        }
      }
      skyR /= skyCount;
      skyG /= skyCount;
      skyB /= skyCount;

      const distances = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const index = (y * cols + x) * 4;
          const dr = pixels[index]! - skyR;
          const dg = pixels[index + 1]! - skyG;
          const db = pixels[index + 2]! - skyB;
          distances[y * cols + x] = Math.hypot(dr, dg, db);
        }
      }
      const ranked = Array.from(distances).sort((a, b) => a - b);
      const peak = ranked[Math.floor(ranked.length * 0.86)] || 1;

      ctx.fillStyle = "#ffffff";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const tone = Math.min(1, Math.max(0, distances[y * cols + x]! / peak));
          if (tone < 0.2) continue;
          const size = cell * (0.28 + tone * 0.5);
          ctx.globalAlpha = 0.45 + tone * 0.55;
          ctx.fillRect(x * cell + (cell - size) / 2, y * cell + (cell - size) / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    image.onload = draw;
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();

    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [src, from, to]);

  return <canvas ref={canvasRef} role="img" aria-label={alt} className={className ?? "size-full"} />;
}
