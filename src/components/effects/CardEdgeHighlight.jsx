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
  const inView = useInView(ref, { once: false, margin: '-60px' })

  if (reduced) return null

  return (
    <motion.span
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute left-0 right-0 top-0 h-px origin-left ${
        color ?? 'bg-copper'
      }`}
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
  )
}
