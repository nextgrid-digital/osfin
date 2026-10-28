import type { ReactNode } from "react";
import { INDUSTRIES, type Industry } from "../content/industries";
import SiteContainer from "./SiteContainer";

const kickerClassName =
  "not-typeset !m-0 text-left !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-black/45 uppercase";

function Mark({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 88 72"
      className="h-16 w-20 text-[rgba(0,0,0,0.8)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function IndustryIcon({ id }: { id: Industry["id"] }) {
  if (id === "banking") {
    return (
      <Mark>
        <path d="M16 30 44 14 72 30" />
        <path d="M20 30h48" />
        <path d="M26 32v22M36 32v22M46 32v22M58 32v22" />
        <path d="M18 54h52" />
        <path d="M14 60h60" />
      </Mark>
    );
  }

  if (id === "insurance") {
    return (
      <Mark>
        <path d="M44 8 70 18v16c0 16-10 26-26 34C28 60 18 50 18 34V18Z" />
        <path d="M44 16 62 24v10c0 10-7 17-18 22" />
        <path d="M34 36h18M34 42h12" />
        <path d="M52 48 58 42" />
      </Mark>
    );
  }

  if (id === "fintech") {
    return (
      <Mark>
        <path d="M12 34 40 22 76 36 48 48Z" />
        <path d="M12 34v16l36 12V48" />
        <path d="M76 36v16L48 62V48" />
        <path d="M22 38 50 28" />
        <path d="M18 46h16M18 50h10" />
        <path d="M58 40v8M54 44h8" />
      </Mark>
    );
  }

  if (id === "crypto") {
    return (
      <Mark>
        <ellipse cx="44" cy="26" rx="24" ry="10" />
        <path d="M20 26v16c0 6 24 12 24 12s24-6 24-12V26" />
        <path d="M20 34c0 6 24 12 24 12s24-6 24-12" />
        <path d="M44 18v16M36 28l8 6 8-6" />
      </Mark>
    );
  }

  if (id === "ecommerce") {
    return (
      <Mark>
        <path d="M22 28h40l8 30H16Z" />
        <path d="M30 28c0-10 24-10 24 0" />
        <path d="M20 40h46M18 50h48" />
        <path d="M34 58h4M46 58h4" />
      </Mark>
    );
  }

  if (id === "gaming") {
    return (
      <Mark>
        <path d="M18 34c0-8 10-12 20-12h12c10 0 20 4 20 12 6 12 2 24-8 24-6 0-8-6-12-10H38c-4 4-6 10-12 10-10 0-14-12-8-24Z" />
        <path d="M30 32v8M26 36h8" />
        <circle cx="56" cy="34" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="62" cy="40" r="1.6" fill="currentColor" stroke="none" />
      </Mark>
    );
  }

  return (
    <Mark>
      <path d="M14 38h58l8-3-8-3H14" />
      <path d="M40 35 30 16h12l10 19" />
      <path d="M40 41 26 58h14l8-17" />
      <path d="M18 36 8 24h10l8 12" />
    </Mark>
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
            <article
              key={industry.id}
              className="flex min-w-0 flex-col justify-between gap-10 border-t border-l border-black/15 bg-white px-6 py-8 md:px-8 md:py-10"
            >
              <IndustryIcon id={industry.id} />
              <div>
                <h3 className="!mb-0 !mt-0 !text-[22px] !font-medium !leading-[1.2] !tracking-[-0.01em] text-[rgba(0,0,0,0.875)] normal-case">
                  {industry.label}
                </h3>
                <p className="!mb-0 !mt-3 text-[15px] leading-6 text-[rgba(0,0,0,0.875)]">{industry.headline}</p>
                <p className="!mb-0 !mt-2 text-[15px] leading-6 text-black/60">{industry.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
