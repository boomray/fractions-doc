/**
 * Every number the product uses, in one place. The contracts in `contracts/`
 * agree with this file (see `test/EconomicsParity.t.sol`); the mock API reads
 * it directly.
 *
 * Basis points throughout: 10_000 bps = 100%.
 */

/** Every index mints exactly this many tokens, once, into its vault. */
export const INDEX_SUPPLY = 1_000_000_000n * 10n ** 18n;
export const INDEX_DECIMALS = 18;

/**
 * The price of one index token on day one, in wei. The creator's deposit buys
 * the basket, and the vault releases `seed ÷ LAUNCH_PRICE` index tokens to the
 * creator. After that the price is simply `basket value ÷ tokens in
 * circulation`: it moves when the basket moves, and only then. Buys and sells
 * never move it, because each buy adds the same share of basket and tokens.
 *
 * 0.000001 ETH per token means the whole 1B supply covers 1,000 ETH of
 * inflow at launch price, more as the basket appreciates. If the vault ever
 * runs out of tokens, buys revert until someone sells.
 */
export const LAUNCH_PRICE_WEI = 10n ** 12n;

/** Basket shape. */
export const MIN_TOKENS = 2;
export const MAX_TOKENS = 20;
/** No single token may hold more than half the basket. */
export const MAX_WEIGHT_BPS = 5_000;
export const TOTAL_WEIGHT_BPS = 10_000;

/**
 * Buys. The creator earns on volume, the protocol takes a cut (paid to
 * $FRACTIONS stakers), and a slice buys $FRACTIONS off the market and burns it.
 */
export const BUY_FEE_BPS = 200;
export const BUY_FEE_SPLIT = {
  creatorBps: 100,
  protocolBps: 50,
  buybackBps: 50,
} as const;

/** Sells are cheaper; the creator still earns. */
export const SELL_FEE_BPS = 100;
export const SELL_FEE_SPLIT = {
  creatorBps: 50,
  protocolBps: 25,
  buybackBps: 25,
} as const;

/** Creating an index needs real money behind it. */
export const CREATE_MIN_DEPOSIT_WEI = 3n * 10n ** 15n; // 0.003 ETH
/** Share of the creation deposit that buys $FRACTIONS (and burns it). */
export const CREATE_PROTOCOL_BPS = 1_000;

/**
 * $FRACTIONS, the protocol token. Fixed supply, no minting, ever. Supply only
 * goes down, because the buyback burns what it buys.
 */
export const FRACTIONS_SUPPLY = 1_000_000_000n * 10n ** 18n;
export const FRACTIONS_DECIMALS = 18;

/** Packs: pay a fixed price, receive a random index position. Not live yet. */
export const PACK_PROTOCOL_BPS = 500;
export const PACK_TIERS = [
  { id: "starter", name: "Starter", priceWei: 1n * 10n ** 16n, positions: 1 },
  { id: "trio", name: "Trio", priceWei: 25n * 10n ** 15n, positions: 3 },
  { id: "vault", name: "Vault", priceWei: 8n * 10n ** 16n, positions: 10 },
] as const;
export type PackTierId = (typeof PACK_TIERS)[number]["id"];

/** Risk score bands, 0 (safest) to 100. */
export const RISK_BANDS = [
  { max: 25, label: "Low", tone: "positive" },
  { max: 50, label: "Moderate", tone: "warning" },
  { max: 75, label: "High", tone: "burn" },
  { max: 100, label: "Very high", tone: "negative" },
] as const;

/** Price of one index token, in wei, from what backs it and what is out. */
export function indexPriceWei(navWei: bigint, circulatingWei: bigint): bigint {
  if (circulatingWei <= 0n) return LAUNCH_PRICE_WEI;
  return (navWei * 10n ** 18n) / circulatingWei;
}

/** Index tokens released for `netWei` of basket bought at the current state. */
export function indexTokensOut(netWei: bigint, navWei: bigint, circulatingWei: bigint): bigint {
  if (circulatingWei <= 0n || navWei <= 0n) return (netWei * 10n ** 18n) / LAUNCH_PRICE_WEI;
  return (netWei * circulatingWei) / navWei;
}
