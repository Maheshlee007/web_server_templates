import { ReactNode, useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Start closed on mobile
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-close sidebar on mobile, auto-open on desktop
      setSidebarOpen(!mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-app-background">
      {/* Header */}
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative" >
        {/* Sidebar */}
        <aside
          className={`${
            isMobile 
              ? `fixed left-0 top-[calc(4rem)] h-[calc(100vh-1rem)] z-50 transform transition-transform duration-300 ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } w-64 shadow-xl`
              : `${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300`
          } bg-surface-primary border-r border-border-primary overflow-hidden flex-shrink-0`}
        >
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            isMobile={isMobile}
          />
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-content-area">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}