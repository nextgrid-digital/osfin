"use client";

import { useState } from "react";

export default function BlogShare() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="not-typeset inline-flex items-center bg-transparent p-0 text-[13px] font-medium tracking-[-0.01em] text-[#5D524B]/45 transition hover:text-[#5D524B]"
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
