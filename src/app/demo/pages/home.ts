import { enter } from "../animations/enter";

export default function HomePage() {
  return `
    <article class="demo-page demo-page--home">
      <h1>Match volume</h1>
      <p>Bring every record together, then hand exceptions to the agents that trace, resolve, and close them.</p>
      <a class="demo-cta" href="/demo/about">Govern exceptions</a>
    </article>
  `;
}

export function init(options: { container: HTMLElement }) {
  enter(options.container);
}

export function cleanup() {}
