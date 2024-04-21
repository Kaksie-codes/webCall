import { useContext } from "react"
import { Message } from "../types/chat"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import { RoomContext } from "../context/RoomContext"

const ChatSection: React.FC = () => {
    const { chat } = useContext(RoomContext);

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                {chat?.messages && chat.messages.map((message: Message, index: number) => (
                    <ChatBubble message={message} key={index} />
                ))}
            </div>
            <ChatInput />
        </div>
    )
}

export default ChatSection
