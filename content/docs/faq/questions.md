---
title: Questions
description: Short answers to the things people ask most.
icon: CircleHelp
order: 1
---

## About indexes

### Can a creator change the weights later?

No. The recipe is fixed when the index is created. If a creator wants a different mix, they create a new index; the old one keeps trading as it is. See [What is an index](/start/what-is-an-index).

### Does an index rebalance?

No. It holds what it bought. If one token rises faster than the others it becomes a larger share of the basket's value, and that is what you own.

### Can an index sell out?

Yes, in theory. Each index has {{ECON.INDEX_SUPPLY}} tokens and hands them out at {{ECON.LAUNCH_PRICE}} each on day one, so the vault can absorb about {{ECON.LAUNCH_CAPACITY}} of buys before it runs out, more once the basket has gone up. If it does, buys pause until someone sells and returns tokens to the vault. See [How the price works](/use-it/how-the-price-works).

### Can I always sell?

Yes, as long as the basket's tokens can be sold on the exchange, which is a condition of being in an index in the first place. Selling a very large position in an index built from thinly traded tokens can get a worse price than the quote suggests; the risk score's liquidity factor warns about this.

## About money

### Where does my ETH go when I buy?

{{ECON.BUY_NET}} of it buys the basket's tokens into the vault, which is what backs the index tokens you receive. The remaining {{ECON.BUY_FEE}} is the fee, split {{ECON.BUY_FEE_CREATOR}} to the creator, {{ECON.BUY_FEE_PROTOCOL}} to stakers and {{ECON.BUY_FEE_BUYBACK}} to buying and burning $FRACTIONS. See [Fees](/use-it/fees).

### Does buying push the price up?

No. A buy adds basket and index tokens in the same proportion, so the price after your buy is the price before it. Only the basket's own tokens moving changes the price. See [How the price works](/use-it/how-the-price-works).

### How do creators get paid?

In ETH, from {{ECON.BUY_FEE_CREATOR}} of every buy and {{ECON.SELL_FEE_CREATOR}} of every sell on their index, claimable any time from [Portfolio]({{APP.URL}}/portfolio). There is no other creator income and no token allocation.

### What is the minimum to create an index?

{{ECON.CREATE_MIN_DEPOSIT}}. {{ECON.CREATE_BASKET}} of it buys the basket as your first position; {{ECON.CREATE_PROTOCOL}} buys and burns $FRACTIONS.

## About the risk score

### Is the risk score a prediction?

No. It describes the basket as it is: how concentrated, how narrow, how thinly traded, how volatile and how new. A low score is a calmer basket, not a safer bet. See [Risk score](/use-it/risk-score).

## About $FRACTIONS

### What is $FRACTIONS for?

It is the protocol's own coin, launched on PONS, the launchpad on {{CHAIN.NAME}}, with its trading pool built from early buyers at graduation. Part of every fee buys it and burns it, so the supply only shrinks; stake it and you receive the protocol's share of every fee, in ETH. See [The $FRACTIONS token](/protocol/fractions-token).

### Is there a lockup on staking?

No. Stake and unstake whenever you like, and claim the ETH that has accrued at any point in between.

## About the site

### Do I need an account?

No. A wallet is the only identity. Creators edit their pages by signing a message with their wallet, which costs nothing. See [Creator profiles and badges](/protocol/creator-profiles-and-badges).

### Which wallets work?

Any wallet that can connect to {{CHAIN.NAME}}. The connect button lists the common ones and offers to add the network. Chain details are on [Contracts and addresses](/protocol/contracts-and-addresses).

### Can I get the Influencer badge?

Not by asking. Governance keeps a list of approved wallets and the badge follows the list. Everything else on a profile, name, bio, links and stream, is yours to set.
