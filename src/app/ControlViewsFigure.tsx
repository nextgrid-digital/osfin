"use client";

import { useEffect, useRef } from "react";

type HairlineHost = {
  stage: HTMLElement;
  svg: SVGSVGElement;
  read: { textContent: string };
};

type HairlineFigure = {
  name: string;
  means: string;
  mount: (host: HairlineHost, value: number) => { destroy: () => void };
};

type HairlineKernel = {
  inject: (root: Document) => void;
  mk: (tag: string, attrs: Record<string, string>, parent: Element) => SVGSVGElement;
};

export default function ControlViewsFigure() {
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
        fetch("/hairline/control-views.js").then((response) => response.text()),
      ]);
      if (!alive) return;
      const load = new Function(
        `let captured;\nfunction hairline(figure) { captured = figure; }\n${kernelText}\n${figureText}\nreturn { HL, captured };`,
      ) as () => { HL: HairlineKernel; captured: HairlineFigure };
      const { HL, captured } = load();
      if (!alive) return;
      HL.inject(document);
      stage.dataset.hairline = captured.name;
      stage.dataset.hairlineTheme = "light";
      stage.setAttribute("role", "img");
      stage.setAttribute("aria-label", captured.means);
      const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);
      handle = captured.mount({ stage, svg, read }, 35);
    })();

    return () => {
      alive = false;
      stage.removeEventListener("pointerdown", stopDrag);
      handle?.destroy();
    };
  }, []);

  return (
    <div className="flex size-full items-center justify-center">
      <div ref={stageRef} className="relative h-full max-w-full">
        <span ref={readRef} data-hairline-live="" />
      </div>
    </div>
  );
}
