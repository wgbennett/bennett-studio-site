import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { PHOTOS } from '../../photos.js'

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
// Each card carries a PHOTOGRAPH, not an app screenshot. Screenshots belong in
// the demos further down each app's own page, where there is room to read them;
// at card size a phone capture is unreadable, and four of them in a grid make
// the landing page look like a press kit. The photograph says what the app is
// FOR — a workbench, a market stall, a shelf of spools — which is the question
// a first-time visitor actually has.
//
// The image is keyed by slug from src/photos.js and is the SAME file the app's
// own page hero uses, so a card and the page it opens are recognisably one
// thing. Null until the photography lands; the placeholder is designed.
const APPS = [
  {
    index: '01',
    kicker: 'Production queue',
    name: 'MarginPrint',
    demo: 'https://app.bennettstudio.dev/?demo',
    slug: 'marginprint',
    to: '/marginprint',
    blurb:
      'Mission control for small 3D-print sellers — the production queue, live costs, and the customer list on one mobile screen. The app you open 5–15 times a day, not once per print.',
    points: ['Production queue', 'Slicer file import', 'True cost & pricing', 'AI analysis'],
    cta: 'Explore MarginPrint',
  },
  {
    index: '02',
    kicker: 'Market sales',
    name: 'MarketDay',
    demo: 'https://marketday.bennettstudio.dev/?demo',
    slug: 'marketday',
    to: '/marketday',
    blurb:
      'The offline-first booth companion for market vendors — pack smarter, sell faster, and know exactly what every show earned you. Built for craft fairs, farmers markets, and pop-ups.',
    points: ['Pack list', 'One-tap checkout', 'Offline-first PWA', 'Profit summary'],
    cta: 'Explore MarketDay',
  },
  {
    index: '03',
    kicker: 'Inventory & cost',
    name: 'BenchStock',
    demo: 'https://benchstock.bennettstudio.dev/?demo',
    slug: 'benchstock',
    to: '/benchstock',
    blurb:
      'Materials inventory and true-cost for makers — know what every product actually costs to make, what to charge, and never run out of materials mid-order. The costing brain for any maker, not just 3D.',
    points: ['Materials & stock', 'BOM true cost', 'Production planner', 'Buy in lb, use in oz'],
    cta: 'Explore BenchStock',
  },
  {
    index: '04',
    kicker: 'Bookkeeping',
    name: 'MakerBooks',
    demo: 'https://makerbooks.bennettstudio.dev/?demo',
    // Keys src/photos.js — NOT the route ('/maker-books' vs 'makerbooks').
    slug: 'makerbooks',
    to: '/maker-books',
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
          <span>What&rsquo;s on the bench</span>
        </div>
        <h2 className="max-w-4xl display-section text-bone">
          Four apps.{' '}
          <span className="accent text-bone/55">Pick yours.</span>
        </h2>
        <p className="lede mt-7 max-w-xl text-bone/65">
          I build one app per job rather than one app that does everything
          badly. All four are live and free to start. Each has its own page
          below.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
        {APPS.map((app) => (
          <AppCard key={app.name} app={app} />
        ))}
      </div>
    </section>
  )
}

// Four separate tiles with real space between them, not a single block divided
// by hairlines. Each app is its own product with its own page; a continuous
// grid read as one table of contents, which is not what four independent things
// should look like.
function AppCard({ app }) {
  return (
    // A <div>, not a <Link>. The card carries TWO destinations now — the app's
    // page and its live demo — and nesting an <a> inside an <a> is invalid HTML
    // that browsers resolve unpredictably. So the primary link is stretched
    // behind the content instead, and the demo link sits above it in the stack.
    <div className="group relative flex flex-col overflow-hidden border border-bone/12 bg-charcoal transition-colors hover:border-copper/50 hover:bg-ink">
      <CardPhoto slug={app.slug} index={app.index} kicker={app.kicker} />

      <div className="flex flex-1 flex-col p-8 lg:p-9">
        <h3 className="display-sub text-bone">
          {/* The stretched link. Making it the heading's child rather than a
              bare overlay means the card has ONE accessible name that reads as
              a link to the app's page, instead of an anonymous clickable box. */}
          <Link to={app.to} className="after:absolute after:inset-0 after:content-['']">
            {app.name}
          </Link>
        </h3>

        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-bone/70">{app.blurb}</p>

        <ul className="mt-6 hidden flex-wrap gap-x-5 gap-y-2 eyebrow text-bone/60 sm:flex">
          {app.points.map((p) => (
            <li key={p}>— {p}</li>
          ))}
        </ul>

        {/* mt-auto pins the row to the bottom so all four align despite blurbs
            of different lengths. */}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
          <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors group-hover:text-copper-light">
            {app.cta}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">→</span>
          </span>

          {/* relative + z-10 lifts this above the stretched link's ::after, so
              it is genuinely clickable rather than covered by the card link. */}
          {/* The landing page never said "free" anywhere before this — a visitor
              had to reach the closing block, four cards down, to find out. It
              sits with the actions rather than in the photo caption, where at
              390px it wrapped onto two lines and collided with the kicker. */}
          <span className="border border-copper-light/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-copper-light">
            Free to start
          </span>

          <a
            href={app.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex min-h-[44px] items-center gap-2 border-b border-bone/25 font-mono text-[12px] uppercase tracking-wider text-bone/70 transition-colors hover:border-copper-light hover:text-copper-light"
          >
            <Play size={11} aria-hidden />
            Try the demo
            <span className="sr-only"> for {app.name} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// The card's photograph, with the index and kicker laid over its lower edge —
// the label belongs ON the image the way a plate caption does, and it keeps the
// card's text block starting at the app name.
//
// Fixed 16:10 so all four cards line up regardless of source crop. Placeholder
// mirrors PhotoBackdrop's: charcoal, the studio grid, a copper wash.
function CardPhoto({ slug, index, kicker }) {
  const photo = PHOTOS[slug] ?? null
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
      {photo ? (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #F5F1EA 1px, transparent 1px), linear-gradient(to bottom, #F5F1EA 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(70% 60% at 38% 40%, rgba(184,69,31,0.20), rgba(184,69,31,0) 72%)' }}
          />
        </div>
      )}

      {/* Scrim only where the label sits, so the photograph stays a photograph. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 px-8 pb-5 lg:px-9">
        <span className="font-mono text-[13px] font-medium text-copper-light">{index}</span>
        <span className="eyebrow text-bone/70">{kicker}</span>
      </div>
    </div>
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
