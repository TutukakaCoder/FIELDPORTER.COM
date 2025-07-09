"use client";

import { ProtectedRoute, useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import { Loader2, LogOut, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";

function PortalContent() {
  const { userProfile, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
      setIsSigningOut(false);
    }
  };

  // Main portal content
  return (
    <div className="min-h-screen bg-black">
      {/* Aurora Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-black to-purple-950/20" />
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header with Sign Out */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-wide">
            FIELDPORTER
          </div>
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300 disabled:opacity-50"
          >
            {isSigningOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="w-full max-w-2xl"
        >
          {/* Premium glassmorphism card */}
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/40">
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative space-y-8">
              {/* Welcome Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center space-y-4"
              >
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    Welcome
                    {userProfile?.displayName
                      ? ` ${userProfile.displayName}`
                      : ""}
                  </span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
              </motion.div>

              {/* Coming Soon Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6 text-center"
              >
                <h2 className="text-2xl font-semibold text-white">
                  You're early!
                </h2>

                <div className="text-gray-300 text-lg leading-relaxed space-y-4 max-w-xl mx-auto">
                  <p>We're still setting up your personalized client portal.</p>

                  <p>
                    In the meantime, if you have any questions or need
                    assistance, please reach out to our team or use the chat
                    feature to speak with our AI assistant.
                  </p>

                  <p>
                    We'll notify you via email once your portal is ready with
                    all your project details, documents, and communication
                    history in one secure place.
                  </p>
                </div>
              </motion.div>

              {/* Contact Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="grid md:grid-cols-2 gap-4"
              >
                {/* Email Support */}
                <a
                  href="mailto:support@fieldporter.com"
                  className="group flex items-center gap-3 p-4 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email Support</div>
                    <div className="text-sm text-gray-400">
                      support@fieldporter.com
                    </div>
                  </div>
                </a>

                {/* AI Chat */}
                <button
                  onClick={() => {
                    // This would trigger the existing chat widget
                    const chatEvent = new CustomEvent("openChat");
                    window.dispatchEvent(chatEvent);
                  }}
                  className="group flex items-center gap-3 p-4 bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">AI Assistant</div>
                    <div className="text-sm text-gray-400">
                      Chat with our AI
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <span>Portal in development</span>
                </div>
              </motion.div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          </div>

          {/* Additional shadow layer for depth */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 blur-xl -z-10 transform scale-105" />
        </motion.div>
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <ProtectedRoute>
      <PortalContent />
    </ProtectedRoute>
  );
}
