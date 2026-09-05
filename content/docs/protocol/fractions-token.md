---
title: The $FRACTIONS token
description: The protocol's own coin. Launched fairly on PONS, bought and burned by every fee, and paying ETH to anyone who stakes it.
icon: Coins
order: 1
---

$FRACTIONS is the coin the protocol runs on. It has a fixed supply of {{ECON.FRACTIONS_SUPPLY}} ({{ECON.FRACTIONS_SUPPLY_FULL}}) and nobody can make more; fractions.fi never mints any. Two things happen to it, and both are driven by people trading indexes.

## How it launched

$FRACTIONS was launched on **PONS**, the launchpad on {{CHAIN.NAME}}, not by fractions.fi itself. A launch there is a fair launch: there is no allocation to the team, no private round and no early price for insiders. Everyone who wanted the coin bought it in the open, at the same rising price, from the launchpad.

When a launch on PONS reaches its target it **graduates**: the launchpad takes the ETH the early buyers paid in, pairs it with the remaining coins, and turns the two into the coin's trading pool on the chain's exchange. That pool is where $FRACTIONS trades from then on, and where the buyback buys it. The pool's liquidity came from the early buyers, which is why nobody can pull it.

## Buy and burn

{{ECON.BUY_FEE_BUYBACK}} of every buy on any index, {{ECON.SELL_FEE_BUYBACK}} of every sell, and {{ECON.CREATE_PROTOCOL}} of every creation deposit is sent to a routine that buys $FRACTIONS from the trading pool and destroys it. That is the protocol's only source of demand for its own coin: trading volume on any index, by anyone, becomes a bid, and every bid removes coins for good.

## Stake and earn ETH

{{ECON.BUY_FEE_PROTOCOL}} of every buy and {{ECON.SELL_FEE_PROTOCOL}} of every sell goes to people who have staked $FRACTIONS. Staking means locking your coins in the staking contract; while they are there you receive a share of that ETH, in proportion to how much you have staked against everyone else. It is paid in ETH, not in more $FRACTIONS, so there is no dilution and nothing to sell to realise it.

1. **Open [Stake]({{APP.URL}}/stake)** with a wallet that holds $FRACTIONS.

2. **Choose an amount and stake it.** One transaction. Your coins move into the staking contract and start earning from the next fee onward.

3. **Claim ETH whenever you like.** The page shows what has accrued to you. Claiming sends it to your wallet.

4. **Unstake any time.** There is no lockup period and no penalty. Your coins come back to your wallet and stop earning.

## In one sentence

The more people trade indexes, the fewer $FRACTIONS exist and the more ETH each staked one earns. There is no other mechanism, and there is no promise about price.

:::note
The addresses of the token, the staking contract and the buyback routine are on the [Contracts and addresses](/protocol/contracts-and-addresses) page once they are deployed.
:::
