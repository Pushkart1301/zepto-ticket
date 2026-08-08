import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'AI Automation', path: '/automation', icon: '🤖' },
  { name: 'Tickets', path: '/tickets', icon: '🎫' },
  { name: 'My Tickets', path: '/my-tickets', icon: '👤' },
  { name: 'Team Queue', path: '/team', icon: '👥' },
  { name: 'Customers', path: '/customers', icon: '👨‍💼' },
  { name: 'Analytics', path: '/analytics', icon: '📈' },
  { name: 'SLA & Performance', path: '/sla', icon: '⏱️' },
  { name: 'Knowledge Base', path: '/knowledge-base', icon: '📚' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, currentUser } = useStore();

  return (
    <aside
      className={`${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } bg-surface border-r border-border transition-all duration-200 flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!sidebarCollapsed && (
          <span className="text-h2 font-bold text-primary">Zepto Support</span>
        )}
        <button
          onClick={toggleSidebar}
          className="text-text-secondary hover:text-text-primary p-1"
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 text-body transition-colors relative ${
                isActive
                  ? 'text-primary font-semibold bg-primary/5'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}
              <span className="text-lg">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
            {currentUser.name.charAt(0)}
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-body font-medium text-text-primary truncate">
                {currentUser.name}
              </div>
              <div className="text-caption text-text-secondary truncate">
                {currentUser.role}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  currentUser.status === 'available' ? 'bg-success' :
                  currentUser.status === 'busy' ? 'bg-warning' : 'bg-text-secondary'
                }`} />
                <span className="text-caption text-text-secondary capitalize">
                  {currentUser.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
