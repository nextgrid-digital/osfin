export const metadata = {
  title: "Osfin demo — Govern exceptions",
  description: "Codrops-style page transition demo.",
};

export default function DemoAboutPage() {
  return (
    <article className="demo-page demo-page--about">
      <h1>Govern exceptions</h1>
      <p>
        Policy, permissions, and an audit trail stay attached to every next action — from mismatch to close.
      </p>
      <a className="demo-cta" href="/demo">
        Back to match
      </a>
    </article>
  );
}
