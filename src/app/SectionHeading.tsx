import { TextReveal } from "@/components/ui/cascade-text";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";

type SectionHeadingProps = {
  label?: string;
  title: React.ReactNode;
  cta?: { href: string; label: string } | null;
  aside?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
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

  const revealTitle = typeof title === "string" && (titleAs === "h1" || title.includes("\n") || Boolean(aside));
  const multilineTitle = typeof title === "string" && title.includes("\n");
  const singleLineAside = Boolean(aside) && !multilineTitle;
  const titleContent = revealTitle ? (
    <KineticTextReveal
      key={title}
      text={title}
      startOnView
      splitBy={multilineTitle ? "lines" : "words"}
      maskClassName={
        multilineTitle || singleLineAside ? "block max-w-full whitespace-normal md:whitespace-nowrap" : undefined
      }
      className={
        multilineTitle || singleLineAside
          ? aside
            ? "w-full max-w-full items-center justify-center text-center md:w-max"
            : "w-full max-w-full md:w-max"
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
            : "flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10"
        } ${label ? "mt-5 md:mt-6" : ""}`}
      >
        <TitleTag
          className={`!mt-0 ${
            singleLineAside
              ? "max-w-full md:w-max md:whitespace-nowrap"
              : aside
                ? "max-w-[44rem]"
                : multilineTitle
                  ? "max-w-full md:w-max md:shrink-0"
                  : "max-w-full sm:max-w-[40rem]"
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
            <p className="!mt-0 line-clamp-3 !text-[14px] !leading-[1.5]">{aside}</p>
          </div>
        ) : null}

        {resolvedCta ? (
          <TextReveal
            href={resolvedCta.href}
            text={resolvedCta.label}
            className={`not-typeset inline-flex h-10 shrink-0 items-center justify-center rounded-none px-5 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] uppercase transition hover:opacity-90 ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
            data-not-typeset=""
          />
        ) : null}
      </div>
    </div>
  );
}
