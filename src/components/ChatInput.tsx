import { useState } from "react"
import plusIcon from "../assets/icons/add.svg"
import micIcon from "../assets/icons/mic.svg"
import sendIcon from "../assets/icons/send.svg"

interface ChatInputProps {
  onSubmit: (message: string) => void
  placeholder?: string
  className?: string
}

export function ChatInput({ onSubmit, placeholder = "Ask anything to wise owl", className = "" }: ChatInputProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex items-center gap-3 bg-white/80 rounded-full px-4 py-3 border border-white/60 floating-input">
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white shadow-md"
        >
          <img src={plusIcon} alt="Add attachment" className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
        />
        <button type="button" className="p-2 text-sky-500 hover:text-sky-600">
          <img src={micIcon} alt="Voice input" className="w-5 h-5" />
        </button>
        <button type="submit" className="p-2 text-sky-500 hover:text-sky-600">
          <img src={sendIcon} alt="Send message" className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}

