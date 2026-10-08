"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const DURATION = 0.3;

export default function TextRoll({
  children,
  className,
  hovered,
}: {
  children: string;
  className?: string;
  /** Kept for API compatibility; stagger is disabled so all letters move together. */
  center?: boolean;
  /** When set, drives the roll from a parent hover target. */
  hovered?: boolean;
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
        "relative inline-block overflow-hidden leading-none",
        className,
      )}
      aria-hidden="true"
    >
      <span className="block">
        {chars.map((l, i) => {
          const glyph = l === " " ? "\u00A0" : l;

          return (
            <motion.span
              variants={{
                initial: { y: "0%" },
                hovered: { y: "-110%" },
              }}
              transition={{
                ease: "easeInOut",
                duration: DURATION,
              }}
              className="inline-block"
              key={`top-${i}`}
            >
              {glyph}
            </motion.span>
          );
        })}
      </span>

      <span className="absolute inset-0 block">
        {chars.map((l, i) => {
          const glyph = l === " " ? "\u00A0" : l;

          return (
            <motion.span
              variants={{
                initial: { y: "110%" },
                hovered: { y: "0%" },
              }}
              transition={{
                ease: "easeInOut",
                duration: DURATION,
              }}
              className="inline-block"
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
