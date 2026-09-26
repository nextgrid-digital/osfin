import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";

type SectionHeadingProps = {
  label?: string;
  title: React.ReactNode;
  cta?: { href: string; label: string } | null;
  aside?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  titleAs?: "h1" | "h2";
};

export default function SectionHeading({
  label,
  title,
  cta,
  aside,
  tone = "light",
  className = "",
  titleAs = "h2",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const resolvedCta =
    aside || cta === null
      ? null
      : (cta ?? { href: "#product", label: "See how it works" });
  const TitleTag = titleAs;

  const titleContent =
    typeof title === "string" &&
    (titleAs === "h1" || title.includes("\n")) ? (
      <KineticTextReveal
        text={title}
        startOnView
        splitBy={title.includes("\n") ? "lines" : "words"}
        maskClassName={title.includes("\n") ? "whitespace-nowrap" : undefined}
        className={
          title.includes("\n")
            ? aside
              ? "w-max max-w-none items-center text-center"
              : "w-max max-w-none"
            : "w-full max-w-full"
        }
      />
    ) : (
      title
    );

  return (
    <div className={`relative ${className}`}>
      {label ? (
        <h6 className={isDark ? "text-white/70" : "text-black/50"}>{label}</h6>
      ) : null}

      <div
        className={`flex ${
          aside
            ? "flex-col items-center gap-6 text-center"
            : "items-end justify-between gap-10"
        } ${label ? "mt-5 md:mt-6" : ""}`}
      >
        <TitleTag
          className={`!mt-0 ${
            aside
              ? "max-w-[40rem]"
              : typeof title === "string" && title.includes("\n")
                ? "w-max max-w-none shrink-0"
                : "max-w-[40rem]"
          } ${aside ? "text-center" : "text-left"} ${isDark ? "text-white" : "text-[rgba(0,0,0,0.875)]"}`}
        >
          {titleContent}
        </TitleTag>

        {aside ? (
          <div
            className={`!mt-0 max-w-[36rem] text-center ${
              isDark ? "text-white/60" : "text-black/55"
            }`}
          >
            <p className="!mt-0 line-clamp-3">{aside}</p>
          </div>
        ) : null}

        {resolvedCta ? (
          <a
            href={resolvedCta.href}
            className={`not-typeset inline-flex h-10 shrink-0 items-center justify-center rounded-none px-5 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] uppercase transition hover:opacity-90 ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
            data-not-typeset
          >
            {resolvedCta.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}
