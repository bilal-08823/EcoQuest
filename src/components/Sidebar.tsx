import {
  LayoutDashboard,
  Target,
  Award,
  BarChart3,
  Trophy,
  User,
  X,
} from 'lucide-react';
import type { Page } from '../types';
import { useApp } from '../AppContext';
import { getCurrentLevel } from '../store';
import logoImg from '../assets/earth-globe.jpg';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onClose?: () => void;
}

const NAV_ITEMS: { page: Page; label: string; icon: React.ElementType }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'challenges', label: 'Daily Challenges', icon: Target },
  { page: 'achievements', label: 'Achievements', icon: Award },
  { page: 'impact', label: 'Campus Impact', icon: BarChart3 },
  { page: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { page: 'profile', label: 'Profile', icon: User },
];

export function Sidebar({ currentPage, onNavigate, onClose }: SidebarProps) {
  const { state } = useApp();
  const level = getCurrentLevel(state.totalPoints);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    onClose?.();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700">
      {/* Brand Logo Header: 2nd Image Icon on left, "EcoQuest" on its side */}
      <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-700/60">
        <div
          onClick={() => handleNavigate('dashboard')}
          className="cursor-pointer group flex items-center gap-3.5 transition-all duration-200"
          title="EcoQuest — Small Actions. Greener Campuses. Bigger Impact."
        >
          {/* 3D Icon Badge with 2nd Image (Glowing Earth Globe in Hand) */}
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-md border-2 border-emerald/40 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 shrink-0 bg-forest/5 dark:bg-emerald-950/40 p-0.5 cursor-pointer badge-glow-emerald">
            <img
              src={logoImg}
              alt="EcoQuest"
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:rotate-3"
            />
          </div>

          {/* Just write in its side: EcoQuest */}
          <div className="flex items-center min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight">
              <span className="text-forest dark:text-emerald-400">Eco</span>
              <span className="text-emerald font-black">Quest</span>
            </h1>
            <span className="ml-1.5 w-2 h-2 rounded-full bg-emerald animate-pulse shrink-0" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map(({ page, label, icon: Icon }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 ease-in-out cursor-pointer
                ${
                  isActive
                    ? 'bg-mint dark:bg-emerald-950/40 text-forest dark:text-emerald-300 font-semibold border-l-[3px] border-emerald shadow-xs'
                    : 'text-muted dark:text-gray-400 hover:bg-sage dark:hover:bg-gray-700/50 hover:text-charcoal dark:hover:text-gray-200 border-l-[3px] border-transparent'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald' : 'text-muted dark:text-gray-400'}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Card */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
        <div
          onClick={() => handleNavigate('profile')}
          className="flex items-center gap-3 px-3 py-3 rounded-xl bg-cream dark:bg-gray-700/50 hover:bg-sage dark:hover:bg-gray-700 cursor-pointer transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-white text-sm font-bold shrink-0">
            {state.profile.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-charcoal dark:text-gray-100 truncate">{state.profile.name}</p>
            <p className="text-xs text-emerald dark:text-emerald-400 font-medium">{level.name}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {onClose && (
        <div className="h-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-50 cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4 text-charcoal" />
          </button>
          {sidebarContent}
        </div>
      )}
    </>
  );
}

export default Sidebar;
