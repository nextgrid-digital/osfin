/**
 * driver-seat — a Hairline-style isometric line figure for Osfin.
 *
 * A small control yard. Agent tokens circle a fenced track on a board: the fence is your
 * internal policies, and when an agent drifts toward it that stretch of fence lights and the
 * agent is nudged back into its lane. A checkpoint gate sits on the track. Routine actions clear
 * the gate on their own; when an action needs oversight, the gate holds the agent, a signal runs
 * to the driver's seat (a chair with a lever), the lever is pulled to approve, and the barrier
 * lifts. Every action is recorded: a pulse runs along a fixed route (across the board, down its
 * edge, along the floor) to the ledger stack, where a new tray fades in as it lowers, the stack
 * eases down with it and the oldest tray sinks away. Approved actions carry a second mark.
 * Nothing moves through the air: every signal and record travels along a run.
 *
 * Plays on its own in a continuous, unhurried loop. When the pointer enters, the automatic gate
 * stops and the pointer is the driver: moving left to right pulls the lever, opening and closing
 * the gate, and the agents queue or pass to match. Over the ledger, the pointer inspects the audit
 * trail instead: the stack fans open and the tray at the pointer's height slides out. The loop
 * resumes shortly after the pointer leaves. It sleeps offscreen; reduced motion shows a still frame.
 *
 * No dependencies. SVG only. Follows Hairline's conventions:
 * viewBox 400x400 (square, to fill a tall section), 2:1 isometric camera, strokes only (hi / edge / mid / lo tokens),
 * springs (k100 c18 m1), no text inside the drawing, read-out in a corner.
 *
 * Usage:
 *   import { driverSeat } from "./driver-seat.js";
 *   const fig = driverSeat(document.getElementById("figure"), { intensity: 0.6 });
 *   fig.update({ intensity: 0.8 });
 *   fig.destroy();
 *
 * Theme tokens (CSS custom properties, set on the element or an ancestor):
 *   --hairline-plate  --hairline-hi  --hairline-edge  --hairline-mid  --hairline-lo  --hairline-stroke
 */

const LIGHT = { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", stroke: 0.9 };
const DARK = { plate: "#111113", hi: "#f4f4f6", edge: "#6e6e77", mid: "#45454c", lo: "#2a2a30", stroke: 0.9 };

const BOARD = { x0: -66, y0: -62, x1: 72, y1: 122, r: 14, t: 5 };   // the ledger stands on its left wing
const LOOP = { x0: -40, y0: -40, x1: 40, y1: 40, r: 24 };    // track centreline
const LANE = 10;                                              // half-width between the fences
const FENCE = 4;                                              // fence height
const AGENTS = 3, AR = 4.5, AH = 10;                          // agent token radius and height
const SPEED = 20;                                             // units per second: unhurried
const SPACING = 40;                                           // minimum gap between agents
const GATE_Y = 0;                                             // gate on the right-hand straight
const FLAG_EVERY = 3;                                         // every third action needs a person
// the audit trail: three stacks of trays, one per kind of record
const STACKS = [
  { x: -38, y: 94, kind: "audit trail" },      // every action, approvals marked
];
const ST = { hx: 17, hy: 21, pitch: 10, trays: 16, drop: 24, fan: 1.18, pull: 16 };
const DROP_MS = 1300;                        // how long a new tray takes to settle
const CONSOLE = { x: 100, y: -4 }, SEAT = { x: 123, y: -4 };   // to the right, facing the board
// timing, ms
const CHECK = 800, SIGNAL = 1100, DECIDE = 1100, LOG_TRAVEL = 1600, RESUME = 900;

function spring(x) { return { x, v: 0, t: x }; }
function stepSpring(s, dt, k = 100, c = 18) {
  const a = k * (s.t - s.x) - c * s.v;
  s.v += a * dt; s.x += s.v * dt;
  if (Math.abs(s.t - s.x) < 0.001 && Math.abs(s.v) < 0.001) { s.x = s.t; s.v = 0; return false; }
  return true;
}
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t) => { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

export function driverSeat(el, options = {}) {
  let opts = { intensity: 0.6, theme: "auto", label: "Agents kept inside policy fences, a gate that routes decisions to a person, and a ledger of every action", onRead: null, ...options };
  const clamp01 = (v) => (typeof v === "number" && !Number.isNaN(v) ? clamp(v) : 0.6);
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // ---------- DOM ----------
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:relative;width:100%;aspect-ratio:1/1;touch-action:none;";   // square: fills a tall section without going wide
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 400 400");
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
  const cx = 214, cy = 268, S = 1.2;          // S scales the drawing to fill the tall frame
  const iso = (x, y, z) => [cx + (x - y) * 0.7071 * S, cy + ((x + y) * 0.35355 - z) * S];
  const f = (n) => n.toFixed(2);
  const sw = () => C.stroke;
  const path = (pts, close) => "M" + pts.map((p) => f(p[0]) + " " + f(p[1])).join("L") + (close ? "Z" : "");
  const seg = (a, b, stroke, w = sw(), extra = "") => `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
  const dot = (p, r, fill, stroke) => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${r}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw()}"` : ""}/>`;
  const TOP = BOARD.t;                       // board surface height

  function rr2(a0, b0, a1, b1, r, steps = 6) {     // rounded rectangle in plane
    const pts = [], c = [[a1 - r, b1 - r, 0], [a0 + r, b1 - r, 90], [a0 + r, b0 + r, 180], [a1 - r, b0 + r, 270]];
    for (const [oa, ob, d0] of c) for (let s = 0; s <= steps; s++) {
      const t = (d0 + (90 * s) / steps) * Math.PI / 180;
      pts.push([oa + r * Math.cos(t), ob + r * Math.sin(t)]);
    }
    return pts;
  }
  function slab(x0, y0, x1, y1, r, z, h, stroke, steps = 5) {
    const bot = rr2(x0, y0, x1, y1, r, steps).map(([x, y]) => iso(x, y, z)), top = bot.map((p) => [p[0], p[1] - h * S]);
    let L = bot[0], R = bot[0];
    for (const p of bot) { if (p[0] < L[0]) L = p; if (p[0] > R[0]) R = p; }
    return `<path d="${path(bot, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="M${f(L[0])} ${f(L[1])}V${f(L[1] - h * S)}M${f(R[0])} ${f(R[1])}V${f(R[1] - h * S)}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="${path(top, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>`;
  }
  function box(x, y, z, hx, hy, h, stroke) {   // a sharp box: silhouette + front edges
    const b = [[x + hx, y + hy], [x - hx, y + hy], [x - hx, y - hy], [x + hx, y - hy]];
    const bot = b.map(([px, py]) => iso(px, py, z)), top = b.map(([px, py]) => iso(px, py, z + h));
    const sil = [top[1], top[2], top[3], bot[3], bot[0], bot[1]];
    return `<path d="${path(sil, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}" stroke-linejoin="round"/>` +
      `<path d="M${f(top[1][0])} ${f(top[1][1])}L${f(top[0][0])} ${f(top[0][1])}L${f(top[3][0])} ${f(top[3][1])}M${f(top[0][0])} ${f(top[0][1])}L${f(bot[0][0])} ${f(bot[0][1])}" fill="none" stroke="${stroke}" stroke-width="${sw()}"/>`;
  }
  function token(x, y, z, stroke, lit) {      // an agent: a short cylinder with a dot on top
    const ring = (zz) => Array.from({ length: 20 }, (_, k) => { const a = (k / 20) * 2 * Math.PI; return iso(x + AR * Math.cos(a), y + AR * Math.sin(a), zz); });
    const b = ring(z), t = ring(z + AH);
    const L = iso(x - AR * 0.7071, y + AR * 0.7071, z), R = iso(x + AR * 0.7071, y - AR * 0.7071, z);
    let out = `<path d="${path(b, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>`;
    out += `<path d="M${f(L[0])} ${f(L[1])}L${f(L[0])} ${f(L[1] - AH * S)}L${f(R[0])} ${f(R[1] - AH * S)}L${f(R[0])} ${f(R[1])}Z" fill="${C.plate}" stroke="none"/>`;
    out += seg(L, [L[0], L[1] - AH * S], stroke) + seg(R, [R[0], R[1] - AH * S], stroke);
    out += `<path d="${path(t, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>`;
    out += dot(iso(x, y, z + AH), lit ? 1.9 : 1.3, lit ? C.hi : stroke);
    return out;
  }

  // ---------- the track as a polyline with lengths, tangents and normals ----------
  const centre = rr2(LOOP.x0, LOOP.y0, LOOP.x1, LOOP.y1, LOOP.r, 14);
  const cum = [0];
  for (let k = 1; k <= centre.length; k++) { const a = centre[k - 1], b = centre[k % centre.length]; cum.push(cum[k - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); }
  const PER = cum[cum.length - 1];
  function at(s) {                           // point, tangent and outward normal at arc length s
    s = ((s % PER) + PER) % PER;
    let k = 1; while (k < cum.length - 1 && cum[k] < s) k++;
    const a = centre[k - 1], b = centre[k % centre.length], t = (s - cum[k - 1]) / (cum[k] - cum[k - 1] || 1);
    const tx = b[0] - a[0], ty = b[1] - a[1], L = Math.hypot(tx, ty) || 1;
    return { x: a[0] + tx * t, y: a[1] + ty * t, tx: tx / L, ty: ty / L, nx: ty / L, ny: -tx / L };
  }
  // the gate sits where the centreline crosses (LOOP.x1, GATE_Y)
  let S_GATE = 0;
  { let best = 1e9; for (let s = 0; s < PER; s += 0.5) { const p = at(s), d = Math.hypot(p.x - LOOP.x1, p.y - GATE_Y); if (d < best) { best = d; S_GATE = s; } } }
  const G = at(S_GATE);                       // outward normal here points +y (towards the viewer)
  const fenceSide = (side) => Array.from({ length: Math.ceil(PER / 4) }, (_, k) => { const p = at(k * 4); return [p.x + p.nx * LANE * side, p.y + p.ny * LANE * side]; });
  const FENCES = { out: fenceSide(1), in: fenceSide(-1) };

  // ---------- state ----------
  const agents = Array.from({ length: AGENTS }, (_, i) => ({ s: S_GATE - 40 - i * (PER / AGENTS), off: 0, ph: i * 1.7, flagged: false }));
  let clock = 0, gate = { state: "idle", at: 0, who: -1 }, passes = 1, logged = 0, hovering = false, resumeAt = 0, manualOpen = 0;
  const barrier = spring(0), lever = spring(0);   // barrier 0 down, 1 up; lever 0 back, 1 forward
  const hits = [];                            // fence lights: { s, side, at }
  const logs = [];                            // pulses on the way to the ledger
  // each stack: its trays (newest first), a drop in progress, a fan spring, and a pull spring per tray
  for (const st of STACKS) {
    st.trays = Array.from({ length: ST.trays + 1 }, (_, k) => ({ approved: k % 3 === 1 }));
    st.dropAt = -1e9; st.fan = spring(1); st.pull = Array.from({ length: ST.trays + 1 }, () => spring(0));
  }
  let inspect = null;                          // { stack, slot } while the pointer is over a stack
  let lastCall = "running";

  // ---------- draw ----------
  const BOOTH = { x: G.x + G.nx * (LANE + 9) - G.tx * 13, y: G.y + G.ny * (LANE + 9) - G.ty * 13 };
  // floor routes from the booth to each stack's front
  const FY = LOOP.y1 + LANE + 9;               // the front gutter, on the board
  const routeTo = (st) => [[BOOTH.x, BOOTH.y + 5, TOP], [BOOTH.x, FY, TOP], [st.x, FY, TOP], [st.x, st.y - ST.hy - 5, TOP]];   // stays on the board, ends at the ledger
  // the signal run from the booth to the seat's console: across the board, down its edge, along the floor
  const SIGNAL_RUN = [[BOOTH.x + 5, BOOTH.y, TOP], [BOARD.x1, BOOTH.y, TOP], [BOARD.x1, BOOTH.y, 0], [CONSOLE.x - 14, BOOTH.y, 0], [CONSOLE.x - 14, CONSOLE.y, 0], [CONSOLE.x - 7, CONSOLE.y, 0]];
  const polyLen = (P) => P.slice(1).reduce((t, p, n) => t + Math.hypot(p[0] - P[n][0], p[1] - P[n][1], p[2] - P[n][2]), 0);
  function alongPoly(P, u) {
    let d = clamp(u) * polyLen(P);
    for (let n = 1; n < P.length; n++) {
      const a = P[n - 1], b = P[n], L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      if (d <= L) return [a[0] + (b[0] - a[0]) * d / L, a[1] + (b[1] - a[1]) * d / L, a[2] + (b[2] - a[2]) * d / L];
      d -= L;
    }
    return P[P.length - 1];
  }
  const LZ = TOP;                             // the ledger stands on the board's left wing
  const stackTop = (st) => LZ + 6 + ST.trays * ST.pitch * st.fan.x;

  function drawStack(st) {
    let out = slab(st.x - ST.hx - 3, st.y - ST.hy - 3, st.x + ST.hx + 3, st.y + ST.hy + 3, 3, LZ, 5, C.edge);
    const pitch = ST.pitch * st.fan.x, top = stackTop(st);
    const corners = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => [st.x + a * (ST.hx + 1), st.y + b * (ST.hy + 1)]);
    for (const [px, py] of corners.slice(0, 3)) out += seg(iso(px, py, LZ + 5), iso(px, py, top + 4), C.lo);
    // a new tray fades in as it lowers, the stack eases down one step with it, the oldest sinks away
    const e = easeInOut((clock - st.dropAt) / DROP_MS), sh = 1 - e;
    for (let slot = ST.trays; slot >= 0; slot--) {
      let z = LZ + 6 + (ST.trays - 1 - slot + sh) * pitch, op = 1;
      if (slot === 0) { z = LZ + 6 + (ST.trays - 1) * pitch + sh * ST.drop; op = e; }
      if (slot === ST.trays) { op = sh; if (op < 0.02) continue; }
      const y = st.y + st.pull[slot].x, lit = inspect && inspect.stack === st && inspect.slot === slot;
      const stroke = lit ? C.hi : slot === 0 ? C.hi : slot < 3 ? C.edge : C.mid;
      out += `<g opacity="${op.toFixed(3)}">` + slab(st.x - ST.hx, y - ST.hy, st.x + ST.hx, y + ST.hy, 2, z, 1.3, stroke, 2);
      out += seg(iso(st.x - ST.hx + 4, y + ST.hy - 5, z + 1.3), iso(st.x + 3, y + ST.hy - 5, z + 1.3), lit || slot === 0 ? C.edge : C.lo);
      if (st.trays[slot].approved) out += seg(iso(st.x - ST.hx + 4, y + ST.hy - 9, z + 1.3), iso(st.x - 4, y + ST.hy - 9, z + 1.3), lit || slot === 0 ? C.hi : C.edge, sw() * 1.2);
      out += "</g>";
    }
    out += seg(iso(corners[3][0], corners[3][1], LZ + 5), iso(corners[3][0], corners[3][1], top + 4), C.lo);
    return out;
  }

  function draw() {
    let out = "";
    const routed = gate.state === "routed" || gate.state === "deciding";
    const you = routed || hovering;
    // the stacks, back to front
    // the board
    out += slab(BOARD.x0, BOARD.y0, BOARD.x1, BOARD.y1, BOARD.r, 0, BOARD.t, C.edge, 6);
    // floor routes to the stacks, darker while a record travels along them
    for (const st of STACKS) {
      const busy = logs.some((lg) => lg.stack === st);
      out += `<path d="${path(routeTo(st).map(([x, y, z]) => iso(x, y, z)))}" fill="none" stroke="${busy ? C.edge : C.lo}" stroke-width="${sw()}" stroke-dasharray="2.5 2.5"/>`;
    }
    // fences: a rail with short posts; a stretch lights where an agent was nudged back inside policy
    for (const side of ["in", "out"]) {
      const pts = FENCES[side], sgn = side === "out" ? 1 : -1;
      out += `<path d="${path(pts.map(([x, y]) => iso(x, y, TOP + FENCE)), 1)}" fill="none" stroke="${C.mid}" stroke-width="${sw()}"/>`;
      for (let k = 0; k < pts.length; k += 4) out += seg(iso(pts[k][0], pts[k][1], TOP), iso(pts[k][0], pts[k][1], TOP + FENCE), C.lo);
      for (const h of hits) {
        if (h.side !== sgn) continue;
        const age = clock - h.at; if (age > 900) continue;
        const lit = [];
        for (let d = -10; d <= 10; d += 2) { const p = at(h.s + d); lit.push(iso(p.x + p.nx * LANE * sgn, p.y + p.ny * LANE * sgn, TOP + FENCE)); }
        out += `<path d="${path(lit)}" fill="none" stroke="${age < 600 ? C.hi : C.edge}" stroke-width="${sw() * 1.4}" stroke-linecap="round"/>`;
      }
    }
    // gate: far post, agents, then the near post, booth and barrier
    const pIn = [G.x - G.nx * (LANE + 3), G.y - G.ny * (LANE + 3)], pOut = [G.x + G.nx * (LANE + 3), G.y + G.ny * (LANE + 3)], PH = 13;
    out += seg(iso(pIn[0], pIn[1], TOP), iso(pIn[0], pIn[1], TOP + PH), C.edge);
    const items = agents.map((a, i) => { const p = at(a.s); return { kind: "agent", i, x: p.x + p.nx * a.off, y: p.y + p.ny * a.off }; });
    items.push({ kind: "gate", x: pOut[0], y: pOut[1] });
    items.sort((p, q) => (p.x + p.y) - (q.x + q.y));
    for (const it of items) {
      if (it.kind === "agent") {
        const held = gate.who === it.i && gate.state !== "idle";
        out += token(it.x, it.y, TOP, held ? C.hi : C.edge, held);
        continue;
      }
      out += seg(iso(pOut[0], pOut[1], TOP), iso(pOut[0], pOut[1], TOP + PH), C.edge);
      // barrier: pivots on the near post, lies across the lane when down, swings up to open
      const a = barrier.x * (Math.PI / 2) * 0.94, len = 2 * LANE + 7;
      const end = iso(pOut[0] - G.nx * Math.cos(a) * len, pOut[1] - G.ny * Math.cos(a) * len, TOP + PH + Math.sin(a) * len);
      out += seg(iso(pOut[0], pOut[1], TOP + PH), end, barrier.x < 0.1 ? C.hi : C.edge, sw() * 1.6);
      out += dot(iso(pOut[0], pOut[1], TOP + PH), 1.8, C.plate, C.edge);
      // the booth beside it, with a lamp that lights when the check passes
      out += box(BOOTH.x, BOOTH.y, TOP, 5, 5, 14, routed ? C.hi : C.edge);
      out += dot(iso(BOOTH.x + 5, BOOTH.y, TOP + 10), 1.7, gate.state === "check" || gate.state === "open" ? C.hi : C.plate, C.edge);
    }
    for (const st of STACKS) out += drawStack(st);
    // the signal from the booth down to the seat while a decision is routed to a person
    out += `<path d="${path(SIGNAL_RUN.map(([x, y, z]) => iso(x, y, z)))}" fill="none" stroke="${routed ? C.hi : C.lo}" stroke-width="${sw()}" stroke-dasharray="2.5 2.5"/>`;
    if (gate.state === "routed") { const q = alongPoly(SIGNAL_RUN, easeInOut((clock - gate.at) / SIGNAL)); out += dot(iso(q[0], q[1], q[2]), 2.4, C.hi); }
    // the console with its lever
    out += box(CONSOLE.x, CONSOLE.y, 0, 7, 12, 16, you ? C.edge : C.mid);
    const la = (lever.x - 0.5) * 1.2, lb = iso(CONSOLE.x, CONSOLE.y, 16);
    const le = iso(CONSOLE.x - Math.sin(la) * 15, CONSOLE.y, 16 + Math.cos(la) * 15);
    out += seg(lb, le, you ? C.hi : C.edge, sw() * 1.4);
    out += dot(le, 2.7, you ? C.hi : C.plate, you ? C.hi : C.edge);
    // records on their way to the ledger, along the run
    for (const lg of logs) {
      const u = clamp((clock - lg.at) / LOG_TRAVEL);
      let p;
      p = alongPoly(routeTo(lg.stack), easeInOut(u)); out += dot(iso(p[0], p[1], p[2]), 2.3, C.hi);
    }
    svg.innerHTML = out;
  }

  // ---------- read-out ----------
  let lastRead = "";
  function read() {
    const routed = gate.state === "routed" || gate.state === "deciding";
    const txt = inspect ? `audit · record ${inspect.slot + 1} of ${ST.trays}${inspect.stack.trays[inspect.slot].approved ? " · approved by you" : ""}` : hovering ? `you · gate ${barrier.t > 0.5 ? "open" : "closed"} · ${logged} logged`
      : routed ? `auto · routed to you · ${logged} logged` : `auto · within policy · ${logged} logged`;
    if (txt !== lastRead) {
      lastRead = txt; readout.textContent = txt; readout.style.color = C.edge;
      svg.setAttribute("aria-label", `${opts.label}. ${txt}`);
      opts.onRead?.(txt);
    }
  }

  // ---------- motion ----------
  function nextGate(s) { return S_GATE + Math.ceil((s - S_GATE + 0.001) / PER) * PER; }
  function logAction(approved) { logs.push({ at: clock, stack: STACKS[0], approved }); }

  function step(dt) {
    const ms = dt * 1000; clock += ms;
    // gate logic (automatic unless the pointer is the driver)
    const auto = !hovering && performance.now() >= resumeAt;
    if (auto) {
      if (gate.state === "idle") {
        for (let i = 0; i < AGENTS; i++) {
          const a = agents[i], d = nextGate(a.s) - a.s;
          if (d < 14) { passes++; a.flagged = passes % FLAG_EVERY === 0; gate = { state: a.flagged ? "routed" : "check", at: clock, who: i }; break; }
        }
      } else if (gate.state === "check" && clock - gate.at > CHECK) { gate.state = "open"; gate.at = clock; barrier.t = 1; }
      else if (gate.state === "routed" && clock - gate.at > SIGNAL) { gate.state = "deciding"; gate.at = clock; lever.t = 1; }
      else if (gate.state === "deciding" && clock - gate.at > DECIDE) { gate.state = "open"; gate.at = clock; barrier.t = 1; }
      if (gate.state === "open") {
        const a = agents[gate.who];
        if (a && a.s > a.passFrom + 26) { logAction(a.flagged); gate = { state: "idle", at: clock, who: -1 }; barrier.t = 0; lever.t = 0; }
      }
    } else if (hovering) {
      barrier.t = manualOpen;
      lever.t = manualOpen;
    }
    // agents move along the track, keeping their spacing and stopping at a closed gate
    for (let i = 0; i < AGENTS; i++) {
      const a = agents[i], ahead = agents[(i + AGENTS - 1) % AGENTS];
      let target = a.s + SPEED * dt;
      const limit = ahead.s + (i === 0 ? PER : 0) - SPACING;
      target = Math.min(target, limit);
      const g = nextGate(a.s), open = barrier.x > 0.85 && (hovering || gate.who === i);
      if (!open && g - a.s < 40) target = Math.min(target, g - 13);
      if (open && a.passFrom === undefined) a.passFrom = g - 13;
      const before = a.s; a.s = Math.max(a.s, target);
      if (hovering && Math.floor((before - S_GATE) / PER) !== Math.floor((a.s - S_GATE) / PER)) logAction(false);
      if (gate.who !== i || gate.state === "idle") a.passFrom = undefined;
      // drift toward the fences, nudged back at the policy line
      const want = Math.sin(clock / 1000 * 0.55 + a.ph) * (LANE - AR + 3) * (0.6 + clamp01(opts.intensity) * 0.5);
      const lim = LANE - AR - 1.2;
      if (Math.abs(want) > lim) {
        a.off = Math.sign(want) * lim;
        const side = Math.sign(want);
        if (!a.hitAt || clock - a.hitAt > 6000) {
          hits.push({ s: a.s, side, at: clock }); a.hitAt = clock;
        }
      } else a.off = want;
    }
    while (hits.length && clock - hits[0].at > 1000) hits.shift();
    // logs arrive at the ledger: a new sheet drops on top, the stack shifts down one
    for (const lg of [...logs]) if (clock - lg.at >= LOG_TRAVEL) {
      const st = lg.stack;
      if (clock - st.dropAt < DROP_MS) st.dropAt = clock - DROP_MS;          // finish any drop still running
      st.trays.unshift({ approved: lg.approved }); st.trays.length = ST.trays + 1; st.dropAt = clock; logged++;
      logs.splice(logs.indexOf(lg), 1);
    }
    stepSpring(barrier, dt, 60, 15); stepSpring(lever, dt, 70, 14);
    for (const st of STACKS) {
      st.fan.t = inspect && inspect.stack === st ? ST.fan : 1;
      stepSpring(st.fan, dt, 80, 16);
      st.pull.forEach((sp, slot) => { sp.t = inspect && inspect.stack === st && inspect.slot === slot ? ST.pull : 0; stepSpring(sp, dt); });
    }
  }

  let raf = 0, last = 0, visible = true;
  function tick(now) {
    raf = 0;
    const dt = Math.min(0.033, (now - (last || now)) / 1000); last = now;
    if (!reduced) step(dt);
    draw(); read();
    if (!reduced && visible) raf = requestAnimationFrame(tick); else last = 0;
  }
  function wake() { if (!raf && visible) raf = requestAnimationFrame(tick); }

  // ---------- pointer: you are the driver; left to right pulls the lever and opens the gate ----------
  function onMove(e) {
    const r = svg.getBoundingClientRect();
    const X = ((e.clientX - r.left) / r.width) * 400, Y = ((e.clientY - r.top) / r.height) * 400;
    if (!hovering) { hovering = true; gate = { state: "idle", at: clock, who: -1 }; }
    // over a stack? fan it open and pull out the tray at the pointer's height (hit test on the rest pose)
    inspect = null;
    for (const st of STACKS) {
      const base = iso(st.x, st.y, LZ + 6), restTop = LZ + 6 + ST.trays * ST.pitch;
      const top = iso(st.x, st.y, LZ + 6 + ST.trays * ST.pitch * ST.fan);
      if (Math.abs(X - base[0]) < 30 && Y < base[1] + 12 && Y > top[1] - 14) {
        const z = (base[1] - Y) / S + LZ + 6, pitch = ST.pitch * ST.fan;   // the hovered stack is (or soon will be) fanned open
        const slot = clamp(Math.round(ST.trays - 1 - (z - LZ - 6) / pitch), 0, ST.trays - 1);
        inspect = { stack: st, slot }; void restTop; break;
      }
    }
    if (!inspect) manualOpen = X > 200 ? 1 : 0;
    wake();
  }
  function onLeave() { hovering = false; inspect = null; resumeAt = performance.now() + RESUME; barrier.t = 0; lever.t = 0; wake(); }
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
