import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Info, ChevronLeft, ChevronRight } from 'lucide-react'
{{#if hasShadcn}}
import { Button } from '@/components/ui/button'
{{/if}}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">{{projectName}}</span>
            </div>
            <span className="font-bold text-lg text-foreground">{{projectName}}</span>
          </Link>
        )}
        {{#if hasShadcn}}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        {{else}}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
        {{/if}}
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                } ${collapsed ? 'justify-center' : 'space-x-3'}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          {{#if hasShadcn}}
          <Button variant="outline" size="sm" className="w-full">
            Get Started
          </Button>
          {{else}}
          <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            Get Started
          </button>
          {{/if}}
        </div>
      )}
    </div>
  )
}