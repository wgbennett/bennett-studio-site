import Hero from './components/Hero.jsx'
import WhatItDoes from './components/sections/WhatItDoes.jsx'
import Flow from './components/sections/Flow.jsx'
import Features from './components/sections/Features.jsx'
import Pricing from './components/sections/Pricing.jsx'
import About from './components/sections/About.jsx'
import Contact from './components/sections/Contact.jsx'
import Footer from './components/sections/Footer.jsx'
import ScrollVignette from './components/effects/ScrollVignette.jsx'

export default function App() {
  return (
    <main className="min-h-screen bg-bone text-ink antialiased">
      <ScrollVignette />
      <Hero />
      <WhatItDoes />
      <Flow />
      <Features />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
