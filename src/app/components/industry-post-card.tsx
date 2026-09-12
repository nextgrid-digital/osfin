export type IndustryPostVariant = "chart" | "object" | "list";

export type IndustryPost = {
  href: string;
  label: string;
  lede: string;
};

const VARIANTS = ["chart", "object", "list"] as const;

const SURFACES: Record<IndustryPostVariant, string> = {
  chart: "bg-[#f4efe6] text-[#1b1914]",
  object: "bg-[#c8c0b4] text-[#1b1914]",
  list: "bg-[#eee4f5] text-[#1b1914]",
};

const LIST_ITEMS = [
  { title: "Root-cause identification", body: "Connect cases across banks, gateways and ledgers." },
  { title: "Recovery rules engine", body: "Find the next permitted path for each exception." },
  { title: "Exception taken", body: "Appeals, residual requests and reviews stay attached." },
  { title: "Continuous follow-up", body: "Follow up until the payment is resolved." },
] as const;

function CardHeader({ metric }: { metric: string }) {
  return (
    <div className="flex items-center justify-end">
      <span className="shrink-0 [font-family:'Akkurat_Mono-dea851e1d19028b9',ui-monospace,monospace] text-[0.625rem] leading-none tracking-[0.33px] uppercase opacity-70">
        {metric}
      </span>
    </div>
  );
}

function ChartBody() {
  const osfin = [28, 18, 16, 14];
  const vendors = [92, 78, 70, 64];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h3 className="mt-6 block text-[1.75rem] [font-weight:335] leading-[1.85rem] tracking-[-0.06em] [font-feature-settings:'calt']">
        22% recovery cost at 50% of the cost.
      </h3>
      <div className="mt-8 flex min-h-0 flex-1 flex-col justify-end">
        <div className="relative h-40">
          <div className="absolute inset-0 flex flex-col justify-between" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="block h-px w-full bg-[#1b1914]/15" />
            ))}
          </div>
          <div className="relative flex h-full items-end justify-between gap-8 px-1">
            <BarGroup bars={osfin} />
            <BarGroup bars={vendors} />
          </div>
        </div>
        <div className="mt-3 flex justify-between [font-family:'Akkurat_Mono-dea851e1d19028b9',ui-monospace,monospace] text-[0.5625rem] uppercase tracking-[0.28px] opacity-60">
          <span>Recovery</span>
          <span>Cost</span>
        </div>
        <div className="mt-3 flex gap-4 [font-family:'Akkurat_Mono-dea851e1d19028b9',ui-monospace,monospace] text-[0.5625rem] uppercase tracking-[0.28px] opacity-60">
          <span>Osfin</span>
          <span>Traditional vendors</span>
        </div>
      </div>
    </div>
  );
}

function BarGroup({ bars }: { bars: readonly number[] }) {
  return (
    <div className="flex h-full items-end gap-1.5">
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-3.5 bg-[#1b1914]/75"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function ObjectBody() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 items-center justify-center py-6" aria-hidden="true">
        <PaperPlane />
      </div>
      <h3 className="block text-[1.85rem] [font-weight:335] leading-[2rem] tracking-[-0.06em] [font-feature-settings:'calt']">
        What if claims actually kept moving?
      </h3>
    </div>
  );
}

function PaperPlane() {
  return (
    <svg className="h-36 w-36" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <path d="M12 78 L148 18 L86 108 Z" fill="#2a2118" />
      <path d="M12 78 L86 108 L68 72 Z" fill="#4a3a2c" />
      <path d="M68 72 L148 18 L86 108 Z" fill="#1b1914" />
      <path d="M68 72 L96 54 L148 18" stroke="#c8c0b4" strokeWidth="1.2" />
    </svg>
  );
}

function ListBody() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <h3 className="mt-6 block text-[1.75rem] [font-weight:335] leading-[1.85rem] tracking-[-0.06em] [font-feature-settings:'calt']">
        Manual workflows became the default.
      </h3>
      <ul className="mt-8 flex flex-col gap-4">
        {LIST_ITEMS.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#1b1914]/40" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b1914]/35" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.8125rem] [font-weight:420] leading-5">{item.title}</span>
              <span className="mt-0.5 block text-[0.75rem] leading-4 opacity-65">{item.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostInterior({ variant }: { variant: IndustryPostVariant }) {
  switch (variant) {
    case "chart":
      return <ChartBody />;
    case "object":
      return <ObjectBody />;
    case "list":
      return <ListBody />;
    default: {
      const exhaustive: never = variant;
      throw new Error(`Unhandled industry post variant: ${exhaustive}`);
    }
  }
}

function footerCopy(variant: IndustryPostVariant, lede: string): string {
  switch (variant) {
    case "chart":
      return lede;
    case "object":
      return "Osfin pairs agents with human review to progress exceptions end to end.";
    case "list":
      return "They don't have to stay that way.";
    default: {
      const exhaustive: never = variant;
      throw new Error(`Unhandled industry post variant: ${exhaustive}`);
    }
  }
}

export function industryPostVariant(index: number): IndustryPostVariant {
  return VARIANTS[index % VARIANTS.length] ?? "chart";
}

/** Portrait social-post card used by the industries carousel. */
export default function IndustryPostCard({
  post,
  variant,
}: {
  post: IndustryPost;
  variant: IndustryPostVariant;
}) {
  return (
    <a
      className={`flex relative w-[21rem] shrink-0 aspect-[3/4] flex-col rounded-[1.75rem] p-5 max-lg:w-[16.5rem] 2xl:w-[24rem] ${SURFACES[variant]} hover:brightness-[0.97]`}
      href={post.href}
    >
      <CardHeader metric={post.label} />
      <PostInterior variant={variant} />
      <p className="mt-auto pt-5 text-[0.75rem] leading-4 opacity-70">{footerCopy(variant, post.lede)}</p>
    </a>
  );
}
