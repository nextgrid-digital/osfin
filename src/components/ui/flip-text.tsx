"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";

type FlipHover = "group" | "card";

type FlipTextProps = {
  text: string;
  className?: string;
  /** `group` → parent `.group`; `card` → parent `.group/card`. */
  hover?: FlipHover;
};

const HOVER_OUT: Record<FlipHover, string> = {
  group: "group-hover:-translate-y-[110%]",
  card: "group-hover/card:-translate-y-[110%]",
};

const HOVER_IN: Record<FlipHover, string> = {
  group: "group-hover:translate-y-0",
  card: "group-hover/card:translate-y-0",
};

function displayChar(letter: string) {
  return letter === " " ? "\u00A0" : letter;
}

export function FlipText({ text, className, hover = "group" }: FlipTextProps) {
  const reduceMotion = useReducedMotion();
  const letters = text.split("");

  if (reduceMotion) {
    return <span className={cn("inline-block", className)}>{text}</span>;
  }

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden whitespace-nowrap align-bottom",
        className,
      )}
    >
      <span className="sr-only">{text}</span>
      <span className="flex" aria-hidden>
        {letters.map((letter, i) => (
          <span
            key={`a-${i}`}
            className={cn(
              "inline-block transition-transform duration-300 ease-in-out",
              HOVER_OUT[hover],
            )}
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {displayChar(letter)}
          </span>
        ))}
      </span>
      <span className="absolute inset-0 flex" aria-hidden>
        {letters.map((letter, i) => (
          <span
            key={`b-${i}`}
            className={cn(
              "inline-block translate-y-[110%] transition-transform duration-300 ease-in-out",
              HOVER_IN[hover],
            )}
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {displayChar(letter)}
          </span>
        ))}
      </span>
    </span>
  );
}
