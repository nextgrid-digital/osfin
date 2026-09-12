import type { ReactNode } from "react";
import Footer from "../sections/footer";
import InteriorHero from "./interior-hero";

type InteriorPageProps = {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
};

/** Shared marketing wrapper for primary-nav routes. */
export default function InteriorPage({ kicker, title, lede, children }: InteriorPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="block grow bg-background">
        <InteriorHero
          kicker={kicker}
          title={title}
          lede={lede}
          cta={{ href: "/company#contact", label: "Talk to an expert" }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
}
