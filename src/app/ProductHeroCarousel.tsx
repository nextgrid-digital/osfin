"use client";

import { Carousel } from "@/components/ui/carousel";
import { PRODUCTS } from "../content/products";
import { useProductSelect } from "./product-select";

const slideArt: Record<string, string> = {
  "match-iq": "/products/match-iq.png?v=7",
  "exception-desk": "/products/exception-resolution.png?v=4",
  "regulatory-reporting": "/products/control-views.png?v=3",
  "risk-signals": "/products/risk-signals.png?v=5",
  "close-orchestration": "/products/close-orchestration.png?v=5",
};

/** Field, line, mid form, and face — the same roles as the isometric studies, one hue each. */
const PALETTES: Record<string, { field: string; line: string; mid: string; face: string; border: string }> = {
  "match-iq": {
    field: "#6A807D",
    line: "#F4F3EE",
    mid: "#486060",
    face: "#F0F0E4",
    border: "rgba(244,243,238,0.35)",
  },
  "exception-desk": {
    field: "#1B2838",
    line: "#F4F3EE",
    mid: "#101C28",
    face: "#F0F0E4",
    border: "rgba(244,243,238,0.28)",
  },
  "regulatory-reporting": {
    field: "#C0D8DC",
    line: "#0C243C",
    mid: "#0C243C",
    face: "#8EAEB4",
    border: "rgba(12,36,60,0.18)",
  },
  "risk-signals": {
    field: "#6E5A6C",
    line: "#F4F3EE",
    mid: "#453848",
    face: "#F0F0E4",
    border: "rgba(244,243,238,0.3)",
  },
  "close-orchestration": {
    field: "#A68472",
    line: "#F4F3EE",
    mid: "#6B4E42",
    face: "#F0F0E4",
    border: "rgba(244,243,238,0.35)",
  },
};

function channels(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

/** Map drawing luminance onto line, mid form, and face colors. */
function tintStops(palette: (typeof PALETTES)[string]) {
  const line = channels(palette.line);
  const mid = channels(palette.mid);
  const face = channels(palette.face);
  const table = (index: number) =>
    [line[index], mid[index], mid[index], face[index], face[index]]
      .map((value) => value!.toFixed(4))
      .join(" ");
  return { r: table(0), g: table(1), b: table(2) };
}

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const select = useProductSelect();
  const tints = Object.fromEntries(
    PRODUCTS.map((item) => {
      const palette = PALETTES[item.slug] ?? PALETTES["match-iq"]!;
      return [item.slug, { palette, stops: tintStops(palette) }];
    }),
  );
  const product = PRODUCTS.find((item) => item.slug === currentSlug);
  const currentIndex = Math.max(
    0,
    PRODUCTS.findIndex((item) => item.slug === currentSlug),
  );

  return (
    <div className="not-typeset relative mt-6 md:mt-8" data-not-typeset>
      <svg className="absolute size-0" aria-hidden="true">
        <defs>
          {PRODUCTS.map((item) => (
            <filter
              id={`product-tint-${item.slug}`}
              key={item.slug}
              colorInterpolationFilters="sRGB"
            >
              <feColorMatrix
                type="matrix"
                values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues={tints[item.slug]!.stops.r} />
                <feFuncG type="table" tableValues={tints[item.slug]!.stops.g} />
                <feFuncB type="table" tableValues={tints[item.slug]!.stops.b} />
              </feComponentTransfer>
            </filter>
          ))}
        </defs>
      </svg>
      <Carousel
        label={product ? `${product.name} gallery` : "Product gallery"}
        index={currentIndex}
        onIndexChange={(nextIndex) => {
          const next = PRODUCTS[nextIndex];
          if (!next || next.slug === currentSlug || !select) return;
          select(next.slug);
        }}
        slideSize="min(78cqw, 440px)"
        dim={1}
        slideLabel={(index) => PRODUCTS[index]?.name ?? `${index + 1} of ${PRODUCTS.length}`}
      >
        {PRODUCTS.map((item) => (
          <div
            key={item.slug}
            className="aspect-square overflow-hidden border"
            style={{
              backgroundColor: tints[item.slug]!.palette.field,
              borderColor: tints[item.slug]!.palette.border,
            }}
          >
            {slideArt[item.slug] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slideArt[item.slug]}
                alt=""
                className="pointer-events-none size-full object-contain"
                style={{ filter: `url(#product-tint-${item.slug})` }}
              />
            ) : null}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
