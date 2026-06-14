import SiteNav from '../components/SiteNav.jsx'
import MarketDayIntro from '../components/sections/MarketDayIntro.jsx'
import MarketDayWhat from '../components/sections/MarketDayWhat.jsx'
import MarketDayFeatures from '../components/sections/MarketDayFeatures.jsx'
import MarketDayFaq from '../components/sections/MarketDayFaq.jsx'
import Contact from '../components/sections/Contact.jsx'
import Footer from '../components/sections/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

// MarketDay — equal-weight product page alongside MarginPrint. Copy sourced
// from the MarketDay product README (offline-first booth companion for market
// vendors; free tier built, paid upgrades coming soon).
export default function MarketDayPage() {
  usePageTitle('MarketDay — the offline-first booth companion · Bennett Studio')
  return (
    <>
      <SiteNav />
      <MarketDayIntro />
      <MarketDayWhat />
      <MarketDayFeatures />
      <MarketDayFaq />
      <Contact
        app="MarketDay"
        eyebrow="MarketDay · free tier ready"
        title={
          <>
            Be first to run the booth{' '}
            <span className="italic font-medium">from your phone.</span>
          </>
        }
        body="MarketDay's free tier is built and working now, with paid upgrades coming soon. Join the beta to get early access and lock the founding lifetime price before it goes up."
      />
      <Footer />
    </>
  )
}
