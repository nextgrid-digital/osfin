import InteriorPage from "../components/interior-page";
import WhatRunsOnSection from "../sections/what-runs-on-section";

export const metadata = {
  title: "Osfin — Industries",
};

export default function IndustriesPage() {
  return (
    <InteriorPage
      kicker="Industries"
      title="Built for financial operations"
      lede="Banking, payments, fintech, insurance, capital markets, and marketplaces — the same workflow, tuned to how each set of records arrives."
    >
      <WhatRunsOnSection />
    </InteriorPage>
  );
}
