import AppHero from '../components/AppHero.jsx'
import BenchStockIntro from '../components/sections/BenchStockIntro.jsx'
import BenchStockWhat from '../components/sections/BenchStockWhat.jsx'
import BenchStockFeatures from '../components/sections/BenchStockFeatures.jsx'
import Contact from '../components/sections/Contact.jsx'
import BackToStudio from '../components/sections/BackToStudio.jsx'
import Footer from '../components/sections/Footer.jsx'
import { Star } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'
import { metaFor } from '../site-meta.js'

const APP = 'https://benchstock.bennettstudio.dev'

const TIERS = [
  { name: 'Free', price: '$0', interval: 'forever', tagline: 'Cost your first products.', cta: 'Start free', features: ['20 materials', '10 products', 'Live BOM costing', 'Works offline'] },
  { name: 'Monthly', price: '$7', interval: 'per month', tagline: 'The full app, month to month.', cta: 'Get BenchStock', features: ['Unlimited materials & products', 'Low-stock alerts', 'Inventory value', 'CSV export'] },
  { name: 'Annual', price: '$59', interval: 'per year', secondary: '~$4.92/mo · save 30%', tagline: 'Most chosen.', cta: 'Get BenchStock', highlight: true, features: ['Unlimited materials & products', 'Low-stock alerts', 'Inventory value', 'CSV export'] },
  { name: 'Lifetime', price: '$99', interval: 'one-time', tagline: 'Buy it once. Updates forever.', cta: 'Get the lifetime deal', features: ['Everything in Annual', 'Pay once, no renewals', 'Founding-user pricing', 'A thank-you from a maker'] },
]

const FAQS = [
  { q: 'How is this different from Craftybase?', a: 'Same core job — materials, true cost, inventory — but simpler, mobile-first, offline, and a fraction of the price. BenchStock is built for the maker who wants the answer, not an accounting course.' },
  { q: 'Where does my data live?', a: 'On your device. BenchStock is a client-side app — no account, no server, no central database of your business to leak. Export a JSON backup anytime.' },
  { q: 'Do I need to be online?', a: 'No. It runs entirely on your phone and works fully offline. Install it to your home screen and it behaves like a native app.' },
  { q: 'Can I import my spreadsheet?', a: 'Yes — paste or upload a CSV of your materials (name, unit, cost, on-hand, supplier) and BenchStock maps the columns for you.' },
]

export default function BenchstockPage() {
  usePageTitle(metaFor('/benchstock').title)
  return (
    <>
      <AppHero
        slug="benchstock"
        index="03"
        kicker="Inventory & cost"
        name="BenchStock"
        tagline="knows the cost."
        sub="Materials inventory and true-cost for makers — what every product actually costs to make, what to charge, and never running out mid-order."
        cta={{ label: 'Start free →', href: APP }}
        secondaryCta={{ label: 'Open BenchStock', href: APP }}
      />
      <BenchStockIntro />
      <BenchStockWhat />
      <BenchStockFeatures />
      <Pricing />

      {/* FAQ */}
      <section id="faq" className="relative border-t border-ink/10 bg-bone px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-3 eyebrow text-copper">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" /><span>§04 — Questions</span>
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[17px] font-semibold text-ink">
                  {f.q}<span className="ml-4 text-copper transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/65">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Contact
        app="BenchStock"
        eyebrow="BenchStock · available now"
        title={<>Know your{' '}<span className="accent">real numbers.</span></>}
        body="BenchStock is available now — start free, no account. Cost your products, track your materials, and plan your next run from your phone."
        reassurance={['Offline-first', 'No account, no login', 'Founding lifetime price', 'No data sold, ever']}
        actions={
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={APP} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2.5 bg-ink px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper">
              Start free<span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 border border-ink/25 px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper">See pricing</a>
          </div>
        }
      />
      <BackToStudio />
      <Footer />
    </>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-ink/10 bg-bone px-8 py-24 lg:py-32">
      <div className="mx-auto mb-16 max-w-7xl">
        <div className="mb-5 flex items-center gap-3 eyebrow text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" /><span>§03 — Pricing</span>
        </div>
        <h2 className="max-w-4xl display-section text-ink">
          A tenth of{' '}<span className="accent text-ink/55">Craftybase.</span>
        </h2>
        <p className="mt-4 inline-flex items-center gap-2 eyebrow text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />Founding lifetime price before it goes up
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {TIERS.map((t) => (
          <div key={t.name} className={t.highlight ? 'relative flex flex-col bg-ink p-8 text-bone lg:scale-[1.02]' : 'relative flex flex-col border border-ink/10 bg-bone p-8 text-ink'}>
            {t.highlight && <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-copper px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bone"><Star size={11} className="fill-current" aria-hidden /> Most chosen</div>}
            <div className={`eyebrow ${t.highlight ? 'text-bone/70' : 'text-ink/70'}`}>{t.name}</div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className={`font-mono text-[44px] font-bold leading-none tracking-tight tabular-nums ${t.highlight ? 'text-bone' : 'text-ink'}`}>{t.price}</div>
              <div className={`font-mono text-[12px] ${t.highlight ? 'text-bone/60' : 'text-ink/70'}`}>{t.interval}</div>
            </div>
            {t.secondary && <div className={`mt-1.5 font-mono text-[11px] ${t.highlight ? 'text-bone/60' : 'text-ink/70'}`}>{t.secondary}</div>}
            <p className={`mt-5 text-[14px] leading-relaxed ${t.highlight ? 'text-bone/75' : 'text-ink/65'}`}>{t.tagline}</p>
            <ul className={`mt-7 space-y-2.5 border-t pt-6 ${t.highlight ? 'border-bone/15' : 'border-ink/[0.08]'}`}>
              {t.features.map((x) => (
                <li key={x} className={`flex gap-2.5 font-mono text-[12px] leading-relaxed ${t.highlight ? 'text-bone/80' : 'text-ink/70'}`}>
                  <span className={t.highlight ? 'text-copper-light' : 'text-copper/85'}>—</span><span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex-1" />
            <a href={APP} target="_blank" rel="noopener noreferrer" className={t.highlight ? 'inline-flex items-center justify-center gap-2 bg-copper px-5 py-3 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-bone hover:text-ink' : 'inline-flex items-center justify-center gap-2 border border-ink px-5 py-3 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-bone'}>
              {t.cta}<span aria-hidden>→</span>
            </a>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 max-w-3xl text-center font-mono text-[11px] leading-relaxed text-ink/70">
        Cancel anytime · no account, no login. Payments run through Lemon Squeezy — your card never touches us. Your data stays on your device. No data sold. Ever.
      </div>
    </section>
  )
}
