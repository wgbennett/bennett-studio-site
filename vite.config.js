import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Emit 404.html as a copy of the built index.html (the SPA shell). Cloudflare
// Pages serves 404.html for any path that isn't a real static asset, so making
// it the app shell means /marginprint, /marketday, and any deep link boot the
// router and render the right page instead of a dead "Not found". Runs inside
// `vite build` itself, so it works no matter how the host invokes the build
// (npm run build vs vite build). _redirects still provides the 200-status path
// if the Pages project's SPA fallback is ever honored.
function spaFallback() {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const dist = resolve(process.cwd(), 'dist')
      try {
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
      } catch (err) {
        this.warn(`spa-404-fallback: could not write 404.html — ${err.message}`)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  server: {
    port: 5180,
    open: true,
  },
})
