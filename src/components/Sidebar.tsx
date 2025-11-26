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
}

export function Sidebar({ chats, onOpenChat, onNewChat, collapsed, onToggleCollapse }: SidebarProps) {
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [groupsOpen, setGroupsOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(true)

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-3 ${
          collapsed ? "relative group" : ""
        }`}
      >
        <div
          className={`rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center overflow-hidden transition-opacity ${
            collapsed ? "w-8 h-8 group-hover:opacity-0" : "w-10 h-10"
          }`}
        >
          <img src={wiseOwlImage} alt="Wise Owl Logo" className="w-full h-full object-cover" />
        </div>
        <button
          className={`p-2 hover:bg-gray-100 rounded-lg transition-transform ${
            collapsed
              ? "absolute right-2 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
              : ""
          }`}
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <img
            src={sidebarIcon}
            alt=""
            className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${collapsed ? "px-1" : "px-3"}`}>
        {/* Search */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
            collapsed ? "justify-center" : ""
          }`}
          title="Search chats"
        >
          <img src={searchIcon} alt="" className="w-5 h-5" />
          {!collapsed && <span>Search chats</span>}
        </button>

        {/* Gallery */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
            collapsed ? "justify-center" : ""
          }`}
          title="Gallery"
        >
          <img src={galleryIcon} alt="" className="w-5 h-5" />
          {!collapsed && <span>Gallery</span>}
        </button>

        {/* New Chat */}
        <button
          onClick={onNewChat}
          className={`w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
            collapsed ? "justify-center" : ""
          }`}
          title="New chat"
        >
          <img src={plusIcon} alt="" className="w-5 h-5" />
          {!collapsed && <span>New chat</span>}
        </button>

        {/* Projects & Groups hidden in collapsed mode */}
        {!collapsed && (
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
            className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 text-sm font-medium text-gray-500`}
          >
            {!collapsed && <span>History</span>}
            <img
              src={chevronDownIcon}
              alt=""
              className={`w-4 h-4 transition-transform ${historyOpen ? "" : "-rotate-90"}`}
            />
          </button>
          {historyOpen && (
            <div className={collapsed ? "space-y-2" : "space-y-1"}>
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onOpenChat(chat.id)}
                  className={`w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg`}
                  title={chat.title}
                >
                  {collapsed ? (
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
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-3`}>
          <div className="flex items-center gap-3">
            <div className={`${collapsed ? "w-8 h-8" : "w-10 h-10"} rounded-full bg-sky-500 flex items-center justify-center overflow-hidden`}>
              <img src={userIcon} alt="User Avatar" className={collapsed ? "w-5 h-5" : "w-6 h-6"} />
            </div>
            {!collapsed && (
              <div>
                <p className="font-medium text-gray-900">Sanskar J</p>
                <p className="text-xs text-gray-500">Free plan</p>
              </div>
            )}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Settings">
            <img src={settingsIcon} alt="Settings" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
