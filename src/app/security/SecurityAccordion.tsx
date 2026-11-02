import { SECURITY } from "../../content/security";

export default function SecurityAccordion() {
  return (
    <div className="mt-8 border-t border-black/10">
      {SECURITY.practices.map((item, index) => (
        <div
          key={item.title}
          className="grid grid-cols-1 items-start gap-4 border-b border-black/10 py-10 md:grid-cols-[2.75rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:gap-x-10"
        >
          <span
            className="not-typeset pt-1.5 !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-[#5D524B]/45 uppercase"
            data-not-typeset
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="!mb-0 !mt-0 !text-[28px] !font-normal !leading-[1.2] !tracking-[-0.02em] text-[#5D524B]">
            {item.title}
          </h3>
          <p className="!mt-0 max-w-[65ch] text-[#5D524B]/60">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
