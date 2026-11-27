import type { ReactNode } from "react";
import GatewayFlow from "@/components/ui/gateway-flow";
import SiteContainer from "./SiteContainer";

type Props = {
  /** Display lines stacked as centered blocks (Security-style). */
  lines: readonly string[];
  /** Optional content under the title (kept inside the hero band). */
  children?: ReactNode;
  /** Replace the default GatewayFlow backdrop (e.g. About GlyphMatrix). */
  backdrop?: ReactNode;
};

/** Shared hero for Company nav pages: backdrop + centered display title. */
export default function CompanyHero({ lines, children, backdrop }: Props) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
        {backdrop ?? (
          <GatewayFlow
            mode="light"
            className="h-full w-full"
          />
        )}
      </div>
      <SiteContainer className="relative z-10 pt-8 pb-14 sm:pb-16 md:pt-10 md:pb-24">
        <h1 className="mx-auto max-w-full text-balance text-center text-black">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        {children}
      </SiteContainer>
    </section>
  );
}
