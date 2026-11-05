/**
 * deploy-agents — a Hairline-style isometric line figure for Osfin.
 *
 * A conveyor line on legs. Work arrives as crates at the back of the belt and rides through
 * three agent gates; each gate lights as a crate passes under it and adds one mark to the
 * crate's top. Every fourth crate needs judgment: past the second gate it lifts off the belt to
 * a raised team ledge, waits there, then drops back into line and finishes. Finished crates sink
 * into the end of the belt.
 *
 * Plays on its own in a continuous loop. When the pointer enters, the belt stops and the
 * pointer drives it: moving left or right drags the line back and forth, and crates near the
 * pointer lift to be inspected. The loop resumes shortly after the pointer leaves.
 * Everything is a function of how far the belt has travelled, so autoplay and the pointer
 * always agree.
 *
 * No dependencies. SVG only. Follows Hairline's conventions:
 * viewBox 400x320, 2:1 isometric camera, strokes only (hi / edge / mid / lo tokens),
 * springs (k100 c18 m1), no text inside the drawing, read-out in a corner.
 * The loop sleeps when the figure is offscreen; reduced motion shows a still frame.
 *
 * Usage:
 *   import { deployAgents } from "./deploy-agents.js";
 *   const fig = deployAgents(document.getElementById("figure"), { intensity: 0.6 });
 *   fig.update({ intensity: 0.8 });
 *   fig.destroy();
 *
 * Theme tokens (CSS custom properties, set on the element or an ancestor):
 *   --hairline-plate  --hairline-hi  --hairline-edge  --hairline-mid  --hairline-lo  --hairline-stroke
 */

const LIGHT = { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4", stroke: 0.9 };
const DARK = { plate: "#111113", hi: "#f4f4f6", edge: "#6e6e77", mid: "#45454c", lo: "#2a2a30", stroke: 0.9 };

const X0 = -138, X1 = 138;    // belt ends (plane units, along x)
const BW = 17;                // belt half-width
const BZ = 30;                // belt top height
const BT = 6;                 // belt thickness
const GATES = [-74, -10, 84]; // agent gate positions along the belt
const GH = 46;                // gate height above the belt
const GY = 27;                // gate post offset from the belt centre
const LEDGE = { x: 37, y: -74, z: BZ + 52, half: 22 };   // the team ledge, raised beside the line
const CW = 8.5;               // crate half-size
const CH = 13;                // crate height
const SPACING = 52;           // distance between crates
const SPEED = 30;             // belt speed, units per second
const JUDGE_EVERY = 4;        // every fourth crate goes to the team
const IN0 = X0 + 22, OUT1 = X1 - 22;   // crates appear and sink back within these points
const RESUME = 900;

function spring(x) { return { x, v: 0, t: x }; }
function stepSpring(s, dt, k = 100, c = 18) {
  const a = k * (s.t - s.x) - c * s.v;
  s.v += a * dt; s.x += s.v * dt;
  if (Math.abs(s.t - s.x) < 0.001 && Math.abs(s.v) < 0.001) { s.x = s.t; s.v = 0; return false; }
  return true;
}
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

export function deployAgents(el, options = {}) {
  let opts = { intensity: 0.6, theme: "auto", label: "Agents running work along a line, bringing the team in only when judgment is needed", onRead: null, ...options };
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
  const cx = 198, cy = 200, S = 1.14;        // S scales the whole drawing up a touch
  const iso = (x, y, z) => [cx + (x - y) * 0.7071 * S, cy + ((x + y) * 0.35355 - z) * S];
  const f = (n) => n.toFixed(2);
  const sw = () => C.stroke;
  const path = (pts, close) => "M" + pts.map((p) => f(p[0]) + " " + f(p[1])).join("L") + (close ? "Z" : "");
  const seg = (a, b, stroke, w = sw(), extra = "") => `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;

  function rrect(x0, y0, x1, y1, r, z, steps = 5) {   // rounded rectangle in plane, projected
    const pts = [], c = [[x1 - r, y1 - r, 0], [x0 + r, y1 - r, 90], [x0 + r, y0 + r, 180], [x1 - r, y0 + r, 270]];
    for (const [ox, oy, a0] of c) for (let s = 0; s <= steps; s++) {
      const a = (a0 + (90 * s) / steps) * Math.PI / 180;
      pts.push(iso(ox + r * Math.cos(a), oy + r * Math.sin(a), z));
    }
    return pts;
  }
  function slab(x0, y0, x1, y1, r, z, h, stroke, steps) {   // bottom ring, two silhouette walls, top ring
    const bot = rrect(x0, y0, x1, y1, r, z, steps), top = bot.map((p) => [p[0], p[1] - h]);
    let L = bot[0], R = bot[0];
    for (const p of bot) { if (p[0] < L[0]) L = p; if (p[0] > R[0]) R = p; }
    return `<path d="${path(bot, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="M${f(L[0])} ${f(L[1])}V${f(L[1] - h)}M${f(R[0])} ${f(R[1])}V${f(R[1] - h)}" stroke="${stroke}" stroke-width="${sw()}"/>` +
      `<path d="${path(top, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}"/>`;
  }
  function crate(x, y, z, h, stroke, marks, markStroke) {   // a sharp box: three visible faces, marks on top
    const b = [[x + CW, y + CW], [x - CW, y + CW], [x - CW, y - CW], [x + CW, y - CW]];
    const bot = b.map(([px, py]) => iso(px, py, z)), top = b.map(([px, py]) => iso(px, py, z + h));
    // silhouette: left (-x,+y corner), front (+x,+y), right (+x,-y)
    const sil = [top[1], top[2], top[3], bot[3], bot[0], bot[1]];
    let out = `<path d="${path(sil, 1)}" fill="${C.plate}" stroke="${stroke}" stroke-width="${sw()}" stroke-linejoin="round"/>`;
    out += `<path d="M${f(top[1][0])} ${f(top[1][1])}L${f(top[0][0])} ${f(top[0][1])}L${f(top[3][0])} ${f(top[3][1])}M${f(top[0][0])} ${f(top[0][1])}L${f(bot[0][0])} ${f(bot[0][1])}" fill="none" stroke="${stroke}" stroke-width="${sw()}"/>`;
    for (let m = 0; m < marks; m++) {        // one short stroke per gate passed
      const t = -CW + 4 + m * ((2 * CW - 8) / 2);
      out += seg(iso(x + t, y - CW + 3.5, z + h), iso(x + t, y + CW - 3.5, z + h), markStroke);
    }
    return out;
  }

  // ---------- state: everything follows the belt's travel s ----------
  const travel = spring(0);
  let s = 0, hovering = false, resumeAt = 0, dragX = 0, dragS = 0, px = null, py = null;
  const hoverLift = new Map();

  function crates() {                        // positions of every crate on the line for the current travel
    const out = [];
    const first = Math.floor((s - (OUT1 - IN0)) / SPACING), lastN = Math.floor(s / SPACING);
    for (let n = first; n <= lastN + 1; n++) {
      const x = IN0 + (s - n * SPACING);
      if (x < IN0 - 1 || x > OUT1 + 1) continue;
      const judged = ((n % JUDGE_EVERY) + JUDGE_EVERY) % JUDGE_EVERY === 2;
      // the detour to the team: rises after gate 2, holds over the ledge, drops back before gate 3
      let e = 0;
      if (judged) e = smooth(GATES[1] + 8, LEDGE.x - 4, x) * (1 - smooth(LEDGE.x + 14, GATES[2] - 14, x));
      const grow = smooth(IN0, IN0 + 18, x) * (1 - smooth(OUT1 - 18, OUT1, x));   // rises out of the belt, sinks back in
      const marks = GATES.filter((g) => x > g + 2).length;
      out.push({ n, x, y: LEDGE.y * e, z: BZ + e * (LEDGE.z + 4 - BZ), h: CH * grow, e, judged, marks });
    }
    return out;
  }

  // ---------- draw ----------
  function draw() {
    const list = crates();
    const onLedge = list.find((c) => c.e > 0.85);
    let out = "";
    // floor marks under the legs and the ledge post: short ticks, no plinth
    const legs = [[X0 + 24, -BW + 4], [X0 + 24, BW - 4], [X1 - 24, -BW + 4], [X1 - 24, BW - 4], [0, -BW + 4], [0, BW - 4]];
    // the ledge (back, upper right): post, dashed guide down to the line, plate, the person marker
    const lp0 = iso(LEDGE.x, LEDGE.y, 0), lp1 = iso(LEDGE.x, LEDGE.y, LEDGE.z);
    out += seg(lp0, lp1, C.mid);
    out += seg(iso(LEDGE.x - 6, LEDGE.y, 0), iso(LEDGE.x + 6, LEDGE.y, 0), C.lo);
    out += seg(iso(LEDGE.x, LEDGE.y + LEDGE.half, LEDGE.z), iso(LEDGE.x, -BW - 2, BZ), onLedge ? C.edge : C.lo, sw(), ' stroke-dasharray="2.5 2.5"');
    const L = LEDGE;
    out += slab(L.x - L.half, L.y - L.half, L.x + L.half, L.y + L.half, 5, L.z, 4, onLedge ? C.hi : C.edge, 4);
    const pm = iso(L.x - 15, L.y - 15, L.z + 4);
    out += `<circle cx="${f(pm[0])}" cy="${f(pm[1] - 6)}" r="2.6" fill="${onLedge ? C.hi : C.plate}" stroke="${onLedge ? C.hi : C.mid}" stroke-width="${sw()}"/>`;
    out += seg([pm[0], pm[1] - 3], [pm[0], pm[1] + 1], onLedge ? C.hi : C.mid);
    // back posts of the gates
    for (const g of GATES) out += seg(iso(g, -GY, BZ - BT), iso(g, -GY, BZ + GH), C.mid) + seg(iso(g, -GY, BZ - BT), iso(g, -BW, BZ - BT), C.mid);
    // legs behind the belt
    for (const [x, y] of legs) if (y < 0) out += seg(iso(x, y, 0), iso(x, y, BZ - BT), C.mid);
    // the belt: a long rounded slab, slats travelling across its top
    out += slab(X0, -BW, X1, BW, BW - 1, BZ - BT, BT, C.edge, 6);
    const pitch = 13, off = ((s % pitch) + pitch) % pitch;
    for (let x = X0 + BW + off; x < X1 - BW; x += pitch) out += seg(iso(x, -BW + 3, BZ), iso(x, BW - 3, BZ), C.lo);
    // legs in front of the belt
    for (const [x, y] of legs) if (y > 0) out += seg(iso(x, y, 0), iso(x, y, BZ - BT), C.mid);
    // crates on the belt, back to front; the lifted one is drawn later, above everything
    const under = (c) => GATES.some((g) => Math.abs(c.x - g) < CW + 3) && c.e < 0.1;
    for (const c of list.filter((c) => c.e < 0.02).sort((a, b) => a.x - b.x)) {
      const lift = hoverLift.get(c.n)?.x || 0;
      const hot = under(c);
      if (c.h < 0.5) continue;
      out += crate(c.x, c.y, c.z + lift, c.h, hot || c.marks === 3 ? C.edge : C.mid, c.marks, hot ? C.hi : C.edge);
    }
    // gates: front posts and beams; a beam lights while a crate passes under it
    for (const g of GATES) {
      const busy = list.some((c) => Math.abs(c.x - g) < CW + 3 && c.e < 0.1);
      out += seg(iso(g, GY, BZ - BT), iso(g, BW, BZ - BT), C.mid) + seg(iso(g, GY, BZ - BT), iso(g, GY, BZ + GH), busy ? C.edge : C.mid);
      out += seg(iso(g, -GY, BZ + GH), iso(g, GY, BZ + GH), busy ? C.hi : C.edge, busy ? sw() * 1.4 : sw());
      const eye = iso(g, 0, BZ + GH);         // the agent's sensor, at the centre of the beam
      out += `<circle cx="${f(eye[0])}" cy="${f(eye[1])}" r="2.4" fill="${busy ? C.hi : C.plate}" stroke="${busy ? C.hi : C.edge}" stroke-width="${sw()}"/>`;
      if (busy) out += seg(iso(g, 0, BZ + GH - 3), iso(g, 0, BZ + CH + 3), C.hi, sw(), ' stroke-dasharray="1.5 2.5"');
    }
    // the crate on its way to, at, or back from the team
    for (const c of list.filter((c) => c.e >= 0.02)) {
      const lift = hoverLift.get(c.n)?.x || 0;
      out += crate(c.x, c.y, c.z + lift, c.h, C.hi, c.marks, C.hi);
    }
    svg.innerHTML = out;
    return { list, onLedge };
  }

  // ---------- read-out ----------
  let lastRead = "";
  function read(state) {
    const done = Math.max(0, Math.floor((s - (OUT1 - IN0)) / SPACING) + 1);
    const txt = (hovering ? "" : "auto · ") + (state.onLedge ? "judgment · team" : `running · ${done} done`);
    if (txt !== lastRead) {
      lastRead = txt; readout.textContent = txt; readout.style.color = C.edge;
      svg.setAttribute("aria-label", `${opts.label}. ${txt}`);
      opts.onRead?.(txt);
    }
  }

  // ---------- motion ----------
  let raf = 0, last = 0, visible = true;
  const START = SPACING * 9 + 18;            // open on a full line, with one crate already up with the team
  travel.x = travel.t = START; s = START;
  function tick(now) {
    raf = 0;
    const dt = Math.min(0.033, (now - (last || now)) / 1000); last = now;
    let moving = false;
    if (!reduced) {
      if (!hovering && now >= resumeAt) { travel.t += SPEED * dt; travel.x = travel.t; travel.v = SPEED; moving = true; }
      else moving = stepSpring(travel, dt, 60, 16) || moving;
      s = travel.x;
      // crates near the pointer lift to be inspected
      const list = crates();
      for (const c of list) {
        let sp = hoverLift.get(c.n); if (!sp) { sp = spring(0); hoverLift.set(c.n, sp); }
        let t = 0;
        if (hovering && px !== null) {
          const d = Math.hypot(c.x - px, c.y - py), reach = 14;
          t = (d < reach ? 1 : Math.max(0, 1 - (d - reach) / 26)) * (6 + clamp01(opts.intensity) * 10);
        }
        sp.t = t; moving = stepSpring(sp, dt) || moving;
      }
      for (const n of hoverLift.keys()) if (!list.some((c) => c.n === n)) hoverLift.delete(n);
    }
    read(draw());
    if ((moving || hovering) && visible && !reduced) raf = requestAnimationFrame(tick); else last = 0;
  }
  function wake() { if (!raf && visible) raf = requestAnimationFrame(tick); }

  // ---------- pointer: the loop stops; dragging left or right moves the line ----------
  function onMove(e) {
    const r = svg.getBoundingClientRect();
    const X = ((e.clientX - r.left) / r.width) * 400, Y = ((e.clientY - r.top) / r.height) * 320;
    if (!hovering) { hovering = true; dragX = X; dragS = travel.t; travel.v = 0; }
    travel.t = dragS + (X - dragX) * 1.1;   // follow the pointer along the line's screen direction
    const d = (X - cx) / (0.7071 * S), s2 = ((Y - cy) / S + BZ) / 0.35355;     // hit test on the belt's rest plane
    px = (s2 + d) / 2; py = (s2 - d) / 2;
    wake();
  }
  function onLeave() { hovering = false; px = py = null; resumeAt = performance.now() + RESUME; wake(); }
  svg.addEventListener("pointermove", onMove);
  svg.addEventListener("pointerleave", onLeave);

  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) wake(); });
  io.observe(wrap);
  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  const onScheme = () => { C = tokens(); lastRead = ""; read(draw()); };
  mq?.addEventListener?.("change", onScheme);

  read(draw()); wake();

  return {
    update(next = {}) {
      for (const k of Object.keys(next)) opts[k] = next[k] === undefined ? { intensity: 0.6, theme: "auto" }[k] : next[k];
      C = tokens(); lastRead = ""; read(draw()); wake();
    },
    destroy() {
      cancelAnimationFrame(raf); io.disconnect(); mq?.removeEventListener?.("change", onScheme);
      svg.removeEventListener("pointermove", onMove); svg.removeEventListener("pointerleave", onLeave);
      wrap.remove();
    },
  };
}
