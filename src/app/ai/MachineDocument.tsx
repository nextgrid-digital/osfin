"use client";

import { absoluteHref, machineBlocks } from "../../content/machine";
import TransitionLink from "../TransitionLink";

export default function MachineDocument() {
  const blocks = machineBlocks();

  return (
    <article
      className="machine-page not-typeset min-h-screen bg-black px-5 pt-16 pb-28 text-[#f6f6f6] md:px-8 md:pt-20"
      data-not-typeset
      data-transition="container"
      data-namespace="machine"
    >
      <div
        className="mx-auto w-full max-w-[42rem] text-[15px] leading-[1.55]"
        style={{ fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}
      >
        {blocks.map((block, index) => {
          if (block.type === "link") {
            const shown = `[${block.label}](${absoluteHref(block.href)})`;
            const className = "block text-[#f6f6f6] no-underline hover:underline";
            if (block.href.startsWith("mailto:") || block.href.startsWith("http")) {
              return (
                <a key={index} href={block.href} className={className}>
                  {shown}
                </a>
              );
            }
            return (
              <TransitionLink key={index} href={block.href} className={className}>
                <span>{shown}</span>
              </TransitionLink>
            );
          }
          if (block.text === "") return <div key={index} className="h-[1.55em]" />;
          return (
            <p key={index} className="!m-0">
              {block.text}
            </p>
          );
        })}
      </div>
    </article>
  );
}
