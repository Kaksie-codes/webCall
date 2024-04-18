import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

export const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = uuidV4();        
        socket.emit("room-created", { roomId })
        console.log('a user created a new room...');
    }
    const joinRoom = ({ roomId } : { roomId: string}) => {
        console.log(`a new user joined the room ${roomId}'`);
        socket.join(roomId);
    }

    
    // for creating a new room
    socket.on('create-room', createRoom)

    // for joining an already existing room
    socket.on('join-room', joinRoom)
}

