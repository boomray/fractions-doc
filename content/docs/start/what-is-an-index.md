---
title: What is an index
description: A fixed set of tokens sold as one coin, held in a vault nobody can empty.
icon: Layers
order: 2
---

An index is a recipe. It names between {{ECON.MIN_TOKENS}} and {{ECON.MAX_TOKENS}} tokens that trade on {{CHAIN.NAME}} and gives each one a share of the whole, so the shares add up to everything. No single token may be more than {{ECON.MAX_WEIGHT}} of the recipe.

When someone creates an index, their ETH buys those tokens in those proportions and puts them into a **vault**: a small program on the chain that holds the tokens and follows a few fixed rules. Nobody, including the creator and the people who run fractions.fi, can take tokens out of a vault. The only way anything leaves is when someone sells index tokens back to it.

## Index tokens

Each vault creates exactly {{ECON.INDEX_SUPPLY}} index tokens ({{ECON.INDEX_SUPPLY_FULL}}), once, and keeps them. It hands some out whenever someone buys, and takes them back whenever someone sells. Holding index tokens means owning a proportional share of everything in the vault.

- The creator's own deposit buys the first tokens at the launch price, {{ECON.LAUNCH_PRICE}} each.
- Every later buy adds ETH to the vault (which buys more of the basket, in the same proportions) and releases index tokens at the current price.
- Every sell returns index tokens to the vault, which sells a matching slice of the basket and pays out ETH.

## The recipe never changes

The tokens and their weights are fixed when the index is created. A creator who wants a different mix creates a new index; the old one keeps trading as it is. This is deliberate: you can read the recipe once and know what you own for as long as you hold it.

:::note
Weights describe how the basket was bought, not what it is worth today. If one token in the basket rises faster than the others, it becomes a larger part of the basket's value. The index does not rebalance; it simply holds.
:::

## Who can make one

Anyone with a wallet and at least {{ECON.CREATE_MIN_DEPOSIT}}. The creator is not given a stack of tokens to sell: the whole supply starts in the vault, and a creator who wants a position buys it like everyone else, at the same price and the same fee. What the creator gets instead is a share of every trade, forever. See [Fees](/use-it/fees).

## What it is not

- It is not a fund with a manager. Nobody decides anything after creation.
- It is not a promise about price. The index is worth what its tokens are worth, minus nothing.
- It is not a loan or a lockup. You can sell any time the vault has tokens to sell.
