import { Message } from "../types/chat"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"


const ChatSection:React.FC = ({}) => {
    const messages:Message[] = [
        {
            content: 'Message 1',
            author: "Galentzy",
            timestamp:''
        },
        {
            content: 'Message 2',
            author: "Duron",
            timestamp:''
        },
        {
            content: 'Message 3',
            author: "Mambeya",
            timestamp:''
        },
    ]
  return (
    <div className="flex flex-col h-full justify-between">
        <div>
            {
                messages.map((message) => (
                    <ChatBubble message={message}/>
                ))
            }
        </div>
        <ChatInput/>
    </div>
  )
}

export default ChatSection