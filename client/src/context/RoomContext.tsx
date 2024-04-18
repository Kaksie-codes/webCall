import { ReactNode, createContext, useEffect, useState, useReducer } from 'react'; // Importing necessary modules from React
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import SocketIOClient from 'socket.io-client'; // Importing the Socket.IO client library
import Peer from 'peerjs'; // Importing the PeerJS library
// import Peer from 'peer'
import { v4 as uuidV4 } from 'uuid'; // Importing the v4 function from the uuid library to generate UUIDs
import { peersReducer } from './peerReducers'; // Importing the peersReducer function from the peerReducers file
import { addPeerAction } from './peerActions'; // Importing the addPeerAction function from the peerActions file

// Defining the URL of the WebSocket server
const webSocketServer = 'http://localhost:8080'; 

// Defining the type for the children prop
interface RoomProviderProps {
    children: ReactNode; // Defining the children prop type as ReactNode
}

// Creating a context for managing room-related data
export const RoomContext = createContext<null | any>(null); // Creating a context for room-related data

// Creating a WebSocket client instance connected to the web server
const webSocketClient = SocketIOClient(webSocketServer); 

// Defining the RoomProvider component
export const RoomProvider = ({ children }: RoomProviderProps) => { 
    // Initializing the navigate function using the useNavigate hook
    const navigate = useNavigate();

    const [me, setMe] = useState<Peer>(); // State hook to store the Peer instance representing the current user
    const [stream, setStream] = useState<MediaStream>(); // State hook to store the user's media stream
    const [peers, dispatch] = useReducer(peersReducer, {}); // State hook to manage the peers using the peersReducer function

    // Defining a function to enter a room
    const enterRoom = ({ roomId }: { roomId: string }) => { 
        console.log({roomId});

        // Navigating to the specified room
        navigate(`/room/${roomId}`); 
    };

    // Defining a function to get the participants of a room
    const getRoomies = ({ participants }: { participants: string[] }) => {
        console.log({ participants });
    }
    
    // Executing side effects after the component renders
    useEffect(() => { 
        // Generating a unique ID for the current user
        const myId = uuidV4();
        // Creating a new Peer instance with the generated ID
        const peer = new Peer(myId);

        // Initialize a Peer object for WebRTC connections
        // const peer = new Peer(myId, {
        //     host: '/', // Change this to your backend host
        //     port: 8080, // Change this to your backend port
        //     path: '/peerjs', // Change this to your custom PeerJS path
        // });

        // Setting the current user's Peer instance
        setMe(peer);

        try {
            // Attempting to get access to the user's media (video and audio)
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                // Setting the user's media stream
                setStream(mediaStream);
            })
        } catch(error) {
            console.log(error);
        }

        // Listening for the 'room-created' event and calling enterRoom and getRoomies
        webSocketClient.on('room-created', enterRoom); 
        webSocketClient.on('get-roomies', getRoomies); 

        // return () => {
        //     // Clean up Peer object when component unmounts
        //     if (me) {
        //         me.disconnect();
        //         me.destroy();
        //     }
        // };
    }, []); 

    useEffect(() => {
        if(!me) return;
        if (!stream) return

        // Listening for when any user joins our room, then call the user
        webSocketClient.on("user-joined", ({ peerId }) => {
            console.log('peerId to be called ------>>', peerId);
            
            // Initiating a call to the user who joined our room and sending our stream
            const call = me.call(peerId, stream);
            
            // Handling the stream received from the other user
            call.on("stream", (peerStream) => {
                console.log('call stream ------>>', peerStream);
                // Dispatching an action to add the peer to the state
                dispatch(addPeerAction(peerId, peerStream)); 
            })
        })

        // Answering the call from any user in our room
        me.on("call", (call) => {
            console.log('call recieved ------>>', call);
            call.answer(stream);
            call.on('stream', (peerStream) => {
                // Dispatching an action to add the peer to the state
                dispatch(addPeerAction(call.peer, peerStream));
            })
        })
    }, [me, stream])

    console.log({peers})

    // Returning the RoomContext Provider with the provided values
    return (
        <RoomContext.Provider value={{ webSocketClient, me, stream }}> 
            {children}
        </RoomContext.Provider>
    );
};
