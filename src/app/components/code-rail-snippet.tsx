import { RECONCILIATION_CODE } from "../content/reconciliation-code";

const PRE_CLASS =
  "block [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] whitespace-pre [text-wrap:nowrap_pretty]";

/** Decorative Akkurat Mono rail used in side columns. */
export default function CodeRailSnippet() {
  return (
    <pre className={PRE_CLASS}>
      <code className="inline">{RECONCILIATION_CODE}</code>
    </pre>
  );
}
