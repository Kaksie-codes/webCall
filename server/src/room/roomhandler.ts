import { Socket } from "socket.io"; // Importing the Socket type from the Socket.IO library
import { v4 as uuidV4 } from "uuid"; // Importing the v4 function from the uuid library to generate UUIDs

// Defining an interface for the parameters required to create or join a room
interface RoomParams {
    roomId: string,
    peerId: string,
}

// Defining a record to store room IDs as keys and arrays of participant IDs as values
const rooms: Record<string, string[]> = {}

// Defining the roomHandler function to handle socket events related to rooms
export const roomHandler = (socket: Socket) => {
    // Defining a function to create a new room
    const createRoom = () => {
        // Generating a new UUID as the room ID
        const roomId = uuidV4();

        // Initializing an empty array for the participants of the new room
        rooms[roomId] = []

        // Emitting a 'room-created' event with the room ID to the socket
        socket.emit("room-created", { roomId });
        console.log('A user created a new room...');
    };

    // Defining a function to join an existing room
    const joinRoom = ({ roomId, peerId }: RoomParams) => {
        // Checking if the room exists
        if (rooms[roomId]) {
            // Logging the joining of a new user to the room
            console.log(`A new user: ${peerId} joined the room ${roomId}`);

            // Adding the new user's ID to the participants array of the room
            rooms[roomId].push(peerId);

            // Joining the specified room using the socket
            socket.join(roomId);

            // Emitting a 'user-joined' event to all participants in the room
            socket.to(roomId).emit("user-joined", { peerId })

            // Emitting a 'get-roomies' event to provide information about participants in the room
            socket.emit('get-roomies', {
                roomId,
                participants: rooms[roomId]
            })

            // Listening for disconnection events to handle user leaving the room
            socket.on('disconnect', () => {
                console.log(`user: ${peerId} left the room ${roomId}`);
                leaveRoom({ roomId, peerId });
            })
        }
    };

    // Defining a function to handle a user leaving the room
    const leaveRoom = ({ peerId, roomId }: RoomParams) => {
        console.log('fucked');
        // Filtering out the user's ID from the participants array of the room
        rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);

        // Emitting a 'user-disconnected' event to notify other participants in the room
        socket.to(roomId).emit("user-disconnected", peerId)
    }

    const startSharing = ({peerId, roomId}: RoomParams) => {
        socket.to(roomId).emit("user-started-sharing", peerId);
    }

    const stopSharing = (roomId : string) => {
        socket.to(roomId).emit("user-stopped-sharing");
    }

    // Listening for 'create-room' event to create a new room
    socket.on('create-room', createRoom);

    // Listening for 'join-room' event to join an existing room
    socket.on('join-room', joinRoom);

    // Listening for 'stop-sharing' event to start screen sharing
    socket.on('start-sharing', startSharing);

    // Listening for 'stop-sharing' event to stop screen sharing
    socket.on('stop-sharing', stopSharing);
};
