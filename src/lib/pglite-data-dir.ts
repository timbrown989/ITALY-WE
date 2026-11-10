/** Where embedded Postgres keeps files. Preview stays in memory. */
export function pgliteDataDir(env: Record<string, string | undefined>): string | undefined {
  const configured = env.PGLITE_DATA_DIR?.trim();
  if (configured) return configured;
  if (env.RENDER === "true") return "data/pglite";
  return undefined;
}
