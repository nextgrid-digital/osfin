import { IndustriesIsoGrid } from "@/components/industries/iso-cards";
import SiteContainer from "./SiteContainer";

const kickerClassName =
  "not-typeset !m-0 text-center !font-[family-name:var(--font-mono)] !text-[14px] !font-medium !leading-[1.4] !tracking-[-0.02em] !text-[#5D524B]/45 uppercase";

export default function HomeIndustries() {
  return (
    <section
      id="roles"
      className="py-16 md:py-20"
      aria-labelledby="industries-heading"
    >
      <SiteContainer>
        <p className={kickerClassName} data-not-typeset>
          Industries
        </p>
        <h2 id="industries-heading" className="!mb-0 !mt-3 mx-auto max-w-[16em] text-center text-[#5D524B] md:!mt-4">
          Transformation in finance operations
        </h2>
        <p className="mx-auto mt-4 max-w-[28rem] text-center !text-[16px] !leading-[1.45] text-[#5D524B] md:mt-5">
          The same work, across every industry.
        </p>
        <div className="mt-8 md:mt-10">
          <IndustriesIsoGrid />
        </div>
      </SiteContainer>
    </section>
  );
}
