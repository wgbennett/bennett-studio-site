import Hero from '../components/Hero.jsx'
import Apps from '../components/sections/Apps.jsx'
import About from '../components/sections/About.jsx'
import PrintShowcase from '../components/sections/PrintShowcase.jsx'
import Contact from '../components/sections/Contact.jsx'
import Footer from '../components/sections/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

// Bennett Studio landing — studio-first. You arrive here, choose an app from
// the equal four-app band, and the deep marketing for each app lives on its own
// route. Keeps the landing short: hero → apps → about → prints → close.
export default function Landing() {
  usePageTitle('Bennett Studio — independent software for makers')
  return (
    <>
      <Hero />
      <Apps />
      <About />
      <PrintShowcase />
      {/* Studio-level close: all four apps are live, so send people straight
          into the apps band rather than a generic "which app is this?" form. */}
      <Contact actions={<HomeCtas />} />
      <Footer />
    </>
  )
}

function HomeCtas() {
  // All four apps are live, so the studio-level close points into the apps
  // band above rather than showcasing a partial subset.
  return (
    <div className="mt-12 flex justify-center">
      <a
        href="#apps"
        className="group inline-flex items-center gap-2.5 bg-ink px-8 py-4 font-mono text-[13px] uppercase tracking-wider text-bone transition-colors hover:bg-copper"
      >
        Explore the four apps
        <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
      </a>
    </div>
  )
}
