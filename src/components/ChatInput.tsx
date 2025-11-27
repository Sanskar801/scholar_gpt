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
            <div className="flex items-center gap-2 sm:gap-3 bg-white/80 rounded-full px-3 sm:px-4 py-2.5 sm:py-3 border border-white/60 floating-input shadow-sm">
                <button
                    type="button"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white shadow-md flex-shrink-0"
                    aria-label="Add attachment"
                >
                    <img src={plusIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base min-w-0"
                />
                <button
                    type="button"
                    className="p-1.5 sm:p-2 text-sky-500 hover:text-sky-600 flex-shrink-0"
                    aria-label="Voice input"
                >
                    <img src={micIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                    type="submit"
                    className="p-1.5 sm:p-2 text-sky-500 hover:text-sky-600 flex-shrink-0"
                    aria-label="Send message"
                >
                    <img src={sendIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
        </form>
    )
}