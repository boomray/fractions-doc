---
title: Fees
description: Buys pay one fee, sells pay a smaller one, and every fee is split three ways. The split is the same for every index.
icon: Percent
order: 5
---

There are three moments money changes hands on fractions.fi, and each carries one fee. Everything else you pay is the network's own transaction fee, which goes to {{CHAIN.NAME}}, not to anyone here.

{{BLOCK.fee-split}}

## Buys

A buy pays {{ECON.BUY_FEE}} of the ETH you send. The other {{ECON.BUY_NET}} buys the basket and backs the index tokens you receive. The fee is split:

- **{{ECON.BUY_FEE_CREATOR}} to the creator** of the index, in ETH. It accrues on the chain and can be claimed any time from [Portfolio]({{APP.URL}}/portfolio). No vesting, no minimum, no expiry.
- **{{ECON.BUY_FEE_PROTOCOL}} to stakers.** People who have locked up $FRACTIONS share this, in ETH, in proportion to how much each has staked. See [The $FRACTIONS token](/protocol/fractions-token).
- **{{ECON.BUY_FEE_BUYBACK}} buys $FRACTIONS and burns it.** A routine buys the protocol's coin on the open market with this slice and destroys what it bought. The supply of $FRACTIONS only ever goes down.

## Sells

A sell pays {{ECON.SELL_FEE}} of the ETH the vault pays you, split the same way in smaller pieces: {{ECON.SELL_FEE_CREATOR}} to the creator, {{ECON.SELL_FEE_PROTOCOL}} to stakers, {{ECON.SELL_FEE_BUYBACK}} to buying and burning $FRACTIONS. You receive the remaining {{ECON.SELL_NET}}.

## Creating

Creating an index needs a deposit of at least {{ECON.CREATE_MIN_DEPOSIT}}. {{ECON.CREATE_BASKET}} of it buys the basket and becomes the creator's first position, bought at the launch price like anyone else's. {{ECON.CREATE_PROTOCOL}} buys $FRACTIONS and burns it, the same way the buyback slice of a trading fee does. Nothing from the creation deposit goes to stakers or to anyone at fractions.fi.

## What creators earn

The creator receives {{ECON.BUY_FEE_CREATOR}} of every buy and {{ECON.SELL_FEE_CREATOR}} of every sell on their index, in ETH, for as long as the index trades. That is the whole creator economy: there are no tokens set aside for the creator, no allocation, and no way to earn from an index other than people trading it.

:::tip
Earnings show on [Portfolio]({{APP.URL}}/portfolio) under the index that produced them. Claiming is one transaction and sends the ETH to the wallet that created the index.
:::

## What fractions.fi keeps

Nothing, directly. The protocol's share of every fee goes to $FRACTIONS stakers, and the buyback slice is spent on the open market and burned. The people running fractions.fi are paid the same way anyone else is: by holding and staking the coin.

## Packs

Packs, a fixed price for a random index position, are shown on the site as a preview. When they go live, {{ECON.PACK_PROTOCOL}} of a pack's price will go to the protocol and the rest will buy positions. Opening a pack today is a simulation and moves no money.
