import {
  LayoutDashboard,
  Target,
  BarChart3,
  Trophy,
  User,
} from 'lucide-react';
import type { Page } from '../types';
import { useApp } from '../AppContext';

interface MobileBottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { page: Page; label: string; icon: React.ElementType }[] = [
  { page: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { page: 'challenges', label: 'Tasks', icon: Target },
  { page: 'impact', label: 'Impact', icon: BarChart3 },
  { page: 'leaderboard', label: 'Ranks', icon: Trophy },
  { page: 'profile', label: 'Profile', icon: User },
];

export function MobileBottomNav({ currentPage, onNavigate }: MobileBottomNavProps) {
  const { state } = useApp();
  const uncompletedChallengesCount = 10 - state.completedChallenges.filter(
    (c) => c.completedAt.split('T')[0] === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div className="md:hidden fixed bottom-3 left-0 right-0 z-40 px-3 pointer-events-none">
      <nav
        className="pointer-events-auto max-w-md mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-emerald/25 shadow-2xl rounded-2xl p-1.5 flex items-center justify-around"
        style={{
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {NAV_ITEMS.map(({ page, label, icon: Icon }) => {
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`
                relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-200 cursor-pointer flex-1
                ${
                  isActive
                    ? 'bg-forest dark:bg-emerald-600 text-white font-bold shadow-md scale-105 -translate-y-1'
                    : 'text-muted dark:text-gray-400 hover:text-forest dark:hover:text-emerald-300 active:scale-95'
                }
              `}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                {page === 'challenges' && uncompletedChallengesCount > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-sunny text-charcoal text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                    {uncompletedChallengesCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default MobileBottomNav;
