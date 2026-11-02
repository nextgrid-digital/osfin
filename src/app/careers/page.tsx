import type { Metadata } from "next";
import SiteClose from "../SiteClose";
import ClonePage from "./_clone/ClonePage";
import { getLinkedInJobs } from "@/lib/linkedin-jobs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Careers — Osfin",
  description:
    "Forward-deployed engineers and operators sit with finance, operations, and risk until reconciliation, disputes, controls, and close actually change.",
};

export default async function CareersPage() {
  const jobs = await getLinkedInJobs();
  return (
    <div
      data-transition="container"
      data-namespace="careers"
      className="site-shell bg-background"
    >
      <div
        data-clone="replay-careers"
        className="relative z-10 min-h-full flex flex-col bg-background text-base font-normal not-italic leading-6 tracking-[normal] text-foreground font-[family-name:var(--font-inter)]"
      >
        <ClonePage jobs={jobs} />
      </div>
      <SiteClose reveal tone="dark" />
    </div>
  );
}
