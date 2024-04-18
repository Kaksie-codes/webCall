import { ReactNode, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketIOClient from 'socket.io-client';

const webServer = 'http://localhost:8080';

interface RoomProviderProps {
    children: ReactNode;
}

export const RoomContext = createContext<null | any>(null);

const webSocket = SocketIOClient(webServer);

export const RoomProvider = ({ children }: RoomProviderProps) => {
    const navigate = useNavigate()
    const enterRoom = ({ roomId } : { roomId: string }) => {
        console.log({roomId});    
        navigate(`/room/${roomId}`)    
    }

    useEffect(() => {
        webSocket.on('room-created', enterRoom)
    }, [])

    return (
        <RoomContext.Provider value={{ webSocket }}>
            {children}
        </RoomContext.Provider>
    );
}
