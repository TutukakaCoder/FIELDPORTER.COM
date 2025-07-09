"use client";

import { AuthService } from "@/lib/firebase-auth";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await AuthService.signIn(formData.email, formData.password);

      // Show brief success state before redirect
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/portal");
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Sign in failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-lg">
          Sign in to access your client portal
        </p>
      </motion.div>

      {/* Sign In Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* General Error Message */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm"
          >
            <p className="text-red-400 text-sm text-center">{errors.general}</p>
          </motion.div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`
                w-full h-14 px-4 
                bg-white/[0.05] backdrop-blur-sm
                border rounded-xl
                text-white placeholder-gray-500
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-500/50"
                    : "border-white/10 focus:border-blue-500/50 hover:border-white/20"
                }
              `}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {/* Premium focus glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-100" />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`
                w-full h-14 px-4 pr-12
                bg-white/[0.05] backdrop-blur-sm
                border rounded-xl
                text-white placeholder-gray-500
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                ${
                  errors.password
                    ? "border-red-500/50 focus:border-red-500/50"
                    : "border-white/10 focus:border-blue-500/50 hover:border-white/20"
                }
              `}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {/* Password visibility toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {/* Premium focus glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-100" />
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.password}
            </motion.p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            href="/auth/reset-password"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Sign In Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className={`
            w-full h-14 px-6
            bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-500 hover:to-blue-400
            disabled:from-gray-600 disabled:to-gray-500
            text-white font-semibold
            rounded-xl
            transition-all duration-300
            hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25
            disabled:hover:scale-100 disabled:hover:shadow-none
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            relative overflow-hidden
          `}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}

          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.form>

      {/* Sign Up Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="text-center pt-6 border-t border-white/[0.08]"
      >
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
