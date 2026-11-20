"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { executeTransition } from "../lib/transitions/executeTransition";
import { syncPageWash } from "./pageWash";
import SiteHeader from "./SiteHeader";
import ViewModeToggle from "./ViewModeToggle";

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
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitioningRef = useRef(false);
  const strippedCursorRefs = useRef(false);
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(pathname !== "/ai");

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/ai");
  }, [router]);

  useEffect(() => {
    if (!transitioningRef.current) setShowHeader(pathname !== "/ai");
  }, [pathname]);

  useEffect(() => {
    (
      window as Window & { __osfinStopStrippingCursorRefs?: () => void }
    ).__osfinStopStrippingCursorRefs?.();
  }, []);

  // The browser inspector stamps data-cursor-ref onto the server HTML before
  // hydration. Remove it while this tree is rendering, before child nodes are matched.
  if (typeof document !== "undefined" && !strippedCursorRefs.current) {
    strippedCursorRefs.current = true;
    document.querySelectorAll("[data-cursor-ref]").forEach((node) => {
      node.removeAttribute("data-cursor-ref");
    });
  }

  const clearTransitioning = useCallback(() => {
    transitioningRef.current = false;
    setIsTransitioning(false);
    document.documentElement.classList.remove("is-page-transitioning");
    const onMachine = window.location.pathname === "/ai";
    setShowHeader(!onMachine);
    if (!onMachine) document.documentElement.classList.remove("is-hiding-header");
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const target = resolvePath(href);
      const fromPath = window.location.pathname;

      if (target.pathname === fromPath) {
        if (target.search === window.location.search) {
          if (target.hash) {
            const scroller = lenisRef.current;
            if (scroller) scroller.scrollTo(target.hash);
            else window.location.hash = target.hash;
          }
          return;
        }
        router.push(target.href);
        return;
      }

      if (transitioningRef.current) return;

      if (prefersReducedMotion()) {
        router.push(target.href);
        return;
      }

      const modeSwitch = fromPath === "/ai" || target.pathname === "/ai";
      const startViewTransition = (
        document as Document & {
          startViewTransition?: (update: () => Promise<void>) => { finished: Promise<void> };
        }
      ).startViewTransition?.bind(document);

      // The Human / Machine switch keeps the current page on screen until the
      // next one is ready, then crossfades. Hiding the page first paints the
      // black canvas with no text.
      if (modeSwitch && startViewTransition) {
        transitioningRef.current = true;
        setIsTransitioning(true);
        lenisRef.current?.stop();
        document.documentElement.classList.add("mode-transition");

        const finishMode = () => {
          document.documentElement.classList.remove("mode-transition");
          document.documentElement.classList.remove("is-hiding-header");
          const scroller = lenisRef.current;
          if (scroller) scroller.scrollTo(0, { immediate: true, force: true });
          else window.scrollTo(0, 0);
          syncPageWash();
          scroller?.start();
          clearTransitioning();
        };

        const viewTransition = startViewTransition(async () => {
          flushSync(() => setShowHeader(target.pathname !== "/ai"));
          router.push(target.pathname + target.search, { scroll: false });
          await waitForNextContainer(target.pathname);
          const scroller = lenisRef.current;
          if (scroller) scroller.scrollTo(0, { immediate: true, force: true });
          window.scrollTo(0, 0);
          await sleepFrame();
        });

        viewTransition.finished.then(finishMode, finishMode);
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

      document.querySelectorAll("[data-transition-clone]").forEach((node) => node.remove());

      transitioningRef.current = true;
      setIsTransitioning(true);
      document.documentElement.classList.add("is-page-transitioning");
      lenisRef.current?.stop();

      const scrollY = window.scrollY;
      const clone = current.cloneNode(true) as HTMLElement;
      clone.setAttribute("data-transition-clone", "true");
      clone.removeAttribute("data-transition-outgoing");
      clone.setAttribute("aria-hidden", "true");

      // Keep the outgoing view on its own background token so the machine
      // page's black canvas cannot repaint this snapshot.
      const frozenBackground = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
      if (frozenBackground) clone.style.setProperty("--background", frozenBackground);

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

      // React replaces the page on the next commit and drops nodes it doesn't
      // own. Put the snapshot back before paint so the view never goes blank.
      let holdClone = true;
      const keepClone = () => {
        if (!holdClone || clone.isConnected) return;
        wrapper.appendChild(clone);
      };
      const cloneGuard = new MutationObserver(keepClone);
      cloneGuard.observe(wrapper, { childList: true });
      const releaseClone = () => {
        holdClone = false;
        cloneGuard.disconnect();
      };

      router.push(target.pathname + target.search);

      void (async () => {
        try {
          const next = await waitForNextContainer(target.pathname);
          if (!next) {
            releaseClone();
            clone.remove();
            return;
          }
          releaseClone();
          await executeTransition(clone, next);
        } catch {
          releaseClone();
          if (clone.isConnected) clone.remove();
          const next = document.querySelector<HTMLElement>(NEXT_SELECTOR);
          if (next) {
            gsap.set(next, {
              clearProps:
                "clipPath,position,top,left,width,height,zIndex,opacity,overflow,transform,pointerEvents",
            });
          }
        } finally {
          releaseClone();
          if (clone.isConnected) clone.remove();
          const scroller = lenisRef.current;
          if (scroller) scroller.scrollTo(0, { immediate: true, force: true });
          else window.scrollTo(0, 0);
          syncPageWash();
          scroller?.start();
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
      {showHeader ? <SiteHeader /> : null}
      <div data-transition="wrapper" className="page-transition-wrapper">
        {children}
      </div>
      <ViewModeToggle />
    </TransitionContext.Provider>
  );
}
