import Link from "next/link";
import { INDUSTRIES } from "../content/industries";
import IndustryIcon from "./IndustryIcon";
import SiteContainer from "./SiteContainer";

const kickerClassName =
  "not-typeset !m-0 text-left !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-black/45 uppercase";

const cardClassName =
  "flex min-w-0 flex-col items-start border-t border-l border-black/15 bg-white px-6 py-8 text-[rgba(0,0,0,0.875)] md:px-8 md:py-10";

const titleClassName =
  "!mb-0 !mt-0 !text-[22px] !font-medium !leading-[1.2] !tracking-[-0.01em] text-[rgba(0,0,0,0.875)] normal-case";

const summaryClassName = "!mb-0 !mt-4 text-[15px] leading-6 text-[rgba(0,0,0,0.875)]";

const smallIconClassName = "h-12 w-[3.75rem] text-[rgba(0,0,0,0.8)]";

function PendingMark() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-12 w-12 text-[rgba(0,0,0,0.8)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <circle cx="10" cy="10" r="7" />
    </svg>
  );
}

export default function HomeIndustries() {
  return (
    <section id="roles" className="py-28 md:py-40" aria-labelledby="industries-heading">
      <SiteContainer>
        <p className={kickerClassName} data-not-typeset>
          Industries
        </p>
        <h2 id="industries-heading" className="!mb-0 !mt-5 max-w-none text-[rgba(0,0,0,0.875)]">
          One operating record
          <br />
          for every industry.
        </h2>
        <div className="mt-12 grid grid-cols-1 border-r border-b border-black/15 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.id}`}
              className={`${cardClassName} no-underline`}
            >
              <h3 className={titleClassName}>{industry.label}</h3>
              <p className={summaryClassName}>{industry.summary}</p>
              <span className="mt-8">
                <IndustryIcon id={industry.id} className={smallIconClassName} strokeWidth={1.75} />
              </span>
            </Link>
          ))}
          <article className={cardClassName}>
            <h3 className={titleClassName}>Pending</h3>
            <p className={summaryClassName}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <span className="mt-8">
              <PendingMark />
            </span>
          </article>
        </div>
      </SiteContainer>
    </section>
  );
}
