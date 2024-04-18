

import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import './App.css'

function App() {
  

  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/room/:roomId' element={<RoomPage/>}/>
        </Routes>    
    </div>
  )
}

export default App
