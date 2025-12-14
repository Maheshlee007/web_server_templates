import { Settings, LogOut } from 'lucide-react';
import { useLayout } from '../AppLayout/AppLayoutProvider';

/**
 * SidebarFooter - Footer section for sidebar with Settings and Logout
 * Adapts to mini mode automatically
 */
export function SidebarFooter() {
  const { sidebarMini, onLogout } = useLayout();

  const handleLogout = () => {
    console.log('Logging out...');
    onLogout?.();
  };

  return (
    <div className="space-y-1">
      <button className="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-(--color-text-secondary) hover:bg-(--color-bg-secondary) transition-colors">
        <Settings className="w-4 h-4" />
        {!sidebarMini && <span>Settings</span>}
      </button>
      <button 
        onClick={handleLogout}
        className="flex items-center w-full gap-2 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        {!sidebarMini && <span>Logout</span>}
      </button>
    </div>
  );
}
