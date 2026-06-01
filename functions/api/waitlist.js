// Cloudflare Pages Function — POST /api/waitlist  { email }
//
// Captures MarginPrint beta signups. Two optional sinks (configure either or
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

export async function onRequestPost({ request, env }) {
  let email = ''
  try {
    const body = await request.json()
    email = String(body?.email ?? '').trim().toLowerCase()
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, error: 'invalid_email' }, 422)
  }

  const haveKV = Boolean(env.WAITLIST)
  const haveHook = Boolean(env.WAITLIST_WEBHOOK_URL)
  if (!haveKV && !haveHook) {
    return json({ ok: false, error: 'not_configured' }, 503)
  }

  const record = {
    email,
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
    const msg = `🟠 MarginPrint beta signup: ${email}${record.country ? ` (${record.country})` : ''}`
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
