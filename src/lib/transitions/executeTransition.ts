import gsap from "gsap";
import { defaultTransition } from "./defaultTransition";

export async function executeTransition(
  currentContainer: HTMLElement,
  nextContainer: HTMLElement,
): Promise<void> {
  const timeline = defaultTransition(currentContainer, nextContainer);

  await Promise.race([
    timeline.then(),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 1200);
    }),
  ]);

  if (currentContainer.isConnected) {
    currentContainer.remove();
  }

  gsap.set(nextContainer, {
    clearProps: "clipPath,position,top,left,width,height,zIndex,opacity,overflow,transform",
    force3D: true,
  });
}
