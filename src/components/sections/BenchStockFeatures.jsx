import CardEdgeHighlight from '../effects/CardEdgeHighlight.jsx'
import { ChevronRight, Package, Calculator, ShoppingCart, Scale, HardDrive, ArrowLeftRight } from 'lucide-react'

// BenchStock feature grid — mirrors MarginPrint's Features / MarketDayFeatures
// (charcoal, six cards) so the four app pages carry equal weight.
const FEATURES = [
  {
    Icon: Package,
    title: 'Materials, costed',
    body: 'Add what you buy with its cost per unit and BenchStock tracks what you have on hand — then warns you before you run out mid-order.',
    spec: 'Cost · stock · reorder alerts',
  },
  {
    Icon: Calculator,
    title: 'True cost, instantly',
    body: 'Build a product from its materials and see exactly what it costs to make — materials, labor, and overhead — with a suggested price and live margin.',
    spec: 'Live BOM costing',
  },
  {
    Icon: ShoppingCart,
    title: 'Plan a run',
    body: '“How many can I make right now?” and “for this order, what do I need to buy?” — a supplier-grouped shopping list with an estimated total.',
    spec: 'Buildable + shopping list',
  },
  {
    Icon: Scale,
    title: 'Buy in lb, use in oz',
    body: 'Stock wax by the pound, write the recipe in ounces — BenchStock converts automatically, so the cost math is always right no matter how you buy.',
    spec: 'Automatic unit conversion',
  },
  {
    Icon: HardDrive,
    title: 'Yours, on your device',
    body: 'No accounts, no backend, nothing sent anywhere. Every material and product lives in your browser storage, with a one-tap JSON backup from Settings.',
    spec: 'Local-first · JSON backup',
  },
  {
    Icon: ArrowLeftRight,
    title: 'A Bennett Studio app',
    body: 'BenchStock shares its storage, backup, and offline foundations with the other Bennett Studio apps — MarginPrint, MarketDay, and MakerBooks. Use it alone or with the rest.',
    spec: 'Shared studio foundations',
  },
]

export default function BenchStockFeatures() {
  return (
    <section
      id="features"
      className="relative border-t border-ink/10 bg-charcoal px-8 py-28 lg:py-36 text-bone"
    >
      {/* Header */}
      <div className="relative mx-auto mb-20 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 eyebrow text-copper-light">
          <span className="h-1.5 w-1.5 rounded-full bg-copper-light" />
          <span>§02 &nbsp;—&nbsp; What's inside</span>
        </div>
        <h2 className="max-w-4xl display-section text-bone">
          Six things built for the bench{' '}
          <span className="accent text-bone/55">not the spreadsheet.</span>
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
          (unlimited materials &amp; products, low-stock alerts, inventory value,
          CSV export) are live now. Start free; upgrade only when your bench
          outgrows it.
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
        <Icon size={16} strokeWidth={1.5} />
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
