import SiteNav from './SiteNav.jsx'
import PhotoBackdrop from './PhotoBackdrop.jsx'

// Landing hero — a full-bleed photograph with the copy set over it.
//
// It used to be large type on flat bone beside an animated "print stack" (170
// stacked rules forming a vase silhouette). That composition was the single
// clearest reason the site read as generated: a big headline on an empty
// coloured field with a CSS ornament next to it is what every template looks
// like, and a visitor decides before reading a word. The photograph does the
// ornament's job — say what this is for — and does it in a way a template can't
// fake. The stack is gone rather than moved; it and its "now building / layer
// 247" HUD are in git history at fe6986d if it ever earns a place elsewhere.
//
// Everything sits on PhotoBackdrop, which also renders the designed placeholder
// while public/photos/hero-workshop.webp does not exist yet — so this layout is
// final and measured before the photography lands. See src/photos.js.
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink">
      <PhotoBackdrop
        slug="home"
        priority
        alt="A maker's workbench under warm light, a print in progress."
      />

      <SiteNav variant="overlay" cta={{ label: 'Start free →', href: '#apps' }} />

      {/* pt clears the overlay nav; pb clears the section index pinned to the
          bottom edge. Both are absolute, so the copy has to make its own room. */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-28 pt-32 lg:pb-24 lg:pt-28">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3 eyebrow text-bone/65">
            <span className="h-1.5 w-1.5 rounded-full bg-copper-light" />
            <span>Bennett Studio · independent software for makers</span>
          </div>

          <h1 className="display-hero text-bone">
            The business side,{' '}
            <span className="accent">handled.</span>
          </h1>

          <p className="lede mt-8 max-w-lg text-bone/80">
            Bennett Studio is four focused, mobile-first apps for people who
            sell what they make — <span className="font-semibold text-bone">MarginPrint</span> for
            3D-print shops, <span className="font-semibold text-bone">MarketDay</span> for
            in-person selling, <span className="font-semibold text-bone">BenchStock</span> for
            materials &amp; true cost, and{' '}
            <span className="font-semibold text-bone">MakerBooks</span> for the
            books. All four are{' '}
            <span className="text-copper-light">available now</span>.
          </p>

          {/* Honest studio-level trust signal — no metrics, no logos. */}
          <p className="mt-5 max-w-md font-mono text-[11px] leading-relaxed text-bone/55">
            Built by a working maker running a real 3D-print shop — the same
            tools I use behind my own table.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            {/* Inverted from the old hero: on a dark field the filled button is
                bone, and copper becomes the hover rather than the resting state
                (copper on ink is under 4.5:1 at this size — copper-light is the
                token that clears it, and it is reserved for text). */}
            <a
              href="#apps"
              className="group inline-flex items-center gap-2.5 bg-bone px-6 py-3.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:bg-copper hover:text-bone"
            >
              Explore the apps
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-2.5 border border-bone/35 px-6 py-3.5 font-mono text-[12px] uppercase tracking-wider text-bone transition-colors hover:border-bone hover:bg-bone/10"
            >
              About the maker
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom — section index. Hairline over the photo rather than a filled
          bar; the backdrop's bottom fade already separates it from what follows. */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-bone/15 px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[10px] uppercase tracking-wider text-bone/55">
          <span>— Scroll · learn more below</span>
          <div className="hidden gap-7 md:flex">
            <a href="#apps" className="hover:text-bone"><span className="text-bone/30">01</span>&nbsp;&nbsp;The apps</a>
            <a href="#about" className="hover:text-bone"><span className="text-bone/30">02</span>&nbsp;&nbsp;About</a>
            <a href="#contact" className="hover:text-bone"><span className="text-bone/30">03</span>&nbsp;&nbsp;From the bench</a>
          </div>
        </div>
      </div>
    </section>
  )
}
