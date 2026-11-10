import assert from "node:assert/strict";
import { test } from "node:test";
import { formatWei, normalizeAddress } from "./wallet-address.ts";

const ADDRESS = "0x52908400098527886E0F7030069857D2E4169EE7";

test("accepts a public address and rejects secrets-shaped text", () => {
  assert.equal(normalizeAddress(` ${ADDRESS.toLowerCase()} `), ADDRESS.toLowerCase());
  assert.throws(() => normalizeAddress("abandon abandon abandon abandon abandon abandon"), /public Ethereum address/);
  assert.throws(() => normalizeAddress("0x1234"), /public Ethereum address/);
});

test("formats a real wei balance and ignores a bad response", () => {
  assert.equal(formatWei("0x0"), "0");
  assert.equal(formatWei("0xde0b6b3a7640000"), "1");
  assert.equal(formatWei("no"), null);
});
