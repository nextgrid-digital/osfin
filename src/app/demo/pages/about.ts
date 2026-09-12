import { enter } from "../animations/enter";

export default function AboutPage() {
  return `
    <article class="demo-page demo-page--about">
      <h1>Govern exceptions</h1>
      <p>Policy, permissions, and an audit trail stay attached to every next action — from mismatch to close.</p>
      <a class="demo-cta" href="/demo">Back to match</a>
    </article>
  `;
}

export function init(options: { container: HTMLElement }) {
  enter(options.container);
}

export function cleanup() {}
