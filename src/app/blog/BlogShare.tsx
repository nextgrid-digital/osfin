"use client";

import { useState } from "react";

export default function BlogShare() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="not-typeset inline-flex h-10 items-center rounded-none border border-black/15 bg-transparent px-5 text-[13px] font-medium text-[rgba(0,0,0,0.875)] transition hover:bg-black/5"
      data-not-typeset
      onClick={() => {
        const url = window.location.href;
        const done = () => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        };
        const fallback = () => {
          const input = document.createElement("textarea");
          input.value = url;
          input.setAttribute("readonly", "");
          input.style.position = "fixed";
          input.style.left = "-9999px";
          document.body.appendChild(input);
          input.select();
          const ok = document.execCommand("copy");
          input.remove();
          if (ok) done();
        };
        if (navigator.clipboard?.writeText) {
          void navigator.clipboard.writeText(url).then(done).catch(fallback);
          return;
        }
        fallback();
      }}
    >
      {copied ? "Copied" : "Share"}
    </button>
  );
}
