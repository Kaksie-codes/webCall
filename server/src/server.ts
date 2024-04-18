import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'; // Socket.IO library for real-time, bidirectional communication
import { roomHandler } from './room/roomhandler';


const PORT = 8080;

// Create an express application
const app = express();

app.use(cors());

// Create an HTTP server using express app
const server = http.createServer(app);

// Initialize a web socket server with the created server
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET","POST"]
    }
});

// Start listening for requests on the specified port
server.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}...`);
});

// when client connects to our web signalling server
io.on('connection', (socket) => {
    console.log(' a user is connected');

    // handles all login related to a room
    roomHandler(socket);

    socket.on('disconnect', () => {
        console.log('user is disconnected ...');
    })
})