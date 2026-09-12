import InteriorPage from "../components/interior-page";
import LogoCloudSection from "../sections/logo-cloud-section";

export const metadata = {
  title: "Osfin — Company",
};

export default function CompanyPage() {
  return (
    <InteriorPage
      kicker="Company"
      title="Financial operations, explained"
      lede="Osfin is a financial operations and reconciliation platform for teams managing complex transaction records across banks, payment gateways, ERPs, ledgers and internal systems."
    >
      <section className="flex relative justify-center overflow-clip bg-clr-4 py-24 max-lg:py-16">
        <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
          <div className="col-start-2 col-end-21 max-lg:[grid-column-end:-2] text-lg [font-weight:358] leading-[1.5625rem] tracking-[0.18px] max-md:[font-size:inherit] max-md:leading-[1.375rem]">
            <p className="block mb-2.5">
              When financial records disagree, finance teams need to understand why, decide what happens next, and preserve the evidence.
            </p>
            <p className="block">
              The platform brings those records into one configurable workflow for matching, investigation, resolution and close — with rules, permissions and an audit trail attached to every action.
            </p>
          </div>
        </div>
      </section>
      <LogoCloudSection />
    </InteriorPage>
  );
}
