"use client";

import React, { useMemo, useState, type CSSProperties, type ElementType, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  text: string;
  as?: ElementType;
  href?: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  color?: string;
  hoverColor?: string;
  direction?: "up" | "down";
  onClick?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  "data-not-typeset"?: string;
  "aria-label"?: string;
}

const TextReveal = React.memo(function TextReveal({
  text,
  as: Component = "a",
  href,
  target,
  className = "",
  style,
  fontSize = "inherit",
  staggerDelay = 25,
  duration = 250,
  easing = "ease-in-out",
  color = "inherit",
  hoverColor = "inherit",
  direction = "up",
  onClick,
  onMouseEnter,
  onMouseLeave,
  "data-not-typeset": dataNotTypeset,
  "aria-label": ariaLabel,
}: TextRevealProps) {
  const [hovered, setHovered] = useState(false);

  const chars = useMemo(() => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    }
    return [...text];
  }, [text]);

  const sign = direction === "up" ? 1 : -1;
  const paintsColor = color !== "inherit" || hoverColor !== "inherit";

  const rootProps: Record<string, unknown> = {
    className: cn(
      "group/cascade relative inline-flex cursor-pointer select-none no-underline",
      className,
    ),
    style: {
      ...(fontSize !== "inherit" ? { fontSize } : {}),
      ...(paintsColor
        ? {
            color: hovered ? hoverColor : color,
            transition: "color 0.35s ease",
          }
        : {}),
      lineHeight: 1,
      ...style,
    },
    onMouseEnter: (event: MouseEvent) => {
      setHovered(true);
      onMouseEnter?.(event);
    },
    onMouseLeave: (event: MouseEvent) => {
      setHovered(false);
      onMouseLeave?.(event);
    },
    onClick,
    "aria-label": ariaLabel ?? text,
    "data-not-typeset": dataNotTypeset,
  };

  if (href) rootProps.href = href;
  else if (Component === "a") rootProps.href = "#";
  if (target) rootProps.target = target;
  if (target === "_blank") rootProps.rel = "noopener noreferrer";

  return (
    <Component {...rootProps}>
      <span className="relative inline-flex leading-none" aria-hidden="true">
        {chars.map((char, i) => {
          const glyph = char === " " ? "\u00A0" : char;
          return (
            <span key={i} className="inline-block h-[1em] overflow-hidden leading-none">
              <span
                className={cn(
                  "block",
                  sign === 1
                    ? "group-hover/cascade:-translate-y-[50%]"
                    : "-translate-y-1/2 group-hover/cascade:translate-y-0",
                )}
                style={{
                  transition: `transform ${duration}ms ${easing} ${i * staggerDelay}ms, translate ${duration}ms ${easing} ${i * staggerDelay}ms`,
                }}
              >
                <span className="block h-[1em] leading-none">{glyph}</span>
                <span className="block h-[1em] leading-none" aria-hidden="true">{glyph}</span>
              </span>
            </span>
          );
        })}
      </span>
    </Component>
  );
});

TextReveal.displayName = "TextReveal";
export { TextReveal };
