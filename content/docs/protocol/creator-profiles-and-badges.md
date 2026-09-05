---
title: Creator profiles and badges
description: Every creator has a public page. Fill it in by signing with your wallet; badges are earned or granted, never self-claimed.
icon: UserRound
order: 2
---

Every wallet that has created an index gets a public page at `/u/<handle>`. It lists the creator's indexes, their fees earned, how many wallets hold their indexes, and whatever the creator chooses to add: a name, a short bio, links, and a live stream.

## Editing your profile

There is no account and no password. You prove you are the creator by signing a short message with the wallet that created the index; the app shows you the message in plain words before you sign, and it costs nothing.

1. **Open your page** at `/u/<handle>` with the creator wallet connected. An edit panel appears.

2. **Fill in what you want shown**: display name, bio, and links to X, Telegram, Discord, a website, and a stream.

3. **Sign.** Your wallet shows the message: which wallet, which chain, when, and the exact text you are saving. A signature is valid for {{ECON.SIGNING_WINDOW_MINUTES}} minutes, so an old one cannot be replayed later.

4. **Done.** The page updates at once, and so does the creator card people see when they share your link.

The same signing flow edits an index's description, its X handle and its picture from the index page. Pictures can be PNG, JPEG, WebP or GIF, up to {{ECON.IMAGE_MAX_MB}} MB; square works best.

## Stream embeds

If you stream, add your channel link. Twitch, Kick and YouTube channels are recognised, and the player is embedded on your profile page, so anyone who lands on your indexes can watch you live. Other links are shown as chips.

## Badges

Badges appear beside a creator's name on their page, on their indexes and on their share card. They are worked out by the protocol or set by governance; nobody can add one to their own profile.

| Badge | What it means | Who decides |
| --- | --- | --- |
| Influencer | A creator the protocol vouches for as a known public figure. | Governance keeps a list of approved wallets. It is never self-claimed and there is no form to apply; being on the list is the whole rule. |
| Creator | Has made at least one index that is live. | Earned automatically the moment your first index is created. |
| Early | Was here before the wider launch. | Earned automatically; based on when the wallet first created or held an index. |
| Top holder | Holds one of the largest positions in an index. | Worked out from the holders list and updated as it changes. |

:::warning
An Influencer badge is a statement by governance that the wallet belongs to who it says it does. It says nothing about the quality of their indexes. Read the recipe and the risk score before you buy anything, whoever made it.
:::
