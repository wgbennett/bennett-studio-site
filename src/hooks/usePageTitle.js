import { useEffect } from 'react'

// Sets document.title for the active route and restores the previous title on
// unmount. Client-side only — social/crawler OG still comes from the static
// index.html (no SSR here), so this is for browser tabs, history, and bookmarks.
export default function usePageTitle(title) {
  useEffect(() => {
    if (!title) return
    const prev = document.title
    document.title = title
    return () => {
      document.title = prev
    }
  }, [title])
}
