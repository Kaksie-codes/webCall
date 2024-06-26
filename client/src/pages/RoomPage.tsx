import { useContext, useEffect } from "react"; // Importing necessary modules from React
import { useParams } from "react-router-dom"; // Importing the useParams hook from react-router-dom
import { RoomContext } from "../context/RoomContext"; // Importing the RoomContext from the context file
import VideoPlayer from "../components/VideoPlayer"; // Importing the VideoPlayer component
import { PeerState } from "../reducers/peerReducer/peerReducer";
import ShareScreenButton from "../components/ShareScreenButton";
import ChatSection from "../components/ChatSection";
import ChatButton from "../components/ChatButton";

// Defining the RoomPage component
const RoomPage = () => {
    // Extracting the roomId parameter from the URL using useParams
    const { roomId } = useParams(); 

    // Extracting the WebSocket client, current user, and stream from the RoomContext
    const { 
        webSocketClient, 
        me, 
        stream, 
        peers, 
        shareScreen, 
        screenSharingId, 
        chat, 
        setRoomId, 
        toggleChatVisibility 
    } = useContext(RoomContext); 

    // console.log('screenSharingId ---->>', screenSharingId);

    // Executing side effects after the component renders
    useEffect(() => { 
        // Emitting a 'join-room' event with the roomId and current user's ID to the WebSocket client
        if(me){  
            console.log('me on roompage ---->>', me)
            me.on('open', (id:string) => {
                console.log('My peer ID is: ' + id);
                webSocketClient.emit('join-room', { roomId, peerId: me._id }); 
            });          
            // webSocketClient.emit('join-room', { roomId, peerId: me._id }); 
        }
        
    }, [roomId, me, webSocketClient]); // Specifying roomId, me, and webSocketClient as dependencies to re-run the effect when they change

    const screenSharingVideo = screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;

    const {[screenSharingId]:sharing, ...peersToShow} = peers;

    useEffect(() => {
        setRoomId(roomId);
    }, [roomId, setRoomId])

    // Returning the JSX for the RoomPage component
    return (
        <div className="flex flex-col min-h-screen">                        
            <h1 className="bg-red-500 text-white p-4">roomid: {roomId}</h1>            
            <h1>userid: {me && me._id}</h1>   
            <div className="flex grow">
                {
                    screenSharingVideo && (
                        <div className="w-4/5 pr-4">
                            <VideoPlayer stream={screenSharingVideo}/>
                        </div>
                    )
                }
                <div className={`${screenSharingVideo ? 'w-1/5 grid-col-1' : 'grid grid-cols-4 gap-4'}`}>
                    {
                        screenSharingId !== me?.id && (
                            <VideoPlayer stream={stream}/>
                        )
                    } 
                    {
                        Object.values(peersToShow as PeerState).map((peer, index) => {
                            return <VideoPlayer stream={peer.stream} key={index}/>
                        })
                    }
                </div>
                {
                    chat.isChatOpen && 
                    <div className="border-l-2 pb-28 ">
                        <ChatSection/>
                    </div>
                }                
            </div> 
            <div className="h-28 fixed w-full text-center items-center bottom-0 p-6 border-t-2 bg-white">
                <ShareScreenButton onClick={shareScreen}/>
                <ChatButton onClick={toggleChatVisibility}/>
            </div>
        </div>
    );
};

// Exporting the RoomPage component as the default export
export default RoomPage;
