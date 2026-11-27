import SiteContainer from "./SiteContainer";

const QUOTE =
  "We see AI as a critical driver of the next generation of enterprise operations. Osfin brings this vision to life by applying intelligent automation to complex reconciliation workflows, helping us improve efficiency, accelerate exception resolution, and build more intelligent, scalable processes. It’s an important step in our broader enterprise transformation journey.";

export default function HomeCaseStudies() {
  return (
    <section
      id="case-studies"
      data-process-exit-next
      className="flex flex-col justify-center bg-background section"
      aria-labelledby="case-studies-heading"
    >
      <SiteContainer className="flex w-full flex-col lg:min-h-0 lg:flex-1">
        <div className="mx-auto flex shrink-0 flex-col items-center text-center">
          <h2
            id="case-studies-heading"
            data-process-exit-heading
            className="!mb-0 !mt-0 text-black"
          >
            <span className="block">Outcomes from teams</span>
            <span className="block">already in production</span>
          </h2>
        </div>

        <figure className="mx-auto mt-10 max-w-[42rem] text-center md:mt-14">
          <blockquote className="!m-0 !border-none !p-0 font-[family-name:var(--font-crimson)] text-[clamp(1.35rem,2.4vw,1.85rem)] font-light leading-[1.25] tracking-[-0.02em] text-black">
            &ldquo;{QUOTE}&rdquo;
          </blockquote>
          <figcaption className="mt-8 font-[family-name:var(--font-mono)] text-[12px] font-medium leading-[1.45] tracking-[-0.02em] text-black/55">
            Director, Business Transformation
            <span className="mt-1 block text-black/70">Top-20 Credit Union</span>
          </figcaption>
        </figure>
      </SiteContainer>
    </section>
  );
}
