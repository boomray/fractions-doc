# fractions-doc

The documentation for [fractions.fi](https://app.fractions.fi), served at
[docs.fractions.fi](https://docs.fractions.fi). A Next.js 16 app that renders
markdown files at build time; no database, no CMS.

## Run it

```sh
pnpm install
cp .env.example .env.local   # then set SITE_GATE=off or a SITE_PASSWORD
pnpm dev                     # http://localhost:3000
```

`pnpm typecheck`, `pnpm lint` and `pnpm build` are what CI and Vercel run.

## Where things are

| Path | What it is |
|---|---|
| `content/docs/<group>/<slug>.md` | The pages. One markdown file per page. |
| `src/lib/docs/content.ts` | Reads the files, orders them, builds the sidebar, the prev/next links and the search index. The list of groups (`DOC_GROUPS`) lives here. |
| `src/lib/docs/render.ts` | Markdown to HTML: callouts, steppers, tables, code, copy-link headings. |
| `src/lib/docs/values.ts` | The numbers a page may quote (see below). |
| `src/lib/{economics,chains,risk-factors,signing,addresses,format}.ts` | Copies of the app's source-of-truth files. Copy them over when the app changes. |
| `src/components/docs/` | Sidebar, table of contents, search, pager, article. |
| `src/app/(docs)/` | The routes: `/` is the overview, `/<group>/<slug>` is every other page. |
| `src/app/gate/`, `src/app/api/gate/`, `src/proxy.ts` | The password gate. |

## Add a page

1. Create `content/docs/<group>/<slug>.md`. The group folder must be one of
   the ids in `DOC_GROUPS` (`start`, `use-it`, `protocol`, `faq`); a folder
   that is not listed there is not published.
2. Start the file with frontmatter:

   ```md
   ---
   title: Fees
   description: What a buy, a sell and a creation cost, and where the money goes.
   icon: Percent
   order: 4
   ---
   ```

   `title` is required. `icon` is a lucide icon name from the map in
   `src/components/docs/icons.ts` (add a name there if you need a new one);
   unknown names fall back to a plain page glyph. `order` sorts the page
   within its group.
3. Write the body in markdown. Beyond CommonMark and tables, these work:

   - `:::note`, `:::tip`, `:::warning` ... `:::` for a callout. An optional
     title goes after the kind: `:::tip Start from a wallet`.
   - Numbered lists draw as a stepper.
   - Every `##` and `###` heading gets a stable id, a copy-link anchor and an
     entry in "On this page".
   - Link to another page with its route, e.g. `[Fees](/use-it/fees)` or
     `[Start from a wallet](/use-it/create-an-index#start-from-a-wallet)`.
   - Link to the app with `{{APP.URL}}`, e.g. `[Portfolio]({{APP.URL}}/portfolio)`.

The page appears in the sidebar, the search index, the pager and the sitemap
on the next build. The overview served at `/` is `content/docs/start/overview.md`.

## Values

Nothing numeric is typed into the markdown. A page writes a placeholder and
gets whatever the copied source files say today, so the docs cannot drift from
the product:

| Placeholder | Comes from | Example |
|---|---|---|
| `{{ECON.BUY_FEE}}`, `{{ECON.CREATE_MIN_DEPOSIT}}`, `{{ECON.INDEX_SUPPLY}}` ... | `src/lib/economics.ts`, formatted for a sentence | `2%`, `0.05 ETH`, `1B` |
| `{{CHAIN.NAME}}`, `{{CHAIN.ID}}`, `{{CHAIN.EXPLORER}}` ... | `src/lib/chains.ts` and the exchange addresses in `values.ts` | `Robinhood Chain` |
| `{{APP.URL}}` | `NEXT_PUBLIC_APP_URL` | `https://app.fractions.fi` |
| `{{BLOCK.deployments}}`, `{{BLOCK.chain-facts}}`, `{{BLOCK.fee-split}}`, `{{BLOCK.risk-factors}}`, `{{BLOCK.risk-bands}}` | Whole tables built in `values.ts` | |

The full list of keys is in `src/lib/docs/values.ts`. An unknown key fails the
build instead of shipping a blank.

`{{BLOCK.deployments}}` reads `src/lib/addresses.ts`. While `DEPLOYMENTS` is
empty every row reads "Not deployed yet"; once the app's generated
`addresses.ts` has entries, copy it over and the table lists each contract's
address with an explorer link.

## The gate

Previews sit behind one shared password. It fails closed: with no
`SITE_PASSWORD` set, every page returns 503 rather than opening up. The only
way to switch it off is `SITE_GATE=off`, which is what the public site runs
with.

- `src/proxy.ts` checks every request. `/gate`, `/api/gate`, robots, the
  sitemap, the icons and the OpenGraph card stay reachable; nothing else does.
- `src/app/gate/page.tsx` is the form. It says nothing about what is behind it.
- `src/app/api/gate/route.ts` checks the password and sets the `fractions_gate`
  cookie. The cookie holds a salted SHA-256 of the password, never the
  password, so changing the password invalidates every cookie.

## Environment

See `.env.example`. `NEXT_PUBLIC_SITE_URL` is where this site is served
(canonical URLs, sitemap, cards); `NEXT_PUBLIC_APP_URL` is where "Open the
app" and every `{{APP.URL}}` link point.
