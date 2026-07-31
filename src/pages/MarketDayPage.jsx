import AppHero from '../components/AppHero.jsx'
import MarketDayIntro from '../components/sections/MarketDayIntro.jsx'
import MarketDayWhat from '../components/sections/MarketDayWhat.jsx'
import MarketDayFeatures from '../components/sections/MarketDayFeatures.jsx'
import MarketDayPricing from '../components/sections/MarketDayPricing.jsx'
import MarketDayFaq from '../components/sections/MarketDayFaq.jsx'
import Contact from '../components/sections/Contact.jsx'
import BackToStudio from '../components/sections/BackToStudio.jsx'
import Footer from '../components/sections/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { metaFor } from '../site-meta.js'

// MarketDay — equal-weight product page alongside MarginPrint. Offline-first
// booth companion for market vendors; available now, free to start with paid
// upgrades live (mirrors MarginPrint: §pricing section + Start free / See pricing).
export default function MarketDayPage() {
  usePageTitle(metaFor('/marketday').title)
  return (
    <>
      <AppHero
        slug="marketday"
        index="02"
        kicker="Market sales"
        name="MarketDay"
        tagline="works the booth."
        sub="The offline-first booth companion for market vendors — pack smarter, sell faster, and know exactly what every show earned you."
        cta={{ label: 'Start free →', href: 'https://marketday.bennettstudio.dev' }}
        secondaryCta={{ label: 'Open MarketDay', href: 'https://marketday.bennettstudio.dev' }}
      />
      <MarketDayIntro />
      <MarketDayWhat />
      <MarketDayFeatures />
      <MarketDayPricing />
      <MarketDayFaq />
      <Contact
        app="MarketDay"
        eyebrow="MarketDay · available now"
        title={
          <>
            Run the booth{' '}
            <span className="accent">from your phone.</span>
          </>
        }
        body="MarketDay is available now — start free, no account. Upgrade for unlimited shows and the season view whenever you're ready; lock the founding lifetime price before it goes up."
        reassurance={['Offline-first · works in any field', 'No account, no login', 'Founding lifetime price', 'No data sold, ever']}
        actions={
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://marketday.bennettstudio.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 bg-ink px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper"
            >
              Start free
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 border border-ink/25 px-7 py-3.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-copper hover:text-copper"
            >
              See pricing
            </a>
          </div>
        }
      />
      <BackToStudio />
      <Footer />
    </>
  )
}
