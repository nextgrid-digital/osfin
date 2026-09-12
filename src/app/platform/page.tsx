import InteriorPage from "../components/interior-page";
import AptosIsTheSection from "../sections/aptos-is-the-section";
import ExperimentLaunchScaleSection from "../sections/experiment-launch-scale-section";
import S9bTransactionsProcessedSection from "../sections/s9b-transactions-processed-section";

export const metadata = {
  title: "Osfin — Platform",
};

export default function PlatformPage() {
  return (
    <InteriorPage
      kicker="The platform"
      title="One workflow from fetch to close"
      lede="Bring records together, match them at volume, then hand exceptions to the agents that trace, resolve, and keep an audit trail."
    >
      <AptosIsTheSection />
      <S9bTransactionsProcessedSection />
      <ExperimentLaunchScaleSection />
    </InteriorPage>
  );
}
