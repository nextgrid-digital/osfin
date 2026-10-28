"use client";

import { useId } from "react";
import TransitionLink from "./TransitionLink";

function OsfinMark({ className }: { className?: string }) {
  const rawId = useId().replace(/:/g, "");
  const clipOuter = `osfin-mark-${rawId}-outer`;
  const clipInner = `osfin-mark-${rawId}-inner`;

  return (
    <svg
      viewBox="0 0 571 571"
      className={className}
      aria-hidden
      fill="#3D6DF2"
    >
      <g clipPath={`url(#${clipOuter})`}>
        <g clipPath={`url(#${clipInner})`}>
          <path d="M570.453 570.458H285.225L149.742 434.976L-0.00185809 285.231V0.00400129H285.225L436.396 151.174L570.453 285.231V570.458Z" />
        </g>
        <path d="M71.3066 322.309V499.139H248.145L305.189 570.446H71.3066V570.457H0V265.264L71.3066 322.309Z" />
        <path d="M499.148 248.149V71.3096H336.018C327.353 71.3095 319.158 67.3704 313.746 60.6045L272.678 9.27051C269.691 5.5354 272.35 0.00292969 277.133 0.00292969H499.148V0.000976562H570.455V305.194L499.148 248.149Z" />
      </g>
      <defs>
        <clipPath id={clipOuter}>
          <rect width="570.455" height="570.455" />
        </clipPath>
        <clipPath id={clipInner}>
          <rect width="261.052" height="806.844" transform="translate(-92.3081 92.2876) rotate(-45)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function SiteLogo({ className = "text-[18px]" }: { className?: string }) {
  return (
    <TransitionLink
      href="/"
      aria-label="Osfin"
      className={`inline-flex items-center text-current ${className}`}
    >
      <OsfinMark className="size-[18px] shrink-0" />
    </TransitionLink>
  );
}
