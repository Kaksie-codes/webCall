import { Socket } from "socket.io"; // Importing the Socket type from the Socket.IO library
import { v4 as uuidV4 } from "uuid"; // Importing the v4 function from the uuid library to generate UUIDs

// Defining the roomHandler function
export const roomHandler = (socket: Socket) => { 
    // Defining a function to create a new room
    const createRoom = () => { 
        // Generating a new UUID as the room ID
        const roomId = uuidV4(); 

        // Emitting a 'room-created' event with the room ID to the socket
        socket.emit("room-created", { roomId }); 
        console.log('A user created a new room...'); 
    };

    // Defining a function to join an existing room
    const joinRoom = ({ roomId }: { roomId: string }) => { 
        console.log(`A new user joined the room ${roomId}`); 
        
        // Joining the specified room using the socket
        socket.join(roomId); 
    };

    // Listening for 'create-room' event to create a new room
    socket.on('create-room', createRoom);

    // Listening for 'join-room' event to join an existing room
    socket.on('join-room', joinRoom);
};
