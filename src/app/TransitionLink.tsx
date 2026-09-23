"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentProps, type MouseEvent } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type Props = ComponentProps<typeof Link>;

function shouldHandleClick(e: MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented) return false;
  if (e.button !== 0) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  return true;
}

function isSameDocumentNavigation(href: string) {
  const next = new URL(href, window.location.origin);
  if (next.origin !== window.location.origin) return false;

  const samePath =
    next.pathname === window.location.pathname && next.search === window.location.search;
  // Hash-only jumps should use native scrolling.
  if (samePath) return false;
  return true;
}

export default function TransitionLink({ href, onClick, onMouseEnter, ...props }: Props) {
  const { navigate, isTransitioning } = usePageTransition();
  const router = useRouter();

  return (
    <Link
      href={href}
      {...props}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        const raw = typeof href === "string" ? href : href.pathname ?? "";
        if (raw && typeof raw === "string" && isSameDocumentNavigation(raw)) {
          router.prefetch(raw);
        }
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!shouldHandleClick(e)) return;

        const raw = typeof href === "string" ? href : href.pathname ?? "";
        if (!raw || typeof raw !== "string") return;
        if (!isSameDocumentNavigation(raw)) return;

        e.preventDefault();
        if (!isTransitioning) {
          navigate(raw);
        }
      }}
    />
  );
}
