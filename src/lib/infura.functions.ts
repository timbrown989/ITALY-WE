import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getInfuraHealth } from "@/lib/infura.server";

/** Authenticated server-side connectivity check; the project key is never returned. */
export const checkInfuraConnection = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => getInfuraHealth());
