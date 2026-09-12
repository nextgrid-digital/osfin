import { gsap } from "../lib/gsap";
import { getTransition } from "./registry";

function waitForImages(container: HTMLElement) {
  const images = container.querySelectorAll("img");
  if (images.length === 0) return Promise.resolve();

  return Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    ),
  );
}

export async function executeTransition({
  currentNamespace,
  nextNamespace,
  nextHTML,
}: {
  currentNamespace: string;
  nextNamespace: string;
  nextHTML: string;
}) {
  const currentContainer = document.querySelector<HTMLElement>('[data-transition="container"]');
  const wrapper = document.querySelector('[data-transition="wrapper"]');
  if (!currentContainer || !wrapper) {
    return;
  }

  const nextContainer = currentContainer.cloneNode(false) as HTMLElement;
  nextContainer.setAttribute("data-namespace", nextNamespace);
  nextContainer.innerHTML = nextHTML;
  wrapper.appendChild(nextContainer);

  await waitForImages(nextContainer);

  const transitionFn = getTransition(currentNamespace, nextNamespace);
  const timeline = transitionFn(currentContainer, nextContainer);
  await new Promise<void>((resolve) => {
    timeline.eventCallback("onComplete", () => resolve());
    if (timeline.totalDuration() === 0) {
      resolve();
    }
  });

  currentContainer.remove();
  wrapper.querySelectorAll('[data-transition="container"]').forEach((node) => {
    if (node !== nextContainer) {
      node.remove();
    }
  });
  gsap.set(nextContainer, {
    clearProps: "clipPath,position,top,left,width,height,zIndex,opacity,x,y,scale",
    force3D: true,
  });
}
