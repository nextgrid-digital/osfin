"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Icon5 from "../svgs/svg-icon5";

const LINKS = [
  { href: "#workflow", label: "Workflow" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Talk to the team" },
] as const;

const PANEL_ID = "nXlijrz0FoqP20g68tCM9-content";

/** Mobile hamburger + full-screen dialog. Visible below the md breakpoint. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dialog = (
    <div
      id={PANEL_ID}
      role="dialog"
      aria-label="Menu"
      className="flex fixed inset-0 z-50 flex-col bg-foreground text-background pt-24 px-6 pb-8 md:hidden"
      onClick={() => setOpen(false)}
    >
      <nav className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="block text-2xl [font-weight:420] leading-[1.625rem] tracking-[-0.48px] capitalize [font-feature-settings:'calt']"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="contents min-w-0">
      <button
        className="hidden relative z-0 shrink-0 rounded-full justify-center items-center gap-2.5 overflow-clip text-background [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] text-[0.6875rem] leading-[0.875rem] tracking-[0.33px] text-center uppercase whitespace-nowrap text-nowrap bg-foreground cursor-pointer h-[2.8125rem] aspect-square max-md:flex"
        aria-controls={PANEL_ID}
        aria-disabled="false"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Toggle menu"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="h-full block absolute top-0 right-0 -z-1 rounded-full bg-color-006 [scale:0_1] max-md:w-[2.8125rem] max-md:min-w-0" />
        <span className="inline max-md:block">
          <Icon5 />
        </span>
      </button>
      {mounted && open ? createPortal(dialog, document.body) : null}
    </div>
  );
}
