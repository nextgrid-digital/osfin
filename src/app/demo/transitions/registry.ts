import { alternativeTransition } from "./alternative";
import { defaultTransition } from "./default";

type TransitionFn = typeof defaultTransition;

const transitionRegistry: Record<string, TransitionFn> = {
  default: defaultTransition,
};

export function getTransition(currentNamespace: string, nextNamespace: string) {
  const key = `${currentNamespace}-to-${nextNamespace}`;
  return transitionRegistry[key] ?? transitionRegistry.default ?? defaultTransition;
}

export { alternativeTransition };
