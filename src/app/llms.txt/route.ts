export const dynamic = "force-static";

export function GET() {
  return new Response("# Osfin: Financial operations, explained\n\nOsfin is a financial operations and reconciliation platform for teams managing complex transaction records across banks, payment gateways, ERPs, ledgers and internal systems.\n\nWhen financial records disagree, finance teams need to understand why, decide what happens next and preserve the evidence.\n", {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
