import Hero from '../components/Hero.jsx'
import Apps from '../components/sections/Apps.jsx'
import About from '../components/sections/About.jsx'
import PrintShowcase from '../components/sections/PrintShowcase.jsx'
import Contact from '../components/sections/Contact.jsx'
import Footer from '../components/sections/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

// Bennett Studio landing — studio-first. You arrive here, choose an app from
// the equal two-app band, and the deep marketing for each app lives on its own
// route. Keeps the landing short: hero → apps → about → prints → beta.
export default function Landing() {
  usePageTitle('Bennett Studio — software for makers · MarginPrint & MarketDay')
  return (
    <>
      <Hero />
      <Apps />
      <About />
      <PrintShowcase />
      <Contact />
      <Footer />
    </>
  )
}
