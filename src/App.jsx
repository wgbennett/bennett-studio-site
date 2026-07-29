import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import ScrollManager from './components/ScrollManager.jsx'
import ScrollVignette from './components/effects/ScrollVignette.jsx'
import Landing from './pages/Landing.jsx'

// Landing is the entry point, so it loads eagerly. The two app deep-dives
// (each pulling in framer-motion demos) are split into their own chunks and
// fetched only when their route is visited.
const MarginPrintPage = lazy(() => import('./pages/MarginPrintPage.jsx'))
const MarketDayPage = lazy(() => import('./pages/MarketDayPage.jsx'))
const BenchstockPage = lazy(() => import('./pages/BenchstockPage.jsx'))
const MakerBooksPage = lazy(() => import('./pages/MakerBooksPage.jsx'))

export default function App() {
  return (
    <main className="min-h-screen bg-bone text-ink antialiased">
      <ScrollVignette />
      <ScrollManager />
      <Suspense fallback={<div className="min-h-screen bg-bone" />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/marginprint" element={<MarginPrintPage />} />
          <Route path="/marketday" element={<MarketDayPage />} />
          <Route path="/benchstock" element={<BenchstockPage />} />
          <Route path="/maker-books" element={<MakerBooksPage />} />
          {/* Alias: the app's own spelling / subdomain is "makerbooks" (no hyphen). */}
          <Route path="/makerbooks" element={<Navigate to="/maker-books" replace />} />
          {/* Unknown paths fall back to the studio landing. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  )
}

// Cloudflare Pages serves the prerendered index.html — i.e. landing markup —
// for any path the router doesn't know (see public/_redirects). Rendering
// <Navigate> here would return null on the first client render and mismatch
// that markup, so React would throw the whole prerendered tree away and
// re-render from scratch (error #422). Rendering <Landing /> matches what the
// server sent, hydration succeeds, and the URL is corrected a tick later as an
// ordinary client-side transition.
function NotFound() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/', { replace: true })
  }, [navigate])
  return <Landing />
}
