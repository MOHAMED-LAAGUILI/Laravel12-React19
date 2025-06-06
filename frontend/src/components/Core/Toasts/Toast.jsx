/* eslint-disable react-refresh/only-export-components */
import  { useState, useEffect, useRef, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';


// Create context
const ToastContext = createContext(undefined);

// Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 10);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast container component
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full sm:w-auto sm:max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const { id, title, message, type, duration = 5000 } = toast;
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const [hovered, setHovered] = useState(false);

  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(duration);
  const rafRef = useRef(null);

  const updateProgress = () => {
    if (startTimeRef.current === null) return;

    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const remaining = Math.max(0, remainingTimeRef.current - elapsed);

    setProgress((remaining / duration) * 100);

    if (remaining <= 0) {
      cancelAnimationFrame(rafRef.current);
      handleRemove();
    } else {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const startTimer = () => {
    startTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(updateProgress);
  };

  const pauseTimer = () => {
    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    remainingTimeRef.current -= elapsed;
    cancelAnimationFrame(rafRef.current);
  };

  const handleRemove = () => {
    setExiting(true);
    setTimeout(() => onRemove(id), 300); // match transition
  };

  useEffect(() => {
    if (!hovered) startTimer();
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  const handleMouseEnter = () => {
    setHovered(true);
    pauseTimer();
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green" />,
    error: <AlertCircle className="h-5 w-5 text-red" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  };

  const typeStyles = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-amber-50 border-amber-200",
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full rounded-lg border p-4 shadow-md transition-all duration-300 ease-in-out relative overflow-hidden",
        exiting ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0 animate-slide-up",
        typeStyles[type]
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1 space-y-1">
          {title && <h3 className="font-medium">{title}</h3>}
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <button
          onClick={handleRemove}
          className="ml-4 inline-flex h-5 w-5 items-center justify-center text-gray-400 hover:text-gray-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-[3px] bg-black/10 w-full">
        <div
          className="h-full bg-current transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
