"use client";

import { useCallback, useState } from "react";
import SiteContainer from "../SiteContainer";
import CustomersCityLights, { type CustomerCity } from "./CustomersCityLights";

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

/** Hub lights aligned to the previous SVG pin positions (viewBox space). */
const CUSTOMER_CITIES: readonly CustomerCity[] = [
  { code: "US", label: "United States", x: 298.7, y: 70.8 },
  { code: "MX", label: "Mexico", x: 270.3, y: 130.7 },
  { code: "PA", label: "Panama", x: 334.8, y: 188.1 },
  { code: "CO", label: "Colombia", x: 356.3, y: 203.8 },
  { code: "EC", label: "Ecuador", x: 340.2, y: 226.8 },
  { code: "PE", label: "Peru", x: 352.2, y: 257.6 },
  { code: "BR", label: "Brazil", x: 435.2, y: 267.2 },
  { code: "AE", label: "UAE & GCC", x: 774.3, y: 128.7 },
  { code: "ZA", label: "South Africa", x: 676.3, y: 334.7 },
  { code: "IN", label: "India", x: 854.6, y: 136.5 },
  { code: "PH", label: "Philippines", x: 1001.9, y: 173.1 },
  { code: "ID", label: "Indonesia", x: 974.9, y: 226.8 },
];

export default function CustomersMap() {
  const [focus, setFocus] = useState<string | null>(null);

  const onFocus = useCallback((code: string | null) => {
    setFocus(code);
  }, []);

  return (
    <div className="customers-map-section w-full bg-black text-white">
      <SiteContainer className="flex flex-col items-center gap-5 pb-10 pt-16 sm:gap-6 sm:pb-12 md:gap-8 md:pb-16 md:pt-28">
        <h2
          id="net-h"
          data-customers-seam-heading
          className="!m-0 max-w-[18em] text-balance text-center text-white"
        >
          Companies serving users across{" "}
          <span className="whitespace-nowrap sm:whitespace-normal">
            the globe use Osfin.
          </span>
        </h2>
        <p className="!m-0 max-w-[42rem] text-pretty text-center text-[15px] leading-[1.55] text-white/65 sm:text-[16px] md:text-[18px] md:leading-[1.5]">
          Large banks, credit unions, payment companies, lenders and insurers.
        </p>
      </SiteContainer>

      <div
        className="relative w-full overflow-hidden"
        aria-label="Customer footprint by region"
      >
        <div
          className="customers-map-box customers-city-lights-box absolute inset-0"
          id="mapbox"
        >
          <CustomersCityLights
            cities={CUSTOMER_CITIES}
            focusCode={focus}
            onFocusChange={onFocus}
            fill
          />
        </div>

        <div className="relative z-10 flex min-h-[min(58svh,520px)] flex-col justify-end pb-6 pt-12 sm:min-h-[min(64svh,640px)] sm:pb-8 sm:pt-16 md:min-h-[min(78svh,820px)] md:pb-6 md:pt-20">
          <SiteContainer>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:gap-6">
              {REGIONS.map((region) => (
                <div
                  key={region.title}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <h3
                    className="not-typeset !m-0 font-[family-name:var(--font-mono)] text-[11px] font-medium tracking-[-0.02em] text-white/40 uppercase sm:text-[12px]"
                    data-not-typeset
                  >
                    {region.title}
                  </h3>
                  <ul className="m-0 flex list-none flex-wrap justify-center gap-x-1 gap-y-1 p-0 sm:gap-x-2 md:gap-x-3">
                    {region.countries.map((country) => {
                      const active = focus === country.code;
                      const dimmed = Boolean(focus && !active);
                      return (
                        <li key={country.code}>
                          <button
                            type="button"
                            data-m={country.code}
                            className={`min-h-11 cursor-pointer border-0 bg-transparent px-2 py-1.5 text-[13px] transition sm:min-h-0 sm:px-1 sm:py-0 sm:text-[14px] md:text-[15px] ${
                              active
                                ? "text-white"
                                : dimmed
                                  ? "text-white/30"
                                  : "text-white hover:opacity-70"
                            }`}
                            onMouseEnter={() => onFocus(country.code)}
                            onMouseLeave={() => onFocus(null)}
                            onFocus={() => onFocus(country.code)}
                            onBlur={() => onFocus(null)}
                          >
                            {country.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </SiteContainer>
        </div>
      </div>
    </div>
  );
}
