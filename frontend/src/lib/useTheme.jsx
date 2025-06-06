import { useState, useEffect, useCallback } from "react";

/**
 * Get the theme from localStorage
 * @returns {"dark"|"light"|null}
 */
export function getStoredTheme() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme");
  }
  return null;
}

/**
 * Set the theme in localStorage and update the DOM
 * @param {"dark"|"light"} theme
 */
export function applyTheme(theme) {
  if (typeof window !== "undefined") {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }
}

/**
 * Toggle theme between dark and light
 * @param {boolean} isDarkMode
 * @param {Function} setIsDarkMode
 */
export function toggleTheme(isDarkMode, setIsDarkMode) {
  const newTheme = isDarkMode ? "light" : "dark";
  setIsDarkMode(!isDarkMode);
  applyTheme(newTheme);
}

/**
 * Custom React hook for theme management (dark/light)
 * Handles syncing with localStorage and storage events for cross-tab support
 */
export function useTheme() {
  const [theme, setTheme] = useState(getStoredTheme() || "light");
  const isDarkMode = theme === "dark";

  // Listen for theme changes from other tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "theme") {
        setTheme(e.newValue || "light");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Apply theme to DOM and localStorage when theme changes
  useEffect(() => {
    applyTheme(theme);
    const getInitialTheme = localStorage.getItem("theme");
    setTheme(getInitialTheme)
  }, [theme]);

  // Toggle theme handler
  const toggleThemeHandler = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return { theme, isDarkMode, setTheme, toggleThemeHandler };
}
