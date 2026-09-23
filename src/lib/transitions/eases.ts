import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

let registered = false;

function registerEase() {
  if (registered) return;
  gsap.registerPlugin(CustomEase);
  if (!CustomEase.get("pageTransition")) {
    CustomEase.create(
      "pageTransition",
      "M0,0 C0.38,0.05 0.48,0.58 0.65,0.82 0.82,1 1,1 1,1",
    );
  }
  registered = true;
}

export function getPageTransitionEase() {
  try {
    registerEase();
    return "pageTransition";
  } catch {
    return "power2.inOut";
  }
}
