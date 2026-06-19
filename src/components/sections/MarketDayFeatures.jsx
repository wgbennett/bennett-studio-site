import CardEdgeHighlight from '../effects/CardEdgeHighlight.jsx'
import { ChevronRight } from 'lucide-react'

// MarketDay feature grid — mirrors MarginPrint's Features section (charcoal,
// six cards) so the two app pages carry equal weight. Copy sourced from the
// MarketDay product README.
const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'square',
}

function IconBox() {
  // Open box — "the pack list"
  return (
    <svg {...ICON_PROPS}>
      <path d="M2 5 L8 2 L14 5 L8 8 Z" />
      <path d="M2 5 L2 11 L8 14 L14 11 L14 5 M8 8 L8 14" />
    </svg>
  )
}

function IconTag() {
  // Price tag — "one-tap checkout"
  return (
    <svg {...ICON_PROPS}>
      <path d="M2 2 L8 2 L14 8 L8 14 L2 8 Z" />
      <circle cx="5" cy="5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconOffline() {
  // Cloud with a slash — "works with no signal"
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 11 a2.5 2.5 0 0 1 0-5 a3.5 3.5 0 0 1 6.8-1 A2.6 2.6 0 0 1 12 11 Z" />
      <path d="M2 2 L14 14" />
    </svg>
  )
}

function IconChart() {
  // Bars — "the profit summary"
  return (
    <svg {...ICON_PROPS}>
      <path d="M2 14 L14 14" />
      <rect x="3" y="9" width="2.4" height="4" />
      <rect x="6.8" y="6" width="2.4" height="7" />
      <rect x="10.6" y="3" width="2.4" height="10" />
    </svg>
  )
}

function IconLocalDisk() {
  // Drive / disk — "data lives on your device"
  return (
    <svg {...ICON_PROPS}>
      <rect x="2" y="5" width="12" height="6" />
      <circle cx="4.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="6.7" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M2 3 L14 3" />
    </svg>
  )
}

function IconHandoff() {
  // Two arrows — "a Bennett Studio companion"
  return (
    <svg {...ICON_PROPS}>
      <path d="M2 5 L11 5 L9 3 M11 5 L9 7" />
      <path d="M14 11 L5 11 L7 9 M5 11 L7 13" />
    </svg>
  )
}

const FEATURES = [
  {
    Icon: IconBox,
    title: 'Build the pack list first',
    body: 'Plan the show the night before — what you\'re bringing and how much. At the booth it doubles as your live stock count, so you can see what\'s moving and what\'s about to sell out.',
    spec: 'Pack · then sell',
  },
  {
    Icon: IconTag,
    title: 'One tap per sale',
    body: 'Ring up each sale with a single tap and pick how they paid — cash, card, Venmo, or other. Fast enough to keep a line moving, simple enough to hand to a helper.',
    spec: 'Cash · card · Venmo · other',
  },
  {
    Icon: IconOffline,
    title: 'Works with zero signal',
    body: 'Church halls and open fields have terrible reception. MarketDay is an installable PWA that runs entirely on your phone — never a spinner between you and a sale.',
    spec: 'Offline-first PWA',
  },
  {
    Icon: IconChart,
    title: 'Close to a profit summary',
    body: 'End the show and get a clear, screenshot-worthy breakdown: units sold, takings by payment type, and exactly what the day earned you. Share it or save it in a tap.',
    spec: 'Per-show totals',
  },
  {
    Icon: IconLocalDisk,
    title: 'Yours, on your device',
    body: 'No accounts, no backend, nothing sent anywhere. Every sale and total lives in your browser storage, with a one-tap JSON backup you can export from Settings whenever you like.',
    spec: 'Local-first · JSON backup',
  },
  {
    Icon: IconHandoff,
    title: 'A Bennett Studio companion',
    body: 'MarketDay shares its storage, backup, and offline foundations with MarginPrint — two halves of one shop. Use it on its own, or alongside the app that costs and queues what you make.',
    spec: 'Pairs with MarginPrint',
  },
]

export default function MarketDayFeatures() {
  return (
    <section
      id="features"
      className="relative border-t border-ink/10 bg-charcoal px-8 py-28 lg:py-36 text-bone"
    >
      {/* Header */}
      <div className="relative mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper-light">
          <span className="h-1.5 w-1.5 rounded-full bg-copper-light" />
          <span>§02 &nbsp;—&nbsp; What's inside</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tightest text-bone">
          Six things built for the table{' '}
          <span className="italic font-medium text-bone/55">not the desk.</span>
        </h2>
      </div>

      {/* Feature grid */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-px bg-bone/10 border border-bone/10 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>

      {/* Honest status note */}
      <div className="relative mx-auto mt-20 max-w-2xl border-l-2 border-copper/40 pl-6 text-center sm:text-left">
        <p className="font-mono text-[12px] leading-relaxed text-bone/55">
          The free tier is fully built and tested today — and the paid upgrades
          (unlimited shows, season analytics, CSV, multi-day events) are live now.
          Start free; upgrade only when a show outgrows it.
        </p>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }) {
  const Icon = feature.Icon
  const number = String(index + 1).padStart(2, '0')
  return (
    <div className="group relative bg-charcoal p-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/50">
      <CardEdgeHighlight delay={index * 0.08} />

      <div className="absolute right-7 top-7 font-mono text-[10px] uppercase tracking-wider text-bone/25 transition-colors group-hover:text-bone/45">
        / {number}
      </div>

      <div className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/85 transition-colors group-hover:border-copper group-hover:text-copper">
        <Icon />
      </div>
      <div className="mt-5 text-[17px] font-semibold leading-tight text-bone">
        {feature.title}
      </div>
      <div className="mt-3 text-[14px] leading-relaxed text-bone/65">
        {feature.body}
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-bone/[0.08] pt-4 font-mono text-[10px] uppercase tracking-wider text-bone/35 transition-colors group-hover:text-bone/60">
        <ChevronRight size={13} className="text-copper-light/70 group-hover:text-copper-light" />
        <span>{feature.spec}</span>
      </div>
    </div>
  )
}
