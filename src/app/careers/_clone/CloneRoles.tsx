"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Icon2 from "./svgs/svg-icon2";
import TextLink from "./components/text-link";
import MediaLink from "./components/media-link";
import { MediaLink_meta } from "./ditto-meta";
import { TextLink_styles } from "./_styles";
import { CAREERS } from "@/content/careers";

const ROLES = CAREERS.roles.groups.flatMap((group) =>
  group.roles.map((role) => ({ ...role, department: group.department })),
);

const FILTERS = [
  { label: "All", department: "All" as const },
  ...CAREERS.roles.groups.map((group) => ({
    label: group.department,
    department: group.department,
  })),
];

export default function CloneRoles() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");

  const counts = useMemo(() => {
    const next: Record<string, number> = { All: ROLES.length };
    for (const role of ROLES) {
      next[role.department] = (next[role.department] ?? 0) + 1;
    }
    return next;
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ROLES.filter((role) => {
      if (department !== "All" && role.department !== department) return false;
      if (!needle) return true;
      return [role.title, role.location, role.brief, role.department]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [department, query]);

  return (
    <section className="block relative px-18 overflow-hidden bg-surface-4 max-md:px-3" id="open-roles">
      <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:multiply] [background-size:100%] [background-position:50%_0%] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/svg/5898f0d430b1.svg\")" }} aria-hidden="true" />
      <div className="border border-dashed border-color-005 block relative max-w-390 mx-auto w-full">
        <div className="flex py-20 px-10 flex-col gap-10 max-md:py-16 max-md:px-3">
          <div className="w-full max-w-140 flex flex-col items-start gap-6">
            <div className="flex items-start">
              <div className="border border-dashed border-color-008 flex -mr-px py-1 px-2 justify-center items-center h-auto">
                <p className="block text-color-013 [font-family:'Geist_Mono',_'Geist_Mono_Fallback'] text-[0.625rem] leading-[0.9375rem] tracking-[0.8px] uppercase whitespace-nowrap">
                  {CAREERS.roles.label}
                </p>
              </div>
            </div>
            <h2 className="block text-color-001 [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-[2.75rem] leading-11 tracking-[-1.1px] max-md:text-4xl max-md:leading-9 max-md:tracking-[-1.44px]" data-component="heading">
              {CAREERS.roles.title}
            </h2>
          </div>
          <div className="block w-full">
            <div className="block relative mb-6">
              <Icon2 />
              <input className="w-full h-11.5 border border-solid border-color-005 inline-block py-3 pr-4 pl-11 overflow-clip text-color-001 text-sm leading-5 cursor-text focus:border-color-001" data-ditto-id="style-search-all-roles" data-component="input" aria-label="Search All roles" placeholder="Search all roles" type="text" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <div className="border border-solid border-color-005 grid grid-cols-[220px_1fr] max-md:-mx-3 max-lg:border-[0] max-lg:border-initial max-lg:border-[initial] max-lg:grid-cols-1">
              <div className="border-r border-solid border-r-color-005 flex relative p-6 flex-col max-lg:border-b max-lg:border-b-color-005 max-lg:border-r-[0] max-lg:border-initial max-lg:border-r-[initial] max-lg:p-0">
                <div
                  className="block absolute left-0 min-w-0 bg-color-001 pointer-events-none h-14 w-0.5 transition-transform duration-200"
                  aria-hidden="true"
                  style={{ transform: `translateY(${FILTERS.findIndex((filter) => filter.department === department) * 3.5}rem)` }}
                />
                {FILTERS.map((filter, i) => {
                  const selected = filter.department === department;
                  const last = i === FILTERS.length - 1;
                  return (
                    <TextLink
                      key={filter.department}
                      d={{
                        ariapressed: selected ? "true" : "false",
                        label: filter.label,
                        label2: String(counts[filter.department] ?? 0),
                      }}
                      styles={
                        selected
                          ? last
                            ? { className: "text-color-001" }
                            : TextLink_styles[0]
                          : last
                            ? TextLink_styles[TextLink_styles.length - 1]
                            : TextLink_styles[1]
                      }
                      onClick={() => setDepartment(filter.department)}
                    />
                  );
                })}
              </div>
              <div className="flex p-6 flex-col overflow-hidden">
                {filtered.length === 0 ? (
                  <p className="mx-6 p-5 text-color-007 text-sm leading-[1.25rem] max-lg:mx-0 max-lg:px-0">
                    No roles match.
                  </p>
                ) : (
                  filtered.map((role, i) => (
                    <MediaLink
                      key={role.id}
                      d={{
                        href: "/#contact",
                        label: String(i + 1).padStart(2, "0"),
                        label2: role.title,
                        location: role.location,
                        description: role.brief,
                      }}
                      meta={MediaLink_meta[i] ?? {}}
                      styles={
                        i === filtered.length - 1
                          ? { className: "border-b-clr-1" }
                          : { className: "border-b-color-003" }
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-left w-full">
            <h3 className="w-full max-w-120 block text-color-001 [font-family:stkBureauSerifRegular,_'stkBureauSerifRegular_Fallback',_stkBureauSerif,_'stkBureauSerif_Fallback'] text-xl leading-7.5 tracking-[-0.4px]" data-component="heading">
              {CAREERS.close.title}
            </h3>
            <p className="w-full max-w-120 block text-color-007 text-sm leading-[1.3125rem]">
              <Link className="inline text-color-001 leading-5 underline cursor-pointer hover:[text-decoration-color:var(--color-001)]" data-component="link" href="/#contact">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
