---
title: Buy and sell
description: How to buy index tokens with ETH and sell them back, and what you are told before you confirm.
icon: ShoppingCart
order: 2
---

Every index page has a panel with two tabs, Buy and Sell. Both work the same way: enter an amount, read the quote, confirm in your wallet.

## Buying

1. **Connect a wallet** on {{CHAIN.NAME}}. The button at the top right does this; the app offers to add the network if your wallet does not know it.

2. **Open an index** from the home page, or from a link someone shared.

3. **Enter an amount of ETH.** The quick-pick buttons fill in a share of your balance.

4. **Read the quote.** It shows how many index tokens you will receive, the price per token, and the fee. The fee on a buy is {{ECON.BUY_FEE}}; the other {{ECON.BUY_NET}} buys the basket. The quote is exact at the moment it is shown and can move slightly if the basket's tokens move before your transaction lands.

5. **Confirm.** The vault takes your ETH, buys each token in the basket in the index's weights, and sends index tokens to your wallet. There is one transaction and one network fee.

## Selling

1. **Open the Sell tab** on the index page, or start from [Portfolio]({{APP.URL}}/portfolio), which lists everything you hold.

2. **Enter how many index tokens to sell.** The quick-picks work on your holding.

3. **Read the quote.** It shows the ETH you will receive after the {{ECON.SELL_FEE}} sell fee.

4. **Confirm.** The vault sells a matching slice of every token in the basket, takes back your index tokens, and sends you the ETH.

## What you are actually buying

Index tokens are a claim on the vault's holdings, not a bet on a number. If you hold a share of the index tokens in circulation, you own that share of every token in the vault. The price you see is that claim, worked out from what the basket is worth today. A buy does not push the price up and a sell does not push it down; see [How the price works](/use-it/how-the-price-works).

:::note Slippage
A small "slippage" allowance is set on every trade. It is the most the quote may worsen between the moment you see it and the moment the trade lands, because the basket's tokens keep trading in the meantime. If the market moves further than that, the transaction is cancelled and nothing is charged except the network fee.
:::

:::warning When the vault is out of tokens
Each vault has a fixed supply of {{ECON.INDEX_SUPPLY}} index tokens. If they have all been bought, new buys are refused until someone sells. This is rare, and the index page says so when it happens.
:::

## Where your tokens are

Index tokens sit in your wallet like any other token. [Portfolio]({{APP.URL}}/portfolio) shows every index you hold, what each position is worth now, and what it has done since you bought. Creators also see their fee earnings there and can claim them.
