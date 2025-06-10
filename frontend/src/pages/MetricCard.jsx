import { TrendingUp, TrendingDown, Minus, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const colorVariants = {
  blue: 'from-blue-500 to-blue-600',
  orange: 'from-orange-400 to-orange-500',
  pink: 'from-pink-500 to-pink-600',
};

export function MetricCard({
  title,
  value,
  subtitle,
  percentage,
  trend = 'neutral',
  color = 'blue',
  icon,
}) {
  const TrendIcon =
    trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 text-white shadow-md transition-all duration-300 ease-in-out hover:shadow-lg bg-gradient-to-br',
        colorVariants[color],
        'hover:bg-opacity-95 hover:backdrop-blur-sm'
      )}
    >
      {/* Decorative Radial Ring */}
      <div className="absolute top-4 right-4 opacity-10 pointer-events-none">
        <div className="w-16 h-16 rounded-full border border-white/30"></div>
      </div>

      {/* Background Trend Line */}
      <div className="absolute inset-x-0 bottom-0 h-16 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 50" className="w-full h-full">
          <path
            d="M0,40 Q50,20 100,25 T200,15"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-1 text-white/90">
          {icon ?? <User className="w-6 h-6 opacity-80" />}
        </div>

        {/* Textual Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium uppercase tracking-wide text-white/80">
              {title}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-white/20 rounded-full text-white/90">
              <TrendIcon className="w-3.5 h-3.5" />
              <span>{percentage}</span>
            </div>
          </div>

          <div className="text-3xl font-bold leading-snug">{value}</div>
          <p className="mt-1 text-xs text-white/80">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
