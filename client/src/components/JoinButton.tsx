import { useContext } from "react"; // Importing the useContext hook from React
import { RoomContext } from "../context/RoomContext"; // Importing the RoomContext from the context file

const JoinButton: React.FC = () => { // Defining the JoinButton component as a function component
  const { webSocketClient } = useContext(RoomContext); // Extracting the WebSocket client from the RoomContext

  const createRoom = () => { // Defining a function to create a new room
    webSocketClient.emit("create-room"); // Emitting a 'create-room' event to the WebSocket client
  };

  return ( // Returning the JSX markup for the button
    <button 
      onClick={createRoom} // Attaching the createRoom function to the button's onClick event
      className='bg-rose-400 py-2 px-8 rounded-md text-white text-xl hover:bg-rose-600'>
        Start new meeting
    </button>
  );
};

export default JoinButton;
