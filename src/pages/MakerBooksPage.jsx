import SiteNav from '../components/SiteNav.jsx'
import MakerBooksIntro from '../components/sections/MakerBooksIntro.jsx'
import MakerBooksWhat from '../components/sections/MakerBooksWhat.jsx'
import MakerBooksFeatures from '../components/sections/MakerBooksFeatures.jsx'
import Contact from '../components/sections/Contact.jsx'
import BackToStudio from '../components/sections/BackToStudio.jsx'
import Footer from '../components/sections/Footer.jsx'
import { Star } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle.js'

const APP = 'https://makerbooks.bennettstudio.dev'

const TIERS = [
  { name: 'Free', price: '$0', interval: 'forever', tagline: 'Get your books current.', cta: 'Start free', features: ['50 transactions', 'Profit dashboard', 'Tax set-aside', 'Works offline'] },
  { name: 'Monthly', price: '$9', interval: 'per month', tagline: 'The full app, month to month.', cta: 'Get MakerBooks', features: ['Unlimited transactions', 'Multi-year history', 'Schedule C report', 'CSV export'] },
  { name: 'Annual', price: '$79', interval: 'per year', secondary: '~$6.58/mo · save 27%', tagline: 'Most chosen.', cta: 'Get MakerBooks', highlight: true, features: ['Unlimited transactions', 'Multi-year history', 'Schedule C report', 'CSV export'] },
  { name: 'Lifetime', price: '$149', interval: 'one-time', tagline: 'Buy it once. Updates forever.', cta: 'Get the lifetime deal', features: ['Everything in Annual', 'Pay once, no renewals', 'Founding-user pricing', 'A thank-you from a maker'] },
]

const FAQS = [
  { q: 'Is this tax advice?', a: 'No. MakerBooks organizes your income and expenses and maps them to Schedule C lines so they’re ready for your accountant. It never files anything and never gives tax advice — it’s a record-keeper, not a CPA.' },
  { q: 'How is it different from QuickBooks?', a: 'QuickBooks is powerful, general-purpose, and overwhelming for a one-person maker shop. MakerBooks speaks your language (materials, booth fees, mileage), runs on your phone, and costs a fraction of the price.' },
  { q: 'Where does my data live?', a: 'On your device — full stop. No account, no server. Your finances never leave your phone. Export a JSON backup anytime (and especially at tax time).' },
  { q: 'Does it move my money?', a: 'Never. MakerBooks only records money in and out. It never connects to your bank or processes a payment.' },
]

export default function MakerBooksPage() {
  usePageTitle('MakerBooks — bookkeeping & tax readiness for makers · Bennett Studio')
  return (
    <>
      <SiteNav cta={{ label: 'Start free →', href: APP }} />
      <MakerBooksIntro />
      <MakerBooksWhat />
      <MakerBooksFeatures />
      <Pricing />

      {/* FAQ */}
      <section id="faq" className="relative border-t border-ink/10 bg-bone px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
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
        app="MakerBooks"
        eyebrow="MakerBooks · available now"
        title={<>Stop dreading{' '}<span className="italic font-medium">tax season.</span></>}
        body="MakerBooks is available now — start free, no account. Log income and expenses, see your real profit, and keep records ready for your accountant."
        reassurance={['Offline-first', 'No account, no login', 'Not tax advice · records only', 'No data sold, ever']}
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
        <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" /><span>§03 — Pricing</span>
        </div>
        <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[1.02] tracking-tightest text-ink">
          Peace of mind, priced for makers.{' '}<span className="italic font-medium text-ink/55">Start free.</span>
        </h2>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-copper">
          <span className="h-1.5 w-1.5 rounded-full bg-copper" />Founding lifetime price before it goes up
        </p>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {TIERS.map((t) => (
          <div key={t.name} className={t.highlight ? 'relative flex flex-col bg-ink p-8 text-bone lg:scale-[1.02]' : 'relative flex flex-col border border-ink/10 bg-bone p-8 text-ink'}>
            {t.highlight && <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-copper px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bone"><Star size={11} className="fill-current" aria-hidden /> Most chosen</div>}
            <div className={`font-mono text-[11px] uppercase tracking-wider ${t.highlight ? 'text-bone/70' : 'text-ink/55'}`}>{t.name}</div>
            <div className="mt-3 flex items-baseline gap-2">
              <div className={`font-mono text-[44px] font-bold leading-none tracking-tight tabular-nums ${t.highlight ? 'text-bone' : 'text-ink'}`}>{t.price}</div>
              <div className={`font-mono text-[12px] ${t.highlight ? 'text-bone/55' : 'text-ink/50'}`}>{t.interval}</div>
            </div>
            {t.secondary && <div className={`mt-1.5 font-mono text-[11px] ${t.highlight ? 'text-bone/45' : 'text-ink/40'}`}>{t.secondary}</div>}
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
      <div className="mx-auto mt-14 max-w-3xl text-center font-mono text-[11px] leading-relaxed text-ink/45">
        Cancel anytime · no account. Payments run through Lemon Squeezy — your card never touches us. MakerBooks organizes your records; it’s not tax advice and never moves money. No data sold. Ever.
      </div>
    </section>
  )
}
