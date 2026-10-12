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

function hslToRgb(h: number, s: number, l: number) {
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = chroma * (1 - Math.abs((hp % 2) - 1));
  const channel =
    hp < 1
      ? [chroma, x, 0]
      : hp < 2
        ? [x, chroma, 0]
        : hp < 3
          ? [0, chroma, x]
          : hp < 4
            ? [0, x, chroma]
            : hp < 5
              ? [x, 0, chroma]
              : [chroma, 0, x];
  const match = l - chroma / 2;
  return channel.map((value) => value + match);
}

function channelHex(value: number) {
  return Math.round(Math.min(1, Math.max(0, value)) * 255)
    .toString(16)
    .padStart(2, "0");
}

/** Dark field in the card's hue, with the drawing mapped onto a lighter shade of it. */
function tintFromCard(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = ((value >> 16) & 255) / 255;
  const green = ((value >> 8) & 255) / 255;
  const blue = (value & 255) / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;
  if (delta !== 0) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  const vivid = Math.min(0.34, Math.max(0.14, saturation * 1.35));
  const highlight = hslToRgb(hue, vivid * 0.7, 0.9);
  const shadow = hslToRgb(hue, Math.min(0.4, vivid + 0.06), 0.66);
  const field = hslToRgb(hue, Math.min(0.42, Math.max(0.2, vivid + 0.06)), 0.22);
  const row = (index: number) => {
    const span = highlight[index]! - shadow[index]!;
    return `${(0.2126 * span).toFixed(4)} ${(0.7152 * span).toFixed(4)} ${(0.0722 * span).toFixed(4)} 0 ${shadow[index]!.toFixed(4)}`;
  };
  return {
    matrix: `${row(0)} ${row(1)} ${row(2)} 0 0 0 1 0`,
    field: `#${channelHex(field[0]!)}${channelHex(field[1]!)}${channelHex(field[2]!)}`,
  };
}

export default function ProductHeroCarousel({ currentSlug }: { currentSlug: string }) {
  const select = useProductSelect();
  const tints = Object.fromEntries(PRODUCTS.map((item) => [item.slug, tintFromCard(item.cardBg)]));
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
              <feColorMatrix type="matrix" values={tints[item.slug]!.matrix} />
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
            className="aspect-square overflow-hidden border border-white/20"
            style={{ backgroundColor: tints[item.slug]!.field }}
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
