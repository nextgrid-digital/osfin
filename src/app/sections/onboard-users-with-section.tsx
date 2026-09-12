import Icon6 from "../svgs/svg-icon6";
/** Onboard Users With section. */
export default function OnboardUsersWithSection() {
  return (
    <section className="flex relative py-45 justify-center overflow-clip bg-background max-lg:py-22.5">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <hr className="w-full border-t border-solid border-t-color-002 block col-start-2 [grid-column-end:-2] overflow-hidden h-px" />
        {" "}
        <ul className="block col-start-2 [grid-column-end:-2] [list-style-type:none] list-outside">
          <li id="investigate" className="list-item">
            <a className="min-h-[16.5625rem] border-b border-solid border-b-border grid py-7.5 items-center gap-5 text-left cursor-pointer w-full grid-cols-[50%_1fr_--spacing(9)] max-md:min-h-52 max-lg:grid-cols-1 md:max-lg:min-h-[10.1875rem] hover:border-b-foreground" data-component="link" aria-disabled="false" href="#investigate">
              <h3 className="block text-[3.4375rem] [font-weight:420] leading-[3.4375rem] tracking-[-1.1px] capitalize [font-feature-settings:'calt'] max-md:text-[2rem] max-md:leading-8 max-md:tracking-[-0.64px] md:max-lg:text-[2.5rem] md:max-lg:leading-10 md:max-lg:tracking-[-0.8px]" data-component="heading">
                {" Find why each match exists "}
              </h3>
              {" "}
              <span className="w-full max-w-90 block [font-weight:358] leading-[1.375rem] tracking-[0.32px] whitespace-pre-line max-lg:text-[0.9375rem] max-lg:leading-[1.3125rem] max-lg:tracking-[0.3px]">
                {" Compare records across banks, payment gateways, ERPs and internal ledgers. Trace unmatched items until the likely cause is clear. "}
              </span>
            </a>
            {" "}
          </li>
          <li id="resolve" className="list-item">
            <a className="min-h-[16.5625rem] border-b border-solid border-b-border grid relative py-7.5 items-center gap-5 text-left cursor-pointer w-full grid-cols-[50%_1fr_--spacing(9)] max-md:min-h-44 max-lg:grid-cols-1 md:max-lg:min-h-[11.5rem] hover:border-b-foreground" data-component="link" aria-disabled="false" href="#resolve">
              <h3 className="block text-[3.4375rem] [font-weight:420] leading-[3.4375rem] tracking-[-1.1px] capitalize [font-feature-settings:'calt'] max-md:text-[2rem] max-md:leading-8 max-md:tracking-[-0.64px] md:max-lg:text-[2.5rem] md:max-lg:leading-10 md:max-lg:tracking-[-0.8px]" data-component="heading">
                {" Turn verified answers into action "}
              </h3>
              {" "}
              <span className="w-full max-w-90 block [font-weight:358] leading-[1.375rem] tracking-[0.32px] whitespace-pre-line max-lg:text-[0.9375rem] max-lg:leading-[1.3125rem] max-lg:tracking-[0.3px]">
                {"Route each exception to the right owner, apply the permitted next step and preserve the decision for review. "}
                <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                  resolution.
                  <span className="inline-flex ml-[1.5px] items-center max-lg:ml-[0.0875rem]" aria-hidden="">
                    {" "}
                    <Icon6 />
                    {" "}
                  </span>
                </span>
              </span>
            </a>
            {" "}
          </li>
        </ul>
        {" "}
      </div>
      {" "}
    </section>
  );
}
