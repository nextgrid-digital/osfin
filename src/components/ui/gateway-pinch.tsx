"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type Path = {
  isLeft: boolean;
  index: number;
  drift: number;
  particles: { t: number; speed: number }[];
};

const PATH_COUNT = 80;

function bezier(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

export default function GatewayPinch({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    const paths: Path[] = Array.from({ length: PATH_COUNT }, (_, index) => ({
      isLeft: index % 2 === 0,
      index,
      drift: 0,
      particles: [
        {
          t: Math.random(),
          speed: 0.00028 + Math.random() * 0.00035,
        },
      ],
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      for (const path of paths) {
        const startY = (path.index / PATH_COUNT) * height * 1.4 - height * 0.2 + path.drift;
        const p0 = { x: path.isLeft ? 0 : width, y: startY };
        const p1 = {
          x: path.isLeft ? centerX * 0.5 : width - centerX * 0.5,
          y: startY,
        };
        const p2 = {
          x: path.isLeft ? centerX * 0.8 : width - centerX * 0.8,
          y: centerY,
        };
        const p3 = { x: centerX, y: centerY };

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.62)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([1, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        for (const particle of path.particles) {
          particle.t += particle.speed;
          if (particle.t > 1) {
            particle.t = 0;
            path.drift += (Math.random() - 0.5) * 10;
          }
          const pos = bezier(particle.t, p0, p1, p2, p3);
          ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
          ctx.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3);
        }
      }

      frame = requestAnimationFrame(render);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
