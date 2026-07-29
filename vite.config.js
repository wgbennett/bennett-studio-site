import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `npm run build` is three steps: client build → SSR build → prerender.
// scripts/prerender.mjs emits a flat HTML file per route (dist/marginprint.html,
// …), which Pages matches directly. public/_redirects deliberately has no `/*`
// catch-all — see the comments in that file before adding one, the precedence
// is not what you'd guess.
//
// Do NOT add a 404.html: Pages falls back to index.html for unmatched paths
// only while no 404.html exists, and that fallback is what serves deep links.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    open: true,
  },
})
