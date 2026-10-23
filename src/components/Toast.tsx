import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { Check, AlertCircle, Info, Award, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'achievement';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_STYLES: Record<ToastType, { bg: string; icon: React.ElementType }> = {
  success: { bg: 'bg-emerald', icon: Check },
  achievement: { bg: 'bg-sunny', icon: Award },
  error: { bg: 'bg-coral', icon: AlertCircle },
  info: { bg: 'bg-blue-500', icon: Info },
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [exiting, setExiting] = useState(false);
  const style = TOAST_STYLES[toast.type];
  const IconComponent = style.icon;

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, toast.duration - 300);

    const removeTimer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, toast.duration, onRemove]);

  const textColor = toast.type === 'achievement' ? 'text-charcoal' : 'text-white';
  const iconColor = toast.type === 'achievement' ? 'text-charcoal/70' : 'text-white/80';
  const buttonHover = toast.type === 'achievement' ? 'hover:bg-black/10' : 'hover:bg-white/20';

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[280px] max-w-sm
        ${style.bg} ${textColor}
        transition-all duration-300 ease-out
        ${exiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0 animate-slide-in-right'}
      `}
      role="alert"
    >
      <IconComponent className={`w-5 h-5 shrink-0 ${iconColor}`} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${buttonHover} transition-colors`}
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: Toast = {
      id,
      message,
      type,
      duration: type === 'achievement' ? 4000 : 3000,
    };
    setToasts((prev) => [...prev, newToast].slice(-5));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
