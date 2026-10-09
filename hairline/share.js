/**
 * Share: three lanes feed one shared bridge/gauge that stays level.
 * Lanes pulse in sync. Hover brightens one lane and lifts its cubes.
 */
const {
  Cam, clamp, fit, proj, facing, rings, prism, solid, put, mk, seg,
  flatDot, place, spring, stepS, pointer, register, disposer, reducedMotion, r2,
} = HL;

const L = 110;
const BT = 3;
const LW = 14;
const GAP = 6;
const NLANE = 3;
const NC = 3;
const SPEED = 1 / 6;
const BRIDGE_Z = 28;
const GAUGE_Z = 36;

const laneY = (i) => 4 + i * (LW + GAP);
const totalW = laneY(NLANE - 1) + LW + 4;

const size = (u) => {
  const a = clamp(Math.min(u, 1 - u) / 0.12, 0, 1);
  return a * a * (3 - 2 * a);
};

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let pulseAmp = value;
  let clock = 0;
  let hoverLane = -1;
  const rate = spring(1, { eps: 2e-3 });

  const C = Cam(45, 0.5, 2.7);
  fit(C, [
    [0, 0, 0], [L + 8, totalW, 0], [L + 8, 0, 0], [0, totalW, 0],
    [L / 2, totalW / 2, GAUGE_Z + 8],
  ], 200, 166);
  const P = proj(C);
  const front = facing(C);
  const g = mk("g", {}, svg);

  // Base
  {
    const [r, i] = rings(0, 0, L + 6, totalW, 4, 1.2);
    put(solid(g), prism(P, front, r, i, 0, BT));
  }

  for (let i = 0; i < NLANE; i++) {
    const y0 = laneY(i);
    const trough = mk("path", { class: "nf lo" }, g);
    trough.setAttribute("d", [
      seg(P(4, y0 + 2, BT), P(L - 4, y0 + 2, BT)),
      seg(P(4, y0 + LW - 2, BT), P(L - 4, y0 + LW - 2, BT)),
    ].join(""));
  }

  const layer = mk("g", {}, g);

  // Bridge posts + deck (fixed poses, sorted with cubes each frame)
  const bx0 = L * 0.42;
  const bx1 = L * 0.58;
  const bridgeParts = [];
  for (const y of [2, totalW - 5]) {
    const el = solid(layer);
    const [r, i] = rings(bx0 + 2, y, bx1 - 2, y + 3, 1, 0.45);
    put(el, prism(P, front, r, i, BT, BRIDGE_Z));
    bridgeParts.push({ el, key: (bx0 + bx1) / 2 + y, g: el.g });
  }
  {
    const el = solid(layer);
    const [r, i] = rings(bx0, 1, bx1, totalW - 1, 2, 0.8);
    put(el, prism(P, front, r, i, BRIDGE_Z, BRIDGE_Z + 2.4));
    bridgeParts.push({ el, key: (bx0 + bx1) / 2 + totalW / 2 + 2, g: el.g });
  }
  const gaugeUp = solid(layer);
  {
    const [r, i] = rings(L / 2 - 1.2, totalW / 2 - 1.2, L / 2 + 1.2, totalW / 2 + 1.2, 0.8, 0.4);
    put(gaugeUp, prism(P, front, r, i, BRIDGE_Z + 2.4, GAUGE_Z));
  }
  const gauge = solid(layer);
  const [gR, gI] = rings(bx0 - 4, totalW / 2 - 3, bx1 + 4, totalW / 2 + 3, 1.4, 0.55);
  put(gauge, prism(P, front, gR, gI, GAUGE_Z, GAUGE_Z + 2.2));
  gauge.sil.classList.add("hi");

  const pools = Array.from({ length: NLANE }, () =>
    Array.from({ length: NC }, () => {
      const el = { ...solid(layer), dots: [] };
      for (let k = 0; k < 4; k++) el.dots.push(flatDot(el.g, C, 0.8, "dot off"));
      return el;
    }),
  );
  const laneLift = Array.from({ length: NLANE }, () => spring(0, { eps: 0.03 }));
  const CW = 8;

  // Rest centres for lane hit (rule 01)
  const laneHits = Array.from({ length: NLANE }, (_, i) =>
    P(L / 2, laneY(i) + LW / 2, BT + CW),
  );

  function drawCube(el, x, y, s, z0, serial, hot) {
    const sz = CW * s;
    if (sz < 0.35) {
      el.g.setAttribute("visibility", "hidden");
      return x + y;
    }
    el.g.removeAttribute("visibility");
    const x0 = x - sz / 2;
    const y0 = y - sz / 2;
    const [rg, ig] = rings(x0, y0, x0 + sz, y0 + sz, 1.5 * s, 0.65 * s);
    put(el, prism(P, front, rg, ig, z0, z0 + sz));
    el.sil.classList.toggle("hi", hot);
    const pitch = sz * 0.24;
    const rr = r2(0.45 * s * C.S);
    el.dots.forEach((d, b) => {
      place(d, P(x + (b % 2 - 0.5) * pitch, y + (Math.floor(b / 2) - 0.5) * pitch, z0 + sz));
      d.setAttribute("rx", String(rr));
      d.setAttribute("ry", String(r2(rr * C.k)));
      d.setAttribute("class", serial >> b & 1 ? (hot ? "dot" : "dot m") : "dot off");
    });
    return x + y;
  }

  let orderSig = "";

  const loop = register(stage, (dt) => {
    let moving = stepS(rate, dt);
    rate.t = reducedMotion() ? 0 : 1;
    clock += dt * rate.x;

    for (let i = 0; i < NLANE; i++) {
      const amp = pulseAmp * (hoverLane === i ? 1.4 : 1);
      const phase = Math.sin(clock * 1.4 + i * 0.15) * 0.5 + 0.5;
      laneLift[i].t = 2 + phase * amp * 5 + (hoverLane === i ? 5 : 0);
      if (stepS(laneLift[i], dt)) moving = true;
    }

    put(gauge, prism(P, front, gR, gI, GAUGE_Z, GAUGE_Z + 2.2));
    gauge.sil.classList.toggle("hi", hoverLane < 0);

    const drawList = [
      ...bridgeParts.map((p, i) => ({ id: `br${i}`, key: p.key, g: p.g })),
      { id: "gup", key: L / 2 + totalW / 2 + 8, g: gaugeUp.g },
      { id: "gauge", key: L / 2 + totalW / 2 + 12, g: gauge.g },
    ];

    for (let lane = 0; lane < NLANE; lane++) {
      const y = laneY(lane) + LW / 2;
      const zBoost = BT + laneLift[lane].x;
      for (let j = 0; j < NC; j++) {
        const q = j / NC + clock * SPEED * (1 + lane * 0.02);
        const u = q - Math.floor(q);
        const x = u * L;
        const s = size(u);
        const key = drawCube(
          pools[lane][j],
          x,
          y,
          s,
          zBoost,
          10 + lane * 8 + j,
          hoverLane === lane && s > 0.5,
        );
        drawList.push({ id: `c${lane}${j}`, key, g: pools[lane][j].g });
      }
    }

    drawList.sort((a, b) => a.key - b.key);
    const sig = drawList.map((d) => d.id).join();
    if (sig !== orderSig) {
      orderSig = sig;
      drawList.forEach((d) => layer.appendChild(d.g));
    }

    if (hoverLane >= 0) read.textContent = `lane ${hoverLane + 1}`;
    else read.textContent = "shared";

    if (reducedMotion() && hoverLane < 0 && rate.x === 0 && !moving) return false;
    return true;
  });
  bag.add(loop.unregister);

  bag.add(pointer(stage, {
    move: (p) => {
      let best = 0;
      let d = Infinity;
      laneHits.forEach((pt, i) => {
        const dd = Math.hypot(pt[0] - p[0], pt[1] - p[1]);
        if (dd < d) { d = dd; best = i; }
      });
      hoverLane = d < 100 ? best : -1;
      loop.wake();
    },
    leave: () => {
      hoverLane = -1;
      loop.wake();
    },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { pulseAmp = v; loop.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "share",
  means: "Three lanes pulse under one level gauge. Hover brightens a lane; the standard stays shared.",
  rules: [1, 5, 7, 9],
  range: [0.4, 0.85, 1.2],
  mount,
});
