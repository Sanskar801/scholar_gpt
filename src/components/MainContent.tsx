import wiseOwlImage from "../assets/images/wise-owl.png"
import plusShape from "../assets/images/plus.png"
import equalsShape from "../assets/images/equals.png"
import divideShape from "../assets/images/divide.png"
import multiplicationShape from "../assets/images/multiplication.png"
import mathsImg from "../assets/images/maths.png"
import quizImg from "../assets/images/quiz.png"
import scienceImg from "../assets/images/science.png"
import { ChatInput } from "./ChatInput"

interface MainContentProps {
    onSendMessage: (content: string) => void
}

export function MainContent({ onSendMessage }: MainContentProps) {
    const handleSend = (content: string) => {
        onSendMessage(content)
    }

    const quickActions = ["Homework Help", "Revise Topic", "Science Lab", "Take a Quiz"]

    const backgroundImages = [
        { src: mathsImg, className: "top-6 left-6 w-40 sm:w-52 rotate-[-8deg]" },
        { src: quizImg, className: "top-16 right-6 sm:right-16 w-36 sm:w-48 rotate-[6deg]" },
        { src: scienceImg, className: "bottom-20 right-6 sm:right-12 w-44 sm:w-56 rotate-[4deg]" },
        { src: plusShape, className: "top-1/3 left-6 sm:left-12 w-8 sm:w-12 rotate-[-15deg]" },
        { src: equalsShape, className: "top-1/2 right-1/4 w-10 sm:w-14 rotate-[10deg]" },
        { src: divideShape, className: "bottom-32 left-1/4 sm:left-1/3 w-12 sm:w-16 rotate-[-6deg]" },
        { src: multiplicationShape, className: "bottom-12 left-6 sm:left-10 w-14 sm:w-18 rotate-[8deg]" },
    ]

    return (
        <div className="flex-1 relative overflow-y-auto">
            {/* Background Images */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-30 sm:opacity-45">
                {backgroundImages.map((image, index) => (
                    <img
                        key={`${image.src}-${index}`}
                        src={image.src}
                        className={`absolute ${image.className} transition-all duration-300`}
                        alt=""
                        loading="lazy"
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-full p-4 sm:p-8 gap-4 sm:gap-6">
                <div className="mb-2 drop-shadow-md">
                    <img src={wiseOwlImage} alt="Wise Owl Mascot" className="w-24 h-32 sm:w-32 sm:h-40 object-contain" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center px-4">
                    Welcome back, <span>Sanskar J</span>
                </h1>

                {/* Updated: Added mx-auto and removed px-4 for perfect centering */}
                <ChatInput
                    onSubmit={handleSend}
                    className="w-full max-w-2xl mx-auto"
                    placeholder="Ask anything to wise owl"
                />

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                    {quickActions.map((action) => (
                        <button
                            key={action}
                            onClick={() => onSendMessage(action)}
                            className="px-4 sm:px-5 py-2 bg-white/80 rounded-full text-gray-700 text-xs sm:text-sm font-semibold shadow-sm border border-white/60 hover:bg-white transition-colors"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}