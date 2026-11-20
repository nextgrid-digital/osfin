"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

// Pixel frontier from Codrops SeamTransitions typeset (MIT). Solid cells only —
// no lettering. Enter: dark climbs into vision. Exit: white climbs into process.

const GAP = 32;
const DARK = [17 / 255, 17 / 255, 19 / 255] as const;
const LIGHT = [1, 1, 1] as const;
const CELL = [10, 12] as const;

const VERTEX = `#version 300 es
uniform vec2 uSize;
out vec2 vPx;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vPx = vec2(p.x, 1.0 - p.y) * uSize;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec2 uSize;
uniform float uEdge;
uniform float uProgress;
uniform vec3 uPaper;
uniform vec2 uCell;
uniform float uRows;
uniform float uBelow;
uniform float uSeed;

in vec2 vPx;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 px = vPx;
  float col = floor(px.x / uCell.x);
  float row = floor((uEdge - px.y) / uCell.y);
  vec2 cell = vec2(col, row);

  float depth = row + uBelow;
  float reach = uProgress * (uRows + uBelow) * 1.5
    + (noise(cell * vec2(0.35, 0.6) + uSeed) - 0.5) * 8.0 * smoothstep(0.0, 0.05, uProgress);
  float tip = step(hash(cell + uSeed + 1.7), 0.18) * 2.0 * smoothstep(0.05, 0.4, uProgress);
  if (depth >= reach + tip || col < 0.0) {
    outColor = vec4(0.0);
    return;
  }

  outColor = vec4(uPaper, 1.0);
}
`;

type Paper = readonly [number, number, number];

type Strip = {
  render: (state: { progress: number; above: number; below: number; rows: number }) => void;
  resize: (width: number, height: number, above: number) => void;
  dispose: () => void;
};

function createStrip(canvas: HTMLCanvasElement, paper: Paper, seed: number): Strip | null {
  const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: false, alpha: true });
  if (!gl) return null;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertex = compile(gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const locations = new Map<string, WebGLUniformLocation | null>();
  const loc = (name: string) => {
    if (!locations.has(name)) locations.set(name, gl.getUniformLocation(program, name));
    return locations.get(name) ?? null;
  };

  const setNumber = (name: string, value: number) => {
    const at = loc(name);
    if (at) gl.uniform1f(at, value);
  };
  const setVec = (name: string, value: number[] | readonly number[]) => {
    const at = loc(name);
    if (!at) return;
    if (value.length === 2) gl.uniform2fv(at, value);
    else if (value.length === 3) gl.uniform3fv(at, value);
  };

  setVec("uPaper", paper);
  setVec("uCell", CELL);
  setNumber("uSeed", seed);

  let width = 1;
  let height = 1;
  let above = 1;

  return {
    resize(nextWidth, nextHeight, nextAbove) {
      width = Math.max(1, nextWidth);
      height = Math.max(1, nextHeight);
      above = Math.max(1, nextAbove);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    },
    render(state) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      setVec("uSize", [width, height]);
      setNumber("uEdge", above);
      setVec("uCell", CELL);
      setNumber("uRows", state.rows);
      setNumber("uBelow", state.below);
      setNumber("uProgress", state.progress);
      setVec("uPaper", paper);
      setNumber("uSeed", seed);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteProgram(program);
    },
  };
}

type EdgeSource = {
  getEdge: () => number;
  roomUp: () => number;
  roomDown: () => number;
  observe: Element[];
};

function mountStrip(
  host: HTMLDivElement,
  root: HTMLElement,
  renderRef: { current: () => void },
  paper: Paper,
  seed: number,
  source: EdgeSource,
) {
  const canvas = document.createElement("canvas");
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  host.append(canvas);

  const strip = createStrip(canvas, paper, seed);
  if (!strip) {
    canvas.remove();
    return () => {};
  }

  let scheduled = false;
  let alive = true;
  let bandKey = "";
  const cell: [number, number] = [CELL[0], CELL[1]];

  const layout = () => {
    const edgeViewport = source.getEdge();
    const roomUp = Math.max(0, source.roomUp());
    const roomDown = Math.max(0, source.roomDown());
    const rows = Math.min(24, Math.floor(roomUp / cell[1]));
    const below = Math.min(4, Math.floor(roomDown / cell[1]));
    const abovePx = Math.max(cell[1], rows * cell[1]);
    const belowPx = Math.max(cell[1], below * cell[1]);
    const edge = edgeViewport - root.getBoundingClientRect().top;
    const top = Math.round(edge - abovePx);
    const height = Math.max(1, Math.round(abovePx + belowPx));
    if (host.style.top !== `${top}px`) host.style.top = `${top}px`;
    if (host.style.height !== `${height}px`) host.style.height = `${height}px`;

    const key = `${host.clientWidth}x${height}x${abovePx}`;
    if (key !== bandKey) {
      bandKey = key;
      strip.resize(host.clientWidth || root.clientWidth, height, Math.max(1, abovePx));
    }

    return { rows: Math.max(1, rows), below: Math.max(1, below), abovePx, edgeViewport };
  };

  let frame = layout();

  const draw = () => {
    if (!alive) return;
    frame = layout();
    const edge = frame.edgeViewport;
    const progress = Math.min(1, Math.max(0, (window.innerHeight - edge) / Math.max(1, window.innerHeight)));
    const boxTop = edge - frame.abovePx;
    const boxBottom = edge + frame.below * cell[1];
    const inView = boxBottom >= -40 && boxTop <= window.innerHeight + 40;
    if (inView) {
      strip.render({
        progress,
        above: frame.abovePx,
        below: frame.below,
        rows: frame.rows,
      });
      wake();
    }
  };

  const wake = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      draw();
    });
  };

  renderRef.current = wake;
  draw();

  const onResize = () => wake();
  window.addEventListener("resize", onResize);
  const observer = new ResizeObserver(() => wake());
  for (const el of source.observe) observer.observe(el);

  return () => {
    alive = false;
    renderRef.current = () => {};
    window.removeEventListener("resize", onResize);
    observer.disconnect();
    strip.dispose();
    canvas.remove();
  };
}

function mountEnterSeam(host: HTMLDivElement, root: HTMLElement, renderRef: { current: () => void }) {
  const sticky = root.querySelector<HTMLElement>("[data-vision-seam-sticky]");
  const copy = root.querySelector<HTMLElement>("[data-vision-seam-copy]");
  const next = root.querySelector<HTMLElement>("[data-vision-seam-next]");
  const heading = root.querySelector<HTMLElement>("[data-vision-seam-heading]");
  if (!sticky || !copy || !next) return () => {};

  return mountStrip(host, root, renderRef, DARK, 3.0, {
    getEdge: () => sticky.getBoundingClientRect().bottom,
    roomUp: () => {
      const stickyRect = sticky.getBoundingClientRect();
      const copyRect = copy.getBoundingClientRect();
      return Math.max(0, stickyRect.bottom - copyRect.bottom - GAP);
    },
    roomDown: () => {
      const stickyRect = sticky.getBoundingClientRect();
      const headingTop = heading
        ? heading.getBoundingClientRect().top
        : stickyRect.bottom + CELL[1] + GAP;
      return Math.max(0, headingTop - stickyRect.bottom - GAP);
    },
    observe: [sticky, next],
  });
}

function mountExitSeam(host: HTMLDivElement, root: HTMLElement, renderRef: { current: () => void }) {
  const process = root.querySelector<HTMLElement>("[data-vision-seam-next]");
  const next = root.querySelector<HTMLElement>("[data-process-exit-next]");
  const heading = root.querySelector<HTMLElement>("[data-process-exit-heading]");
  if (!process || !next) return () => {};

  const lastCard = () => {
    const cards = process.querySelectorAll<HTMLElement>("[data-feature-id]");
    return cards[cards.length - 1] ?? null;
  };

  return mountStrip(host, root, renderRef, LIGHT, 7.4, {
    getEdge: () => process.getBoundingClientRect().bottom,
    roomUp: () => {
      const processRect = process.getBoundingClientRect();
      const card = lastCard();
      const contentBottom = card ? card.getBoundingClientRect().bottom : processRect.top + processRect.height * 0.7;
      return Math.max(0, processRect.bottom - contentBottom - GAP);
    },
    roomDown: () => {
      const processRect = process.getBoundingClientRect();
      const headingTop = heading
        ? heading.getBoundingClientRect().top
        : next.getBoundingClientRect().top + CELL[1] + GAP;
      return Math.max(0, headingTop - processRect.bottom - GAP);
    },
    observe: [process, next],
  });
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function SeamHost({
  mount,
}: {
  mount: (host: HTMLDivElement, root: HTMLElement, renderRef: { current: () => void }) => () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<() => void>(() => {});
  const reduced = useReducedMotion();

  useLenis(() => {
    renderRef.current();
  });

  useEffect(() => {
    if (reduced) return;
    const host = hostRef.current;
    const root = host?.parentElement;
    if (!host || !root) return;
    return mount(host, root, renderRef);
  }, [reduced, mount]);

  if (reduced) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-20 overflow-hidden"
    />
  );
}

export default function VisionProcessTypesetSeam() {
  return <SeamHost mount={mountEnterSeam} />;
}

export function ProcessExitTypesetSeam() {
  return <SeamHost mount={mountExitSeam} />;
}
