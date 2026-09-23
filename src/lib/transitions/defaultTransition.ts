import gsap from "gsap";
import { getPageTransitionEase } from "./eases";

/** Codrops default: outgoing scale-back + incoming clip-path wipe. */
export function defaultTransition(
  currentContainer: HTMLElement,
  nextContainer: HTMLElement,
): gsap.core.Timeline {
  const ease = getPageTransitionEase();

  gsap.set(nextContainer, {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 1,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 10,
    overflow: "hidden",
  });

  // Avoid GSAP delaying tweens after a long RSC wait.
  gsap.ticker.lagSmoothing(0);

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.ticker.lagSmoothing(500, 33);
    },
  });

  tl.to(
    currentContainer,
    {
      y: "-30vh",
      opacity: 0.4,
      scale: 0.8,
      duration: 0.7,
      force3D: true,
      ease,
    },
    0,
  ).to(
    nextContainer,
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.7,
      force3D: true,
      ease,
    },
    0,
  );

  return tl;
}
