// Cloudflare Pages Function — POST /api/waitlist  { email, app? }
//
// Captures Bennett Studio beta signups (MarginPrint + MarketDay). The optional
// `app` field attributes the signup to a specific app; anything unrecognised is
// dropped rather than trusted. Two optional sinks (configure either or
// both in the Pages project → Settings → Functions):
//   • KV namespace binding named `WAITLIST` — durable store of every signup
//     (key `wl:<email>`, value JSON). De-duped by email.
//   • env var `WAITLIST_WEBHOOK_URL` — instant notification. Works with a
//     Discord or Slack incoming webhook (we send both `content` and `text`
//     keys), or any endpoint that accepts JSON (Zapier/Make).
//
// If NEITHER is configured the function returns 503 so the front-end falls
// back to the mailto link instead of silently dropping signups.
//
// Local note: Pages Functions don't run under `vite dev`. Test with
// `npx wrangler pages dev` or after deploy. The Contact form degrades to the
// mailto fallback when this endpoint isn't reachable.

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

// Only attribute to apps we actually publish. Untrusted input never reaches the
// store or the webhook message verbatim — it's mapped through this allow-list.
const APPS = { marginprint: 'MarginPrint', marketday: 'MarketDay' }

export async function onRequestPost({ request, env }) {
  let email = ''
  let app = ''
  let hp = ''
  try {
    const body = await request.json()
    email = String(body?.email ?? '').trim().toLowerCase()
    app = APPS[String(body?.app ?? '').trim().toLowerCase()] || ''
    hp = String(body?.company ?? '').trim() // honeypot — see below
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, error: 'invalid_email' }, 422)
  }

  // Honeypot: the form ships a hidden `company` field a human never sees or
  // fills. A non-empty value means a bot — return success so it moves on, but
  // store and notify nothing.
  if (hp) return json({ ok: true })

  const haveKV = Boolean(env.WAITLIST)
  const haveHook = Boolean(env.WAITLIST_WEBHOOK_URL)
  if (!haveKV && !haveHook) {
    return json({ ok: false, error: 'not_configured' }, 503)
  }

  // Per-IP throttle (best-effort, needs KV): one accepted signup per IP per
  // minute. Bounds abuse-driven invocations/KV writes; honest users won't hit
  // it. A stronger upgrade is Cloudflare Turnstile or a WAF rate-limit rule.
  if (haveKV) {
    const ip = request.headers.get('cf-connecting-ip') || ''
    if (ip) {
      const rlKey = `rl:${ip}`
      if (await env.WAITLIST.get(rlKey)) {
        return json({ ok: false, error: 'rate_limited' }, 429)
      }
      await env.WAITLIST.put(rlKey, '1', { expirationTtl: 60 })
    }
  }

  const record = {
    email,
    app,
    ts: new Date().toISOString(),
    ref: request.headers.get('referer') || '',
    ua: request.headers.get('user-agent') || '',
    country: request.headers.get('cf-ipcountry') || '',
  }

  // Durable store (de-duped — keep the first signup timestamp).
  if (haveKV) {
    const key = `wl:${email}`
    const existing = await env.WAITLIST.get(key)
    if (!existing) await env.WAITLIST.put(key, JSON.stringify(record))
  }

  // Fire-and-forget notification. Don't fail the signup if the webhook errors.
  if (haveHook) {
    const label = app ? `${app} beta signup` : 'Bennett Studio beta signup'
    const msg = `🟠 ${label}: ${email}${record.country ? ` (${record.country})` : ''}`
    try {
      await fetch(env.WAITLIST_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ content: msg, text: msg }),
      })
    } catch {
      /* notification is best-effort */
    }
  }

  return json({ ok: true })
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
