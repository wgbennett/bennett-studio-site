import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// A thin copper line that briefly traces the top edge of a card when it
// scrolls into view — the card "powering on." Re-fires on re-entry, so
// scrolling back up plays it again.
//
// Drop inside a position:relative parent. pointer-events:none so it never
// blocks interaction. Respects prefers-reduced-motion (renders nothing).
export default function CardEdgeHighlight({ delay = 0, color }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  // Inset only VERTICALLY ('-60px 0px'): fire when the card is ~60px into the
  // viewport, but never shrink the detection zone horizontally. The old
  // all-sides '-60px' excluded the left-column cards (their left edge sits
  // ~32px from the viewport on non-wide screens, inside the 60px inset), so
  // their pulse never fired. The detection element below is a full-width,
  // non-transformed sentinel — separate from the scaled line — so a scaleX:0
  // state can't collapse it to zero area and break the observer.
  const inView = useInView(ref, { once: false, margin: '-60px 0px' })

  if (reduced) return null

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px"
    >
      <motion.span
        className={`block h-full w-full origin-left ${color ?? 'bg-copper'}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          inView
            ? { scaleX: 1, opacity: [0, 1, 0] }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          scaleX: { duration: 0.7, ease: 'easeOut', delay },
          opacity: { duration: 1.2, times: [0, 0.35, 1], delay },
        }}
      />
    </span>
  )
}
