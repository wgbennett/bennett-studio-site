import CardEdgeHighlight from '../effects/CardEdgeHighlight.jsx'
import { Star } from 'lucide-react'

// MarketDay pricing — mirrors MarginPrint's Pricing.jsx layout. Confirmed
// launch pricing (SPEC.md §6 / market-day config/lemonsqueezy.js): Monthly $5 ·
// Annual $48 · Lifetime $79 (founding). Keep in sync with the live Lemon Squeezy
// products and market-day/src/config/lemonsqueezy.js PRICES. The Sell screen is
// never gated — free-tier limits block creation (new event / add product) only.
const APP_URL = 'https://marketday.bennettstudio.dev'

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    interval: 'forever',
    tagline: 'Everything you need for a couple of shows a month.',
    cta: 'Start free',
    href: APP_URL,
    highlight: false,
    features: [
      '2 events per month',
      '25 products',
      'The full Sell screen — never paywalled',
      'Pack lists & expense tracking',
      'Local data, works offline',
    ],
  },
  {
    name: 'Monthly',
    price: '$5',
    interval: 'per month',
    tagline: 'The full app, month to month. Cancel anytime.',
    cta: 'Get MarketDay',
    href: APP_URL,
    highlight: false,
    features: [
      'Unlimited shows',
      'Unlimited products',
      'Season analytics & best-sellers',
      'CSV export',
      'Multi-day events & mileage',
      'All future updates',
    ],
  },
  {
    name: 'Annual',
    price: '$48',
    interval: 'per year',
    secondary: '$4/mo, billed annually · save 20%',
    tagline: 'The full app, paid yearly. Most chosen.',
    cta: 'Get MarketDay',
    href: APP_URL,
    highlight: true,
    features: [
      'Unlimited shows',
      'Unlimited products',
      'Season analytics & best-sellers',
      'CSV export',
      'Multi-day events & mileage',
      'All future updates',
    ],
  },
  {
    name: 'Lifetime',
    price: '$79',
    interval: 'one-time',
    tagline: 'Buy it once. Updates forever.',
    cta: 'Get the lifetime deal',
    href: APP_URL,
    highlight: false,
    features: [
      'Everything in Annual',
      'Pay once, no renewals',
      'Founding-user pricing',
      'Direct line for feature requests',
      'A thank-you from a solo maker',
    ],
  },
]

export default function MarketDayPricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      {/* Header */}
      <div className="mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§03 &nbsp;—&nbsp; Pricing</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          Honest pricing. The Sell screen{' '}
          <span className="italic font-medium text-ink/55">is never paywalled.</span>
        </h2>
        <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/65">
          Start free — a couple of shows a month, no account. Upgrade for unlimited
          shows and the season view whenever you&rsquo;re ready. A free-tier limit
          never blocks a sale mid-show.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          Launch pricing — lock the founding lifetime price before it goes up
        </p>
      </div>

      {/* Tier grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {TIERS.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>

      {/* Footnote */}
      <div className="mx-auto mt-14 max-w-3xl text-center font-mono text-[11px] leading-relaxed text-ink/45">
        Offline-first — record sales with no signal and they sync nothing to anyone.
        Your numbers stay on your device. No data sold. No ads. Ever.
      </div>
    </section>
  )
}

function TierCard({ tier }) {
  const isHighlight = tier.highlight

  return (
    <div
      className={
        isHighlight
          ? 'relative flex flex-col bg-ink p-8 text-bone lg:scale-[1.02] shadow-[0_4px_0_rgba(184,69,31,0.18)]'
          : 'relative flex flex-col border border-ink/10 bg-bone p-8 text-ink'
      }
    >
      <CardEdgeHighlight />
      {isHighlight && (
        <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-copper px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">
          <Star size={11} className="fill-current" aria-hidden />
          <span>Most chosen</span>
        </div>
      )}

      {/* Tier name */}
      <div
        className={`font-mono text-[11px] uppercase tracking-wider ${
          isHighlight ? 'text-bone/70' : 'text-ink/55'
        }`}
      >
        {tier.name}
      </div>

      {/* Price */}
      <div className="mt-3 flex items-baseline gap-2">
        <div
          className={`font-mono text-[44px] font-bold leading-none tracking-tight tabular-nums ${
            isHighlight ? 'text-bone' : 'text-ink'
          }`}
        >
          {tier.price}
        </div>
        <div
          className={`font-mono text-[12px] ${
            isHighlight ? 'text-bone/55' : 'text-ink/50'
          }`}
        >
          {tier.interval}
        </div>
      </div>

      {tier.secondary && (
        <div
          className={`mt-1.5 font-mono text-[11px] ${
            isHighlight ? 'text-bone/45' : 'text-ink/40'
          }`}
        >
          {tier.secondary}
        </div>
      )}

      {/* Tagline */}
      <p
        className={`mt-5 text-[14px] leading-relaxed ${
          isHighlight ? 'text-bone/75' : 'text-ink/65'
        }`}
      >
        {tier.tagline}
      </p>

      {/* Features */}
      <ul
        className={`mt-7 space-y-2.5 border-t pt-6 ${
          isHighlight ? 'border-bone/15' : 'border-ink/[0.08]'
        }`}
      >
        {tier.features.map((f) => (
          <li
            key={f}
            className={`flex gap-2.5 font-mono text-[12px] leading-relaxed ${
              isHighlight ? 'text-bone/80' : 'text-ink/70'
            }`}
          >
            <span className={isHighlight ? 'text-copper-light' : 'text-copper/85'}>
              —
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8 flex-1" />
      <a
        href={tier.href}
        className={
          isHighlight
            ? 'inline-flex items-center justify-center gap-2 bg-copper px-5 py-3 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-bone hover:text-ink'
            : 'inline-flex items-center justify-center gap-2 border border-ink px-5 py-3 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-bone'
        }
      >
        {tier.cta}
        <span aria-hidden>→</span>
      </a>
    </div>
  )
}
