import RevealFooter from "./RevealFooter";
import SiteFooter from "./SiteFooter";

export default function SiteClose({
  tone = "dark",
  reveal = true,
}: {
  tone?: "light" | "dark";
  reveal?: boolean;
}) {
  const footer = <SiteFooter tone={tone} />;

  return (
    <div className="typeset typeset-docs">
      {reveal ? <RevealFooter>{footer}</RevealFooter> : footer}
    </div>
  );
}
