import { useState } from 'react'

// Direct mailto fallback — used whenever the /api/waitlist function isn't
// reachable (local `vite dev`, or before the KV/webhook sink is configured on
// Cloudflare Pages). Works once Cloudflare Email Routing for the domain is live.
const MAILTO =
  'mailto:will@bennettstudio.dev?subject=MarginPrint%20beta&body=I%27d%20like%20to%20join%20the%20MarginPrint%20private%20beta.'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-ink/10 bg-bone px-8 py-32 lg:py-44"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>Private beta — now open</span>
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
        </div>

        <h2 className="text-[clamp(2.25rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-tightest text-ink">
          Be first to run your shop{' '}
          <span className="italic font-medium">from one screen.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[17px] leading-relaxed text-ink/65">
          MarginPrint is in active development. Join the private beta to get
          early access, help shape what ships, and lock the founding lifetime
          price before it goes up.
        </p>

        <WaitlistForm />

        {/* Tiny reassurance row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
          <span>Local-first · works offline</span>
          <span>·</span>
          <span>Founding lifetime price</span>
          <span>·</span>
          <span>No data sold, ever</span>
          <span>·</span>
          <span>Built solo, by a maker</span>
        </div>
      </div>
    </section>
  )
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  // idle | submitting | success | invalid | fallback
  const [status, setStatus] = useState('idle')

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
        body: JSON.stringify({ email: value }),
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
      <div className="mx-auto mt-12 max-w-md border border-copper/40 bg-copper/[0.06] px-6 py-5">
        <div className="font-mono text-[13px] uppercase tracking-wider text-copper">
          ✓ You&rsquo;re on the list
        </div>
        <p className="mt-2 text-[14px] text-ink/70">
          I&rsquo;ll email you the moment the beta opens. Thanks for being early.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto mt-12 max-w-md">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" noValidate>
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
          {status === 'submitting' ? 'Joining…' : 'Join the beta'}
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
            <a href={MAILTO} className="text-copper underline underline-offset-4">
              email me to join →
            </a>
          </p>
        )}
        {status === 'idle' && (
          <p className="text-ink/40">No spam. One email when the beta opens.</p>
        )}
      </div>
    </div>
  )
}
