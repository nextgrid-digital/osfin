"use client"

import type { ComponentType } from "react"
import BanksIcon from "@/components/icons/industries/banks-icon"
import CryptoIcon from "@/components/icons/industries/crypto-icon"
import EcommerceIcon from "@/components/icons/industries/ecommerce-icon"
import FintechIcon from "@/components/icons/industries/fintech-icon"
import GamingIcon from "@/components/icons/industries/gaming-icon"
import InsuranceIcon from "@/components/icons/industries/insurance-icon"
import PaymentsIcon from "@/components/icons/industries/payments-icon"
import TravelIcon from "@/components/icons/industries/travel-icon"
import "./line-cover.css"
import "./iso-cards.css"

export const ISO_INDUSTRIES: { slug: string; title: string; href: string; Icon: ComponentType<{ className?: string }> }[] = [
  { slug: "banks", title: "Banks & Credit Unions", href: "/industries/banks", Icon: BanksIcon },
  { slug: "payments", title: "Payments", href: "/industries/payments", Icon: PaymentsIcon },
  { slug: "fintech", title: "Fintech", href: "/industries/fintech", Icon: FintechIcon },
  { slug: "insurance", title: "Insurance", href: "/industries/insurance", Icon: InsuranceIcon },
  { slug: "ecommerce", title: "Ecommerce & Retail", href: "/industries/ecommerce", Icon: EcommerceIcon },
  { slug: "travel", title: "Travel & Logistics", href: "/industries/travel", Icon: TravelIcon },
  { slug: "crypto", title: "Crypto", href: "/industries/crypto", Icon: CryptoIcon },
  { slug: "gaming", title: "Gaming", href: "/industries/gaming", Icon: GamingIcon },
]

export function IndustryIsoCard({ title, href, Icon }: { title: string; href: string; Icon: ComponentType<{ className?: string }> }) {
  return (
    <a href={href} className="osfin-line-card osfin-iso-card osfin-icon-trigger">
      <div className="line-foot">
        <h3 className="line-title">{title}</h3>
        <svg className="line-arrow" viewBox="0 0 8 8" aria-hidden="true">
          <g fill="currentColor">
            <rect x="3" y="0" width="5" height="1" />
            <rect x="6" y="1" width="2" height="1" />
            <rect x="5" y="2" width="2" height="1" />
            <rect x="4" y="3" width="2" height="1" />
            <rect x="3" y="4" width="2" height="1" />
            <rect x="2" y="5" width="2" height="1" />
            <rect x="1" y="6" width="2" height="1" />
            <rect x="0" y="7" width="2" height="1" />
          </g>
        </svg>
      </div>
      <div className="osfin-line-art-iso">
        <Icon />
      </div>
    </a>
  )
}

export function IndustriesIsoGrid() {
  return (
    <div className="osfin-iso-grid">
      {ISO_INDUSTRIES.map((item) => (
        <IndustryIsoCard key={item.slug} title={item.title} href={item.href} Icon={item.Icon} />
      ))}
    </div>
  )
}
