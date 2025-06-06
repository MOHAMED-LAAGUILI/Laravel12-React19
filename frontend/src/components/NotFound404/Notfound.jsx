/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[87vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
      
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-[40px] sm:text-[60px] md:text-[100px] lg:text-[120px] xl:text-[140px] font-extrabold tracking-tight leading-none text-balance mb-8">
            404 - Page Not Found
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {"The page you're looking for doesn't exist or has been moved."}
          </p>

          <div
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
              dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
              overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <button
              onClick={() => navigate("/")}
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                text-black dark:text-white transition-all duration-300 
                group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                hover:shadow-md dark:hover:shadow-neutral-800/50"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                Go Home
              </span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                  transition-all duration-300"
              >
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
