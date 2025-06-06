
import { useState, useEffect, useRef, forwardRef } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, Bell } from 'lucide-react'

// Define variants using class-variance-authority
const toastVariants = cva(
  [
    "flex",
    "items-center",
    "gap-3",
    "rounded-lg",
    "border",
    "p-4",
    "shadow-sm",
    "transition-all",
    "duration-300",
    "ease-in-out",
    "relative",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        primary: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
        purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
        green: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
        red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
        yellow: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
        sky: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
        pink: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950 dark:text-pink-300 dark:border-pink-800",
        indigo: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
        orange: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
        dark: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
        success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
        error: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
        warning: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800",
        info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
      },
      size: {
        sm: "text-xs p-2 min-w-[200px] max-w-[300px]",
        md: "text-sm p-3 min-w-[220px] max-w-[350px]",
        lg: "text-base p-4 min-w-[250px] max-w-[400px]",
        xl: "text-lg p-5 min-w-[300px] max-w-[450px]",
        full: "w-full max-w-full",
      },
      animation: {
        none: "",
        fade: "animate-fade-in",
        slideRight: "animate-slide-in-right",
        slideLeft: "animate-slide-in-left",
        slideUp: "animate-slide-in-up",
        slideDown: "animate-slide-in-down",
      },
      position: {
        default: "relative",
        topRight: "fixed top-4 right-4",
        topLeft: "fixed top-4 left-4",
        bottomRight: "fixed bottom-4 right-4",
        bottomLeft: "fixed bottom-4 left-4",
        topCenter: "fixed top-4 left-1/2 -translate-x-1/2",
        bottomCenter: "fixed bottom-4 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "md",
      animation: "fade",
      position: "default",
    },
  },
)

// Define action button variants
const actionButtonVariants = cva(
  [
    "px-3",
    "py-1",
    "text-xs",
    "font-medium",
    "rounded",
    "transition-colors",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-1",
  ],
  {
    variants: {
      variant: {
        primary: "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700",
        purple: "bg-purple-100 text-purple-800 hover:bg-purple-200 focus:ring-purple-500 dark:bg-purple-800 dark:text-purple-100 dark:hover:bg-purple-700",
        green: "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700",
        red: "bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700",
        yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:bg-yellow-700",
        sky: "bg-sky-100 text-sky-800 hover:bg-sky-200 focus:ring-sky-500 dark:bg-sky-800 dark:text-sky-100 dark:hover:bg-sky-700",
        pink: "bg-pink-100 text-pink-800 hover:bg-pink-200 focus:ring-pink-500 dark:bg-pink-800 dark:text-pink-100 dark:hover:bg-pink-700",
        indigo: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 focus:ring-indigo-500 dark:bg-indigo-800 dark:text-indigo-100 dark:hover:bg-indigo-700",
        orange: "bg-orange-100 text-orange-800 hover:bg-orange-200 focus:ring-orange-500 dark:bg-orange-800 dark:text-orange-100 dark:hover:bg-orange-700",
        dark: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
        success: "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700",
        error: "bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:bg-yellow-700",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700",
        ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "ghost",
    },
  },
)

// Define progress bar variants
const progressBarVariants = cva(["absolute", "bottom-0", "left-0", "h-1", "transition-all"], {
  variants: {
    variant: {
      primary: "bg-blue-500 dark:bg-blue-400",
      purple: "bg-purple-500 dark:bg-purple-400",
      green: "bg-green-500 dark:bg-green-400",
      red: "bg-red-500 dark:bg-red-400",
      yellow: "bg-yellow-500 dark:bg-yellow-400",
      sky: "bg-sky-500 dark:bg-sky-400",
      pink: "bg-pink-500 dark:bg-pink-400",
      indigo: "bg-indigo-500 dark:bg-indigo-400",
      orange: "bg-orange-500 dark:bg-orange-400",
      dark: "bg-gray-500 dark:bg-gray-400",
      success: "bg-green-500 dark:bg-green-400",
      error: "bg-red-500 dark:bg-red-400",
      warning: "bg-yellow-500 dark:bg-yellow-400",
      info: "bg-blue-500 dark:bg-blue-400",
    },
  },
  defaultVariants: {
    variant: "info",
  },
})

// Define icon variants
const iconVariants = cva(["flex-shrink-0"], {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// Default icons for different variants
const defaultIcons = {
  primary: <Bell />,
  purple: <Bell />,
  green: <CheckCircle />,
  red: <AlertCircle />,
  yellow: <AlertTriangle />,
  sky: <Info />,
  pink: <Bell />,
  indigo: <Bell />,
  orange: <AlertTriangle />,
  dark: <Bell />,
  success: <CheckCircle />,
  error: <AlertCircle />,
  warning: <AlertTriangle />,
  info: <Info />,
}

const Toast = forwardRef(
  (
    {
      className,
      variant = "info",
      size = "md",
      animation = "fade",
      position = "default",
      title,
      description,
      icon,
      actions = [],
      closable = true,
      onClose,
      defaultVisible = true,
      autoClose = false,
      showProgress = false,
      customIcon,
      iconClassName,
      titleClassName,
      descriptionClassName,
      actionsClassName,
      closeButtonClassName,
      progressBarClassName,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(defaultVisible)
    const [progress, setProgress] = useState(100)
    const timerRef = useRef(null)
    const autoCloseTime = typeof autoClose === "number" ? autoClose : autoClose === true ? 5000 : null

    // Handle close
    const handleClose = () => {
      setVisible(false)
      if (onClose) onClose()
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    // Set up auto close timer
    useEffect(() => {
      if (autoCloseTime && visible) {
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }

        // Set up progress animation if needed
        if (showProgress) {
          const startTime = Date.now()
          const interval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const remaining = Math.max(0, 100 - (elapsed / autoCloseTime) * 100)
            setProgress(remaining)
            if (remaining <= 0) {
              clearInterval(interval)
            }
          }, 10)

          // Clean up interval
          return () => clearInterval(interval)
        }

        // Set up auto close timer
        timerRef.current = setTimeout(() => {
          handleClose()
        }, autoCloseTime)

        // Clean up timer
        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current)
          }
        }
      }
    }, [autoCloseTime, visible, showProgress])

    // If not visible, don't render
    if (!visible) return null

    // Determine icon to display
    const displayIcon = customIcon || icon || (variant && defaultIcons[variant])

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, size, animation, position }), className)}
        role="alert"
        aria-live="assertive"
        {...props}
      >
        {/* Icon */}
        {displayIcon && (
          <div className={cn(iconVariants({ size: size === "sm" ? "sm" : size === "lg" ? "lg" : size === "xl" ? "xl" : "md" }), iconClassName)}>
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          {title && (
            <div className={cn("font-semibold", size === "sm" ? "text-xs" : size === "lg" ? "text-base" : size === "xl" ? "text-lg" : "text-sm", titleClassName)}>
              {title}
            </div>
          )}

          {/* Description */}
          {description && (
            <div
              className={cn(
                "mt-1",
                size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : size === "xl" ? "text-base" : "text-xs",
                !title && "font-medium",
                descriptionClassName
              )}
            >
              {description}
            </div>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className={cn("flex flex-wrap gap-2 mt-2", actionsClassName)}>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    action.onClick()
                    // If the action doesn't specify to keep the toast open, close it
                    if (autoClose) {
                      handleClose()
                    }
                  }}
                  className={cn(actionButtonVariants({ variant: action.variant || variant }), action.className)}
                  disabled={action.disabled}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              "flex-shrink-0 rounded-full p-1 transition-colors",
              "text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-1",
              size === "sm" ? "h-5 w-5" : size === "lg" ? "h-7 w-7" : size === "xl" ? "h-8 w-8" : "h-6 w-6",
              closeButtonClassName
            )}
            aria-label="Close"
          >
            <X className={size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : size === "xl" ? "h-6 w-6" : "h-4 w-4"} />
          </button>
        )}

        {/* Progress Bar */}
        {showProgress && autoCloseTime && (
          <div
            className={cn(progressBarVariants({ variant }), progressBarClassName)}
            style={{ width: `${progress}%` }}
          />
        )}
      </div>
    )
  }
)

Toast.displayName = "Toast"


export { Toast }
