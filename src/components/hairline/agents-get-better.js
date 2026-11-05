/**
 * agents-get-better — a Hairline-style isometric line figure for Osfin.
 *
 * Three upright dot-matrix screens in a staggered row, one each for what the agents learn from:
 * exceptions, edge cases and escalations. In front of them, an intake track of cards; to the
 * right, a team desk wired to every screen.
 *
 * Cards slide in along the track, each marked for one of the three screens. When a screen is
 * unsure, the card arcs over to the team desk, the team resolves it (it gets a check), and that
 * decision runs up the cable into that screen, where one more column of dots snaps into place.
 * Each screen draws its own chart as it learns: exceptions rise on a learning curve, edge cases
 * climb an S-curve, escalations fall away. As a screen sharpens it asks less: it looks down,
 * marks the card and files it on the spot. Once all three are sharp they hold, then loosen, and
 * the loop starts again.
 *
 * Plays on its own in a continuous loop. When the pointer enters, the loop stops and the pointer
 * teaches: dots near it, on whichever screen it is over, snap into place. The loop resumes
 * shortly after the pointer leaves, carrying on from whatever has been learned. It sleeps
 * offscreen; reduced motion shows the learned screens, still.
 *
 * No dependencies. SVG only. Follows Hairline's conventions:
 * viewBox 400x320, 2:1 isometric camera, strokes only (hi / edge / mid / lo tokens),
 * springs (k100 c18 m1), staggered motion, no text inside the drawing, read-out in a corner.
 *
 * Usage:
 *   import { agentsGetBetter } from "./agents-get-better.js";
 *   const fig = agentsGetBetter(document.getElementById("figure"), { intensity: 0.6 });
 *   fig.update({ intensity: 0.8 });
 *   fig.destroy();
 *
 * Theme tokens (CSS custom properties, set on the element or an ancestor):
 *   --hairline-plate  --hairline-hi  --hairline-edge  --hairline-mid  --hairline-lo  --hairline-stroke
 */

const LIGHT = { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", stroke: 0.9 };
const DARK = { plate: "#111113", hi: "#f4f4f6", edge: "#6e6e77", mid: "#45454c", lo: "#2a2a30", stroke: 0.9 };

// screens: vertical slabs in the y-z plane, facing +x; u runs left to right across each (u = -y)
const PX = 36, PZ0 = 34, PZ1 = 128, PD = 3, PR = 7;
const COLS = 7, ROWS = 9;
const DX = 9.4, DZ = 9.4, DZ0 = PZ0 + 11;
const SCATTER = 4.5;
const n1 = (v) => Math.round(v * (ROWS - 1));
const SCREENS = [
  { x: 0, y: 74, curve: Array.from({ length: COLS }, (_, c) => n1((1 - Math.exp(-c / 2.2)) / (1 - Math.exp(-(COLS - 1) / 2.2)))) },  // exceptions: a learning curve
  { x: -22, y: -30, curve: Array.from({ length: COLS }, (_, c) => n1(1 / (1 + Math.exp(-(c - 3) * 1.35)))) },                       // edge cases: an S-curve
  { x: -44, y: -134, curve: [8, 6, 4, 3, 2, 1, 0] },  // strictly falling, so it reads as falling at this angle                                          // escalations: falling away
];
// the floor: intake track (front), team desk (right), cables from the desk to each screen
const TRACK = { x: 74, y0: 170, y1: 52, half: 11 };
const DESK = { x: 104, y: -76, half: 17 };
const cablePath = (s) => [[DESK.x - DESK.half, DESK.y + 8, 0], [s.x + 24, DESK.y + 8, 0], [s.x + 24, s.y - 18, 0], [s.x, s.y - 18, 5], [s.x, s.y - 18, PZ0]];
const CW = 7, CT = 2.2;                    // card half-size, thickness
// timing, in ms
const SPAWN = 1000, SLIDE = 2400, ARC = 1050, DESK_HOLD = 950, TRAVEL = 1050, LOOK = 950, HOLD = 4000, LOOSEN = 1800, RESUME = 900;

function spring(x) { return { x, v: 0, t: x }; }
function stepSpring(s, dt) {               // k 100, c 18, m 1
  const a = 100 * (s.t - s.x) - 18 * s.v;
  s.v += a * dt; s.x += s.v * dt;
  if (Math.abs(s.t - s.x) < 0.001 && Math.abs(s.v) < 0.001) { s.x = s.t; s.v = 0; return false; }
  return true;
}
function rand(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };

export function agentsGetBetter(el, options = {}) {
  let opts = { intensity: 0.6, theme: "auto", label: "Three agent screens sharpening as the team resolves exceptions, edge cases and escalations", onRead: null, ...options };
  const clamp01 = (v) => (typeof v === "number" && !Number.isNaN(v) ? clamp(v) : 0.6);
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
  const cx = 168, cy = 214, S = 0.88;          // S scales the drawing to fit three screens
  const iso = (x, y, z) => [cx + (x - y) * 0.7071 * S, cy + ((x + y) * 0.35355 - z) * S];
  const onScreen = (s, u, z, side = 1) => iso(s.x + side * PD, s.y - u, z);
  const f = (n) => n.toFixed(2);
  const sw = () => C.stroke;
  const path = (pts, close) => "M" + pts.map((p) => f(p[0]) + " " + f(p[1])).join("L") + (close ? "Z" : "");
  const seg = (a, b, stroke, w = sw(), extra = "") => `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
  const dot = (p, r, fill, stroke) => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw()}"` : ""}/>`;

  function rr2(a0, b0, a1, b1, r, steps = 5) {     // rounded rectangle in 2D (a, b)
    const pts = [], c = [[a1 - r, b1 - r, 0], [a0 + r, b1 - r, 90], [a0 + r, b0 + r, 180], [a1 - r, b0 + r, 270]];
    for (const [oa, ob, d0] of c) for (let s = 0; s <= steps; s++) {
      const t = (d0 + (90 * s) / steps) * Math.PI / 180;
      pts.push([oa + r * Math.cos(t), ob + r * Math.sin(t)]);
    }
    return pts;
  }
  function hull(pts) {                       // convex hull, monotone chain
    const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of p.reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }
  function floorSlab(x0, y0, x1, y1, r, z, h, stroke) {   // a flat slab
    const bot = rr2(x0, y0, x1, y1, r).map(([x, y]) => iso(x, y, z)), top = bot.map((p) => [p[0], p[1] - h * S]);
    let L = bot[0], R = bot[0];
    for (const p of bot) { if (p[0] < L[0]) L = p; if (p[0] > R[0]) R = p; }
    return `<path d="${path(bot, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="M${f(L[0])} ${f(L[1])}V${f(L[1] - h * S)}M${f(R[0])} ${f(R[1])}V${f(R[1] - h * S)}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="${path(top, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>`;
  }
  function card(x, y, z, stroke, kind, done, h = CT) {   // an exception card: a thin slab, its kind as 1-3 short lines, a check once resolved
    let out = floorSlab(x - CW, y - CW, x + CW, y + CW, 1.5, z, h, stroke);
    const zt = z + h, ink = stroke === C.hi ? C.edge : C.mid;
    for (let n = 0; n <= kind; n++) out += seg(iso(x - 4, y + 4 - n * 2.6, zt), iso(x - 0.5, y + 4 - n * 2.6, zt), ink);
    if (done) {
      const a = iso(x + 1, y - 1, zt), b = iso(x + 3, y + 1.5, zt), c2 = iso(x + 6, y - 4, zt);
      out += `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}L${f(c2[0])} ${f(c2[1])}" fill="none" stroke="${C.hi}" stroke-width="${sw() * 1.2}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return out;
  }

  // ---------- dots, per screen ----------
  const rnd = rand(5);
  SCREENS.forEach((s, si) => {
    s.dots = [];
    for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
      s.dots.push({ c, r, gu: -((COLS - 1) / 2) * DX + c * DX, gz: DZ0 + r * DZ, on: s.curve[c] === r, under: r < s.curve[c],
        ou: (rnd() * 2 - 1) * SCATTER, oz: (rnd() * 2 - 1) * SCATTER, ph: rnd() * Math.PI * 2, learn: spring(0), learned: false, due: Infinity, unAt: 0 });
    }
    s.cable = cablePath(s);
    s.cableLen = s.cable.slice(1).reduce((t, p, n) => t + Math.hypot(p[0] - s.cable[n][0], p[1] - s.cable[n][1], p[2] - s.cable[n][2]), 0);
    s.eye = (PX - 10);                        // u position of the screen's sensor on its lower edge
    s.idx = si;
  });
  if (reduced) for (const s of SCREENS) for (const d of s.dots) { d.learned = true; d.learn.x = d.learn.t = 1; }

  function along(s, u) {                      // point at fraction u along a screen's cable
    let d = u * s.cableLen;
    for (let n = 1; n < s.cable.length; n++) {
      const a = s.cable[n - 1], b = s.cable[n], L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      if (d <= L) { const t = d / L; return iso(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t); }
      d -= L;
    }
    const e = s.cable[s.cable.length - 1]; return iso(e[0], e[1], e[2]);
  }

  // ---------- state ----------
  let clock = 0, hovering = false, resumeAt = 0, nextSpawn = 0, learnedAt = -1, kindNext = 0, lastCall = "";
  let cards = [], pulses = [];
  const acc = [1, 1, 1];
  const frac = (s) => s.dots.reduce((t, d) => t + (d.learned ? 1 : 0), 0) / s.dots.length;
  const fracAll = () => SCREENS.reduce((t, s) => t + frac(s), 0) / SCREENS.length;
  function nextColumn(s) { for (let c = 0; c < COLS; c++) if (!s.dots.some((d) => d.c === c && d.learned)) return c; return -1; }
  function learnColumn(s, c, now) {
    for (const d of s.dots) if (d.c === c && !d.learned) { d.learned = true; d.unAt = 0; d.due = now + d.r * 45; }
  }

  // ---------- draw ----------
  function drawScreen(s, now, looking) {
    let out = floorSlab(s.x - 14, s.y - 30, s.x + 14, s.y + 30, 7, 0, 5, C.edge);
    out += seg(iso(s.x, s.y - 18, 5), iso(s.x, s.y - 18, PZ0), C.edge) + seg(iso(s.x, s.y + 18, 5), iso(s.x, s.y + 18, PZ0), C.edge);
    const face = rr2(-PX, PZ0, PX, PZ1, PR, 5);
    const front = face.map(([u, z]) => onScreen(s, u, z)), back = face.map(([u, z]) => onScreen(s, u, z, -1));
    out += `<path d="${path(hull(front.concat(back)), 1)}" fill="${C.plate}" stroke="${C.edge}" stroke-width="${sw()}" stroke-linejoin="round"/>`;
    out += `<path d="${path(front, 1)}" fill="${C.plate}" stroke="${C.edge}" stroke-width="${sw()}"/>`;
    out += `<path d="${path(rr2(-PX + 6, PZ0 + 6, PX - 6, PZ1 - 6, PR - 3, 5).map(([u, z]) => onScreen(s, u, z)), 1)}" fill="none" stroke="${C.lo}" stroke-width="${sw()}"/>`;
    const eye = onScreen(s, s.eye, PZ0 + 3);
    out += dot(eye, 2, looking ? C.hi : C.plate, looking ? C.hi : C.edge);
    const t = now / 1000;
    const pos = (d) => { const w = 1 - d.learn.x; return onScreen(s, d.gu + (d.ou + Math.sin(t * 0.7 + d.ph) * 1.2) * w, d.gz + (d.oz + Math.cos(t * 0.6 + d.ph) * 1.2) * w); };
    const cd = s.curve.map((r, c) => s.dots[c * ROWS + r]);
    for (let c = 0; c < COLS - 1; c++) if (cd[c].learn.x > 0.95 && cd[c + 1].learn.x > 0.95) out += seg(pos(cd[c]), pos(cd[c + 1]), C.hi, sw() * 1.25);
    for (const d of s.dots) {
      const p = pos(d), k = d.learn.x;
      if (k < 0.5) out += dot(p, 1.1, "none", C.lo);
      else if (d.on) out += dot(p, 2.1, C.hi);
      else if (d.under) out += dot(p, 1.35, C.edge);
      else out += dot(p, 1.15, C.plate, C.mid);
    }
    return { out, eye };
  }

  function draw(now) {
    let out = "";
    const deskBusy = cards.some((k) => k.mode === "desk") || pulses.length > 0;
    // cables on the floor first; a cable carrying a decision is drawn darker
    for (const s of SCREENS) {
      const busy = pulses.some((p) => p.s === s);
      out += `<path d="${path(s.cable.map(([x, y, z]) => iso(x, y, z)))}" fill="none" stroke="${busy ? C.edge : C.lo}" stroke-width="${sw()}" stroke-linejoin="round"/>`;
    }
    // screens, back to front
    const eyes = [];
    for (const s of [...SCREENS].sort((a, b) => (a.x + a.y) - (b.x + b.y))) {
      const r = drawScreen(s, now, cards.some((k) => k.mode === "look" && k.kind === s.idx));
      out += r.out; eyes[s.idx] = r.eye;
    }
    for (const pl of pulses) out += dot(along(pl.s, clamp((clock - pl.at) / TRAVEL)), 2.4, C.hi);
    // the team desk
    out += floorSlab(DESK.x - DESK.half, DESK.y - DESK.half, DESK.x + DESK.half, DESK.y + DESK.half, 4, 0, 5, deskBusy ? C.edge : C.mid);
    const pm = iso(DESK.x - 7, DESK.y - 7, 5);
    out += seg([pm[0], pm[1] - 1], [pm[0], pm[1] - 10], deskBusy ? C.hi : C.mid);
    out += dot([pm[0], pm[1] - 13.5], 2.8, deskBusy ? C.hi : C.plate, deskBusy ? C.hi : C.mid);
    // the intake track with travelling slats
    out += floorSlab(TRACK.x - TRACK.half, TRACK.y1 - 12, TRACK.x + TRACK.half, TRACK.y0 + 12, TRACK.half - 1, 0, 4, C.edge);
    const pitch = 10, off = (clock * ((TRACK.y0 - TRACK.y1) / SLIDE)) % pitch;   // slats move with the cards
    for (let y = TRACK.y0 + 12 - TRACK.half - off; y > TRACK.y1 - 12 + TRACK.half; y -= pitch) out += seg(iso(TRACK.x - TRACK.half + 3, y, 4), iso(TRACK.x + TRACK.half - 3, y, 4), C.lo);
    // cards
    const later = [];
    for (const k of cards) {
      if (k.mode === "track") out += card(TRACK.x, TRACK.y0 + (TRACK.y1 - TRACK.y0) * clamp((clock - k.born) / SLIDE), 4, C.mid, k.kind, false);
      else if (k.mode === "look") {          // handled on the spot: its screen looks down, marks it, it sinks into the track's end
        const u = clamp((clock - k.at) / LOOK), sink = ease((u - 0.6) / 0.4);
        if (u < 0.75) out += seg(eyes[k.kind], iso(TRACK.x, TRACK.y1, 4 + CT), C.hi, sw(), ' stroke-dasharray="1.5 2.5"');
        if (sink < 1) out += card(TRACK.x, TRACK.y1, 4, C.edge, k.kind, u > 0.35, CT * (1 - sink));
      } else later.push(k);
    }
    for (const k of later) {                 // flying to the desk, or on it: drawn above everything
      if (k.mode === "desk") {
        const u = clamp((clock - k.at) / DESK_HOLD), sink = ease((u - 0.75) / 0.25);
        if (sink < 1) out += card(DESK.x + 3, DESK.y + 3, 5, C.hi, k.kind, u > 0.3, CT * (1 - sink));
        continue;
      }
      const u = ease((clock - k.at) / ARC), x0 = TRACK.x, y0 = TRACK.y1, x1 = DESK.x + 3, y1 = DESK.y + 3;
      out += card(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, 4 + u + 60 * Math.sin(Math.PI * u), C.hi, k.kind, false);
    }
    svg.innerHTML = out;
  }

  // ---------- read-out ----------
  let lastRead = "";
  function read() {
    const pct = Math.round(fracAll() * 100);
    const txt = hovering ? `teaching · ${pct}%` : pct === 100 && !cards.some((k) => k.mode === "fly" || k.mode === "desk") ? "auto · sharp · handles it" : `auto · ${pct}% · ${lastCall || "learning"}`;
    if (txt !== lastRead) {
      lastRead = txt; readout.textContent = txt; readout.style.color = C.edge;
      svg.setAttribute("aria-label", `${opts.label}. ${txt}`);
      opts.onRead?.(txt);
    }
  }

  // ---------- motion ----------
  function autoplay(ms, now) {
    clock += ms;
    if (clock >= nextSpawn) { cards.push({ born: clock, mode: "track", kind: kindNext }); kindNext = (kindNext + 1) % 3; nextSpawn = clock + SPAWN; }
    for (const k of cards) {
      const s = SCREENS[k.kind];
      if (k.mode === "track" && clock - k.born >= SLIDE) {
        acc[k.kind] += 1 - frac(s) * 0.72;      // the less this screen knows, the more often it asks
        if (acc[k.kind] >= 1 && nextColumn(s) >= 0) { acc[k.kind] -= 1; k.mode = "fly"; k.at = clock; lastCall = "asks the team"; }
        else { k.mode = "look"; k.at = clock; lastCall = "handles it"; }
      } else if (k.mode === "fly" && clock - k.at >= ARC) { k.mode = "desk"; k.at = clock; }
      else if (k.mode === "desk" && clock - k.at >= DESK_HOLD * 0.4 && !k.sent) { k.sent = true; pulses.push({ at: clock, s }); }
    }
    cards = cards.filter((k) => !((k.mode === "look" && clock - k.at > LOOK) || (k.mode === "desk" && clock - k.at > DESK_HOLD)));
    for (const pl of [...pulses]) if (clock - pl.at >= TRAVEL) { const c = nextColumn(pl.s); if (c >= 0) learnColumn(pl.s, c, now); pulses.splice(pulses.indexOf(pl), 1); }
    if (fracAll() === 1 && pulses.length === 0) {
      if (learnedAt < 0) learnedAt = clock;
      if (clock - learnedAt > HOLD) {
        for (const s of SCREENS) { for (const d of s.dots) { d.learned = false; d.due = Infinity; d.unAt = now + Math.random() * LOOSEN; } learnColumn(s, 0, now); }
        learnedAt = -1; acc.fill(1);
      }
    } else learnedAt = -1;
  }

  let raf = 0, last = 0, visible = true;
  function tick(now) {
    raf = 0;
    const dt = Math.min(0.033, (now - (last || now)) / 1000); last = now;
    if (!reduced) {
      if (!hovering && now >= resumeAt) autoplay(dt * 1000, now);
      for (const s of SCREENS) for (const d of s.dots) {
        if (d.learned && now >= d.due) { d.learn.t = 1; d.due = Infinity; }
        if (d.unAt && now >= d.unAt) { d.learn.t = d.learned ? 1 : 0; d.unAt = 0; }
        stepSpring(d.learn, dt);
      }
    }
    draw(now); read();
    if (!reduced && visible) raf = requestAnimationFrame(tick); else last = 0;
  }
  function wake() { if (!raf && visible) raf = requestAnimationFrame(tick); }

  // ---------- pointer: the loop stops and the pointer teaches whichever screen it is over (front screen first) ----------
  function onMove(e) {
    const r = svg.getBoundingClientRect();
    const X = ((e.clientX - r.left) / r.width) * 400, Y = ((e.clientY - r.top) / r.height) * 320;
    hovering = true;
    const reach = 10 + clamp01(opts.intensity) * 11, now = performance.now();
    for (const s of [...SCREENS].sort((a, b) => (b.x + b.y) - (a.x + a.y))) {
      // invert the projection on this screen's front plane (x = s.x + PD): solve for u and z
      const xp = s.x + PD, yp = xp - (X - cx) / (0.7071 * S), u = s.y - yp, z = (xp + yp) * 0.35355 - (Y - cy) / S;
      if (Math.abs(u) > PX || z < PZ0 || z > PZ1) continue;
      for (const d of s.dots) {
        const dist = Math.hypot(d.gu - u, d.gz - z);
        if (dist < reach && !d.learned) { d.learned = true; d.unAt = 0; d.due = now + dist * 6; }
      }
      break;
    }
    wake();
  }
  function onLeave() { hovering = false; resumeAt = performance.now() + RESUME; wake(); }
  svg.addEventListener("pointermove", onMove);
  svg.addEventListener("pointerleave", onLeave);

  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) wake(); });
  io.observe(wrap);
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  const onScheme = () => { C = tokens(); lastRead = ""; draw(performance.now()); read(); };
  mq?.addEventListener?.("change", onScheme);

  // open with each screen's first column learned and the track already moving
  if (!reduced) {
    for (const s of SCREENS) { learnColumn(s, 0, 0); for (const d of s.dots) if (d.c === 0) { d.learn.x = d.learn.t = 1; d.due = Infinity; } }
    for (let n = 0; n < 2; n++) { cards.push({ born: -n * SPAWN - 400, mode: "track", kind: kindNext }); kindNext = (kindNext + 1) % 3; }
  }
  draw(performance.now()); read(); wake();

  return {
    update(next = {}) {
      for (const k of Object.keys(next)) opts[k] = next[k] === undefined ? { intensity: 0.6, theme: "auto" }[k] : next[k];
      C = tokens(); lastRead = ""; draw(performance.now()); read(); wake();
    },
    destroy() {
      cancelAnimationFrame(raf); io.disconnect(); mq?.removeEventListener?.("change", onScheme);
      svg.removeEventListener("pointermove", onMove); svg.removeEventListener("pointerleave", onLeave);
      wrap.remove();
    },
  };
}
