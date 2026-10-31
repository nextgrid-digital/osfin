import FeatureCard from "../components/feature-card";
import { FeatureCard_meta } from "../ditto-meta";
import { FeatureCard_styles } from "../_styles";
import { CAREERS } from "@/content/careers";

const featuresContent = CAREERS.test.columns.map((column, i) => ({
  title: String(i + 1).padStart(2, "0"),
  description: column.title,
  description2: column.body,
}));

/** Feature Grid section. */
export default function FeatureGridSection({ features = featuresContent } = {}) {
  return (
    <section className="flex relative px-18 justify-center overflow-hidden max-lg:px-3" style={{ backgroundImage: "linear-gradient(var(--clr-2) 0%, var(--clr-3) 160%)" }}>
      <div className="h-full block absolute top-0 inset-x-0 [mix-blend-mode:soft-light] min-w-0 [background-size:296px_296px] pointer-events-none" style={{ backgroundImage: "url(\"/ditto-careers/assets/cloned/images/c980a706315f.webp\")" }} aria-hidden="true" />
      <div className="border border-dashed border-border block relative max-w-390 mx-auto w-full">
        <div className="w-px h-full border-l border-dashed border-l-border block absolute top-0 left-10 pointer-events-none max-lg:hidden" />
        <div className="w-px h-full border-r border-dashed border-r-border block absolute top-0 right-10 pointer-events-none max-lg:hidden" />
        <div className="h-full block pt-36 pb-48 px-10 max-lg:py-16 max-lg:px-3" data-ditto-id="motion-div-3">
          <div className="h-full flex relative w-full max-lg:flex-col">
            <div className="flex flex-col flex-1 bg-color-004 max-lg:grow-[initial] max-lg:basis-[initial]">
              <div className="h-28.5 min-h-28.5 border-t border-dashed border-t-border border-r border-r-border border-l border-l-border flex p-6 items-center max-lg:h-25 max-lg:min-h-25 max-lg:p-5">
                <h2 className="block text-foreground [font-family:stkBureauSerif,_'stkBureauSerif_Fallback'] text-4xl leading-[2.5rem] tracking-[-0.32px] max-lg:text-[2rem] max-lg:leading-[2.1875rem]" data-component="heading">
                  {CAREERS.test.title}
                </h2>
              </div>
              <div className="border border-dashed border-border block relative w-full">
                <img className="w-full block max-w-full overflow-clip aspect-[auto_645/270] align-middle h-auto" data-component="image" alt="" height="270" src="/ditto-careers/assets/cloned/svg/1a2484d0fe53.svg" width="645" />
              </div>
              <div className="h-[7.2625rem] min-h-28.5 border-r border-dashed border-r-border border-b border-b-border border-l border-l-border flex p-6 items-center max-md:h-[8.1625rem] max-lg:min-h-25 max-lg:p-5 md:max-lg:h-25 2xl:h-28.5">
                <p className="block text-color-015 leading-[1.375rem] tracking-[-0.48px]">
                  {CAREERS.test.label}
                </p>
              </div>
            </div>
            <div className="border border-dashed border-border block flex-1 max-lg:grow-[initial] max-lg:basis-[initial]" data-ditto-id="motion-div-4">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                {features.map((d, i) => <FeatureCard key={i} d={d} meta={FeatureCard_meta[i] ?? {}} styles={FeatureCard_styles[features.length === 2 ? i + 2 : i] ?? FeatureCard_styles[0]} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[121.7px] block absolute bottom-0 min-w-0 max-h-[8.5625rem] overflow-hidden aspect-[2882/274] pointer-events-none max-md:h-[2.225rem] md:max-lg:h-[4.5625rem] 2xl:h-[8.5625rem]" />
    </section>
  );
}
