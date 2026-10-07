/**
 * Reconcile: a compact platform with two inset tracks of cubes converging
 * through a matching gate. Hovering an input cube draws it toward the gate;
 * neighbours stagger; matched outputs align; one unmatched cube stays aside.
 */
const {
  Cam, clamp, fit, proj, facing, rings, prism, solid, put, mk, seg,
  tween, tset, tval, tdone, pointer, register, disposer,
} = HL;

const CW = 9, CH = 9, BT = 3.2;
const PX0 = 0, PX1 = 96, PY0 = 0, PY1 = 52;
const GATE_X = 52, OUT_X = 72;
const Y_A = 12, Y_B = 32, Y_MID = 22;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;
  const C = Cam(45, 0.5, 3.15);
  fit(C, [
    [PX0 - 4, PY0 - 4, 0], [PX1 + 10, PY1 + 4, 0],
    [PX1 + 10, PY0 - 4, 0], [PX0 - 4, PY1 + 4, 0],
    [GATE_X, Y_MID, 36], [PX1 + 8, Y_MID + 14, 18],
  ], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);

  // Platform (fixed)
  const [pR, pI] = rings(PX0, PY0, PX1, PY1, 4, 1.2);
  put(solid(g), prism(P, front, pR, pI, 0, BT));

  // Track troughs (fixed creases)
  const trough = mk("path", { class: "nf lo" }, g);
  trough.setAttribute("d", [
    seg(P(8, Y_A - 6, BT), P(GATE_X - 4, Y_A - 6, BT)),
    seg(P(8, Y_A + 6, BT), P(GATE_X - 4, Y_A + 6, BT)),
    seg(P(8, Y_B - 6, BT), P(GATE_X - 4, Y_B - 6, BT)),
    seg(P(8, Y_B + 6, BT), P(GATE_X - 4, Y_B + 6, BT)),
  ].join(""));

  // Gate uprights + lintel (fixed)
  const posts = [
    [GATE_X - 2, Y_MID - 14, GATE_X + 2, Y_MID - 10],
    [GATE_X - 2, Y_MID + 10, GATE_X + 2, Y_MID + 14],
  ];
  for (const box of posts) {
    const [r, i] = rings(...box, 1.2, 0.5);
    put(solid(g), prism(P, front, r, i, BT, BT + 28));
  }
  {
    const [r, i] = rings(GATE_X - 2, Y_MID - 14, GATE_X + 2, Y_MID + 14, 1.2, 0.5);
    put(solid(g), prism(P, front, r, i, BT + 26, BT + 30));
  }

  // Inputs: 3 per track
  const inputs = [];
  for (let track = 0; track < 2; track++) {
    const y = track === 0 ? Y_A : Y_B;
    for (let k = 0; k < 3; k++) {
      const x0 = 10 + k * 12;
      const [ring, inner] = rings(0, 0, CW, CW, 1.6, 0.7);
      const el = solid(g);
      inputs.push({
        track, k, y, x0,
        ring, inner, el,
        move: tween(0),
        rest: [x0 + CW / 2, y, BT + CH],
      });
    }
  }

  // Outputs (2 matched)
  const outs = [Y_MID - 6, Y_MID + 6].map((y, i) => {
    const [ring, inner] = rings(OUT_X, y - CW / 2, OUT_X + CW, y + CW / 2, 1.6, 0.7);
    const el = solid(g);
    put(el, prism(P, front, ring, inner, BT, BT + CH));
    return { el, y, align: tween(0) };
  });

  // Unmatched cube + guide
  const breakY = Y_MID + 18, breakX = OUT_X + 4;
  const [bR, bI] = rings(breakX, breakY - CW / 2, breakX + CW, breakY + CW / 2, 1.6, 0.7);
  const breakEl = solid(g);
  put(breakEl, prism(P, front, bR, bI, BT + 2, BT + 2 + CH));
  const guide = mk("path", { class: "lo dash nf" }, g);
  guide.setAttribute("d", seg(P(GATE_X + 4, Y_MID, BT + CH / 2), P(breakX, breakY, BT + 2 + CH / 2)));

  function drawInput(it, now) {
    const t = tval(it.move, now);
    const x = it.x0 + t * (GATE_X - 14 - it.x0);
    const [ring, inner] = rings(x, it.y - CW / 2, x + CW, it.y + CW / 2, 1.6, 0.7);
    put(it.el, prism(P, front, ring, inner, BT, BT + CH));
  }

  function drawOuts(now) {
    outs.forEach((o, i) => {
      const a = tval(o.align, now);
      const y = o.y + (i === 0 ? a * 2 : -a * 2);
      const [ring, inner] = rings(OUT_X, y - CW / 2, OUT_X + CW, y + CW / 2, 1.6, 0.7);
      put(o.el, prism(P, front, ring, inner, BT, BT + CH));
    });
  }

  const loop = register(stage, (_dt, now) => {
    let moving = false;
    inputs.forEach((it) => {
      drawInput(it, now);
      if (!tdone(it.move, now)) moving = true;
    });
    drawOuts(now);
    outs.forEach((o) => { if (!tdone(o.align, now)) moving = true; });
    return moving;
  });
  bag.add(loop.unregister);

  let act = -1;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now();
    const from = a >= 0 ? a : act >= 0 ? act : 0;
    act = a;
    inputs.forEach((it, i) => {
      const delay = Math.abs(i - from) * stag;
      const toward = a < 0 || a === "break" ? 0 : clamp(1 - Math.abs(i - a) * 0.28, 0.2, 1);
      tset(it.move, toward, now, delay);
      it.el.sil.classList.toggle("hi", i === a);
    });
    outs.forEach((o, i) => {
      const on = typeof a === "number" && a >= 0;
      tset(o.align, on ? 1 : 0, now, i * stag);
      o.el.sil.classList.toggle("hi", on && ((a < 3 && i === 0) || (a >= 3 && i === 1)));
    });
    breakEl.sil.classList.toggle("hi", a === "break");
    if (a < 0) outs[0].el.sil.classList.add("hi");
    read.textContent = a === "break" ? "break" : a < 0 ? "rest" : a < 3 ? `in ${a + 1}` : `in ${a - 2}`;
    loop.wake();
  }

  const rests = inputs.map((it) => P(it.rest[0], it.rest[1], it.rest[2]));
  const breakPt = P(breakX + CW / 2, breakY, BT + 2 + CH);
  function hit([sx, sy]) {
    if (Math.hypot(breakPt[0] - sx, breakPt[1] - sy) < 22) return "break";
    let best = -1, d = 28;
    rests.forEach((pt, i) => {
      const dd = Math.hypot(pt[0] - sx, pt[1] - sy);
      if (dd < d) { d = dd; best = i; }
    });
    return best;
  }

  setActive(-1);
  bag.add(pointer(stage, {
    move: (p) => setActive(hit(p)),
    leave: () => setActive(-1),
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "reconcile",
  means: "Two tracks of cubes meet at a gate; the pointer draws one toward matching, leaving a break aside.",
  rules: [1, 2, 5, 9],
  range: [20, 40, 60],
  mount,
});
