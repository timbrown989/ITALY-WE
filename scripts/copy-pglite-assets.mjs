#!/usr/bin/env node
/**
 * Nitro's node-server bundle imports pglite.data, pglite.wasm and initdb.wasm
 * from beside the bundled module, but it does not copy those files.
 * Without them the server logs "PGLite bootstrap failed" and cannot store
 * anything when DATABASE_URL is unset.
 */
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { projectRoot, isMainModule } from "./with-app-env.mjs";

export const PGLITE_ASSET_NAMES = ["pglite.data", "pglite.wasm", "initdb.wasm"];

export function findPgliteBundles(dir, found = []) {
  if (!existsSync(dir)) return found;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) findPgliteBundles(path, found);
    else if (name.includes("electric-sql__pglite") && name.endsWith(".mjs")) found.push(path);
  }
  return found;
}

export function copyPgliteAssets({ root, sourceDir, outputDirs }) {
  const missing = PGLITE_ASSET_NAMES.filter((name) => !existsSync(join(sourceDir, name)));
  if (missing.length > 0) {
    throw new Error(`PGLite package is missing ${missing.join(", ")} in ${sourceDir}`);
  }
  const bundles = outputDirs.flatMap((dir) => findPgliteBundles(dir));
  for (const bundle of bundles) {
    const destDir = dirname(bundle);
    for (const name of PGLITE_ASSET_NAMES) {
      copyFileSync(join(sourceDir, name), join(destDir, name));
    }
  }
  return bundles;
}

function main() {
  const root = projectRoot();
  const bundles = copyPgliteAssets({
    root,
    sourceDir: join(root, "node_modules", "@electric-sql", "pglite", "dist"),
    outputDirs: [join(root, ".output"), join(root, ".vercel", "output")],
  });
  if (bundles.length === 0) {
    console.log("[pglite] no bundled module found — nothing to copy");
    return;
  }
  for (const bundle of bundles) console.log(`[pglite] copied runtime files next to ${bundle}`);
}

if (isMainModule(import.meta.url)) main();
