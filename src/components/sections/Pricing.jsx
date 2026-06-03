import CardEdgeHighlight from '../effects/CardEdgeHighlight.jsx'

// Pricing tier copy. Confirmed for launch (2026-05-29):
//   Monthly $9.99 · Annual $99 · Lifetime $199 (founding price).
// $199 = ~2 years of Annual → "own it after two years" is the pitch, and it's
// deliberately a bootstrapping/early-advocate price. PLAN: raise Lifetime to
// $299 (3× Annual) after the first ~100 lifetime sales, framed as the founding
// discount expiring. Keep these in sync with src/config/lemonsqueezy.js tiers
// and the live Lemon Squeezy product prices. See LAUNCH_PLAN.md.
const TIERS = [
  {
    name: 'Monthly',
    price: '$9.99',
    interval: 'per month',
    tagline: 'The full app, month to month. Cancel anytime.',
    cta: 'Get early access',
    href: '#contact',
    highlight: false,
    features: [
      'Unlimited printers',
      'Slicer file ingestion (.gcode / .3mf)',
      'Unlimited queue · auto-archive',
      'AI pricing analysis · bring your own key',
      'Backup / restore · device sync',
      'All future updates',
    ],
  },
  {
    name: 'Annual',
    price: '$99',
    interval: 'per year',
    secondary: '$8.25/mo, billed annually · save 17%',
    tagline: 'The full app, paid yearly. Most chosen.',
    cta: 'Get early access',
    href: '#contact',
    highlight: true,
    features: [
      'Unlimited printers',
      'Slicer file ingestion (.gcode / .3mf)',
      'Unlimited queue · auto-archive',
      'AI pricing analysis · bring your own key',
      'Backup / restore · device sync',
      'All future updates',
    ],
  },
  {
    name: 'Lifetime',
    price: '$199',
    interval: 'one-time',
    tagline: 'Buy it once. Updates forever.',
    cta: 'Reserve founding price',
    href: '#contact',
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

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-ink/10 bg-bone px-8 py-28 lg:py-36"
    >
      {/* Header */}
      <div className="mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          <span>§04 &nbsp;—&nbsp; Pricing</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          Honest pricing. No tiers{' '}
          <span className="italic font-medium text-ink/55">that hide a feature.</span>
        </h2>
        <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/65">
          Start free with one printer; the plans below unlock the full app —
          everything you saw above, no asterisks. Pick the cadence that fits
          your shop.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />
          Launch pricing — join the beta now to lock the founding lifetime deal
        </p>
      </div>

      {/* Tier grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-7">
        {TIERS.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>

      {/* Footnote */}
      <div className="mx-auto mt-14 max-w-3xl text-center font-mono text-[11px] leading-relaxed text-ink/45">
        AI pricing analysis uses Claude via your own Anthropic key. New accounts
        get $5 of free credit — enough for hundreds of analyses. Your numbers
        stay on your device. No data sold. No ads. Ever.
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
          <span>★</span>
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
            <span className={isHighlight ? 'text-copper' : 'text-copper/85'}>
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
