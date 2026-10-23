import { useState, useMemo } from 'react';
import {
  Zap,
  Flame,
  Shield,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  Award,
} from 'lucide-react';
import type { Page, Challenge } from '../types';
import { useApp } from '../AppContext';
import { useToast } from '../components/Toast';
import { CHALLENGES } from '../data';
import {
  getCurrentLevel,
  getTodayCompleted,
  getStreak,
} from '../store';
import { ProgressRing } from '../components/ProgressRing';
import { StatCard } from '../components/StatCard';
import { ChallengeCard } from '../components/ChallengeCard';
import { Card3D } from '../components/Card3D';
import { CelebrationEffects } from '../components/CelebrationEffects';
import earthGlobeImg from '../assets/earth-globe.jpg';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { state, completeChallenge, undoChallenge } = useApp();
  const { showToast } = useToast();

  const [celebrationActive, setCelebrationActive] = useState(false);
  const [celebrationPoints, setCelebrationPoints] = useState<number | undefined>(undefined);

  const currentLevel = getCurrentLevel(state.totalPoints);
  const todayCompleted = getTodayCompleted(state);
  const streak = getStreak(state.streakDays);

  const totalChallengesCount = CHALLENGES.length;
  const completedTodayCount = todayCompleted.length;
  const completionPercentage = totalChallengesCount > 0
    ? Math.round((completedTodayCount / totalChallengesCount) * 100)
    : 0;

  // Time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  // Today's preview: first 4 challenges
  const previewChallenges = CHALLENGES.slice(0, 4);

  // 7-day streak calendar calculations
  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date();
    // 6 days ago up to today
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = i === 0;
      const hasCompleted = state.streakDays.includes(dateStr);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' });
      const dayNum = d.getDate();
      days.push({
        dateStr,
        dayName,
        dayNum,
        isToday,
        hasCompleted,
      });
    }
    return days;
  }, [state.streakDays]);

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
      {/* 3D Celebration Particles on Challenge Completion */}
      <CelebrationEffects
        active={celebrationActive}
        points={celebrationPoints}
        onComplete={() => setCelebrationActive(false)}
      />

      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint dark:bg-emerald-950/60 text-xs font-bold uppercase tracking-wider text-forest dark:text-emerald-300 shadow-xs mb-1">
            <Calendar className="w-3.5 h-3.5 text-emerald" />
            <span>{todayFormatted}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest dark:text-emerald-400 tracking-tight mt-1">
            {greeting}, {state.profile.name}! 🌱
          </h1>
          <p className="text-sm text-muted dark:text-gray-400 mt-0.5">
            Every small action makes our campus greener.
          </p>
        </div>

        {/* Level Emblem Pill */}
        <div className="self-start sm:self-auto flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-2xl border border-sunny/30 shadow-sm badge-glow">
          <div className="w-8 h-8 rounded-xl bg-sunny/20 text-amber-600 dark:text-sunny flex items-center justify-center font-extrabold">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted dark:text-gray-400">Current Rank</p>
            <p className="text-xs font-extrabold text-charcoal dark:text-gray-100">{currentLevel.name}</p>
          </div>
        </div>
      </div>

      {/* 3D Hero Card with Floating Earth & Interactive Lighting */}
      <Card3D intensity={6} scale={1.01} glare={false}>
        <div
          className="rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-3d-hero relative overflow-hidden shimmer-sweep"
          style={{
            backgroundColor: '#14532D',
            backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(52, 211, 153, 0.25) 0%, transparent 50%), linear-gradient(135deg, #0d381e 0%, #14532D 55%, #186034 100%)',
          }}
        >
          {/* Subtle Ambient Glows */}
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-emerald-400/15 pointer-events-none blur-3xl" />
          <div className="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-sunny/10 pointer-events-none blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-mint border border-white/15 shadow-sm">
                <Sparkles className="w-4 h-4 text-sunny animate-spin" style={{ animationDuration: '6s' }} />
                <span>Campus Sustainability Sprint</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight drop-shadow-md">
                Make Today a <span className="text-emerald-300">Little Greener.</span>
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Complete small eco-friendly actions and turn your everyday habits into meaningful collective impact across our campus.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('challenges')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-forest hover:bg-emerald-50 font-extrabold text-sm btn-3d-white cursor-pointer active:scale-95"
                >
                  <span>Explore Today's Challenges</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('impact')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                >
                  <span>Campus Impact</span>
                </button>
              </div>
            </div>

            {/* 3D Visual Center: Floating Earth Orb + Progress Ring */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 self-center lg:self-auto shrink-0">
              {/* 3D Floating Earth Globe Orb */}
              <div className="globe-3d-container relative flex items-center justify-center">
                <div className="globe-3d relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-2xl border-2 border-emerald-300/40 p-1 bg-white/10 backdrop-blur-sm">
                  <img
                    src={earthGlobeImg}
                    alt="Green Earth"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-forest/40 via-transparent to-emerald-300/30 pointer-events-none" />
                </div>

                {/* Orbiting 3D floating badges */}
                <div className="floating-badge-1 absolute -top-3 -right-2 px-2.5 py-1 rounded-full bg-white text-forest text-[10px] font-extrabold shadow-lg border border-emerald-200/50 flex items-center gap-1">
                  <span>🌱</span>
                  <span>Eco Active</span>
                </div>
                <div className="floating-badge-2 absolute -bottom-2 -left-2 px-2.5 py-1 rounded-full bg-sunny text-charcoal text-[10px] font-extrabold shadow-lg flex items-center gap-1">
                  <span>⚡</span>
                  <span>Campus Impact</span>
                </div>
              </div>

              {/* Progress Ring Box with Glassmorphism */}
              <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-xl rounded-3xl p-6 border border-white/20 min-w-[190px] shadow-2xl">
                <ProgressRing
                  percentage={completionPercentage}
                  size={120}
                  strokeWidth={10}
                  color="#34D399"
                  bgColor="rgba(255, 255, 255, 0.2)"
                >
                  <div className="text-center">
                    <span className="text-2xl font-black text-white">
                      {completionPercentage}%
                    </span>
                    <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">
                      Completed
                    </p>
                  </div>
                </ProgressRing>
                <p className="text-xs font-semibold text-emerald-100 mt-3 text-center">
                  {completedTodayCount} of {totalChallengesCount} daily tasks done
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Statistics Cards (Enhanced 3D and rich palette) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total EcoPoints"
          value={state.totalPoints}
          icon={<Zap className="w-6 h-6" />}
          color="#10B981"
          trend="+ points earned"
          animate
        />
        <StatCard
          title="Today's Completed"
          value={`${completedTodayCount} / ${totalChallengesCount}`}
          icon={<CheckCircle2 className="w-6 h-6" />}
          color="#3B82F6"
          trend={completionPercentage === 100 ? 'All done today! 🎉' : 'In progress'}
          animate
        />
        <StatCard
          title="Daily Streak"
          value={`${streak.current} ${streak.current === 1 ? 'day' : 'days'}`}
          icon={<Flame className="w-6 h-6" />}
          color="#FB7185"
          trend={streak.current > 0 ? `Best: ${streak.longest} days` : 'Complete 1 to start!'}
          animate
        />
        <StatCard
          title="Current Eco-Level"
          value={currentLevel.name}
          icon={<Shield className="w-6 h-6" />}
          color="#FBBF24"
          trend={currentLevel.maxPoints === Infinity ? 'Max rank achieved' : `Next at ${currentLevel.maxPoints + 1} pts`}
          animate
        />
      </div>

      {/* Main Grid: Today's Challenges Preview & Streak Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Today's Challenges Preview (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald animate-ping" />
                <h3 className="text-lg font-bold text-charcoal dark:text-gray-100">
                  Today's Challenges
                </h3>
              </div>
              <p className="text-xs text-muted dark:text-gray-400">
                Actionable green habits you can check off right now
              </p>
            </div>
            <button
              onClick={() => onNavigate('challenges')}
              className="text-xs font-bold text-emerald hover:text-forest dark:hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors px-3 py-1.5 rounded-xl bg-sage/60 dark:bg-gray-800 hover:bg-mint"
            >
              <span>View All ({CHALLENGES.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previewChallenges.map((challenge) => {
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
        </div>

        {/* Streak Card & Weekly Activity (1 col) with 3D Tilt */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-charcoal dark:text-gray-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-coral animate-pulse" />
              <span>Streak & Activity</span>
            </h3>
            <p className="text-xs text-muted dark:text-gray-400">
              7-day campus activity tracker
            </p>
          </div>

          <Card3D intensity={8}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/80 shadow-3d-card space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-coral/15 text-coral-dark dark:text-coral flex items-center justify-center font-bold text-lg badge-glow-coral">
                    🔥
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-charcoal dark:text-gray-100">
                      {streak.current} Day {streak.current === 1 ? 'Streak' : 'Streaks'}
                    </h4>
                    <p className="text-xs text-muted dark:text-gray-400">
                      {streak.current > 0
                        ? 'You are on fire! Keep it going.'
                        : 'Complete a task today to light your flame!'}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-xl bg-sunny/20 border border-sunny/30 text-amber-800 dark:text-sunny text-xs font-bold">
                  Best: {streak.longest}d
                </div>
              </div>

              {/* 7-Day calendar visualization with 3D tactile pills */}
              <div className="grid grid-cols-7 gap-1.5 pt-1">
                {weekDays.map((day) => (
                  <div
                    key={day.dateStr}
                    className={`flex flex-col items-center py-3 px-1 rounded-2xl text-center transition-all ${
                      day.isToday
                        ? 'ring-2 ring-emerald bg-mint/50 dark:bg-emerald-950/60 shadow-md scale-105'
                        : 'bg-sage/50 dark:bg-gray-700/40 hover:bg-sage'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-muted dark:text-gray-400 uppercase">
                      {day.dayName}
                    </span>
                    <span className="text-xs font-extrabold text-charcoal dark:text-gray-100 mt-1">
                      {day.dayNum}
                    </span>
                    <div className="mt-2.5">
                      {day.hasCompleted ? (
                        <div className="w-5 h-5 rounded-full bg-emerald flex items-center justify-center text-white shadow-md badge-glow-emerald animate-scale-in">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Motivational Insight Box with Sage and Mint theme */}
              <div className="p-4 bg-gradient-to-r from-sage/70 to-mint/40 dark:from-gray-700/60 dark:to-emerald-950/30 rounded-2xl text-xs text-charcoal dark:text-gray-200 leading-relaxed flex items-start gap-3 border border-emerald/20">
                <Award className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                <span>
                  <strong>Campus Eco Fact:</strong> Consistent daily micro-habits on campus divert an average of <strong>12kg of waste</strong> and <strong>45 kWh</strong> per student semester!
                </span>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
