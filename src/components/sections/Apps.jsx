import { Link } from 'react-router-dom'

// The honest "apps" band. Studio-level, sits right under the hero.
// FOUR real apps (MarginPrint, MarketDay, BenchStock, MakerBooks — all
// available now), shown at equal weight — each links to its own dedicated
// page. None is positioned above the others. Do not add unbuilt app names here.
const APPS = [
  {
    index: 'App 01',
    name: 'MarginPrint',
    to: '/marginprint',
    status: 'Available now',
    blurb:
      'Mission control for small 3D-print sellers — the production queue, live costs, and the customer list on one mobile screen. The app you open 5–15 times a day, not once per print.',
    points: ['Production queue', 'Slicer file import', 'True cost & pricing', 'AI analysis'],
    cta: 'Explore MarginPrint',
  },
  {
    index: 'App 02',
    name: 'MarketDay',
    to: '/marketday',
    status: 'Available now',
    blurb:
      'The offline-first booth companion for market vendors — pack smarter, sell faster, and know exactly what every show earned you. Built for craft fairs, farmers markets, and pop-ups.',
    points: ['Pack list', 'One-tap checkout', 'Offline-first PWA', 'Profit summary'],
    cta: 'Explore MarketDay',
  },
  {
    index: 'App 03',
    name: 'BenchStock',
    to: '/benchstock',
    status: 'Available now',
    blurb:
      'Materials inventory and true-cost for makers — know what every product actually costs to make, what to charge, and never run out of materials mid-order. The costing brain for any maker, not just 3D.',
    points: ['Materials & stock', 'BOM true cost', 'Production planner', 'Buy in lb, use in oz'],
    cta: 'Explore BenchStock',
  },
  {
    index: 'App 04',
    name: 'MakerBooks',
    to: '/maker-books',
    status: 'Available now',
    blurb:
      'Dead-simple bookkeeping and tax readiness for makers — log income and expenses, see your real profit, set aside for taxes, and keep Schedule-C-ready records. Never dread tax season again.',
    points: ['Income & expenses', 'Real profit dashboard', 'Tax set-aside', 'Schedule C ready'],
    cta: 'Explore MakerBooks',
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
          <span>01 &nbsp;—&nbsp; What&rsquo;s on the bench</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          Four apps, built in the open.{' '}
          <span className="italic font-medium text-ink/55">Pick your bench.</span>
        </h2>
        <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-ink/65">
          Bennett Studio is one maker shipping focused software for people who
          sell what they make — pricing, selling, costing, and the books. All four
          are available now, each with its own page below. What&rsquo;s real shows
          up here. What isn&rsquo;t, doesn&rsquo;t.
        </p>
      </div>

      {/* Four equal app cards — all live, each linking to its own page. */}
      <div className="relative mx-auto max-w-7xl space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                <StatusPill>{app.status}</StatusPill>
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
      </div>
    </section>
  )
}

function StatusPill({ tone = 'live', children }) {
  const styles =
    tone === 'live'
      ? 'border-copper/40 bg-copper/10 text-copper'
      : 'border-ink/20 bg-ink/[0.03] text-ink/45'
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[9px] font-semibold tracking-wider ${styles}`}
    >
      {tone === 'live' && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper" />
      )}
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
