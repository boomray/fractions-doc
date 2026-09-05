---
title: Create an index
description: Pick tokens, set weights, put ETH behind it. Or paste a wallet address and start from what it holds.
icon: Sparkles
order: 1
---

Creating an index takes a few minutes and one transaction. You need a wallet connected to {{CHAIN.NAME}} with at least {{ECON.CREATE_MIN_DEPOSIT}} in it, plus a little extra for the network fee.

## Step by step

1. **Open [Create]({{APP.URL}}/create).** You can start with an empty basket or, further down this page, from a wallet address.

2. **Choose the tokens.** Search by name or ticker. Only tokens with a Uniswap V2 or V3 pool with WETH or USDG can go in, because the vault has to be able to buy and sell them. Pick between {{ECON.MIN_TOKENS}} and {{ECON.MAX_TOKENS}}.

3. **Set the weights.** Each token gets a share of the whole; the shares must add up to everything, and none may be above {{ECON.MAX_WEIGHT}}. The page shows a live preview of the basket and its risk score as you adjust. See [Risk score](/use-it/risk-score) for what the number means.

4. **Name and describe it.** A name, a ticker, and a sentence or two about the idea. You can add a picture; square works best. All of this can be edited later from the index page, by signing a message with the same wallet.

5. **Put ETH behind it.** At least {{ECON.CREATE_MIN_DEPOSIT}}. {{ECON.CREATE_BASKET}} of the deposit buys the basket in your weights and becomes the vault's first holdings; {{ECON.CREATE_PROTOCOL}} buys $FRACTIONS and burns it. The deposit is not refundable as a deposit: it is your first position, bought at the launch price of {{ECON.LAUNCH_PRICE}} per index token, and you can sell it like any other position.

6. **Review and confirm.** The review step lists every token, every weight, the deposit and what it buys. Confirm in your wallet. When the transaction lands, the index has a page at `/i/<id>`, a share card, and is listed on the home page.

:::warning
Check the weights before you confirm. They cannot be changed afterwards; the only way to a different mix is a new index.
:::

## Start from a wallet

Any {{CHAIN.NAME}} address can become an index draft: yours, a friend's, or one you admire. The app reads what that wallet holds and turns it into a basket.

1. **Paste an address** into the "Start from a wallet" box on the Create page, or open the link `/create?wallet=0x…` with the address filled in.

2. **The app keeps the eligible tokens.** Tokens without a Uniswap V2 or V3 pool with WETH or USDG are left out, and so are holdings too small to price. What remains is weighted by value, the way the wallet is, with no token above {{ECON.MAX_WEIGHT}}; anything over the cap is spread across the rest in proportion. At most {{ECON.MAX_TOKENS}} tokens make it in.

3. **A name is suggested.** The draft is called "`<short address>` mirror", with the address shortened to its first and last characters. Rename it after whoever the wallet belongs to, or whatever the idea is.

4. **Adjust, then continue** as above: describe it, put ETH behind it, review, confirm. The weights are a starting point; you can change any of them before you confirm.

The finished index page notes that it **mirrors wallet 0x…**, so buyers know where the recipe came from. It is still a fixed recipe: if the wallet later changes what it holds, the index does not follow.

:::note
A wallet needs at least {{ECON.MIN_TOKENS}} eligible, priced tokens to become an index. If it holds only one, or only tokens with no market, the page says so and you can pick tokens by hand instead.
:::

## After it is live

- Your index page is `/i/<id>`. It has the chart, the buy and sell panel, the holders list and the share panel.
- You earn {{ECON.BUY_FEE_CREATOR}} of every buy and {{ECON.SELL_FEE_CREATOR}} of every sell, in ETH, claimable any time from [Portfolio]({{APP.URL}}/portfolio). See [Fees](/use-it/fees).
- Your creator page at `/u/<handle>` lists every index you have made. See [Creator profiles and badges](/protocol/creator-profiles-and-badges).
