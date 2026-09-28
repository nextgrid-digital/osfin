"use client";

import { TextReveal } from "@/components/ui/cascade-text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentProps, type MouseEvent } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type Props = ComponentProps<typeof Link> & { "data-not-typeset"?: string | boolean };

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

export default function TransitionLink({
  href,
  onClick,
  onMouseEnter,
  children,
  className,
  "data-not-typeset": dataNotTypeset,
  ...props
}: Props) {
  const { navigate, isTransitioning } = usePageTransition();
  const router = useRouter();

  const handleEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(e);
    const raw = typeof href === "string" ? href : href.pathname ?? "";
    if (raw && typeof raw === "string" && isSameDocumentNavigation(raw)) {
      router.prefetch(raw);
    }
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!shouldHandleClick(e)) return;

    const raw = typeof href === "string" ? href : href.pathname ?? "";
    if (!raw || typeof raw !== "string") return;
    if (!isSameDocumentNavigation(raw)) return;

    e.preventDefault();
    if (!isTransitioning) {
      navigate(raw);
    }
  };

  if (typeof children === "string" && typeof href === "string") {
    return (
      <TextReveal
        as={Link}
        href={href}
        text={children}
        className={typeof className === "string" ? className : undefined}
        onClick={(event) => handleClick(event as MouseEvent<HTMLAnchorElement>)}
        onMouseEnter={(event) => handleEnter(event as MouseEvent<HTMLAnchorElement>)}
        aria-label={typeof props["aria-label"] === "string" ? props["aria-label"] : undefined}
        data-not-typeset={dataNotTypeset ? "" : undefined}
      />
    );
  }

  return (
    <Link
      href={href}
      className={className}
      data-not-typeset={dataNotTypeset ? "" : undefined}
      {...props}
      onMouseEnter={handleEnter}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
