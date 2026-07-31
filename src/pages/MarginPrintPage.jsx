import SiteNav from '../components/SiteNav.jsx'
import MarginPrintIntro from '../components/sections/MarginPrintIntro.jsx'
import WhatItDoes from '../components/sections/WhatItDoes.jsx'
import Flow from '../components/sections/Flow.jsx'
import Features from '../components/sections/Features.jsx'
import Pricing from '../components/sections/Pricing.jsx'
import Faq from '../components/sections/Faq.jsx'
import Contact from '../components/sections/Contact.jsx'
import BackToStudio from '../components/sections/BackToStudio.jsx'
import Footer from '../components/sections/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { metaFor } from '../site-meta.js'

// MarginPrint — full product deep-dive on its own route. Same chapters that
// used to live on the single-page site, now scoped to this app.
export default function MarginPrintPage() {
  usePageTitle(metaFor('/marginprint').title)
  return (
    <>
      <SiteNav cta={{ label: 'Start free →', href: 'https://app.bennettstudio.dev' }} />
      <MarginPrintIntro />
      <WhatItDoes />
      <Flow />
      <Features />
      <Pricing />
      <Faq />
      <Contact
        app="MarginPrint"
        eyebrow="MarginPrint · available now"
        title={
          <>
            Run your shop{' '}
            <span className="accent">from one screen.</span>
          </>
        }
        body="MarginPrint is available now — start free, no account, no login. Upgrade to the full app whenever you're ready; lock the founding lifetime price before it goes up."
        reassurance={['Local-first · works offline', 'No account, no login', 'Founding lifetime price', 'No data sold, ever']}
        actions={
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://app.bennettstudio.dev"
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
