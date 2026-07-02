import { useState } from 'react'
import { Check } from 'lucide-react'

// Shared beta-signup block. Defaults to studio-level copy; each app page passes
// its own `app` slug + copy so the signup is attributed correctly (and the
// mailto fallback is pre-filled for the right app).
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const DEFAULTS = {
  app: '',
  eyebrow: 'Now shipping',
  title: (
    <>
      Four apps.{' '}
      <span className="italic font-medium">Pick your bench.</span>
    </>
  ),
  body: "All four apps are live — start free, no account, no login. Pick the bench that fits how you sell and run your next order, show, or month from your phone.",
  reassurance: ['Local-first · works offline', 'Founding lifetime price', 'No data sold, ever', 'Built solo, by a maker'],
}

export default function Contact(props) {
  // `actions` (optional): when provided, render these CTAs instead of the
  // waitlist form — used by the MarginPrint page now that it's available.
  const { app, eyebrow, title, body, reassurance, actions } = { ...DEFAULTS, ...props }
  return (
    <section
      id="contact"
      className="relative border-t border-ink/10 bg-bone px-8 py-32 lg:py-44"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>{eyebrow}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
        </div>

        <h2 className="text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tightest text-ink">
          {title}
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          {body}
        </p>

        {actions ?? <WaitlistForm app={app} />}

        {/* Tiny reassurance row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
          {reassurance.map((r, i) => (
            <span key={r} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden>·</span>}
              <span>{r}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WaitlistForm({ app = '', wrapperClass = 'mx-auto mt-12 max-w-md' }) {
  const [email, setEmail] = useState('')
  // Honeypot: a hidden field humans never fill. The /api/waitlist function
  // silently drops any submission where it's non-empty (bot spam mitigation).
  const [hp, setHp] = useState('')
  // idle | submitting | success | invalid | fallback
  const [status, setStatus] = useState('idle')

  // Direct mailto fallback — used whenever the /api/waitlist function isn't
  // reachable (local `vite dev`, or before the sink is configured). Works once
  // Cloudflare Email Routing for the domain is live.
  const subject = app ? `${app} beta` : 'Bennett Studio beta'
  const mailto = `mailto:will@bennettstudio.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`I'd like to join the ${subject}.`)}`

  async function submit(e) {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setStatus('invalid')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: value, app: app.toLowerCase(), company: hp }),
      })
      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data.ok) {
          setStatus('success')
          return
        }
      }
      if (res.status === 422) {
        setStatus('invalid')
        return
      }
      // 503 (sink not configured), 404 (local dev), or any other → mailto fallback
      setStatus('fallback')
    } catch {
      setStatus('fallback')
    }
  }

  if (status === 'success') {
    return (
      <div className={`${wrapperClass} border border-copper/40 bg-copper/[0.06] px-6 py-5`}>
        <div className="font-mono text-[13px] uppercase tracking-wider text-copper">
          <span className="inline-flex items-center gap-1.5"><Check size={13} /> You&rsquo;re on the list</span>
        </div>
        <p className="mt-2 text-[14px] text-ink/70">
          I&rsquo;ll email you about new releases and early access. Thanks for being early.
        </p>
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" noValidate>
        {/* Honeypot — visually hidden, off the tab order, hidden from a11y tree.
            Bots fill it; humans don't. The server drops any filled submission. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'invalid' || status === 'fallback') setStatus('idle')
          }}
          placeholder="you@yourshop.com"
          aria-label="Email address"
          className="flex-1 border border-ink/20 bg-bone px-4 py-3.5 font-mono text-[13px] text-ink placeholder:text-ink/40 focus:border-copper focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex items-center justify-center gap-2.5 bg-ink px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Keep me posted'}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </form>

      <div className="mt-4 min-h-[20px] font-mono text-[12px] tracking-wide" aria-live="polite">
        {status === 'invalid' && (
          <p className="text-copper">Enter a valid email address.</p>
        )}
        {status === 'fallback' && (
          <p className="text-ink/60">
            Couldn&rsquo;t reach the signup just now —{' '}
            <a href={mailto} className="text-copper underline underline-offset-4">
              email me to join →
            </a>
          </p>
        )}
        {status === 'idle' && (
          <p className="text-ink/40">No spam. Just the occasional release note.</p>
        )}
      </div>
    </div>
  )
}
