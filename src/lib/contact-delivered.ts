export function contactDelivered(httpOk: boolean, body: { ok?: boolean } | null) {
  return httpOk && body?.ok === true;
}
