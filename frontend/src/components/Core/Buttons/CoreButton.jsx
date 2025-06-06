
import { useCallback, useMemo, useRef, useState } from "react"

const COLOR_MAP = {
  primary: {
    filled:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700",
    outline:
      "border border-blue-600 text-blue-600 bg-white hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-300 dark:bg-gray-900 dark:hover:bg-blue-950",
    soft: "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900",
    dashed:
      "border border-dashed border-blue-600 text-blue-600 bg-white hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:bg-gray-900 dark:hover:bg-blue-950",
    active: "text-blue-600 dark:text-blue-300 hover:bg-blue-100",
  },
  purple: {
    filled:
      "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:text-white dark:hover:bg-purple-700",
    outline:
      "border border-purple-600 text-purple-600 bg-white hover:bg-purple-500 hover:text-white dark:border-purple-400 dark:text-purple-300 dark:bg-gray-900 dark:hover:bg-purple-950",
    soft: "bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:hover:bg-purple-900",
    dashed:
      "border border-dashed border-purple-600 text-purple-600 bg-white hover:bg-purple-50 dark:border-purple-400 dark:text-purple-300 dark:bg-gray-900 dark:hover:bg-purple-950",
    active: "text-purple-600 dark:text-purple-300 hover:bg-purple-100",
  },
  green: {
    filled:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:text-white dark:hover:bg-green-700",
    outline:
      "border border-green-600 text-green-600 bg-white hover:bg-green-500 hover:text-white dark:border-green-400 dark:text-green-300 dark:bg-gray-900 dark:hover:bg-green-950",
    soft: "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900",
    dashed:
      "border border-dashed border-green-600 text-green-600 bg-white hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:bg-gray-900 dark:hover:bg-green-950",
    active: "text-green-600 dark:text-green-300 hover:bg-green-100",
  },
  red: {
    filled:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-700",
    outline:
      "border border-red-600 text-red-600 bg-white hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-300 dark:bg-gray-900 dark:hover:bg-red-950",
    soft: "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900",
    dashed:
      "border border-dashed border-red-600 text-red-600 bg-white hover:bg-red-50 dark:border-red-400 dark:text-red-300 dark:bg-gray-900 dark:hover:bg-red-950",
    active: "text-red-600 dark:text-red-300 hover:bg-red-100",
  },
  yellow: {
    filled:
      "bg-yellow-400 text-white hover:bg-yellow-500 dark:bg-yellow-500 dark:text-white dark:hover:bg-yellow-600",
    outline:
      "border border-yellow-400 text-yellow-500 bg-white hover:bg-yellow-500 hover:text-white dark:border-yellow-400 dark:text-yellow-300 dark:bg-gray-900 dark:hover:bg-yellow-950",
    soft: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:hover:bg-yellow-900",
    dashed:
      "border border-dashed border-yellow-400 text-yellow-500 bg-white hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-300 dark:bg-gray-900 dark:hover:bg-yellow-950",
    active: "text-yellow-500 dark:text-yellow-300 hover:bg-yellow-100",
  },
  sky: {
    filled:
      "bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:text-white dark:hover:bg-sky-600",
    outline:
      "border border-sky-500 text-sky-500 bg-white hover:bg-sky-500 hover:text-white dark:border-sky-400 dark:text-sky-300 dark:bg-gray-900 dark:hover:bg-sky-950",
    soft: "bg-sky-100 text-sky-500 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900",
    dashed:
      "border border-dashed border-sky-500 text-sky-500 bg-white hover:bg-sky-50 dark:border-sky-400 dark:text-sky-300 dark:bg-gray-900 dark:hover:bg-sky-950",
    active: "text-sky-500 dark:text-sky-300 hover:bg-sky-100", 
  },
  pink: {
    filled:
      "bg-pink-500 text-white hover:bg-pink-600 dark:bg-pink-400 dark:text-white dark:hover:bg-pink-600",
    outline:
      "border border-pink-500 text-pink-500 bg-white hover:bg-pink-500 hover:text-white dark:border-pink-400 dark:text-pink-300 dark:bg-gray-900 dark:hover:bg-pink-950",
    soft: "bg-pink-100 text-pink-500 hover:bg-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:hover:bg-pink-900",
    dashed:
      "border border-dashed border-pink-500 text-pink-500 bg-white hover:bg-pink-50 dark:border-pink-400 dark:text-pink-300 dark:bg-gray-900 dark:hover:bg-pink-950",
    active: "text-pink-500 dark:text-pink-300 hover:bg-pink-100",
  },
  indigo: {
    filled:
      "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-400 dark:text-white dark:hover:bg-indigo-600",
    outline:
      "border border-indigo-500 text-indigo-500 bg-white hover:bg-indigo-500 hover:text-white dark:border-indigo-400 dark:text-indigo-300 dark:bg-gray-900 dark:hover:bg-indigo-950",
    soft: "bg-indigo-100 text-indigo-500 hover:bg-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900",
    dashed:
      "border border-dashed border-indigo-500 text-indigo-500 bg-white hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-300 dark:bg-gray-900 dark:hover:bg-indigo-950",
    active: "text-indigo-500 dark:text-indigo-300 hover:bg-indigo-100",
  },
  orange: {
    filled:
      "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-600",
    outline:
      "border border-orange-500 text-orange-500 bg-white hover:bg-orange-500 hover:text-white dark:border-orange-400 dark:text-orange-300 dark:bg-gray-900 dark:hover:bg-orange-950",
    soft: "bg-orange-100 text-orange-500 hover:bg-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900",
    dashed:
      "border border-dashed border-orange-500 text-orange-500 bg-white hover:bg-orange-50 dark:border-orange-400 dark:text-orange-300 dark:bg-gray-900 dark:hover:bg-orange-950",
    active: "text-orange-500 dark:text-orange-300 hover:bg-orange-100",
  },
  dark: {
    filled:
      "bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700",
    outline:
      "border border-gray-700 text-gray-700 bg-white hover:bg-gray-500 hover:text-white dark:border-gray-600 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800",
    soft: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    dashed:
      "border border-dashed border-gray-700 text-gray-700 bg-white hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800",
    active: "text-gray-700 dark:text-gray-100",
  },
  light: {
    filled:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200",
    outline:
      "border border-gray-200 text-gray-700 bg-white hover:bg-gray-300 dark:border-gray-100 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-100",
    soft: "bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-100",
    dashed:
      "border border-dashed border-gray-200 text-gray-400 bg-white hover:bg-gray-100 dark:border-gray-100 dark:text-gray-800 dark:bg-gray-200 dark:hover:bg-gray-100",
    active: "text-gray-400 dark:text-gray-800",
  },
}

const BASE_CLASSES = "px-4 py-2 font-semibold transition-colors duration-200 transition-all"

const SIZES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
}



export default function CoreButton({
  variant = "filled",
  color = "primary",
  text,
  title,
  icon,
  className = "",
  children,
  type = "button",
  disabled = false,
  loading = false,
  ripple = false,
  rippleColor,
  shadow = false,
  size = "md",
  rounded = "rounded-[4px]",
  ...props
}) {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)

  // Safe color and variant access with fallback
  const colorMap = COLOR_MAP[color] || COLOR_MAP.primary
  const colorClasses = colorMap[variant] || colorMap.filled

  // Size class memoized
  const sizeClasses = useMemo(() => SIZES[size] || SIZES.md, [size])

  // Manage ripple creation
  const createRipple = useCallback(
    (event) => {
      if (disabled || loading) return
      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = {
        key: Date.now(),
        size,
        x,
        y,
      }

      setRipples((old) => [...old, newRipple])

      // Cleanup ripple after animation duration
      setTimeout(() => {
        setRipples((old) => old.filter((r) => r.key !== newRipple.key))
      }, 600)
    },
    [disabled, loading]
  )

  // Determine ripple color (adaptive or custom)
  const rippleBg = rippleColor
    ? rippleColor
    : variant === "filled"
    ? "rgba(255,255,255,0.4)"
    : "rgba(0,0,0,0.2)"

  return (
    <>
      {ripple && (
        <style>{`
          .ripple-container {
            position: relative;
            overflow: hidden;
            display: inline-block;
          }
          .ripple-circle {
            position: absolute;
            border-radius: 50%;
            background: ${rippleBg};
            transform: scale(0);
            animation: ripple 600ms linear;
            pointer-events: none;
            z-index: 1;
          }
          @keyframes ripple {
            to {
              transform: scale(2.5);
              opacity: 0;
            }
          }
          button:focus-visible {
            outline: 2px solid #3b82f6; /* Tailwind blue-500 ring for focus */
            outline-offset: 2px;
          }
        `}</style>
      )}

      <button
        ref={buttonRef}
        type={type}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        title={title || text || "Button"}
        className={[
          ripple && "ripple-container",
          sizeClasses,
          BASE_CLASSES,
          colorClasses,
          rounded,
          shadow && "shadow-lg",
          disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => {
          if (!disabled && !loading && ripple) createRipple(e)
          if (props.onClick) props.onClick(e)
        }}
        {...props}
      >
        <span className="flex items-center justify-center relative z-10">
          {icon && <span className="mr-2 flex items-center">{icon}</span>}
          {loading ? <span className="animate-spin">🔄</span> : text || children}
        </span>

        {/* Render ripple circles */}
        {ripple &&
          ripples.map(({ key, size, x, y }) => (
            <span
              key={key}
              className="ripple-circle"
              style={{ width: size, height: size, left: x, top: y }}
            />
          ))}
      </button>
    </>
  )
}
