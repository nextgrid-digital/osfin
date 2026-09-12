/** Aptos Is The section. */
export default function AptosIsTheSection() {
  return (
    <section className="flex relative py-45 justify-center overflow-clip text-balance bg-clr-4 max-lg:py-22.5">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <span className="block pb-[2.8125rem] col-start-2 col-end-19 text-[3.4375rem] [font-weight:420] leading-[3.4375rem] tracking-[-1.1px] [font-feature-settings:'calt'] max-lg:pb-7.5 max-lg:[grid-column-end:-2] max-md:text-[2rem] max-md:leading-8 max-md:tracking-[-0.64px] md:max-lg:text-[2.5rem] md:max-lg:leading-10 md:max-lg:tracking-[-0.8px]" data-component="heading">
          From incoming records
          <br />
          to a controlled financial
          <br />
          outcome
        </span>
        {" "}
        <hr className="w-full border-t border-solid border-t-color-002 block col-start-2 [grid-column-end:-2] overflow-hidden h-px" />
        {" "}
        <span className="block pt-30 col-start-21 [grid-column-end:-5] text-lg [font-weight:358] leading-[1.5625rem] tracking-[0.18px] max-lg:pt-[2.8125rem] max-lg:col-start-2 max-lg:[grid-column-end:-2] max-md:leading-[1.375rem] max-md:tracking-[0.16px] max-md:[font-size:inherit] md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.5rem] md:max-lg:tracking-[0.17px]">
          {" "}
          <p className="block mb-2.5">
            Financial operations teams work across banks, payment gateways, ERPs and internal ledgers. Each system has its own format, timing and source of truth.
          </p>
          <p className="block">
            The platform brings these records into one configurable workflow for matching, investigation, resolution and close. Teams can define their rules, permissions and approval paths while keeping every action traceable.
          </p>
          {" "}
        </span>
        {" "}
      </div>
      {" "}
    </section>
  );
}
