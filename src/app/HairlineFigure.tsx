"use client";

import { useEffect, useRef } from "react";

type HairlineHost = {
  stage: HTMLElement;
  svg: SVGSVGElement;
  read: { textContent: string };
};

type HairlineFigureDef = {
  name: string;
  means: string;
  range?: [number, number, number];
  mount: (host: HairlineHost, value: number) => { destroy: () => void };
};

type HairlineKernel = {
  inject: (root: Document) => void;
  mk: (tag: string, attrs: Record<string, string>, parent: Element) => SVGSVGElement;
};

/** Loads a public Hairline figure script and mounts it into a sized stage. */
export default function HairlineFigure({
  src,
  className = "",
  intensity,
  /** Extra CSS scale so the drawing fills a card (1 = native viewBox). */
  zoom = 1.4,
}: {
  src: string;
  className?: string;
  /** Overrides the figure's default mid-range intensity when set. */
  intensity?: number;
  zoom?: number;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const readEl = readRef.current;
    if (!stage || !readEl) return;

    let alive = true;
    let handle: { destroy: () => void } | undefined;
    const stopDrag = (event: PointerEvent) => event.stopPropagation();
    stage.addEventListener("pointerdown", stopDrag);

    const read = {
      get textContent() {
        return readEl.textContent ?? "";
      },
      set textContent(value: string) {
        readEl.textContent = value ?? "";
      },
    };

    (async () => {
      const [kernelText, figureText] = await Promise.all([
        fetch("/hairline/kernel.js").then((response) => response.text()),
        fetch(src).then((response) => response.text()),
      ]);
      if (!alive) return;
      const load = new Function(
        `let captured;\nfunction hairline(figure) { captured = figure; }\n${kernelText}\n${figureText}\nreturn { HL, captured };`,
      ) as () => { HL: HairlineKernel; captured: HairlineFigureDef };
      const { HL, captured } = load();
      if (!alive) return;
      HL.inject(document);
      stage.dataset.hairline = captured.name;
      stage.dataset.hairlineTheme = "light";
      stage.setAttribute("role", "img");
      stage.setAttribute("aria-label", captured.means);
      const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);
      const value = intensity ?? captured.range?.[1] ?? 0.5;
      handle = captured.mount({ stage, svg, read }, value);
    })();

    return () => {
      alive = false;
      stage.removeEventListener("pointerdown", stopDrag);
      handle?.destroy();
    };
  }, [src, intensity]);

  return (
    <div className={`flex size-full items-center justify-center overflow-hidden ${className}`.trim()}>
      <div
        ref={stageRef}
        className="relative h-full w-full max-w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:origin-center"
        style={zoom !== 1 ? { transform: `scale(${zoom})` } : undefined}
      >
        <span ref={readRef} className="sr-only" data-hairline-live="" />
      </div>
    </div>
  );
}
