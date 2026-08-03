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
  // Stamped at build time and shown in the footer. The site has no users to
  // point at yet, so the honest substitute for social proof is evidence it is
  // alive — a date nobody typed by hand and nobody can forget to update.
  define: {
    __BUILD_DATE__: JSON.stringify(
      new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    ),
  },
  plugins: [react()],
  server: {
    port: 5180,
    open: true,
  },
})
