# Telegram and Infura integration

## Telegram OpenID Connect

Sign-in uses the `better-auth-telegram` plugin in OIDC mode (`provider` `telegram-oidc`) on the
same Better Auth instance as the website. A completed callback sets the existing session cookie.
The same Telegram subject (`sub`) is stored as the `telegram-oidc` account id, so a second login
does not create another user.

BotFather must store these strings with no trailing slash and no doubled slash:

- Redirect URI: `https://italywe.online/api/auth/callback/telegram-oidc`
- Redirect URI if www is kept: `https://www.italywe.online/api/auth/callback/telegram-oidc`
- Trusted origin: `https://italywe.online`
- Trusted origin if www is kept: `https://www.italywe.online`

Runtime secrets (already expected on the host, not in the repo): `TELEGRAM_CLIENT_ID`,
`TELEGRAM_CLIENT_SECRET`. `TELEGRAM_OIDC_CLIENT_ID` and `TELEGRAM_OIDC_CLIENT_SECRET` are accepted
as aliases. The bot token is not the OIDC client secret.

Privacy policy for BotFather: `https://italywe.online/privacy`

## Telegram Mini App

The Telegram bot adds an **Open Italy We** Web App button to its inline keyboards and chat menu.
Set the GitHub Actions repository variable `ITALY_WE_APP_URL` to the canonical HTTPS deployment URL
(the default is `https://italywe.online`). In BotFather, configure the Mini App domain for the same
host. The bot token remains in the `TELEGRAM_BOT_TOKEN` Actions secret.

The bot currently runs its long-polling worker through the scheduled GitHub Actions workflow.
Run the **Italy We Telegram** workflow manually after changing the variable to apply the menu button
immediately; otherwise the next scheduled run applies it.

## Infura

Add the Infura project key as a GitHub Actions/repository deployment secret named
`INFURA_API_KEY`. Optionally set `INFURA_NETWORK` to one of:
`mainnet` (default), `sepolia`, `polygon-mainnet`, `arbitrum-mainnet`,
`optimism-mainnet`, `base-mainnet`, `linea-mainnet`, or `avalanche-mainnet`.

The server-only helper in `src/lib/infura.server.ts` performs JSON-RPC calls without exposing
the key to browser code. The authenticated `checkInfuraConnection` server function verifies
the configured chain and returns the current block number. Do not place the project key in
client-side variables prefixed with `VITE_`.
