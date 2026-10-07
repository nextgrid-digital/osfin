const { Cam, fit, proj, facing, rings, prism, solid, put, mk, seg, unproj,
  spring, stepS, clamp, pointer, register, disposer } = HL;

function mount({ stage, svg, read }, value) {
  const bag = disposer(), C = Cam(45, 0.5, 2.05);
  fit(C, [[0, 0, 0], [90, 90, 0], [90, 0, 0], [0, 90, 0], [30, 30, 116]], 200, 166);
  const P = proj(C), front = facing(C), g = mk("g", {}, svg);
  let radius = value, over = null, active = null;
  const columns = [
    [0, 0, 2], [1, 0, 3], [2, 0, 1],
    [0, 1, 3], [1, 1, 4], [2, 1, 3],
    [0, 2, 2], [1, 2, 1], [2, 2, 1],
  ].sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  const parts = [];
  for (const [i, j, n] of columns) {
    const x = i * 30 + 1, y = j * 30 + 1;
    const [ring, inner] = rings(x, y, x + 27, y + 27, 1.4, 0.7);
    const group = mk("g", {}, g);
    const guides = mk("path", { class: "lo dash nf" }, group);
    const blocks = [];
    for (let k = 0; k < n; k++) blocks.push(solid(group));
    const plates = [];
    if (i === 1 && j === 1) for (let k = 0; k < 6; k++) plates.push(solid(group));
    parts.push({ i, j, n, x, y, ring, inner, group, guides, blocks, plates, sp: spring(0), drawn: NaN });
  }
  const peak = parts.find((p) => p.i === 1 && p.j === 1);
  function draw(p) {
    const lift = clamp(p.sp.x, 0, 13);
    if (lift !== p.drawn) {
      p.drawn = lift;
      p.guides.setAttribute("d", seg(P(p.x, p.y, 0), P(p.x, p.y, lift)));
      p.blocks.forEach((b, k) => put(b, prism(P, front, p.ring, p.inner, k * 19 + lift, k * 19 + 18 + lift)));
      p.plates.forEach((b, k) => put(b, prism(P, front, p.ring, p.inner, 77 + k * 4 + lift, 78.4 + k * 4 + lift)));
    }
    p.blocks.forEach((b) => b.sil.classList.remove("hi"));
    p.plates.forEach((b) => b.sil.classList.remove("hi"));
    if (p === (active || peak)) (p.plates.at(-1) || p.blocks.at(-1)).sil.classList.add("hi");
  }
  const loop = register(stage, (dt) => {
    let moving = false;
    for (const p of parts) { if (stepS(p.sp, dt)) moving = true; draw(p); }
    return moving;
  });
  bag.add(loop.unregister);
  function target() {
    let nearest = Infinity;
    active = null;
    if (over) for (const p of parts) {
      const z = p.plates.length ? 98 : p.n * 19;
      const q = unproj(C, over[0], over[1], z);
      const d = Math.hypot(q[0] - p.x - 13.5, q[1] - p.y - 13.5);
      if (d < nearest) { nearest = d; active = p; }
    }
    if (nearest > 45) active = null;
    for (const p of parts) {
      if (!active) { p.sp.t = 0; continue; }
      const z = p.plates.length ? 98 : p.n * 19;
      const q = unproj(C, over[0], over[1], z);
      const d = Math.hypot(q[0] - p.x - 13.5, q[1] - p.y - 13.5);
      p.sp.t = clamp(12 * Math.exp(-d * d / (radius * radius)), 0, 12);
    }
    read.textContent = active ? `view ${active.i + 1}·${active.j + 1}` : "rest";
    loop.wake();
  }
  bag.add(pointer(stage, { move: (p) => { over = p; target(); }, leave: () => { over = null; target(); } }));
  bag.add(() => svg.replaceChildren());
  target();
  return { set: (v) => { radius = v; target(); }, destroy: bag.dispose };
}

hairline({
  name: "control-views",
  means: "A stepped cube observatory lifts near the pointer and settles back into its architecture.",
  rules: [1, 3, 5, 7],
  range: [20, 35, 50],
  mount,
});
