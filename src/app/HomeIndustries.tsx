import { IndustriesIsoGrid } from "@/components/industries/iso-cards";
import SiteContainer from "./SiteContainer";

export default function HomeIndustries() {
  return (
    <section
      id="roles"
      className="py-16 md:py-20"
      aria-labelledby="industries-heading"
    >
      <SiteContainer>
        <h2 id="industries-heading" className="!mb-0 !mt-0 mx-auto max-w-[24em] text-center text-black">
          Transformation in finance operations, across industries
        </h2>
        <div className="mt-8 md:mt-10">
          <IndustriesIsoGrid />
        </div>
      </SiteContainer>
    </section>
  );
}
