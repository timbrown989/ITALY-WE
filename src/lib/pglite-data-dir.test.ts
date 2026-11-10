import assert from "node:assert/strict";
import { test } from "node:test";
import { pgliteDataDir } from "./pglite-data-dir.ts";

test("preview and Vercel stay in memory", () => {
  assert.equal(pgliteDataDir({}), undefined);
  assert.equal(pgliteDataDir({ DATABASE_URL: "postgres://example" }), undefined);
});

test("Render keeps a file directory unless one is configured", () => {
  assert.equal(pgliteDataDir({ RENDER: "true" }), "data/pglite");
  assert.equal(pgliteDataDir({ RENDER: "true", PGLITE_DATA_DIR: " /var/data " }), "/var/data");
});
