export type DemoNamespace = "home" | "about";

export type PageModule = {
  default: () => string;
  init?: (options: { container: HTMLElement }) => void;
  cleanup?: () => void;
};
