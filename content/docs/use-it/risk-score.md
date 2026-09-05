---
title: Risk score
description: Every index carries a score from 0 to {{ECON.RISK_MAX}} that describes the basket. It is made from {{ECON.RISK_FACTOR_COUNT}} things you can check yourself.
icon: Gauge
order: 4
---

Every index shows a risk score from 0 to {{ECON.RISK_MAX}}, with 0 the calmest. It is not a prediction and it does not know where prices are going. It describes the basket as it is today: how concentrated, how narrow, how thinly traded, how volatile and how new.

## The {{ECON.RISK_FACTOR_COUNT}} factors

Each factor is scored from 0 to {{ECON.RISK_MAX}} on its own. The index's score is their weighted average, with the weights below.

{{BLOCK.risk-factors}}

In words:

- **Concentration.** A basket split evenly across its tokens scores 0 here. One where a single token carries most of the weight scores high, because that one token decides what happens.
- **Breadth.** More tokens means one bad day for one of them matters less. A dozen or more scores 0; a pair scores high.
- **Liquidity.** How easily the basket's tokens can be bought and sold on the exchange without moving their price. Deep markets score low; thin ones score high. This also affects how closely a large buy or sell matches its quote.
- **Volatility.** How much the basket's tokens have been swinging lately, weighted by their share. Stable-value tokens score near 0; the wildest tokens score near the top.
- **Age.** How long the tokens have been trading on {{CHAIN.NAME}}. A year scores 0; a launch this month scores high, because there is less history to go on.

## The bands

The score is shown as a number and a word.

{{BLOCK.risk-bands}}

:::note A low score is a calmer basket, not a safer bet
A basket of large, old, deep, evenly weighted tokens scores low. It can still fall. A high score means the basket is more likely to move a lot and be harder to trade in size; it does not mean it will go down, and it does not mean it will go up.
:::

## Where it comes from

The score is worked out from the basket's recipe and from public facts about each token: its market depth, its recent price history and when it first traded. The Create page shows the score live as you adjust weights, so you can see what pulls it up or down before you commit. The index page and every share card show the current score and its band.
