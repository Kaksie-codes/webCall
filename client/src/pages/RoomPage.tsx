import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext";


const RoomPage = () => {
    const { roomId } = useParams();
    const { webSocket} = useContext(RoomContext);

    useEffect(() => {
        webSocket.emit('join-room', { roomId })
    }, [roomId])

  return (
    <div>RoomPage roomid: {roomId}</div>
  )
}

export default RoomPage