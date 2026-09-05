---
title: Contracts and addresses
description: The chain, the exchange the vaults trade on, and where each protocol contract lives.
icon: FileCode2
order: 4
---

Everything on fractions.fi runs on {{CHAIN.NAME}}, and every action you take is a transaction you can look up on the chain's explorer.

## The chain

{{BLOCK.chain-facts}}

Add the network to a wallet with the chain id and RPC above; the app also offers to add it the first time you connect. Vaults buy and sell through the exchange router listed, which is where the basket's tokens trade. Wrapped ETH is the form of ETH the exchange understands, and USDG is the dollar-pegged token used to price things in dollars.

## The protocol's contracts

The list below is filled in from the deployment record in this codebase. Where a contract has not been deployed yet, it says so.

{{BLOCK.deployments}}

Each index also has its own vault, created by the index factory at the moment the index is made. A vault's address is on its index page, `/i/<id>`, with a link to the explorer.

## Checking for yourself

- Open any address above on the explorer to see its code, its balance and every transaction it has been part of.
- An index vault's page on the explorer shows the exact tokens it holds. Those holdings, divided by the index tokens in circulation, are the price. See [How the price works](/use-it/how-the-price-works).
- The fee splitter's page shows every fee ever paid and where it went. See [Fees](/use-it/fees).

:::note
Contract addresses never change once deployed. If a page anywhere asks you to send funds to a different address for fractions.fi, it is not fractions.fi.
:::
