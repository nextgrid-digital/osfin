import type { Metadata } from "next";
import SiteClose from "../SiteClose";
import SiteContainer from "../SiteContainer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Osfin",
  description:
    "Talk to Osfin about finance operations automation. Tell us what you’re looking to solve and we’ll follow up.",
};

export default function ContactPage() {
  return (
    <div
      data-transition="container"
      data-namespace="contact"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-black"
    >
      <main className="pt-14 md:pt-16">
        <section className="pt-16 pb-24 md:pt-28 md:pb-36">
          <SiteContainer>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
              <div>
                <p
                  className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
                  data-not-typeset
                >
                  Contact
                </p>
                <h1 className="!mt-5 max-w-[11em] !text-[clamp(2rem,5vw,64px)] !leading-none !font-light tracking-[-0.03em] text-black md:!mt-6">
                  Tell us what you’re looking to solve.
                </h1>
                <p className="!mb-0 !mt-6 max-w-[28rem] text-[17px] !leading-[1.5] text-black md:!mt-8 md:text-[18px]">
                  One form. We route it to the right people, enrich the lead, and follow up.
                </p>
                <p
                  className="not-typeset !mb-0 !mt-10 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase"
                  data-not-typeset
                >
                  Or email
                </p>
                <a
                  href="mailto:socials@osfin.ai"
                  className="mt-3 inline-block text-[17px] text-black no-underline hover:opacity-70"
                >
                  socials@osfin.ai
                </a>
              </div>

              <ContactForm />
            </div>
          </SiteContainer>
        </section>
      </main>
      <SiteClose />
    </div>
  );
}
