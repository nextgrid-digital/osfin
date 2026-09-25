"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

const COLUMNS = [
  {
    top: "Payment records",
    bottom: "Ingest",
    tip: "Bring fragmented payment records into context.",
  },
  {
    top: "Task systems",
    bottom: "Assign",
    tip: "Assign defined tasks with clear inputs and outputs.",
  },
  {
    top: "Workflow systems",
    bottom: "Coordinate",
    tip: "Coordinate handoffs across connected workflows.",
  },
  {
    top: "Governed autonomy",
    bottom: "Review",
    tip: "Execute within policy, with review and traceability.",
  },
] as const;

const VB_W = 640;
const VB_H = 420;
const COL_W = VB_W / 4;

type ApproachProgressionDiagramProps = {
  activeStep: number;
  onStepChange: (step: number) => void;
  reducedMotion?: boolean;
};

function stageOpacity(
  stage: number,
  activeStep: number,
  hoverStep: number | null,
  reducedMotion: boolean,
) {
  const focus = hoverStep ?? activeStep;

  // Hover/focus on a column: emphasize that column strongly
  if (hoverStep !== null) {
    if (stage === hoverStep) return 1;
    if (Math.abs(stage - hoverStep) === 1) return 0.4;
    return 0.25;
  }

  // Accordion-driven emphasis bands
  const bands: Record<number, number[]> = {
    0: [0, 1],
    1: [1, 2],
    2: [2, 3],
    3: [3, 2],
  };
  const primary = bands[focus] ?? [focus];

  if (reducedMotion) {
    return primary.includes(stage) ? 0.95 : 0.42;
  }
  if (stage === primary[0]) return 1;
  if (primary.includes(stage)) return 0.78;
  return 0.28;
}

function Dot({ x, y, r = 1.2 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="currentColor" />;
}

function Node({
  x,
  y,
  size = 5,
  filled = false,
}: {
  x: number;
  y: number;
  size?: number;
  filled?: boolean;
}) {
  const half = size / 2;
  return (
    <rect
      x={x - half}
      y={y - half}
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1}
    />
  );
}

export default function ApproachProgressionDiagram({
  activeStep,
  onStepChange,
  reducedMotion = false,
}: ApproachProgressionDiagramProps) {
  const descId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(reducedMotion);
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const [focusStep, setFocusStep] = useState<number | null>(null);

  const emphasizeStep = focusStep ?? hoverStep;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    if (inView) {
      const t = window.setTimeout(() => setRevealed(true), 40);
      return () => window.clearTimeout(t);
    }
  }, [inView, reducedMotion]);

  const op = useMemo(
    () =>
      [0, 1, 2, 3].map((s) =>
        stageOpacity(s, activeStep, emphasizeStep, reducedMotion),
      ),
    [activeStep, emphasizeStep, reducedMotion],
  );

  const showFeedback = activeStep === 3 || emphasizeStep === 3;
  const runMarkers = inView && !reducedMotion && revealed;

  // Shared path d strings for markers
  const pathMain =
    "M 28 210 C 70 170, 110 250, 150 205 C 175 180, 195 160, 220 185 C 245 210, 265 230, 290 200 C 320 165, 350 155, 380 190 C 410 225, 440 250, 470 210 C 490 185, 510 170, 530 200";
  const pathUpper =
    "M 40 160 C 80 140, 120 180, 160 155 C 200 130, 240 145, 280 165 C 330 190, 370 140, 420 165 C 460 185, 500 150, 535 175";
  const pathLower =
    "M 35 265 C 75 285, 115 240, 155 260 C 195 280, 240 255, 285 245 C 335 230, 375 270, 425 250 C 465 235, 505 255, 540 230";
  const pathFeedback =
    "M 545 195 C 500 120, 420 95, 340 130 C 300 145, 280 170, 270 195";

  return (
    <div
      ref={rootRef}
      className="relative h-full min-h-[22rem] w-full min-w-0"
      aria-label="Progression from payment records through task and workflow systems to governed autonomy"
      aria-describedby={descId}
    >
      <p id={descId} className="sr-only">
        Diagram of four stages: payment records ingest as fragmented source
        records, task systems assign discrete work, workflow systems coordinate
        shared context, and governed autonomy reviews work inside a policy
        boundary. Selecting a column updates the approach steps.
      </p>

      <div className="h-full w-full overflow-x-auto">
        <div className="relative mx-auto h-full min-h-[22rem] w-full min-w-[36rem]">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="h-full w-full text-black"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <style>{`
                .apd-path {
                  fill: none;
                  stroke: currentColor;
                  stroke-width: 1;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  transition: opacity 0.45s ease, stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .apd-reveal {
                  stroke-dasharray: 1200;
                  stroke-dashoffset: 1200;
                }
                .apd-reveal.is-on {
                  stroke-dashoffset: 0;
                }
                .apd-feedback {
                  stroke-dasharray: 4 5;
                  fill: none;
                  stroke: currentColor;
                  stroke-width: 1;
                  transition: opacity 0.5s ease;
                }
                .apd-label {
                  font-family: var(--font-mono), ui-monospace, monospace;
                  font-size: 9px;
                  font-weight: 500;
                  letter-spacing: -0.02em;
                  text-transform: uppercase;
                  fill: currentColor;
                }
                .apd-anno {
                  font-family: var(--font-mono), ui-monospace, monospace;
                  font-size: 8px;
                  font-weight: 500;
                  letter-spacing: -0.02em;
                  text-transform: uppercase;
                  fill: currentColor;
                }
                .apd-marker {
                  fill: currentColor;
                }
              `}</style>
            </defs>

            {/* Column separators */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`sep-${i}`}
                x1={i * COL_W}
                y1={36}
                x2={i * COL_W}
                y2={VB_H - 36}
                stroke="currentColor"
                strokeOpacity={0.14}
                strokeWidth={1}
              />
            ))}

            {/* Top labels */}
            {COLUMNS.map((col, i) => (
              <text
                key={`top-${col.top}`}
                x={i * COL_W + COL_W / 2}
                y={28}
                textAnchor="middle"
                className="apd-label"
                opacity={op[i]}
              >
                {col.top}
              </text>
            ))}

            {/* Bottom labels + dotted leaders */}
            {COLUMNS.map((col, i) => {
              const cx = i * COL_W + COL_W / 2;
              return (
                <g key={`bot-${col.bottom}`} opacity={op[i]}>
                  <line
                    x1={cx}
                    y1={340}
                    x2={cx}
                    y2={388}
                    stroke="currentColor"
                    strokeWidth={1}
                    strokeDasharray="2 3"
                    strokeOpacity={0.45}
                  />
                  <text
                    x={cx}
                    y={404}
                    textAnchor="middle"
                    className="apd-label"
                  >
                    {col.bottom}
                  </text>
                </g>
              );
            })}

            {/* ---- Stage 0: Payment records (scattered) ---- */}
            <g opacity={op[0]} style={{ transition: "opacity 0.45s ease" }}>
              {/* Scatter field */}
              {[
                [18, 175],
                [28, 192],
                [22, 210],
                [34, 225],
                [16, 245],
                [42, 168],
                [48, 188],
                [55, 208],
                [46, 232],
                [58, 252],
                [68, 172],
                [72, 198],
                [78, 220],
                [70, 242],
                [88, 185],
                [94, 205],
                [90, 228],
                [102, 195],
                [108, 215],
                [100, 248],
                [118, 178],
                [124, 200],
                [130, 222],
                [120, 240],
              ].map(([x, y], i) =>
                i % 3 === 0 ? (
                  <Node key={`s0n-${i}`} x={x} y={y} size={4} filled={i % 6 === 0} />
                ) : (
                  <Dot key={`s0d-${i}`} x={x} y={y} r={i % 5 === 0 ? 1.4 : 1} />
                ),
              )}
              {/* Emerging streams */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 50 200 C 90 185, 120 210, 148 198"
                opacity={0.7}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 45 230 C 85 245, 115 220, 152 235"
                opacity={0.55}
                style={{ transitionDelay: revealed ? "0.15s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 55 170 C 95 155, 125 175, 155 168"
                opacity={0.5}
                style={{ transitionDelay: revealed ? "0.08s" : "0s" }}
              />
              {/* Source records annotation */}
              <line
                x1={62}
                y1={188}
                x2={78}
                y2={118}
                stroke="currentColor"
                strokeWidth={0.75}
                strokeOpacity={0.5}
              />
              <text x={82} y={114} className="apd-anno" opacity={0.7}>
                Source records
              </text>
            </g>

            {/* ---- Stage 1: Task systems ---- */}
            <g opacity={op[1]} style={{ transition: "opacity 0.45s ease" }}>
              {/* Task cluster A */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 148 198 L 175 198 L 175 175 L 198 175 L 198 198 L 220 198"
                style={{ transitionDelay: revealed ? "0.25s" : "0s" }}
              />
              <Node x={175} y={175} size={5} filled />
              <Node x={198} y={175} size={5} />
              <Node x={175} y={198} size={5} />
              <Node x={198} y={198} size={5} filled />
              <Node x={220} y={198} size={5} />

              {/* Task cluster B */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 152 235 L 180 235 L 180 255 L 205 255 L 205 235 L 230 235"
                style={{ transitionDelay: revealed ? "0.32s" : "0s" }}
              />
              <Node x={180} y={235} size={5} />
              <Node x={180} y={255} size={5} filled />
              <Node x={205} y={255} size={5} />
              <Node x={205} y={235} size={5} filled />
              <Node x={230} y={235} size={5} />

              {/* Task cluster C (upper) */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 155 168 L 185 168 L 185 150 L 210 150 L 210 168 L 235 168"
                style={{ transitionDelay: revealed ? "0.28s" : "0s" }}
              />
              <Node x={185} y={168} size={5} filled />
              <Node x={185} y={150} size={5} />
              <Node x={210} y={150} size={5} filled />
              <Node x={210} y={168} size={5} />
              <Node x={235} y={168} size={5} />

              {/* Continuity into workflow */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 220 198 C 245 198, 260 210, 280 205"
                style={{ transitionDelay: revealed ? "0.4s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 230 235 C 250 235, 265 220, 285 225"
                style={{ transitionDelay: revealed ? "0.42s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 235 168 C 255 168, 270 180, 290 185"
                style={{ transitionDelay: revealed ? "0.38s" : "0s" }}
              />
            </g>

            {/* ---- Stage 2: Workflow systems ---- */}
            <g opacity={op[2]} style={{ transition: "opacity 0.45s ease" }}>
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 280 205 C 305 195, 320 170, 345 185 C 365 198, 375 220, 395 210"
                style={{ transitionDelay: revealed ? "0.55s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 285 225 C 310 240, 330 250, 355 230 C 375 215, 390 205, 410 215"
                style={{ transitionDelay: revealed ? "0.6s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 290 185 C 315 160, 340 155, 365 175 C 385 190, 400 185, 420 190"
                style={{ transitionDelay: revealed ? "0.5s" : "0s" }}
              />
              {/* Merge / branch nodes */}
              <Node x={320} y={178} size={5} filled />
              <Node x={345} y={185} size={5} />
              <Node x={355} y={230} size={5} filled />
              <Node x={375} y={200} size={5} />
              <Node x={395} y={210} size={5} filled />
              <Node x={410} y={215} size={5} />
              <Node x={420} y={190} size={5} filled />

              {/* Cross connections */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 345 185 L 355 230"
                opacity={0.55}
                style={{ transitionDelay: revealed ? "0.65s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 375 200 L 420 190"
                opacity={0.55}
                style={{ transitionDelay: revealed ? "0.68s" : "0s" }}
              />

              {/* Shared context annotation */}
              <line
                x1={375}
                y1={200}
                x2={392}
                y2={128}
                stroke="currentColor"
                strokeWidth={0.75}
                strokeOpacity={0.5}
              />
              <text x={396} y={124} className="apd-anno" opacity={0.7}>
                Shared context
              </text>

              {/* Into mesh */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 420 190 C 445 185, 460 195, 478 200"
                style={{ transitionDelay: revealed ? "0.75s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 410 215 C 440 220, 455 210, 478 215"
                style={{ transitionDelay: revealed ? "0.78s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 395 210 C 430 205, 450 205, 478 208"
                style={{ transitionDelay: revealed ? "0.72s" : "0s" }}
              />
            </g>

            {/* ---- Stage 3: Governed autonomy mesh ---- */}
            <g opacity={op[3]} style={{ transition: "opacity 0.45s ease" }}>
              {/* Policy boundary */}
              <rect
                x={478}
                y={155}
                width={118}
                height={118}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="2 3"
                strokeOpacity={0.55}
              />

              {/* 5x6 mesh */}
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 5 }).map((_, col) => {
                  const x = 492 + col * 20;
                  const y = 170 + row * 16;
                  const filled = (row + col) % 2 === 0;
                  return (
                    <Node
                      key={`mesh-${row}-${col}`}
                      x={x}
                      y={y}
                      size={5}
                      filled={filled}
                    />
                  );
                }),
              )}

              {/* Light mesh connectors */}
              {Array.from({ length: 6 }).map((_, row) => (
                <line
                  key={`mh-${row}`}
                  x1={492}
                  y1={170 + row * 16}
                  x2={572}
                  y2={170 + row * 16}
                  stroke="currentColor"
                  strokeWidth={0.5}
                  strokeOpacity={0.2}
                />
              ))}
              {Array.from({ length: 5 }).map((_, col) => (
                <line
                  key={`mv-${col}`}
                  x1={492 + col * 20}
                  y1={170}
                  x2={492 + col * 20}
                  y2={250}
                  stroke="currentColor"
                  strokeWidth={0.5}
                  strokeOpacity={0.2}
                />
              ))}

              {/* Outflow wisps */}
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 596 200 L 625 195"
                strokeDasharray="2 3"
                opacity={0.4}
                style={{ transitionDelay: revealed ? "0.95s" : "0s" }}
              />
              <path
                className={`apd-path apd-reveal ${revealed ? "is-on" : ""}`}
                d="M 596 220 L 620 228"
                strokeDasharray="2 3"
                opacity={0.35}
                style={{ transitionDelay: revealed ? "1s" : "0s" }}
              />

              {/* Policy check annotation */}
              <line
                x1={537}
                y1={155}
                x2={537}
                y2={118}
                stroke="currentColor"
                strokeWidth={0.75}
                strokeOpacity={0.5}
              />
              <text x={541} y={114} className="apd-anno" opacity={0.7}>
                Policy check
              </text>
            </g>

            {/* Feedback path (continuous learning) */}
            <path
              className="apd-feedback"
              d={pathFeedback}
              opacity={showFeedback ? 0.65 : 0}
            />
            {showFeedback ? (
              <Node x={270} y={195} size={4} filled />
            ) : null}

            {/* Hidden reference paths for markers */}
            <path id="apd-path-main" d={pathMain} fill="none" stroke="none" />
            <path id="apd-path-upper" d={pathUpper} fill="none" stroke="none" />
            <path id="apd-path-lower" d={pathLower} fill="none" stroke="none" />

            {/* Flow markers */}
            {runMarkers ? (
              <>
                <rect width={4} height={4} className="apd-marker" opacity={0.85}>
                  <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#apd-path-main" />
                  </animateMotion>
                </rect>
                <rect width={3.5} height={3.5} className="apd-marker" opacity={0.55}>
                  <animateMotion
                    dur="11s"
                    begin="1.2s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#apd-path-upper" />
                  </animateMotion>
                </rect>
                <rect width={3.5} height={3.5} className="apd-marker" opacity={0.5}>
                  <animateMotion
                    dur="10s"
                    begin="2.4s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href="#apd-path-lower" />
                  </animateMotion>
                </rect>
              </>
            ) : null}
          </svg>

          {/* Column hit targets */}
          <div
            className="absolute inset-0 grid grid-cols-4"
            role="tablist"
            aria-label="Progression stages"
          >
            {COLUMNS.map((col, i) => {
              const selected = activeStep === i;
              const tipVisible = emphasizeStep === i;
              return (
                <button
                  key={col.top}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`${col.top}. ${col.tip}`}
                  onClick={() => onStepChange(i)}
                  onMouseEnter={() => setHoverStep(i)}
                  onMouseLeave={() => setHoverStep(null)}
                  onFocus={() => setFocusStep(i)}
                  onBlur={() => setFocusStep(null)}
                  className="relative border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/30"
                >
                  <span
                    className={`pointer-events-none absolute bottom-[14%] left-1/2 z-10 w-[min(11rem,90%)] -translate-x-1/2 rounded-none border border-black/10 bg-[#E4E4E4]/95 px-2 py-1.5 text-left font-[family-name:var(--font-mono)] text-[10px] leading-snug tracking-[-0.02em] text-black/75 shadow-none transition-opacity ${
                      tipVisible ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden={!tipVisible}
                  >
                    {col.tip}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
