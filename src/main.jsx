import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Prerendered routes (see scripts/prerender.mjs) ship real markup inside #root,
// so we hydrate it rather than throwing it away and repainting. Any route
// without a prerendered file still lands on the SPA shell, where #root is
// empty and a fresh createRoot is correct.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, tree)
} else {
  ReactDOM.createRoot(root).render(tree)
}
