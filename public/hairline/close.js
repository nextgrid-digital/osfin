/**
 * Close: a shallow tray of five record plates under a floating lid. Hover a
 * plate to inspect it; hover the lid to settle the raised plate, then close.
 */
const {
  Cam, clamp, fit, proj, facing, rings, prism, solid, put, mk, seg,
  tween, tset, tval, tdone, pointer, register, disposer,
} = HL;

const N = 5, W = 42, H = 36, G = 7, TK = 1.6;
const TX0 = -4, TX1 = W + 4, TY0 = -6, TY1 = (N - 1) * G + 10;
const WH = 8, WR = 4, WT = 2;
const LID_Z = 48, PLATE_H = 34;
const RAISED = 2; // index raised at rest

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;
  const C = Cam(45, 0.5, 3.45);
  fit(C, [
    [TX0 - 4, TY0 - 4, 0], [TX1 + 4, TY1 + 4, 0],
    [TX1 + 4, TY0 - 4, 0], [TX0 - 4, TY1 + 4, 0],
    [TX0, TY0, LID_Z + 4], [TX1, TY1, LID_Z + 4],
  ], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);

  // Tray (fixed)
  const outer = rings(TX0, TY0, TX1, TY1, WR, 1.1);
  put(solid(g), prism(P, front, outer[0], outer[1], 0, WH));
  const floor = rings(TX0 + WT, TY0 + WT, TX1 - WT, TY1 - WT, WR - WT, 0.8);
  put(solid(g), prism(P, front, floor[0], floor[1], WH - 1.2, WH));

  // Lid guides + lid
  const guides = mk("path", { class: "lo dash nf" }, g);
  const lid = solid(g);
  const [lR, lI] = rings(TX0 + 1, TY0 + 1, TX1 - 1, TY1 - 1, 3, 1);
  const lidDrop = tween(0); // 0 floating, 1 closed on tray

  // Plates
  const plates = [];
  for (let i = 0; i < N; i++) {
    const [ring, inner] = rings(4, 0, 4 + W - 8, TK, 1.2, 0.5);
    // each plate is a thin upright slab along y
    plates.push({
      i,
      el: solid(g),
      lift: tween(i === RAISED ? 10 : 0),
      ring, inner,
    });
  }

  function platePose(i, lift) {
    const y = i * G + 2;
    const z0 = WH + lift;
    const x0 = 6, x1 = W - 2;
    const [ring, inner] = rings(x0, y, x1, y + TK, 1.1, 0.5);
    return { ring, inner, z0, z1: z0 + PLATE_H, y };
  }

  function draw(now) {
    const close = tval(lidDrop, now);
    const lidZ = LID_Z - close * (LID_Z - WH - 1.5);
    put(lid, prism(P, front, lR, lI, lidZ, lidZ + 1.8));
    guides.setAttribute("d", [
      seg(P(TX0 + 2, TY0 + 2, WH), P(TX0 + 2, TY0 + 2, LID_Z)),
      seg(P(TX1 - 2, TY0 + 2, WH), P(TX1 - 2, TY0 + 2, LID_Z)),
      seg(P(TX0 + 2, TY1 - 2, WH), P(TX0 + 2, TY1 - 2, LID_Z)),
      seg(P(TX1 - 2, TY1 - 2, WH), P(TX1 - 2, TY1 - 2, LID_Z)),
    ].join(""));
    // paint plates back to front (small i is farther in +y? append ascending x+y)
    // plates along +y: smaller i is farther (smaller y)
    plates.forEach((pl) => {
      const lift = tval(pl.lift, now) * (1 - close * 0.95);
      const q = platePose(pl.i, lift);
      put(pl.el, prism(P, front, q.ring, q.inner, q.z0, q.z1));
    });
  }

  const loop = register(stage, (_dt, now) => {
    draw(now);
    let moving = !tdone(lidDrop, now);
    plates.forEach((pl) => { if (!tdone(pl.lift, now)) moving = true; });
    return moving;
  });
  bag.add(loop.unregister);

  // Static hit bands along resting top edges (like Riffle)
  const top = (i) => {
    const y = i * G + 2 + TK / 2;
    const lift = i === RAISED ? 10 : 0;
    return P(W / 2, y, WH + lift + PLATE_H);
  };
  const tops = Array.from({ length: N }, (_, i) => top(i));
  const lidPt = P((TX0 + TX1) / 2, (TY0 + TY1) / 2, LID_Z + 1);

  function hit([sx, sy]) {
    if (Math.hypot(lidPt[0] - sx, lidPt[1] - sy) < 34) return "lid";
    let best = -1, d = 26;
    tops.forEach((pt, i) => {
      const dd = Math.hypot(pt[0] - sx, pt[1] - sy);
      if (dd < d) { d = dd; best = i; }
    });
    return best;
  }

  let mode = "rest"; // rest | plate | close
  function apply(target) {
    const now = performance.now();
    if (target === "lid") {
      mode = "close";
      // settle raised first, then lid
      plates.forEach((pl, i) => {
        tset(pl.lift, 0, now, Math.abs(i - RAISED) * (stag * 0.4));
        pl.el.sil.classList.remove("hi");
      });
      tset(lidDrop, 1, now, 320);
      lid.sil.classList.add("hi");
      read.textContent = "close";
    } else if (typeof target === "number" && target >= 0) {
      mode = "plate";
      tset(lidDrop, 0, now, 0);
      lid.sil.classList.remove("hi");
      plates.forEach((pl, i) => {
        const delay = Math.abs(i - target) * stag;
        const base = i === RAISED ? 10 : 0;
        const boost = i === target ? 16 : base + (i === target - 1 || i === target + 1 ? 4 : 0);
        tset(pl.lift, mode === "plate" ? boost : base, now, delay);
        pl.el.sil.classList.toggle("hi", i === target);
      });
      read.textContent = String(target + 1).padStart(2, "0");
    } else {
      mode = "rest";
      tset(lidDrop, 0, now, 0);
      lid.sil.classList.remove("hi");
      plates.forEach((pl, i) => {
        tset(pl.lift, i === RAISED ? 10 : 0, now, Math.abs(i - RAISED) * (stag * 0.35));
        pl.el.sil.classList.toggle("hi", i === RAISED);
      });
      read.textContent = "rest";
    }
    loop.wake();
  }

  apply(-1);
  bag.add(pointer(stage, {
    move: (p) => apply(hit(p)),
    leave: () => apply(-1),
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "close",
  means: "Five plates in a tray under a floating lid; the pointer inspects a plate or closes the set.",
  rules: [1, 2, 5, 8],
  range: [20, 40, 60],
  mount,
});
