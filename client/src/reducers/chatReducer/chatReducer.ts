import { Message } from "../../types/chat";
import { ADD_MESSAGE, ADD_HISTORY, TOGGLE_CHAT_VISIBILITY } from "./chatActions";

// typecript type for our state
export type ChatState = {
    messages: Message[];
    isChatOpen:boolean;
};

// Define the action types
export type ChatAction =
    | {
          type: typeof ADD_MESSAGE;
          payload: { message: Message };
      }
    | {
          type: typeof ADD_HISTORY;
          payload: { history: Message[] };
      }
    | {
          type: typeof TOGGLE_CHAT_VISIBILITY;
          payload: { isOpen: boolean };
      }

// Define the reducer function for managing the state of peers
export const chatReducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            };
        case ADD_HISTORY:
            return {
                ...state,
                messages: action.payload.history
            };
        case TOGGLE_CHAT_VISIBILITY:
            return {
                ...state,
                isChatOpen: action.payload.isOpen
            }
        default: // return state without changes
            return { ... state };
    }
};
