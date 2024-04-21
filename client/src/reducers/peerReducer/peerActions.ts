// Define action types for adding and removing peers
export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;

// Define an action creator function for adding a peer
export const addPeerAction = (peerId: string, stream:MediaStream) => ({
    type: ADD_PEER, // Action type for adding a peer
    payload:{ peerId, stream } // Payload containing the peer ID and stream
})

// Define an action creator function for removing a peer
export const removePeerAction = (peerId: string) => ({
    type: REMOVE_PEER, // Action type for removing a peer
    payload:{ peerId } // Payload containing the peer ID
})