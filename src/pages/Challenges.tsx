import { useState, useMemo } from 'react';
import {
  Search,
  PartyPopper,
  Clock,
  Filter,
  Trophy,
} from 'lucide-react';
import type { Category, Challenge } from '../types';
import { useApp } from '../AppContext';
import { useToast } from '../components/Toast';
import { CHALLENGES } from '../data';
import { getTodayCompleted } from '../store';
import { ChallengeCard } from '../components/ChallengeCard';
import { CelebrationEffects } from '../components/CelebrationEffects';

const CATEGORIES: { id: 'all' | Category; label: string; color: string }[] = [
  { id: 'all', label: 'All Challenges', color: '#14532D' },
  { id: 'recycling', label: 'Recycling', color: '#10B981' },
  { id: 'energy', label: 'Energy Saving', color: '#FBBF24' },
  { id: 'water', label: 'Water Conservation', color: '#3B82F6' },
  { id: 'transport', label: 'Sustainable Transport', color: '#8B5CF6' },
  { id: 'reusable', label: 'Reusable Products', color: '#FB7185' },
];

export function Challenges() {
  const { state, completeChallenge, undoChallenge } = useApp();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<'all' | Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [celebrationPoints, setCelebrationPoints] = useState<number | undefined>(undefined);

  const todayCompleted = getTodayCompleted(state);
  const totalCompletedCount = todayCompleted.length;
  const totalAvailablePoints = useMemo(() => {
    return CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  }, []);

  const pointsEarnedToday = useMemo(() => {
    return todayCompleted.reduce((sum, c) => sum + c.points, 0);
  }, [todayCompleted]);

  // Filtered challenges
  const filteredChallenges = useMemo(() => {
    return CHALLENGES.filter((challenge) => {
      const matchesCategory =
        selectedCategory === 'all' || challenge.category === selectedCategory;
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const allFilteredCompleted =
    filteredChallenges.length > 0 &&
    filteredChallenges.every((c) =>
      todayCompleted.some((comp) => comp.challengeId === c.id)
    );

  const handleComplete = (challenge: Challenge) => {
    completeChallenge(challenge);
    setCelebrationPoints(challenge.points);
    setCelebrationActive(true);
    showToast(`+${challenge.points} EcoPoints earned! 🌱`, 'achievement');
  };

  const handleUndo = (challengeId: string) => {
    undoChallenge(challengeId);
    showToast('Challenge unmarked', 'info');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* 3D Celebration Burst */}
      <CelebrationEffects
        active={celebrationActive}
        points={celebrationPoints}
        onComplete={() => setCelebrationActive(false)}
      />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest dark:text-emerald-400 tracking-tight">
            Daily Challenges
          </h1>
          <p className="text-sm text-muted dark:text-gray-400 mt-1">
            Pick today's eco actions, build green habits, and earn points for your campus!
          </p>
        </div>

        {/* Today's Points Tally Widget with 3D Depth */}
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-3.5 rounded-2xl border border-emerald/20 shadow-3d-card self-start md:self-auto badge-glow">
          <div className="w-11 h-11 rounded-xl bg-sunny/20 text-amber-600 dark:text-sunny flex items-center justify-center font-bold text-lg">
            <Trophy className="w-5 h-5 text-sunny" />
          </div>
          <div>
            <div className="text-[11px] text-muted dark:text-gray-400 font-semibold uppercase tracking-wider">
              Today's Tally
            </div>
            <div className="text-base font-extrabold text-charcoal dark:text-gray-100">
              <span className="text-emerald font-black">+{pointsEarnedToday}</span>
              <span className="text-muted dark:text-gray-400 font-normal"> / {totalAvailablePoints} pts ({totalCompletedCount}/{CHALLENGES.length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-3.5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-emerald absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search challenges by name or keyword (e.g. bottle, lights, recycle)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-charcoal dark:text-gray-100 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-emerald shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted hover:text-charcoal dark:hover:text-gray-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills with Vibrant Color Theme */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-bold text-muted pl-1 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-emerald" />
            <span>Category:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5
                  ${
                    isActive
                      ? 'bg-forest dark:bg-emerald-600 text-white shadow-md scale-105'
                      : 'bg-white dark:bg-gray-800 text-charcoal dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:bg-sage dark:hover:bg-gray-700'
                  }
                `}
              >
                {cat.id !== 'all' && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-sage dark:bg-gray-700 flex items-center justify-center mx-auto text-forest dark:text-emerald-400 mb-4">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-charcoal dark:text-gray-100">
            No challenges found
          </h3>
          <p className="text-sm text-muted dark:text-gray-400 max-w-sm mx-auto mt-1">
            Try adjusting your search terms or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-bold btn-3d-primary cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {allFilteredCompleted && (
            <div className="p-5 rounded-3xl bg-mint dark:bg-emerald-950/40 border border-emerald/30 flex items-center gap-4 animate-scale-in shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald text-white flex items-center justify-center shrink-0 shadow-md badge-glow-emerald">
                <PartyPopper className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-forest dark:text-emerald-300">
                  Spectacular! All filtered challenges are completed today! 🎉
                </h4>
                <p className="text-xs text-forest/80 dark:text-emerald-400/80 mt-0.5 font-medium">
                  You've earned all points in this view. Check back tomorrow for the next daily cycle!
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChallenges.map((challenge) => {
              const isCompleted = todayCompleted.some(
                (c) => c.challengeId === challenge.id
              );
              return (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  completed={isCompleted}
                  onComplete={handleComplete}
                  onUndo={handleUndo}
                />
              );
            })}
          </div>
        </>
      )}

      {/* Daily Reset Info Box with Sage and Mint theme */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sage/60 to-mint/30 dark:from-gray-800 dark:to-emerald-950/20 rounded-2xl border border-emerald/20 text-xs text-charcoal dark:text-gray-300 shadow-xs">
        <Clock className="w-4 h-4 text-emerald shrink-0" />
        <p>
          <strong>Daily Reset Mechanism:</strong> Daily tasks reset automatically at 12:00 AM local time. Your lifetime points, streaks, badges, and campus impact metrics are permanently preserved.
        </p>
      </div>
    </div>
  );
}

export default Challenges;
