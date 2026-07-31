import { Link } from 'react-router-dom'

// The honest "apps" band. Studio-level, sits right under the hero.
// FOUR real apps (MarginPrint, MarketDay, BenchStock, MakerBooks — all
// available now), shown at equal weight — each links to its own dedicated
// page. None is positioned above the others. Do not add unbuilt app names here.
//
// Reworked as a dark "selected work" band: a numbered card per app, each
// showing a REAL screenshot of the thing rather than describing it. The old
// version was four text boxes on bone, and text boxes are what a visitor
// discounts — a product shot is the part that cannot be generated. Dark on
// purpose too: banding cream against ink is what gives the reference page its
// rhythm, and it makes this section read as the site's centrepiece instead of
// as more page.
//
// `shot` is a phone screenshot (1170×2532). They are framed top-aligned in a
// fixed-height window rather than scaled whole: at card width a full 2532px-tall
// screen renders every UI element too small to read, which defeats the point of
// showing it. The top of each screen is the part that identifies the app.
const APPS = [
  {
    index: '01',
    kicker: 'Production queue',
    name: 'MarginPrint',
    to: '/marginprint',
    shot: '/screenshots/queue.png',
    shotAlt: 'The MarginPrint production queue on a phone, showing jobs and their state.',
    blurb:
      'Mission control for small 3D-print sellers — the production queue, live costs, and the customer list on one mobile screen. The app you open 5–15 times a day, not once per print.',
    points: ['Production queue', 'Slicer file import', 'True cost & pricing', 'AI analysis'],
    cta: 'Explore MarginPrint',
  },
  {
    index: '02',
    kicker: 'Market sales',
    name: 'MarketDay',
    to: '/marketday',
    shot: '/screenshots/marketday-quicksale.png',
    shotAlt: 'The MarketDay quick-sale grid on a phone, priced items ready to tap.',
    blurb:
      'The offline-first booth companion for market vendors — pack smarter, sell faster, and know exactly what every show earned you. Built for craft fairs, farmers markets, and pop-ups.',
    points: ['Pack list', 'One-tap checkout', 'Offline-first PWA', 'Profit summary'],
    cta: 'Explore MarketDay',
  },
  {
    index: '03',
    kicker: 'Inventory & cost',
    name: 'BenchStock',
    to: '/benchstock',
    shot: '/screenshots/benchstock-dashboard.png',
    shotAlt: 'The BenchStock dashboard on a phone, showing stock levels and costs.',
    blurb:
      'Materials inventory and true-cost for makers — know what every product actually costs to make, what to charge, and never run out of materials mid-order. The costing brain for any maker, not just 3D.',
    points: ['Materials & stock', 'BOM true cost', 'Production planner', 'Buy in lb, use in oz'],
    cta: 'Explore BenchStock',
  },
  {
    index: '04',
    kicker: 'Bookkeeping',
    name: 'MakerBooks',
    to: '/maker-books',
    shot: '/screenshots/makerbooks-dashboard.png',
    shotAlt: 'The MakerBooks profit dashboard on a phone, income and expenses summarised.',
    blurb:
      'Dead-simple bookkeeping and tax readiness for makers — log income and expenses, see your real profit, set aside for taxes, and keep Schedule-C-ready records. Never dread tax season again.',
    points: ['Income & expenses', 'Real profit dashboard', 'Tax set-aside', 'Schedule C ready'],
    cta: 'Explore MakerBooks',
  },
]

export default function Apps() {
  return (
    <section id="apps" className="relative overflow-hidden bg-charcoal px-8 py-28 lg:py-36">
      <SectionGrid />

      {/* Header */}
      <div className="relative mx-auto mb-16 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 eyebrow text-copper-light">
          <span className="h-1.5 w-1.5 rounded-full bg-copper-light" />
          <span>01 &nbsp;—&nbsp; What&rsquo;s on the bench</span>
        </div>
        <h2 className="max-w-4xl display-section text-bone">
          Four apps, built in the open.{' '}
          <span className="accent text-bone/55">Pick your bench.</span>
        </h2>
        <p className="lede mt-7 max-w-xl text-bone/65">
          Bennett Studio is one maker shipping focused software for people who
          sell what they make — pricing, selling, costing, and the books. All four
          are available now, each with its own page below. What&rsquo;s real shows
          up here. What isn&rsquo;t, doesn&rsquo;t.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-px bg-bone/10 lg:grid-cols-2">
        {APPS.map((app) => (
          <AppCard key={app.name} app={app} />
        ))}
      </div>
    </section>
  )
}

// Cards sit on a 1px bone/10 grid gap, so the dividing lines between them are
// the background showing through rather than four separate borders that double
// up where cards meet.
function AppCard({ app }) {
  return (
    <Link
      to={app.to}
      className="group relative flex flex-col bg-charcoal p-8 transition-colors hover:bg-ink lg:p-10"
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[13px] font-medium text-copper-light">{app.index}</span>
        <span className="eyebrow text-bone/45">{app.kicker}</span>
      </div>

      <h3 className="display-sub text-bone">{app.name}</h3>

      {/* Device window. Fixed height so all four cards frame the same slice and
          the rows stay level.

          object-position is 8% down, not 0%. At the top of the frame every
          screenshot shows its app header — name and a settings gear — which is
          chrome, identical across the four, and says nothing about what the app
          does. 8% clears it and lands on the screen title plus the headline
          figure ("Queue / 2 jobs printing", "$346.23 materials on hand"). Past
          ~16% the crop starts slicing through those titles; compared at 8 / 16 /
          24 / 32% before choosing. */}
      <div className="relative mt-7 h-52 overflow-hidden border border-bone/10 bg-ink lg:h-60">
        <img
          src={app.shot}
          alt={app.shotAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: '50% 8%' }}
        />
        {/* Fades the cut-off bottom edge into the card instead of ending on a
            hard slice through the UI. */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      <p className="mt-7 text-[15px] leading-relaxed text-bone/70">{app.blurb}</p>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 eyebrow text-bone/40">
        {app.points.map((p) => (
          <li key={p}>— {p}</li>
        ))}
      </ul>

      {/* mt-auto pins the CTA to the bottom so all four align despite blurbs of
          different lengths. */}
      <div className="mt-auto pt-9 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors group-hover:text-copper-light">
        {app.cta}
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  )
}

function SectionGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #F5F1EA 1px, transparent 1px), linear-gradient(to bottom, #F5F1EA 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
    />
  )
}
