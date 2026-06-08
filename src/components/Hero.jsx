import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Scroll-coupled fade + downward translate on the print stack.
  // Bounded inside the hero via overflow-hidden — no bleed into next section.
  const stackY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 220])
  const stackOpacity = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 0.55, 0])

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[720px] w-full overflow-hidden border-b border-ink/10 bg-bone"
    >
      <GridBackdrop />

      {/* Top nav */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 py-6 font-mono text-[11px] uppercase tracking-wider text-ink/70">
        <a href="#" className="flex items-center gap-2.5">
          <Mark />
          <span className="font-semibold text-ink">BENNETT STUDIO</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          <a href="#apps" className="hover:text-ink">Apps</a>
          <a href="#marginprint" className="hover:text-ink">MarginPrint</a>
          <a href="#pricing" className="hover:text-ink">Pricing</a>
          <a href="#about" className="hover:text-ink">About</a>
        </nav>
        <a
          href="#contact"
          className="hidden text-ink/70 underline-offset-4 hover:text-ink hover:underline md:block"
        >
          Join the beta →
        </a>
      </header>

      {/* Main content grid */}
      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-12 px-8 pt-28 lg:grid-cols-[1fr_1.15fr] lg:pt-0">
        {/* Left — copy */}
        <div className="max-w-2xl">
          <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink/55">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
            <span>Bennett Studio · independent software for makers</span>
          </div>

          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tightest text-ink">
            The business side{' '}
            <span className="italic font-medium">of making,</span> handled.
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
            One maker building focused, mobile-first tools for people who sell
            what they make — one app at a time. First up:{' '}
            <span className="font-semibold text-ink">MarginPrint</span>, mission
            control for small 3D-print sellers.{' '}
            <span className="text-copper">In development now.</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#marginprint"
              className="group inline-flex items-center gap-2.5 bg-ink px-6 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:bg-copper"
            >
              Meet MarginPrint
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#contact"
              className="font-mono text-[12px] uppercase tracking-wider text-ink/70 underline-offset-4 hover:text-ink hover:underline"
            >
              Join the beta →
            </a>
          </div>
        </div>

        {/* Right — animated print stack */}
        <motion.div
          style={{ y: stackY, opacity: stackOpacity }}
          className="relative hidden h-[86vh] items-center justify-center lg:flex"
        >
          {/* HUD callout — upper right, above the stack */}
          <div className="absolute right-0 top-2 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-ink/50">
            <div className="h-px w-12 bg-ink/30 mb-2" />
            <div>now building</div>
            <div>
              layer <span className="text-ink">247</span>{' '}
              <span className="text-ink/30">/</span> 247
              <span className="ml-1.5 inline-block h-2 w-2 align-middle bg-copper" />
            </div>
            <div>MarginPrint · in development</div>
            <div>Bennett Studio · app 01</div>
          </div>

          <PrintStack />
        </motion.div>
      </div>

      {/* Bottom — section index */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-ink/10 bg-bone/70 px-8 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink/50">
          <span>— Scroll · learn more below</span>
          <div className="hidden gap-7 md:flex">
            <span><span className="text-ink/25">01</span>&nbsp;&nbsp;The apps</span>
            <span><span className="text-ink/25">02</span>&nbsp;&nbsp;MarginPrint</span>
            <span><span className="text-ink/25">03</span>&nbsp;&nbsp;Pricing</span>
            <span><span className="text-ink/25">04</span>&nbsp;&nbsp;About</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Layered horizontal lines forming a vase-like silhouette — 3D print rising.
function PrintStack() {
  const layerCount = 170
  const lines = Array.from({ length: layerCount }, (_, i) => {
    const t = i / (layerCount - 1) // 0 at top, 1 at bottom
    // Vase profile: narrowest at top, widest a touch above middle, gentle taper to bottom.
    const profile = Math.sin(Math.PI * Math.pow(t, 0.85))
    const width = 0.12 + 0.78 * profile
    const opacity = 0.35 + 0.5 * profile
    return (
      <div
        key={i}
        className="bg-ink"
        style={{
          width: `${width * 100}%`,
          height: '1.5px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '2.5px',
          opacity,
        }}
      />
    )
  })
  return <div className="w-full max-w-[640px]">{lines}</div>
}

function GridBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
    />
  )
}

function Mark() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" className="text-ink">
      <rect x="0" y="3" width="10" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="8.5" width="14" height="3" rx="1.4" fill="currentColor" />
      <rect x="0" y="14" width="18" height="3" rx="1.4" fill="#B8451F" />
    </svg>
  )
}
