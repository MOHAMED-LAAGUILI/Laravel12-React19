/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Floating animation component
function FloatingElement({ children, delay = 0, duration = 3 }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// Animated button component
function AnimatedButton({ onClick, children, icon, variant = "primary", className = "", ...props }) {
  const baseClasses = `
    group relative overflow-hidden rounded-[1.15rem] px-6 py-3 text-base font-semibold 
    backdrop-blur-md transition-all duration-300 flex items-center justify-center
    border hover:shadow-md dark:hover:shadow-neutral-800/50
    group-hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed 
    disabled:transform-none min-w-[140px]
  `

  const variants = {
    primary: `
      bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
      text-black dark:text-white border-black/10 dark:border-white/10
    `,
    secondary: `
      bg-gray-100/95 hover:bg-gray-200/100 dark:bg-gray-800/95 dark:hover:bg-gray-700/100 
      text-gray-700 dark:text-gray-300 border-gray-300/20 dark:border-gray-600/20
    `,
  }

  return (
    <div className="group relative bg-gradient-to-b from-black/10 to-white/10 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
        <motion.span className="flex items-center opacity-90 group-hover:opacity-100 transition-opacity" layout>
          {children}
          {icon && (
            <motion.span
              className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
              whileHover={{ x: 4 }}
            >
              {icon}
            </motion.span>
          )}
        </motion.span>
      </button>
    </div>
  )
}



// Error code animation component
function AnimatedErrorCode() {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className={`
          text-[40px] sm:text-[60px] md:text-[100px] lg:text-[120px] xl:text-[140px] 
          font-extrabold tracking-tight leading-none text-balance mb-8
          bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 
          bg-clip-text text-transparent
          ${glitchActive ? "animate-pulse" : ""}
        `}
        animate={glitchActive ? { x: [0, -2, 2, 0] } : {}}
        transition={{ duration: 0.2 }}
      >
        404
      </motion.h1>

      {/* Floating decorative elements */}
      <div className="absolute -top-4 -left-4 opacity-20">
        <FloatingElement delay={0} duration={4}>
          <div className="w-8 h-8 bg-blue-500 rounded-full blur-sm" />
        </FloatingElement>
      </div>

      <div className="absolute -bottom-4 -right-4 opacity-20">
        <FloatingElement delay={1} duration={3}>
          <div className="w-6 h-6 bg-purple-500 rounded-full blur-sm" />
        </FloatingElement>
      </div>
    </motion.div>
  )
}

// Main NotFound component
export default function NotFound() {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Animated 404 */}
          <AnimatedErrorCode />

          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Oops! Page Not Found</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. Don't worry, it happens to the best of us!
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <AnimatedButton onClick={handleGoBack} icon={<ArrowLeft size={16} />}>
              Go Back
            </AnimatedButton>

          
          </motion.div>

  

          {/* Help text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto"
          >
            If you believe this is an error, please contact our support team or try refreshing the page.
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
