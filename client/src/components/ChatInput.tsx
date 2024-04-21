import { FormEvent, useContext, useState } from "react"
import { RoomContext } from "../context/RoomContext";


const ChatInput: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage } = useContext(RoomContext);

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    // Trim the input value to remove leading and trailing whitespaces
    const trimmedMessage = message.trim(); // Store the trimmed message in a new variable
    
    // Check if the trimmed message is not empty
    if (trimmedMessage) { 
        sendMessage(trimmedMessage);
        
        // Clear the input field by resetting the message state
        setMessage(""); 
      }
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <textarea
                    value={message}
                    className="border rounded"
                    onChange={(e) => setMessage(e.target.value)}>
                </textarea>
                <button 
                    className='bg-rose-400 p-4 mx-2 rounded-md text-white text-xl hover:bg-rose-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                </button>
            </div>
        </form>
    </div>
  )
}

export default ChatInput