/**
 * Own: an open frame with three ownership bays. An exception cube cycles on a
 * lift — rise, seat, settle, next — forever. Hover picks which bay gets the bright edge.
 */
const {
  Cam, clamp, fit, proj, facing, rings, prism, solid, put, mk, seg,
  spring, stepS, pointer, register, disposer, reducedMotion, lerp,
} = HL;

const FX0 = 6, FX1 = 64, FY0 = 6, FY1 = 56;
const POST = 3, BASE_Z = 3, MID_Z = 22, TOP_Z = 48;
const CW = 10;
const NBAY = 3;
const CYCLE = 5.2;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let cycleScale = value;
  let clock = 0;
  let hoverBay = -1;
  const rate = spring(1, { eps: 2e-3 });

  const C = Cam(45, 0.5, 2.9);
  fit(C, [
    [FX0 - 6, FY0 - 6, 0], [FX1 + 6, FY1 + 6, 0],
    [FX1 + 6, FY0 - 6, 0], [FX0 - 6, FY1 + 6, 0],
    [FX0, FY0, TOP_Z + 6], [FX1, FY1, TOP_Z + 6],
  ], 200, 166);
  const P = proj(C);
  const front = facing(C);
  const g = mk("g", {}, svg);

  // Base (farthest)
  {
    const [r, i] = rings(FX0 - 4, FY0 - 4, FX1 + 4, FY1 + 4, 3, 1.1);
    put(solid(g), prism(P, front, r, i, 0, BASE_Z));
  }

  // Posts far→near by x+y
  const corners = [
    [FX0, FY0], [FX1 - POST, FY0], [FX0, FY1 - POST], [FX1 - POST, FY1 - POST],
  ].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
  for (const [x, y] of corners) {
    const [r, i] = rings(x, y, x + POST, y + POST, 0.9, 0.45);
    put(solid(g), prism(P, front, r, i, BASE_Z, TOP_Z));
  }

  // Lower waiting cubes (farther than shelf path)
  for (const [x, y] of [[FX0 + 10, FY1 - 18], [FX0 + 24, FY1 - 18]].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]))) {
    const [r, i] = rings(x, y, x + CW - 1, y + CW - 1, 1.5, 0.65);
    put(solid(g), prism(P, front, r, i, BASE_Z, BASE_Z + CW - 1));
  }

  const guides = mk("path", { class: "lo dash nf" }, g);
  const shelfX0 = FX0 + 14, shelfX1 = FX1 - 14;
  const shelfY0 = FY0 + 20, shelfY1 = FY1 - 12;
  guides.setAttribute("d", [
    seg(P(shelfX0 + 2, shelfY0 + 2, MID_Z), P(shelfX0 + 2, shelfY0 + 2, TOP_Z)),
    seg(P(shelfX1 - 2, shelfY0 + 2, MID_Z), P(shelfX1 - 2, shelfY0 + 2, TOP_Z)),
    seg(P(shelfX0 + 2, shelfY1 - 2, MID_Z), P(shelfX0 + 2, shelfY1 - 2, TOP_Z)),
    seg(P(shelfX1 - 2, shelfY1 - 2, MID_Z), P(shelfX1 - 2, shelfY1 - 2, TOP_Z)),
  ].join(""));

  // Sortable moving layer
  const layer = mk("g", {}, g);
  const shelf = solid(layer);
  const cube = solid(layer);
  const [sR, sI] = rings(shelfX0, shelfY0, shelfX1, shelfY1, 2, 0.8);

  // Upper rail
  const rail = solid(layer);
  {
    const [r, i] = rings(FX0 + 3, FY0 + 3, FX1 - 3, FY1 - 3, 2, 0.8);
    put(rail, prism(P, front, r, i, TOP_Z - 2.2, TOP_Z));
  }

  const bayW = (FX1 - FX0 - 16) / NBAY;
  const bays = [];
  for (let i = 0; i < NBAY; i++) {
    const x0 = FX0 + 8 + i * bayW;
    const [r, iR] = rings(x0, FY0 + 6, x0 + bayW - 3, FY0 + 6 + 8, 1.4, 0.6);
    const el = solid(layer);
    put(el, prism(P, front, r, iR, TOP_Z - 2.2 - 1.4, TOP_Z - 2.2));
    bays.push({
      el,
      x0,
      cx: x0 + (bayW - 3) / 2,
      cy: FY0 + 10,
      // hit against rest pose (rule 01)
      restPt: P(x0 + (bayW - 3) / 2, FY0 + 10, TOP_Z),
      key: x0 + FY0 + 10,
    });
  }

  function phaseOf(t) {
    const u = t - Math.floor(t);
    if (u < 0.28) return { name: "lift", p: u / 0.28 };
    if (u < 0.55) return { name: "seat", p: (u - 0.28) / 0.27 };
    if (u < 0.78) return { name: "hold", p: (u - 0.55) / 0.23 };
    return { name: "drop", p: (u - 0.78) / 0.22 };
  }

  let orderSig = "";

  const loop = register(stage, (dt) => {
    stepS(rate, dt);
    const base = reducedMotion() ? 0 : 1;
    if (hoverBay < 0) rate.t = base;
    else rate.t = clamp(cycleScale, 0.12, 0.7);
    clock += dt * rate.x;

    const cycleT = clock / CYCLE;
    const bayIdx = Math.floor(cycleT) % NBAY;
    const ph = phaseOf(cycleT);

    let rise = 0;
    let seat = 0;
    if (ph.name === "lift") rise = ph.p;
    else if (ph.name === "seat") { rise = 1; seat = ph.p; }
    else if (ph.name === "hold") { rise = 1; seat = 1; }
    else { rise = 1 - ph.p; seat = 1 - ph.p; }

    const z = MID_Z + rise * (TOP_Z - 5 - MID_Z - 2.2);
    put(shelf, prism(P, front, sR, sI, z, z + 2.2));

    const activeBay = hoverBay >= 0 ? hoverBay : bayIdx;
    const cubeRest = [
      (shelfX0 + shelfX1) / 2 - CW / 2,
      (shelfY0 + shelfY1) / 2 - CW / 2,
    ];
    const cubeSeat = [
      bays[activeBay].cx - CW / 2,
      bays[activeBay].cy - CW / 2,
    ];
    const cx = lerp(cubeRest[0], cubeSeat[0], seat);
    const cy = lerp(cubeRest[1], cubeSeat[1], seat);
    const [cR, cI] = rings(cx, cy, cx + CW, cy + CW, 1.6, 0.7);
    put(cube, prism(P, front, cR, cI, z + 2.2, z + 2.2 + CW));

    bays.forEach((b, i) => {
      b.el.sil.classList.toggle("hi", i === activeBay && (ph.name === "seat" || ph.name === "hold" || hoverBay === i));
    });
    cube.sil.classList.toggle("hi", hoverBay >= 0 || ph.name === "lift" || ph.name === "seat");
    shelf.sil.classList.toggle("hi", hoverBay < 0 && ph.name === "drop");

    // Depth: shelf/cube by current centre; rail; bays by key
    const drawList = [
      { id: "rail", key: (FX0 + FX1) / 2 + (FY0 + FY1) / 2 - 20, g: rail.g },
      ...bays.map((b, i) => ({ id: `bay${i}`, key: b.key, g: b.el.g })),
      { id: "shelf", key: (shelfX0 + shelfX1) / 2 + (shelfY0 + shelfY1) / 2, g: shelf.g },
      { id: "cube", key: cx + CW / 2 + cy + CW / 2 + 1, g: cube.g },
    ];
    drawList.sort((a, b) => a.key - b.key);
    const sig = drawList.map((d) => d.id).join();
    if (sig !== orderSig) {
      orderSig = sig;
      drawList.forEach((d) => layer.appendChild(d.g));
    }

    if (hoverBay >= 0) read.textContent = `bay ${hoverBay + 1}`;
    else if (ph.name === "lift") read.textContent = "lift";
    else if (ph.name === "seat" || ph.name === "hold") read.textContent = `own ${bayIdx + 1}`;
    else read.textContent = "settle";

    if (reducedMotion() && hoverBay < 0 && rate.x === 0) return false;
    return true;
  });
  bag.add(loop.unregister);

  function hit([sx, sy]) {
    let best = -1;
    let d = Infinity;
    bays.forEach((b, i) => {
      const dd = Math.hypot(b.restPt[0] - sx, b.restPt[1] - sy);
      if (dd < d) { d = dd; best = i; }
    });
    const shelfPt = P((shelfX0 + shelfX1) / 2, (shelfY0 + shelfY1) / 2, MID_Z + CW);
    const shelfD = Math.hypot(shelfPt[0] - sx, shelfPt[1] - sy);
    if (shelfD < d) {
      // pointer on the lift — keep nearest bay by screen x
      best = bays.reduce((bi, b, i) =>
        Math.abs(sx - b.restPt[0]) < Math.abs(sx - bays[bi].restPt[0]) ? i : bi, 0);
      d = shelfD;
    }
    return d < 90 ? best : -1;
  }

  bag.add(pointer(stage, {
    move: (p) => {
      hoverBay = hit(p);
      loop.wake();
    },
    leave: () => {
      hoverBay = -1;
      loop.wake();
    },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { cycleScale = v; loop.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "own",
  means: "A lift seats one exception into an ownership bay, then the next. Hover picks the bay.",
  rules: [1, 5, 7, 9],
  range: [0.2, 0.4, 0.65],
  mount,
});
