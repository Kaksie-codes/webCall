import express from 'express'; // Importing the Express framework for building the web server
import http from 'http'; // Importing the HTTP module to create an HTTP server
import cors from 'cors'; // Importing CORS middleware to enable cross-origin resource sharing
import { Server } from 'socket.io'; // Importing the Socket.IO library for real-time, bidirectional communication
import { roomHandler } from './room/roomhandler'; // Importing a custom room handler module
// import { ExpressPeerServer } from 'peer';

const PORT = 8080; // Setting the port number for the server

// Create an express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Create an HTTP server using express app
const server = http.createServer(app);

// // Create a PeerJS server using the HTTP server
// const peerServer = ExpressPeerServer(server, {
//     path: "/peerjs",
//     // debug: true // Enable debugging for PeerJS server
// });

// // Use the PeerJS server middleware
// app.use('/peerjs', peerServer);

// Initialize a web socket server with the created server
const io = new Server(server, {
    cors: {
        origin: '*', // Allow requests from all origins
        methods: ["GET","POST"] // Allow GET and POST methods
    }
});

// Start listening for requests on the specified port
server.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}...`);
});

// Handle client connections to the web signalling server
io.on('connection', (socket) => {
    console.log('A user is connected');

    // Handle all login-related actions for a room
    roomHandler(socket, io);

    // Handle when a client closes the webpage or application
    socket.on('disconnect', () => {
        console.log('User is disconnected...');
    });
});
