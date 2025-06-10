import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const colorVariants = {
  blue: {
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
    accent: "from-blue-400 to-blue-600",
    glow: "shadow-blue-500/25",
  },
  orange: {
    gradient: "from-orange-500/20 via-orange-400/10 to-transparent",
    accent: "from-orange-400 to-orange-600",
    glow: "shadow-orange-500/25",
  },
  pink: {
    gradient: "from-pink-500/20 via-pink-400/10 to-transparent",
    accent: "from-pink-400 to-pink-600",
    glow: "shadow-pink-500/25",
  },
}

export function MetricCard2({ title, value, subtitle, percentage, trend, color, icon }) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
  const colorConfig = colorVariants[color]

  return (
    <div className="group perspective-1000 transform-gpu">
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl transition-all duration-500 ease-out",
          "transform-gpu hover:scale-[1.02] hover:-translate-y-2",
          "hover:rotate-x-2 hover:rotate-y-1",
          "shadow-2xl hover:shadow-4xl",
          colorConfig.glow,
        )}
      >
        {/* Main Glass Container */}
        <div
          className={cn(
            "relative backdrop-blur-xl bg-gradient-to-br border border-white/20",
            "p-8 text-white min-h-[200px]",
            colorConfig.gradient,
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50",
            "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent",
          )}
        >
          {/* Floating Orb Background */}
          <div className="absolute -top-8 -right-8 w-32 h-32 opacity-30">
            <div
              className={cn(
                "w-full h-full rounded-full bg-gradient-to-br blur-2xl",
                colorConfig.accent,
                "animate-pulse group-hover:scale-110 transition-transform duration-700",
              )}
            ></div>
          </div>

          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-24 h-24 border border-white/30 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border border-white/20 rounded-lg rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-white/25 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Enhanced Trend Visualization */}
          <div className="absolute inset-x-0 bottom-0 h-20 opacity-20 overflow-hidden">
            <svg viewBox="0 0 300 60" className="w-full h-full">
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d="M0,45 Q75,25 150,30 T300,20"
                stroke={`url(#gradient-${color})`}
                strokeWidth="3"
                fill="none"
                className="drop-shadow-lg"
              />
              <path d="M0,45 Q75,25 150,30 T300,20 L300,60 L0,60 Z" fill={`url(#gradient-${color})`} opacity="0.1" />
            </svg>
          </div>

          {/* Content Container */}
          <div className="relative z-20 h-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-3 rounded-2xl bg-gradient-to-br backdrop-blur-sm",
                    "border border-white/20 shadow-lg",
                    colorConfig.accent,
                    "group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
                  )}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white/90 leading-tight">{title}</h3>
                </div>
              </div>

              {/* Trend Indicator */}
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-full",
                  "bg-white/10 backdrop-blur-sm border border-white/20",
                  "shadow-lg group-hover:bg-white/15 transition-all duration-300",
                  trend === "up" && "text-green-300",
                  trend === "down" && "text-red-300",
                  trend === "neutral" && "text-white/80",
                )}
              >
                <TrendIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{percentage}</span>
              </div>
            </div>

            {/* Main Metric */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-5xl font-bold leading-none mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {value}
              </div>
              <p className="text-base text-white/70 font-medium">{subtitle}</p>
            </div>

            {/* Bottom Accent Line */}
            <div className="mt-6 h-1 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
          </div>

          {/* Hover Glow Effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100",
              "bg-gradient-to-br from-white/5 to-transparent",
              "transition-opacity duration-500 pointer-events-none",
            )}
          ></div>
        </div>

        {/* 3D Shadow Layer */}
        <div
          className={cn(
            "absolute inset-0 rounded-3xl -z-10 transform translate-y-2 translate-x-1",
            "bg-gradient-to-br from-black/20 to-black/40 blur-xl",
            "group-hover:translate-y-4 group-hover:translate-x-2 transition-transform duration-500",
          )}
        ></div>
      </div>
    </div>
  )
}
