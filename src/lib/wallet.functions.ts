import { createServerFn } from "@tanstack/react-start";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { formatWei, normalizeAddress } from "@/lib/wallet-address";

const scryptAsync = promisify(scrypt);
const PIN = /^\d{4}$/;

function pin(input: unknown): string {
  const value = typeof input === "string" ? input.trim() : "";
  if (!PIN.test(value)) throw new Error("Enter a 4-digit PIN.");
  return value;
}

async function hashPin(value: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(value, salt, 32)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

async function pinMatches(value: string, stored: string | null): Promise<boolean> {
  if (!stored) return false;
  const [salt, hex] = stored.split(":");
  if (!salt || !hex) return false;
  const hash = (await scryptAsync(value, salt, 32)) as Buffer;
  const expected = Buffer.from(hex, "hex");
  return expected.length === hash.length && timingSafeEqual(expected, hash);
}

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
    const rows = await sql<{ pin_hash: string | null }>`
      select pin_hash from member_wallets where user_id = ${context.userId} limit 1
    `;
    return {
      pinSet: Boolean(rows[0]?.pin_hash),
      unlocked: false,
      address: null,
      balanceEth: null,
      balanceRead: false,
      holdsFunds: false,
      aiConnected: Boolean(process.env.ITALY_WE_AI_API_KEY?.trim()),
      infuraConnected: Boolean(process.env.INFURA_API_KEY?.trim()),
    };
  });

export const setWalletPin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { pin?: string }) => ({ pin: pin(input?.pin) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await sql`select user_id from profiles where user_id = ${context.userId} limit 1`;
    if (!profile[0]) throw new Error("Save your profile before setting a PIN.");
    const hash = await hashPin(data.pin);
    await sql`
      insert into member_wallets (user_id, address, pin_hash, pin_set_at)
      values (${context.userId}, null, ${hash}, now())
      on conflict (user_id) do update set pin_hash = excluded.pin_hash, pin_set_at = now()
    `;
    return { pinSet: true };
  });

export const unlockWallet = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { pin?: string }) => ({ pin: pin(input?.pin) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ address: string; pin_hash: string | null }>`
      select address, pin_hash from member_wallets where user_id = ${context.userId} limit 1
    `;
    const row = rows[0];
    if (!row?.pin_hash) throw new Error("Set a 4-digit PIN first.");
    if (!(await pinMatches(data.pin, row.pin_hash))) throw new Error("PIN did not match.");
    const address = row.address || null;
    const balanceEth = address ? await readBalance(address) : null;
    return {
      pinSet: true,
      unlocked: true,
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
  .validator((input: { address?: string; pin?: string }) => ({
    address: normalizeAddress(input?.address),
    pin: pin(input?.pin),
  }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ pin_hash: string | null }>`
      select pin_hash from member_wallets where user_id = ${context.userId} limit 1
    `;
    if (!rows[0]?.pin_hash || !(await pinMatches(data.pin, rows[0].pin_hash))) {
      throw new Error("Enter the correct PIN before saving an address.");
    }
    const taken = await sql`
      select user_id from member_wallets where address = ${data.address} and user_id <> ${context.userId} limit 1
    `;
    if (taken[0]) throw new Error("That public address is already saved by another member.");
    await sql`
      update member_wallets set address = ${data.address}, updated_at = now() where user_id = ${context.userId}
    `;
    return { address: data.address };
  });

export const clearWalletAddress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { pin?: string }) => ({ pin: pin(input?.pin) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<{ pin_hash: string | null }>`
      select pin_hash from member_wallets where user_id = ${context.userId} limit 1
    `;
    if (!rows[0]?.pin_hash || !(await pinMatches(data.pin, rows[0].pin_hash))) {
      throw new Error("Enter the correct PIN before removing the address.");
    }
    await sql`update member_wallets set address = null, updated_at = now() where user_id = ${context.userId}`;
    return { cleared: true };
  });

export const askWallet = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { question?: string; pin?: string }) => {
    const question = typeof input?.question === "string" ? input.question.trim().slice(0, 500) : "";
    if (!question) throw new Error("Ask a question.");
    return { question, pin: pin(input?.pin) };
  })
  .handler(async ({ context, data }) => {
    const key = process.env.ITALY_WE_AI_API_KEY?.trim();
    if (!key) throw new Error("AI is not connected on this server.");
    const sql = await getSql();
    const rows = await sql<{ address: string; pin_hash: string | null }>`
      select address, pin_hash from member_wallets where user_id = ${context.userId} limit 1
    `;
    if (!rows[0]?.pin_hash || !(await pinMatches(data.pin, rows[0].pin_hash))) {
      throw new Error("Enter the correct PIN before asking.");
    }
    const address = rows[0].address || null;
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
