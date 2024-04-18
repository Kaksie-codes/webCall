import { useContext, useEffect } from "react"; // Importing necessary modules from React
import { useParams } from "react-router-dom"; // Importing the useParams hook from react-router-dom
import { RoomContext } from "../context/RoomContext"; // Importing the RoomContext from the context file
import VideoPlayer from "../components/VideoPlayer"; // Importing the VideoPlayer component

// Defining the RoomPage component
const RoomPage = () => {
    // Extracting the roomId parameter from the URL using useParams
    const { roomId } = useParams(); 

    // Extracting the WebSocket client, current user, and stream from the RoomContext
    const { webSocketClient, me, stream } = useContext(RoomContext); 

    // Executing side effects after the component renders
    useEffect(() => { 
        // Emitting a 'join-room' event with the roomId and current user's ID to the WebSocket client
        if(me){
            console.log('me, >>', me)
            console.log('me.id, >>', me._id)
            webSocketClient.emit('join-room', { roomId, peerId: me._id }); 
        }
        
    }, [roomId, me, webSocketClient]); // Specifying roomId, me, and webSocketClient as dependencies to re-run the effect when they change

    // Returning the JSX for the RoomPage component
    return (
        <div>
            RoomPage             
            <h1>roomid: {roomId}</h1>            
            <h1>userid: {me && me._id}</h1>            
            <div>
                <VideoPlayer stream={stream}/>
            </div>
        </div>
    );
};

// Exporting the RoomPage component as the default export
export default RoomPage;
