import DittoMotion from "./ditto/DittoMotion";
import PaymentsHeroSection from "./payments/sections/hero-section";
import EfficientPaymentsAtSection from "./payments/sections/efficient-payments-at-section";
import AptosIsTheSection from "./sections/aptos-is-the-section";
import S9bTransactionsProcessedSection from "./sections/s9b-transactions-processed-section";
import WhatRunsOnSection from "./sections/what-runs-on-section";
import LogoCloudSection from "./sections/logo-cloud-section";
import Section6 from "./sections/section6";
import RealWorldAptosSection from "./sections/real-world-aptos-section";
import DiscoverWhatBeingSection from "./sections/discover-what-being-section";
import OnboardUsersWithSection from "./sections/onboard-users-with-section";
import ExperimentLaunchScaleSection from "./sections/experiment-launch-scale-section";
import Footer from "./sections/footer";
import PaymentsBody from "./payments/PaymentsBody";

export default function Page() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="block grow bg-background">
          <PaymentsHeroSection />
          <AptosIsTheSection />
          <S9bTransactionsProcessedSection />
          <EfficientPaymentsAtSection />
          <WhatRunsOnSection />
          <LogoCloudSection />
          <Section6 />
          <RealWorldAptosSection />
          <DiscoverWhatBeingSection />
          <OnboardUsersWithSection />
          <ExperimentLaunchScaleSection />
          {" "}
        </main>
        <Footer />
        <div className="payments-clone">
          <PaymentsBody />
        </div>
        {" "}
      </div>
      {" "}
      <DittoMotion spec={{"waapi":[],"rotators":[],"reveals":[{"anchor":"motion-span","opacity":"0","transform":"none","transition":"color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.15s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.15s cubic-bezier(0.4, 0, 0.2, 1), -webkit-backdrop-filter 0.15s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.15s cubic-bezier(0.4, 0, 0.2, 1), display 0.15s cubic-bezier(0.4, 0, 0.2, 1), content-visibility 0.15s cubic-bezier(0.4, 0, 0.2, 1), overlay 0.15s cubic-bezier(0.4, 0, 0.2, 1), pointer-events 0.15s cubic-bezier(0.4, 0, 0.2, 1)"},{"anchor":"motion-span-2","opacity":"0","transform":"none","transition":"color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), translate 0.15s cubic-bezier(0.4, 0, 0.2, 1), scale 0.15s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.15s cubic-bezier(0.4, 0, 0.2, 1), filter 0.15s cubic-bezier(0.4, 0, 0.2, 1), -webkit-backdrop-filter 0.15s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.15s cubic-bezier(0.4, 0, 0.2, 1), display 0.15s cubic-bezier(0.4, 0, 0.2, 1), content-visibility 0.15s cubic-bezier(0.4, 0, 0.2, 1), overlay 0.15s cubic-bezier(0.4, 0, 0.2, 1), pointer-events 0.15s cubic-bezier(0.4, 0, 0.2, 1)"}],"marquees":[]}} />
    </>
  );
}
