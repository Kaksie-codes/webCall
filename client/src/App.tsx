import SocketIO  from 'socket.io-client'
import './App.css'
import { useEffect } from 'react'


const WS = 'http://localhost:8080';

function App() {
  useEffect(() => {
    SocketIO(WS)
  }, [])

  return (
    <>
      <h1 className='text-green-500'>Kaulture</h1>
        
    </>
  )
}

export default App
