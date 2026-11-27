"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { CAREERS } from "@/content/careers";
import type { LinkedInJob } from "@/lib/linkedin-jobs";

const labelClassName =
  "not-typeset !m-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase";

export default function CareersRoles({ jobs, saved }: { jobs: LinkedInJob[]; saved: boolean }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const departments = useMemo(() => {
    const order = ["Engineering", "Product", "Sales", "Operations", "People"];
    const present = new Set(jobs.map((job) => job.department));
    return order.filter((name) => present.has(name));
  }, [jobs]);

  const filters = useMemo(() => ["All", ...departments], [departments]);

  const counts = useMemo(() => {
    const next: Record<string, number> = { All: jobs.length };
    for (const job of jobs) {
      next[job.department] = (next[job.department] ?? 0) + 1;
    }
    return next;
  }, [jobs]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (department !== "All" && job.department !== department) return false;
      if (!needle) return true;
      return [job.title, job.department, job.description ?? "", job.location]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [department, jobs, query]);

  return (
    <section id="open-roles" className="border-t border-black/15 section">
      <div className="mx-auto w-full max-w-[var(--max)] px-5 sm:px-8">
        <p className={labelClassName} data-not-typeset>
          {CAREERS.roles.label}
        </p>
        <h2 className="!mt-5 !mb-0 max-w-[18em] text-black">{CAREERS.roles.title}</h2>
        <p className="!mb-0 !mt-5 max-w-[42rem] text-[17px] !leading-[1.5] text-black/75 md:text-[18px]">
          {CAREERS.roles.body}
        </p>

        <div className="not-typeset mt-12" data-not-typeset>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search roles"
            aria-label="Search roles"
            className="w-full border border-black/15 bg-transparent px-4 py-3 font-[family-name:var(--font-sans)] text-[16px] leading-[1.4] text-black outline-none transition placeholder:text-black/35 focus:border-black/40"
          />

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-row flex-wrap gap-2 lg:sticky lg:top-20 lg:flex-col lg:gap-0 lg:self-start">
              {filters.map((name) => {
                const selected = department === name;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDepartment(name)}
                    className={`flex items-baseline justify-between gap-3 border border-black/15 px-3 py-2 text-left transition lg:border-0 lg:border-b lg:border-black/10 lg:px-0 lg:py-3 ${
                      selected
                        ? "bg-black text-white lg:bg-transparent lg:text-black"
                        : "text-black/55 hover:text-black"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] uppercase">
                      {name}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[-0.02em] opacity-60">
                      {counts[name] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              {saved ? (
                <p className="!mt-0 !mb-6 text-[14px] leading-[1.45] text-black/55">
                  Showing the saved list. Open LinkedIn for current roles.
                </p>
              ) : null}

              {filtered.length === 0 ? (
                <p className="!m-0 text-[16px] leading-[1.5] text-black/55">No roles match.</p>
              ) : (
                <ul
                  className="m-0 list-none p-0"
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {filtered.map((job) => (
                    <li
                      key={job.id}
                      className="relative border-b border-black/10 first:border-t"
                      onMouseEnter={() => setHoveredId(job.id)}
                    >
                      <a
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative z-10 flex items-start gap-4 px-3 py-5 no-underline sm:-mx-3 sm:gap-6"
                      >
                        {hoveredId === job.id ? (
                          <motion.span
                            layoutId="careers-role-highlight"
                            className="absolute inset-0 z-0 bg-black/[0.04]"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        ) : null}
                        <span className="relative z-10 flex min-w-0 flex-1 flex-col gap-2">
                          <span className="font-[family-name:var(--font-crimson)] text-[clamp(1.25rem,2vw,28px)] font-light leading-none tracking-[-0.02em] text-black">
                            {job.title}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase">
                            {job.department}
                          </span>
                          {job.description ? (
                            <span className="line-clamp-2 max-w-[52rem] text-[15px] leading-[1.45] text-black/55">
                              {job.description}
                            </span>
                          ) : null}
                        </span>
                        <span className="relative z-10 mt-1 flex shrink-0 items-center gap-1.5 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-black/45 uppercase opacity-0 transition duration-200 group-hover:opacity-100">
                          Apply Now
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden
                          >
                            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
