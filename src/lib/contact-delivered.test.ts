import assert from "node:assert/strict";
import { test } from "node:test";
import { contactDelivered } from "./contact-delivered.ts";

test("a 200 with ok:false is not a delivered lead", () => {
  assert.equal(contactDelivered(true, { ok: false }), false);
  assert.equal(contactDelivered(true, null), false);
  assert.equal(contactDelivered(false, { ok: true }), false);
  assert.equal(contactDelivered(true, { ok: true }), true);
});
