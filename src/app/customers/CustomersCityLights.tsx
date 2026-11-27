"use client";

import { useEffect, useRef, useState } from "react";
import { CITY_LIGHTS_BASE, CITY_LIGHTS_VIEW } from "./cityLightsBase";

export type CustomerCity = {
  code: string;
  label: string;
  /** ViewBox x (same space as continent lights). */
  x: number;
  /** ViewBox y */
  y: number;
};

type Props = {
  cities: readonly CustomerCity[];
  focusCode: string | null;
  onFocusChange?: (code: string | null) => void;
  className?: string;
  /** Fill parent bounds (full-bleed) instead of aspect-locked height. */
  fill?: boolean;
};

export default function CustomersCityLights({
  cities,
  focusCode,
  onFocusChange,
  className = "",
  fill = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef(focusCode);
  const onFocusRef = useRef(onFocusChange);
  const drawRef = useRef<() => void>(() => {});
  focusRef.current = focusCode;
  onFocusRef.current = onFocusChange;

  const [tip, setTip] = useState<{
    label: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    drawRef.current();
  }, [focusCode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let scale = 1;
    let ox = 0;
    let oy = 0;
    let hoverCode: string | null = null;

    type ScreenCity = CustomerCity & { sx: number; sy: number; hitR: number };
    let screenCities: ScreenCity[] = [];

    const toScreen = (vx: number, vy: number) => ({
      x: (vx - CITY_LIGHTS_VIEW.x) * scale + ox,
      y: (vy - CITY_LIGHTS_VIEW.y) * scale + oy,
    });

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = fill
        ? Math.max(1, Math.floor(rect.height))
        : Math.max(
            1,
            Math.floor(w * (CITY_LIGHTS_VIEW.h / CITY_LIGHTS_VIEW.w)),
          );

      // Cover the frame while keeping map aspect
      scale = Math.max(w / CITY_LIGHTS_VIEW.w, h / CITY_LIGHTS_VIEW.h);
      ox = (w - CITY_LIGHTS_VIEW.w * scale) / 2;
      oy = (h - CITY_LIGHTS_VIEW.h * scale) / 2;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Larger hit targets on narrow screens for touch
      const hitR = Math.max(w < 640 ? 28 : 18, w * 0.022);
      screenCities = cities.map((city) => {
        const p = toScreen(city.x, city.y);
        return { ...city, sx: p.x, sy: p.y, hitR };
      });

      draw();
    };

    const hitTest = (mx: number, my: number): ScreenCity | null => {
      let best: ScreenCity | null = null;
      let bestD = Infinity;
      for (const city of screenCities) {
        const d = Math.hypot(mx - city.sx, my - city.sy);
        if (d <= city.hitR && d < bestD) {
          best = city;
          bestD = d;
        }
      }
      return best;
    };

    const setHover = (
      city: ScreenCity | null,
      clientX: number,
      clientY: number,
    ) => {
      const next = city?.code ?? null;
      if (next !== hoverCode) {
        hoverCode = next;
        onFocusRef.current?.(next);
      }
      if (city) {
        const rect = wrap.getBoundingClientRect();
        setTip({
          label: city.label,
          x: clientX - rect.left,
          y: clientY - rect.top,
        });
        canvas.style.cursor = "pointer";
      } else {
        setTip(null);
        canvas.style.cursor = "default";
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      setHover(
        hitTest(e.clientX - rect.left, e.clientY - rect.top),
        e.clientX,
        e.clientY,
      );
    };

    const onLeave = () => {
      if (hoverCode !== null) {
        hoverCode = null;
        onFocusRef.current?.(null);
      }
      setTip(null);
      canvas.style.cursor = "default";
    };

    const draw = () => {
      const focus = focusRef.current;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const base = CITY_LIGHTS_BASE;
      const n = base.length / 2;
      const dotR = Math.max(0.75, w * 0.00115);

      ctx.fillStyle = "rgba(255,255,255,0.1)";
      for (let i = 0; i < n; i++) {
        const p = toScreen(base[i * 2]!, base[i * 2 + 1]!);
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < cities.length; i++) {
        const city = cities[i]!;
        const p = toScreen(city.x, city.y);
        const dim = Boolean(focus && focus !== city.code);
        const hot = focus === city.code;

        ctx.beginPath();
        ctx.fillStyle = dim
          ? "rgba(255,255,255,0.12)"
          : hot
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0.55)";
        ctx.arc(
          p.x,
          p.y,
          Math.max(2.2, w * 0.0032 * (dim ? 0.75 : hot ? 1.55 : 1.2)),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        if (!dim) {
          ctx.beginPath();
          ctx.strokeStyle = hot
            ? "rgba(255,255,255,0.4)"
            : "rgba(255,255,255,0.18)";
          ctx.lineWidth = Math.max(1, w * 0.001);
          ctx.arc(
            p.x,
            p.y,
            Math.max(5, w * 0.007 * (hot ? 1.25 : 1)),
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
      }
    };

    drawRef.current = draw;
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onMove);

    return () => {
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onMove);
      drawRef.current = () => {};
    };
  }, [cities, fill]);

  return (
    <div
      ref={wrapRef}
      className={`customers-city-lights relative w-full overflow-hidden ${fill ? "h-full" : ""} ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`block w-full ${fill ? "h-full" : ""}`}
        aria-label="Customer footprint map. Hover glowing hubs for country names."
      />
      {tip ? (
        <div
          className="pointer-events-none absolute z-10 max-w-[min(90vw,16rem)] -translate-x-1/2 -translate-y-[calc(100%+10px)] truncate rounded-sm border border-white/15 bg-black/95 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[-0.02em] text-white uppercase shadow-lg"
          style={{
            left: `clamp(4.5rem, ${tip.x}px, calc(100% - 4.5rem))`,
            top: tip.y,
          }}
          role="tooltip"
        >
          {tip.label}
        </div>
      ) : null}
    </div>
  );
}
