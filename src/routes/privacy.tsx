import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

const REQUEST_URL = "https://t.me/otnakedffh_bot";

function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-bg px-6 py-10 text-fg">
      <article className="mx-auto max-w-2xl">
        <p className="text-sm tracking-wide text-muted">Italy We</p>
        <h1 className="mt-3 font-display text-5xl leading-tight">Privacy policy</h1>
        <p className="mt-4 text-sm text-muted">Last updated 9 November 2026.</p>
        <p className="mt-8 leading-relaxed text-muted">
          Italy We stores more than a standard bot notice covers. This page is the policy for
          the website and the Telegram Mini App at italywe.online.
        </p>

        <h2 className="mt-10 font-display text-3xl">What we store</h2>
        <ol className="mt-4 list-decimal space-y-4 pl-5 leading-relaxed text-muted">
          <li>
            <span className="text-fg">Better Auth user records.</span> Signing in creates an
            account and a session on this site. The session is the same Better Auth session the
            website already uses.
          </li>
          <li>
            <span className="text-fg">Profile fields you enter.</span> Name, age, city,
            biography, and contact (phone, email, Telegram handle, and any other contact you
            type). Contact stays hidden until both people agree to meet.
          </li>
          <li>
            <span className="text-fg">Optional location for nearby matching.</span> Nearby uses
            the city on your profile. It is optional: turn Nearby off and the deck is not limited
            to that city. We do not collect a device GPS coordinate.
          </li>
          <li>
            <span className="text-fg">Telegram account linking.</span> If you sign in with
            Telegram, we store the verified Telegram user ID from Telegram's OpenID Connect
            login, with the name, username, and photo Telegram sends. That ID is how a later
            Telegram sign-in finds the same account instead of creating another one.
          </li>
        </ol>

        <h2 className="mt-10 font-display text-3xl">Data requests</h2>
        <p className="mt-4 leading-relaxed text-muted">
          To access, correct, or delete this data, message the Italy We bot and say it is a
          privacy request. Include the name on your profile so the account can be found.
        </p>
        <p className="mt-4">
          <a className="btn btn-clay" href={REQUEST_URL}>
            Message @otnakedffh_bot
          </a>
        </p>
        <p className="mt-3 text-sm text-muted">
          <a className="underline" href={REQUEST_URL}>
            {REQUEST_URL}
          </a>
        </p>

        <p className="mt-12 text-sm">
          <Link to="/" className="text-muted underline">
            Back to Italy We
          </Link>
        </p>
      </article>
    </main>
  );
}
