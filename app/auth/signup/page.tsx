"use client";

import { AuthService } from "@/lib/firebase-auth";
import { motion } from "framer-motion";
import { Check, Eye, EyeOff, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

interface PasswordStrength {
  score: number; // 0-3
  feedback: string[];
  isValid: boolean;
}

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength calculation
  useEffect(() => {
    const calculatePasswordStrength = (password: string): PasswordStrength => {
      if (!password) {
        return { score: 0, feedback: [], isValid: false };
      }

      let score = 0;
      const feedback: string[] = [];

      // Length check
      if (password.length >= 8) {
        score += 1;
      } else {
        feedback.push("At least 8 characters");
      }

      // Uppercase check
      if (/[A-Z]/.test(password)) {
        score += 1;
      } else {
        feedback.push("One uppercase letter");
      }

      // Number check
      if (/\d/.test(password)) {
        score += 1;
      } else {
        feedback.push("One number");
      }

      // Special character check
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 1;
      } else {
        feedback.push("One special character (!@#$%^&*)");
      }

      return {
        score,
        feedback,
        isValid: score >= 3, // Require at least 3 out of 4 criteria
      };
    };

    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordStrength.isValid) {
      newErrors.password = "Password does not meet requirements";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms of service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendWelcomeEmail = async (email: string, name: string) => {
    try {
      await fetch("/api/welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          displayName: name,
        }),
      });
    } catch (error) {
      console.warn("Failed to send welcome email:", error);
      // Don't throw - this shouldn't block the signup process
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Create user account
      await AuthService.signUp(
        formData.email,
        formData.password,
        formData.fullName.trim(),
      );

      // Send welcome email
      await sendWelcomeEmail(formData.email, formData.fullName.trim());

      // Show success state
      setIsSuccess(true);

      // Auto-redirect to sign-in after success message
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Account creation failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "text-red-500";
      case 2:
        return "text-yellow-500";
      case 3:
      case 4:
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-400" />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Account Created!
          </h1>
          <p className="text-gray-400">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

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
          Create Account
        </h1>
        <p className="text-gray-400 text-lg">
          Join the FIELDPORTER client portal
        </p>
      </motion.div>

      {/* Sign Up Form */}
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

        {/* Full Name Field */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className={`
                w-full h-14 px-4 
                bg-white/[0.05] backdrop-blur-sm
                border rounded-xl
                text-white placeholder-gray-500
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                ${
                  errors.fullName
                    ? "border-red-500/50 focus:border-red-500/50"
                    : "border-white/10 focus:border-blue-500/50 hover:border-white/20"
                }
              `}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-100" />
          </div>
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.fullName}
            </motion.p>
          )}
        </div>

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
              placeholder="Create a password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-100" />
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Password Strength:
                </span>
                <span
                  className={`text-sm font-medium ${getPasswordStrengthColor()}`}
                >
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      index < passwordStrength.score
                        ? passwordStrength.score <= 1
                          ? "bg-red-500"
                          : passwordStrength.score === 2
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              {passwordStrength.feedback.length > 0 && (
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Password needs:</p>
                  <ul className="space-y-1">
                    {passwordStrength.feedback.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <X size={12} className="text-gray-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

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

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`
                w-full h-14 px-4 pr-12
                bg-white/[0.05] backdrop-blur-sm
                border rounded-xl
                text-white placeholder-gray-500
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
                ${
                  errors.confirmPassword
                    ? "border-red-500/50 focus:border-red-500/50"
                    : "border-white/10 focus:border-blue-500/50 hover:border-white/20"
                }
              `}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none focus-within:opacity-100" />
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.confirmPassword}
            </motion.p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-1">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  handleInputChange("acceptTerms", e.target.checked)
                }
                className="sr-only"
                disabled={isLoading}
              />
              <div
                className={`
                  w-5 h-5 rounded border-2 transition-all duration-200
                  flex items-center justify-center
                  ${
                    formData.acceptTerms
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white/[0.05] border-white/20 hover:border-white/30"
                  }
                  ${errors.acceptTerms ? "border-red-500" : ""}
                `}
              >
                {formData.acceptTerms && (
                  <Check size={12} className="text-white" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-300">
              I accept the{" "}
              <Link
                href="/terms-of-service"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.acceptTerms && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm"
            >
              {errors.acceptTerms}
            </motion.p>
          )}
        </div>

        {/* Sign Up Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !passwordStrength.isValid}
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
              <span>Creating account...</span>
            </div>
          ) : (
            "Create Account"
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.form>

      {/* Sign In Link */}
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
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
