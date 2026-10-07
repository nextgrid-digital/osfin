"use client";

import React, { useState, type CSSProperties, type ElementType, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import TextRoll from "@/components/ui/text-roll";

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
  color = "inherit",
  hoverColor = "inherit",
  onClick,
  onMouseEnter,
  onMouseLeave,
  "data-not-typeset": dataNotTypeset,
  "aria-label": ariaLabel,
}: TextRevealProps) {
  const [hovered, setHovered] = useState(false);
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
      <span aria-hidden="true">
        <TextRoll hovered={hovered}>{text}</TextRoll>
      </span>
    </Component>
  );
});

TextReveal.displayName = "TextReveal";
export { TextReveal };
