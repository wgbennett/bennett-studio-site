import SiteNav from '../components/SiteNav.jsx'
import MarginPrintIntro from '../components/sections/MarginPrintIntro.jsx'
import WhatItDoes from '../components/sections/WhatItDoes.jsx'
import Flow from '../components/sections/Flow.jsx'
import Features from '../components/sections/Features.jsx'
import Pricing from '../components/sections/Pricing.jsx'
import Faq from '../components/sections/Faq.jsx'
import Contact from '../components/sections/Contact.jsx'
import Footer from '../components/sections/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

// MarginPrint — full product deep-dive on its own route. Same chapters that
// used to live on the single-page site, now scoped to this app.
export default function MarginPrintPage() {
  usePageTitle('MarginPrint — mission control for 3D-print sellers · Bennett Studio')
  return (
    <>
      <SiteNav />
      <MarginPrintIntro />
      <WhatItDoes />
      <Flow />
      <Features />
      <Pricing />
      <Faq />
      <Contact
        app="MarginPrint"
        eyebrow="MarginPrint · private beta"
        title={
          <>
            Be first to run your shop{' '}
            <span className="italic font-medium">from one screen.</span>
          </>
        }
        body="MarginPrint is in active development. Join the private beta to get early access, help shape what ships, and lock the founding lifetime price before it goes up."
      />
      <Footer />
    </>
  )
}
