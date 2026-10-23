import { useEffect, useState, type ReactNode } from 'react';
import { Card3D } from './Card3D';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  color?: string;
  animate?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  color = '#10B981',
  animate = false,
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(!animate);

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setIsVisible(true), 80);
      return () => clearTimeout(timeout);
    }
  }, [animate]);

  return (
    <Card3D intensity={10} scale={1.03} className="h-full">
      <div
        className="h-full bg-white dark:bg-gray-800 rounded-3xl p-5 md:p-6 shadow-3d-card border border-gray-100 dark:border-gray-700/80 transition-all duration-300 relative overflow-hidden group cursor-default"
      >
        {/* Subtle decorative color glow in corner */}
        <div
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: color }}
        />

        {/* Top colored accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: color }}
        />

        <div className="flex items-start justify-between relative z-10 pt-1">
          <div className="flex-1 min-w-0">
            <div
              className={`
                text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal dark:text-gray-100 tracking-tight
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
            >
              {value}
            </div>
            <p className="text-xs sm:text-sm text-muted dark:text-gray-400 mt-1 font-medium truncate">
              {title}
            </p>
            {trend && (
              <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-sage/60 dark:bg-gray-700/60 text-[11px] font-semibold text-forest dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                <span>{trend}</span>
              </div>
            )}
          </div>

          {/* 3D Icon Container */}
          <div
            className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 ml-3 shadow-md group-hover:scale-110 transition-transform duration-300"
            style={{
              backgroundColor: `${color}18`,
              border: `1.5px solid ${color}35`,
              color,
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    </Card3D>
  );
}

export default StatCard;
