---
title: How the price works
description: The price of an index is arithmetic, not an opinion. Here is the sum, and why a buy never moves it.
icon: Calculator
order: 3
---

The price of one index token is what the basket is worth, divided by how many index tokens are out in people's wallets.

```
price = what the vault holds, in ETH ÷ index tokens in circulation
```

That is the whole formula. There is no order book, no market maker and no bid-ask spread. The vault knows what it holds; the chain's exchange says what those tokens are worth in ETH; the vault knows how many index tokens it has handed out.

## Day one

Before anyone holds index tokens there is nothing to divide by, so every index starts at the same launch price: {{ECON.LAUNCH_PRICE}} per token. The creator's deposit buys the basket and the vault releases index tokens to the creator at that price. From then on the formula takes over.

## A buy never moves the price

When you buy, two things happen at once, in the same proportion: the vault gets more basket (your ETH buys every token in the index's weights) and the vault hands out more index tokens. What the vault holds and the number of tokens out both grow by the same share, so the division comes out the same. Your buy is priced at the current price, and the price after your buy is the current price.

The same is true in reverse for a sell. The vault sells a slice of the basket and takes back a matching slice of the tokens; the ratio does not change.

:::note
The one thing that does happen when you buy is that the vault goes to the exchange and buys the basket's tokens. A very large buy of a thinly traded token can nudge that token's own price on the exchange. That is the underlying market moving, not the index formula, and it is what the slippage allowance protects against.
:::

## What does move the price

The basket. When the tokens inside it go up, the vault holds the same tokens and they are worth more ETH, so each index token is worth more. When they go down, each index token is worth less. The index moves exactly as its basket moves, weighted by how much of each token the vault holds.

Fees do not touch the price either. The {{ECON.BUY_FEE}} on a buy comes out of your ETH before the rest buys the basket, and the {{ECON.SELL_FEE}} on a sell comes out of the ETH the vault pays you. What the vault holds per index token is unchanged.

## When an index sells out

Each vault has exactly {{ECON.INDEX_SUPPLY}} index tokens and never makes more. At the launch price that is enough to absorb about {{ECON.LAUNCH_CAPACITY}} of buys, and more once the basket has risen, because each token then costs more ETH. If the vault does run out, buys are refused until someone sells and returns tokens to it. The index page shows this state. Nothing else changes: the price still follows the basket, and holders can still sell.

## Reading the chart

The chart on an index page is the formula over time. The percentage beside the price is how much the basket has moved over the period shown. Because buys and sells do not move the price, a busy day of trading and a quiet one look the same on the chart if the basket's tokens did the same thing.
