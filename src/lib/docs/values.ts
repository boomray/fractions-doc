import {
  BUY_FEE_BPS,
  BUY_FEE_SPLIT,
  CREATE_MIN_DEPOSIT_WEI,
  CREATE_PROTOCOL_BPS,
  FRACTIONS_SUPPLY,
  INDEX_SUPPLY,
  LAUNCH_PRICE_WEI,
  MAX_TOKENS,
  MAX_WEIGHT_BPS,
  MIN_TOKENS,
  PACK_PROTOCOL_BPS,
  RISK_BANDS,
  SELL_FEE_BPS,
  SELL_FEE_SPLIT,
  TOTAL_WEIGHT_BPS,
} from "@/lib/economics";
import { abbreviate, formatBps, formatEth, formatUnitsExact } from "@/lib/format";
import { RISK_FACTORS } from "@/lib/risk-factors";
import { robinhoodMainnet } from "@/lib/chains";
import { IMAGE_MAX_BYTES, SIGNING_WINDOW_MS } from "@/lib/signing";
import { DEPLOYMENTS, type Deployment } from "@/lib/addresses";
import { APP_URL } from "@/lib/site";

/**
 * The values a docs page may quote. Nothing numeric is typed into the
 * markdown; a page writes `{{ECON.BUY_FEE}}` and gets whatever
 * `lib/economics.ts` says today, so the docs cannot drift from the product.
 *
 * Four namespaces:
 *   ECON  — economics, formatted for a sentence ("2%", "0.003 ETH", "1B")
 *   CHAIN — the chain facts (id, RPC, explorer, the exchange's addresses)
 *   APP   — where the app lives, so a page can link to it
 *   BLOCK — whole HTML blocks built from code (tables that must never drift)
 *
 * The economics, chain, risk and signing files under `src/lib/` are copies of
 * the app's; when a number changes there, copy the file over and the docs
 * follow.
 */

const pct = (bps: number) => formatBps(BigInt(bps));
const indexSupply = abbreviate(INDEX_SUPPLY / 10n ** 18n);
const fractionsSupply = abbreviate(FRACTIONS_SUPPLY / 10n ** 18n);

export const ECON: Record<string, string> = {
  BUY_FEE: pct(BUY_FEE_BPS),
  BUY_FEE_CREATOR: pct(BUY_FEE_SPLIT.creatorBps),
  BUY_FEE_PROTOCOL: pct(BUY_FEE_SPLIT.protocolBps),
  BUY_FEE_BUYBACK: pct(BUY_FEE_SPLIT.buybackBps),
  BUY_NET: pct(TOTAL_WEIGHT_BPS - BUY_FEE_BPS),
  SELL_FEE: pct(SELL_FEE_BPS),
  SELL_FEE_CREATOR: pct(SELL_FEE_SPLIT.creatorBps),
  SELL_FEE_PROTOCOL: pct(SELL_FEE_SPLIT.protocolBps),
  SELL_FEE_BUYBACK: pct(SELL_FEE_SPLIT.buybackBps),
  SELL_NET: pct(TOTAL_WEIGHT_BPS - SELL_FEE_BPS),
  CREATE_MIN_DEPOSIT: `${formatEth(CREATE_MIN_DEPOSIT_WEI, { minDecimals: 2 })} ETH`,
  CREATE_PROTOCOL: pct(CREATE_PROTOCOL_BPS),
  CREATE_BASKET: pct(TOTAL_WEIGHT_BPS - CREATE_PROTOCOL_BPS),
  INDEX_SUPPLY: indexSupply.short,
  INDEX_SUPPLY_FULL: indexSupply.full,
  LAUNCH_PRICE: `${formatUnitsExact(LAUNCH_PRICE_WEI, 18)} ETH`,
  LAUNCH_CAPACITY: `${formatEth(LAUNCH_PRICE_WEI * (INDEX_SUPPLY / 10n ** 18n), { decimals: 0 })} ETH`,
  MIN_TOKENS: String(MIN_TOKENS),
  MAX_TOKENS: String(MAX_TOKENS),
  MAX_WEIGHT: pct(MAX_WEIGHT_BPS),
  FRACTIONS_SUPPLY: fractionsSupply.short,
  FRACTIONS_SUPPLY_FULL: fractionsSupply.full,
  PACK_PROTOCOL: pct(PACK_PROTOCOL_BPS),
  RISK_MAX: String(RISK_BANDS[RISK_BANDS.length - 1]!.max),
  RISK_FACTOR_COUNT: String(RISK_FACTORS.length),
  SIGNING_WINDOW_MINUTES: String(SIGNING_WINDOW_MS / 60_000),
  IMAGE_MAX_MB: String(IMAGE_MAX_BYTES / (1024 * 1024)),
};

/** The fixed facts of Robinhood Chain and the exchange the vaults trade on. */
export const CHAIN_FACTS = {
  name: robinhoodMainnet.name,
  id: robinhoodMainnet.id,
  rpc: robinhoodMainnet.rpcUrls.default.http[0]!,
  explorer: robinhoodMainnet.blockExplorers.default.url,
  /** Uniswap V2 router. */
  router: "0x89e5db8b5aa49aa85ac63f691524311aeb649eba",
  /** Uniswap V3: the swap router, the pool factory and the quoter. */
  v3Router: "0xcaf681a66d020601342297493863e78c959e5cb2",
  v3Factory: "0x1f7d7550B1b028f7571E69A784071F0205FD2EfA",
  v3Quoter: "0x33e885ed0ec9bf04ecfb19341582aadcb4c8a9e7",
  weth: "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73",
  usdg: "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168",
} as const;

export const CHAIN: Record<string, string> = {
  NAME: CHAIN_FACTS.name,
  ID: String(CHAIN_FACTS.id),
  RPC: CHAIN_FACTS.rpc,
  EXPLORER: CHAIN_FACTS.explorer,
  ROUTER: CHAIN_FACTS.router,
  V3_ROUTER: CHAIN_FACTS.v3Router,
  V3_FACTORY: CHAIN_FACTS.v3Factory,
  V3_QUOTER: CHAIN_FACTS.v3Quoter,
  WETH: CHAIN_FACTS.weth,
  USDG: CHAIN_FACTS.usdg,
};

/** The app. A page writes `[Portfolio]({{APP.URL}}/portfolio)`. */
export const APP: Record<string, string> = {
  URL: APP_URL,
};

// ── HTML blocks ─────────────────────────────────────────────────────────────

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function table(head: string[], rows: string[][], options: { numeric?: number[] } = {}): string {
  const numeric = new Set(options.numeric ?? []);
  const th = head.map((h) => `<th scope="col">${h}</th>`).join("");
  const body = rows
    .map(
      (row) =>
        `<tr>${row.map((cell, i) => `<td${numeric.has(i) ? ' class="num"' : ""}>${cell}</td>`).join("")}</tr>`,
    )
    .join("");
  return `<div class="docs-table"><table><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function explorerLink(address: string, kind: "address" | "token" = "address"): string {
  const href = `${CHAIN_FACTS.explorer}/${kind}/${address}`;
  return `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer" class="num docs-address">${escapeHtml(address)}</a>`;
}

const CONTRACT_ROWS: ReadonlyArray<{ key: keyof Deployment; label: string; what: string }> = [
  { key: "IndexFactory", label: "Index factory", what: "Creates a new vault for every index." },
  { key: "IndexVaultImplementation", label: "Index vault", what: "The code every vault runs: holds the basket, mints and burns index tokens." },
  { key: "FeeSplitter", label: "Fee splitter", what: "Splits every fee between the creator, stakers and the buyback." },
  { key: "BuybackBurner", label: "Buyback and burn", what: "Buys $FRACTIONS with its share of fees and destroys it." },
  { key: "Staking", label: "Staking", what: "Holds staked $FRACTIONS and pays out ETH." },
  { key: "FRACTIONS", label: "$FRACTIONS", what: "The protocol token, launched on PONS." },
  { key: "SwapLib", label: "Swap library", what: "The routine vaults use to trade on the exchange." },
  { key: "governance", label: "Governance", what: "The address that can set the influencer allowlist and protocol settings." },
];

/** One table per deployed chain, or a single row that says so when none. */
function deploymentsBlock(): string {
  const entries = Object.values(DEPLOYMENTS) as Deployment[];
  if (entries.length === 0) {
    return table(
      ["Contract", "Address", "What it does"],
      CONTRACT_ROWS.map((row) => [row.label, '<span class="docs-muted">Not deployed yet</span>', row.what]),
    );
  }
  return entries
    .map((deployment) => {
      const rows = CONTRACT_ROWS.map((row) => {
        const value = deployment[row.key];
        const address = typeof value === "string" && /^0x[0-9a-fA-F]{40}$/.test(value) ? value : null;
        const isZero = address ? /^0x0{40}$/.test(address) : true;
        return [
          row.label,
          address && !isZero ? explorerLink(address) : '<span class="docs-muted">Not deployed yet</span>',
          row.what,
        ];
      });
      const heading =
        entries.length > 1
          ? `<p class="docs-muted">Chain id <span class="num">${deployment.chainId}</span>, from block <span class="num">${deployment.startBlock}</span></p>`
          : "";
      return heading + table(["Contract", "Address", "What it does"], rows);
    })
    .join("");
}

function chainFactsBlock(): string {
  const link = (href: string) =>
    `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(href)}</a>`;
  return table(
    ["Fact", "Value"],
    [
      ["Network", escapeHtml(CHAIN_FACTS.name)],
      ["Chain id", `<span class="num">${CHAIN_FACTS.id}</span>`],
      ["RPC", link(CHAIN_FACTS.rpc)],
      ["Explorer", link(CHAIN_FACTS.explorer)],
      ["Uniswap V2 router", explorerLink(CHAIN_FACTS.router)],
      ["Uniswap V3 swap router (SwapRouter02)", explorerLink(CHAIN_FACTS.v3Router)],
      ["Uniswap V3 factory", explorerLink(CHAIN_FACTS.v3Factory)],
      ["Uniswap V3 quoter (QuoterV2)", explorerLink(CHAIN_FACTS.v3Quoter)],
      ["Wrapped ETH", explorerLink(CHAIN_FACTS.weth, "token")],
      ["USDG", explorerLink(CHAIN_FACTS.usdg, "token")],
    ],
  );
}

function riskFactorsBlock(): string {
  return table(
    ["Factor", "Share of the score", "What a high number means"],
    RISK_FACTORS.map((factor) => [
      escapeHtml(factor.label),
      pct(Math.round(factor.weight * TOTAL_WEIGHT_BPS)),
      escapeHtml(factor.sentence),
    ]),
    { numeric: [1] },
  );
}

function riskBandsBlock(): string {
  return table(
    ["Score", "Band"],
    RISK_BANDS.map((band, i) => [
      `${i === 0 ? 0 : RISK_BANDS[i - 1]!.max + 1}–${band.max}`,
      escapeHtml(band.label),
    ]),
    { numeric: [0] },
  );
}

function feeSplitBlock(): string {
  return table(
    ["Action", "Fee", "Creator", "Stakers", "Buys and burns $FRACTIONS", "Goes into the basket"],
    [
      ["Buy", pct(BUY_FEE_BPS), pct(BUY_FEE_SPLIT.creatorBps), pct(BUY_FEE_SPLIT.protocolBps), pct(BUY_FEE_SPLIT.buybackBps), pct(TOTAL_WEIGHT_BPS - BUY_FEE_BPS)],
      ["Sell", pct(SELL_FEE_BPS), pct(SELL_FEE_SPLIT.creatorBps), pct(SELL_FEE_SPLIT.protocolBps), pct(SELL_FEE_SPLIT.buybackBps), pct(TOTAL_WEIGHT_BPS - SELL_FEE_BPS)],
      ["Create", pct(CREATE_PROTOCOL_BPS), "—", "—", pct(CREATE_PROTOCOL_BPS), pct(TOTAL_WEIGHT_BPS - CREATE_PROTOCOL_BPS)],
    ],
    { numeric: [1, 2, 3, 4, 5] },
  );
}

export const BLOCKS: Record<string, () => string> = {
  deployments: deploymentsBlock,
  "chain-facts": chainFactsBlock,
  "risk-factors": riskFactorsBlock,
  "risk-bands": riskBandsBlock,
  "fee-split": feeSplitBlock,
};

const PLACEHOLDER = /\{\{\s*(ECON|CHAIN|APP|BLOCK)\.([A-Za-z0-9_-]+)\s*\}\}/g;

/**
 * Replace every `{{NAMESPACE.KEY}}` in a markdown source. An unknown key
 * throws, so a typo fails the build instead of shipping a blank.
 */
export function substituteValues(source: string, file: string): string {
  return source.replace(PLACEHOLDER, (_match, namespace: string, key: string) => {
    if (namespace === "BLOCK") {
      const block = BLOCKS[key];
      if (!block) throw new Error(`${file}: unknown block {{BLOCK.${key}}}`);
      // A blank line either side so marked treats it as its own HTML block.
      return `\n\n${block()}\n\n`;
    }
    const registry = namespace === "ECON" ? ECON : namespace === "APP" ? APP : CHAIN;
    const value = registry[key];
    if (value === undefined) throw new Error(`${file}: unknown value {{${namespace}.${key}}}`);
    return value;
  });
}
