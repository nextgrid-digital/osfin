import type { Metadata } from "next";
import { CustomersDarkSeam } from "@/components/seam/VisionProcessTypesetSeam";
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
        <section className="pt-16 pb-12 md:pt-28 md:pb-20">
          <SiteContainer className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
            <h1 className="!mt-0 !mb-0 max-w-[14em] text-black">
              The institutions that move money reconcile on Osfin.
            </h1>
            <p className="!m-0 max-w-[40ch] shrink-0 text-[16px] leading-[1.5] text-black/75 md:text-[18px]">
              Large banks, credit unions, payment companies, lenders and insurers.
            </p>
          </SiteContainer>
        </section>

        <div className="relative">
          <div data-customers-seam-prev>
            <SiteContainer className="pb-20 md:pb-28">
              <CustomerLogos />
            </SiteContainer>
          </div>
          <CustomersDarkSeam />
          <div
            id="customers-dark"
            data-customers-seam-next
            className="bg-[#111113] text-white"
          >
            <DarkWhenInView targetId="customers-dark" />
            <CustomersMap />
            <section
              id="contact"
              className="border-t border-white/10 py-20 md:py-28"
            >
              <SiteContainer>
                <div className="flex flex-wrap items-center justify-between gap-8">
                  <h2 className="!m-0 text-white">Join them.</h2>
                  <a
                    href="mailto:socials@osfin.ai"
                    className="btn-primary not-typeset inline-flex h-10 items-center rounded-none bg-white px-5 text-[13px] font-medium tracking-[-0.02em] text-[#111113] uppercase no-underline transition hover:opacity-90 hover:no-underline"
                    data-not-typeset
                  >
                    Book a demo
                  </a>
                </div>
              </SiteContainer>
            </section>
          </div>
        </div>
      </main>
      <SiteClose />
    </div>
  );
}
