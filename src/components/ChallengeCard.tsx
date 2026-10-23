import type { Challenge, CompletedChallenge } from '../types';
import {
  CheckCircle2,
  Undo2,
  GlassWater,
  Recycle,
  Lightbulb,
  Bike,
  UtensilsCrossed,
  ShoppingBag,
  Droplets,
  Droplet,
  Trash2,
  Leaf,
  Sparkles,
} from 'lucide-react';
import { Card3D } from './Card3D';

interface ChallengeCardProps {
  challenge: Challenge;
  completed: boolean;
  completedEntry?: CompletedChallenge;
  onComplete: (challenge: Challenge) => void;
  onUndo?: (challengeId: string) => void;
}

const difficultyStyles: Record<string, { bg: string; text: string; border: string }> = {
  Easy: {
    bg: 'bg-emerald/10 dark:bg-emerald-950/40',
    text: 'text-emerald dark:text-emerald-300',
    border: 'border-emerald/30',
  },
  Medium: {
    bg: 'bg-sunny/15 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-sunny',
    border: 'border-sunny/40',
  },
  Hard: {
    bg: 'bg-coral/15 dark:bg-rose-950/40',
    text: 'text-coral-dark dark:text-coral',
    border: 'border-coral/40',
  },
};

const categoryTheme: Record<string, { border: string; accent: string; lightBg: string }> = {
  recycling: { border: '#10B981', accent: 'bg-emerald', lightBg: 'bg-mint/40 dark:bg-emerald-950/30' },
  energy: { border: '#FBBF24', accent: 'bg-sunny', lightBg: 'bg-amber-50 dark:bg-amber-950/30' },
  water: { border: '#3B82F6', accent: 'bg-blue-500', lightBg: 'bg-blue-50 dark:bg-blue-950/30' },
  transport: { border: '#8B5CF6', accent: 'bg-purple-500', lightBg: 'bg-purple-50 dark:bg-purple-950/30' },
  reusable: { border: '#FB7185', accent: 'bg-coral', lightBg: 'bg-rose-50 dark:bg-rose-950/30' },
};

const ICON_MAP: Record<string, React.ElementType> = {
  GlassWater,
  Recycle,
  Lightbulb,
  Bike,
  UtensilsCrossed,
  ShoppingBag,
  Droplets,
  Droplet,
  Trash2,
  Leaf,
};

export function ChallengeCard({
  challenge,
  completed,
  onComplete,
  onUndo,
}: ChallengeCardProps) {
  const IconComponent = ICON_MAP[challenge.icon] || Leaf;
  const theme = categoryTheme[challenge.category] || categoryTheme.recycling;
  const diffStyle = difficultyStyles[challenge.difficulty] || difficultyStyles.Easy;

  return (
    <Card3D intensity={8} scale={1.02} className="h-full">
      <div
        className={`h-full rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between shadow-3d-card relative overflow-hidden group ${
          completed
            ? 'bg-mint/30 dark:bg-emerald-950/30 border-emerald/40'
            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/80 hover:border-emerald/40'
        }`}
        style={{
          borderLeftWidth: '5px',
          borderLeftColor: theme.border,
        }}
      >
        <div>
          <div className="flex items-start gap-3.5 mb-3">
            {/* 3D Icon with shadow */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-md ${
                completed
                  ? 'bg-emerald text-white badge-glow-emerald'
                  : 'bg-sage dark:bg-gray-700 text-forest dark:text-emerald-400'
              }`}
            >
              {completed ? (
                <CheckCircle2 className="w-6 h-6 animate-scale-in" />
              ) : (
                <IconComponent className="w-6 h-6" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3
                  className={`font-bold text-sm tracking-tight leading-snug ${
                    completed
                      ? 'line-through text-muted dark:text-gray-400'
                      : 'text-charcoal dark:text-gray-100'
                  }`}
                >
                  {challenge.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}`}
                >
                  {challenge.difficulty}
                </span>
                <span className="text-[10px] font-semibold text-muted dark:text-gray-400 capitalize">
                  {challenge.category}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
            {challenge.description}
          </p>
        </div>

        {/* Card Footer: Points & Complete Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/60 mt-auto">
          {/* 3D Points Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sunny/15 border border-sunny/30 text-amber-800 dark:text-sunny font-extrabold text-xs shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sunny" />
            <span>+{challenge.points} PTS</span>
          </div>

          {completed ? (
            onUndo ? (
              <button
                onClick={() => onUndo(challenge.id)}
                className="flex items-center gap-1.5 text-xs text-muted dark:text-gray-400 hover:text-coral transition-colors font-semibold px-2.5 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>
            ) : (
              <span className="flex items-center gap-1 text-xs text-emerald dark:text-emerald-400 font-bold px-3 py-1 bg-mint/50 dark:bg-emerald-950/50 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Done
              </span>
            )
          ) : (
            <button
              onClick={() => onComplete(challenge)}
              className="px-4 py-2 bg-forest dark:bg-emerald-600 text-white text-xs font-bold rounded-xl btn-3d-primary cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <span>Complete</span>
              <span className="text-[10px] opacity-80">✓</span>
            </button>
          )}
        </div>
      </div>
    </Card3D>
  );
}

export default ChallengeCard;
