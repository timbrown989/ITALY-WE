import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { copyPgliteAssets, findPgliteBundles } from "./copy-pglite-assets.mjs";

test("copies the three PGLite runtime files next to the bundled module", () => {
  const root = mkdtempSync(join(tmpdir(), "pglite-copy-"));
  const sourceDir = join(root, "src");
  const bundleDir = join(root, ".output", "server", "_libs");
  mkdirSync(sourceDir, { recursive: true });
  mkdirSync(bundleDir, { recursive: true });
  for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
    writeFileSync(join(sourceDir, name), name);
  }
  const bundle = join(bundleDir, "electric-sql__pglite.mjs");
  writeFileSync(bundle, "export {}");
  const copied = copyPgliteAssets({ root, sourceDir, outputDirs: [join(root, ".output")] });
  assert.deepEqual(copied, [bundle]);
  assert.deepEqual(findPgliteBundles(join(root, "missing")), []);
  for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
    assert.equal(existsSync(join(bundleDir, name)), true);
  }
});
