import { useState, useMemo } from 'react';
import {
  Edit2,
  Check,
  X,
  Shield,
  Zap,
  Target,
  Flame,
  Award,
  Sun,
  Moon,
  Bell,
  Eye,
  RotateCcw,
  AlertTriangle,
  Calendar,
  History,
  ArrowRight,
} from 'lucide-react';
import type { Page } from '../types';
import { useApp } from '../AppContext';
import { useToast } from '../components/Toast';
import { CHALLENGES } from '../data';
import { getCurrentLevel, getStreak, checkBadges } from '../store';
import { StatCard } from '../components/StatCard';
import { Card3D } from '../components/Card3D';

interface ProfileProps {
  onNavigate?: (page: Page) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const { state, dispatch } = useApp();
  const { showToast } = useToast();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(state.profile.name);
  const [showResetModal, setShowResetModal] = useState(false);

  const currentLevel = getCurrentLevel(state.totalPoints);
  const streak = getStreak(state.streakDays);
  const badges = useMemo(() => checkBadges(state), [state]);
  const unlockedBadges = badges.filter((b) => b.unlocked);

  // Recent completed challenges (most recent 10)
  const recentHistory = useMemo(() => {
    return [...state.completedChallenges].reverse().slice(0, 10).map((c) => {
      const challengeDef = CHALLENGES.find((ch) => ch.id === c.challengeId);
      return {
        ...c,
        title: challengeDef?.title || 'Eco Action',
        category: challengeDef?.category || 'reusable',
        difficulty: challengeDef?.difficulty || 'Easy',
      };
    });
  }, [state.completedChallenges]);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    dispatch({ type: 'UPDATE_PROFILE', name: trimmed });
    setIsEditingName(false);
    showToast('Profile name updated!', 'success');
  };

  const handleThemeToggle = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', theme });
    showToast(`Switched to ${theme} theme`, 'info');
  };

  const handleConfirmReset = () => {
    dispatch({ type: 'RESET' });
    setShowResetModal(false);
    showToast('Demo data has been reset to defaults', 'info');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* 3D Profile Header Card */}
      <Card3D intensity={6}>
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald/20 shadow-3d-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-mint/30 via-sage/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              {/* 3D Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-forest to-emerald text-white flex items-center justify-center text-2xl font-black shadow-xl badge-glow-emerald">
                  {state.profile.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-sunny border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-charcoal shadow-md">
                  🌱
                </div>
              </div>

              {/* Name & Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="px-3.5 py-1.5 rounded-xl border-2 border-emerald text-lg font-bold text-charcoal dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        className="w-9 h-9 rounded-xl bg-emerald text-white flex items-center justify-center hover:bg-emerald-light transition-colors cursor-pointer shadow-sm active:scale-95"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setNameInput(state.profile.name);
                          setIsEditingName(false);
                        }}
                        className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 text-muted flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-gray-100 tracking-tight">
                        {state.profile.name}
                      </h1>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="p-2 rounded-xl text-muted hover:text-emerald hover:bg-mint/40 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        title="Edit Name"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted dark:text-gray-400">
                  <span className="inline-flex items-center gap-1 font-bold text-emerald dark:text-emerald-400">
                    <Shield className="w-3.5 h-3.5" />
                    {currentLevel.name}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Joined {state.profile.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto justify-end">
              <span className="px-4 py-2 rounded-2xl bg-gradient-to-r from-mint to-sage text-forest font-extrabold text-xs shadow-sm border border-emerald/20">
                Verified Student Warrior
              </span>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Lifetime EcoPoints"
          value={state.totalPoints}
          icon={<Zap className="w-6 h-6" />}
          color="#10B981"
          trend="Lifetime points"
          animate
        />
        <StatCard
          title="Challenges Done"
          value={state.completedChallenges.length}
          icon={<Target className="w-6 h-6" />}
          color="#3B82F6"
          trend="Tasks verified"
          animate
        />
        <StatCard
          title="Current Streak"
          value={`${streak.current} days`}
          icon={<Flame className="w-6 h-6" />}
          color="#FB7185"
          trend="Consistency count"
          animate
        />
        <StatCard
          title="Longest Streak"
          value={`${streak.longest} days`}
          icon={<Award className="w-6 h-6" />}
          color="#FBBF24"
          trend="Personal record"
          animate
        />
      </div>

      {/* Badges Preview with 3D Chips */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700/80 shadow-3d-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-charcoal dark:text-gray-100">
              Unlocked Badges ({unlockedBadges.length} of {badges.length})
            </h3>
            <p className="text-xs text-muted dark:text-gray-400">
              Milestone accolades earned on your eco journey
            </p>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('achievements')}
              className="text-xs font-bold text-emerald hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {unlockedBadges.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-sage/30 dark:bg-gray-700/40 border border-dashed border-gray-200 dark:border-gray-600">
            <p className="text-xs text-muted dark:text-gray-400">
              No badges unlocked yet. Complete your first challenge to earn "First Green Step"!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {unlockedBadges.map((b) => (
              <div
                key={b.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-sunny/20 to-amber-100/40 dark:from-amber-950/40 dark:to-gray-800 border border-sunny/40 text-xs font-extrabold text-amber-900 dark:text-sunny shadow-sm hover:scale-105 transition-transform"
              >
                <span>🏆</span>
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Challenge Activity History */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700/80 shadow-3d-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-charcoal dark:text-gray-100 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald" />
              <span>Recent Activity History</span>
            </h3>
            <p className="text-xs text-muted dark:text-gray-400">
              Last {recentHistory.length} completed eco actions
            </p>
          </div>
        </div>

        {recentHistory.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted dark:text-gray-400 bg-sage/20 rounded-2xl">
            No activity logged yet today. Check off some challenges from the dashboard!
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {recentHistory.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-3 text-xs hover:bg-cream dark:hover:bg-gray-750 px-2 rounded-xl transition-colors">
                <div>
                  <p className="font-extrabold text-charcoal dark:text-gray-100">{item.title}</p>
                  <p className="text-[10px] text-muted dark:text-gray-400 mt-0.5">
                    {new Date(item.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.completedAt.split('T')[0]}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald text-xs bg-mint dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                    +{item.points} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preferences Section with 3D Switches */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700/80 shadow-3d-card space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-charcoal dark:text-gray-100">
            App Preferences
          </h3>
          <p className="text-xs text-muted dark:text-gray-400">
            Customise your EcoQuest interface experience
          </p>
        </div>

        <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-700">
          {/* Theme Switcher */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sage dark:bg-gray-700 flex items-center justify-center text-forest dark:text-emerald-400 shadow-xs">
                {state.preferences.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-sunny" />}
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal dark:text-gray-100">Interface Theme</p>
                <p className="text-xs text-muted dark:text-gray-400">Switch between light cream and dark modes</p>
              </div>
            </div>

            <div className="flex bg-gray-100 dark:bg-gray-700 p-1.5 rounded-2xl shadow-inner">
              <button
                onClick={() => handleThemeToggle('light')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  state.preferences.theme === 'light'
                    ? 'bg-white text-forest shadow-md scale-105'
                    : 'text-muted'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeToggle('dark')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  state.preferences.theme === 'dark'
                    ? 'bg-gray-900 text-white shadow-md scale-105'
                    : 'text-muted'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Daily Reminders Toggle */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sage dark:bg-gray-700 flex items-center justify-center text-forest dark:text-emerald-400 shadow-xs">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal dark:text-gray-100">Daily Challenge Reminders</p>
                <p className="text-xs text-muted dark:text-gray-400">Simulate daily morning motivation nudges</p>
              </div>
            </div>

            <button
              onClick={() => {
                const nextVal = !state.preferences.reminders;
                dispatch({ type: 'SET_REMINDERS', enabled: nextVal });
                showToast(`Daily reminders ${nextVal ? 'enabled' : 'disabled'}`, 'info');
              }}
              className={`w-13 h-7 rounded-full transition-colors relative cursor-pointer shadow-inner ${
                state.preferences.reminders ? 'bg-emerald' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-white transition-transform shadow-md absolute top-0.5 ${
                  state.preferences.reminders ? 'translate-x-6.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sage dark:bg-gray-700 flex items-center justify-center text-forest dark:text-emerald-400 shadow-xs">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal dark:text-gray-100">Reduced Motion</p>
                <p className="text-xs text-muted dark:text-gray-400">Minimize 3D and floating animations</p>
              </div>
            </div>

            <button
              onClick={() => {
                const nextVal = !state.preferences.reducedMotion;
                dispatch({ type: 'SET_REDUCED_MOTION', enabled: nextVal });
                showToast(`Reduced motion ${nextVal ? 'enabled' : 'disabled'}`, 'info');
              }}
              className={`w-13 h-7 rounded-full transition-colors relative cursor-pointer shadow-inner ${
                state.preferences.reducedMotion ? 'bg-emerald' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-white transition-transform shadow-md absolute top-0.5 ${
                  state.preferences.reducedMotion ? 'translate-x-6.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Demo Data */}
      <div className="bg-gradient-to-r from-red-50/70 to-rose-100/40 dark:from-red-950/30 dark:to-rose-950/20 rounded-3xl p-6 sm:p-8 border border-coral/30 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-coral/20 text-coral-dark dark:text-coral flex items-center justify-center shrink-0 shadow-sm badge-glow-coral">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-red-900 dark:text-red-300">
                Reset Demo Data
              </h4>
              <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">
                Clears all stored progress and restores fresh initial competition state.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowResetModal(true)}
            className="px-5 py-3 rounded-2xl bg-coral hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            Reset All Data
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowResetModal(false)}
          />
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-700 space-y-4 animate-scale-in">
            <div className="w-12 h-12 rounded-2xl bg-coral/20 text-coral flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-charcoal dark:text-gray-100">
                Reset Demo Progress?
              </h3>
              <p className="text-xs text-muted dark:text-gray-400 mt-1 leading-relaxed">
                This will reset your points, active streak, completed challenges, and unlock status back to starting demo defaults. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-charcoal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-5 py-2.5 rounded-xl bg-coral hover:bg-rose-600 text-white text-xs font-bold cursor-pointer shadow-md active:scale-95"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
