import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { ChatView } from "./components/ChatView"
import { MainContent } from "./components/MainContent"
import type { Tab, Chat } from "./types/chat"

export default function Home() {
  const [tabs, setTabs] = useState<Tab[]>([{ id: "home", title: "Home", type: "home" }])
  const [activeTab, setActiveTab] = useState("home")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "maths-homework",
      title: "Maths homework",
      messages: [],
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

  const createNewChat = () => {
    // Jump back to the home tab so the user can start a fresh chat there
    setActiveTab("home")
  }

  const sendMessage = (chatId: string, content: string) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat
        const newMessages = [...chat.messages, { id: `msg-${Date.now()}`, role: "user" as const, content }]
        // Update chat title if first message
        const newTitle = chat.messages.length === 0 ? content.slice(0, 30) : chat.title
        // Update tab title
        setTabs((tabs) => tabs.map((t) => (t.id === chatId ? { ...t, title: newTitle } : t)))
        return { ...chat, title: newTitle, messages: newMessages }
      }),
    )

    // Simulate AI response
    setTimeout(() => {
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id !== chatId) return chat
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: `msg-${Date.now()}`,
                role: "assistant" as const,
                content: "I'd be happy to help you with that! Let me think about the best way to explain this topic...",
              },
            ],
          }
        }),
      )
    }, 1500)
  }

  const currentChat = chats.find((c) => c.id === activeTab)

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar
        chats={chats}
        onOpenChat={openChat}
        onNewChat={createNewChat}
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-2 pt-2 bg-white border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-white border-b-2 border-sky-500 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.title}
              {tab.id !== "home" && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                  className="ml-1 hover:bg-gray-200 rounded p-0.5"
                >
                  ×
                </span>
              )}
            </button>
          ))}
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <span className="text-lg">»</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-20 left-20 text-6xl text-gray-400 font-bold rotate-[-15deg]">MATH</div>
            <div className="absolute top-40 right-32 text-5xl text-gray-400 font-bold rotate-[10deg]">QUIZ?</div>
            <div className="absolute bottom-40 left-40 text-4xl text-gray-400 font-bold rotate-[-5deg]">📐</div>
            <div className="absolute bottom-20 right-20 text-6xl text-gray-400 font-bold rotate-[5deg]">SCIENCE</div>
            <div className="absolute top-1/2 left-1/4 text-5xl text-teal-300">+</div>
            <div className="absolute top-1/3 right-1/4 text-4xl text-teal-300">+</div>
          </div>

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
