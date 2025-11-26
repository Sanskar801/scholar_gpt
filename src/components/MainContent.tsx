import type React from "react"

import { useState } from "react"
import plusIcon from "../assets/icons/plus.svg"
import micIcon from "../assets/icons/mic.svg"
import sendIcon from "../assets/icons/send.svg"
import wiseOwlImage from "../assets/images/wise-owl.png"
import plusShape from "../assets/images/plus.png"
import equalsShape from "../assets/images/equals.png"
import divideShape from "../assets/images/divide.png"
import multiplicationShape from "../assets/images/multiplication.png"
import mathsImg from "../assets/images/maths.png"
import quizImg from "../assets/images/quiz.png"
import scienceImg from "../assets/images/science.png"

interface MainContentProps {
  onSendMessage: (content: string) => void
}

export function MainContent({ onSendMessage }: MainContentProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const quickActions = ["Homework Help", "Revise Topic", "Science Lab", "Take a Quiz"]

  const backgroundImages = [
    { src: mathsImg, className: "top-6 left-6 w-52 rotate-[-8deg]" },
    { src: quizImg, className: "top-16 right-16 w-48 rotate-[6deg]" },
    { src: scienceImg, className: "bottom-20 right-12 w-56 rotate-[4deg]" },
    { src: plusShape, className: "top-1/3 left-12 w-12 rotate-[-15deg]" },
    { src: equalsShape, className: "top-1/2 right-1/4 w-14 rotate-[10deg]" },
    { src: divideShape, className: "bottom-32 left-1/3 w-16 rotate-[-6deg]" },
    { src: multiplicationShape, className: "bottom-12 left-10 w-18 rotate-[8deg]" },
  ]

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 pointer-events-none select-none opacity-45">
        {backgroundImages.map((image, index) => (
          <img key={`${image.src}-${index}`} src={image.src} className={`absolute ${image.className}`} alt="" loading="lazy" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-8 gap-6">
        <div className="mb-2 drop-shadow-md">
          <img src={wiseOwlImage} alt="Wise Owl Mascot" className="w-32 h-40 object-contain" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome back, <span className="text-gradient">Sanskar J</span>
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="flex items-center gap-3 bg-white/70 rounded-full px-4 py-3 border border-white/60 floating-input">
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white shadow-md"
            >
              <img src={plusIcon} alt="Add attachment" className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything to wise owl"
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

        <div className="flex flex-wrap justify-center gap-3">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => onSendMessage(action)}
              className="px-5 py-2 bg-white/80 rounded-full text-gray-700 text-sm font-semibold shadow-sm border border-white/60 hover:bg-white transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
