/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, MailOpen } from "lucide-react";
import { Input } from "@Components/Core/Inputs/CoreInput";
import FloatingPaths from "@Components/FloatingPaths";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "@/constants/axios-client";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/ContextProvider";

export default function Login() {
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axiosClient.post("/login", form);
      setUser(data.user);
      setToken(data.token);
      toast.success(data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-transparent dark:bg-white/5 backdrop-blur-[3px] rounded-lg p-6 md:p-8 shadow-xl border border-black/10 dark:border-white/10">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

              {errors.email &&  (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  <span className="block sm:inline">
                  {errors.email}
                  </span>
                </div>
              )}
            

              <div className="space-y-6">
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  leftIcon={<MailOpen className="h-4 w-4" />}
                  placeholder="Enter your email"
                  required
                />

                <Input
                  label="Password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  leftIcon={<Lock className="h-4 w-4" />}
                  placeholder="Enter your password"
                  required
                />

                <div className="pt-2">
                  <div className="group relative overflow-hidden transition-shadow duration-300 flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-28 rounded-[0.9rem] px-2 py-2 text-base font-semibold backdrop-blur-md 
                      bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                      text-black dark:text-white transition-all duration-300 
                      group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                      hover:shadow-md dark:hover:shadow-neutral-800/50 flex items-center justify-center ${loading && "text-gray-400 cursor-progress bg-gray-200 w-44"}`}
                    >
                      <span className="opacity-90 group-hover:opacity-100 transition-opacity flex items-center">
                       
                      {loading && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 me-1 border-black/30 dark:border-white/30 border-t-black dark:border-t-white rounded-full"
                        /> )}
                        {loading ? "Processing..." : "Login"}
                        <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                          {loading ? "" : "→"}
                          </span>
                        </span>
                      
                    </button>
                  </div>
                </div>

                <div>
                  Don’t have an account?
                  <Link to="/signup" className="text-blue-600 dark:text-blue-400 ml-1">
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
