"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const DURATION = 0.3;

function toMotionEase(easing: string | number[]) {
  if (Array.isArray(easing)) return easing;
  const match = easing.match(
    /cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/,
  );
  if (!match) return easing;
  return match.slice(1, 5).map(Number);
}

export default function TextRoll({
  children,
  className,
  hovered,
  duration = DURATION,
  easing = "easeInOut",
}: {
  children: string;
  className?: string;
  /** Kept for API compatibility; stagger is disabled so all letters move together. */
  center?: boolean;
  /** When set, drives the roll from a parent hover target. */
  hovered?: boolean;
  duration?: number;
  easing?: string | number[];
}) {
  const chars = children.split("");
  const controlled = typeof hovered === "boolean";

  return (
    <motion.span
      initial="initial"
      {...(controlled
        ? { animate: hovered ? "hovered" : "initial" }
        : { whileHover: "hovered" as const })}
      className={cn(
        "relative inline-flex items-baseline overflow-hidden leading-[1.3]",
        className,
      )}
      aria-hidden="true"
    >
      <span className="flex items-baseline">
        {chars.map((l, i) => {
          const glyph = l === " " ? "\u00A0" : l;

          return (
            <motion.span
              variants={{
                initial: { y: "0%" },
                hovered: { y: "-110%" },
              }}
              transition={{
                ease: toMotionEase(easing),
                duration,
              }}
              className="inline-block leading-[1.3]"
              key={`top-${i}`}
            >
              {glyph}
            </motion.span>
          );
        })}
      </span>

      <span className="absolute inset-0 flex items-baseline">
        {chars.map((l, i) => {
          const glyph = l === " " ? "\u00A0" : l;

          return (
            <motion.span
              variants={{
                initial: { y: "110%" },
                hovered: { y: "0%" },
              }}
              transition={{
                ease: toMotionEase(easing),
                duration,
              }}
              className="inline-block leading-[1.3]"
              key={`bottom-${i}`}
            >
              {glyph}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
}
