"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from "@/components/unlumen-ui/motion-navigation-menu";
import { TextReveal } from "@/components/ui/cascade-text";
import { PRODUCTS } from "../content/products";
import { usePageTransition } from "./PageTransitionProvider";

const listHighlightClassName = "rounded-none bg-white";

const navItemClassName =
  "group/cascade h-auto min-h-0 gap-1.5 rounded-none bg-white px-3.5 py-2 leading-none text-[13px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase inline-flex items-center hover:bg-white hover:text-[rgba(0,0,0,0.875)] focus:text-[rgba(0,0,0,0.875)] data-[state=open]:bg-white data-[state=open]:text-[rgba(0,0,0,0.875)]";
const navLinkClassName =
  "group/cascade h-auto min-h-0 gap-0 rounded-none bg-white px-3.5 py-2 leading-none text-[13px] font-medium tracking-[-0.02em] text-[rgba(0,0,0,0.875)] uppercase inline-flex items-center no-underline hover:bg-white hover:text-[rgba(0,0,0,0.875)] hover:no-underline";

const largeLinkClassName =
  "site-nav-link-lg group/cascade block w-fit p-0 text-left text-[28px] leading-[1.15] font-normal normal-case tracking-normal text-[rgba(0,0,0,0.875)] no-underline hover:text-black hover:no-underline";

function NavLabel({ text }: { text: string }) {
  return (
    <TextReveal
      as="span"
      text={text}
      staggerDelay={14}
      duration={280}
      easing="cubic-bezier(0.22, 1, 0.36, 1)"
    />
  );
}

const PRODUCT_NAV = [
  "settlement-mesh",
  "exception-resolution",
  "control-views",
  "risk-signals",
  "close-orchestration",
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
    label: "About",
    description: "An applied technology company that owns the outcome.",
    href: "/about",
  },
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

function MenuLabel({ children }: { children: ReactNode }) {
  return <p className="mb-5 text-[13px] text-black/45">{children}</p>;
}

function MenuColumns({ children }: { children: ReactNode }) {
  return <div className="flex flex-col items-start gap-12 md:flex-row md:gap-24">{children}</div>;
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

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;
    header.classList.toggle("header-menu-open", menuOpen);
    return () => header.classList.remove("header-menu-open");
  }, [menuOpen]);

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
            <MotionNavigationMenuTrigger className={navItemClassName} aria-label="Product">
              <NavLabel text="Product" />
            </MotionNavigationMenuTrigger>
            <MotionNavigationMenuContent
              highlightClassName="hidden"
              className="w-screen"
            >
              <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
                <MenuColumns>
                  <div>
                    <MenuLabel>Products</MenuLabel>
                    <div className="flex flex-col gap-2">
                      {PRODUCT_NAV.map((slug) => {
                        const product = PRODUCTS.find((p) => p.slug === slug);
                        if (!product) return null;
                        return (
                          <MotionNavigationMenuLink
                            key={slug}
                            href={`/products/${slug}`}
                            onClick={onProductClick(`/products/${slug}`)}
                            className={largeLinkClassName}
                          >
                            <TextReveal as="span" text={product.name} />
                          </MotionNavigationMenuLink>
                        );
                      })}
                    </div>
                  </div>
                </MenuColumns>
              </div>
            </MotionNavigationMenuContent>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem value="solutions">
            <MotionNavigationMenuTrigger className={navItemClassName} aria-label="Solutions">
              <NavLabel text="Solutions" />
            </MotionNavigationMenuTrigger>
            <MotionNavigationMenuContent
              highlightClassName="hidden"
              className="w-screen"
            >
              <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
                <MenuLabel>Industries</MenuLabel>
                <div className="flex flex-col gap-2">
                  {SOLUTIONS.map(({ label }) => (
                    <MotionNavigationMenuLink
                      key={label}
                      href="/#roles"
                      onClick={closeMenu}
                      className={largeLinkClassName}
                    >
                      <TextReveal as="span" text={label} />
                    </MotionNavigationMenuLink>
                  ))}
                </div>
              </div>
            </MotionNavigationMenuContent>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem>
            <MotionNavigationMenuLink href="/blog" className={navLinkClassName}>
              <NavLabel text="Blog" />
            </MotionNavigationMenuLink>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem value="company">
            <MotionNavigationMenuTrigger className={navItemClassName} aria-label="Company">
              <NavLabel text="Company" />
            </MotionNavigationMenuTrigger>
            <MotionNavigationMenuContent
              highlightClassName="hidden"
              className="w-screen"
            >
              <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 md:py-12">
                <MenuLabel>Company</MenuLabel>
                <div className="flex flex-col gap-2">
                  {COMPANY.map(({ label, href }) => (
                    <MotionNavigationMenuLink
                      key={label}
                      href={href}
                      onClick={href.startsWith("/#") ? closeMenu : onProductClick(href)}
                      className={largeLinkClassName}
                    >
                      <TextReveal as="span" text={label} />
                    </MotionNavigationMenuLink>
                  ))}
                </div>
              </div>
            </MotionNavigationMenuContent>
          </MotionNavigationMenuItem>

          <MotionNavigationMenuItem>
            <MotionNavigationMenuLink href="/#contact" className={navLinkClassName}>
              <NavLabel text="Contact" />
            </MotionNavigationMenuLink>
          </MotionNavigationMenuItem>
        </MotionNavigationMenuList>
      </MotionNavigationMenu>
    </>
  );
}
