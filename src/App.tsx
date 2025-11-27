import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { ChatView } from "./components/ChatView"
import { MainContent } from "./components/MainContent"
import { TabBar } from "./components/TabBar"
import type { Tab, Chat } from "./types/chat"

export default function Home() {
    const [tabs, setTabs] = useState<Tab[]>([{ id: "home", title: "Home", type: "home" }])
    const [activeTab, setActiveTab] = useState("home")
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    
    const [chats, setChats] = useState<Chat[]>([
        {
            id: "maths-homework",
            title: "Maths homework",
            messages: [
                { 
                    id: "m1", 
                    role: "user", 
                    content: "Can you help me solve this quadratic equation: x^2 - 5x + 6 = 0?" 
                },
                {
                    id: "m2",
                    role: "assistant",
                    content: `I'd be happy to help you solve that quadratic equation!

To solve x² - 5x + 6 = 0, we can use the factoring method. We need to find two numbers that multiply to +6 and add up to -5.

Thinking about the factors of 6:
• 1 and 6 (adds to 7)
• -1 and -6 (adds to -7)
• 2 and 3 (adds to 5)
• -2 and -3 (adds to -5) ✅

So, the numbers are -2 and -3. We can factor the equation as:
(x - 2)(x - 3) = 0

Now, we set each factor to zero to find the solutions:
1. x - 2 = 0  →  x = 2
2. x - 3 = 0  →  x = 3

The solutions are x = 2 and x = 3.

Would you like to try another problem or see the quadratic formula method instead?`
                }
            ],
        },
        {
            id: "english-tenses",
            title: "English Tenses",
            messages: [
                { id: "1", role: "user", content: "I want to learn English tenses" },
                {
                    id: "2",
                    role: "assistant",
                    content: `Let's explore English tenses together. I will guide you through the logic behind them rather than just listing rules.

At their core, tenses are how we change verbs to show when an action happens (Time) and how it happens (Aspect).

Time: Past ⬅️, Present 🔽, Future ➡️

Aspect: Is it a fact? Is it ongoing? Is it finished?

Where would you like to start our exploration?
1. The Foundations (Simple Tenses): We can focus on the three most common tenses used for facts, habits, and finished events.
2. The Storyteller (Past Forms): We can look specifically at how to describe past events using Simple, Continuous, and Perfect forms together.
3. The "Now" and "Later" (Present & Future): We can explore how to talk about current actions, schedules, and future plans.`,
                },
            ],
        },
    ])

    const openChat = (chatId: string) => {
        const chat = chats.find((c) => c.id === chatId)
        if (!chat) return

        const existingTab = tabs.find((t) => t.id === chatId)
        if (!existingTab) {
            setTabs([...tabs, { id: chatId, title: chat.title, type: "chat" }])
        }
        setActiveTab(chatId)
    }

    const closeTab = (tabId: string) => {
        if (tabId === "home") return
        const newTabs = tabs.filter((t) => t.id !== tabId)
        setTabs(newTabs)
        if (activeTab === tabId) {
            setActiveTab(newTabs[newTabs.length - 1]?.id || "home")
        }
    }

    const sendMessage = (chatId: string, content: string) => {
        setChats((prev) =>
            prev.map((chat) => {
                if (chat.id !== chatId) return chat
                const newMessages = [...chat.messages, { id: `msg-${Date.now()}`, role: "user" as const, content }]

                const newTitle = chat.messages.length === 0 ? content.slice(0, 30) : chat.title

                setTabs((tabs) => tabs.map((t) => (t.id === chatId ? { ...t, title: newTitle } : t)))
                return { ...chat, title: newTitle, messages: newMessages }
            }),
        )

        // Add automated typing indicator, then response
        setTimeout(() => {
            setChats((prev) =>
                prev.map((chat) => {
                    if (chat.id !== chatId) return chat

                    const responses = [
                        "I'd be happy to help you with that! Let me break this down for you...",
                        "Great question! Here's what you need to know about this topic...",
                        "Let me explain this in a way that's easy to understand...",
                        "That's an interesting topic! Here's my explanation...",
                        "I can definitely help with that. Let me guide you through this...",
                    ]

                    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

                    return {
                        ...chat,
                        messages: [
                            ...chat.messages,
                            {
                                id: `msg-${Date.now()}`,
                                role: "assistant" as const,
                                content: randomResponse,
                            },
                        ],
                    }
                }),
            )
        }, 1500)
    }

    const currentChat = chats.find((c) => c.id === activeTab)

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden">
            {/* Mobile Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Hidden on mobile by default */}
            <div className={`fixed lg:static inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:transform-none ${
                isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <Sidebar
                    chats={chats}
                    onOpenChat={(chatId) => {
                        openChat(chatId)
                        setIsMobileSidebarOpen(false)
                    }}
                    onNewChat={() => {
                        setActiveTab("home")
                        setIsMobileSidebarOpen(false)
                    }}
                    collapsed={isSidebarCollapsed}
                    onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
                    isMobile={isMobileSidebarOpen}
                    onCloseMobile={() => setIsMobileSidebarOpen(false)}
                />
            </div>

            <main className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Tabs */}
                <TabBar
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onTabClose={closeTab}
                    onMenuClick={() => setIsMobileSidebarOpen(true)}
                />

                {/* Content */}
                <div className="flex-1 overflow-hidden relative">
                    {activeTab === "home" ? (
                        <MainContent
                            onSendMessage={(content) => {
                                const newChatId = `chat-${Date.now()}`
                                const newChat: Chat = {
                                    id: newChatId,
                                    title: content.slice(0, 30),
                                    messages: [{ id: "1", role: "user", content }],
                                }
                                setChats([...chats, newChat])
                                setTabs([...tabs, { id: newChatId, title: content.slice(0, 30), type: "chat" }])
                                setActiveTab(newChatId)
                            }}
                        />
                    ) : currentChat ? (
                        <ChatView chat={currentChat} onSendMessage={(content) => sendMessage(currentChat.id, content)} />
                    ) : null}
                </div>
            </main>
        </div>
    )
}