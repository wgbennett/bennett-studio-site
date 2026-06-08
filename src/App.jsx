import Hero from './components/Hero.jsx'
import Apps from './components/sections/Apps.jsx'
import MarginPrintIntro from './components/sections/MarginPrintIntro.jsx'
import WhatItDoes from './components/sections/WhatItDoes.jsx'
import Flow from './components/sections/Flow.jsx'
import Features from './components/sections/Features.jsx'
import Pricing from './components/sections/Pricing.jsx'
import Faq from './components/sections/Faq.jsx'
import About from './components/sections/About.jsx'
import PrintShowcase from './components/sections/PrintShowcase.jsx'
import Contact from './components/sections/Contact.jsx'
import Footer from './components/sections/Footer.jsx'
import ScrollVignette from './components/effects/ScrollVignette.jsx'

export default function App() {
  return (
    <main className="min-h-screen bg-bone text-ink antialiased">
      <ScrollVignette />
      <Hero />
      {/* Studio-level: the honest apps band */}
      <Apps />
      {/* Flagship deep-dive starts here (id=marginprint) */}
      <MarginPrintIntro />
      <WhatItDoes />
      <Flow />
      <Features />
      <Pricing />
      <Faq />
      <About />
      <PrintShowcase />
      <Contact />
      <Footer />
    </main>
  )
}
