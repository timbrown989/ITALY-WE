import { env } from "@/lib/env.server";

const NETWORKS = {
  mainnet: { chainId: "0x1", label: "Ethereum Mainnet" },
  sepolia: { chainId: "0xaa36a7", label: "Ethereum Sepolia" },
  "polygon-mainnet": { chainId: "0x89", label: "Polygon" },
  "arbitrum-mainnet": { chainId: "0xa4b1", label: "Arbitrum One" },
  "optimism-mainnet": { chainId: "0xa", label: "Optimism" },
  "base-mainnet": { chainId: "0x2105", label: "Base" },
  "linea-mainnet": { chainId: "0xe708", label: "Linea" },
  "avalanche-mainnet": { chainId: "0xa86a", label: "Avalanche C-Chain" },
} as const;

export type InfuraNetwork = keyof typeof NETWORKS;

function configuration() {
  const apiKey = env("INFURA_API_KEY");
  if (!apiKey) throw new Error("INFURA_API_KEY is not configured on the server.");
  const rawNetwork = env("INFURA_NETWORK") || "mainnet";
  if (!(rawNetwork in NETWORKS)) throw new Error("INFURA_NETWORK is not supported.");
  const network = rawNetwork as InfuraNetwork;
  return { apiKey, network, details: NETWORKS[network] };
}

/** Server-only JSON-RPC call. Never expose the Infura project key to the browser. */
export async function infuraRpc<T = unknown>(method: string, params: unknown[] = []): Promise<T> {
  const { apiKey, network } = configuration();
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(method)) throw new Error("Invalid JSON-RPC method.");
  const response = await fetch(`https://${network}.infura.io/v3/${apiKey}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new Error(`Infura returned HTTP ${response.status}.`);
  const payload = (await response.json()) as {
    result?: T;
    error?: { message?: string; code?: number };
  };
  if (payload.error) throw new Error(payload.error.message || "Infura JSON-RPC request failed.");
  if (!("result" in payload)) throw new Error("Infura returned an invalid JSON-RPC response.");
  return payload.result as T;
}

export async function getInfuraHealth() {
  const { network, details } = configuration();
  const [chainId, blockNumber] = await Promise.all([
    infuraRpc<string>("eth_chainId"),
    infuraRpc<string>("eth_blockNumber"),
  ]);
  if (chainId.toLowerCase() !== details.chainId) {
    throw new Error("Infura returned a chain ID that does not match INFURA_NETWORK.");
  }
  return { connected: true as const, network, label: details.label, chainId, blockNumber };
}
