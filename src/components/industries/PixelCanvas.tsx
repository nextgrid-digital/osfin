"use client";

import { useEffect, useRef } from "react";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size = 0;
  sizeStep: number;
  minSize = 0.5;
  maxSizeInteger = 2;
  maxSize: number;
  delay: number;
  counter = 0;
  counterStep: number;
  isIdle = false;
  isReverse = false;
  isShimmer = false;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = (Math.random() * 0.8 + 0.1) * speed;
    this.sizeStep = Math.random() * 0.4;
    this.maxSize = Math.random() * (this.maxSizeInteger - this.minSize) + this.minSize;
    this.delay = delay;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) this.isShimmer = true;
    if (this.isShimmer) this.shimmer();
    else this.size += this.sizeStep;
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) this.isReverse = true;
    else if (this.size <= this.minSize) this.isReverse = false;
    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

type PixelCanvasProps = {
  active: boolean;
  gap?: number;
  speed?: number;
  colors: string[];
};

function clampGap(value: number) {
  return Math.min(50, Math.max(4, value));
}

function clampSpeed(value: number, reducedMotion: boolean) {
  if (reducedMotion || value <= 0) return 0;
  return Math.min(100, value) * 0.001;
}

export default function PixelCanvas({ active, gap = 5, speed = 35, colors }: PixelCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const playRef = useRef<(name: "appear" | "disappear") => void>(() => {});

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    host.replaceChildren(canvas);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelSpeed = clampSpeed(speed, reducedMotion);
    const step = clampGap(gap);
    let pixels: Pixel[] = [];
    let frame = 0;
    let mode: "appear" | "disappear" = "disappear";

    const drawStatic = (filled: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!filled) return;
      for (const pixel of pixels) {
        pixel.size = pixel.maxSize;
        pixel.draw();
      }
    };

    const createPixels = () => {
      pixels = [];
      const width = canvas.width;
      const height = canvas.height;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const color = colors[Math.floor(Math.random() * colors.length)] ?? "#cbd5e1";
          const dx = x - width / 2;
          const dy = y - height / 2;
          const delay = reducedMotion ? 0 : Math.hypot(dx, dy);
          pixels.push(new Pixel(canvas, ctx, x, y, color.trim(), pixelSpeed, delay));
        }
      }
    };

    const fit = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      createPixels();
    };

    let previous = performance.now();
    const loop = () => {
      frame = requestAnimationFrame(loop);
      const now = performance.now();
      const passed = now - previous;
      if (passed < 1000 / 60) return;
      previous = now - (passed % (1000 / 60));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const pixel of pixels) pixel[mode]();
      if (pixels.every((pixel) => pixel.isIdle)) cancelAnimationFrame(frame);
    };

    playRef.current = (name) => {
      cancelAnimationFrame(frame);
      if (reducedMotion) {
        drawStatic(name === "appear");
        return;
      }
      mode = name;
      previous = performance.now();
      frame = requestAnimationFrame(loop);
    };

    fit();
    const observer = new ResizeObserver(() => {
      fit();
      if (reducedMotion) drawStatic(activeRef.current);
    });
    observer.observe(host);
    if (activeRef.current) playRef.current("appear");

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.replaceChildren();
    };
  }, [colors, gap, speed]);

  useEffect(() => {
    playRef.current(active ? "appear" : "disappear");
  }, [active]);

  return <div ref={hostRef} className="pixel-industry-canvas" aria-hidden />;
}
