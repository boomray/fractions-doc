---
title: Share cards
description: Every index, every purchase and every creator has a picture card that carries live numbers wherever the link goes.
icon: Share2
order: 3
---

When you paste a fractions.fi link into X, Telegram, Discord or a message, the preview that unfurls is a card drawn by the protocol from live data. The same card can be saved as an image from the share panel. There are three kinds.

## The index card

Every index page, `/i/<id>`, has one. It shows the index's picture (or, if there is none, the logos of its biggest tokens), the name and ticker, how many tokens are inside, who made it, and a short strip: the day's move, how many tokens are inside, the risk score with its band, the creator, and whether it is trading yet. It does not show a price, a value or a holder count: those say little about a young index and get in the way of trading small ones. A line at the bottom says when those numbers were last refreshed.

## The "I bought" card

After a buy, the share panel offers a second card in the first person: "I just bought" with the index's name, the same strip of numbers, and your handle if your wallet has a creator profile. It lives at `/share/bought/<id>`. Post it and your followers see the index as it stood when they look, not when you bought.

## The creator card

Every creator page, `/u/<handle>`, has a card too: the creator's name and picture, their badges, how many indexes they have made, and how many wallets hold them. It is what unfurls when a creator shares their own page.

## The cards update

A card is not a screenshot. It is drawn again each time a link is unfurled or the image is requested, from the numbers at that moment. Share a link on Monday and open it on Friday and the day's move and the risk on the card are Friday's. The one thing fixed on a card is what it describes: which index, which purchase, which creator.

## Sharing

The share panel on an index page offers three things:

1. **Copy the link.** The plain page address; the card comes with it wherever the link is pasted.

2. **Post to X.** Opens a draft post with the index's name, its size and the link filled in. You can edit it before posting.

3. **Save the card.** Downloads the current card as an image, for anywhere that does not unfurl links.

:::tip
Creators can change the picture and the description on their index page by signing with their wallet. The card picks up the change the next time it is drawn. See [Creator profiles and badges](/protocol/creator-profiles-and-badges).
:::
