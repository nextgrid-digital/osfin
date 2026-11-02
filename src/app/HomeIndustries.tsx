import Link from "next/link";
import { INDUSTRIES } from "../content/industries";
import IndustryIcon from "./IndustryIcon";
import { industryArt } from "./industry-art";
import SiteContainer from "./SiteContainer";

const kickerClassName =
  "not-typeset !m-0 text-center !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-[#5D524B]/45 uppercase";

const cardClassName =
  "group relative flex min-h-[20rem] min-w-0 flex-col items-stretch border-t border-l border-black/15 bg-transparent px-6 py-6 text-[#5D524B] no-underline transition-colors duration-200 hover:bg-[#F6F1E2] hover:no-underline md:min-h-[24rem] md:px-8 md:py-8";

const titleClassName =
  "relative z-10 max-w-[12em] self-start pr-10 !mb-0 !mt-0 !text-[28px] !font-normal !leading-[1.15] !tracking-[-0.02em] text-[#5D524B] normal-case md:!text-[32px]";


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
              className={cardClassName}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute top-6 right-6 z-10 text-[#5D524B] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:top-8 md:right-8"
              >
                <svg viewBox="0 0 16 16" className="size-4">
                  <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              </span>
              <h3 className={titleClassName}>{industry.label}</h3>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-4 bottom-5 top-[4.75rem] flex items-end justify-end md:inset-x-6 md:bottom-6 md:top-24"
              >
                {industryArt[industry.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={industryArt[industry.id]}
                    alt=""
                    className="h-auto max-h-full w-[88%] object-contain object-right-bottom"
                  />
                ) : (
                  <IndustryIcon
                    id={industry.id}
                    className="h-full w-[88%]"
                    strokeWidth={0.7}
                    preserveAspectRatio="xMaxYMax meet"
                  />
                )}
              </span>
            </Link>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
