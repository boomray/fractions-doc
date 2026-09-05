---
title: Security and audits
description: The contracts have not been audited. What has been tested, what the contracts can and cannot do, and how to report a problem.
icon: ShieldCheck
order: 5
---

:::warning
These contracts have not been audited yet. Treat every index as an experiment, and only put in what you can afford to lose.
:::

## What an audit is

An audit is a review of the contract code by an outside firm that looks for ways it could be broken, drained or blocked. It ends in a public report that lists what was found and what was fixed. fractions.fi has not had one yet. The code has been tested by the people who wrote it, which is not the same thing, and this page says plainly what that testing covers.

## What was tested

- **Unit tests.** Every contract has tests that run each function on its own and check what happens at the edges: empty baskets, weights that do not add up, buys larger than the vault can serve, sells of more than a wallet holds.
- **Fork tests.** The tests also run against a copy of {{CHAIN.NAME}} with the real Uniswap V2 and V3 routers on it. They create real baskets, buy into them and sell out of them, with the same pools the live vaults use.
- **Size checks.** Every contract is checked against the chain's 24 KB size limit, so a build that would not deploy fails before it ships.
- **A slippage guard on every swap.** Each swap a vault makes is quoted first and reverts if it would settle more than 3% worse than the quote.
- **A live launch.** The protocol created the first ten indexes itself, each with the minimum deposit of {{ECON.CREATE_MIN_DEPOSIT}}, on the live chain.

## What the contracts can and cannot do

- **No admin can move basket tokens.** A vault's holdings can only leave it through a sell by someone who holds its index tokens. There is no key that can withdraw, transfer or freeze what a vault holds. Governance can do two things: pause the creation of new indexes, and set the route the buyback uses to buy $FRACTIONS. It cannot touch an existing index.
- **The 3% guard.** Because every swap reverts when it settles more than 3% worse than the quote, a pool price that has been pushed around cannot make a vault pay more than that for a basket, and a buy cannot mint more index tokens than that bound allows.
- **The price is a spot price.** The value of a basket, and so the price of an index token, is read from the pools at the moment it is asked for. Within a single block, someone with enough money can move a pool and, with it, the number you see. The price on an index page is there to inform you; it is not a promise of what a sale would bring.

## What to do about it

- Only put in what you can afford to lose. This is new code that holds real money and that no outside firm has reviewed.
- Start small. Buy a little, sell a little, and watch that what happens matches what this site says should happen.
- Check the [risk score](/use-it/risk-score) on an index page, and look at how deep the pools behind its tokens are. A basket built on thin pools is easier to move and harder to sell.

## How to report a problem

If you find a bug, or something that does not behave the way these pages say it should, write to [security@fractions.fi](mailto:security@fractions.fi). For anything that could put funds at risk, use email rather than a public post, so it can be fixed before it is known. For everything else, [@fractionsfi](https://x.com/fractionsfi) on X is read every day.
