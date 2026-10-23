import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type { AppState, Challenge, Notification as AppNotification } from './types';
import { loadState, saveState, completeChallenge as doComplete, undoChallenge as doUndo, checkDailyReset, resetState } from './store';

type Action =
  | { type: 'COMPLETE_CHALLENGE'; challenge: Challenge }
  | { type: 'UNDO_CHALLENGE'; challengeId: string }
  | { type: 'SET_THEME'; theme: 'light' | 'dark' }
  | { type: 'SET_REMINDERS'; enabled: boolean }
  | { type: 'SET_REDUCED_MOTION'; enabled: boolean }
  | { type: 'UPDATE_PROFILE'; name: string }
  | { type: 'MARK_NOTIFICATIONS_READ' }
  | { type: 'ADD_NOTIFICATION'; notification: AppNotification }
  | { type: 'RESET' }
  | { type: 'DAILY_RESET' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'COMPLETE_CHALLENGE':
      return doComplete(state, action.challenge);
    case 'UNDO_CHALLENGE':
      return doUndo(state, action.challengeId);
    case 'SET_THEME':
      return { ...state, preferences: { ...state.preferences, theme: action.theme } };
    case 'SET_REMINDERS':
      return { ...state, preferences: { ...state.preferences, reminders: action.enabled } };
    case 'SET_REDUCED_MOTION':
      return { ...state, preferences: { ...state.preferences, reducedMotion: action.enabled } };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.name,
          avatar: action.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
        },
      };
    case 'MARK_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.notification, ...state.notifications].slice(0, 20),
      };
    case 'RESET':
      return resetState();
    case 'DAILY_RESET':
      return checkDailyReset(state);
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  completeChallenge: (challenge: Challenge) => void;
  undoChallenge: (challengeId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const loaded = loadState();
    return checkDailyReset(loaded);
  });

  // Save state to localStorage on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Apply theme
  useEffect(() => {
    if (state.preferences.theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [state.preferences.theme]);

  // Apply reduced motion
  useEffect(() => {
    if (state.preferences.reducedMotion) {
      document.documentElement.style.setProperty('--anim-duration', '0.01ms');
    } else {
      document.documentElement.style.removeProperty('--anim-duration');
    }
  }, [state.preferences.reducedMotion]);

  // Check daily reset periodically
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'DAILY_RESET' });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleCompleteChallenge = useCallback((challenge: Challenge) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', challenge });
  }, []);

  const handleUndoChallenge = useCallback((challengeId: string) => {
    dispatch({ type: 'UNDO_CHALLENGE', challengeId });
  }, []);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      completeChallenge: handleCompleteChallenge,
      undoChallenge: handleUndoChallenge,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
