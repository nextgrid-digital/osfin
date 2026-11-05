/**
 * redesign-how-work-gets-done — a Hairline-style isometric line figure for Osfin.
 *
 * A turntable: a round platter on a fixed base, carrying a 3 x 3 set of tall columns. Today
 * their heights are all over the place. The platter keeps turning in quarter turns on its own,
 * and with each turn the columns rethink themselves (staggered, on springs): first a little
 * more ordered, then a clean staircase that rises around the grid. Once it is redesigned, the
 * tops light up one after another and a line joins them, then the next turn starts the loop
 * again. One column, the first step, is always lit: the earliest innings.
 *
 * No dependencies. SVG only. Follows Hairline's conventions:
 * viewBox 400x320, 2:1 isometric camera, strokes only (hi / edge / mid / lo tokens),
 * springs (k100 c18 m1), staggered motion, no text inside the drawing, read-out in a corner.
 * The loop sleeps when the figure is offscreen; reduced motion shows the redesigned state, still.
 *
 * Usage:
 *   import { redesignHowWorkGetsDone } from "./redesign-how-work-gets-done.js";
 *   const fig = redesignHowWorkGetsDone(document.getElementById("figure"), { intensity: 0.6 });
 *   fig.update({ intensity: 0.8 });
 *   fig.destroy();
 *
 * Theme tokens (CSS custom properties, set on the element or an ancestor):
 *   --hairline-plate  --hairline-hi  --hairline-edge  --hairline-mid  --hairline-lo  --hairline-stroke
 */

const LIGHT = { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", stroke: 0.9 };
const DARK = { plate: "#111113", hi: "#f4f4f6", edge: "#6e6e77", mid: "#45454c", lo: "#2a2a30", stroke: 0.9 };

const PITCH = 42;          // column spacing
const W = 8;               // column half-width
const R = 92;              // platter radius
const PT = 4;              // platter thickness
const BASE_R = 102;        // fixed base radius
const BT = 8;              // base thickness
// columns in the order the redesigned staircase climbs: a serpentine around the grid
const ORDER = [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [0, 1], [0, 2], [1, 2], [2, 2]];
// heights per state, in ORDER: today, rethinking, redesigned
const STATES = [
  [22, 88, 40, 108, 56, 30, 78, 46, 66],
  [22, 48, 42, 80, 64, 56, 90, 78, 100],
  ORDER.map((_, k) => 22 + k * 11),
];
const LABELS = ["today", "rethinking", "redesigning"];
// one loop, in ms
const TURN = 1100, HOLD = 900, LIGHT_STEP = 150, LIT_HOLD = 1600, STAGGER = 45;

function spring(x) { return { x, v: 0, t: x }; }
function stepSpring(s, dt, k = 100, c = 18) {
  const a = k * (s.t - s.x) - c * s.v;
  s.v += a * dt; s.x += s.v * dt;
  if (Math.abs(s.t - s.x) < 0.001 && Math.abs(s.v) < 0.001) { s.x = s.t; s.v = 0; return false; }
  return true;
}

export function redesignHowWorkGetsDone(el, options = {}) {
  let opts = { intensity: 0.6, theme: "auto", label: "Columns on a turning platter rearranging into a rising staircase", onRead: null, ...options };
  const clamp01 = (v) => (typeof v === "number" && !Number.isNaN(v) ? Math.min(1, Math.max(0, v)) : 0.6);
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // ---------- DOM ----------
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:relative;width:100%;aspect-ratio:5/4;touch-action:none;";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 400 320");
  svg.setAttribute("role", "img");
  svg.style.cssText = "display:block;width:100%;height:100%;overflow:visible;";
  const readout = document.createElement("div");
  readout.setAttribute("aria-live", "polite");
  readout.style.cssText = "position:absolute;left:0;top:0;font:500 11px/1.3 ui-monospace,'IBM Plex Mono',monospace;letter-spacing:-.01em;text-transform:uppercase;pointer-events:none;";
  wrap.append(svg, readout); el.append(wrap);

  // ---------- theme ----------
  function tokens() {
    let dark = opts.theme === "dark";
    if (opts.theme === "auto") dark = !!el.closest(".dark,[data-theme='dark']") || getComputedStyle(document.documentElement).colorScheme === "dark";
    const base = dark ? DARK : LIGHT, cs = getComputedStyle(el), v = (n, d) => cs.getPropertyValue(n).trim() || d;
    return { plate: v("--hairline-plate", base.plate), hi: v("--hairline-hi", base.hi), edge: v("--hairline-edge", base.edge),
      mid: v("--hairline-mid", base.mid), lo: v("--hairline-lo", base.lo), stroke: parseFloat(v("--hairline-stroke", base.stroke)) };
  }
  let C = tokens();

  // ---------- geometry ----------
  const cx = 200, cy = 214;
  const iso = (x, y, z) => [cx + (x - y) * 0.7071, cy + (x + y) * 0.35355 - z];
  const f = (n) => n.toFixed(2);
  const sw = () => C.stroke;
  const path = (pts, close) => "M" + pts.map((p) => f(p[0]) + " " + f(p[1])).join("L") + (close ? "Z" : "");
  const rot = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
  const circle = (r, z, n = 72) => Array.from({ length: n }, (_, s) => { const a = (s / n) * 2 * Math.PI; return iso(r * Math.cos(a), r * Math.sin(a), z); });

  function hull(pts) {                       // convex hull, monotone chain
    const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of p.reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }

  function disc(r, z, h, stroke) {           // a round slab: bottom, two silhouette walls, top
    const bot = circle(r, z), topR = circle(r, z + h);
    const L = iso(-r * 0.7071, r * 0.7071, z), Rt = iso(r * 0.7071, -r * 0.7071, z);
    return `<path d="${path(bot, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="M${f(L[0])} ${f(L[1])}V${f(L[1] - h)}M${f(Rt[0])} ${f(Rt[1])}V${f(Rt[1] - h)}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="${path(topR, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>`;
  }

  function column(x, y, z, h, a, stroke) {   // a box turned by a about its own axis: filled silhouette, top face, front edge
    const corners = [[W, W], [-W, W], [-W, -W], [W, -W]].map((p) => { const q = rot(p, a); return [x + q[0], y + q[1]]; });
    const bot = corners.map(([px, py]) => iso(px, py, z)), top = corners.map(([px, py]) => iso(px, py, z + h));
    let front = bot[0], L = bot[0], Rt = bot[0];
    for (const p of bot) { if (p[1] > front[1]) front = p; if (p[0] < L[0]) L = p; if (p[0] > Rt[0]) Rt = p; }
    let out = `<path d="${path(hull(bot.concat(top)), 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}" stroke-linejoin="round"/>`;
    out += `<path d="${path(top, 1)}" fill="none" stroke="${stroke}" stroke-width="${sw()}"/>`;
    if (front !== L && front !== Rt) out += `<path d="M${f(front[0])} ${f(front[1])}V${f(front[1] - h)}" stroke="${stroke}" stroke-width="${sw()}"/>`;
    return { out, topC: iso(x, y, z + h) };
  }

  // ---------- state ----------
  const cols = ORDER.map(([i, j], k) => ({ k, x: (i - 1) * PITCH, y: (j - 1) * PITCH, h: spring(STATES[0][k]), hover: spring(0), lit: k === 0 }));
  const angle = spring(0);
  let state = reduced ? 2 : 0, cycle = 0, litUpTo = 1;
  if (reduced) { cols.forEach((c) => { c.h.x = c.h.t = STATES[2][c.k]; }); litUpTo = cols.length; }

  // timeline: hold, turn to "rethinking", hold, turn to "redesigned", light the steps, hold, turn back to "today"
  const T1 = HOLD, T2 = T1 + TURN + HOLD, TL = T2 + TURN + 200, TLE = TL + cols.length * LIGHT_STEP, LOOP = TLE + LIT_HOLD;
  let turns = 0;
  function go(to) {                          // a quarter turn, with the columns re-forming on a stagger
    state = to; turns++; angle.t = turns * (Math.PI / 2);
    cols.forEach((c) => (c.due = cycle + STAGGER * c.k + 120));
  }
  function autoplay(ms) {
    const prev = cycle; cycle += ms;
    const cross = (t) => prev < t && cycle >= t;
    if (cross(T1)) go(1);
    if (cross(T2)) go(2);
    for (let k = 1; k < cols.length; k++) if (cross(TL + k * LIGHT_STEP)) litUpTo = k + 1;
    if (cycle >= LOOP) { cycle = 0; litUpTo = 1; go(0); }
    for (const c of cols) if (c.due !== undefined && cycle >= c.due) { c.h.t = STATES[state][c.k]; c.due = undefined; }
  }

  // ---------- draw ----------
  function draw() {
    const a = angle.x;
    let out = disc(BASE_R, 0, BT, C.edge);
    out += `<path d="${path(circle(BASE_R - 6, BT), 1)}" fill="none" stroke="${C.lo}" stroke-width="${sw()}"/>`;
    out += disc(R, BT, PT, C.edge);
    const z0 = BT + PT;
    // rim ticks turn with the platter, so the motion reads even while columns are still
    for (let s = 0; s < 48; s++) {
      const t = a + (s / 48) * 2 * Math.PI, r0 = s % 12 === 0 ? R - 11 : R - 6;
      const p0 = iso(r0 * Math.cos(t), r0 * Math.sin(t), z0), p1 = iso((R - 2) * Math.cos(t), (R - 2) * Math.sin(t), z0);
      out += `<path d="M${f(p0[0])} ${f(p0[1])}L${f(p1[0])} ${f(p1[1])}" stroke="${s % 12 === 0 ? C.mid : C.lo}" stroke-width="${sw()}"/>`;
    }
    // fixed index mark on the base, at the front
    const m0 = iso((BASE_R - 1) * 0.7071, (BASE_R - 1) * 0.7071, BT), m1 = iso((R + 3) * 0.7071, (R + 3) * 0.7071, BT);
    out += `<path d="M${f(m0[0])} ${f(m0[1])}L${f(m1[0])} ${f(m1[1])}" stroke="${C.hi}" stroke-width="${sw() * 1.3}"/>`;
    // columns, back to front in their turned positions
    const placed = cols.map((c) => { const [x, y] = rot([c.x, c.y], a); return { c, x, y }; }).sort((p, q) => (p.x + p.y) - (q.x + q.y));
    const tops = [];
    for (const { c, x, y } of placed) {
      const on = c.k < litUpTo, newest = c.k === litUpTo - 1;   // only the newest step is the bright one
      const col = column(x, y, z0, c.h.x + c.hover.x, a, newest ? C.hi : on ? C.edge : C.mid);
      out += col.out; tops[c.k] = col.topC;
      // join this top to its lit neighbours already drawn, so the staircase reads as one rising line
      for (const nk of [c.k - 1, c.k + 1]) {
        if (!on || nk < 0 || nk >= cols.length || nk >= litUpTo || !tops[nk]) continue;
        out += `<path d="M${f(col.topC[0])} ${f(col.topC[1])}L${f(tops[nk][0])} ${f(tops[nk][1])}" stroke="${C.hi}" stroke-width="${sw() * 1.3}"/>`;
      }
      out += `<circle cx="${f(col.topC[0])}" cy="${f(col.topC[1])}" r="${on ? 2.2 : 1.5}" fill="${on ? C.hi : C.plate}" stroke="${on ? C.hi : C.mid}" stroke-width="${sw()}"/>`;
    }
    svg.innerHTML = out;
  }

  // ---------- read-out ----------
  let lastRead = "";
  function read() {
    const txt = state === 2 && litUpTo === cols.length ? "redesigned" : LABELS[state];
    if (txt !== lastRead) {
      lastRead = txt; readout.textContent = txt; readout.style.color = C.edge;
      svg.setAttribute("aria-label", `${opts.label}. ${txt}`);
      opts.onRead?.(txt);
    }
  }

  // ---------- motion ----------
  let raf = 0, last = 0, visible = true;
  function tick(now) {
    raf = 0;
    const dt = Math.min(0.033, (now - (last || now)) / 1000); last = now;
    if (!reduced) {
      autoplay(dt * 1000);
      stepSpring(angle, dt, 60, 15);         // a heavier platter: slightly softer than the columns
      for (const c of cols) { stepSpring(c.h, dt); stepSpring(c.hover, dt); }
    }
    draw(); read();
    if (!reduced && visible) raf = requestAnimationFrame(tick); else last = 0;
  }
  function wake() { if (!raf && visible) raf = requestAnimationFrame(tick); }

  // ---------- pointer: columns near the pointer rise a little (hit test on the platter plane) ----------
  function onMove(e) {
    const r = svg.getBoundingClientRect();
    const X = ((e.clientX - r.left) / r.width) * 400, Y = ((e.clientY - r.top) / r.height) * 320;
    const d = (X - cx) / 0.7071, s = (Y - cy + BT + PT) / 0.35355, px = (s + d) / 2, py = (s - d) / 2;
    const reach = 26, lift = 6 + clamp01(opts.intensity) * 10;
    for (const c of cols) {
      const [x, y] = rot([c.x, c.y], angle.x), dist = Math.hypot(x - px, y - py);
      c.hover.t = (dist < reach ? 1 : Math.max(0, 1 - (dist - reach) / 40)) * lift;   // clamped reach
    }
    wake();
  }
  function onLeave() { for (const c of cols) c.hover.t = 0; wake(); }
  svg.addEventListener("pointermove", onMove);
  svg.addEventListener("pointerleave", onLeave);

  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) wake(); });
  io.observe(wrap);
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  const onScheme = () => { C = tokens(); lastRead = ""; draw(); read(); };
  mq?.addEventListener?.("change", onScheme);

  draw(); read(); wake();

  return {
    update(next = {}) {
      for (const k of Object.keys(next)) opts[k] = next[k] === undefined ? { intensity: 0.6, theme: "auto" }[k] : next[k];
      C = tokens(); lastRead = ""; draw(); read(); wake();
    },
    destroy() {
      cancelAnimationFrame(raf); io.disconnect(); mq?.removeEventListener?.("change", onScheme);
      svg.removeEventListener("pointermove", onMove); svg.removeEventListener("pointerleave", onLeave);
      wrap.remove();
    },
  };
}
