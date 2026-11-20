"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTransition } from "./PageTransitionProvider";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export default function ViewModeToggle() {
  const router = useRouter();
  const { navigate } = usePageTransition();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/ai");
  }, [router]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (!(event.metaKey || event.ctrlKey) || event.shiftKey || event.altKey) return;
      if (event.key.toLowerCase() !== "k") return;
      if (isTypingTarget(event.target)) return;

      event.preventDefault();
      navigate(window.location.pathname === "/ai" ? "/" : "/ai");
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return null;
}
