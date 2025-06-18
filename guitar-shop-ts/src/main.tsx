import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* En TypeScript, el signo de 
exclamación ! se conoce como operador 
de aserción no nulo o simplemente operador 
de aserción no nula. 
*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
