import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// Shared top navigation for the whole studio site.
//   variant="overlay" → transparent, sits over a hero
//   variant="solid"   → sticky bone bar with a hairline border
//
// `overlay` now means ON A PHOTOGRAPH, so it draws in bone rather than ink. The
// heroes are dark full-bleed images (and a dark placeholder before the photos
// land), and the previous ink-on-transparent nav simply vanished against them.
// PhotoBackdrop's top scrim is what guarantees this stays legible whatever the
// image is doing up there — the two are a pair; changing one needs the other
// re-checked.
// The two app links are real routes; "Studio" returns to the landing, and the
// CTA points at the contact block on whatever page is rendering it.
const NAV_LINKS = [
  { label: 'MarginPrint', to: '/marginprint' },
  { label: 'MarketDay', to: '/marketday' },
  { label: 'BenchStock', to: '/benchstock' },
  { label: 'MakerBooks', to: '/maker-books' },
  { label: 'About', to: '/#about' },
]

export default function SiteNav({ variant = 'solid', cta = { label: 'Explore the apps →', href: '#apps' } }) {
  const overlay = variant === 'overlay'
  const [open, setOpen] = useState(false)

  const wrap = overlay
    ? 'absolute inset-x-0 top-0 z-20'
    : 'sticky top-0 z-30 border-b border-ink/10 bg-bone/85 backdrop-blur'

  // One switch for the whole bar. Bone-on-photo vs ink-on-bone.
  const t = overlay
    ? { base: 'text-bone/75', strong: 'text-bone', hover: 'hover:text-bone', active: 'text-copper-light' }
    : { base: 'text-ink/70',  strong: 'text-ink',  hover: 'hover:text-ink',  active: 'text-copper' }

  return (
    <header className={wrap}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-8 py-5 eyebrow ${t.base}`}>
        <Link to="/" className="flex items-center gap-2.5">
          <Mark onDark={overlay} />
          <span className={`font-semibold ${t.strong}`}>BENNETT STUDIO</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) =>
            l.to.includes('#') ? (
              <Link key={l.label} to={l.to} className={t.hover}>
                {l.label}
              </Link>
            ) : (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) => (isActive ? t.active : t.hover)}
              >
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        {cta && (
          <a
            href={cta.href}
            className={`hidden underline-offset-4 hover:underline md:block ${t.base} ${t.hover}`}
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
          className={`-mr-2 inline-flex h-11 w-11 items-center justify-center transition-colors hover:text-copper md:hidden ${t.strong}`}
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

function Mark({ onDark = false }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" className={onDark ? "text-bone" : "text-ink"}>
      <rect x="0" y="3" width="10" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="8.5" width="14" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="14" width="18" height="3" rx="1.4" fill="#B8451F" />
    </svg>
  )
}
