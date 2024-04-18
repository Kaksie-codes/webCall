import { useContext } from "react"
import { RoomContext } from "../context/RoomContext"


const JoinButton: React.FC = () => {
  const { webSocket } = useContext(RoomContext);

  const createRoom = () => {
    webSocket.emit("create-room");
  }

  return (
    <button 
      onClick={createRoom}
      className='bg-rose-400 py-2 px-8 rounded-md text-white text-xl hover:bg-rose-600'>
        Start new meeting
    </button>
  )
}

export default JoinButton