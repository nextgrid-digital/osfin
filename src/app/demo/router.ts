import { executeTransition } from "./transitions/execute";
import type { DemoNamespace, PageModule } from "./types";

const routes: Record<string, { namespace: DemoNamespace; loader: () => Promise<PageModule> }> = {
  "/demo": {
    namespace: "home",
    loader: () => import("./pages/home"),
  },
  "/demo/about": {
    namespace: "about",
    loader: () => import("./pages/about"),
  },
};

function pathToRoute(path: string) {
  const normalized = path.replace(/\/$/, "") || "/";
  return routes[normalized] ?? routes["/demo"];
}

export function createRouter() {
  let currentPage: PageModule | null = null;
  let currentNamespace: DemoNamespace | null = null;
  let isTransitioning = false;

  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest("a");
    if (!link || !link.href.startsWith(window.location.origin)) return;

    const url = new URL(link.href);
    if (!url.pathname.startsWith("/demo")) return;
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    event.stopPropagation();
    if (isTransitioning) return;
    void navigate(url.pathname);
  };

  const onPopState = () => {
    if (isTransitioning) return;
    void performTransition(window.location.pathname);
  };

  async function loadInitialPage(initial: DemoNamespace) {
    const path = window.location.pathname;
    const route = pathToRoute(path) ?? (initial === "about" ? routes["/demo/about"] : routes["/demo"]);
    if (!route) return;
    const pageModule = await route.loader();

    const wrapper = document.querySelector("[data-transition=\"wrapper\"]");
    if (!wrapper) return;

    let container = wrapper.querySelector<HTMLElement>('[data-transition="container"]');
    if (!container) {
      container = document.createElement("div");
      container.className = "demo-container";
      container.setAttribute("data-transition", "container");
      const main = document.createElement("main");
      main.id = "page_content";
      main.className = "page_content";
      container.appendChild(main);
      wrapper.appendChild(container);
    }

    const content = container.querySelector("#page_content");
    if (!content) return;
    if (!content.innerHTML.trim()) {
      content.innerHTML = pageModule.default();
    }
    container.setAttribute("data-namespace", route.namespace);
    pageModule.init?.({ container });

    currentPage = pageModule;
    currentNamespace = route.namespace;
    syncNav(route.namespace);
  }

  async function navigate(path: string) {
    if (isTransitioning) return;
    if (window.location.pathname.replace(/\/$/, "") === path.replace(/\/$/, "")) return;
    window.history.pushState({}, "", path);
    await performTransition(path);
  }

  async function performTransition(path: string) {
    if (isTransitioning) return;
    isTransitioning = true;

    try {
      const route = pathToRoute(path);
      if (!route || !currentNamespace || currentNamespace === route.namespace) return;

      currentPage?.cleanup?.();
      const pageModule = await route.loader();
      await executeTransition({
        currentNamespace,
        nextNamespace: route.namespace,
        nextHTML: pageModule.default(),
        nextModule: pageModule,
      });
      currentPage = pageModule;
      currentNamespace = route.namespace;
      syncNav(route.namespace);
    } finally {
      isTransitioning = false;
    }
  }

  function syncNav(_namespace: DemoNamespace) {
    document.querySelectorAll<HTMLAnchorElement>(".demo-nav a").forEach((link) => {
      link.removeAttribute("aria-current");
    });
  }

  return {
    async init(initial: DemoNamespace) {
      await loadInitialPage(initial);
      document.addEventListener("click", onClick, true);
      window.addEventListener("popstate", onPopState);
    },
    destroy() {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    },
  };
}
