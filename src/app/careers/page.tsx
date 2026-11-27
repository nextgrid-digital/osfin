import type { Metadata } from "next";
import { CAREERS } from "@/content/careers";
import { getLinkedInJobs } from "@/lib/linkedin-jobs";
import CompanyHero from "../CompanyHero";
import SiteClose from "../SiteClose";
import SiteContainer from "../SiteContainer";
import CareersRoles from "./CareersRoles";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Careers — Osfin",
  description:
    "Osfin works with some of the world’s most forward thinking institutions to embed AI in their finance operations.",
};

const BELIEF_ICONS = [
  "/ditto-careers/assets/cloned/svg/919b7c4fcff6.svg",
  "/ditto-careers/assets/cloned/svg/9907cc46bd64.svg",
  "/ditto-careers/assets/cloned/svg/2a42917c6924.svg",
  "/ditto-careers/assets/cloned/svg/63c731e210c2.svg",
  "/ditto-careers/assets/cloned/svg/8a0b03383e29.svg",
  "/ditto-careers/assets/cloned/svg/9a89fbe95631.svg",
] as const;

export default async function CareersPage() {
  const { jobs, live } = await getLinkedInJobs();

  return (
    <div
      data-transition="container"
      data-namespace="careers"
      className="site-shell typeset typeset-docs min-h-screen bg-background text-black"
    >
      <main className="pt-14 md:pt-16">
        <CompanyHero lines={CAREERS.hero.title.split("\n")} />

        <section className="section !pt-12 md:!pt-16">
          <SiteContainer>
            <p className="!mb-0 mx-auto max-w-[42rem] text-center text-[17px] !leading-[1.5] text-black/75 md:text-[18px]">
              {CAREERS.hero.body}
            </p>
          </SiteContainer>
        </section>

        <section className="section">
          <SiteContainer className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-6 text-center">
              <p
                className="not-typeset !m-0 border border-dashed border-black/20 px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] font-medium tracking-[0.08em] text-black/55 uppercase"
                data-not-typeset
              >
                Values
              </p>
              <h2 className="!m-0 text-black">{CAREERS.beliefs.title}</h2>
            </div>
            <div
              className="not-typeset grid w-full grid-cols-1 border border-dashed border-black/15 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-dashed [&>*]:border-black/15 [&>*:not(:last-child)]:border-b sm:[&>*:nth-child(odd)]:border-r lg:[&>*]:border-r-0 lg:[&>*:not(:nth-child(3n))]:border-r lg:[&>*:nth-child(-n+3)]:border-b lg:[&>*:nth-child(n+4)]:border-b-0"
              data-not-typeset
            >
              {CAREERS.beliefs.items.map((item, i) => (
                <div
                  key={item.index}
                  className="flex min-h-[15rem] flex-col justify-between p-5 sm:min-h-[15rem] sm:p-6 md:min-h-[16rem]"
                >
                  <div className="flex items-center justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={BELIEF_ICONS[i]}
                      alt=""
                      aria-hidden
                      width={24}
                      height={24}
                      className="size-6 opacity-50 brightness-0"
                    />
                    <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase">
                      {item.index}
                    </span>
                  </div>
                  <div>
                    <h3 className="!m-0 font-[family-name:var(--font-crimson)] !text-[20px] !leading-7 !font-light !tracking-[-0.02em] text-black">
                      {item.title}
                    </h3>
                    <p className="!mb-0 !mt-2 text-[14px] leading-5 text-black/55">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </SiteContainer>
        </section>

        <CareersRoles jobs={jobs} saved={!live} />
      </main>
      <SiteClose />
    </div>
  );
}
