import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Router-aware scroll behaviour shared by every page:
//   • new path  → jump to top (so /marginprint doesn't keep the landing scroll)
//   • #hash     → smooth-scroll to that section (handles "/#about",
//                 "/marginprint#pricing", same-page nav anchors, etc.)
// Respects prefers-reduced-motion by falling back to an instant jump.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (hash) {
      // Defer one frame so the target route has rendered before we look for it.
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
          return
        }
        window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
