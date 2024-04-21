import { useState } from "react"


const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");
  return (
    <div>
        <form>
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