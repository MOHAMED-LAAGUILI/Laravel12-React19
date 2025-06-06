/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, MailOpen, User } from "lucide-react";
import { Input } from "@Components/Core/Inputs/CoreInput";
import FloatingPaths from "@Components/FloatingPaths";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "@/constants/axios-client";
import toast from "react-hot-toast";
import { useStateContext } from "@/context/ContextProvider";

const fieldSchema = [
    { label: "Username", id: "username", icon: <User size={14} />, type: "text", autoComplete: "username", required: false },
    { label: "Email", id: "email", icon: <MailOpen size={14} />, type: "email", autoComplete: "email", required: true },
    { label: "Password", id: "password", icon: <Lock size={14} />, type: "password", autoComplete: "new-password", required: true },
    { label: "Confirm Password", id: "confirmPassword", icon: <Lock size={14} />, type: "password", autoComplete: "new-password", required: true },
];

const useFormState = (fields) => {
    const initial = fields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {});
    const [values, setValues] = useState(initial);
    const onChange = (id, value) => setValues((prev) => ({ ...prev, [id]: value }));
    return [values, onChange] ;
};

const LoadingSpinner = () => (
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5 border-2 border-black/30 dark:border-white/30 border-t-black dark:border-t-white rounded-full me-2"
    />
);

export default function Signup() {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useFormState(fieldSchema);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { username, email, password, confirmPassword } = form;
            const { data } = await axiosClient.post("/register", {
                username,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            toast.success(data.message);
            console.log(data); 
            navigate("/login");
        } catch (err) {
            toast.error("User registration failed");
            console.log(err);
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setLoading(false);
            setForm({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });


        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-transparent dark:bg-neutral-950 overflow-hidden">
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
                            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

                            {!!Object.keys(errors).length && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                                    <strong className="font-bold">Validation Errors:</strong>
                                    <ul className="list-disc pl-5">
                                        {Object.entries(errors).map(([field, msgs]) =>
                                            msgs.map((msg, idx) => (
                                                <li key={`${field}-${idx}`}>{msg}</li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            )}

                            <div className="space-y-6">
                                {fieldSchema.map(({ id, label, icon, type, autoComplete, required }) => (
                                    <Input
                                        key={id}
                                        label={label}
                                        id={id}
                                        type={type}
                                        name={id}
                                        value={form[id]}
                                        onChange={(e) => setForm(id, e.target.value)}
                                        leftIcon={icon}
                                        placeholder={`Enter your ${label.toLowerCase()}`}
                                        autoComplete={autoComplete}
                                        required={required}
                                    />
                                ))}

                                <div className="pt-2">
                                    <div className="group relative flex justify-center transition-shadow duration-300">
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
                                                   <LoadingSpinner /> )}
                                                    {loading ? "Registering.." : "Register"}
                                                    <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                                        {loading ? "" : "→"}
                                                    </span>
                                                </span>
                                            
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center text-sm text-gray-700 dark:text-gray-300">
                                    Already Registered?
                                    <Link to="/login" className="ml-1 underline hover:text-blue-600 dark:hover:text-blue-400">
                                        Sign In
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
