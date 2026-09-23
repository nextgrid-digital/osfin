declare module "splitting" {
  interface SplittingOptions {
    target?: Element | Element[] | NodeList | string;
    by?: string;
    key?: string | null;
  }

  interface SplittingResult {
    el: HTMLElement;
    chars?: HTMLElement[];
    words?: HTMLElement[];
    lines?: HTMLElement[];
  }

  function Splitting(options?: SplittingOptions): SplittingResult[];

  export default Splitting;
}
