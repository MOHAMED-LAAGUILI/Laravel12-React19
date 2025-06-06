/* eslint-disable no-unused-vars */
import { twMerge } from "tailwind-merge";

export default function BodyCard({
  title,
  icon,
  action,
  header,
  footer,
  children,
  className = "",
  headerClass = "",
  bodyClass = "",
  footerClass = "",
  bg = "bg-white dark:bg-zinc-900",
  border = "border border-zinc-200 dark:border-zinc-700",
  radius = "rounded-lg",
  shadow = "shadow-sm",
  padding = "p-5",
  showDivider = true,
  as: Component = "div",
  ...props
}) {
  const hasHeaderContent = header || title || icon || action;

  const renderHeader = () => {
    if (header) return header;

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <div className="text-zinc-500 dark:text-zinc-300">{icon}</div>}
          {title && (
            <h3 className="text-base font-medium text-zinc-900 dark:text-white">{title}</h3>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  };

  return (
    <Component
      className={twMerge(
        bg,
        border,
        radius,
        shadow,
        "transition-all",
        className
      )}
      {...props}
    >
      {/* Header */}
      {hasHeaderContent && (
        <div className={twMerge(padding, headerClass)}>
          {renderHeader()}
        </div>
      )}

      {/* Divider */}
      {hasHeaderContent && showDivider && (
        <hr className="border-t border-zinc-200 dark:border-zinc-700" />
      )}

      {/* Body */}
      {children && <div className={twMerge(padding, bodyClass)}>{children}</div>}

      {/* Footer */}
      {footer && (
        <div className={twMerge(
          "border-t border-zinc-200 dark:border-zinc-700",
          padding,
          footerClass
        )}>
          {footer}
        </div>
      )}
    </Component>
  );
}
