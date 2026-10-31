import Link from "next/link";
import { INDUSTRIES } from "../content/industries";
import IndustryIcon from "./IndustryIcon";
import SiteContainer from "./SiteContainer";

const kickerClassName =
  "not-typeset !m-0 text-center !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-[#5D524B]/45 uppercase";

const cardClassName =
  "group relative flex min-h-80 min-w-0 flex-col items-start border-t border-l border-black/15 bg-[#F7F1E3] px-6 py-8 text-[#5D524B] transition-colors duration-200 hover:bg-[#EFE4CC] focus-visible:bg-[#EFE4CC] md:min-h-[22rem] md:px-8 md:py-10";

const titleClassName =
  "!mb-0 !mt-0 !text-[22px] !font-medium !leading-[1.2] !tracking-[-0.01em] text-[#5D524B] normal-case";

const summaryClassName = "!mb-0 !mt-auto w-full pt-8 text-[15px] leading-6 text-[#5D524B]";

const smallIconClassName = "h-12 w-[3.75rem] text-[#5D524B]";

export default function HomeIndustries() {
  return (
    <section id="roles" className="py-28 md:py-40" aria-labelledby="industries-heading">
      <SiteContainer>
        <p className={kickerClassName} data-not-typeset>
          Industries
        </p>
        <h2 id="industries-heading" className="!mb-0 !mt-5 mx-auto max-w-[16em] text-center text-[#5D524B]">
          Osfin works with some of the largest companies
        </h2>
        <div className="mt-12 grid grid-cols-1 border-r border-b border-black/15 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.id}`}
              className={`${cardClassName} no-underline`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-7 right-6 text-[#5D524B] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:top-9 md:right-8"
              >
                <svg viewBox="0 0 16 16" className="size-4">
                  <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              </span>
              <div className="flex w-full items-center gap-4 pr-8">
                <IndustryIcon id={industry.id} className={`${smallIconClassName} shrink-0`} strokeWidth={1.75} />
                <h3 className={titleClassName}>{industry.label}</h3>
              </div>
              <p className={summaryClassName}>{industry.summary}</p>
            </Link>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
