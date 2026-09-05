/**
 * Robinhood Chain — the network every index lives on. Copied from the app's
 * `lib/chains.ts`; the docs only quote the facts, so this is a plain object
 * rather than a wallet-library chain definition.
 */
export const robinhoodMainnet = {
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.chain.robinhood.com"],
      webSocket: ["wss://feed.mainnet.chain.robinhood.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://robinhoodchain.blockscout.com",
      apiUrl: "https://robinhoodchain.blockscout.com/api",
    },
  },
  testnet: false,
} as const;
