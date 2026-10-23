import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  shape: 'leaf' | 'sparkle' | 'circle';
  opacity: number;
}

interface CelebrationProps {
  active: boolean;
  onComplete?: () => void;
  points?: number;
}

const COLORS = ['#10B981', '#34D399', '#FBBF24', '#D1FAE5', '#059669', '#FDE68A'];

export function CelebrationEffects({ active, onComplete, points }: CelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      setShowBadge(false);
      return;
    }

    setShowBadge(true);

    // Generate 32 particles bursting from center/bottom
    const newParticles: Particle[] = Array.from({ length: 32 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 32 + (Math.random() - 0.5) * 0.5;
      const speed = 4 + Math.random() * 8;
      return {
        id: i,
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 100,
        y: window.innerHeight / 2 + (Math.random() - 0.5) * 50,
        size: 10 + Math.random() * 14,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4, // upward boost
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 20,
        shape: i % 3 === 0 ? 'leaf' : i % 3 === 1 ? 'sparkle' : 'circle',
        opacity: 1,
      };
    });

    setParticles(newParticles);

    // Animation frame step
    let animationFrame: number;
    let startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > 2000) {
        setParticles([]);
        setShowBadge(false);
        onComplete?.();
        return;
      }

      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.25, // gravity
          rotation: p.rotation + p.vRot,
          opacity: Math.max(0, 1 - elapsed / 1800),
        }))
      );

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, [active, onComplete]);

  if (!active && particles.length === 0 && !showBadge) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 3D Floating Points Badge Pop */}
      {showBadge && points && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-scale-in">
          <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest/95 backdrop-blur-md text-white border-2 border-sunny shadow-2xl badge-glow transform scale-110">
            <span className="text-2xl animate-bounce">🌱</span>
            <div>
              <span className="text-xl font-black text-sunny">+{points} PTS!</span>
              <p className="text-[10px] text-mint uppercase tracking-wider font-bold">Small Action Logged</p>
            </div>
          </div>
        </div>
      )}

      {/* Render Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg) scale3d(1, 1, 1)`,
            transition: 'opacity 0.1s linear',
          }}
        >
          {p.shape === 'leaf' ? (
            <svg viewBox="0 0 24 24" fill={p.color} width={p.size} height={p.size}>
              <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4L12 22l5.4-1.6C20.2 18.6 22 15.5 22 12c0-5.5-4.5-10-10-10zm0 18.2l-4.4-1.3C5.3 17.5 4 14.9 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 2.9-1.3 5.5-3.6 6.9L12 20.2z"/>
              <path d="M12 6c-3.3 0-6 2.7-6 6 0 1.9.9 3.6 2.3 4.7L12 18l3.7-1.3C17.1 15.6 18 13.9 18 12c0-3.3-2.7-6-6-6z"/>
            </svg>
          ) : p.shape === 'sparkle' ? (
            <svg viewBox="0 0 24 24" fill={p.color} width={p.size} height={p.size}>
              <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" />
            </svg>
          ) : (
            <div
              className="rounded-full w-full h-full shadow-sm"
              style={{ backgroundColor: p.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default CelebrationEffects;
