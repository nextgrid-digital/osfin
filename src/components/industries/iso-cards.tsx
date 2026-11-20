"use client";

import TransitionLink from "@/app/TransitionLink";
import PixelCanvas from "@/components/industries/PixelCanvas";
import { IndustryIcon, type IndustryKind } from "@/components/industries/industry-icons";
import { useState, type CSSProperties } from "react";
import "./pixel-cards.css";

const SLATE = ["#cbd5e1", "#94a3b8", "#64748b"];
const SKY = ["#7dd3fc", "#38bdf8", "#0284c7"];
const AMBER = ["#fde047", "#eab308", "#a16207"];
const ROSE = ["#fda4af", "#fb7185", "#e11d48"];

type IndustryCard = {
  kind: IndustryKind;
  title: string;
  href: string;
  colors: string[];
  active: string;
  gap: number;
  speed: number;
};

const INDUSTRIES: IndustryCard[] = [
  { kind: "banks", title: "Banks & Credit Unions", href: "/industries/banks", colors: SLATE, active: "#3f3f46", gap: 5, speed: 35 },
  { kind: "payments", title: "Payments", href: "/industries/payments", colors: SLATE, active: "#3f3f46", gap: 5, speed: 35 },
  { kind: "fintech", title: "Fintech", href: "/industries/fintech", colors: SKY, active: "#0284c7", gap: 10, speed: 25 },
  { kind: "insurance", title: "Insurance", href: "/industries/insurance", colors: SKY, active: "#0284c7", gap: 10, speed: 25 },
  { kind: "ecommerce", title: "Ecommerce & Retail", href: "/industries/ecommerce", colors: AMBER, active: "#a16207", gap: 3, speed: 20 },
  { kind: "travel", title: "Travel & Logistics", href: "/industries/travel", colors: AMBER, active: "#a16207", gap: 3, speed: 20 },
  { kind: "crypto", title: "Crypto", href: "/industries/crypto", colors: ROSE, active: "#e11d48", gap: 6, speed: 80 },
  { kind: "gaming", title: "Gaming", href: "/industries/gaming", colors: ROSE, active: "#e11d48", gap: 6, speed: 80 },
];

function PixelIndustryCard({ title, href, kind, colors, active, gap, speed }: IndustryCard) {
  const [playing, setPlaying] = useState(false);

  return (
    <TransitionLink
      href={href}
      className="pixel-industry-card not-typeset"
      style={{ "--active-color": active } as CSSProperties}
      data-not-typeset
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onFocus={() => setPlaying(true)}
      onBlur={() => setPlaying(false)}
    >
      <PixelCanvas active={playing} gap={gap} speed={speed} colors={colors} />
      <span className="pixel-industry-face">
        <span className="pixel-industry-label">{title}</span>
        <IndustryIcon kind={kind} size={32} className="pixel-industry-icon" />
        <svg className="pixel-industry-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
          <path fill="currentColor" d="m16.004 9.414l-8.607 8.607l-1.414-1.414L14.59 8H7.003V6h11v11h-2z" />
        </svg>
      </span>
    </TransitionLink>
  );
}

export function IndustriesIsoGrid() {
  return (
    <div className="pixel-industry-grid">
      {INDUSTRIES.map((item) => (
        <PixelIndustryCard key={item.kind} {...item} />
      ))}
    </div>
  );
}
