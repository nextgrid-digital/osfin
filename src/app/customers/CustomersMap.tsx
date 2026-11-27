"use client";

import { useCallback, useEffect, useRef } from "react";
import SiteContainer from "../SiteContainer";
import { CUSTOMERS_MAP_SVG } from "./customersMapSvg";

const REGIONS = [
  {
    title: "Americas",
    countries: [
      { code: "US", label: "United States" },
      { code: "MX", label: "Mexico" },
      { code: "PA", label: "Panama" },
      { code: "CO", label: "Colombia" },
      { code: "EC", label: "Ecuador" },
      { code: "PE", label: "Peru" },
      { code: "BR", label: "Brazil" },
    ],
  },
  {
    title: "Middle East & Africa",
    countries: [
      { code: "AE", label: "UAE & GCC" },
      { code: "ZA", label: "South Africa" },
    ],
  },
  {
    title: "Asia",
    countries: [
      { code: "IN", label: "India" },
      { code: "PH", label: "Philippines" },
      { code: "ID", label: "Indonesia" },
    ],
  },
] as const;

export default function CustomersMap() {
  const boxRef = useRef<HTMLDivElement>(null);

  const focus = useCallback((code: string | null) => {
    const box = boxRef.current;
    if (!box) return;
    box.classList.toggle("focus", Boolean(code));
    box.querySelectorAll<HTMLElement>("[data-g]").forEach((el) => {
      el.classList.toggle("on", el.dataset.g === code);
    });
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const svg = box.querySelector("svg");
    if (!svg) return;
    const vb0 = svg.getAttribute("viewBox");
    if (!vb0) return;
    const mq = window.matchMedia("(max-width: 600px)");
    const fitMap = () => {
      const parts = vb0.split(" ").map(Number);
      svg.setAttribute(
        "viewBox",
        mq.matches ? `150 0 980 ${parts[3]}` : vb0,
      );
    };
    fitMap();
    mq.addEventListener("change", fitMap);
    return () => mq.removeEventListener("change", fitMap);
  }, []);

  return (
    <section className="py-20 text-white md:py-28" aria-labelledby="net-h">
      <SiteContainer>
        <div
          className="mb-8 md:mb-10"
          data-process-dark-trigger
          data-customers-seam-heading
        >
          <h2 id="net-h" className="!m-0 max-w-[18em] text-white">
            Companies serving users across the globe use Osfin.
          </h2>
        </div>
        <div
          className="customers-map-box relative overflow-hidden py-3"
          id="mapbox"
          ref={boxRef}
          dangerouslySetInnerHTML={{ __html: CUSTOMERS_MAP_SVG }}
        />
        <div className="mt-0 grid grid-cols-1 border border-white/15 md:grid-cols-3">
          {REGIONS.map((region) => (
            <div
              key={region.title}
              className="flex flex-col gap-3 border-white/15 px-5 py-5 max-md:border-b max-md:last:border-b-0 md:flex-row md:items-baseline md:gap-5 md:border-r md:last:border-r-0 md:px-6"
            >
              <h3 className="not-typeset !m-0 shrink-0 font-[family-name:var(--font-mono)] text-[12px] font-medium tracking-[-0.02em] text-white/45 uppercase md:min-w-24"
                data-not-typeset
              >
                {region.title}
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
                {region.countries.map((country) => (
                  <li key={country.code}>
                    <button
                      type="button"
                      data-m={country.code}
                      className="cursor-pointer border-0 bg-transparent p-0 text-[15px] text-white transition hover:opacity-70"
                      onMouseEnter={() => focus(country.code)}
                      onMouseLeave={() => focus(null)}
                      onFocus={() => focus(country.code)}
                      onBlur={() => focus(null)}
                    >
                      {country.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
