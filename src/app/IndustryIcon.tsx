import type { ReactNode } from "react";
import type { Industry } from "../content/industries";

function Mark({
  children,
  className = "h-16 w-20 text-[#5D524B]",
  strokeWidth = 1.25,
}: {
  children: ReactNode;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 88 72"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export default function IndustryIcon({
  id,
  className,
  strokeWidth,
}: {
  id: Industry["id"];
  className?: string;
  strokeWidth?: number;
}) {
  if (id === "banks") {
    return (
      <Mark className={className} strokeWidth={strokeWidth}>
        <path d="M16 30 44 14 72 30" />
        <path d="M20 30h48" />
        <path d="M26 32v22M36 32v22M46 32v22M58 32v22" />
        <path d="M18 54h52" />
        <path d="M14 60h60" />
      </Mark>
    );
  }

  if (id === "payments") {
    return (
      <Mark className={className} strokeWidth={strokeWidth}>
        <rect x="16" y="18" width="34" height="22" />
        <path d="M22 26h16M22 32h10" />
        <path d="M40 40h32" />
        <path d="M64 34l8 6-8 6" />
        <rect x="38" y="40" width="34" height="22" />
        <path d="M46 48h16M46 54h10" />
      </Mark>
    );
  }

  if (id === "insurance") {
    return (
      <Mark className={className} strokeWidth={strokeWidth}>
        <path d="M44 8 70 18v16c0 16-10 26-26 34C28 60 18 50 18 34V18Z" />
        <path d="M44 16 62 24v10c0 10-7 17-18 22" />
        <path d="M34 36h18M34 42h12" />
        <path d="M52 48 58 42" />
      </Mark>
    );
  }

  if (id === "fintech") {
    return (
      <Mark className={className} strokeWidth={strokeWidth}>
        <path d="M12 34 40 22 76 36 48 48Z" />
        <path d="M12 34v16l36 12V48" />
        <path d="M76 36v16L48 62V48" />
        <path d="M22 38 50 28" />
        <path d="M18 46h16M18 50h10" />
        <path d="M58 40v8M54 44h8" />
      </Mark>
    );
  }

  if (id === "crypto") {
    return (
      <Mark className={className} strokeWidth={strokeWidth}>
        <ellipse cx="44" cy="26" rx="24" ry="10" />
        <path d="M20 26v16c0 6 24 12 24 12s24-6 24-12V26" />
        <path d="M20 34c0 6 24 12 24 12s24-6 24-12" />
        <path d="M44 18v16M36 28l8 6 8-6" />
      </Mark>
    );
  }

  if (id === "ecommerce") {
    return (
      <Mark className={className} strokeWidth={strokeWidth}>
        <path d="M22 28h40l8 30H16Z" />
        <path d="M30 28c0-10 24-10 24 0" />
        <path d="M20 40h46M18 50h48" />
        <path d="M34 58h4M46 58h4" />
      </Mark>
    );
  }

  return (
    <Mark className={className} strokeWidth={strokeWidth}>
      <path d="M14 38h58l8-3-8-3H14" />
      <path d="M40 35 30 16h12l10 19" />
      <path d="M40 41 26 58h14l8-17" />
      <path d="M18 36 8 24h10l8 12" />
    </Mark>
  );
}
