import { Link, useLocation } from 'react-router-dom'
import { Home, Info, LogOut, Settings, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface SidebarProps {
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
  isMobile?: boolean
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ sidebarOpen = true, onToggleSidebar, isMobile = false }: SidebarProps) {
  const location = useLocation()

  return (
    <div className="flex flex-col h-full bg-brand-50 border-r border-border-primary">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-primary bg-primary-50">
        {isMobile ? (
          <>
            <span className="text-sm font-semibold text-foreground">Menu</span>
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-foreground hover:bg-interactive-hover transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </>
        ) : (
          <button
            onClick={onToggleSidebar}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="w-full flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-interactive-hover transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Collapse</span>
              </div>
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 p-4" aria-label="Main navigation">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                title={!sidebarOpen ? item.name : undefined}
                onClick={isMobile ? onToggleSidebar : undefined}
                className={`navigation-item group flex items-center gap-3 rounded-xl transition-all duration-200 ${
                  sidebarOpen ? 'px-4 py-3' : 'px-3 py-3 justify-center'
                } ${
                  isActive
                    ? 'navigation-item--active bg-primary-600 text-primary-foreground border border-primary-600 shadow-md'
                    : 'navigation-item--inactive text-text-secondary hover:bg-brand-100 hover:text-primary-700'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                {sidebarOpen && (
                  <span className="text-sm font-medium group-hover:translate-x-0.5 transition-transform">
                    {item.name}
                  </span>
                )}
                {isActive && sidebarOpen && (
                  <div className="ml-auto w-2 h-2 bg-secondary-500 rounded-full"></div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-border-primary bg-primary-50 space-y-1 p-4">
        <button
          title={!sidebarOpen ? 'Settings' : undefined}
          className={`sidebar-action w-full flex items-center gap-3 rounded-xl text-sm font-medium text-primary-700 hover:bg-primary-100 hover:text-primary-900 transition-all duration-200 group ${
            sidebarOpen ? 'px-4 py-2.5' : 'px-3 py-2.5 justify-center'
          }`}
        >
          <Settings className="h-5 w-5 flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" />
          {sidebarOpen && <span>Settings</span>}
        </button>
        <button
          title={!sidebarOpen ? 'Sign Out' : undefined}
          className={`sidebar-action w-full flex items-center gap-3 rounded-xl text-sm font-medium text-danger-600 hover:bg-danger-100 hover:text-danger-700 transition-all duration-200 group ${
            sidebarOpen ? 'px-4 py-2.5' : 'px-3 py-2.5 justify-center'
          }`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  )
}