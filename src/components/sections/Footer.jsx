const FOOTER_STUDIO = [
  { label: 'The apps', href: '#apps' },
  { label: 'About the maker', href: '#about' },
  { label: 'Join the beta', href: '#contact' },
]

const FOOTER_MARGINPRINT = [
  { label: 'Overview', href: '#marginprint' },
  { label: 'What it does', href: '#what' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

// Replace the placeholder URLs with the real handles before deploy.
// `mailto:will@bennett.studio` assumes the bennett.studio domain is set up
// with email forwarding (Cloudflare Email Routing, Fastmail, etc.).
const FOOTER_SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'X', href: 'https://x.com/' },
  { label: 'Email', href: 'mailto:will@bennett.studio' },
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
            <div className="flex items-center gap-2.5">
              <Mark />
              <span className="font-semibold tracking-tight text-bone">
                BENNETT STUDIO
              </span>
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-bone/45">
              Independent software for makers
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-bone/55">
              One maker building focused, mobile-first tools for people who sell
              what they make. Built solo, one app at a time. First app:{' '}
              <span className="text-bone/80">MarginPrint</span>.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterColumn title="Studio" links={FOOTER_STUDIO} />
            <FooterColumn title="MarginPrint" links={FOOTER_MARGINPRINT} />
            <FooterColumn title="Connect" links={FOOTER_SOCIAL} external />
          </div>
        </div>

        {/* Bottom row — copyright + Privacy. The privacy page is a real,
            honest "your data stays on your device" statement at
            /privacy.html (static, served from public/). It doubles as the
            policy link Lemon Squeezy checkout asks for. */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-bone/10 pt-8 font-mono text-[10px] uppercase tracking-wider text-bone/40 md:flex-row md:items-center">
          <div>
            © {YEAR} Bennett Studio · MarginPrint is in beta · v0.4.2
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="/privacy.html"
              className="transition-colors hover:text-bone/70"
            >
              Privacy &amp; data
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
            <a
              href={link.href}
              className="group inline-flex items-center gap-1.5 font-mono text-[12px] text-bone/70 transition-colors hover:text-bone"
            >
              {link.label}
              {external && (
                <span
                  aria-hidden
                  className="text-[9px] text-bone/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Mark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="text-bone">
      <rect x="0" y="2" width="16" height="1.6" fill="currentColor" />
      <rect x="0" y="7.2" width="16" height="1.6" fill="currentColor" />
      <rect x="0" y="12.4" width="16" height="1.6" fill="currentColor" />
    </svg>
  )
}
