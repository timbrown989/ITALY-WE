import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { askWallet, clearWalletAddress, loadWallet, saveWalletAddress } from "@/lib/wallet.functions";

export const Route = createFileRoute("/wallet")({ component: WalletPage });

type Wallet = Awaited<ReturnType<typeof loadWallet>>;

function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function refresh() {
    const next = await loadWallet();
    setWallet(next);
    setAddress(next.address ?? "");
  }

  useEffect(() => {
    void refresh().catch(() => setError("Sign in before opening Wallet."));
  }, []);

  async function save() {
    setBusy(true);
    setError("");
    try {
      await saveWalletAddress({ data: { address } });
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save that address.");
    } finally {
      setBusy(false);
    }
  }

  async function clear() {
    setBusy(true);
    setError("");
    try {
      await clearWalletAddress();
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not remove the address.");
    } finally {
      setBusy(false);
    }
  }

  async function ask() {
    setBusy(true);
    setError("");
    setAnswer("");
    try {
      const result = await askWallet({ data: { question } });
      setAnswer(result.answer);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not ask.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-10 border-b border-line bg-bg/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm text-muted">
            <ArrowLeft size={17} /> Italy We
          </a>
          <h1 className="font-display text-2xl">Wallet</h1>
          <a href="/feed" className="text-xs text-muted underline">
            Feed
          </a>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-4 py-6">
        <section className="rounded-3xl border border-line bg-surface p-5">
          <p className="font-display text-2xl">Your public address</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Italy We does not hold coins, cannot send them, and never asks for a private key or seed phrase.
            The balance is read from Ethereum. If the network does not answer, no number is shown.
          </p>
          <input
            className="field mt-4"
            value={address}
            autoComplete="off"
            spellCheck={false}
            placeholder="0x…"
            onChange={(event) => setAddress(event.target.value)}
          />
          <div className="mt-4 flex gap-3">
            <button className="btn btn-clay" disabled={busy} onClick={() => void save()}>
              {busy ? "Saving…" : "Save address"}
            </button>
            {wallet?.address && (
              <button className="btn btn-line" disabled={busy} onClick={() => void clear()}>
                Remove
              </button>
            )}
          </div>
          {wallet?.address && (
            <p className="mt-4 text-sm">
              {wallet.balanceRead
                ? `${wallet.balanceEth} ETH on Ethereum. This is a read of your own wallet, not a balance held by Italy We.`
                : "The Ethereum network did not answer. No balance is shown."}
            </p>
          )}
          {error && <p className="mt-4 text-sm text-clay">{error}</p>}
        </section>
        <section className="mt-4 rounded-3xl border border-line bg-surface p-5">
          <p className="font-display text-2xl">AI</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {wallet?.aiConnected
              ? "OpenAI is connected. It can only talk about your saved public address. It cannot invent a balance or move coins."
              : "AI is not connected. Italy We will not invent replies, people, or balances."}
          </p>
          {wallet?.aiConnected && (
            <>
              <textarea
                className="field mt-4 min-h-20"
                maxLength={500}
                value={question}
                placeholder="Ask about your address"
                onChange={(event) => setQuestion(event.target.value)}
              />
              <button className="btn btn-clay mt-3" disabled={busy || !question.trim()} onClick={() => void ask()}>
                {busy ? "Asking…" : "Ask"}
              </button>
              {answer && <p className="mt-4 text-sm">{answer}</p>}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
