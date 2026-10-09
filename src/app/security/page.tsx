import type { Metadata } from "next";
import GatewayFlow from "@/components/ui/gateway-flow";
import { SecurityCards } from "../HomeSecurity";
import SiteContainer from "../SiteContainer";
import SiteFooter from "../SiteFooter";

export const metadata: Metadata = {
  title: "Security — Osfin",
  description:
    "Protect payment data with end-to-end controls. Osfin operates under GDPR, ISO 27001, SOC 2, and PCI DSS.",
};

export default function SecurityPage() {
  return (
    <div
      data-transition="container"
      data-namespace="security"
      className="site-shell typeset typeset-docs min-h-screen bg-[#E4E4E4] text-[rgba(0,0,0,0.875)]"
    >
      <main className="pt-14 md:pt-16">
        <section className="relative overflow-hidden bg-[#E4E4E4]">
          <GatewayFlow
            mode="light"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />
          <SiteContainer className="relative z-10 pt-8 pb-16 md:pt-10 md:pb-24">
            <h1 className="mx-auto max-w-full text-center">
              <span className="block">Protect payment data</span>
              <span className="block">with end-to-end controls.</span>
            </h1>
            <SecurityCards tone="light" className="mt-12 md:mt-16" />
          </SiteContainer>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
