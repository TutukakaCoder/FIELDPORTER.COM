"use client";

import { ProtectedRoute, useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Save, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || "",
    email: userProfile?.email || "",
  });

  const handleSave = async () => {
    // TODO: Implement profile update functionality
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Portal Header */}
      <header className="bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/portal/dashboard"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                FIELDPORTER
              </h1>
              <p className="text-sm text-gray-400">Client Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Page Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-gray-400">Manage your account information</p>
          </div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-8 border border-white/10"
          >
            <div className="space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your display name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white opacity-50 cursor-not-allowed"
                  placeholder="your@email.com"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Email address cannot be changed
                </p>
              </div>

              {/* Account Info */}
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-4">
                  Account Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Created</span>
                    <span className="text-white">
                      {userProfile?.createdAt
                        ? new Date(userProfile.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Sign In</span>
                    <span className="text-white">
                      {userProfile?.lastLogin
                        ? new Date(userProfile.lastLogin).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          displayName: userProfile?.displayName || "",
                          email: userProfile?.email || "",
                        });
                      }}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-4">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-gray-400">Last changed: Never</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm">
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm">
                  Enable 2FA
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
