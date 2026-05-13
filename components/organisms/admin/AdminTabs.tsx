import { LucideIcon } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon: LucideIcon
  notificationCount: number
}

interface AdminTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

const AdminTabs = ({ tabs, activeTab, onTabChange }: AdminTabsProps) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-4 sm:space-x-6 lg:space-x-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm whitespace-nowrap min-w-fit relative ${
              activeTab === tab.id
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {tab.notificationCount}
                </span>
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default AdminTabs

