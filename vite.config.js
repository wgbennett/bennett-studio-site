import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run build` is three steps: client build → SSR build → prerender.
// scripts/prerender.mjs emits a flat HTML file per route (dist/marginprint.html,
// …); Cloudflare Pages serves those static files ahead of the
// public/_redirects catch-all, which must stay `/* /index.html 200` — see the
// comments in that file, the precedence is not what you'd guess.
//
// Do NOT add a 404.html: Pages serves a 404.html with a 404 status for
// unmatched routes if one exists, which shadows the _redirects 200 rewrite.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    open: true,
  },
})
