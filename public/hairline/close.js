/**
 * Close: a shallow tray of five exposure plates under a floating lid.
 * Ambient cycle raises unresolved plates in turn, then settles and closes.
 * Hover inspects a plate or the lid.
 */
const {
  Cam, clamp, fit, proj, facing, rings, prism, solid, put, mk, seg,
  spring, stepS, pointer, register, disposer, reducedMotion, lerp,
} = HL;

const N = 5;
const W = 42;
const G = 7;
const TK = 1.6;
const TX0 = -4;
const TX1 = W + 4;
const TY0 = -6;
const TY1 = (N - 1) * G + 10;
const WH = 8;
const WR = 4;
const WT = 2;
const LID_Z = 48;
const PLATE_H = 34;
const CYCLE = 8;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let slowRate = value;
  let clock = 0;
  let hover = -1; // -1 rest, 0..N-1 plate, N = lid
  const rate = spring(1, { eps: 2e-3 });

  const C = Cam(45, 0.5, 3.2);
  fit(C, [
    [TX0 - 4, TY0 - 4, 0], [TX1 + 4, TY1 + 4, 0],
    [TX1 + 4, TY0 - 4, 0], [TX0 - 4, TY1 + 4, 0],
    [TX0, TY0, LID_Z + 4], [TX1, TY1, LID_Z + 4],
  ], 200, 166);
  const P = proj(C);
  const front = facing(C);
  const g = mk("g", {}, svg);

  // Tray (far)
  {
    const outer = rings(TX0, TY0, TX1, TY1, WR, 1.1);
    put(solid(g), prism(P, front, outer[0], outer[1], 0, WH));
    const floor = rings(TX0 + WT, TY0 + WT, TX1 - WT, TY1 - WT, WR - WT, 0.8);
    put(solid(g), prism(P, front, floor[0], floor[1], WH - 1.2, WH));
  }

  const guides = mk("path", { class: "lo dash nf" }, g);
  guides.setAttribute("d", [
    seg(P(TX0 + 2, TY0 + 2, WH), P(TX0 + 2, TY0 + 2, LID_Z)),
    seg(P(TX1 - 2, TY0 + 2, WH), P(TX1 - 2, TY0 + 2, LID_Z)),
    seg(P(TX0 + 2, TY1 - 2, WH), P(TX0 + 2, TY1 - 2, LID_Z)),
    seg(P(TX1 - 2, TY1 - 2, WH), P(TX1 - 2, TY1 - 2, LID_Z)),
  ].join(""));

  const layer = mk("g", {}, g);
  const lid = solid(layer);
  const [lR, lI] = rings(TX0 + 1, TY0 + 1, TX1 - 1, TY1 - 1, 3, 1);

  // Plates created far→near (ascending y)
  const plates = [];
  for (let i = 0; i < N; i++) {
    plates.push({ i, el: solid(layer), y: i * G + 2 });
  }

  function platePose(i, lift) {
    const y = i * G + 2;
    const z0 = WH + lift;
    const [ring, inner] = rings(6, y, W - 2, y + TK, 1.1, 0.5);
    return { ring, inner, z0, z1: z0 + PLATE_H, key: (6 + W - 2) / 2 + y };
  }

  function ambientLifts(u) {
    const lifts = Array(N).fill(0);
    let lidDrop = 0;
    if (u < 0.55) {
      const span = 0.55 / N;
      for (let i = 0; i < N; i++) {
        const local = (u - i * span) / span;
        if (local > 0 && local < 1) {
          lifts[i] = local < 0.5 ? local * 2 * 14 : (1 - local) * 2 * 14;
        }
      }
      const cur = Math.min(N - 1, Math.floor(u / span));
      if (lifts[cur] < 4) lifts[cur] = Math.max(lifts[cur], 4);
    } else if (u < 0.7) {
      const p = (u - 0.55) / 0.15;
      for (let i = 0; i < N; i++) lifts[i] = lerp(i === 2 ? 4 : 0, 0, p);
    } else if (u < 0.88) {
      lidDrop = (u - 0.7) / 0.18;
    } else {
      lidDrop = 1 - (u - 0.88) / 0.12;
    }
    return { lifts, lidDrop: clamp(lidDrop, 0, 1) };
  }

  // Rest-pose hit bands (rule 01) — tops at rest raise for plate 2
  const tops = Array.from({ length: N }, (_, i) => {
    const y = i * G + 2 + TK / 2;
    const restLift = i === 2 ? 4 : 0;
    return P(W / 2, y, WH + restLift + PLATE_H);
  });
  const lidPt = P((TX0 + TX1) / 2, (TY0 + TY1) / 2, LID_Z + 1);

  let orderSig = "";

  const loop = register(stage, (dt) => {
    stepS(rate, dt);
    const base = reducedMotion() ? 0 : 1;
    if (hover < 0) rate.t = base;
    else rate.t = slowRate;
    clock += dt * rate.x;

    const u = (clock / CYCLE) % 1;
    let { lifts, lidDrop } = ambientLifts(u);

    if (hover >= 0 && hover < N) {
      lifts = lifts.map((v, i) => {
        if (i === hover) return 16;
        if (Math.abs(i - hover) === 1) return Math.max(v, 5);
        return v * 0.25;
      });
      lidDrop = 0;
    } else if (hover === N) {
      lifts = lifts.map(() => 0);
      lidDrop = 1;
    }

    const lidZ = LID_Z - lidDrop * (LID_Z - WH - 1.5);
    put(lid, prism(P, front, lR, lI, lidZ, lidZ + 1.8));
    lid.sil.classList.toggle("hi", hover === N || (hover < 0 && lidDrop > 0.4));

    const drawList = [];
    plates.forEach((pl) => {
      const lift = lifts[pl.i] * (1 - lidDrop * 0.95);
      const q = platePose(pl.i, lift);
      put(pl.el, prism(P, front, q.ring, q.inner, q.z0, q.z1));
      pl.el.sil.classList.toggle("hi", hover === pl.i || (hover < 0 && lifts[pl.i] > 8));
      drawList.push({ id: `p${pl.i}`, key: q.key, g: pl.el.g });
    });
    // Lid after plates when closed-ish (nearer / on top); when high, still after for coverage
    drawList.push({ id: "lid", key: (TX0 + TX1) / 2 + (TY0 + TY1) / 2 + 40 + lidDrop * 20, g: lid.g });

    drawList.sort((a, b) => a.key - b.key);
    const sig = drawList.map((d) => d.id).join();
    if (sig !== orderSig) {
      orderSig = sig;
      drawList.forEach((d) => layer.appendChild(d.g));
    }

    if (hover === N) read.textContent = "close";
    else if (hover >= 0) read.textContent = String(hover + 1).padStart(2, "0");
    else if (lidDrop > 0.4) read.textContent = "close";
    else {
      const hi = lifts.indexOf(Math.max(...lifts));
      read.textContent = lifts[hi] > 2 ? String(hi + 1).padStart(2, "0") : "rest";
    }

    if (reducedMotion() && hover < 0 && rate.x === 0) return false;
    return true;
  });
  bag.add(loop.unregister);

  function hit([sx, sy]) {
    if (Math.hypot(lidPt[0] - sx, lidPt[1] - sy) < 55) return N;
    let best = -1;
    let d = Infinity;
    tops.forEach((pt, i) => {
      const dd = Math.hypot(pt[0] - sx, pt[1] - sy);
      if (dd < d) { d = dd; best = i; }
    });
    return d < 70 ? best : -1;
  }

  bag.add(pointer(stage, {
    move: (p) => {
      hover = hit(p);
      loop.wake();
    },
    leave: () => {
      hover = -1;
      loop.wake();
    },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { slowRate = v; loop.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "close",
  means: "Exposure plates rise in turn under a floating lid; the set closes, then reopens. Hover inspects.",
  rules: [1, 5, 7, 9],
  range: [0.15, 0.35, 0.55],
  mount,
});
