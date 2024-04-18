import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RoomProvider } from './context/RoomContext.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <RoomProvider>
        <App />
      </RoomProvider>
    </Router>
  </React.StrictMode>,
)
