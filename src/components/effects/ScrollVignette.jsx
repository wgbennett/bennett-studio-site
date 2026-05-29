import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

// A soft radial darkening at the page edges that intensifies as the user
// scrolls and decays to nothing at rest. Center of the viewport stays
// fully clear; only the corners pick up tone, so foreground content is
// never obstructed.
//
// Renders as a fixed full-screen overlay below modal layers. pointer-
// events:none so it can't intercept clicks. Returns null under prefers-
// reduced-motion.
export default function ScrollVignette() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const rawVelocity = useVelocity(scrollY)
  // Spring-smoothed so the vignette eases in and out rather than spiking
  // on every scroll-wheel tick. Tuned for ~150ms attack, ~400ms release.
  const smoothed = useSpring(rawVelocity, {
    damping: 38,
    stiffness: 110,
    mass: 0.45,
  })
  // |velocity| (px/s) → opacity. Capped at 0.32 so even a hard flick
  // never produces a heavy frame. 5000px/s feels like a fast scroll.
  const opacity = useTransform(smoothed, (v) => Math.min(0.32, Math.abs(v) / 5000))

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-0 z-50"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(26,26,26,0.9) 100%)',
        }}
      />
    </motion.div>
  )
}
