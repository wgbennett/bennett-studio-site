// "From the bench" — a showcase of real prints off Will's own printers, placed
// right after About so the maker story flows: here's the person → here's the work.
// Two rows auto-scroll in opposite directions. Each row duplicates its cards and
// every card carries its own right-margin, so translateX(-50%) lands exactly one
// set over — a seamless loop with no seam gap. Pauses on hover; honors
// prefers-reduced-motion (rows sit static); the Pause button covers keyboard and
// touch users (WCAG 2.2.2 — moving content needs a pause control, hover isn't
// one). Charcoal band = colorful prints pop.

import { useState } from 'react'
import { Play, Pause } from 'lucide-react'

const PRINTS = Array.from({ length: 16 }, (_, i) =>
  `/prints/print-${String(i + 1).padStart(2, '0')}.jpg`
)

function MarqueeRow({ imgs, dir, paused, className = '' }) {
  const anim = dir === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
  const doubled = [...imgs, ...imgs]
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className={`flex shrink-0 ${anim} motion-reduce:animate-none group-hover:[animation-play-state:paused]`}
        style={paused ? { animationPlayState: 'paused' } : undefined}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="mr-4 aspect-[4/5] w-[148px] shrink-0 overflow-hidden border border-bone/10 bg-ink sm:w-[176px] lg:mr-5 lg:w-[208px]"
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PrintShowcase() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative overflow-hidden border-t border-bone/10 bg-charcoal py-20 lg:py-28">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-7xl px-8 lg:mb-14">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 eyebrow text-copper-light">
            <span className="h-1.5 w-1.5 rounded-full bg-copper-light" />
            <span>From the bench</span>
          </div>
          <button
            type="button"
            onClick={() => setPaused(p => !p)}
            aria-pressed={paused}
            className="relative z-20 border border-bone/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-bone/70 transition-colors hover:border-bone/40 hover:text-bone"
          >
            <span className="inline-flex items-center gap-1.5">{paused ? <><Play size={11} /> Play</> : <><Pause size={11} /> Pause</>}</span>
          </button>
        </div>
        <h2 className="max-w-3xl display-section text-bone">
          A few things I&rsquo;ve printed.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone/55">
          Real prints off my own printers — the kind of work Bennett Studio's
          apps were built to cost, queue, sell, and keep track of.
        </p>
      </div>

      {/* Two opposing marquee rows */}
      <MarqueeRow imgs={PRINTS.slice(0, 8)} dir="left" paused={paused} />
      <MarqueeRow imgs={PRINTS.slice(8, 16)} dir="right" paused={paused} className="mt-4 lg:mt-5" />

      {/* Edge fades into the charcoal */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-charcoal to-transparent lg:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-charcoal to-transparent lg:w-32" />
    </section>
  )
}
