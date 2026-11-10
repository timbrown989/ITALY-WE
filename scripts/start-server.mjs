#!/usr/bin/env node
/**
 * Start the Render/node-server build.
 * Refuses to start if the build output is missing.
 * Listens on every interface so Render can reach the process.
 * Uses PORT from the host. Does not run database migrations.
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const entry = join(dirname(fileURLToPath(import.meta.url)), "..", ".output", "server", "index.mjs");
if (!existsSync(entry)) {
  console.error(
    "Missing .output/server/index.mjs. On Render this file is created by npm run build. Locally, run RENDER=true npm run build first.",
  );
  process.exit(1);
}

process.env.HOST ||= "0.0.0.0";
await import(entry);
