import { Bell, Settings, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuToggle?: () => void
  isMobile?: boolean
}

export default function Header({ onMenuToggle, isMobile }: HeaderProps) {
  return (
    <>
      <header className="bg-white border-b border-border-primary h-16 flex items-center px-4 sm:px-6 shadow-sm z-30 relative">
        <div className="flex items-center justify-between w-full gap-4">
          {/* Left section - Mobile menu + Logo */}
          <div className="flex items-center gap-3 min-w-fit">
            {/* Mobile menu button */}
            {isMobile && (
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-lg text-foreground hover:bg-interactive-hover transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            
            {/* Logo */}
              <div className="h-9 w-9 bg-gradient-to-br from-primary-600 to-brand-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-primary-600">
                <span className="text-primary-foreground font-bold text-base">P</span>
              </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-foreground">Project</h1>
              <p className="text-xs text-text-muted -mt-1">Professional Dashboard</p>
            </div>
          </div>

          {/* Right section - Actions & Avatar */}
          <div className="flex items-center justify-end gap-1 ml-auto">
            {/* Notifications */}
            <button
              className="relative p-2.5 rounded-xl text-foreground hover:bg-interactive-hover transition-all duration-200 group"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger-500 rounded-full ring-2 ring-surface-primary"></span>
            </button>

            {/* Settings */}
            <button
              className="p-2.5 rounded-xl text-foreground hover:bg-interactive-hover transition-all duration-200 group"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-border-primary mx-3 hidden sm:block"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-foreground">Mahesh Lee</div>
                <div className="text-xs text-text-muted">Administrator</div>
              </div>
              <button
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-brand-500 flex items-center justify-center text-primary-foreground font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-200 flex-shrink-0 border-2 border-primary-600"
                aria-label="User menu"
              >
                ML
              </button>
            </div>
          </div>
        </div>
      </header>     
    </>
  )
}