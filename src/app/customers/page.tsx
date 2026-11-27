import type { Metadata } from "next";
import { CustomersDarkSeam } from "@/components/seam/VisionProcessTypesetSeam";
import CompanyHero from "../CompanyHero";
import DarkWhenInView from "../DarkWhenInView";
import SiteClose from "../SiteClose";
import SiteContainer from "../SiteContainer";
import CustomerLogos from "./CustomerLogos";
import CustomersMap from "./CustomersMap";
import "./customers-page.css";

export const metadata: Metadata = {
  title: "Customers — Osfin",
  description:
    "Banks, credit unions, payment companies, lenders and insurers reconcile on Osfin.",
};

export default function CustomersPage() {
  return (
    <div
      data-transition="container"
      data-namespace="customers"
      className="site-shell typeset typeset-docs customers-page min-h-screen bg-background text-black"
    >
      <main className="pt-14 md:pt-16">
        <CompanyHero
          lines={[
            "The institutions that move money",
            "reconcile on Osfin.",
          ]}
        />

        <div className="relative">
          <section
            className="section !pt-12 md:!pt-16 bg-white text-black"
            data-customers-seam-prev
          >
            <SiteContainer>
              <CustomerLogos />
            </SiteContainer>
          </section>

          <CustomersDarkSeam />

          <section
            id="customers-dark"
            className="bg-black text-white"
            data-customers-seam-next
            data-process-dark-trigger
          >
            <DarkWhenInView targetId="customers-dark" />
            <CustomersMap />
          </section>
        </div>
      </main>
      <SiteClose tone="dark" />
    </div>
  );
}
