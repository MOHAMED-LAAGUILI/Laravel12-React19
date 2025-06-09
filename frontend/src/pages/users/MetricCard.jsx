import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const colorVariants = {
  blue: 'from-blue-500 to-blue-600',
  orange: 'from-orange-400 to-orange-500',
  pink: 'from-pink-500 to-pink-600',
};

export function MetricCard({ title, value, subtitle, percentage, trend, color }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 text-white shadow-md transition hover:shadow-xl bg-gradient-to-br",
        colorVariants[color],
        "hover:bg-opacity-95 hover:backdrop-blur-md"
      )}
    >
      {/* Subtle radial ring in background */}
      <div className="absolute top-4 right-4 opacity-20">
        <div className="w-16 h-16 rounded-full border border-white/20"></div>
      </div>

      {/* Trend line visual */}
      <div className="absolute inset-x-0 bottom-0 h-16 opacity-20">
        <svg viewBox="0 0 200 50" className="w-full h-full">
          <path
            d="M0,40 Q50,20 100,25 T200,15"
            stroke="white"
            strokeWidth="2"
            fill="none"
            className="drop-shadow"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Unified Heading Block */}
        <h3 className="text-lg font-semibold flex items-center justify-between mb-4">
          <span>{title}</span>
          <span className="flex items-center gap-1 text-sm font-medium bg-white/20 rounded-full px-2.5 py-1">
            <TrendIcon className="w-4 h-4" />
            {percentage}
          </span>
        </h3>

        {/* Main Metric */}
        <div className="text-4xl font-bold leading-tight mb-1">{value}</div>
        <p className="text-sm text-white/90">{subtitle}</p>
      </div>
    </div>
  );
}
