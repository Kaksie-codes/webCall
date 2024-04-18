import { ADD_PEER, REMOVE_PEER } from "./peerActions";

// typecript type for our state
export type PeerState = Record<string, { stream: MediaStream }>;

// Define the action types
export type PeerAction =
    | {
          type: typeof ADD_PEER;
          payload: { peerId: string; stream: MediaStream };
      }
    | {
          type: typeof REMOVE_PEER;
          payload: { peerId: string };
      };

// Define the reducer function for managing the state of peers
export const peersReducer = (state: PeerState, action: PeerAction) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream,
                },
            };
        case REMOVE_PEER:
            const { [action.payload.peerId]: deleted, ...rest } = state;
            return rest;
        default: // return state without changes
            return { ... state };
    }
};
