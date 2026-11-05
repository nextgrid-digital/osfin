/**
 * see-work-end-to-end — a Hairline-style isometric line figure for Osfin.
 *
 * Three plates stacked in layers: data (bottom), workflows (middle), internal policies (top).
 * The pointer drops a probe through all three: the data point, the workflow step and the policy
 * that cover the same cell light up together, nearby data points rise in a staggered ripple,
 * and the layers open apart. Rest shows one designed opportunity, lit.
 *
 * No dependencies. SVG only. Follows Hairline's conventions:
 * viewBox 400x320, 2:1 isometric camera, strokes only (hi / edge / mid / lo tokens),
 * springs (k100 c18 m1) for continuous motion, 700ms ease-out for discrete choices,
 * no text inside the drawing, read-out lives outside in a corner.
 *
 * Usage:
 *   import { seeWorkEndToEnd } from "./see-work-end-to-end.js";
 *   const fig = seeWorkEndToEnd(document.getElementById("figure"), { intensity: 0.5, theme: "auto" });
 *   fig.update({ intensity: 0.8 });
 *   fig.destroy();
 *
 * Theme tokens (CSS custom properties, set on the element or an ancestor):
 *   --hairline-plate  --hairline-hi  --hairline-edge  --hairline-mid  --hairline-lo  --hairline-stroke
 */

const LIGHT = { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", stroke: 0.9 };
const DARK = { plate: "#111113", hi: "#f4f4f6", edge: "#6e6e77", mid: "#45454c", lo: "#2a2a30", stroke: 0.9 };

const N = 5;               // 5 x 5 cells per plate
const P = 19;              // cell pitch in plane units
const HALF = 57;           // plate half-size
const R = 10;              // plate corner radius
const T = 5;               // plate thickness
const GAP_REST = 62;       // layer gap at rest
const GAP_OPEN = 26;       // extra gap at full intensity
const LIFT = 16;           // max data-point lift
const REST_CELL = [3, 1];  // the designed rest mark: one opportunity, lit

// workflow route on the middle plate (cell coordinates)
const ROUTE = [[0, 4], [1, 4], [1, 2], [3, 2], [3, 0], [4, 0]];
// out along the route and back, so the probe never sits still
const LOOP = [...ROUTE, ...ROUTE.slice(1, -1).reverse()];
const LOOP_DWELL = 900;
// policy regions on the top plate: [i0, j0, i1, j1] inclusive
const POLICIES = [[0, 0, 1, 1], [2, 0, 4, 1], [0, 2, 2, 4], [3, 2, 4, 4]];

const ease = (t) => { // cubic-bezier(.32,.72,0,1), solved numerically
  let lo = 0, hi = 1;
  for (let k = 0; k < 18; k++) {
    const m = (lo + hi) / 2, x = 3 * (1 - m) ** 2 * m * 0.32 + 3 * (1 - m) * m * m * 0 + m ** 3;
    x < t ? (lo = m) : (hi = m);
  }
  const u = (lo + hi) / 2;
  return 3 * (1 - u) ** 2 * u * 0.72 + 3 * (1 - u) * u * u * 1 + u ** 3;
};

function spring(x) { return { x, v: 0, t: x }; }
function stepSpring(s, dt) {               // k 100, c 18, m 1
  const a = 100 * (s.t - s.x) - 18 * s.v;
  s.v += a * dt; s.x += s.v * dt;
  if (Math.abs(s.t - s.x) < 0.01 && Math.abs(s.v) < 0.01) { s.x = s.t; s.v = 0; return false; }
  return true;
}

export function seeWorkEndToEnd(el, options = {}) {
  let opts = { intensity: 0.5, theme: "auto", label: "Data, workflows and policies mapped end to end", onRead: null, loop: true, ...options };
  const clamp01 = (v) => (typeof v === "number" && !Number.isNaN(v) ? Math.min(1, Math.max(0, v)) : 0.5);
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
    if (opts.theme === "auto") {
      dark = !!el.closest(".dark,[data-theme='dark']") ||
        (getComputedStyle(document.documentElement).colorScheme === "dark");
    }
    const base = dark ? DARK : LIGHT, cs = getComputedStyle(el), v = (n, d) => cs.getPropertyValue(n).trim() || d;
    return { plate: v("--hairline-plate", base.plate), hi: v("--hairline-hi", base.hi), edge: v("--hairline-edge", base.edge),
      mid: v("--hairline-mid", base.mid), lo: v("--hairline-lo", base.lo), stroke: parseFloat(v("--hairline-stroke", base.stroke)) };
  }
  let C = tokens();

  // ---------- state ----------
  const gap = spring(GAP_REST);
  const lifts = Array.from({ length: N * N }, (_, k) => spring(0));
  const pending = [];                       // staggered target changes
  let sel = null, shown = REST_CELL, selT = 0, prevShown = REST_CELL, hover = false;
  const cx = 200, cy = 166;

  const layerZ = (L) => (L - 1) * gap.x;    // 0 = data, 1 = workflows, 2 = policies, centred on the middle plate
  const iso = (x, y, z) => [cx + (x - y) * 0.7071, cy + (x + y) * 0.35355 - z];
  const cell = (i, j) => [(i - (N - 1) / 2) * P, (j - (N - 1) / 2) * P];
  const f = (n) => n.toFixed(2);

  function ring(half, r, z, steps = 7) {     // rounded square in plane, projected
    const pts = [], c = [[half - r, half - r, 0], [-(half - r), half - r, 90], [-(half - r), -(half - r), 180], [half - r, -(half - r), 270]];
    for (const [ox, oy, a0] of c) for (let s = 0; s <= steps; s++) {
      const a = (a0 + (90 * s) / steps) * Math.PI / 180;
      pts.push(iso(ox + r * Math.cos(a), oy + r * Math.sin(a), z));
    }
    return pts;
  }
  const poly = (pts) => "M" + pts.map((p) => f(p[0]) + " " + f(p[1])).join("L") + "Z";
  const sw = () => C.stroke;

  function slab(z) {                        // two rings + side walls + one dim crease
    const bot = ring(HALF, R, z), top = ring(HALF, R, z + T);
    let L = bot[0], Rt = bot[0];
    for (const p of bot) { if (p[0] < L[0]) L = p; if (p[0] > Rt[0]) Rt = p; }
    return `<path d="${poly(bot)}" fill="${C.plate}" stroke="${C.edge}" stroke-width="${sw()}"/>` +
      `<path d="M${f(L[0])} ${f(L[1])}V${f(L[1] - T)}M${f(Rt[0])} ${f(Rt[1])}V${f(Rt[1] - T)}" stroke="${C.edge}" stroke-width="${sw()}"/>` +
      `<path d="${poly(top)}" fill="${C.plate}" stroke="${C.edge}" stroke-width="${sw()}"/>` +
      `<path d="${poly(ring(HALF - 9, R - 4, z + T))}" fill="none" stroke="${C.lo}" stroke-width="${sw()}"/>`;
  }

  function draw() {
    const [si, sj] = shown;
    let out = "";
    const zs = [layerZ(0), layerZ(1), layerZ(2)];
    const surf = (L) => zs[L] + T;

    // --- data plate ---
    out += slab(zs[0]);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * N + i, [x, y] = cell(i, j), h = lifts[k].x, base = iso(x, y, surf(0)), top = iso(x, y, surf(0) + 3 + h);
      const on = i === si && j === sj, near = Math.abs(i - si) + Math.abs(j - sj) <= 1;
      const col = on ? C.hi : near ? C.edge : C.mid;
      out += `<path d="M${f(base[0])} ${f(base[1])}V${f(top[1])}" stroke="${on ? C.hi : C.lo}" stroke-width="${sw()}"/>`;
      out += `<circle cx="${f(top[0])}" cy="${f(top[1])}" r="2.4" fill="${C.plate}" stroke="${col}" stroke-width="${sw()}"/>`;
    }
    // probe guide, data -> workflows (drawn before the plate above, so the plate hides what is under it)
    const [px, py] = cell(si, sj);
    const g1a = iso(px, py, surf(0) + 3 + lifts[sj * N + si].x), g1b = iso(px, py, surf(1));
    out += `<path d="M${f(g1a[0])} ${f(g1a[1])}L${f(g1b[0])} ${f(g1b[1])}" stroke="${C.edge}" stroke-width="${sw()}" stroke-dasharray="2 3"/>`;

    // --- workflow plate ---
    out += slab(zs[1]);
    const rp = ROUTE.map(([i, j]) => iso(...cell(i, j), surf(1)));
    out += `<path d="M${rp.map((p) => f(p[0]) + " " + f(p[1])).join("L")}" fill="none" stroke="${C.mid}" stroke-width="${sw()}" stroke-linejoin="round"/>`;
    ROUTE.forEach(([i, j], n) => {               // lit segments touching the probed cell
      if (n < ROUTE.length - 1) {
        const [a, b] = [ROUTE[n], ROUTE[n + 1]];
        const touches = (c) => (si >= Math.min(a[0], b[0]) && si <= Math.max(a[0], b[0]) && sj >= Math.min(a[1], b[1]) && sj <= Math.max(a[1], b[1]));
        if (touches()) out += `<path d="M${f(rp[n][0])} ${f(rp[n][1])}L${f(rp[n + 1][0])} ${f(rp[n + 1][1])}" stroke="${C.hi}" stroke-width="${sw() * 1.3}"/>`;
      }
    });
    ROUTE.forEach(([i, j], n) => {
      const [x, y] = cell(i, j), s = 4, on = i === si && j === sj;
      const sq = [iso(x - s, y - s, surf(1)), iso(x + s, y - s, surf(1)), iso(x + s, y + s, surf(1)), iso(x - s, y + s, surf(1))];
      out += `<path d="${poly(sq)}" fill="${C.plate}" stroke="${on ? C.hi : n === 0 || n === ROUTE.length - 1 ? C.edge : C.mid}" stroke-width="${sw()}"/>`;
    });
    const onRoute = ROUTE.some(([i, j]) => i === si && j === sj);
    if (!onRoute) {                              // probed cell off the route: a faint open marker
      const p = iso(px, py, surf(1));
      out += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="2" fill="none" stroke="${C.edge}" stroke-width="${sw()}"/>`;
    }
    const g2a = iso(px, py, surf(1)), g2b = iso(px, py, surf(2));
    out += `<path d="M${f(g2a[0])} ${f(g2a[1])}L${f(g2b[0])} ${f(g2b[1])}" stroke="${C.edge}" stroke-width="${sw()}" stroke-dasharray="2 3"/>`;

    // --- policy plate ---
    out += slab(zs[2]);
    POLICIES.forEach(([i0, j0, i1, j1]) => {
      const a = cell(i0, j0), b = cell(i1, j1), m = 8, rr = 5, z = surf(2);
      const x0 = a[0] - m, y0 = a[1] - m, x1 = b[0] + m, y1 = b[1] + m, pts = [];
      const corners = [[x1 - rr, y1 - rr, 0], [x0 + rr, y1 - rr, 90], [x0 + rr, y0 + rr, 180], [x1 - rr, y0 + rr, 270]];
      for (const [ox, oy, a0] of corners) for (let s = 0; s <= 4; s++) {
        const an = (a0 + 22.5 * s) * Math.PI / 180; pts.push(iso(ox + rr * Math.cos(an), oy + rr * Math.sin(an), z));
      }
      const inside = si >= i0 && si <= i1 && sj >= j0 && sj <= j1;
      out += `<path d="${poly(pts)}" fill="none" stroke="${inside ? C.hi : C.mid}" stroke-width="${sw()}"${inside ? "" : ' stroke-dasharray="3 2.5"'}/>`;
    });
    const tp = iso(px, py, surf(2));
    out += `<circle cx="${f(tp[0])}" cy="${f(tp[1])}" r="2.6" fill="${C.hi}"/>`;

    svg.innerHTML = out;
  }

  // ---------- read-out ----------
  let lastRead = "";
  function read() {
    const [i, j] = shown, onRoute = ROUTE.some(([a, b]) => a === i && b === j);
    const txt = sel ? `cell ${i + 1}·${j + 1}${onRoute ? " · on route" : ""}` : "rest";
    if (txt !== lastRead) {
      lastRead = txt; readout.textContent = txt; readout.style.color = C.edge;
      svg.setAttribute("aria-label", `${opts.label}. ${txt}`);
      opts.onRead?.(txt);
    }
  }

  // ---------- motion ----------
  function setTargets(target) {
    const now = performance.now(), [ti, tj] = target, reach = 1.2 + clamp01(opts.intensity) * 2.6;
    pending.length = 0;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const d = Math.hypot(i - ti, j - tj), k = j * N + i;
      let fall = d <= 0.01 ? 1 : d / reach < 0.42 ? 1 - (d / reach) * (0.69 / 0.42) : d / reach < 1 ? 0.31 - (d / reach - 0.42) * (0.22 / 0.58) : 0.09;
      if (!sel) fall = (i * 7 + j * 3) % 5 === 0 ? 0.25 : 0.08 + ((i + j) % 3) * 0.04;      // rest: non-flat, designed
      if (!sel && i === REST_CELL[0] && j === REST_CELL[1]) fall = 0.75;
      pending.push({ k, at: now + d * 45, t: fall * LIFT });                                  // stagger by distance
    }
    gap.t = GAP_REST + (sel ? clamp01(opts.intensity) * GAP_OPEN : 0);
    wake();
  }

  let raf = 0, last = 0, visible = true;
  function tick(now) {
    raf = 0;
    const dt = Math.min(0.033, (now - (last || now)) / 1000); last = now;
    let moving = false;
    for (let n = pending.length - 1; n >= 0; n--) if (pending[n].at <= now) { lifts[pending[n].k].t = pending[n].t; pending.splice(n, 1); }
    if (pending.length) moving = true;
    if (reduced) { for (const s of lifts) { s.x = s.t; } gap.x = gap.t; }
    else { for (const s of lifts) moving = stepSpring(s, dt) || moving; moving = stepSpring(gap, dt) || moving; }
    draw(); read();
    if (moving && visible) raf = requestAnimationFrame(tick); else last = 0;
  }
  function wake() { if (!raf && visible) raf = requestAnimationFrame(tick); }

  // ---------- pointer (hit test on the static rest plane, never the animated pose) ----------
  function pickOn(e, z) {
    const r = svg.getBoundingClientRect();
    const X = ((e.clientX - r.left) / r.width) * 400, Y = ((e.clientY - r.top) / r.height) * 320;
    const a = (X - cx) / 0.7071, b = (Y - cy + z) / 0.35355;
    const x = (a + b) / 2, y = (b - a) / 2;
    if (Math.abs(x) > HALF + 6 || Math.abs(y) > HALF + 6) return null;
    const i = Math.round(x / P + (N - 1) / 2), j = Math.round(y / P + (N - 1) / 2);
    return [Math.min(N - 1, Math.max(0, i)), Math.min(N - 1, Math.max(0, j))];
  }
  function pick(e) {
    // any plate: top, then the workflow, then the data, at the open pose
    const zTop = gap.t + T;
    return pickOn(e, zTop) || pickOn(e, T) || pickOn(e, -gap.t + T);
  }
  const playing = () => opts.loop !== false && !reduced;
  let loopI = 0;
  let loopTimer = 0;
  let paused = false;

  function showCell(c) {
    sel = c;
    shown = c;
    setTargets(c);
  }
  function onScreen() {
    const r = wrap.getBoundingClientRect();
    return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
  }
  function armLoop() {
    if (loopTimer || !playing()) return;
    loopTimer = setInterval(() => {
      if (paused || wrap.matches(":hover")) return;
      visible = onScreen();
      if (!visible) return;
      loopI = (loopI + 1) % LOOP.length;
      showCell(LOOP[loopI]);
    }, LOOP_DWELL);
  }

  function onEnter() { paused = true; }
  function onMove(e) {
    paused = true;
    const c = pick(e);
    if (!c) return;
    if (!sel || c[0] !== sel[0] || c[1] !== sel[1]) showCell(c);
  }
  function onLeave() {
    // a redraw can fire a false leave while the pointer is still over the graphic
    requestAnimationFrame(() => {
      if (wrap.matches(":hover")) return;
      paused = false;
      if (playing()) return;
      if (sel) { sel = null; shown = REST_CELL; setTargets(REST_CELL); }
    });
  }
  wrap.addEventListener("pointerenter", onEnter);
  wrap.addEventListener("pointermove", onMove);
  wrap.addEventListener("pointerleave", onLeave);

  // loops sleep offscreen
  const io = new IntersectionObserver(([en]) => {
    const was = visible;
    visible = en.isIntersecting;
    if (!visible) return;
    wake();
    if (!was && playing() && !paused) {
      loopI = (loopI + 1) % LOOP.length;
      showCell(LOOP[loopI]);
    }
  });
  io.observe(wrap);
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  const onScheme = () => { C = tokens(); lastRead = ""; draw(); read(); };
  mq?.addEventListener?.("change", onScheme);

  if (playing()) {
    readout.setAttribute("aria-live", "off");
    showCell(LOOP[0]);
    draw(); read();
    armLoop();
  } else {
    setTargets(REST_CELL);
    for (const p of pending) lifts[p.k].x = lifts[p.k].t = p.t;    // start posed, no intro jump
    pending.length = 0;
    gap.x = gap.t;
    draw(); read();
  }

  return {
    update(next = {}) {
      for (const k of Object.keys(next)) opts[k] = next[k] === undefined ? { intensity: 0.5, theme: "auto" }[k] : next[k];
      C = tokens(); lastRead = "";
      if (playing()) armLoop();
      else { clearInterval(loopTimer); loopTimer = 0; }
      setTargets(sel || REST_CELL);
    },
    destroy() {
      clearInterval(loopTimer);
      cancelAnimationFrame(raf); io.disconnect(); mq?.removeEventListener?.("change", onScheme);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove); wrap.removeEventListener("pointerleave", onLeave);
      wrap.remove();
    },
  };
}
