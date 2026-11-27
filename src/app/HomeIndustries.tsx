import { IndustriesIsoGrid } from "@/components/industries/iso-cards";
import SiteContainer from "./SiteContainer";

export default function HomeIndustries() {
  return (
    <section
      id="roles"
      className="section"
      aria-labelledby="industries-heading"
    >
      <SiteContainer>
        <h2 id="industries-heading" className="!mb-0 !mt-0 mx-auto max-w-[13em] text-center text-black">
          Transformation in finance operations, across industries
        </h2>
        <div className="mt-8 md:mt-10">
          <IndustriesIsoGrid />
        </div>
      </SiteContainer>
    </section>
  );
}
