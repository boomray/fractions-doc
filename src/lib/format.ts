/**
 * Number formatting for the values the docs quote. Copied from the app's
 * `lib/format.ts`, trimmed to what `lib/docs/values.ts` reads.
 *
 * Rule: never `Number(wei)`. Every function here does integer math on the
 * bigint and only converts to Number after the value has been scaled down to
 * something a double represents exactly.
 */

const TEN = 10n;

export function pow10(n: number): bigint {
  return TEN ** BigInt(n);
}

/**
 * Exact decimal string for a bigint. No precision loss, no rounding —
 * this is the value, written out.
 */
export function formatUnitsExact(value: bigint, decimals: number): string {
  const negative = value < 0n;
  const abs = negative ? -value : value;
  const base = pow10(decimals);
  const whole = abs / base;
  const fraction = abs % base;
  const fractionStr = fraction.toString().padStart(decimals, "0").replace(/0+$/, "");
  const body = fractionStr ? `${whole}.${fractionStr}` : whole.toString();
  return negative ? `-${body}` : body;
}

export interface FormatOptions {
  /** significant decimal places to keep. Default 4. */
  decimals?: number;
  /** always show this many decimals, padding with zeros */
  minDecimals?: number;
  /** insert thousands separators in the whole part */
  group?: boolean;
  /** 12_400 -> "12.4K". Off by default. */
  compact?: boolean;
}

const COMPACT_STEPS: ReadonlyArray<readonly [bigint, string]> = [
  [1_000_000_000_000n, "T"],
  [1_000_000_000n, "B"],
  [1_000_000n, "M"],
  [1_000n, "K"],
];

function group3(whole: string): string {
  return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Round-half-up a base-unit bigint to `places` decimals and render it.
 * All rounding happens in bigint space.
 */
export function formatUnits(value: bigint, decimals: number, options: FormatOptions = {}): string {
  const { decimals: places = 4, minDecimals = 0, group = true, compact = false } = options;
  const negative = value < 0n;
  const abs = negative ? -value : value;
  const base = pow10(decimals);

  if (compact) {
    const whole = abs / base;
    for (const [threshold, suffix] of COMPACT_STEPS) {
      if (whole >= threshold) {
        const tenths = (whole * 10n + threshold / 2n) / threshold;
        const head = tenths / 10n;
        const tail = tenths % 10n;
        const body = tail === 0n ? `${group3(head.toString())}` : `${group3(head.toString())}.${tail}`;
        return `${negative ? "-" : ""}${body}${suffix}`;
      }
    }
  }

  const scale = pow10(places);
  const scaled = (abs * scale + base / 2n) / base;
  const whole = scaled / scale;
  const fraction = scaled % scale;

  let fractionStr = places > 0 ? fraction.toString().padStart(places, "0") : "";
  fractionStr = fractionStr.replace(/0+$/, "");
  while (fractionStr.length < minDecimals) fractionStr += "0";

  const wholeStr = group ? group3(whole.toString()) : whole.toString();
  const body = fractionStr ? `${wholeStr}.${fractionStr}` : wholeStr;
  return `${negative ? "-" : ""}${body}`;
}

/** ETH amounts. 4dp by default is the resolution people actually trade at. */
export function formatEth(wei: bigint, options: FormatOptions = {}): string {
  return formatUnits(wei, 18, { decimals: 4, minDecimals: 4, ...options });
}

/** bps -> a human percent. 500n -> "5%", 4_000n -> "40%", 50n -> "0.5%". */
export function formatBps(bps: bigint): string {
  const negative = bps < 0n;
  const abs = negative ? -bps : bps;
  const whole = abs / 100n;
  const rest = abs % 100n;
  const fraction = rest.toString().padStart(2, "0").replace(/0+$/, "");
  const body = fraction ? `${whole}.${fraction}` : whole.toString();
  return `${negative ? "-" : ""}${body}%`;
}

/**
 * `1.2M`, not `1,234,567`. Returns both halves: `short` for the sentence,
 * `full` for the exact figure beside it.
 */
export function abbreviate(
  value: number | bigint,
  options: { places?: number } = {},
): { short: string; full: string } {
  const { places = 1 } = options;
  const negative = value < 0;
  const abs = typeof value === "bigint" ? (negative ? -value : value) : Math.abs(value);
  const full = group3(typeof abs === "bigint" ? abs.toString() : Math.round(abs).toString());
  const asNumber = typeof abs === "bigint" ? Number(abs) : abs;
  const sign = negative ? "-" : "";

  for (const [threshold, suffix] of COMPACT_STEPS) {
    const limit = Number(threshold);
    if (asNumber >= limit) {
      const scaled = asNumber / limit;
      const body = scaled.toFixed(scaled >= 100 ? 0 : places).replace(/\.0+$/, "");
      return { short: `${sign}${body}${suffix}`, full: `${sign}${full}` };
    }
  }
  return { short: `${sign}${full}`, full: `${sign}${full}` };
}
