/**
 * Match: two parallel belts of cubes meet a gate. Matched pairs lock and exit;
 * one mismatched cube peels aside. Belts never stop; hovering slows time and
 * lifts the nearest cube.
 */
const {
  Cam, clamp, fit, proj, facing, rings, prism, solid, put, mk, seg,
  flatDot, place, spring, stepS, pointer, register, disposer, reducedMotion, r2, lerp,
} = HL;

const L = 120;
const BW = 48;
const BT = 3.2;
const CW = 9;
const NC = 3;
const SPEED = 1 / 7;
const GATE = L * 0.55;
const GH = 30;
const Y_A = 10;
const Y_B = 30;
const Y_MID = 20;
const Y_BREAK = 42;
const OUT_X = L * 0.78;

const size = (u) => {
  const a = clamp(Math.min(u, 1 - u) / 0.1, 0, 1);
  return a * a * (3 - 2 * a);
};

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let slowRate = value;
  let over = null;
  let clock = 1.2;
  const rate = spring(1, { eps: 2e-3 });

  const C = Cam(45, 0.5, 2.55);
  fit(C, [
    [0, 0, 0], [L + 16, BW + 8, 0], [L + 16, 0, 0], [0, BW + 8, 0],
    [GATE, Y_MID, GH], [OUT_X + 14, Y_BREAK, BT + CW],
  ], 200, 166);
  const P = proj(C);
  const front = facing(C);
  const g = mk("g", {}, svg);

  // Far / fixed: platform + troughs only
  {
    const [r, i] = rings(0, 0, L + 12, BW + 6, 4, 1.2);
    put(solid(g), prism(P, front, r, i, 0, BT));
  }
  const trough = mk("path", { class: "nf lo" }, g);
  trough.setAttribute("d", [
    seg(P(6, Y_A - 5, BT), P(GATE - 4, Y_A - 5, BT)),
    seg(P(6, Y_A + 5, BT), P(GATE - 4, Y_A + 5, BT)),
    seg(P(6, Y_B - 5, BT), P(GATE - 4, Y_B - 5, BT)),
    seg(P(6, Y_B + 5, BT), P(GATE - 4, Y_B + 5, BT)),
  ].join(""));
  const guide = mk("path", { class: "lo dash nf" }, g);
  guide.setAttribute("d", seg(
    P(GATE + 4, Y_MID, BT + CW / 2),
    P(OUT_X, Y_BREAK, BT + CW / 2),
  ));

  // Sortable scene layer (gate + cubes) — depth via append order each frame
  const layer = mk("g", {}, g);
  const slats = mk("path", { class: "nf lo" }, layer);

  const gateParts = [
    [GATE - 1.8, Y_MID - 12, GATE + 1.8, Y_MID - 8, BT, BT + GH - 4],
    [GATE - 1.8, Y_MID + 8, GATE + 1.8, Y_MID + 12, BT, BT + GH - 4],
    [GATE - 1.8, Y_MID - 12, GATE + 1.8, Y_MID + 12, BT + GH - 6, BT + GH - 2],
  ].map(([x0, y0, x1, y1, z0, z1]) => {
    const el = solid(layer);
    const [r, i] = rings(x0, y0, x1, y1, 1.2, 0.5);
    put(el, prism(P, front, r, i, z0, z1));
    // Depth key = footprint centre (ascending x+y = nearer)
    return { el, key: (x0 + x1) / 2 + (y0 + y1) / 2, g: el.g };
  });

  function makeCube() {
    const el = { ...solid(layer), dots: [] };
    for (let k = 0; k < 6; k++) el.dots.push(flatDot(el.g, C, 0.9, "dot off"));
    return el;
  }
  const poolA = Array.from({ length: NC }, makeCube);
  const poolB = Array.from({ length: NC }, makeCube);
  const poolOut = Array.from({ length: 2 }, makeCube);
  const breakEl = makeCube();
  const lifts = Array.from({ length: NC * 2 + 3 }, () => spring(0, { eps: 0.04 }));

  function drawCube(el, x, y, s, zLift, serial, hot) {
    const sz = CW * s;
    if (sz < 0.35) {
      el.g.setAttribute("visibility", "hidden");
      return x + y;
    }
    el.g.removeAttribute("visibility");
    const x0 = x - sz / 2;
    const y0 = y - sz / 2;
    const z0 = BT + zLift;
    const [rg, ig] = rings(x0, y0, x0 + sz, y0 + sz, 1.6 * s, 0.7 * s);
    put(el, prism(P, front, rg, ig, z0, z0 + sz));
    el.sil.classList.toggle("hi", hot);
    const pitch = sz * 0.22;
    const rr = r2(0.5 * s * C.S);
    el.dots.forEach((d, b) => {
      place(d, P(x + (b % 3 - 1) * pitch, y + (Math.floor(b / 3) - 0.5) * pitch, z0 + sz));
      d.setAttribute("rx", String(rr));
      d.setAttribute("ry", String(r2(rr * C.k)));
      d.setAttribute("class", serial >> b & 1 ? (hot ? "dot" : "dot m") : "dot off");
    });
    return x + y;
  }

  let orderSig = "";

  const loop = register(stage, (dt) => {
    let moving = stepS(rate, dt);
    const base = reducedMotion() ? 0 : 1;
    if (!over) rate.t = base;
    clock += dt * rate.x;

    const itemsA = [];
    const itemsB = [];
    for (let j = 0; j < NC; j++) {
      const qA = j / NC + clock * SPEED;
      const uA = qA - Math.floor(qA);
      itemsA.push({ j, x: uA * GATE, y: Y_A, s: size(uA), serial: 20 + j, liftI: j });
      const qB = (j + 0.5) / NC + clock * SPEED * 0.97;
      const uB = qB - Math.floor(qB);
      itemsB.push({ j, x: uB * GATE, y: Y_B, s: size(uB), serial: 40 + j, liftI: NC + j });
    }

    // Matched pair: travel past the gate on the mid line, staggered
    const outPhase = (clock * SPEED * 0.55) % 1;
    const outs = [
      { x: GATE + 10 + outPhase * (OUT_X - GATE), y: Y_MID - 6, s: size(0.15 + outPhase * 0.7), serial: 60, liftI: NC * 2 },
      { x: GATE + 10 + ((outPhase + 0.22) % 1) * (OUT_X - GATE), y: Y_MID + 6, s: size(0.15 + ((outPhase + 0.22) % 1) * 0.7), serial: 61, liftI: NC * 2 + 1 },
    ];
    // Break peels well aside on its own spur
    const breakT = (clock * SPEED * 0.32) % 1;
    const brk = {
      x: lerp(GATE + 4, OUT_X + 8, breakT),
      y: lerp(Y_MID + 8, Y_BREAK + 2, breakT),
      s: 0.75 + 0.15 * Math.sin(breakT * Math.PI),
      serial: 77,
      liftI: NC * 2 + 2,
    };

    // Screen-space pick: always the nearest visible cube under the pointer
    let hotId = null;
    if (over) {
      let best = Infinity;
      const consider = (id, x, y, s) => {
        if (s < 0.4) return;
        const [sx, sy] = P(x, y, BT + CW * s * 0.5);
        const d = Math.hypot(sx - over[0], sy - over[1]);
        if (d < best) { best = d; hotId = id; }
      };
      itemsA.forEach((it) => consider(`a${it.j}`, it.x, it.y, it.s));
      itemsB.forEach((it) => consider(`b${it.j}`, it.x, it.y, it.s));
      consider("brk", brk.x, brk.y, brk.s);
      if (best > 70) hotId = null;
    }

    lifts.forEach((sp, i) => {
      const id =
        i < NC ? `a${i}` :
        i < NC * 2 ? `b${i - NC}` :
        i === NC * 2 + 2 ? "brk" : null;
      sp.t = id && id === hotId ? 8 : 0;
      if (stepS(sp, dt)) moving = true;
    });

    const drawList = [{ id: "slats", key: -1, g: slats }];
    gateParts.forEach((p, i) => drawList.push({ id: `g${i}`, key: p.key, g: p.g }));

    itemsA.forEach((it, k) => {
      const key = drawCube(poolA[k], it.x, it.y, it.s, lifts[it.liftI].x, it.serial, hotId === `a${it.j}`);
      drawList.push({ id: `a${k}`, key, g: poolA[k].g });
    });
    itemsB.forEach((it, k) => {
      const key = drawCube(poolB[k], it.x, it.y, it.s, lifts[it.liftI].x, it.serial, hotId === `b${it.j}`);
      drawList.push({ id: `b${k}`, key, g: poolB[k].g });
    });
    outs.forEach((it, k) => {
      const key = drawCube(poolOut[k], it.x, it.y, it.s, 0, it.serial, false);
      drawList.push({ id: `o${k}`, key, g: poolOut[k].g });
    });
    {
      const key = drawCube(breakEl, brk.x, brk.y, brk.s, lifts[brk.liftI].x, brk.serial, hotId === "brk");
      drawList.push({ id: "brk", key, g: breakEl.g });
    }

    drawList.sort((a, b) => a.key - b.key);
    const sig = drawList.map((d) => d.id).join();
    if (sig !== orderSig) {
      orderSig = sig;
      drawList.forEach((d) => layer.appendChild(d.g));
    }

    const off = (clock * SPEED * L % 14 + 14) % 14;
    const sl = [];
    for (let x = off; x < GATE - 2; x += 14) {
      if (x > 4) {
        sl.push(seg(P(x, Y_A - 3.5, BT), P(x, Y_A + 3.5, BT)));
        sl.push(seg(P(x, Y_B - 3.5, BT), P(x, Y_B + 3.5, BT)));
      }
    }
    slats.setAttribute("d", sl.join(""));

    if (hotId === "brk") read.textContent = "break";
    else if (hotId) read.textContent = hotId.startsWith("a") ? `a · ${+hotId.slice(1) + 1}` : `b · ${+hotId.slice(1) + 1}`;
    else read.textContent = `rate ${rate.x.toFixed(2)}×`;

    if (reducedMotion() && !over && rate.x === 0 && !moving) return false;
    return true;
  });
  bag.add(loop.unregister);

  bag.add(pointer(stage, {
    move: (p) => {
      over = p; // viewBox screen point for hit tests
      rate.t = slowRate;
      loop.wake();
    },
    leave: () => {
      over = null;
      loop.wake();
    },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => {
      slowRate = v;
      if (over) rate.t = v;
      loop.wake();
    },
    destroy: bag.dispose,
  };
}

hairline({
  name: "match",
  means: "Two belts meet a gate; pairs lock through, a break peels aside. Hover slows the run.",
  rules: [1, 5, 7, 9],
  range: [0.15, 0.35, 0.55],
  mount,
});
