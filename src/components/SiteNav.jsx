import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// Shared top navigation for the whole studio site.
//   variant="overlay" → transparent, sits over the hero (landing page)
//   variant="solid"   → sticky bone bar with a hairline border (app pages)
// The two app links are real routes; "Studio" returns to the landing, and the
// CTA points at the contact block on whatever page is rendering it.
const NAV_LINKS = [
  { label: 'MarginPrint', to: '/marginprint' },
  { label: 'MarketDay', to: '/marketday' },
  { label: 'About', to: '/#about' },
]

export default function SiteNav({ variant = 'solid', cta = { label: 'Explore the apps →', href: '#apps' } }) {
  const overlay = variant === 'overlay'
  const [open, setOpen] = useState(false)

  const wrap = overlay
    ? 'absolute inset-x-0 top-0 z-20'
    : 'sticky top-0 z-30 border-b border-ink/10 bg-bone/85 backdrop-blur'

  return (
    <header className={wrap}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 font-mono text-[11px] uppercase tracking-wider text-ink/70">
        <Link to="/" className="flex items-center gap-2.5">
          <Mark />
          <span className="font-semibold text-ink">BENNETT STUDIO</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) =>
            l.to.includes('#') ? (
              <Link key={l.label} to={l.to} className="hover:text-ink">
                {l.label}
              </Link>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                  isActive ? 'text-copper' : 'hover:text-ink'
                }
              >
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        {cta && (
          <a
            href={cta.href}
            className="hidden text-ink/70 underline-offset-4 hover:text-ink hover:underline md:block"
          >
            {cta.label}
          </a>
        )}

        {/* Mobile hamburger — the nav links + CTA are hidden below md. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="text-ink transition-colors hover:text-copper md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer — solid bg so it reads over the hero (overlay variant). */}
      {open && (
        <div className="border-t border-ink/10 bg-bone md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-8 py-4 font-mono text-[12px] uppercase tracking-wider text-ink/70">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            {cta && (
              <a
                href={cta.href}
                onClick={() => setOpen(false)}
                className="py-2 text-copper hover:text-ink"
              >
                {cta.label}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

function Mark() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" className="text-ink">
      <rect x="0" y="3" width="10" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="8.5" width="14" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="14" width="18" height="3" rx="1.4" fill="#B8451F" />
    </svg>
  )
}
