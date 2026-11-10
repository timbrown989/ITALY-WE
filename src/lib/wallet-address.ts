const ADDRESS = /^0x[a-fA-F0-9]{40}$/;

/** A public Ethereum address. Rejects anything that is not 40 hex characters. */
export function normalizeAddress(value: unknown): string {
  const address = typeof value === "string" ? value.trim() : "";
  if (!ADDRESS.test(address)) {
    throw new Error(
      "Enter your public Ethereum address. Italy We never accepts a private key or seed phrase.",
    );
  }
  return address.toLowerCase();
}

/** Show wei from eth_getBalance. Returns null when the node did not answer. */
export function formatWei(value: unknown): string | null {
  if (typeof value !== "string" || !/^0x[0-9a-fA-F]+$/.test(value)) return null;
  const wei = BigInt(value);
  const whole = wei / 10n ** 18n;
  const fraction = (wei % 10n ** 18n).toString().padStart(18, "0").slice(0, 6).replace(/0+$/, "");
  return fraction ? `${whole}.${fraction}` : whole.toString();
}
