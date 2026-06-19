import { Link } from 'react-router-dom'

const FOOTER_STUDIO = [
  { label: 'The apps', href: '/#apps' },
  { label: 'About the maker', href: '/#about' },
]

const FOOTER_APPS = [
  { label: 'MarginPrint', href: '/marginprint' },
  { label: 'MarketDay', href: '/marketday' },
]

// `mailto:will@bennettstudio.dev` resolves via Cloudflare Email Routing (live).
const FOOTER_SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/bennettstudio.dev' },
  { label: 'Email', href: 'mailto:will@bennettstudio.dev' },
]

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="relative border-t border-bone/10 bg-charcoal px-8 py-16 text-bone">
      <div className="mx-auto max-w-7xl">
        {/* Top row — wordmark + nav */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          {/* Wordmark — studio-first */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Mark />
              <span className="font-semibold tracking-tight text-bone">
                BENNETT STUDIO
              </span>
            </Link>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-bone/45">
              Independent software for makers
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-bone/55">
              One maker building focused, mobile-first tools for people who sell
              what they make. Built solo, one app at a time.{' '}
              <span className="text-bone/80">MarginPrint</span> and{' '}
              <span className="text-bone/80">MarketDay</span> are both out now.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Studio" links={FOOTER_STUDIO} />
            <FooterColumn title="Apps" links={FOOTER_APPS} />
            <FooterColumn title="Connect" links={FOOTER_SOCIAL} external />
          </div>
        </div>

        {/* Bottom row — copyright + Privacy. The privacy page is a real,
            honest "your data stays on your device" statement at
            /privacy.html (static, served from public/). It doubles as the
            policy link Lemon Squeezy checkout asks for. */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-bone/10 pt-8 font-mono text-[10px] uppercase tracking-wider text-bone/40 md:flex-row md:items-center">
          <div>
            © {YEAR} Bennett Studio · MarginPrint &amp; MarketDay
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="/privacy.html"
              className="transition-colors hover:text-bone/70"
            >
              Privacy &amp; data
            </a>
            <a
              href="/terms.html"
              className="transition-colors hover:text-bone/70"
            >
              Terms
            </a>
            <span>Made with care, not haste.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links, external = false }) {
  return (
    <div>
      <div className="mb-4 font-mono text-[10px] uppercase tracking-wider text-bone/40">
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} external={external} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLink({ link, external }) {
  const cls =
    'group inline-flex items-center gap-1.5 font-mono text-[12px] text-bone/70 transition-colors hover:text-bone'
  // Internal route (no hash, no protocol) → client-side Link; everything else
  // (hash anchors, mailto, external) stays a plain anchor.
  const isRoute = link.href.startsWith('/') && !link.href.includes('#') && !link.href.endsWith('.html')

  const inner = (
    <>
      {link.label}
      {external && (
        <span
          aria-hidden
          className="text-[9px] text-bone/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      )}
    </>
  )

  return isRoute ? (
    <Link to={link.href} className={cls}>{inner}</Link>
  ) : (
    <a href={link.href} className={cls}>{inner}</a>
  )
}

function Mark() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" className="text-bone">
      <rect x="0" y="3" width="10" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="8.5" width="14" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="14" width="18" height="3" rx="1.4" fill="#B8451F" />
    </svg>
  )
}
