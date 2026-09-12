import Icon7 from "../svgs/svg-icon7";
import Icon8 from "../svgs/svg-icon8";
import Icon9 from "../svgs/svg-icon9";
import Icon10 from "../svgs/svg-icon10";
import Icon11 from "../svgs/svg-icon11";
import ListRow2 from "../components/list-row2";
import Icon12 from "../svgs/svg-icon12";
import Icon13 from "../svgs/svg-icon13";
import Icon14 from "../svgs/svg-icon14";
import ListRow3 from "../components/list-row3";
import Logo2, { type Logo2Data } from "../components/logo2";
import { listRow2Data as listRow2DataContent, listRow3Data as listRow3DataContent } from "../content";
const Logo2_data: Logo2Data[] = [
    { ariaLabel: "Placeholder social link", href: "#", icon: <>
            <use xlinkHref="/sprite.svg#reddit" />
            </> },
    { ariaLabel: "Placeholder social link", href: "#", icon: <>
            <use xlinkHref="/sprite.svg#telegram" />
            </> },
    { ariaLabel: "Placeholder social link", href: "#", icon: <>
            <use xlinkHref="/sprite.svg#linkedin" />
            </> },
    { ariaLabel: "Placeholder social link", href: "#", icon: <>
            <use xlinkHref="/sprite.svg#youtube" />
            </> },
    { ariaLabel: "Placeholder social link", href: "#", icon: <>
            <use xlinkHref="/sprite.svg#discord" />
            </> },
    { ariaLabel: "Placeholder social link", href: "#", icon: <>
            <use xlinkHref="/sprite.svg#github" />
            </> },
    { ariaLabel: "Placeholder social link", href: "#", icon: <>
            <use xlinkHref="/sprite.svg#x" />
            </> }
];
/** Site footer. */
export default function Footer({ listRow2Data = listRow2DataContent, listRow3Data = listRow3DataContent, logos = Logo2_data } = {}) {
  return (
    <footer id="contact" className="flex relative py-[2.8125rem] justify-center overflow-clip bg-background">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <div className="flex flex-col col-start-2 [grid-column-end:-2]">
          <div className="h-full flex flex-wrap justify-between items-center gap-5">
            <div className="flex flex-col gap-[0.9375rem]">
              <span className="block text-color-003 [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase">
                {" Financial operations, with every decision accounted for. "}
              </span>
              {" "}
              <span className="block [font-family:'Season_Serif-4de1940e3ab1f834',_'Season_Serif-4de1940e3ab1f834_fallback:_Arial',_sans-serif] text-[1.375rem] leading-[1.5625rem] tracking-[-0.04em] text-foreground">Osfin</span>
              {" "}
            </div>
            {" "}
            <theme-toggle class="block">
              <toggle-group class="inline-flex p-[0.3125rem] rounded-full shadow-[var(--clr-8)_0px_0px_1px_0px_inset,var(--clr-0)_0px_0px_0px_0px,var(--clr-0)_0px_0px_0px_0px,var(--clr-0)_0px_0px_0px_0px,var(--clr-0)_0px_0px_0px_0px]" aria-orientation="horizontal" role="radiogroup" value="auto">
                {" "}
                <toggle-group-item class="contents min-w-0" disabled="false" value="auto">
                  <button className="flex relative isolate py-[0.9375rem] pr-5 pl-[0.9375rem] rounded-full items-center gap-2.5 text-background text-center" data-component="button" aria-checked="true" role="radio" type="button">
                    <span className="w-[6.4375rem] h-full block absolute top-0 left-0 -z-1 min-w-0 rounded-full bg-foreground" />
                    {" "}
                    <Icon7 />
                    {" "}
                    <span className="block [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase" data-ditto-id="motion-span">
                      {" System "}
                    </span>
                    {" "}
                  </button>
                  {" "}
                </toggle-group-item>
                {" "}
                <toggle-group-item class="contents min-w-0" disabled="false" value="light">
                  <button className="h-[2.8125rem] flex relative isolate py-[0.9375rem] pr-5 pl-[0.9375rem] rounded-full items-center gap-2.5 text-center cursor-pointer hover:border-background hover:text-background hover:outline-background hover:[text-decoration-color:var(--background)]" data-component="button" aria-checked="false" role="radio" type="button">
                    {" "}
                    <Icon8 />
                    {" "}
                    <span className="block [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase" data-ditto-id="motion-span-2">
                      {" Light "}
                    </span>
                    {" "}
                  </button>
                  {" "}
                </toggle-group-item>
                {" "}
                <toggle-group-item class="contents min-w-0" disabled="false" value="dark">
                  <button className="h-[2.8125rem] flex relative isolate py-[0.9375rem] pr-5 pl-[0.9375rem] rounded-full items-center gap-2.5 text-center cursor-pointer hover:border-background hover:text-background hover:outline-background hover:[text-decoration-color:var(--background)]" data-component="button" aria-checked="false" role="radio" type="button">
                    {" "}
                    <Icon9 />
                    {" "}
                    <span className="block [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase">
                      {" Dark "}
                    </span>
                    {" "}
                  </button>
                  {" "}
                </toggle-group-item>
                {" "}
              </toggle-group>
              {" "}
            </theme-toggle>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <hr className="w-full border-t border-solid border-t-color-002 block my-[2.8125rem] col-start-2 [grid-column-end:-2] overflow-hidden h-px max-lg:my-7.5" />
        {" "}
        <div className="w-full grid col-start-2 [grid-column-end:-2] grid-cols-subgrid max-lg:mb-[2.8125rem]">
          <div className="flex flex-col items-start gap-7.5 col-start-1 col-end-15">
            <span className="block text-color-003 [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase">
              {" Newsletter "}
            </span>
            {" "}
            <p className="block text-2xl [font-weight:420] leading-[1.625rem] tracking-[-0.48px] [font-feature-settings:'calt'] max-md:text-[1.375rem] max-md:leading-[1.5rem] max-md:tracking-[-0.44px] md:max-lg:text-[1.4375rem] md:max-lg:leading-[1.5625rem] md:max-lg:tracking-[-0.46px]">
              {" Subscribe to our mailing list"}
              <br className="inline" />
              {" to receive the latest updates. "}
            </p>
            {" "}
            <a className="flex relative z-0 items-center gap-2.5 overflow-clip [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase whitespace-nowrap text-nowrap cursor-pointer h-[2.8125rem]" data-component="link" aria-disabled="false" aria-label="Subscribe to newsletter" href="#contact">
              <span className="border border-solid border-border flex relative z-0 rounded-full justify-center items-center overflow-clip aspect-square h-[2.8125rem]">
                {" "}
                <span className="w-[2.6875rem] h-full block absolute top-0 right-0 -z-1 min-w-0 rounded-full bg-foreground [scale:0_1]" />
                {" "}
                <Icon10 />
                {" "}
              </span>
            </a>
            {" "}
          </div>
          {" "}
          <nav className="grid flex-col gap-10 col-start-16 [grid-column-end:-2] grid-cols-3 max-md:mt-[2.8125rem] max-md:col-span-full max-md:col-start-1 max-md:grid-cols-1 md:max-lg:mt-[2.8125rem] md:max-lg:col-span-full md:max-lg:grid-cols-2 2xl:gap-x-15" data-component="nav">
            <section className="flex flex-col gap-7.5">
              <h4 className="block text-color-003 text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase" data-component="heading">
                {" Product "}
              </h4>
              {" "}
              <ul className="flex flex-col gap-2.5 [list-style-type:none] list-outside">
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/platform">
                    {"Fetch "}
                    <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                      records
                      <span className="inline-flex ml-[1.5px] items-center md:max-lg:ml-[0.0875rem]" aria-hidden="">
                        {" "}
                        <Icon11 />
                        {" "}
                      </span>
                    </span>
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/platform">
                    <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                      Match
                      <span className="inline-flex ml-[1.5px] items-center md:max-lg:ml-[0.0875rem]" aria-hidden="">
                        {" "}
                        <Icon11 />
                        {" "}
                      </span>
                    </span>
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/solutions">
                    Trace
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/solutions">
                    Resolve
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/solutions">
                    {"Guard "}
                    <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                      Close
                      <span className="inline-flex ml-[1.5px] items-center md:max-lg:ml-[0.0875rem]" aria-hidden="">
                        {" "}
                        <Icon11 />
                        {" "}
                      </span>
                    </span>
                  </a>
                  {" "}
                </li>
              </ul>
              {" "}
            </section>
            <section className="flex flex-col gap-7.5">
              <h4 className="block text-color-003 text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase" data-component="heading">
                {" Industries "}
              </h4>
              {" "}
              <ul className="flex flex-col gap-2.5 [list-style-type:none] list-outside">
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/industries">
                    Banking
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/industries">
                    Payments
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/industries">
                    {"Fintech "}
                    <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                      ledgers
                      <span className="inline-flex ml-[1.5px] items-center md:max-lg:ml-[0.0875rem]" aria-hidden="">
                        {" "}
                        <Icon11 />
                        {" "}
                      </span>
                    </span>
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/industries">
                    Insurance
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/industries">
                    {"Capital "}
                    <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                      markets
                      <span className="inline-flex ml-[1.5px] items-center md:max-lg:ml-[0.0875rem]" aria-hidden="">
                        {" "}
                        <Icon11 />
                        {" "}
                      </span>
                    </span>
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/industries">
                    <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                      Marketplaces
                      <span className="inline-flex ml-[1.5px] items-center md:max-lg:ml-[0.0875rem]" aria-hidden="">
                        {" "}
                        <Icon11 />
                        {" "}
                      </span>
                    </span>
                  </a>
                  {" "}
                </li>
                <li className="list-item">
                  <a className="inline relative [font-weight:358] leading-[1.375rem] tracking-[0.32px] cursor-pointer md:max-lg:text-[0.9375rem] md:max-lg:leading-[1.3125rem] md:max-lg:tracking-[0.3px] hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/industries">
                    Gaming
                  </a>
                  {" "}
                </li>
              </ul>
              {" "}
            </section>
            <section className="flex flex-col gap-7.5">
              <h4 className="block text-color-003 text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase" data-component="heading">
                {" Resources "}
              </h4>
              {" "}
              <ul className="flex flex-col gap-2.5 [list-style-type:none] list-outside">
                {listRow2Data.map((d, i) => <ListRow2 key={i} d={d} />)}
              </ul>
              {" "}
            </section>
            {" "}
          </nav>
          {" "}
          <div className="hidden min-w-0 flex-col col-start-16 [grid-column-end:-2] max-md:flex max-md:mt-[2.8125rem] max-md:col-span-full">
            <details className="border-b border-solid border-b-border block" name="footer-menu" open>
              <summary className="flex py-5 justify-between items-center gap-[0.9375rem] list-inside cursor-pointer max-md:gap-2.5">
                <span className="block min-w-0 text-lg [font-weight:358] leading-[1.5625rem] tracking-[0.18px] max-md:leading-[1.375rem] max-md:tracking-[0.16px] max-md:[font-size:inherit]">
                  {" Product "}
                </span>
                {" "}
                <Icon12 />
                {" "}
              </summary>
              {" "}
              <div className="flex max-w-[39.75rem] pr-[8.4375rem] pb-[2.8125rem] flex-col gap-2.5 [font-weight:358] leading-[1.375rem] tracking-[0.32px] max-md:max-w-[37.2625rem] max-md:pb-7.5 max-md:text-[0.9375rem] max-md:leading-[1.3125rem] max-md:tracking-[0.3px] max-md:pr-0" id="baba80ee-15f7-4e20-a697-9648463eb82f">
                <ul className="flex min-w-0 pl-6.5 flex-col gap-2.5 [list-style-type:none] list-outside max-md:pl-[1.525rem]">
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/platform">
                      {"Fetch "}
                      <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                        records
                        <span className="inline-flex ml-[1.5px] items-center max-md:ml-[0.0875rem]" aria-hidden="">
                          {" "}
                          <Icon13 />
                          {" "}
                        </span>
                      </span>
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/platform">
                      <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                        Match
                        <span className="inline-flex ml-[1.5px] items-center max-md:ml-[0.0875rem]" aria-hidden="">
                          {" "}
                          <Icon13 />
                          {" "}
                        </span>
                      </span>
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/solutions">
                      Trace
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/solutions">
                      Resolve
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/solutions">
                      {"Guard "}
                      <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                        Close
                        <span className="inline-flex ml-[1.5px] items-center max-md:ml-[0.0875rem]" aria-hidden="">
                          {" "}
                          <Icon13 />
                          {" "}
                        </span>
                      </span>
                    </a>
                    {" "}
                  </li>
                </ul>
                {" "}
              </div>
              {" "}
            </details>
            <details className="border-b border-solid border-b-border block" name="footer-menu">
              <summary className="flex py-5 justify-between items-center gap-[0.9375rem] list-inside cursor-pointer max-md:gap-2.5">
                <span className="block min-w-0 text-lg [font-weight:358] leading-[1.5625rem] tracking-[0.18px] max-md:leading-[1.375rem] max-md:tracking-[0.16px] max-md:[font-size:inherit]">
                  {" Industries "}
                </span>
                {" "}
                <Icon14 />
                {" "}
              </summary>
              {" "}
              <div className="flex max-w-[39.75rem] pr-[8.4375rem] pb-[2.8125rem] flex-col gap-2.5 [font-weight:358] leading-[1.375rem] tracking-[0.32px] max-md:max-w-[37.2625rem] max-md:pb-7.5 max-md:text-[0.9375rem] max-md:leading-[1.3125rem] max-md:tracking-[0.3px] max-md:pr-0" id="13bc73d0-c215-4b05-8133-767ff1076673">
                <ul className="flex min-w-0 pl-6.5 flex-col gap-2.5 [list-style-type:none] list-outside max-md:pl-[1.525rem]">
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/industries">
                      Banking
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/industries">
                      Payments
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/industries">
                      {"Fintech "}
                      <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                        ledgers
                        <span className="inline-flex ml-[1.5px] items-center max-md:ml-[0.0875rem]" aria-hidden="">
                          {" "}
                          <Icon13 />
                          {" "}
                        </span>
                      </span>
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/industries">
                      Insurance
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/industries">
                      {"Capital "}
                      <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                        markets
                        <span className="inline-flex ml-[1.5px] items-center max-md:ml-[0.0875rem]" aria-hidden="">
                          {" "}
                          <Icon13 />
                          {" "}
                        </span>
                      </span>
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/industries">
                      <span className="inline whitespace-nowrap [text-wrap:nowrap_pretty]">
                        Marketplaces
                        <span className="inline-flex ml-[1.5px] items-center max-md:ml-[0.0875rem]" aria-hidden="">
                          {" "}
                          <Icon13 />
                          {" "}
                        </span>
                      </span>
                    </a>
                    {" "}
                  </li>
                  <li className="list-item min-w-0 my-2 pl-1.5 max-md:my-[7.5px] max-md:pl-[0.35rem]">
                    <a className="inline relative cursor-pointer" aria-disabled="false" href="/industries">
                      Gaming
                    </a>
                    {" "}
                  </li>
                </ul>
                {" "}
              </div>
              {" "}
            </details>
            <details className="border-b border-solid border-b-border block" name="footer-menu">
              <summary className="flex py-5 justify-between items-center gap-[0.9375rem] list-inside cursor-pointer max-md:gap-2.5">
                <span className="block min-w-0 text-lg [font-weight:358] leading-[1.5625rem] tracking-[0.18px] max-md:leading-[1.375rem] max-md:tracking-[0.16px] max-md:[font-size:inherit]">
                  {" Resources "}
                </span>
                {" "}
                <Icon14 />
                {" "}
              </summary>
              {" "}
              <div className="flex max-w-[39.75rem] pr-[8.4375rem] pb-[2.8125rem] flex-col gap-2.5 [font-weight:358] leading-[1.375rem] tracking-[0.32px] max-md:max-w-[37.2625rem] max-md:pb-7.5 max-md:text-[0.9375rem] max-md:leading-[1.3125rem] max-md:tracking-[0.3px] max-md:pr-0" id="f5bc39a9-26e2-437c-8708-51568629f878">
                <ul className="flex min-w-0 pl-6.5 flex-col gap-2.5 [list-style-type:none] list-outside max-md:pl-[1.525rem]">
                  {listRow3Data.map((d, i) => <ListRow3 key={i} d={d} />)}
                </ul>
                {" "}
              </div>
              {" "}
            </details>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <hr className="w-full border-t border-solid border-t-color-002 block mt-30 mb-[2.8125rem] col-start-2 [grid-column-end:-2] overflow-hidden h-px max-lg:hidden max-lg:h-0" />
        {" "}
        <div className="flex items-center gap-7.5 col-start-2 [grid-column-end:-2] max-lg:flex-col-reverse max-lg:items-start">
          <div className="flex flex-wrap-reverse items-center gap-[0.9375rem] max-lg:gap-5">
            <span className="block order-[-1] text-color-003 [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase max-lg:order-[initial]">
              {" © 2026 Osfin "}
            </span>
            {" "}
            <div className="flex flex-wrap gap-[0.9375rem] max-lg:gap-5">
              <a className="block relative [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase cursor-pointer hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/privacy">
                Privacy Policy
              </a>
              {" "}
              <a className="block relative [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] uppercase cursor-pointer hover:border-clr-10 hover:text-clr-10 hover:outline-clr-10 hover:[text-decoration-color:var(--clr-10)]" data-component="link" aria-disabled="false" href="/terms">
                Terms of Service
              </a>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <ul className="flex ml-[377.5px] flex-wrap gap-[0.9375rem] [list-style-type:none] list-outside max-lg:ml-0 2xl:ml-[827.5px]">
            {logos.map((d, i) => <Logo2 key={i} d={d} />)}
          </ul>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </footer>
  );
}
