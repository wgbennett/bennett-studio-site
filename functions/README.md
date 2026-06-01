# Cloudflare Pages Functions

Server-side endpoints that deploy automatically with the site on Cloudflare
Pages. No separate server.

## `/api/waitlist` — MarginPrint beta signups

`POST /api/waitlist` with `{ "email": "..." }`. The Contact form calls this.

Configure **at least one** sink in the Pages project →
**Settings → Functions** (otherwise the endpoint returns 503 and the form
falls back to the `mailto` link):

1. **KV namespace (durable store of every signup)**
   - Create a KV namespace (e.g. `marginprint-waitlist`)
   - Bind it to the Pages project with the variable name **`WAITLIST`**
   - Signups are stored de-duped as `wl:<email>` → JSON record
   - Review them later via the dashboard or `npx wrangler kv key list --binding WAITLIST`

2. **Webhook (instant notification) — optional but recommended**
   - Add env var **`WAITLIST_WEBHOOK_URL`**
   - Point it at a Discord or Slack incoming webhook (we send both `content`
     and `text`), or any JSON endpoint (Zapier/Make)
   - You get a ping the moment someone signs up

Both can be set at once: KV keeps the durable list, the webhook pings you live.

## Local testing

Pages Functions don't run under `vite dev`. Either:
- `npx wrangler pages dev -- npm run dev` (runs Functions locally), or
- just deploy — the form degrades to the `mailto` fallback when the endpoint
  isn't reachable, so the site is never broken in the meantime.
