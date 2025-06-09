/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import CoreButton from "../Buttons/CoreButton";

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  btnMessage = "Delete",
  children = "",
  variant = "modal", // 'modal' or 'drawer'
  size = "normal",   // 'small', 'normal', 'medium', 'large', etc.
  showActions = true,
  isLoading = false,
  ...rest
}) {
  const isDrawer = variant === "drawer";

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // prevent background scroll
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // restore scroll
    };
  }, [isOpen, onClose]);

  // Compute sizing
  const sizeMap = {
    small: isDrawer ? "w-64" : "max-w-xs",
    normal: isDrawer ? "w-96" : "max-w-md",
    medium: isDrawer ? "w-[28rem]" : "max-w-lg",
    large: isDrawer ? "w-[32rem]" : "max-w-2xl",
    xlarge: isDrawer ? "w-[48rem]" : "max-w-4xl",
    fulllarge: "w-screen max-w-full",
  };

  const sizeClass = typeof size === "string" ? sizeMap[size] ?? sizeMap.normal : "";
  const isCustomSize = typeof size === "string" && (size.endsWith("%") || size.endsWith("px"));
  const customStyle = isCustomSize
    ? isDrawer ? { width: size } : { maxWidth: size }
    : {};

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={twMerge(
            "fixed inset-0 z-[1000] flex",
            isDrawer ? "items-end md:items-stretch justify-end" : "items-center justify-center"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal or Drawer container */}
          <motion.div
            className={twMerge(
              "relative z-10 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col",
              isDrawer
                ? "h-full md:h-auto md:rounded-l-lg"
                : "rounded-[3px] w-full max-h-[90vh]",
              sizeClass
            )}
            initial={isDrawer ? { x: "100%" } : { scale: 0.95, opacity: 0, y: 24 }}
            animate={isDrawer ? { x: 0 } : { scale: 1, opacity: 1, y: 0 }}
            exit={isDrawer ? { x: "100%" } : { scale: 0.95, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={isDrawer ? { height: "100vh", right: 0, top: 0, position: "fixed", ...customStyle } : customStyle}
            {...rest}
          >
         

            {/* Title */}
            {title && (
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {title}
              </h3>
            )}

            {/* Message */}
            {message && (
              <p className="text-gray-800 dark:text-gray-200 mb-4">{message}</p>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto min-h-0 text-gray-800 dark:text-gray-200">{children}</div>

            {/* Action Buttons */}
            {showActions && (
              <div className="mt-6 flex justify-end gap-3">
                <CoreButton
                  color="red"
                  variant="soft"
                  onClick={onClose}
                  title="Annuler"
                  icon={<X size={15} />}
                >
                  Annuler
                </CoreButton>
                <CoreButton
                disabled={isLoading}
                  color={isLoading ? "dark" : "green"}
                  variant={isLoading ? "soft" : "soft"}
                  onClick={onConfirm}
                  title={btnMessage}
                  icon={<Check size={15} />}
                >
                  {btnMessage}
                </CoreButton>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
