import type { Metadata } from "next";
import GatewayFlow from "@/components/ui/gateway-flow";
import { SecurityCards } from "../HomeSecurity";
import SiteContainer from "../SiteContainer";
import SiteClose from "../SiteClose";

export const metadata: Metadata = {
  title: "Security — Osfin",
  description:
    "Enterprise-grade security. Osfin operates under PCI DSS, SOC 1 Type II, SOC 2 Type II, ISO 27001:2022, GDPR, CCPA, and HIPAA.",
};

export default function SecurityPage() {
  return (
    <div
      data-transition="container"
      data-namespace="security"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-[#5D524B]"
    >
      <main className="pt-14 md:pt-16">
        <section className="relative overflow-hidden bg-background">
          <GatewayFlow
            mode="light"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />
          <SiteContainer className="relative z-10 pt-8 pb-16 md:pt-10 md:pb-24">
            <h1 className="mx-auto max-w-full text-center">
              <span className="block">Enterprise-grade</span>
              <span className="block">security.</span>
            </h1>
            <SecurityCards className="mt-12 md:mt-16" tone="light" />
          </SiteContainer>
        </section>
      </main>
      <SiteClose />
    </div>
  );
}
