import { SECURITY } from "../../content/security";

export default function SecurityAccordion() {
  return (
    <div className="mt-8 border-t border-black/10">
      {SECURITY.practices.map((item, index) => (
        <details
          key={item.title}
          className="group border-b border-black/10"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-10 [&::-webkit-details-marker]:hidden md:grid md:grid-cols-[2.75rem_minmax(0,1fr)_1.25rem] md:items-center md:gap-x-10">
            <span
              className="not-typeset hidden pt-1.5 !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-[#5D524B]/45 uppercase md:block"
              data-not-typeset
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="!mb-0 !mt-0 !text-[22px] !font-normal !leading-[1.2] !tracking-[-0.02em] text-[#5D524B] md:!text-[28px]">
              {item.title}
            </h3>
            <span
              className="relative mt-1.5 size-5 shrink-0 text-[#5D524B]/45 md:mt-0"
              aria-hidden
            >
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="!mt-0 max-w-[65ch] pb-10 text-[#5D524B]/60 md:ml-[calc(2.75rem+2.5rem)]">
            {item.body}
          </p>
        </details>
      ))}
    </div>
  );
}
