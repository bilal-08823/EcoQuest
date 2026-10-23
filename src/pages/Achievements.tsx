import { useMemo } from 'react';
import {
  Award,
  Shield,
  Sparkles,
  Lock,
  CheckCircle2,
  Sprout,
  Recycle,
  Droplets,
  Zap,
  Flame,
  Check,
} from 'lucide-react';
import { useApp } from '../AppContext';
import { LEVELS } from '../data';
import {
  getCurrentLevel,
  getLevelProgress,
  checkBadges,
  getStreak,
} from '../store';
import { Card3D } from '../components/Card3D';

const BADGE_ICONS: Record<string, React.ElementType> = {
  Sprout: Sprout,
  Recycle: Recycle,
  Droplets: Droplets,
  Zap: Zap,
  Flame: Flame,
  Award: Award,
  Shield: Shield,
};

export function Achievements() {
  const { state } = useApp();

  const currentLevel = getCurrentLevel(state.totalPoints);
  const { next, progress } = getLevelProgress(state.totalPoints);
  const badges = useMemo(() => checkBadges(state), [state]);
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const streak = getStreak(state.streakDays);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest dark:text-emerald-400 tracking-tight">
          Achievements & Levels
        </h1>
        <p className="text-sm text-muted dark:text-gray-400 mt-1">
          Track your sustainability growth from an Eco Rookie to a Campus Guardian.
        </p>
      </div>

      {/* Level Progression Hero with 3D Card */}
      <Card3D intensity={6}>
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald/20 shadow-3d-card space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sunny/15 via-mint/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-sunny to-amber-300 border-2 border-white dark:border-gray-800 flex items-center justify-center text-charcoal shadow-xl badge-glow shrink-0">
                <Shield className="w-9 h-9" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald dark:text-emerald-400">
                    Current Rank
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald/15 text-emerald text-xs font-bold">
                    Level {LEVELS.findIndex((l) => l.name === currentLevel.name) + 1} of 5
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal dark:text-gray-100 mt-0.5 tracking-tight">
                  {currentLevel.name}
                </h2>
                <p className="text-xs sm:text-sm text-muted dark:text-gray-400 mt-0.5">
                  Total Lifetime Points: <strong className="text-emerald font-extrabold">{state.totalPoints} EcoPoints</strong>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              {next ? (
                <div className="p-3 bg-sage/50 dark:bg-gray-700/50 rounded-2xl border border-emerald/15 inline-block">
                  <span className="text-[11px] font-bold text-muted dark:text-gray-400 uppercase tracking-wider">Next Milestone</span>
                  <p className="text-base font-extrabold text-forest dark:text-emerald-400">
                    {next.name}
                  </p>
                  <p className="text-xs text-muted dark:text-gray-400">
                    Need <strong className="text-emerald">{Math.max(0, next.minPoints - state.totalPoints)}</strong> more pts
                  </p>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-sunny/20 border border-sunny/40 text-amber-800 dark:text-sunny text-xs font-extrabold badge-glow">
                  <Sparkles className="w-4 h-4" />
                  <span>Maximum Tier Achieved!</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar to next level */}
          <div className="space-y-2 relative z-10">
            <div className="flex justify-between text-xs font-bold text-muted dark:text-gray-400">
              <span>Progress to next rank</span>
              <span className="text-emerald font-extrabold">{progress}%</span>
            </div>
            <div className="h-4 w-full bg-sage dark:bg-gray-700 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-emerald to-emerald-light rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Level Steps Timeline */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {LEVELS.map((lvl, index) => {
                const isCurrent = lvl.name === currentLevel.name;
                const isPast = state.totalPoints >= lvl.maxPoints;
                return (
                  <div
                    key={lvl.name}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      isCurrent
                        ? 'border-emerald-400 bg-mint/40 dark:bg-emerald-950/50 shadow-md scale-105'
                        : isPast
                        ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750'
                        : 'border-dashed border-gray-200 dark:border-gray-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {isPast ? (
                        <Check className="w-4 h-4 text-emerald font-bold" />
                      ) : isCurrent ? (
                        <Sparkles className="w-4 h-4 text-sunny animate-spin" style={{ animationDuration: '6s' }} />
                      ) : (
                        <span className="text-[10px] font-bold text-muted">Lvl {index + 1}</span>
                      )}
                    </div>
                    <h4 className="text-xs font-extrabold text-charcoal dark:text-gray-100 truncate">
                      {lvl.name}
                    </h4>
                    <p className="text-[10px] text-muted dark:text-gray-400 mt-0.5 font-medium">
                      {lvl.minPoints}{lvl.maxPoints === Infinity ? '+' : `-${lvl.maxPoints}`} pts
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card3D>

      {/* Badges Section with 3D Tilt */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-charcoal dark:text-gray-100">
              Achievement Badges
            </h3>
            <p className="text-xs text-muted dark:text-gray-400">
              Unlocked: <strong className="text-emerald font-extrabold">{unlockedCount} of {badges.length}</strong> badges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {badges.map((badge) => {
            const Icon = BADGE_ICONS[badge.icon] || Award;
            return (
              <Card3D key={badge.id} intensity={10} scale={1.03} className="h-full">
                <div
                  className={`h-full rounded-3xl p-6 border transition-all duration-300 relative flex flex-col justify-between shadow-3d-card ${
                    badge.unlocked
                      ? 'bg-white dark:bg-gray-800 border-amber-300 dark:border-amber-500/50 shimmer-sweep'
                      : 'bg-gray-50/70 dark:bg-gray-800/40 border-gray-100 dark:border-gray-700 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                          badge.unlocked
                            ? 'bg-gradient-to-tr from-sunny to-amber-200 text-charcoal badge-glow'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        }`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      {badge.unlocked ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald/15 text-emerald text-xs font-bold shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-muted dark:text-gray-400 text-xs font-medium">
                          <Lock className="w-3.5 h-3.5" />
                          Locked
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-charcoal dark:text-gray-100">
                      {badge.name}
                    </h4>
                    <p className="text-xs text-muted dark:text-gray-400 leading-relaxed mt-1">
                      {badge.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-gray-700 text-[11px] text-muted dark:text-gray-400 flex items-center justify-between">
                    <span>Requirement:</span>
                    <span className="font-bold text-charcoal dark:text-gray-200 truncate ml-2">
                      {badge.condition}
                    </span>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>

      {/* Stats Summary Footer with 3D cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card3D intensity={8}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-emerald/20 shadow-3d-card text-center">
            <p className="text-3xl font-black text-emerald">
              {state.completedChallenges.length}
            </p>
            <p className="text-xs font-semibold text-muted dark:text-gray-400 mt-1">
              Lifetime Challenges Completed
            </p>
          </div>
        </Card3D>
        <Card3D intensity={8}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-sunny/30 shadow-3d-card text-center badge-glow">
            <p className="text-3xl font-black text-sunny">
              {streak.longest} Days
            </p>
            <p className="text-xs font-semibold text-muted dark:text-gray-400 mt-1">
              Longest Consistency Streak
            </p>
          </div>
        </Card3D>
        <Card3D intensity={8}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-blue-400/20 shadow-3d-card text-center">
            <p className="text-3xl font-black text-blue-500">
              {state.streakDays.length}
            </p>
            <p className="text-xs font-semibold text-muted dark:text-gray-400 mt-1">
              Total Active Days Logged
            </p>
          </div>
        </Card3D>
      </div>
    </div>
  );
}

export default Achievements;
