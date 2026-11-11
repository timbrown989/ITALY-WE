import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth/server";

const TIKTOK_CALLBACK_VERIFY = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="tiktok-developers-site-verification" content="SAfgoxuiulkNcEIt2H00g1tiO0ICcmhp" />
    <title>Italy We</title>
  </head>
  <body></body>
</html>`;

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        if (
          url.pathname.endsWith("/callback/tiktok") &&
          !url.searchParams.has("code") &&
          !url.searchParams.has("state")
        ) {
          return new Response(TIKTOK_CALLBACK_VERIFY, {
            headers: { "content-type": "text/html; charset=utf-8" },
          });
        }
        return auth.handler(request);
      },
      POST: ({ request }) => auth.handler(request),
    },
  },
});