"use client";

import { useEffect } from "react";
import { enter } from "../demo/animations/enter";
import { executeTransition } from "../demo/transitions/execute";

const ROUTES = new Set([
  "/",
  "/platform",
  "/solutions",
  "/industries",
  "/resources",
  "/company",
  "/demo",
  "/demo/about",
]);

function normalizePath(path: string) {
  return path.replace(/\/$/, "") || "/";
}

function syncNav(path: string) {
  const current = normalizePath(path);
  document.querySelectorAll<HTMLAnchorElement>(".demo-nav a").forEach((link) => {
    const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
    if (linkPath === current) {
      link.setAttribute("aria-current", "page");
      return;
    }
    link.removeAttribute("aria-current");
  });
}

function scrollToHash(hash: string) {
  if (!hash) {
    return;
  }
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  document.getElementById(id)?.scrollIntoView();
}

export default function SiteTransition() {
  useEffect(() => {
    let isTransitioning = false;
    let currentPath = normalizePath(window.location.pathname);
    syncNav(currentPath);
    const initial = document.querySelector<HTMLElement>("[data-transition=\"container\"]");
    if (initial?.querySelector(".demo-page")) {
      enter(initial, 0);
    }

    async function go(url: URL, push: boolean) {
      const nextPath = normalizePath(url.pathname);
      if (!ROUTES.has(nextPath)) {
        return;
      }
      if (nextPath === currentPath) {
        if (url.hash) {
          scrollToHash(url.hash);
        }
        return;
      }
      if (isTransitioning) {
        return;
      }
      isTransitioning = true;
      try {
        if (push) {
          window.history.pushState({}, "", `${url.pathname}${url.hash}`);
        }
        const response = await fetch(url.pathname);
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const remote = doc.querySelector("[data-transition=\"container\"]");
        const title = doc.querySelector("title")?.textContent;
        if (!remote) {
          return;
        }
        if (title) {
          document.title = title;
        }
        await executeTransition({
          currentNamespace: currentPath,
          nextNamespace: nextPath,
          nextHTML: remote.innerHTML,
        });
        currentPath = nextPath;
        syncNav(currentPath);
        const nextRoot = document.querySelector<HTMLElement>("[data-transition=\"container\"]");
        if (nextRoot?.querySelector(".demo-page")) {
          enter(nextRoot, 0);
        }
        if (url.hash) {
          scrollToHash(url.hash);
        }
      } finally {
        isTransitioning = false;
      }
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const link = target.closest("a");
      if (!link?.href) {
        return;
      }
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) {
        return;
      }
      if (!ROUTES.has(normalizePath(url.pathname))) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      void go(url, true);
    };

    const onPopState = () => {
      void go(new URL(window.location.href), false);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}
