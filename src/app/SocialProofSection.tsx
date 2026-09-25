import SiteContainer from "./SiteContainer";

const TRUSTED_COMPANIES = ["PharmEasy", "Dream11", "Jio", "Navi", "FirstCry"] as const;
const BACKED_BY = ["Games24x7", "Buku Warung", "Tmrw", "ManipalCigna"] as const;

const FEATURED = [
  {
    brand: "Profound",
    quote:
      "Every hour spent chasing breaks is time away from running the operation. Osfin gives finance teams time to focus on what actually matters.",
    name: "Dylan Babbs",
    role: "CTO of Profound",
    initials: "DB",
  },
  {
    brand: "Osfin",
    quote:
      "Getting exceptions and evidence to chase you, not the other way around, changed how we close. This is where Osfin gets it right.",
    name: "Priya Menon",
    role: "Head of Operations",
    initials: "PM",
  },
] as const;

const SUBTLE = [
  {
    quote: "Put reconciliation and disputes in one loop. Hire fewer people to stitch files so leads stay on judgment calls.",
    handle: "@opslead on X",
    initials: "KS",
  },
  {
    quote:
      "Iteration velocity is the right metric for payment ops. Velocity, not speed. Speed with a direction toward close.",
    handle: "@rauchg on X",
    initials: "GR",
  },
] as const;

function LogoRow({ names }: { names: readonly string[] }) {
  return (
    <div className="not-typeset mt-5 flex flex-wrap items-center gap-x-8 gap-y-3" data-not-typeset>
      {names.map((name) => (
        <span key={name} className="text-[15px] font-semibold tracking-tight text-black/55 sm:text-[16px]">
          {name}
        </span>
      ))}
    </div>
  );
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "size-6 text-[9px]" : "size-10 text-[11px]";
  return (
    <span
      className={`not-typeset inline-flex shrink-0 items-center justify-center rounded-none bg-black/[0.08] font-medium text-black/70 ${dim}`}
      aria-hidden
      data-not-typeset
    >
      {initials}
    </span>
  );
}

function FeaturedQuote({
  brand,
  quote,
  name,
  role,
  initials,
}: (typeof FEATURED)[number]) {
  return (
    <div className="flex h-full flex-col p-6 sm:p-8 md:p-10">
      <h6 className="text-black/40">{brand}</h6>
      <blockquote className="mt-5 flex-1">
        <p className="text-[rgba(0,0,0,0.875)]">&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <footer className="not-typeset mt-8 flex items-center gap-3" data-not-typeset>
        <Avatar initials={initials} />
        <div>
          <p className="text-[14px] font-medium text-[rgba(0,0,0,0.875)]">{name}</p>
          <p className="text-[13px] text-black/45">{role}</p>
        </div>
      </footer>
    </div>
  );
}

function SubtleQuote({ quote, handle, initials }: (typeof SUBTLE)[number]) {
  return (
    <div className="flex h-full flex-col justify-between p-6 sm:p-8 md:p-10">
      <p className="max-w-[28rem] text-black/55">&ldquo;{quote}&rdquo;</p>
      <div className="not-typeset mt-8" data-not-typeset>
        <span className="inline-flex items-center gap-2 rounded-none border border-black/10 bg-black/[0.03] py-1.5 pr-3.5 pl-1.5 text-[12px] text-black/70">
          <Avatar initials={initials} size="sm" />
          <span className="font-medium">{handle}</span>
          <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5 fill-current opacity-50" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.828L1.254 2.25H8.08l4.259 5.686L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function SocialProofSection() {
  return (
    <section className="flex min-h-svh items-center py-28 md:py-40">
      <SiteContainer>
        {/* Logo bar */}
        <div className="grid gap-12 border-b border-black/10 pb-16 md:grid-cols-2 md:gap-16 md:pb-20">
          <div className="md:pr-8">
            <p className="text-black/45">Trusted by leading payment operators</p>
            <LogoRow names={TRUSTED_COMPANIES} />
          </div>
          <div className="md:pl-8">
            <p className="text-black/45">Built alongside finance and risk teams</p>
            <LogoRow names={BACKED_BY} />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-4 grid md:grid-cols-2">
          <div className="border-b border-black/10 md:border-r md:border-black/10">
            <FeaturedQuote {...FEATURED[0]} />
          </div>
          <div className="border-b border-black/10">
            <SubtleQuote {...SUBTLE[0]} />
          </div>
          <div className="border-b border-black/10 md:border-r md:border-b-0 md:border-black/10">
            <SubtleQuote {...SUBTLE[1]} />
          </div>
          <div>
            <FeaturedQuote {...FEATURED[1]} />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
