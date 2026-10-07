/**
 * Resolve: an open two-level frame with a lift shelf. Hovering the lift cube
 * raises the shelf, then seats the cube in the upper bay; leave reverses it.
 */
const {
  Cam, fit, proj, facing, rings, prism, solid, put, mk, seg,
  tween, tset, tval, tdone, pointer, register, disposer,
} = HL;

const FX0 = 8, FX1 = 52, FY0 = 8, FY1 = 52;
const POST = 3.2, BASE_Z = 3, MID_Z = 28, TOP_Z = 52;
const CW = 11;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let liftH = value;
  const C = Cam(45, 0.5, 3.35);
  fit(C, [
    [FX0 - 6, FY0 - 6, 0], [FX1 + 6, FY1 + 6, 0],
    [FX1 + 6, FY0 - 6, 0], [FX0 - 6, FY1 + 6, 0],
    [FX0, FY0, TOP_Z + 8], [FX1, FY1, TOP_Z + 8],
  ], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);

  // Base plate
  {
    const [r, i] = rings(FX0 - 4, FY0 - 4, FX1 + 4, FY1 + 4, 3, 1.1);
    put(solid(g), prism(P, front, r, i, 0, BASE_Z));
  }

  // Corner posts (fixed)
  const corners = [
    [FX0, FY0], [FX1 - POST, FY0], [FX0, FY1 - POST], [FX1 - POST, FY1 - POST],
  ];
  for (const [x, y] of corners) {
    const [r, i] = rings(x, y, x + POST, y + POST, 0.9, 0.45);
    put(solid(g), prism(P, front, r, i, BASE_Z, TOP_Z));
  }

  // Upper open frame (destination)
  {
    const [r, i] = rings(FX0 + 4, FY0 + 4, FX1 - 4, FY1 - 4, 2, 0.8);
    put(solid(g), prism(P, front, r, i, TOP_Z - 2.4, TOP_Z));
  }

  // Lower cubes (fixed)
  const lowers = [
    [FX0 + 8, FY0 + 10],
    [FX0 + 22, FY0 + 10],
  ];
  for (const [x, y] of lowers) {
    const [r, i] = rings(x, y, x + CW, y + CW, 1.6, 0.7);
    put(solid(g), prism(P, front, r, i, BASE_Z, BASE_Z + CW));
  }

  // Dotted vertical guides (fixed path ends; redraw height with shelf)
  const guides = mk("path", { class: "lo dash nf" }, g);

  // Lift shelf + cube
  const shelf = solid(g);
  const cube = solid(g);
  const rise = tween(0);   // 0 rest mid, 1 at upper
  const seat = tween(0);   // 0 on shelf centre, 1 slid into bay

  const shelfX0 = FX0 + 10, shelfX1 = FX1 - 10;
  const shelfY0 = FY0 + 14, shelfY1 = FY1 - 14;
  const [sR, sI] = rings(shelfX0, shelfY0, shelfX1, shelfY1, 2, 0.8);
  const cubeRest = [
    (shelfX0 + shelfX1) / 2 - CW / 2,
    (shelfY0 + shelfY1) / 2 - CW / 2,
  ];
  const cubeSeat = [
    (FX0 + FX1) / 2 - CW / 2,
    FY0 + 8,
  ];

  function draw(now) {
    const r = tval(rise, now);
    const s = tval(seat, now);
    const z = MID_Z + r * (TOP_Z - 4 - MID_Z - 2.2);
    put(shelf, prism(P, front, sR, sI, z, z + 2.2));
    const cx = cubeRest[0] + (cubeSeat[0] - cubeRest[0]) * s;
    const cy = cubeRest[1] + (cubeSeat[1] - cubeRest[1]) * s;
    const [cR, cI] = rings(cx, cy, cx + CW, cy + CW, 1.6, 0.7);
    put(cube, prism(P, front, cR, cI, z + 2.2, z + 2.2 + CW));
    const gx = (shelfX0 + shelfX1) / 2, gy = (shelfY0 + shelfY1) / 2;
    guides.setAttribute("d", [
      seg(P(shelfX0 + 2, shelfY0 + 2, MID_Z), P(shelfX0 + 2, shelfY0 + 2, TOP_Z)),
      seg(P(shelfX1 - 2, shelfY0 + 2, MID_Z), P(shelfX1 - 2, shelfY0 + 2, TOP_Z)),
      seg(P(shelfX0 + 2, shelfY1 - 2, MID_Z), P(shelfX0 + 2, shelfY1 - 2, TOP_Z)),
      seg(P(shelfX1 - 2, shelfY1 - 2, MID_Z), P(shelfX1 - 2, shelfY1 - 2, TOP_Z)),
    ].join(""));
    void gx; void gy; void liftH;
  }

  const loop = register(stage, (_dt, now) => {
    draw(now);
    return !(tdone(rise, now) && tdone(seat, now));
  });
  bag.add(loop.unregister);

  let phase = "rest"; // rest | lift | seat
  function setHover(on) {
    const now = performance.now();
    if (on) {
      tset(rise, 1, now, 0);
      tset(seat, 1, now, 280);
      phase = "seat";
      cube.sil.classList.add("hi");
      shelf.sil.classList.remove("hi");
      read.textContent = "seat";
    } else {
      tset(seat, 0, now, 0);
      tset(rise, 0, now, 220);
      phase = "rest";
      cube.sil.classList.remove("hi");
      shelf.sil.classList.add("hi");
      read.textContent = "rest";
    }
    loop.wake();
  }

  // Hit lift cube at rest centre
  const restPt = P(cubeRest[0] + CW / 2, cubeRest[1] + CW / 2, MID_Z + 2.2 + CW);
  function hit([sx, sy]) {
    return Math.hypot(restPt[0] - sx, restPt[1] - sy) < 36;
  }

  shelf.sil.classList.add("hi");
  read.textContent = "rest";
  draw(performance.now());

  bag.add(pointer(stage, {
    move: (p) => {
      const on = hit(p);
      if (on && phase === "rest") setHover(true);
      else if (on) {
        read.textContent = tval(seat, performance.now()) > 0.5 ? "seat" : "lift";
      } else if (phase !== "rest") setHover(false);
    },
    leave: () => setHover(false),
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { liftH = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "resolve",
  means: "An open lift carries one cube up; the pointer seats it in the upper bay, then lets it settle.",
  rules: [1, 5, 8, 9],
  range: [8, 14, 20],
  mount,
});
