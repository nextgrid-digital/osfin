"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { executeTransition } from "../lib/transitions/executeTransition";
import SiteHeader from "./SiteHeader";

type TransitionContextValue = {
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function resolvePath(href: string) {
  const url = new URL(href, window.location.origin);
  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    href: url.pathname + url.search + url.hash,
  };
}

function sleepFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

const NEXT_SELECTOR =
  '[data-transition="container"]:not([data-transition-clone]):not([data-transition-outgoing])';

async function waitForNextContainer(toPath: string, timeoutMs = 4000) {
  const start = performance.now();
  while (performance.now() - start < timeoutMs) {
    await sleepFrame();
    if (window.location.pathname !== toPath) continue;
    const next = document.querySelector<HTMLElement>(NEXT_SELECTOR);
    if (next) return next;
  }
  return null;
}

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitioningRef = useRef(false);

  const clearTransitioning = useCallback(() => {
    transitioningRef.current = false;
    setIsTransitioning(false);
    document.documentElement.classList.remove("is-page-transitioning");
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const target = resolvePath(href);
      const fromPath = window.location.pathname;

      if (target.pathname === fromPath && target.search === window.location.search) {
        if (target.hash) {
          window.location.hash = target.hash;
        }
        return;
      }

      if (transitioningRef.current) return;

      if (prefersReducedMotion()) {
        router.push(target.href);
        return;
      }

      const current = document.querySelector<HTMLElement>(
        '[data-transition="container"]:not([data-transition-clone]):not([data-transition-outgoing])',
      );
      const wrapper = document.querySelector<HTMLElement>('[data-transition="wrapper"]');

      if (!current || !wrapper) {
        router.push(target.href);
        return;
      }

      wrapper.querySelectorAll("[data-transition-clone]").forEach((node) => node.remove());

      transitioningRef.current = true;
      setIsTransitioning(true);
      document.documentElement.classList.add("is-page-transitioning");

      const scrollY = window.scrollY;
      const clone = current.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-transition-clone", "true");
      clone.removeAttribute("data-transition-outgoing");
      clone.setAttribute("aria-hidden", "true");

      gsap.set(clone, {
        position: "fixed",
        top: -scrollY,
        left: 0,
        width: "100%",
        zIndex: 5,
        pointerEvents: "none",
        transformOrigin: "50% 40vh",
      });

      // Mark the live node so we don't treat it as the incoming page while
      // Next.js still has it in the tree during the soft navigation swap.
      current.setAttribute("data-transition-outgoing", "true");
      gsap.set(current, { opacity: 0, pointerEvents: "none" });
      wrapper.appendChild(clone);

      router.push(target.pathname + target.search);

      void (async () => {
        try {
          const next = await waitForNextContainer(target.pathname);
          if (!next) {
            clone.remove();
            return;
          }
          await executeTransition(clone, next);
        } catch {
          if (clone.isConnected) clone.remove();
          const next = document.querySelector<HTMLElement>(NEXT_SELECTOR);
          if (next) {
            gsap.set(next, {
              clearProps:
                "clipPath,position,top,left,width,height,zIndex,opacity,overflow,transform",
            });
          }
        } finally {
          window.scrollTo(0, 0);
          document.documentElement.classList.remove("theme-dark");
          clearTransitioning();
          void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh();
          });
        }
      })();
    },
    [router, clearTransitioning],
  );

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      <SiteHeader />
      <div data-transition="wrapper" className="page-transition-wrapper">
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
