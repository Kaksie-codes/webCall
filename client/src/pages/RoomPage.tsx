import { useContext, useEffect } from "react"; // Importing necessary modules from React
import { useParams } from "react-router-dom"; // Importing the useParams hook from react-router-dom
import { RoomContext } from "../context/RoomContext"; // Importing the RoomContext from the context file

const RoomPage = () => {
    // Extracting the roomId parameter from the URL using useParams
    const { roomId } = useParams(); 

    // Extracting the WebSocket client from the RoomContext
    const { webSocketClient } = useContext(RoomContext); 

    // Executing side effects after the component renders
    useEffect(() => { 
        // Emitting a 'join-room' event with the roomId to the WebSocket client
        webSocketClient.emit('join-room', { roomId }); 
    }, [roomId]); // Specifying roomId as a dependency to re-run the effect when it changes

    return (
        <div>RoomPage roomid: {roomId}</div>
    );
};

export default RoomPage;
