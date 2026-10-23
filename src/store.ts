import type { AppState, Challenge, CompletedChallenge, Badge, Level, Notification } from './types';
import { CHALLENGES, BADGES, LEVELS } from './data';

const STORAGE_KEY = 'ecoquest-state';
const LEGACY_STORAGE_KEY = 'greenpoints-state';

export function getToday(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function createDefaultState(): AppState {
  const today = getToday();
  return {
    profile: {
      name: 'Eco Warrior',
      avatar: 'EW',
      joinedDate: today,
    },
    completedChallenges: [],
    totalPoints: 0,
    streakDays: [],
    preferences: {
      theme: 'light',
      reminders: true,
      reducedMotion: false,
    },
    notifications: [
      {
        id: generateId(),
        title: 'Welcome to EcoQuest! 🌱',
        message: 'Start completing sustainability challenges to earn points and climb the leaderboard.',
        time: new Date().toISOString(),
        read: false,
        type: 'info',
      },
      {
        id: generateId(),
        title: 'Daily Challenges Available',
        message: 'Check out today\'s challenges and start making a difference on campus.',
        time: new Date(Date.now() - 60000).toISOString(),
        read: false,
        type: 'info',
      },
      {
        id: generateId(),
        title: 'Earn Your First Badge! 🏆',
        message: 'Complete any challenge to unlock the "First Green Step" badge.',
        time: new Date(Date.now() - 120000).toISOString(),
        read: false,
        type: 'achievement',
      },
    ],
    lastResetDate: today,
  };
}

export function loadState(): AppState {
  try {
    let stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      stored = localStorage.getItem(LEGACY_STORAGE_KEY);
    }
    if (stored) {
      const parsed = JSON.parse(stored) as AppState;
      return checkDailyReset(parsed);
    }
  } catch {
    // If parsing fails, return default state
  }
  return createDefaultState();
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silently fail if localStorage is full or unavailable
  }
}

export function getTodayCompleted(state: AppState): CompletedChallenge[] {
  const today = getToday();
  return state.completedChallenges.filter(
    (c) => c.completedAt.split('T')[0] === today
  );
}

export function completeChallenge(state: AppState, challenge: Challenge): AppState {
  const today = getToday();

  // Check if already completed today
  const alreadyCompleted = state.completedChallenges.some(
    (c) => c.challengeId === challenge.id && c.completedAt.split('T')[0] === today
  );
  if (alreadyCompleted) {
    return state;
  }

  const newCompleted: CompletedChallenge = {
    challengeId: challenge.id,
    completedAt: new Date().toISOString(),
    points: challenge.points,
  };

  const updatedChallenges = [...state.completedChallenges, newCompleted];
  const updatedPoints = state.totalPoints + challenge.points;

  // Add today to streakDays if not already present
  const updatedStreakDays = state.streakDays.includes(today)
    ? [...state.streakDays]
    : [...state.streakDays, today];

  // Create points notification
  const pointsNotification: Notification = {
    id: generateId(),
    title: `+${challenge.points} EcoPoints! 🎉`,
    message: `You completed "${challenge.title}" and earned ${challenge.points} EcoPoints.`,
    time: new Date().toISOString(),
    read: false,
    type: 'points',
  };

  const newState: AppState = {
    ...state,
    completedChallenges: updatedChallenges,
    totalPoints: updatedPoints,
    streakDays: updatedStreakDays,
    notifications: [pointsNotification, ...state.notifications],
  };

  // Check and update badges
  const updatedBadges = checkBadges(newState);
  const currentBadges = checkBadges(state);

  // Find newly unlocked badges and add notifications
  const newBadgeNotifications: Notification[] = [];
  updatedBadges.forEach((badge, index) => {
    if (badge.unlocked && !currentBadges[index].unlocked) {
      newBadgeNotifications.push({
        id: generateId(),
        title: `Badge Unlocked: ${badge.name}! 🏆`,
        message: badge.description,
        time: new Date().toISOString(),
        read: false,
        type: 'achievement',
      });
    }
  });

  // Check streak milestones
  const { current: newStreak } = getStreak(updatedStreakDays);
  const { current: oldStreak } = getStreak(state.streakDays);
  if (newStreak > oldStreak && newStreak >= 3 && newStreak % 3 === 0) {
    newBadgeNotifications.push({
      id: generateId(),
      title: `${newStreak}-Day Streak! 🔥`,
      message: `Amazing! You've completed challenges for ${newStreak} consecutive days.`,
      time: new Date().toISOString(),
      read: false,
      type: 'streak',
    });
  }

  return {
    ...newState,
    notifications: [...newBadgeNotifications, ...newState.notifications],
  };
}

export function undoChallenge(state: AppState, challengeId: string): AppState {
  const today = getToday();

  // Find the challenge completed today
  const challengeIndex = state.completedChallenges.findIndex(
    (c) => c.challengeId === challengeId && c.completedAt.split('T')[0] === today
  );

  if (challengeIndex === -1) {
    return state;
  }

  const removedChallenge = state.completedChallenges[challengeIndex];
  const updatedChallenges = state.completedChallenges.filter((_, i) => i !== challengeIndex);
  const updatedPoints = state.totalPoints - removedChallenge.points;

  // Check if any other challenges were completed today; if not, remove today from streakDays
  const hasOtherTodayChallenges = updatedChallenges.some(
    (c) => c.completedAt.split('T')[0] === today
  );
  const updatedStreakDays = hasOtherTodayChallenges
    ? [...state.streakDays]
    : state.streakDays.filter((d) => d !== today);

  return {
    ...state,
    completedChallenges: updatedChallenges,
    totalPoints: Math.max(0, updatedPoints),
    streakDays: updatedStreakDays,
  };
}

export function getCurrentLevel(points: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getLevelProgress(points: number): {
  current: Level;
  next: Level | null;
  progress: number;
} {
  const current = getCurrentLevel(points);
  const currentIndex = LEVELS.findIndex((l) => l.name === current.name);
  const next = currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;

  if (!next) {
    return { current, next: null, progress: 100 };
  }

  const range = next.minPoints - current.minPoints;
  const pointsInLevel = points - current.minPoints;
  const progress = Math.min(100, Math.round((pointsInLevel / range) * 100));

  return { current, next, progress };
}

export function checkBadges(state: AppState): Badge[] {
  const today = getToday();

  // Count challenges by category (all time)
  const categoryCounts: Record<string, number> = {};
  state.completedChallenges.forEach((completed) => {
    const challenge = CHALLENGES.find((c) => c.id === completed.challengeId);
    if (challenge) {
      categoryCounts[challenge.category] = (categoryCounts[challenge.category] || 0) + 1;
    }
  });

  const { current: currentStreak } = getStreak(state.streakDays);

  return BADGES.map((badge) => {
    let shouldUnlock = false;

    switch (badge.id) {
      case 'first-step':
        shouldUnlock = state.completedChallenges.length >= 1;
        break;
      case 'recycling-hero':
        shouldUnlock = (categoryCounts['recycling'] || 0) >= 5;
        break;
      case 'water-saver':
        shouldUnlock = (categoryCounts['water'] || 0) >= 5;
        break;
      case 'energy-guardian':
        shouldUnlock = (categoryCounts['energy'] || 0) >= 5;
        break;
      case 'three-day-streak':
        shouldUnlock = currentStreak >= 3;
        break;
      case 'eco-champion':
        shouldUnlock = state.totalPoints >= 500;
        break;
      case 'campus-guardian':
        shouldUnlock = state.totalPoints >= 1000;
        break;
    }

    if (shouldUnlock && !badge.unlocked) {
      return { ...badge, unlocked: true, unlockedAt: today };
    }

    return { ...badge };
  });
}

export function getStreak(streakDays: string[]): { current: number; longest: number } {
  if (streakDays.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Sort days ascending
  const sortedDays = [...streakDays].sort();
  const uniqueDays = Array.from(new Set(sortedDays));

  const today = getToday();
  const todayTime = new Date(today).getTime();
  const oneDayMs = 86400000;

  // Calculate current streak (counting backwards from today)
  let current = 0;
  let checkDate = todayTime;

  for (let i = 0; i < uniqueDays.length; i++) {
    const checkDateStr = new Date(checkDate).toISOString().split('T')[0];
    if (uniqueDays.includes(checkDateStr)) {
      current++;
      checkDate -= oneDayMs;
    } else {
      break;
    }
  }

  // If today isn't in the streak, check if yesterday starts a streak
  if (current === 0) {
    checkDate = todayTime - oneDayMs;
    for (let i = 0; i < uniqueDays.length; i++) {
      const checkDateStr = new Date(checkDate).toISOString().split('T')[0];
      if (uniqueDays.includes(checkDateStr)) {
        current++;
        checkDate -= oneDayMs;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  let longest = 0;
  let tempStreak = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    const prevDate = new Date(uniqueDays[i - 1]).getTime();
    const currDate = new Date(uniqueDays[i]).getTime();

    if (currDate - prevDate === oneDayMs) {
      tempStreak++;
    } else {
      longest = Math.max(longest, tempStreak);
      tempStreak = 1;
    }
  }
  longest = Math.max(longest, tempStreak);

  // Current streak should not exceed longest
  longest = Math.max(longest, current);

  return { current, longest };
}

export function checkDailyReset(state: AppState): AppState {
  const today = getToday();

  if (state.lastResetDate === today) {
    return state;
  }

  // Daily reset: update the lastResetDate but preserve all lifetime data
  // (totalPoints, streakDays, completedChallenges, badges, etc.)
  // The "reset" means users can complete challenges again on the new day,
  // which is naturally handled by the date-based completion check
  return {
    ...state,
    lastResetDate: today,
  };
}

export function resetState(): AppState {
  localStorage.removeItem(STORAGE_KEY);
  return createDefaultState();
}
