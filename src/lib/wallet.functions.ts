import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { formatWei, normalizeAddress } from "@/lib/wallet-address";

function balanceUrls(): string[] {
  const key = process.env.INFURA_API_KEY?.trim();
  const urls = [];
  if (key) urls.push(`https://mainnet.infura.io/v3/${key}`);
  urls.push("https://ethereum.publicnode.com", "https://cloudflare-eth.com");
  return urls;
}

async function readBalance(address: string): Promise<string | null> {
  for (const url of balanceUrls()) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [address, "latest"],
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) continue;
      const body = (await response.json()) as { result?: unknown };
      const formatted = formatWei(body.result);
      if (formatted !== null) return formatted;
    } catch {
      continue;
    }
  }
  return null;
}

export const loadWallet = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ address: string }>`
      select address from member_wallets where user_id = ${context.userId} limit 1
    `;
    const address = rows[0]?.address ?? null;
    const balanceEth = address ? await readBalance(address) : null;
    return {
      address,
      balanceEth,
      balanceRead: address !== null && balanceEth !== null,
      holdsFunds: false,
      aiConnected: Boolean(process.env.ITALY_WE_AI_API_KEY?.trim()),
      infuraConnected: Boolean(process.env.INFURA_API_KEY?.trim()),
    };
  });

export const saveWalletAddress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { address?: string }) => ({ address: normalizeAddress(input?.address) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await sql`select user_id from profiles where user_id = ${context.userId} limit 1`;
    if (!profile[0]) throw new Error("Save your profile before adding an address.");
    const taken = await sql`
      select user_id from member_wallets where address = ${data.address} and user_id <> ${context.userId} limit 1
    `;
    if (taken[0]) throw new Error("That public address is already saved by another member.");
    await sql`
      insert into member_wallets (user_id, address)
      values (${context.userId}, ${data.address})
      on conflict (user_id) do update set address = excluded.address, updated_at = now()
    `;
    return { address: data.address };
  });

export const clearWalletAddress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql`delete from member_wallets where user_id = ${context.userId}`;
    return { cleared: true };
  });

export const askWallet = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { question?: string }) => {
    const question = typeof input?.question === "string" ? input.question.trim().slice(0, 500) : "";
    if (!question) throw new Error("Ask a question.");
    return { question };
  })
  .handler(async ({ context, data }) => {
    const key = process.env.ITALY_WE_AI_API_KEY?.trim();
    if (!key) throw new Error("AI is not connected on this server.");
    const sql = await getSql();
    const rows = await sql<{ address: string }>`
      select address from member_wallets where user_id = ${context.userId} limit 1
    `;
    const address = rows[0]?.address ?? null;
    const balance = address ? await readBalance(address) : null;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Italy We. You do not hold coins, invent balances, or ask for private keys. Answer briefly about the member's own public address only. If no address is saved, say so.",
          },
          {
            role: "user",
            content: `Address: ${address || "none"}. Balance: ${balance ?? "not read"}. Question: ${data.question}`,
          },
        ],
        max_tokens: 200,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("OpenAI did not answer. No reply is invented.");
    const body = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const answer = body.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error("OpenAI returned an empty reply.");
    return { answer };
  });
