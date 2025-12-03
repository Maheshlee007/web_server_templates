import { Link, useLocation } from 'react-router-dom'
import { Home, Info, LogOut, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarProps {
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ sidebarOpen = true, onToggleSidebar }: SidebarProps) {
  const location = useLocation()

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Toggle Button */}
      <div className="flex items-center justify-center p-3 border-b border-border">
        <button
          onClick={onToggleSidebar}
          title={sidebarOpen ? 'Collapse' : 'Expand'}
          className="p-2 rounded-md text-foreground hover:bg-accent transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation */}
        <nav className="space-y-1 p-3" aria-label="Main navigation">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                title={!sidebarOpen ? item.name : undefined}
                className={`flex items-center justify-center gap-3 rounded-lg transition-all duration-200 ${
                  sidebarOpen ? 'px-4 py-3' : 'px-3 py-3'
                } ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-border space-y-1 p-3">
        <button
          title={!sidebarOpen ? 'Settings' : undefined}
          className={`w-full flex items-center justify-center gap-3 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors ${
            sidebarOpen ? 'px-4 py-2' : 'px-3 py-2'
          }`}
        >
          <Settings className="h-5 w-5" />
          {sidebarOpen && <span>Settings</span>}
        </button>
        <button
          title={!sidebarOpen ? 'Logout' : undefined}
          className={`w-full flex items-center justify-center gap-3 rounded-lg text-sm font-medium text-destructive hover:bg-red-100 transition-colors ${
            sidebarOpen ? 'px-4 py-2' : 'px-3 py-2'
          }`}
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}