"use client";

import { cn } from "@/lib/utils";
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useScroll,
  type UseScrollOptions,
  useTransform,
} from "motion/react";
import * as React from "react";

interface TextScrollReadProps extends React.HTMLAttributes<HTMLDivElement> {
  offset?: UseScrollOptions["offset"];
  yRange?: number[];
  wrapperClassName?: string;
  spaceClass?: string;
}
interface TextScrollReadContextValue {
  scrollYProgress: MotionValue<number>;
}
const TextScrollReadContext = React.createContext<
  TextScrollReadContextValue | undefined
>(undefined);
export function useTextScrollReadContext() {
  const context = React.useContext(TextScrollReadContext);
  if (!context) {
    throw new Error(
      "useTextScrollReadContext must be used within a TextScrollReadContextProvider",
    );
  }
  return context;
}
export function TextScrollRead({
  spaceClass,
  offset = ["start end", "center start"],
  children,
  className,
  ...props
}: TextScrollReadProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });
  return (
    <TextScrollReadContext.Provider value={{ scrollYProgress }}>
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
        <div className={cn("h-25", spaceClass)} />
      </div>
    </TextScrollReadContext.Provider>
  );
}

export function TextScrollReadWrap({
  yInput = [0, 1],
  yRange = [0, 100],
  style,
  ...props
}: HTMLMotionProps<"div"> & {
  yInput?: number[];
  yRange?: number[];
  style?: React.CSSProperties;
}) {
  const { scrollYProgress } = useTextScrollReadContext();
  const y = useTransform(scrollYProgress, yInput, yRange);

  return (
    <motion.div
      style={{
        y,
        willChange: "transform",
        ...style,
      }}
      {...props}
    />
  );
}

const unread = 0.28;
const read = 0.875;

/** Reveals each wrapped line in order, keeping the source paragraph breaks. */
export function ScrollReadParagraphs({
  paragraphs,
}: {
  paragraphs: readonly string[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useTextScrollReadContext();

  React.useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const paint = () => {
      const words = [...root.querySelectorAll<HTMLElement>("[data-word]")];
      const height = window.innerHeight;
      // Gray near the bottom of the screen, fully black while the line is still below center.
      const startAt = height * 0.96;
      const doneAt = height * 0.7;
      const lineTop = new Map<number, number>();
      for (const word of words) {
        const line = Number(word.dataset.line || 0);
        if (!lineTop.has(line)) lineTop.set(line, word.getBoundingClientRect().top);
      }
      words.forEach((word) => {
        const line = Number(word.dataset.line || 0);
        const top = lineTop.get(line) ?? height;
        const progress = Math.min(1, Math.max(0, (startAt - top) / (startAt - doneAt)));
        word.style.color = `rgba(0, 0, 0, ${unread + (read - unread) * progress})`;
      });
    };

    const measure = () => {
      const words = [...root.querySelectorAll<HTMLElement>("[data-word]")];
      let count = 0;
      let lastTop = Number.NEGATIVE_INFINITY;
      for (const word of words) {
        const top = word.offsetTop;
        if (lastTop !== Number.NEGATIVE_INFINITY && top - lastTop > 2) count += 1;
        lastTop = top;
        word.dataset.line = String(count);
      }
      root.dataset.lines = String(Math.max(1, count + 1));
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    const fonts = document.fonts?.ready.then(measure);
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const unsubscribe = scrollYProgress.on("change", paint);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      unsubscribe();
      void fonts;
    };
  }, [paragraphs, scrollYProgress]);

  return (
    <div ref={ref}>
      {paragraphs.map((paragraph, index) => (
        <h4
          key={paragraph}
          data-paragraph
          className={index === 0 ? "!mb-0 !mt-0" : "!mb-0 !mt-4"}
        >
          {paragraph.split(/(\s+)/).map((part, partIndex) =>
            part.trim() ? (
              <span key={partIndex} data-word className="text-black/30">
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </h4>
      ))}
    </div>
  );
}

export function ClipText({
  className,
  style,
  ...props
}: HTMLMotionProps<"span">) {
  const { scrollYProgress } = useTextScrollReadContext();
  const backgroundPositionX = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"],
  );
  return (
    <motion.span
      className={cn(
        "bg-[length:200%_100%] bg-clip-text bg-no-repeat text-transparent bg-scroll",
        "bg-[linear-gradient(-90deg,var(--muted)_50%,var(--foreground)_50%)]",
        className,
      )}
      style={{
        backgroundPositionX,
        ...style,
      }}
      {...props}
    />
  );
}
