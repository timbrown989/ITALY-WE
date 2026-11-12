import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main className="min-h-dvh bg-bg px-6 py-10 text-fg">
      <div className="mx-auto max-w-2xl">
        <p className="font-display text-2xl">Italy We</p>
        <h1 className="mt-6 font-display text-4xl">Terms of service</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Italy We is a social app. You create a profile, write a biography, and choose how others can reach you.
          You must be old enough to use the service in your country.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          You are responsible for what you post and for the accuracy of your profile. Do not post content that
          breaks the law or harms another person.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Italy We does not hold cryptocurrency, does not send or withdraw coins, and never asks for a private key
          or seed phrase. A public address, if you save one, is yours.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Sign-in with a third party such as TikTok is optional. Italy We receives only the profile information
          that the third party shares with your consent.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The service is provided as available. It may change or be interrupted. You can stop using it at any time.
        </p>
        <p className="mt-6 text-sm text-muted">
          <a className="underline" href="/privacy">
            Privacy policy
          </a>
        </p>
      </div>
    </main>
  );
}
