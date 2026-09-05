---
title: Overview
description: What fractions.fi is, what you can do here, and where to read next.
icon: Compass
order: 1
---

fractions.fi lets you own a slice of many tokens at once. Someone picks a set of tokens on {{CHAIN.NAME}}, decides how much of each, and puts money behind it. That set becomes a single coin, an **index**. Buy the coin and you own a piece of every token inside it. Sell the coin and you get your share back.

There is no company in the middle. The tokens sit in a vault on the chain, the price is worked out from what the vault holds, and every fee goes to people, not a treasury: the person who made the index, the people who lock up the protocol's own coin, and a routine that buys that coin and destroys it.

## Three things you can do

**Buy an index.** Pick one from the [home page]({{APP.URL}}/), enter an amount of ETH, confirm. You receive index tokens in your wallet. Read [Buy and sell](/use-it/buy-and-sell).

**Build your own.** Choose between {{ECON.MIN_TOKENS}} and {{ECON.MAX_TOKENS}} tokens, set their weights, put at least {{ECON.CREATE_MIN_DEPOSIT}} behind it. From then on you earn {{ECON.BUY_FEE_CREATOR}} of every buy and {{ECON.SELL_FEE_CREATOR}} of every sell, for as long as it trades. Read [Create an index](/use-it/create-an-index).

**Share it.** Every index has a page and a picture card that carries its live price, holders and risk. So does every purchase, and every creator. Read [Share cards](/protocol/share-cards).

:::tip Start from a wallet
You do not have to pick tokens one by one. Paste any {{CHAIN.NAME}} address on the Create page and the app turns what that wallet holds into an index draft, weighted the way the wallet is. See [Start from a wallet](/use-it/create-an-index#start-from-a-wallet).
:::

## How the pieces fit

- An index is a fixed recipe: which tokens, in what proportions. It never changes after it is made. [What is an index](/start/what-is-an-index)
- The price is arithmetic: what the basket is worth, divided by how many index tokens are out. A buy does not move it. [How the price works](/use-it/how-the-price-works)
- Every index carries a score from 0 to {{ECON.RISK_MAX}} that describes the basket, not a prediction. [Risk score](/use-it/risk-score)
- Buys pay {{ECON.BUY_FEE}}, sells pay {{ECON.SELL_FEE}}, and the split is the same for every index. [Fees](/use-it/fees)
- $FRACTIONS is the protocol's coin. Part of every fee buys it and burns it; lock some up and you receive ETH. [The $FRACTIONS token](/protocol/fractions-token)

## Where things live

| Page | What it is for |
| --- | --- |
| [Home]({{APP.URL}}/) | Every index, sortable, with search |
| [Create]({{APP.URL}}/create) | Build an index, or start from a wallet |
| [Portfolio]({{APP.URL}}/portfolio) | What you hold, what you have earned as a creator |
| [Stake]({{APP.URL}}/stake) | Lock up $FRACTIONS and collect ETH |
| `/i/<id>` | One index: chart, buy and sell, holders, share |
| `/u/<handle>` | One creator: their indexes, links, badges |

:::note
Everything here runs on {{CHAIN.NAME}} and is paid for in ETH. You need a wallet that can connect to it; the app offers to add the network the first time you connect. Addresses and chain details are on the [Contracts and addresses](/protocol/contracts-and-addresses) page.
:::
