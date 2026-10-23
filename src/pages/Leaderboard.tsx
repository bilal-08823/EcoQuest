import { useState, useMemo } from 'react';
import {
  Trophy,
  Sparkles,
  Info,
  Calendar,
  Zap,
} from 'lucide-react';
import type { LeaderboardEntry } from '../types';
import { useApp } from '../AppContext';
import { LEADERBOARD_DATA } from '../data';
import { getCurrentLevel } from '../store';
import { Card3D } from '../components/Card3D';

export function Leaderboard() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'all-time'>('weekly');

  const currentLevel = getCurrentLevel(state.totalPoints);

  // Compute live leaderboard with current user injected and sorted
  const leaderboardList = useMemo(() => {
    const currentUserEntry: LeaderboardEntry = {
      id: 'current-user',
      name: `${state.profile.name} (You)`,
      avatar: state.profile.avatar,
      // For weekly tab, give proportional fraction of total points or at least recent points
      points: activeTab === 'weekly' ? Math.round(state.totalPoints * 0.45) : state.totalPoints,
      level: currentLevel.name,
      isCurrentUser: true,
    };

    const simulatedList: LeaderboardEntry[] = LEADERBOARD_DATA.map((student) => ({
      ...student,
      points: activeTab === 'weekly' ? Math.round(student.points * 0.4) : student.points,
    }));

    const combined = [...simulatedList, currentUserEntry];
    combined.sort((a, b) => b.points - a.points);
    return combined;
  }, [state.profile.name, state.profile.avatar, state.totalPoints, currentLevel.name, activeTab]);

  const userRank = useMemo(() => {
    const idx = leaderboardList.findIndex((entry) => entry.isCurrentUser);
    return idx !== -1 ? idx + 1 : 1;
  }, [leaderboardList]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Page Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest dark:text-emerald-400 tracking-tight">
            Campus Leaderboard
          </h1>
          <p className="text-sm text-muted dark:text-gray-400 mt-1">
            Celebrating campus sustainability leaders and friendly eco competition.
          </p>
        </div>

        {/* 3D Tab switcher */}
        <div className="flex bg-white dark:bg-gray-800 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'weekly'
                ? 'bg-forest dark:bg-emerald-600 text-white shadow-md scale-105'
                : 'text-muted dark:text-gray-400 hover:text-charcoal dark:hover:text-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Weekly Sprint</span>
          </button>
          <button
            onClick={() => setActiveTab('all-time')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all-time'
                ? 'bg-forest dark:bg-emerald-600 text-white shadow-md scale-105'
                : 'text-muted dark:text-gray-400 hover:text-charcoal dark:hover:text-gray-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>All-Time</span>
          </button>
        </div>
      </div>

      {/* Demo Label Note with Sage and Mint theme */}
      <div className="flex items-center gap-2.5 p-4 bg-gradient-to-r from-sage/70 to-mint/30 dark:from-gray-800 dark:to-emerald-950/20 rounded-2xl border border-emerald/20 text-xs text-charcoal dark:text-gray-300 shadow-xs">
        <Info className="w-4 h-4 text-emerald shrink-0" />
        <span>
          <strong>Campus Demo:</strong> Leaderboard is populated with sample student peers for this competition showcase. Your points update your position in real-time.
        </span>
      </div>

      {/* Current User Highlight Card with 3D Tilt */}
      <Card3D intensity={7} scale={1.02}>
        <div className="bg-gradient-to-r from-mint/80 via-white to-sage/60 dark:from-emerald-950/60 dark:via-gray-800 dark:to-gray-800 p-6 rounded-3xl border-2 border-emerald/30 shadow-3d-card flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-forest to-emerald text-white flex items-center justify-center font-black text-xl shadow-lg badge-glow-emerald shrink-0">
              #{userRank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald dark:text-emerald-400">
                  Your Current Standing
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald/20 text-emerald text-xs font-bold">
                  {currentLevel.name}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-charcoal dark:text-gray-100 mt-0.5">
                {state.profile.name}
              </h3>
              <p className="text-xs text-muted dark:text-gray-400 mt-0.5">
                Rank #{userRank} of {leaderboardList.length} participating students on campus
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:border-l sm:border-emerald/20 sm:pl-6 relative z-10">
            <div>
              <span className="text-xs text-muted dark:text-gray-400 font-bold uppercase tracking-wider">Points in this view</span>
              <p className="text-3xl font-black text-emerald flex items-center gap-1.5">
                <Zap className="w-6 h-6 text-sunny fill-sunny" />
                <span>{(activeTab === 'weekly' ? Math.round(state.totalPoints * 0.45) : state.totalPoints).toLocaleString()} pts</span>
              </p>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Leaderboard Table / Cards */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/80 shadow-3d-card overflow-hidden">
        <div className="px-6 py-4.5 bg-sage/30 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs font-extrabold text-muted dark:text-gray-400 uppercase tracking-wider">
          <div className="w-14 text-center">Rank</div>
          <div className="flex-1 pl-4">Student</div>
          <div className="hidden sm:block w-36 text-center">Level</div>
          <div className="w-32 text-right">EcoPoints</div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {leaderboardList.map((entry, index) => {
            const rank = index + 1;
            const isTop1 = rank === 1;
            const isTop2 = rank === 2;
            const isTop3 = rank === 3;
            const isYou = entry.isCurrentUser;

            return (
              <div
                key={entry.id}
                className={`flex items-center px-6 py-4 transition-all duration-200 ${
                  isYou
                    ? 'bg-mint/40 dark:bg-emerald-950/40 font-bold border-l-4 border-l-emerald shadow-inner'
                    : 'hover:bg-sage/40 dark:hover:bg-gray-750 hover:pl-7'
                }`}
              >
                {/* 3D Rank Badge */}
                <div className="w-14 flex items-center justify-center shrink-0">
                  {isTop1 ? (
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sunny to-amber-200 text-charcoal flex items-center justify-center font-black text-base shadow-md badge-glow">
                      🥇
                    </div>
                  ) : isTop2 ? (
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-gray-200 to-gray-300 text-gray-800 flex items-center justify-center font-black text-base shadow-md">
                      🥈
                    </div>
                  ) : isTop3 ? (
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-700 text-white flex items-center justify-center font-black text-base shadow-md">
                      🥉
                    </div>
                  ) : (
                    <span className="text-sm font-extrabold text-muted dark:text-gray-400">
                      #{rank}
                    </span>
                  )}
                </div>

                {/* Student Avatar + Name */}
                <div className="flex-1 flex items-center gap-3.5 pl-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 shadow-sm ${
                      isYou
                        ? 'bg-emerald text-white badge-glow-emerald'
                        : 'bg-sage dark:bg-gray-700 text-forest dark:text-emerald-300'
                    }`}
                  >
                    {entry.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-extrabold text-charcoal dark:text-gray-100 truncate">
                        {entry.name}
                      </p>
                      {isYou && (
                        <span className="px-2.5 py-0.5 rounded-full bg-forest text-white text-[10px] font-extrabold shadow-xs">
                          You
                        </span>
                      )}
                    </div>
                    <span className="sm:hidden text-xs text-muted dark:text-gray-400">
                      {entry.level}
                    </span>
                  </div>
                </div>

                {/* Level (desktop) */}
                <div className="hidden sm:block w-36 text-center">
                  <span className="inline-block px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-700 text-charcoal dark:text-gray-200 text-xs font-bold shadow-xs">
                    {entry.level}
                  </span>
                </div>

                {/* Points */}
                <div className="w-32 text-right">
                  <span className="text-sm font-black text-emerald dark:text-emerald-400">
                    {entry.points.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted dark:text-gray-400 font-semibold ml-1">pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Friendly Motivation Footer */}
      <div className="p-5 rounded-3xl bg-white dark:bg-gray-800 border border-emerald/20 flex items-center gap-3.5 shadow-3d-card">
        <div className="w-10 h-10 rounded-2xl bg-sunny/20 text-amber-600 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-sunny" />
        </div>
        <p className="text-xs sm:text-sm text-charcoal dark:text-gray-300 leading-relaxed">
          <strong>Every point counts!</strong> EcoQuest isn't about perfection — it's about starting small habits that together transform our campus into a greener, cleaner community.
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;
