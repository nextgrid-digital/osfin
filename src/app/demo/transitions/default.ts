import { customEases, gsap } from "../lib/gsap";

export function defaultTransition(currentContainer: Element, nextContainer: Element) {
  gsap.set(nextContainer, {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 10,
  });

  const timeline = gsap.timeline();
  timeline
    .to(
      currentContainer,
      {
        y: "-30vh",
        opacity: 0.4,
        scale: 0.8,
        duration: 0.7,
        force3D: true,
        ease: customEases.pageTransition,
      },
      0,
    )
    .to(
      nextContainer,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.7,
        force3D: true,
        ease: customEases.pageTransition,
      },
      0,
    );

  return timeline;
}
