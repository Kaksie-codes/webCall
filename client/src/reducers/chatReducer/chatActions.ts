import { Message } from "../../types/chat";

// Define action types for adding and removing peers
export const ADD_MESSAGE = "ADD_MESSAGE" as const;
export const ADD_HISTORY = "ADD_HISTORY" as const;
export const TOGGLE_CHAT_VISIBILITY = "TOGGLE_CHAT_VISIBILITY" as const;

// Define an action creator function for adding a peer
export const addMessageAction = (message:Message) => ({
    type: ADD_MESSAGE, // Action type for adding a message
    payload:{ message } // Payload containing the message
})

// Define an action creator function for removing a peer
export const addHistoryAction = (history:Message[]) => ({
    type: ADD_HISTORY, // Action type for removing a peer
    payload:{ history } // Payload containing the messages array
})

export const toggleChatAction = (isOpen:boolean) => ({
    type: TOGGLE_CHAT_VISIBILITY,
    payload:{isOpen}
})