import InteriorPage from "../components/interior-page";
import EfficientPaymentsAtSection from "../payments/sections/efficient-payments-at-section";
import Section4 from "../payments/sections/section4";
import OnboardUsersWithSection from "../sections/onboard-users-with-section";

export const metadata = {
  title: "Osfin — Solutions",
};

export default function SolutionsPage() {
  return (
    <InteriorPage
      kicker="Solutions"
      title="Exceptions, explained and actioned"
      lede="When records disagree, agents trace the cause, propose the next step, and keep policy and permissions attached through close."
    >
      <OnboardUsersWithSection />
      <EfficientPaymentsAtSection />
      <Section4 />
    </InteriorPage>
  );
}
