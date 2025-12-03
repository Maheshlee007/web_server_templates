import { Bell, Settings } from 'lucide-react'

interface HeaderProps {
  minimized?: boolean
}

export default function Header({ minimized }: HeaderProps) {
  return (
    <>
      <header className="bg-background border-b border-border h-16 flex items-center px-6 shadow-sm">
        <div className="flex items-center justify-between w-full gap-4">
          {/* Left section - Logo */}
          <div className="flex items-center gap-3 min-w-fit">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline whitespace-nowrap">Project</span>
          </div>

          {/* Right section - Actions & Avatar */}
          <div className="flex items-center justify-end gap-2 ml-auto">
            {/* Notifications */}
            <button
              className="p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button
              className="p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-border mx-2"></div>

            {/* Avatar */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-foreground">Mahesh Lee</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm hover:opacity-80 transition-opacity flex-shrink-0"
                aria-label="User menu"
              >
                ML
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs & Title bar - shown only when not minimized */}
      {!minimized && (
        <div className="bg-background border-b border-border px-6 py-3 flex items-center">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <span className="text-border">/</span>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <span className="text-border">/</span>
            <span className="text-gray-500">Current Page</span>
          </nav>
        </div>
      )}

      {/* Page Title bar - shown when minimized */}
      {minimized && (
        <div className="bg-background border-b border-border px-6 py-4 flex items-center">
          <h1 className="text-lg font-semibold text-foreground">Current Page</h1>
        </div>
      )}
    </>
  )
}