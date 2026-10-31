import { Fragment } from "react";
import Icon from "../svgs/svg-icon";
import { CAREERS } from "@/content/careers";

const processSteps = CAREERS.hero.plate[0].value.split(", ");
const recordParts = CAREERS.hero.plate[1].value.split(" // ");

/** Hero section — the page's lead block. */
export default function HeroSection() {
  return (
    <section className="h-200 flex relative flex-col overflow-hidden bg-[var(--header-bg)] max-md:h-203 md:max-lg:h-256 2xl:h-270">
      <img className="w-full block absolute top-0 left-0 min-w-0 max-w-full overflow-clip object-cover aspect-[auto_2880/1280] align-middle text-clr-1 pointer-events-none h-full max-lg:hidden mix-blend-multiply" data-component="image" alt="" height="1280" src="/ditto-careers/assets/cloned/images/7a0e25a61472-ink.webp" width="2880" />
      <div className="border border-dashed border-color-010 flex relative max-w-390 flex-col flex-1 min-h-0 mx-auto w-full">
        <div className="flex relative pt-40 pb-24 flex-col justify-center items-center flex-1 text-center max-lg:pt-27 max-lg:pb-16 max-lg:px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-start">
              <div className="border border-dashed border-color-008 flex -mr-px py-1 px-2 justify-center items-center h-auto">
                <p className="block text-color-013 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.625rem] leading-[0.9375rem] tracking-[0.8px] uppercase">
                  {CAREERS.hero.kicker}
                </p>
              </div>
            </div>
            <h1 className="block text-color-001 [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-7xl leading-18 tracking-[-2.88px] max-md:text-[2.625rem] max-md:leading-[2.75rem] max-md:tracking-[-1.75px] md:max-lg:text-[3.5rem] md:max-lg:leading-14 md:max-lg:tracking-[-1.4px]" data-component="heading">
              {CAREERS.hero.title.split("\n").map((line, i, lines) => (
                <Fragment key={line}>
                  {line}
                  {i < lines.length - 1 ? <br className="inline" /> : null}
                </Fragment>
              ))}
            </h1>
            <p className="w-full max-w-140 block text-color-007 leading-[1.375rem] tracking-[-0.48px] max-md:text-[0.9375rem] max-md:leading-[1.3125rem] max-md:tracking-[-0.37px]">
              {CAREERS.hero.body}
            </p>
          </div>
        </div>
        <div className="border-t border-dashed border-t-color-003 flex items-stretch grid-cols-[1fr_auto] w-full max-lg:grid max-lg:pt-3.5 max-lg:pb-[1.0625rem] max-lg:px-6 max-lg:items-center max-lg:gap-2">
          <div className="border-r border-dashed border-r-color-003 flex py-4 px-4.5 flex-col justify-center flex-1 max-lg:block max-lg:border-r-[0] max-lg:border-initial max-lg:border-r-[initial] max-lg:p-0 max-lg:[flex-direction:initial] max-lg:[justify-content:initial] max-lg:grow-[initial] max-lg:basis-[initial]">
            <div className="flex items-center gap-1">
              <p className="block text-muted-foreground [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.5rem] leading-3 tracking-[0.2px] uppercase">
                {CAREERS.hero.plate[0].label}
              </p>
              <img className="block overflow-clip aspect-[auto_193/1] align-middle text-clr-1 h-px w-[12.0625rem] max-lg:hidden" data-component="image" alt="" height="1" src="/ditto-careers/assets/cloned/svg/c814620b33b0.svg" srcSet="/ditto-careers/assets/cloned/svg/c814620b33b0.svg 1x, /ditto-careers/assets/cloned/svg/c814620b33b0.svg 2x" width="193" />
            </div>
            <p className="flex flex-wrap items-center gap-1 text-muted-foreground [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.5rem] leading-3 tracking-[0.2px] uppercase">
              <span className="hidden min-w-0 max-lg:block">
                {`${CAREERS.hero.plate[0].label}: `}
              </span>
              {processSteps.map((step, i) => (
                <Fragment key={step}>
                  {i > 0 ? <Icon /> : null}
                  <span className="block">
                    {step}
                  </span>
                </Fragment>
              ))}
            </p>
          </div>
          <div className="w-[11.3125rem] border-r border-dashed border-r-color-003 flex py-4 px-4.5 items-center shrink-0 max-lg:w-[3.8rem] max-lg:border-r-[0] max-lg:border-initial max-lg:border-r-[initial] max-lg:p-0 max-lg:shrink-[initial]">
            <div className="border border-dashed border-surface block py-1.5 px-2 max-lg:px-1.5">
              <p className="block text-muted-foreground [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.5rem] leading-3 tracking-[0.2px] uppercase max-lg:text-clr-5 max-lg:text-[0.4375rem] max-lg:leading-[0.625rem] max-lg:tracking-[0.17px]">
                {recordParts[0]}
                <br className="hidden max-lg:inline" />
                <span className="inline max-lg:hidden">
                  {" // "}
                </span>
                {recordParts[1]}
              </p>
            </div>
          </div>
          <div className="w-64.5 flex py-4 px-4.5 items-center shrink-0 col-start-[span_2] col-end-[span_2] max-md:w-[20.3125rem] max-lg:p-0 max-lg:shrink-[initial] md:max-lg:w-179.5">
            <p className="block text-muted-foreground [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.5rem] leading-2.5 tracking-[0.2px] uppercase max-lg:text-color-005 max-lg:text-[0.4375rem] max-lg:leading-[0.6875rem] max-lg:tracking-[0.18px]">
              {CAREERS.hero.plate[2].label}
              <span className="hidden max-lg:inline">
                {": "}
              </span>
              <br className="block mx-auto max-lg:hidden" />
              {CAREERS.hero.plate[2].value}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex shrink-0 overflow-hidden h-5 max-lg:h-2">
        <div className="flex-[24.5] block relative bg-accent h-full min-w-0">
          <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:soft-light] [background-size:720px_30.24px] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/422e70820966.webp\")" }} />
        </div>
        <div className="flex-[19] block relative bg-primary h-full min-w-0">
          <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:soft-light] [background-size:720px_30.24px] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/422e70820966.webp\")" }} />
        </div>
        <div className="flex-[27] block relative bg-clr-6 h-full min-w-0">
          <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:soft-light] [background-size:720px_30.24px] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/422e70820966.webp\")" }} />
        </div>
        <div className="flex-[3.6] block relative bg-clr-7 h-full min-w-0">
          <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:soft-light] [background-size:720px_30.24px] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/422e70820966.webp\")" }} />
        </div>
        <div className="flex-[5.4] block relative bg-accent h-full min-w-0">
          <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:soft-light] [background-size:720px_30.24px] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/422e70820966.webp\")" }} />
        </div>
        <div className="flex-[20.5] block relative bg-primary h-full min-w-0">
          <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:soft-light] [background-size:720px_30.24px] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/422e70820966.webp\")" }} />
        </div>
      </div>
    </section>
  );
}
