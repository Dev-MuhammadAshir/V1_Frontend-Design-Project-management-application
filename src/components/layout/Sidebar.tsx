import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Kanban,
  CheckCircle2,
  Users,
  UserCheck,
  BarChart3,
  ShieldAlert,
  FileText,
  Settings,
  Activity,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { currentUser, tasks, risks, notifications, realTimeConnected, latencyMs, triggerLiveSimulation } = useApp();

  const myTasksCount = tasks.filter(t => t.assigneeId === currentUser.id && t.status !== 'DONE').length;
  const criticalRisksCount = risks.filter(r => r.status === 'OPEN' && (r.severity === 'CRITICAL' || r.severity === 'HIGH')).length;
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Kanban Board', path: '/kanban', icon: Kanban },
    { label: 'Task List', path: '/tasks', icon: CheckSquare },
    {
      label: 'My Tasks',
      path: '/my-tasks',
      icon: CheckCircle2,
      badge: myTasksCount > 0 ? myTasksCount : undefined,
      badgeColor: 'bg-blue-500 text-white'
    },
    { label: 'Teams', path: '/teams', icon: Users },
    { label: 'User Directory', path: '/users', icon: UserCheck },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    {
      label: 'PIRAE Risks',
      path: '/risks',
      icon: ShieldAlert,
      badge: criticalRisksCount > 0 ? criticalRisksCount : undefined,
      badgeColor: 'bg-rose-500 text-white'
    },
    { label: 'Audit Logs', path: '/audit-logs', icon: FileText },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-60 bg-[#0F172A] text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">ProjectFlow</span>
              <span className="block text-[10px] text-slate-400 font-mono">SRS v3.0 Real-Time</span>
            </div>
          </div>
        </div>

        {/* Real-time sync badge button */}
        <div className="px-3 py-2.5">
          <button
            onClick={triggerLiveSimulation}
            title="Click to trigger simulated live sync event"
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {realTimeConnected && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${realTimeConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              </span>
              <span className="text-slate-300 group-hover:text-white font-medium text-[11px]">
                {realTimeConnected ? 'Live Synchronized' : 'Offline'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 tabular-nums">
              {latencyMs}ms
            </span>
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5">
          <div className="px-2 pb-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Current User Section */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="px-1 rounded bg-slate-800 text-blue-400 font-medium">{currentUser.role}</span>
                <span className="truncate">{currentUser.capacityHours}h cap</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
