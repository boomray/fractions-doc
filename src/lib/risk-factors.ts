/**
 * The five risk factors, in the order the score weighs them, with the one
 * sentence each is allowed on a page. Copied from the app's
 * `lib/risk-factors.ts` (with the weights from `lib/risk.ts` inlined) so the
 * docs table reads the same numbers the product does.
 */
export const RISK_FACTOR_WEIGHTS = {
  concentration: 0.2,
  breadth: 0.15,
  liquidity: 0.3,
  volatility: 0.25,
  age: 0.1,
} as const;

export type RiskFactorKey = keyof typeof RISK_FACTOR_WEIGHTS;

export interface RiskFactor {
  key: RiskFactorKey;
  label: string;
  /** what a high number means, in words a reader can check */
  sentence: string;
  weight: number;
}

export const RISK_FACTORS: readonly RiskFactor[] = [
  {
    key: "concentration",
    label: "Concentration",
    sentence: "How much of the basket sits in its biggest positions; equal weights score zero, one dominant token scores high.",
    weight: RISK_FACTOR_WEIGHTS.concentration,
  },
  {
    key: "breadth",
    label: "Breadth",
    sentence: "How few tokens there are; a dozen or more scores zero, a pair scores high.",
    weight: RISK_FACTOR_WEIGHTS.breadth,
  },
  {
    key: "liquidity",
    label: "Liquidity",
    sentence: "How thin the weighted pool depth is; deep pools score low, thin ones score high.",
    weight: RISK_FACTOR_WEIGHTS.liquidity,
  },
  {
    key: "volatility",
    label: "Volatility",
    sentence: "The weighted 30-day volatility of the tokens; stablecoins score near zero, memecoins near the top.",
    weight: RISK_FACTOR_WEIGHTS.volatility,
  },
  {
    key: "age",
    label: "Age",
    sentence: "How new the tokens are on Robinhood Chain; a year of trading scores zero, a launch this month scores high.",
    weight: RISK_FACTOR_WEIGHTS.age,
  },
];
