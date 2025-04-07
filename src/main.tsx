import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/*

<input
              value={newInput}
              onChange={e => setNewInput(e.target.value)}
              id="item"
            ></input>

*/