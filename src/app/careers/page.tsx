import type { Metadata } from "next";
import SiteClose from "../SiteClose";
import ClonePage from "./_clone/ClonePage";

export const metadata: Metadata = {
  title: "Careers — Osfin",
  description:
    "Forward-deployed engineers and operators sit with finance, operations, and risk until reconciliation, disputes, controls, and close actually change.",
};

export default function CareersPage() {
  return (
    <div
      data-transition="container"
      data-namespace="careers"
      className="site-shell bg-background"
    >
      <div
        data-clone="replay-careers"
        className="relative z-10 min-h-full flex flex-col text-foreground [font-family:Geist,_'Geist_Fallback'] text-base font-normal not-italic leading-6 tracking-[normal] bg-background"
      >
        <ClonePage />
      </div>
      <SiteClose reveal />
    </div>
  );
}
