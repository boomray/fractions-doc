// GENERATED FILE — do not edit by hand. Run: node contracts/script/export-abis.mjs

export interface Deployment {
  chainId: number;
  governance: `0x${string}`;
  deployer: `0x${string}`;
  router: `0x${string}`;
  weth: `0x${string}`;
  usdg: `0x${string}`;
  startBlock: number;
  FRACTIONS: `0x${string}`;
  /** true when FRACTIONS is the token launched on PONS (not deployed by this repo). */
  fractionsExternal: boolean;
  Staking: `0x${string}`;
  BuybackBurner: `0x${string}`;
  FeeSplitter: `0x${string}`;
  IndexVaultImplementation: `0x${string}`;
  IndexFactory: `0x${string}`;
  SwapLib: `0x${string}`;
}

/** One entry per chain the contracts are deployed on (from contracts/deployments/<chainId>.json). */
export const DEPLOYMENTS = {

} as const satisfies Record<number, Deployment>;

export type DeployedChainId = keyof typeof DEPLOYMENTS;

/** Addresses for `chainId`, or undefined when the contracts are not deployed there. */
export function addressesFor(chainId: number): Deployment | undefined {
  return (DEPLOYMENTS as Record<number, Deployment | undefined>)[chainId];
}
