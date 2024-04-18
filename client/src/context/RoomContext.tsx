import { ReactNode, createContext, useEffect } from 'react'; // Importing necessary modules from React
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom
import SocketIOClient from 'socket.io-client'; // Importing the Socket.IO client library

// Defining the URL of the WebSocket server
const webSocketServer = 'http://localhost:8080'; 

// Defining the type for the children prop
interface RoomProviderProps {
    children: ReactNode; 
}

// Creating a context for managing room-related data
export const RoomContext = createContext<null | any>(null); 

// Creating a WebSocket client instance connected to the web server
const webSocketClient = SocketIOClient(webSocketServer); 

// Defining the RoomProvider component
export const RoomProvider = ({ children }: RoomProviderProps) => { 
    // Initializing the navigate function using the useNavigate hook
    const navigate = useNavigate();
    
    // Defining a function to enter a room
    const enterRoom = ({ roomId }: { roomId: string }) => { 
        console.log({roomId});

        // Navigating to the specified room
        navigate(`/room/${roomId}`); 
    };

    // Executing side effects after the component renders
    useEffect(() => { 
        // Listening for the 'room-created' event and calling enterRoom
        webSocketClient.on('room-created', enterRoom); 
    }, []); 

    return (
        <RoomContext.Provider value={{ webSocketClient }}> 
            {children}
        </RoomContext.Provider>
    );
};
