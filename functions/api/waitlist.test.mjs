// Self-contained test for the /api/waitlist Pages Function.
// No test runner needed — run with:  node functions/api/waitlist.test.mjs
// (Node 18+ for global Response/fetch.)
import assert from 'node:assert/strict'
import { onRequestPost } from './waitlist.js'

let passed = 0
const test = async (name, fn) => {
  try { await fn(); passed++; console.log('  ✓', name) }
  catch (e) { console.error('  ✗', name, '\n   ', e.message); process.exitCode = 1 }
}

function makeRequest(body, headers = {}) {
  return {
    json: async () => body,
    headers: { get: (k) => headers[k.toLowerCase()] ?? null },
  }
}
function makeKV() {
  const store = new Map()
  return {
    store,
    get: async (k) => store.get(k) ?? null,
    put: async (k, v) => { store.set(k, v) },
  }
}

console.log('waitlist function')

await test('rejects malformed JSON body → 400', async () => {
  const req = { json: async () => { throw new Error('bad') }, headers: { get: () => null } }
  const res = await onRequestPost({ request: req, env: { WAITLIST: makeKV() } })
  assert.equal(res.status, 400)
})

await test('rejects invalid email → 422', async () => {
  const res = await onRequestPost({ request: makeRequest({ email: 'nope' }), env: { WAITLIST: makeKV() } })
  assert.equal(res.status, 422)
  assert.equal((await res.json()).error, 'invalid_email')
})

await test('returns 503 when no sink configured (so front-end falls back)', async () => {
  const res = await onRequestPost({ request: makeRequest({ email: 'a@b.com' }), env: {} })
  assert.equal(res.status, 503)
  assert.equal((await res.json()).error, 'not_configured')
})

await test('stores to KV and returns 200', async () => {
  const kv = makeKV()
  const res = await onRequestPost({ request: makeRequest({ email: 'Maker@Example.com ' }), env: { WAITLIST: kv } })
  assert.equal(res.status, 200)
  assert.equal((await res.json()).ok, true)
  // normalized (trim + lowercase) and stored under wl:<email>
  assert.ok(kv.store.has('wl:maker@example.com'))
  assert.equal(JSON.parse(kv.store.get('wl:maker@example.com')).email, 'maker@example.com')
})

await test('de-dupes by email (keeps first record)', async () => {
  const kv = makeKV()
  await onRequestPost({ request: makeRequest({ email: 'x@y.com' }), env: { WAITLIST: kv } })
  const first = kv.store.get('wl:x@y.com')
  await onRequestPost({ request: makeRequest({ email: 'x@y.com' }), env: { WAITLIST: kv } })
  assert.equal(kv.store.get('wl:x@y.com'), first, 'second signup must not overwrite the first')
  assert.equal(kv.store.size, 1)
})

await test('fires the webhook when configured, with email in payload', async () => {
  const calls = []
  const realFetch = globalThis.fetch
  globalThis.fetch = async (url, opts) => { calls.push({ url, body: opts?.body }); return new Response('{}') }
  try {
    const res = await onRequestPost({
      request: makeRequest({ email: 'hook@test.com' }),
      env: { WAITLIST_WEBHOOK_URL: 'https://example.com/hook' },
    })
    assert.equal(res.status, 200)
    assert.equal(calls.length, 1)
    assert.ok(calls[0].body.includes('hook@test.com'))
  } finally { globalThis.fetch = realFetch }
})

await test('attributes a known app and ignores an unknown one', async () => {
  const kv = makeKV()
  await onRequestPost({ request: makeRequest({ email: 'a@b.com', app: 'MarketDay' }), env: { WAITLIST: kv } })
  assert.equal(JSON.parse(kv.store.get('wl:a@b.com')).app, 'MarketDay')
  await onRequestPost({ request: makeRequest({ email: 'c@d.com', app: 'evil<script>' }), env: { WAITLIST: kv } })
  assert.equal(JSON.parse(kv.store.get('wl:c@d.com')).app, '', 'unknown app must be dropped, not stored verbatim')
})

await test('app name appears in the webhook message', async () => {
  const calls = []
  const realFetch = globalThis.fetch
  globalThis.fetch = async (url, opts) => { calls.push({ url, body: opts?.body }); return new Response('{}') }
  try {
    await onRequestPost({
      request: makeRequest({ email: 'mp@test.com', app: 'marginprint' }),
      env: { WAITLIST_WEBHOOK_URL: 'https://example.com/hook' },
    })
    assert.ok(calls[0].body.includes('MarginPrint beta signup'))
  } finally { globalThis.fetch = realFetch }
})

await test('webhook failure does not fail the signup (best-effort)', async () => {
  const realFetch = globalThis.fetch
  globalThis.fetch = async () => { throw new Error('network down') }
  try {
    const res = await onRequestPost({
      request: makeRequest({ email: 'resilient@test.com' }),
      env: { WAITLIST_WEBHOOK_URL: 'https://example.com/hook', WAITLIST: makeKV() },
    })
    assert.equal(res.status, 200)
  } finally { globalThis.fetch = realFetch }
})

console.log(`\n${passed} passed`)
