import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { formatWei, normalizeAddress } from "@/lib/wallet-address";

const READ_URLS = ["https://ethereum.publicnode.com", "https://cloudflare-eth.com"];

async function readBalance(address: string): Promise<string | null> {
  for (const url of READ_URLS) {
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
