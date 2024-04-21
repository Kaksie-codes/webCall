import { ReactNode, createContext, useEffect, useState, useReducer } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import SocketIOClient from 'socket.io-client'; 
import Peer from 'peerjs'; 
import { v4 as uuidV4 } from 'uuid'; 
import { peersReducer } from '../reducers/peerReducer/peerReducer'; 
import { addPeerAction, removePeerAction } from '../reducers/peerReducer/peerActions'; 
import { Message } from '../types/chat';
import { chatReducer } from '../reducers/chatReducer/chatReducer';
import { addHistoryAction, addMessageAction, toggleChatAction } from '../reducers/chatReducer/chatActions';

const webSocketServer = 'http://localhost:8080'; 

interface RoomProviderProps {
    children: ReactNode; 
}

export const RoomContext = createContext<null | any>(null); 

const webSocketClient = SocketIOClient(webSocketServer); 

export const RoomProvider = ({ children }: RoomProviderProps) => {      
    const navigate = useNavigate();
    const [me, setMe] = useState<Peer | null>(null); 
    const [stream, setStream] = useState<MediaStream | null>(null); 
    const [peers, dispatch] = useReducer(peersReducer, {}); 
    const [chat, chatDispatch] = useReducer(chatReducer, {
        messages: [],
        isChatOpen: false,
    })
    const [screenSharingId, setScreenSharingId] = useState<string>('');
    const [roomId, setRoomId] = useState<string>("")

    const enterRoom = ({ roomId }: { roomId: string }) => { 
        navigate(`/room/${roomId}`); 
    };

    const getRoomies = ({ participants }: { participants: string[] }) => {
        console.log({ participants });
    }

    const removePeer = (peerId:string) => {
        dispatch(removePeerAction(peerId));
    }   
    
    const shareScreen = () => {
        if(screenSharingId){
            navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(switchStream)
        }else{
            navigator.mediaDevices.getDisplayMedia({}) // Request only video for screen sharing
            .then(switchStream)
            .catch((error) => {
                console.error('Error accessing screen sharing stream:', error);                
            });
        }            
    };

    const switchStream = (stream: MediaStream) => {
        setStream(stream);
        setScreenSharingId(me?.id || "");         
        Object.values(me?.connections).forEach(((connection:any) => {
            const videoTrack = stream?.getTracks().find(track => track.kind === 'video');
            connection[0].peerConnection.getSenders()[1].replaceTrack(videoTrack)
            .catch((err:any) => console.log(err))
        }))
    }

    const sendMessage = (message:string) => {
        const messageData:Message = {
            content: message,
            author: me?.id,
            timestamp: new Date().getTime()
        }
        webSocketClient.emit('create-message', roomId, messageData);
    }

    const addMessage = (message:Message) => {
        console.log('message recieved')
        console.log({message})
        chatDispatch(addMessageAction(message))
    }

    const addHistory = (messages:Message[]) => {
        chatDispatch(addHistoryAction(messages));
    }
    
    const toggleChatVisibility = () => {
        chatDispatch(toggleChatAction(!chat.isChatOpen));
    }

    useEffect(() => {
         const myId = uuidV4();
         const peer = new Peer(myId);
         setMe(peer);
    }, [])

    useEffect(() => {   
        if(me !== null){
            try {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);

                    me.on("call", (call) => {
                        console.log(`receiving call from peer already in the room ------>>`, call)
                        call.answer(stream);
                        call.on('stream', (peerStream) => {
                            dispatch(addPeerAction(call.peer, peerStream));
                        })
                    })

                    webSocketClient.on("user-joined", ({ peerId }) => {
                        console.log('new user joined ---->>', peerId);
                        const call = me.call(peerId, stream);
                        call.on("stream", (peerStream) => {
                            console.log('calling the new peer --->>', peerStream);
                            dispatch(addPeerAction(peerId, peerStream)); 
                        })
                    })                    
                })
            } catch(error) {
                console.log(error);
            }

        webSocketClient.on('room-created', enterRoom); 
        webSocketClient.on('get-roomies', getRoomies); 
        webSocketClient.on("user-disconnected", removePeer);         
        webSocketClient.on("user-started-sharing", (peerId) => setScreenSharingId(peerId)); 
        webSocketClient.on("user-stopped-sharing", () => setScreenSharingId("")); 
        webSocketClient.on("message-created", addMessage); 
        webSocketClient.on("get-messages", addHistory); 

        // me.on('open', (id) => {
        //     console.log('My peer ID is: ' + id);
        //     webSocketClient.emit('join-room', { roomId, peerId: id }); 
        // });

        // Cleanup function to disconnect WebSocket client and destroy PeerJS instance when component unmounts
        return () => {
            webSocketClient.disconnect();
            me.destroy();
        };
        } 
    }, [me, webSocketClient]);    

    useEffect(() => {
        if(screenSharingId){
            webSocketClient.emit("start-sharing", { peerId:screenSharingId, roomId});
        }else{
            webSocketClient.emit("stop-sharing");
        }        
    }, [screenSharingId, roomId])    

    const contextValues = {
        webSocketClient, 
        me, 
        stream, 
        peers, 
        shareScreen, 
        screenSharingId, 
        setRoomId,
        sendMessage,
        chat,
        toggleChatVisibility
    }

    return (
        <RoomContext.Provider value={contextValues}> 
            {children}
        </RoomContext.Provider>
    );
};
