import { gsap } from "../lib/gsap";

export function enter(container: HTMLElement, delay = 0.32) {
  const heading = container.querySelector("h1");
  if (!heading) return null;

  const copy = container.querySelectorAll("p, .demo-cta");
  gsap.set([heading, copy], { opacity: 1 });

  const timeline = gsap.timeline({ defaults: { force3D: true } });
  timeline.from(
    heading,
    {
      y: 48,
      opacity: 0,
      duration: 1.35,
      ease: "expo.out",
    },
    delay,
  );
  if (copy.length) {
    timeline.from(
      copy,
      {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      },
      delay + 0.15,
    );
  }

  return { timeline };
}
