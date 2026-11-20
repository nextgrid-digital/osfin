"use client";

import { industryIcons } from "@/components/icons/industries";
import { Carousel } from "@/components/ui/carousel";
import { INDUSTRIES } from "../content/industries";
import { useIndustrySelect } from "./industry-select";

export default function IndustryHeroCarousel({ currentId }: { currentId: string }) {
  const select = useIndustrySelect();
  const industry = INDUSTRIES.find((item) => item.id === currentId);
  const currentIndex = Math.max(
    0,
    INDUSTRIES.findIndex((item) => item.id === currentId),
  );

  return (
    <div className="not-typeset relative mt-6 md:mt-8" data-not-typeset>
      <Carousel
        label={industry ? `${industry.label} gallery` : "Industries"}
        index={currentIndex}
        onIndexChange={(nextIndex) => {
          const next = INDUSTRIES[nextIndex];
          if (!next || next.id === currentId || !select) return;
          select(next.id);
        }}
        slideSize="min(78cqw, 440px)"
        dim={1}
        slideLabel={(index) => INDUSTRIES[index]?.label ?? `${index + 1} of ${INDUSTRIES.length}`}
      >
        {INDUSTRIES.map((item) => {
          const Icon = industryIcons[item.id];
          return (
          <div
            key={item.id}
            className="osfin-iso-wash osfin-icon-trigger flex aspect-square items-center justify-center overflow-hidden border border-black/10 bg-[#f5f5f5]"
          >
            <Icon className="size-full" />
          </div>
          );
        })}
      </Carousel>
    </div>
  );
}
