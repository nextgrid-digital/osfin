import type { ReactNode } from "react";

const ink =
  "not-typeset pointer-events-none font-[family-name:var(--font-mono)] text-[8px] leading-[1.35] font-medium tracking-[0.08em] text-[#5D524B]/25 uppercase";

function Barcode({ bars }: { bars: number[] }) {
  return (
    <div className="flex h-2.5 items-end gap-px text-current" aria-hidden>
      {bars.map((width, i) => (
        <span
          key={i}
          className="bg-current"
          style={{
            width,
            height: `${56 + ((i * 17) % 44)}%`,
          }}
        />
      ))}
    </div>
  );
}

function Dots({ count = 2 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="size-1.5 rounded-full bg-current" />
      ))}
    </div>
  );
}

function Frame({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`border border-dashed border-[#5D524B]/15 p-2 ${className}`}>
      {children}
    </div>
  );
}

/** Scattered ledger fragments for the philosophy section — same language as careers, different record. */
export default function HomeVisionField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden max-lg:hidden"
    >
      <div className="absolute inset-0 mix-blend-multiply">
        {/* Left column */}
        <div
          className={`${ink} absolute top-[6%] left-0 w-[14rem] -rotate-1`}
        >
          <p className="!m-0">PHI-2026-004 // VERSION 1.0</p>
          <Frame className="mt-3 flex items-start justify-between gap-4">
            <div>
              <p className="!m-0">Classification</p>
              <p className="!m-0">Human work</p>
            </div>
            <Dots />
          </Frame>
        </div>

        <div
          className={`${ink} absolute top-[21%] -left-3 w-[11rem] rotate-[1.5deg] opacity-80`}
        >
          <p className="!m-0">LOAD.FLEET(AGENTS)</p>
          <p className="!m-0">SOURCE.READ()</p>
          <p className="!m-0">RUN.OPERATIONS()</p>
        </div>

        <div
          className={`${ink} absolute top-[37%] left-[0.5%] w-[9.5rem]`}
        >
          <div className="h-3 w-full bg-[#5D524B]/10" />
          <p className="!mt-2 !mb-0">Mundane → handled</p>
        </div>

        <div
          className={`${ink} absolute top-[51%] left-0 w-[12.5rem] -rotate-[0.8deg]`}
        >
          <p className="!m-0">Agent.fleet // live</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between gap-6">
              <span>Active</span>
              <span>41</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Escalated</span>
              <span>6</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Idle</span>
              <span>0</span>
            </div>
          </div>
        </div>

        <div
          className={`${ink} absolute bottom-[17%] left-[0.5%] w-[10rem] rotate-[0.6deg]`}
        >
          <Barcode bars={[1, 2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2]} />
          <p className="!mt-2 !mb-0">Time.returned 14.2h</p>
        </div>

        <div
          className={`${ink} absolute bottom-[8%] left-[8%] w-[8.5rem]`}
        >
          <Frame>
            <p className="!m-0">Keep</p>
            <p className="!m-0">Judgment</p>
          </Frame>
        </div>

        {/* Right column */}
        <div
          className={`${ink} absolute top-[7%] right-0 w-[12rem] text-right rotate-[0.4deg]`}
        >
          <p className="!m-0">Keep / judgment</p>
          <p className="!m-0">Keep / empathy</p>
          <p className="!m-0">Keep / create</p>
          <p className="!mt-2 !mb-0">Agent / operational</p>
        </div>

        <div
          className={`${ink} absolute top-[21%] -right-2 w-[11.5rem]`}
        >
          <p className="!m-0 text-right">PHI-2026-004 // VERSION 1.0</p>
          <div className="mt-2 ml-auto h-px w-24 bg-[#5D524B]/20" />
          <Barcode bars={[2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 3, 1, 1, 2]} />
        </div>

        <div
          className={`${ink} absolute top-[35%] right-0 w-[10.5rem] -rotate-[1.2deg]`}
        >
          <p className="!m-0">Proprietary work /</p>
          <p className="!m-0">Licensing: human</p>
          <p className="!m-0">Licensing: agent</p>
          <p className="!m-0">Proprietary work / keep</p>
        </div>

        <div
          className={`${ink} absolute top-[53%] -right-3 w-[9rem]`}
        >
          <Frame className="h-[4.75rem]">
            <p className="!m-0">Decision.required</p>
            <p className="!mt-3 !mb-0">Show empathy</p>
          </Frame>
        </div>

        <div
          className={`${ink} absolute bottom-[15%] right-0 w-[11rem] rotate-[1deg]`}
        >
          <p className="!m-0">Outcome.owned</p>
          <p className="!m-0">Room to innovate</p>
          <p className="!m-0">Cost.of.mundane ↓</p>
        </div>

        <div
          className={`${ink} absolute bottom-[7%] right-[9%] w-[7.5rem]`}
        >
          <Frame className="flex items-center justify-between gap-3">
            <span>Create</span>
            <Dots count={3} />
          </Frame>
        </div>
      </div>
    </div>
  );
}
