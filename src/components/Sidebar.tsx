import { useState } from "react"
import type { Chat } from "../types/chat"
import searchIcon from "../assets/icons/search.svg"
import galleryIcon from "../assets/icons/image-gallery.svg"
import plusIcon from "../assets/icons/plus.svg"
import chevronDownIcon from "../assets/icons/chevron-down.svg"
import moreIcon from "../assets/icons/more.svg"
import settingsIcon from "../assets/icons/settings.svg"
import sidebarIcon from "../assets/icons/sidebar.svg"
import wiseOwlImage from "../assets/images/wise-owl.png"
import userIcon from "../assets/icons/user.svg"

interface SidebarProps {
    chats: Chat[]
    onOpenChat: (chatId: string) => void
    onNewChat: () => void
    collapsed: boolean
    onToggleCollapse: () => void
    isMobile?: boolean
    onCloseMobile?: () => void
}

export function Sidebar({ 
    chats, 
    onOpenChat, 
    onNewChat, 
    collapsed, 
    onToggleCollapse,
    isMobile = false,
    onCloseMobile 
}: SidebarProps) {
    const [projectsOpen, setProjectsOpen] = useState(true)
    const [groupsOpen, setGroupsOpen] = useState(true)
    const [historyOpen, setHistoryOpen] = useState(true)

    // Determine if we should show full text (expanded state)
    // We show text if the sidebar is NOT collapsed OR if we are on mobile (where it's always full width)
    const showText = !collapsed || isMobile

    return (
        <aside
            className={`bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ${
                collapsed && !isMobile ? "w-16" : "w-64"
            }`}
        >
            {/* Header */}
            <div
                className={`p-4 flex items-center ${collapsed && !isMobile ? "justify-center" : "justify-between"} gap-3 ${
                    collapsed && !isMobile ? "relative group" : ""
                }`}
            >
                <div
                    className={`rounded-full bg-linear-to-br from-sky-400 to-sky-600 flex items-center justify-center overflow-hidden transition-opacity ${
                        collapsed && !isMobile ? "w-8 h-8 group-hover:opacity-0" : "w-10 h-10"
                    }`}
                >
                    <img src={wiseOwlImage} alt="Wise Owl Logo" className="w-full h-full object-cover" />
                </div>
                
                {/* Mobile: Close Button (Cross) */}
                {isMobile ? (
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                        onClick={onCloseMobile}
                        aria-label="Close sidebar"
                    >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                ) : (
                    /* Desktop: Toggle Collapse Button */
                    !collapsed && (
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            onClick={onToggleCollapse}
                            aria-label="Collapse sidebar"
                        >
                            <img src={sidebarIcon} alt="" className="w-5 h-5" />
                        </button>
                    )
                )}

                {/* Desktop: Show expand button on hover when collapsed */}
                {collapsed && !isMobile && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto p-2 hover:bg-gray-100 rounded-lg transition-opacity"
                        onClick={onToggleCollapse}
                        aria-label="Expand sidebar"
                    >
                        <img src={sidebarIcon} alt="" className="w-5 h-5 rotate-180" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className={`flex-1 overflow-y-auto ${collapsed && !isMobile ? "px-1" : "px-3"}`}>
                {/* Search */}
                <button
                    className={`w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                        collapsed && !isMobile ? "justify-center" : ""
                    }`}
                    title="Search chats"
                >
                    <img src={searchIcon} alt="" className="w-5 h-5" />
                    {showText && <span>Search chats</span>}
                </button>

                {/* Gallery */}
                <button
                    className={`w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                        collapsed && !isMobile ? "justify-center" : ""
                    }`}
                    title="Gallery"
                >
                    <img src={galleryIcon} alt="" className="w-5 h-5" />
                    {showText && <span>Gallery</span>}
                </button>

                {/* New Chat */}
                <button
                    onClick={onNewChat}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                        collapsed && !isMobile ? "justify-center" : ""
                    }`}
                    title="New chat"
                >
                    <img src={plusIcon} alt="" className="w-5 h-5" />
                    {showText && <span>New chat</span>}
                </button>

                {/* Projects & Groups hidden in collapsed mode (unless mobile) */}
                {showText && (
                    <>
                        {/* Projects Section */}
                        <div className="mt-6">
                            <button
                                onClick={() => setProjectsOpen(!projectsOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-500"
                            >
                                <span>Projects</span>
                                <div className="flex items-center gap-1">
                                    <img src={plusIcon} alt="" className="w-4 h-4" />
                                    <img
                                        src={chevronDownIcon}
                                        alt=""
                                        className={`w-4 h-4 transition-transform ${projectsOpen ? "" : "-rotate-90"}`}
                                    />
                                </div>
                            </button>
                            {projectsOpen && (
                                <div className="space-y-1">
                                    <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span>Maths</span>
                                        <img src={moreIcon} alt="" className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Groups Section */}
                        <div className="mt-4">
                            <button
                                onClick={() => setGroupsOpen(!groupsOpen)}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-500"
                            >
                                <span>Groups</span>
                                <div className="flex items-center gap-1">
                                    <img src={plusIcon} alt="" className="w-4 h-4" />
                                    <img
                                        src={chevronDownIcon}
                                        alt=""
                                        className={`w-4 h-4 transition-transform ${groupsOpen ? "" : "-rotate-90"}`}
                                    />
                                </div>
                            </button>
                            {groupsOpen && (
                                <div className="space-y-1">
                                    <button className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        <span>Maths group</span>
                                        <img src={moreIcon} alt="" className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* History Section */}
                <div className="mt-4">
                    <button
                        onClick={() => setHistoryOpen(!historyOpen)}
                        className={`w-full flex items-center ${collapsed && !isMobile ? "justify-center" : "justify-between"} px-3 py-2 text-sm font-medium text-gray-500`}
                    >
                        {showText && <span>History</span>}
                        <img
                            src={chevronDownIcon}
                            alt=""
                            className={`w-4 h-4 transition-transform ${historyOpen ? "" : "-rotate-90"}`}
                        />
                    </button>
                    {historyOpen && (
                        <div className={collapsed && !isMobile ? "space-y-2" : "space-y-1"}>
                            {chats.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => onOpenChat(chat.id)}
                                    className={`w-full flex items-center ${collapsed && !isMobile ? "justify-center" : "justify-between"} px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg`}
                                    title={chat.title}
                                >
                                    {collapsed && !isMobile ? (
                                        <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sm font-semibold text-sky-600">
                      {chat.title.charAt(0).toUpperCase()}
                    </span>
                                    ) : (
                                        <>
                                            <span className="truncate">{chat.title}</span>
                                            <img src={moreIcon} alt="" className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* User Profile */}
            <div className="p-3 border-t border-gray-200">
                <div className={`flex items-center ${collapsed && !isMobile ? "justify-center" : "justify-between"} gap-3`}>
                    <div className="flex items-center gap-3">
                        <div className={`${collapsed && !isMobile ? "w-8 h-8" : "w-10 h-10"} rounded-full bg-sky-500 flex items-center justify-center overflow-hidden`}>
                            <img src={userIcon} alt="User Avatar" className={collapsed && !isMobile ? "w-5 h-5" : "w-6 h-6"} />
                        </div>
                        {showText && (
                            <div>
                                <p className="font-medium text-gray-900">Sanskar J</p>
                                <p className="text-xs text-gray-500">Free plan</p>
                            </div>
                        )}
                    </div>
                    {showText && (
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Settings">
                            <img src={settingsIcon} alt="Settings" className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    )
}