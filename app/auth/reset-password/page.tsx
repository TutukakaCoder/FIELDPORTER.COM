"use client";

import { AuthService } from "@/lib/firebase-auth";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FormErrors {
  email?: string;
  general?: string;
}

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (value: string) => {
    setEmail(value);
    // Clear errors when user starts typing
    if (errors.email) {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
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
      await AuthService.resetPassword(email);
      setIsSuccess(true);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Failed to send reset email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center space-y-6"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-green-400" />
          </motion.div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Check Your Email
            </h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              We've sent a password reset link to{" "}
              <span className="text-white font-medium">{email}</span>
            </p>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm max-w-md mx-auto"
          >
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300 space-y-2">
                <p>
                  Click the link in the email to reset your password. If you
                  don't see it, check your spam folder.
                </p>
                <p className="text-xs text-gray-400">
                  The link will expire in 1 hour for security.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4 pt-4"
          >
            <button
              onClick={() => {
                setIsSuccess(false);
                setEmail("");
                setErrors({});
              }}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
            >
              Didn't receive the email? Try again
            </button>

            <div className="pt-4 border-t border-white/[0.08]">
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Reset form
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
          Reset Password
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </motion.div>

      {/* Reset Form */}
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
              value={email}
              onChange={(e) => handleInputChange(e.target.value)}
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
              placeholder="Enter your email address"
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

        {/* Reset Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !email}
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
              <span>Sending reset email...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              <span>Send Reset Email</span>
            </div>
          )}

          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.form>

      {/* Back to Sign In */}
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
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </motion.div>
    </div>
  );
}
