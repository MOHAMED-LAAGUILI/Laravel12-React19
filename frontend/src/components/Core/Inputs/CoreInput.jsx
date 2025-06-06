
import React, { useState, useMemo, forwardRef } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, X, AlertCircle, CheckCircle2 } from 'lucide-react'

// Define variants using class-variance-authority for better type safety and organization
const inputVariants = cva(
  [
    "w-full",
    "rounded-md",
    "transition-all",
    "duration-200",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-0",
    "border",
    "bg-background",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "peer",
  ],
  {
    variants: {
      variant: {
        default: "border-input focus:border-primary focus:ring-primary/20",
        outline: "border-input focus:border-primary focus:ring-primary/20",
        filled: "bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary",
        ghost: "border-transparent bg-transparent hover:bg-muted/50 focus:bg-muted/50",
        underlined: "rounded-none border-0 border-b border-input focus:border-primary focus:ring-0",
      },
      size: {
        sm: "h-8 text-xs px-3",
        md: "h-10 text-sm px-4",
        lg: "h-12 text-base px-4",
        xl: "h-14 text-lg px-5",
      },
      status: {
        default: "",
        error: "border-destructive focus:border-destructive focus:ring-destructive/20 text-destructive",
        success: "border-green-500 focus:border-green-500 focus:ring-green-500/20 ",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
      },
      iconPosition: {
        left: "",
        right: "",
        both: "",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      status: "default",
      width: "full",
      iconPosition: "none",
    },
    compoundVariants: [
      {
        iconPosition: "left",
        size: "sm",
        class: "pl-8",
      },
      {
        iconPosition: "left",
        size: "md",
        class: "pl-10",
      },
      {
        iconPosition: "left",
        size: "lg",
        class: "pl-11",
      },
      {
        iconPosition: "left",
        size: "xl",
        class: "pl-12",
      },
      {
        iconPosition: "right",
        size: "sm",
        class: "pr-8",
      },
      {
        iconPosition: "right",
        size: "md",
        class: "pr-10",
      },
      {
        iconPosition: "right",
        size: "lg",
        class: "pr-11",
      },
      {
        iconPosition: "right",
        size: "xl",
        class: "pr-12",
      },
      {
        iconPosition: "both",
        size: "sm",
        class: "pl-8 pr-8",
      },
      {
        iconPosition: "both",
        size: "md",
        class: "pl-10 pr-10",
      },
      {
        iconPosition: "both",
        size: "lg",
        class: "pl-11 pr-11",
      },
      {
        iconPosition: "both",
        size: "xl",
        class: "pl-12 pr-12",
      },
    ],
  }
)

const labelVariants = cva(
  [
    "text-sm",
    "font-medium",
    "transition-all",
    "duration-200",
    "pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: "text-foreground",
        floating: "absolute left-3 bg-background px-1 z-10",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      status: {
        default: "",
        error: "text-destructive",
        success: "text-success",
      },
      floatingState: {
        idle: "",
        active: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      status: "default",
      floatingState: "idle",
    },
    compoundVariants: [
      {
        variant: "floating",
        floatingState: "idle",
        class: "top-1/2 -translate-y-1/2",
      },
      {
        variant: "floating",
        floatingState: "active",
        class: "-top-2 -translate-y-1/2 text-xs",
      },
    ],
  }
)

const iconContainerVariants = cva(
  [
    "absolute",
    "top-1/2",
    "-translate-y-1/2",
    "text-muted-foreground",
    "flex",
    "items-center",
    "justify-center",
  ],
  {
    variants: {
      position: {
        left: "left-0",
        right: "right-0",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
      },
      status: {
        default: "",
        error: "text-destructive",
        success: "text-success",
      },
    },
    defaultVariants: {
      position: "left",
      size: "md",
      status: "default",
    },
  }
)


const Input = forwardRef(
  (
    {
      className,
      type = "text",
      variant = "default",
      size = "md",
      status = "default",
      width = "full",
      label,
      labelType = "default",
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      error,
      success,
      helperText,
      containerClassName,
      labelClassName,
      iconClassName,
      customHeight,
      customWidth,
      borderWidth,
      textColor,
      isTextarea = false,
      textareaRows = 3,
      iconPosition = leftIcon ? (rightIcon ? "both" : "left") : (rightIcon ? "right" : "none"),
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [localValue, setLocalValue] = useState(props.defaultValue || props.value || "")

    // Determine if the input has a value for floating label
    const hasValue = useMemo(() => {
      return Boolean(props.value !== undefined ? props.value : localValue)
    }, [props.value, localValue])

    // Update local value when controlled value changes
    React.useEffect(() => {
      if (props.value !== undefined) {
        setLocalValue(props.value)
      }
    }, [props.value])

    // Determine input type
    const inputType = useMemo(() => {
      if (type === "password") {
        return showPassword ? "text" : "password"
      }
      return type
    }, [type, showPassword])

    // Set status based on error or success
    const computedStatus = useMemo(() => {
      if (error) return "error"
      if (success) return "success"
      return status
    }, [error, success, status])

    // Generate a unique ID for the input
    const inputId = useMemo(() => {
      return props.id || `input-${Math.random().toString(36).substring(2, 11)}`
    }, [props.id])

    // Handle input change for uncontrolled component
    const handleChange = (e) => {
      setLocalValue(e.target.value)
      props.onChange?.(e)
    }

    // Handle focus events
    const handleFocus = (e) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    // Handle clear button click
    const handleClear = () => {
      if (props.value === undefined) {
        setLocalValue("")
      }
      onClear?.()
    }

    // Custom styles from props
    const customStyles = {
      ...(customHeight ? { height: customHeight } : {}),
      ...(customWidth ? { width: customWidth } : {}),
      ...(textColor ? { color: textColor } : {}),
      ...(borderWidth ? { borderWidth } : {}),
    }

    // Determine if we should show the password toggle
    const showPasswordToggle = type === "password" && !props.disabled

    // Determine if we should show the clear button
    const showClearButton = clearable && hasValue && !props.disabled

    // Determine if we need to adjust right padding for password toggle or clear button
    const hasRightAction = showPasswordToggle || showClearButton || (rightIcon && iconPosition !== "none")

    // Determine floating label state
    const floatingState = (isFocused || hasValue) ? "active" : "idle"

    // Render the input or textarea
    const renderInputElement = () => {
      const inputProps = {
        id: inputId,
        className: cn(
          inputVariants({ 
            variant, 
            size, 
            status: computedStatus, 
            width, 
            iconPosition: hasRightAction ? (leftIcon ? "both" : "right") : iconPosition 
          }),
          className
        ),
        style: customStyles,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        "aria-invalid": computedStatus === "error",
        "aria-describedby": error ? `${inputId}-error` : (helperText ? `${inputId}-helper` : undefined),
        ...props,
      }

      if (isTextarea) {
        return (
          <textarea
            {...inputProps}
            rows={textareaRows}
            style={{
              ...customStyles,
              resize: props.disabled ? "none" : "vertical",
              minHeight: size === "sm" ? "4rem" : size === "md" ? "5rem" : size === "lg" ? "6rem" : "7rem",
            }}
            value={props.value === undefined ? localValue : props.value}
          />
        )
      }

      return (
        <input
          ref={ref}
          type={inputType}
          {...inputProps}
          value={props.value === undefined ? localValue : props.value}
        />
      )
    }

    return (
      <div className={cn("relative w-full", containerClassName)}>
        {/* Label */}
        {label && labelType !== "hidden" && (
          <label
            htmlFor={inputId}
            className={cn(
              labelVariants({ 
                variant: labelType === "floating" ? "floating" : "default", 
                size, 
                status: computedStatus,
                floatingState: labelType === "floating" ? floatingState : undefined
              }),
              labelClassName
            )}
            style={
              labelType === "floating" && leftIcon && iconPosition !== "none"
                ? { marginLeft: size === "sm" ? "1.5rem" : size === "md" ? "2rem" : size === "lg" ? "2.5rem" : "3rem" }
                : undefined
            }
          >
            {label}{props.required && (
              <span style={{ color: 'red', marginLeft: 2 }} aria-label="required">*</span>
            )}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && iconPosition !== "none" && (
            <div 
              className={cn(
                iconContainerVariants({ position: "left", size, status: computedStatus }),
                iconClassName
              )}
            >
              {leftIcon}
            </div>
          )}

          {/* Input Element */}
          {renderInputElement()}

          {/* Right Icon or Password Toggle or Clear Button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
            {/* Custom Right Icon */}
            {rightIcon && iconPosition !== "none" && !showPasswordToggle && !showClearButton && (
              <div 
                className={cn(
                  iconContainerVariants({ position: "right", size, status: computedStatus }),
                  iconClassName
                )}
              >
                {rightIcon}
              </div>
            )}

            {/* Clear Button */}
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(
                  "flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none",
                  size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : size === "lg" ? "h-12 w-12" : "h-14 w-14"
                )}
                aria-label="Clear input"
              >
                <X className={size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5"} />
              </button>
            )}

            {/* Password Toggle */}
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  "flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none",
                  size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : size === "lg" ? "h-12 w-12" : "h-14 w-14"
                )}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className={size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5"} />
                ) : (
                  <Eye className={size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5"} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Error, Success, or Helper Text */}
        {(error || success || helperText) && (
          <div 
            className={cn(
              "flex items-center mt-1.5 text-sm",
              error ? "text-destructive" : success ? "text-success" : "text-muted-foreground"
            )}
            id={error ? `${inputId}-error` : (helperText ? `${inputId}-helper` : undefined)}
          >
            {error && <AlertCircle className="mr-1.5 h-3.5 w-3.5" />}
            {success && <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />}
            <span className={size === "sm" ? "text-xs" : "text-sm"}>
              {error || success || helperText}
            </span>
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
