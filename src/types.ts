export type Category = 'recycling' | 'energy' | 'water' | 'transport' | 'reusable';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type LevelName = 'Eco Rookie' | 'Green Explorer' | 'Planet Protector' | 'Eco Champion' | 'Campus Guardian';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  category: Category;
  difficulty: Difficulty;
  icon: string;
}

export interface CompletedChallenge {
  challengeId: string;
  completedAt: string;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Level {
  name: LevelName;
  minPoints: number;
  maxPoints: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: LevelName;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  joinedDate: string;
}

export interface AppState {
  profile: UserProfile;
  completedChallenges: CompletedChallenge[];
  totalPoints: number;
  streakDays: string[];
  preferences: {
    theme: 'light' | 'dark';
    reminders: boolean;
    reducedMotion: boolean;
  };
  notifications: Notification[];
  lastResetDate: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'achievement' | 'points' | 'streak' | 'info';
}

export type Page = 'dashboard' | 'challenges' | 'achievements' | 'impact' | 'leaderboard' | 'profile';
