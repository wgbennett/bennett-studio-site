import { Link } from 'react-router-dom'

// The honest "apps" band. Studio-level, sits right under the hero.
// TWO real apps, both in development, shown at equal weight — each links to
// its own dedicated page (/marginprint, /marketday). Neither is positioned
// above the other. Do not add fake/unbuilt app names here.
const APPS = [
  {
    index: 'App 01',
    name: 'MarginPrint',
    to: '/marginprint',
    blurb:
      'Mission control for small 3D-print sellers — the production queue, live costs, and the customer list on one mobile screen. The app you open 5–15 times a day, not once per print.',
    points: ['Production queue', 'Slicer file import', 'True cost & pricing', 'AI analysis'],
    cta: 'Explore MarginPrint',
  },
  {
    index: 'App 02',
    name: 'MarketDay',
    to: '/marketday',
    blurb:
      'The offline-first booth companion for market vendors — pack smarter, sell faster, and know exactly what every show earned you. Built for craft fairs, farmers markets, and pop-ups.',
    points: ['Pack list', 'One-tap checkout', 'Offline-first PWA', 'Profit summary'],
    cta: 'Explore MarketDay',
  },
]

export default function Apps() {
  return (
    <section
      id="apps"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      <SectionGrid />

      {/* Header */}
      <div className="relative mx-auto mb-16 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>Bennett Studio &nbsp;—&nbsp; what&rsquo;s on the bench</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          Two apps, built in the open.{' '}
          <span className="italic font-medium text-ink/55">Pick your bench.</span>
        </h2>
        <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-ink/65">
          Bennett Studio is one maker shipping focused software for people who
          sell what they make. Two apps are in development — each gets its own
          page below. What&rsquo;s real shows up here. What isn&rsquo;t,
          doesn&rsquo;t.
        </p>
      </div>

      {/* Two equal app cards */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
        {APPS.map((app) => (
          <Link
            key={app.name}
            to={app.to}
            className="group relative flex flex-col justify-between overflow-hidden border border-ink/15 bg-bone p-8 transition-colors hover:border-copper/60 lg:p-10"
          >
            {/* copper rail on the left edge */}
            <span className="absolute inset-y-0 left-0 w-1 bg-copper" />
            <div>
              <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                <span className="text-ink/45">{app.index}</span>
                <StatusPill>In development</StatusPill>
              </div>

              <div className="flex items-center gap-2.5">
                <Mark />
                <span className="text-2xl font-bold tracking-tight text-ink">
                  {app.name}
                </span>
              </div>

              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/75">
                {app.blurb}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink/55">
                {app.points.map((p) => (
                  <li key={p}>— {p}</li>
                ))}
              </ul>
            </div>

            <div className="mt-9 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors group-hover:text-copper">
              {app.cta}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function StatusPill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-copper/40 bg-copper/10 px-2.5 py-1 text-[9px] font-semibold tracking-wider text-copper">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" />
      {children}
    </span>
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

function SectionGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
    />
  )
}
