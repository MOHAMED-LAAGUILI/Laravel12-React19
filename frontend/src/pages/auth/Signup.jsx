/* eslint-disable no-unused-vars */

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Lock, MailOpen, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Input } from "@Components/Core/Inputs/CoreInput"
import FloatingPaths from "@Components/FloatingPaths"
import axiosClient from "@/constants/axios-client"

// Form fields configuration
const FORM_FIELDS = [
  {
    label: "Username",
    id: "username",
    icon: <User size={14} />,
    type: "text",
    autoComplete: "username",
    required: false,
  },
  {
    label: "Email",
    id: "email",
    icon: <MailOpen size={14} />,
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    label: "Password",
    id: "password",
    icon: <Lock size={14} />,
    type: "password",
    autoComplete: "new-password",
    required: true,
  },
  {
    label: "Confirm Password",
    id: "confirmPassword",
    icon: <Lock size={14} />,
    type: "password",
    autoComplete: "new-password",
    required: true,
  },
]

// Loading spinner component
const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
  />
)

// Form field component with error display
function FormField({ field, value, onChange, error }) {
  const { id, label, icon, type, autoComplete, required } = field

  return (
    <div className="space-y-1">
      <Input
        label={label}
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        leftIcon={icon}
        placeholder={`Enter your ${label.toLowerCase()}`}
        autoComplete={autoComplete}
        required={required}
        className={error ? "border-red-300 dark:border-red-600" : ""}
      />

      {error && error.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-1"
        >
          {error.map((msg, idx) => (
            <p key={idx} className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="w-1 h-1 bg-red-500 rounded-full mr-2 flex-shrink-0" />
              {msg}
            </p>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Loading button component
function LoadingButton({
  loading,
  children,
  loadingText,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  return (
    <div className="group relative flex justify-center transition-shadow duration-300">
      <button
        type={type}
        disabled={loading || disabled}
        className={`
          relative overflow-hidden rounded-[0.9rem] px-6 py-3 text-base font-semibold 
          backdrop-blur-md transition-all duration-300 flex items-center justify-center
          bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
          text-black dark:text-white border border-black/10 dark:border-white/10
          hover:shadow-md dark:hover:shadow-neutral-800/50
          group-hover:-translate-y-0.5
          disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
          ${loading ? "min-w-[140px]" : "min-w-[120px]"}
          ${className}
        `}
        {...props}
      >
        <motion.span className="flex items-center opacity-90 group-hover:opacity-100 transition-opacity" layout>
          {loading && <LoadingSpinner />}
          {loading ? loadingText : children}
          {!loading && (
            <motion.span
              className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          )}
        </motion.span>
      </button>
    </div>
  )
}

// Custom hook for form management
function useForm(fields) {
  const initialValues = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: "",
    }),
    {},
  )

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const updateField = useCallback(
    (id, value) => {
      setValues((prev) => ({ ...prev, [id]: value }))
      // Clear field error when user starts typing
      if (errors[id]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[id]
          return newErrors
        })
      }
    },
    [errors],
  )

  const setFieldErrors = useCallback((newErrors) => {
    setErrors(newErrors)
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    values,
    errors,
    loading,
    updateField,
    setFieldErrors,
    setLoading,
    resetForm,
    clearErrors,
    hasErrors: Object.keys(errors).length > 0,
  }
}

// Main Signup component
export default function Signup() {
  const navigate = useNavigate()
  const { values, errors, loading, updateField, setFieldErrors, setLoading, resetForm, clearErrors } =
    useForm(FORM_FIELDS)

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearErrors()
    setLoading(true)

    try {
      const { username, email, password, confirmPassword } = values

      const { data } = await axiosClient.post("/register", {
        username,
        email,
        password,
        password_confirmation: confirmPassword,
      })

      toast.success(data.message || "Registration successful!")
      navigate("/login")
      resetForm()
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed"
      toast.error(errorMessage)

      // Handle validation errors
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors)
      }

      console.error("Registration error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-transparent dark:bg-neutral-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <FloatingPaths position={-3} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-transparent dark:bg-white/5 backdrop-blur-[3px] rounded-lg p-6 md:p-8 shadow-xl border border-black/10 dark:border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <motion.h2
                className="text-3xl font-bold text-center bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Create Account
              </motion.h2>

              {/* Form Fields */}
              <div className="space-y-5">
                {FORM_FIELDS.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <FormField field={field} value={values[field.id]} onChange={updateField} error={errors[field.id]} />
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                <LoadingButton type="submit" loading={loading} loadingText="Creating Account..." className="w-full">
                  Create Account
                </LoadingButton>
              </motion.div>

              {/* Sign In Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-sm text-gray-700 dark:text-gray-300"
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 underline underline-offset-2"
                >
                  Sign In
                </Link>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
