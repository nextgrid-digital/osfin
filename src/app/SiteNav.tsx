"use client";

import { Children, useState, type MouseEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from "@/components/unlumen-ui/motion-navigation-menu";
import { PRODUCTS } from "../content/products";
import { usePageTransition } from "./PageTransitionProvider";

const listHighlightClassName = "rounded-none bg-black/[0.06]";

const navItemClassName =
  "h-auto min-h-0 gap-1.5 rounded-none bg-black/[0.06] px-3.5 py-2 leading-none text-[13px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase inline-flex items-center hover:bg-black/[0.06] hover:text-[rgba(0,0,0,0.875)] focus:text-[rgba(0,0,0,0.875)] data-[state=open]:bg-black/[0.06] data-[state=open]:text-[rgba(0,0,0,0.875)]";
const navLinkClassName =
  "h-auto min-h-0 gap-0 rounded-none bg-black/[0.06] px-3.5 py-2 leading-none text-[13px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase inline-flex items-center no-underline hover:bg-black/[0.06] hover:text-[rgba(0,0,0,0.875)] hover:no-underline";

const megaCardClassName =
  "group/card relative flex min-h-[12.5rem] w-full flex-col rounded-none border border-black/10 bg-white p-4 text-left no-underline normal-case tracking-normal transition-colors hover:border-black/15 hover:bg-black/[0.06] hover:no-underline";

const PRODUCT_NAV = [
  {
    slug: "settlement-mesh",
    keyword: "Reconciliation",
    blurb: "across banks, gateways, processors, and ledgers.",
  },
  {
    slug: "exception-resolution",
    keyword: "Dispute & chargeback management",
    blurb: "from evidence to action.",
  },
  {
    slug: "control-views",
    keyword: "Reporting & compliance",
    blurb: "views from live operational data.",
  },
  {
    slug: "risk-signals",
    keyword: "AML reporting & fraud prevention",
    blurb: "across payment activity.",
  },
  {
    slug: "close-orchestration",
    keyword: "Financial close orchestration",
    blurb: "for checks, approvals, and sign-off.",
  },
] as const;

const SOLUTIONS = [
  {
    label: "Banking",
    description: "Reconcile cores and ledgers across every settlement window.",
  },
  {
    label: "Payments & Cards",
    description: "Align processors, gateways, and networks in one loop.",
  },
  {
    label: "Fintech",
    description: "Govern agents across high-velocity payment flows.",
  },
  {
    label: "Insurance",
    description: "Unify premiums, claims, and remittance in one mesh.",
  },
  {
    label: "Capital Markets",
    description: "Match trades, cash, and custody with firm controls.",
  },
  {
    label: "Gaming Platform",
    description: "Track wallets, payouts, and risk in real time.",
  },
  {
    label: "Retail",
    description: "One mesh for stores, e-commerce, and tender types.",
  },
] as const;

const COMPANY = [
  {
    label: "Careers",
    description: "Join the team building agentic payment operations.",
    href: "/#company",
  },
  {
    label: "Compliance",
    description: "Operate to SOC, PCI, and regulated standards.",
    href: "/#company",
  },
  {
    label: "Security",
    description: "Protect payment data with end-to-end controls.",
    href: "/#company",
  },
] as const;

function MegaColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const items = Children.toArray(children);

  return (
    <div className="w-full">
      <p className="mb-5 text-[12px] font-medium tracking-[-0.02em] text-black/40 uppercase">
        {title}
      </p>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items}
      </div>
    </div>
  );
}

function MegaCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <>
      <span className="pr-8 text-[15px] font-medium leading-[1.375] text-[rgba(0,0,0,0.875)]">
        {title}
      </span>
      <ArrowUpRight
        className="absolute top-4 right-4 size-4 shrink-0 text-black/40 transition-colors group-hover/card:text-black/70"
        strokeWidth={1.75}
        aria-hidden
      />
      <span className="mt-auto pt-0 text-[13px] leading-[1.3] font-normal text-black/50">
        {subtitle}
      </span>
    </>
  );
}

function shouldHandleClick(e: MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented) return false;
  if (e.button !== 0) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  return true;
}

export default function SiteNav() {
  const { navigate, isTransitioning } = usePageTransition();
  const [menuValue, setMenuValue] = useState("");

  const closeMenu = () => setMenuValue("");

  const onProductClick = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!shouldHandleClick(e)) return;
    e.preventDefault();
    closeMenu();
    if (!isTransitioning) {
      navigate(href);
    }
  };

  const menuOpen = Boolean(menuValue);

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="site-nav-backdrop fixed inset-x-0 top-14 bottom-0 z-40 border-0 bg-black/20 backdrop-blur-md md:top-16"
          onClick={() => setMenuValue("")}
        />
      ) : null}

      <MotionNavigationMenu
        className="site-nav relative z-50 hidden max-w-max flex-none justify-end lg:flex"
        layout="mega"
        value={menuValue}
        onValueChange={setMenuValue}
        viewportClassName="site-nav-viewport site-nav-viewport--mega"
        springStiffness={350}
        springDamping={32}
      >
        <MotionNavigationMenuList
          highlightClassName={listHighlightClassName}
          className="items-center gap-0.5 rounded-none border-0 bg-transparent px-0 py-0"
        >
          <MotionNavigationMenuItem value="products">
            <MotionNavigationMenuTrigger className={navItemClassName}>
              Product
            </MotionNavigationMenuTrigger>
            <MotionNavigationMenuContent
              highlightClassName="hidden"
              className="w-screen"
            >
              <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
                <MegaColumn title="Products">
                  {PRODUCT_NAV.map(({ slug, keyword, blurb }) => {
                    const product = PRODUCTS.find((p) => p.slug === slug);
                    if (!product) return null;
                    return (
                      <MotionNavigationMenuLink
                        key={slug}
                        href={`/products/${slug}`}
                        onClick={onProductClick(`/products/${slug}`)}
                        className={megaCardClassName}
                      >
                        <MegaCard
                          title={product.name}
                          subtitle={
                            <>
                              <strong className="font-semibold text-black">{keyword}</strong>
                              {" "}
                              {blurb}
                            </>
                          }
                        />
                      </MotionNavigationMenuLink>
                    );
                  })}
                </MegaColumn>
              </div>
            </MotionNavigationMenuContent>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem value="solutions">
            <MotionNavigationMenuTrigger className={navItemClassName}>
              Solutions
            </MotionNavigationMenuTrigger>
            <MotionNavigationMenuContent
              highlightClassName="hidden"
              className="w-screen"
            >
              <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
                <MegaColumn title="Industries">
                  {SOLUTIONS.map(({ label, description }) => (
                    <MotionNavigationMenuLink
                      key={label}
                      href="/#roles"
                      onClick={closeMenu}
                      className={megaCardClassName}
                    >
                      <MegaCard title={label} subtitle={description} />
                    </MotionNavigationMenuLink>
                  ))}
                </MegaColumn>
              </div>
            </MotionNavigationMenuContent>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem>
            <MotionNavigationMenuLink href="/#blog" className={navLinkClassName}>
              Blog
            </MotionNavigationMenuLink>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem value="company">
            <MotionNavigationMenuTrigger className={navItemClassName}>
              Company
            </MotionNavigationMenuTrigger>
            <MotionNavigationMenuContent
              highlightClassName="hidden"
              className="w-screen"
            >
              <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
                <MegaColumn title="Company">
                  {COMPANY.map(({ label, description, href }) => (
                    <MotionNavigationMenuLink
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      className={megaCardClassName}
                    >
                      <MegaCard title={label} subtitle={description} />
                    </MotionNavigationMenuLink>
                  ))}
                </MegaColumn>
              </div>
            </MotionNavigationMenuContent>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem>
            <MotionNavigationMenuLink href="/#contact" className={navLinkClassName}>
              Contact
            </MotionNavigationMenuLink>
          </MotionNavigationMenuItem>
        </MotionNavigationMenuList>
      </MotionNavigationMenu>
    </>
  );
}
