import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // <-- Importá BrowserRouter
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/pokemon---pokedex"> {/* <-- Agregá basename */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
