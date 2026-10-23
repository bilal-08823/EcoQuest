import { useState, useRef, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
import type { Page } from '../types';
import { useApp } from '../AppContext';
import { getCurrentLevel } from '../store';
import logoImg from '../assets/earth-globe.jpg';

interface HeaderProps {
  currentPage: Page;
  onMenuClick: () => void;
}

const PAGE_TITLES: Record<Page, string> = {
  dashboard: 'Dashboard',
  challenges: 'Daily Challenges',
  achievements: 'Achievements',
  impact: 'Campus Impact',
  leaderboard: 'Leaderboard',
  profile: 'Profile',
};

function formatTimeAgo(isoDate: string): string {
  const now = Date.now();
  const diff = now - new Date(isoDate).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function Header({ currentPage, onMenuClick }: HeaderProps) {
  const { state, dispatch } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const level = getCurrentLevel(state.totalPoints);
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    const willShow = !showNotifications;
    setShowNotifications(willShow);
    if (willShow && unreadCount > 0) {
      dispatch({ type: 'MARK_NOTIFICATIONS_READ' });
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* Left: Menu + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden w-10 h-10 rounded-xl hover:bg-sage dark:hover:bg-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-charcoal dark:text-gray-200" />
          </button>

          {/* Mobile Brand Logo: 2nd Image icon + EcoQuest */}
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-emerald/30 shadow-xs shrink-0 bg-forest/10 p-0.5">
              <img
                src={logoImg}
                alt="EcoQuest"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <span className="text-base font-extrabold tracking-tight">
              <span className="text-forest dark:text-emerald-400">Eco</span>
              <span className="text-emerald font-black">Quest</span>
            </span>
          </div>

          <h2 className="hidden md:block text-lg md:text-xl font-bold text-charcoal dark:text-gray-100">
            {PAGE_TITLES[currentPage]}
          </h2>
        </div>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative" ref={panelRef}>
            <button
              onClick={toggleNotifications}
              className="relative w-10 h-10 rounded-xl hover:bg-sage dark:hover:bg-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-charcoal dark:text-gray-200" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] rounded-full bg-coral text-white text-[10px] font-bold flex items-center justify-center px-1 animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Panel */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in z-50">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-charcoal dark:text-gray-100">Notifications</h3>
                    <p className="text-xs text-muted mt-0.5">
                      {unreadCount > 0
                        ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                        : 'All caught up!'}
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => dispatch({ type: 'MARK_NOTIFICATIONS_READ' })}
                      className="text-xs text-emerald hover:underline font-medium cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-700/50">
                  {state.notifications.length === 0 && (
                    <div className="px-5 py-8 text-center">
                      <p className="text-sm text-muted">No notifications yet</p>
                    </div>
                  )}
                  {state.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-5 py-3.5 flex gap-3 transition-colors ${
                        notification.read ? 'bg-white dark:bg-gray-800' : 'bg-mint/30 dark:bg-emerald-950/20'
                      }`}
                    >
                      {/* Unread dot */}
                      <div className="pt-1.5 shrink-0">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            notification.read ? 'bg-transparent' : 'bg-emerald'
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-charcoal dark:text-gray-100 truncate">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-[10px] text-muted mt-1">
                          {formatTimeAgo(notification.time)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-white text-sm font-bold shadow-xs">
              {state.profile.avatar}
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-sunny border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-xs"
              title={level.name}
            >
              <span className="text-[7px] font-bold text-charcoal">
                {level.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
