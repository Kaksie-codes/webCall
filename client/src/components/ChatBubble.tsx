import { useContext } from "react"
import { Message } from "../types/chat"
import { RoomContext } from "../context/RoomContext"


const ChatBubble:React.FC <{message: Message}> = ({message}) => {
    const {me} = useContext(RoomContext);
    const itself = message.author === me?.id;

  return (
    <div className={`m-2 flex ${itself ? 'pl-10 justify-end' : 'pr-10 justify-start'}`}>
        <div className={`inline-block py-2 px-4 rounded ${itself ? 'bg-red-200' : 'bg-red-300'}`}>
            {message.content}
        </div>
    </div>
  )
}

export default ChatBubble