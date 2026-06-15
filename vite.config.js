import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA routing on Cloudflare Pages is handled by public/_redirects
// (`/* /index.html 200`). Do NOT add a 404.html: Pages serves a 404.html with
// a 404 status for unmatched routes if one exists, which shadows the _redirects
// 200 rewrite. With no 404.html, _redirects serves index.html at 200 for
// /marginprint, /marketday, and any deep link.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    open: true,
  },
})
