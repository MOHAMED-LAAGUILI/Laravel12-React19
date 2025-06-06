
import tailwindcssAnimate from "tailwindcss-animate";


/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"], // Enables dark mode dark:
  content: [
    "./index.html",
    "./pages/**/*.{ts,tsx,js,jsx,css,html}",
    "./components/**/*.{ts,tsx,js,jsx,css,html}",
    "./src/**/*.{ts,tsx,js,jsx,css,html}",
    
    "*.{js,ts,jsx,tsx,css,html}",
 
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        main: {
          DEFAULT: "#e0f2fe",
          light: "#e0f2fe",
          dark: "#082f49",
        },

        light: {
          DEFAULT: "#FFFFFF",
          muted: "#F9FAFB",
        },

        dark: {
          DEFAULT: "#0F172B",
          surface: "#1E293B",
          muted: "#334155",
        },

        red: {
          light: "#FF5E5E",
          DEFAULT: "#FB2C36",
          dark: "#C21010",
        },
        green: {
          light: "#6EE7B7",
          DEFAULT: "#22C55E",
          dark: "#15803D",
        },

    
      },
      fontFamily: {
        serif: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
  corePlugins: {

  },
  variants: {
    extend: {},
},
  safelist: [],
};
