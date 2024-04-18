import React from 'react'; // Importing React library
import ReactDOM from 'react-dom/client'; // Importing ReactDOM from the client module
import App from './App.tsx'; // Importing the root component of the application
import { RoomProvider } from './context/RoomContext.tsx'; // Importing the RoomProvider from the context file
import { BrowserRouter as Router } from 'react-router-dom'; // Importing BrowserRouter for routing
import './index.css'; // Importing CSS file for styling

// Rendering the root component of the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router> {/* Wrapping the entire application with BrowserRouter for routing */}
      <RoomProvider> {/* Providing RoomContext for the application */}
        <App /> {/* Rendering the root component of the application */}
      </RoomProvider>
    </Router>
  </React.StrictMode>, // Enabling strict mode for the application
);
