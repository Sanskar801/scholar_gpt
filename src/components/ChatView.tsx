import { useState, useRef, useEffect } from "react"
import type { Chat, Message } from "../types/chat"
import shareIcon from "../assets/icons/share.svg"
import moreIcon from "../assets/icons/more.svg"
import wiseOwlIcon from "../assets/icons/wise-owl.svg"
import userIcon from "../assets/icons/user.svg"
import { ChatInput } from "./ChatInput"

interface ChatViewProps {
  chat: Chat
  onSendMessage: (content: string) => void
}

export function ChatView({ chat, onSendMessage }: ChatViewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat.messages])

  const handleSend = (content: string) => {
    onSendMessage(content)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <div className="flex-1 flex flex-col h-full relative z-10">
      {/* Chat Header Actions */}
      <div className="flex justify-end gap-2 p-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
          <img src={shareIcon} alt="Share chat" className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
          <img src={moreIcon} alt="More options" className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {chat.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-sky-100 flex items-center justify-center">
                <img src={wiseOwlIcon} alt="Wise Owl" className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                <span>Generating response....</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4">
        <ChatInput onSubmit={handleSend} className="max-w-3xl mx-auto" placeholder="Ask anything to wise owl" />
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end items-start gap-3">
        <div className="bg-sky-100 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
          <p className="text-gray-800">{message.content}</p>
        </div>
        {/* User avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-sky-100 flex items-center justify-center">
          <img src={userIcon} alt="User" className="w-4 h-4" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      {/* Owl avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-sky-100 flex items-center justify-center">
        <img src={wiseOwlIcon} alt="Wise Owl" className="w-5 h-5" />
      </div>
      <div className="flex-1 max-w-2xl">
        <div className="text-gray-800 whitespace-pre-wrap">{message.content}</div>
      </div>
    </div>
  )
}
