import { useState, useRef, useEffect } from "react"

interface Tab {
    id: string
    title: string
    type: string
}

interface TabBarProps {
    tabs: Tab[]
    activeTab: string
    onTabChange: (tabId: string) => void
    onTabClose: (tabId: string) => void
    onMenuClick: () => void
}

export function TabBar({ tabs, activeTab, onTabChange, onTabClose, onMenuClick }: TabBarProps) {
    const [visibleTabs, setVisibleTabs] = useState<Tab[]>(tabs)
    const [overflowTabs, setOverflowTabs] = useState<Tab[]>([])
    const [showDropdown, setShowDropdown] = useState(false)
    const tabsContainerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Calculate visible and overflow tabs
    useEffect(() => {
        const calculateVisibleTabs = () => {
            if (!tabsContainerRef.current) return

            const containerWidth = tabsContainerRef.current.offsetWidth
            const buttonWidth = 40 // Width of >> button
            const availableWidth = containerWidth - buttonWidth - 16 // 16px for padding

            let currentWidth = 0
            const visible: Tab[] = []
            const overflow: Tab[] = []

            // Always show home tab first
            const homeTab = tabs.find((t) => t.id === "home")
            if (homeTab) {
                const tabWidth = 150 // Approximate width per tab
                currentWidth += tabWidth
                visible.push(homeTab)
            }

            // Then add active tab if it's not home
            if (activeTab !== "home") {
                const activeTabObj = tabs.find((t) => t.id === activeTab)
                if (activeTabObj) {
                    const tabWidth = 150
                    if (currentWidth + tabWidth < availableWidth) {
                        currentWidth += tabWidth
                        visible.push(activeTabObj)
                    } else {
                        overflow.push(activeTabObj)
                    }
                }
            }

            // Add other tabs
            for (const tab of tabs) {
                if (tab.id === "home" || tab.id === activeTab) continue

                const tabWidth = 150
                if (currentWidth + tabWidth < availableWidth) {
                    currentWidth += tabWidth
                    visible.push(tab)
                } else {
                    overflow.push(tab)
                }
            }

            setVisibleTabs(visible)
            setOverflowTabs(overflow)
        }

        calculateVisibleTabs()
        window.addEventListener("resize", calculateVisibleTabs)
        return () => window.removeEventListener("resize", calculateVisibleTabs)
    }, [tabs, activeTab])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={tabsContainerRef} className="flex items-center gap-1 px-2 pt-2 bg-white border-b border-gray-200">
            {/* Mobile Menu Button */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded flex-shrink-0"
                aria-label="Open menu"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {visibleTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-t-lg transition-colors whitespace-nowrap ${
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
                                onTabClose(tab.id)
                            }}
                            className="ml-1 hover:bg-gray-200 rounded p-0.5"
                        >
              ×
            </span>
                    )}
                </button>
            ))}
            {overflowTabs.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                    >
                        <span className="text-lg">»</span>
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-50">
                            {overflowTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        onTabChange(tab.id)
                                        setShowDropdown(false)
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                                >
                                    <span className="truncate">{tab.title}</span>
                                    {tab.id !== "home" && (
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onTabClose(tab.id)
                                                if (overflowTabs.length === 1) {
                                                    setShowDropdown(false)
                                                }
                                            }}
                                            className="ml-2 hover:bg-gray-200 rounded p-0.5"
                                        >
                      ×
                    </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}