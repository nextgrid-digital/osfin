import TransitionLink from "./TransitionLink";

export default function SiteLogo({ className = "text-[18px]" }: { className?: string }) {
  return (
    <TransitionLink
      href="/"
      aria-label="Osfin"
      className={`inline-flex items-center font-sans text-[18px] font-medium leading-none tracking-[-0.02em] text-current ${className}`}
    >
      Osfin
    </TransitionLink>
  );
}
