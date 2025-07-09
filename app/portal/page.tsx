"use client";

import { ProtectedRoute, useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Download,
  FileText,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function PortalPage() {
  return (
    <ProtectedRoute>
      <PortalContent />
    </ProtectedRoute>
  );
}

function PortalContent() {
  const { userProfile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Portal Header */}
      <header className="bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              FIELDPORTER
            </h1>
            <p className="text-sm text-gray-400">Client Portal</p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={signOut}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Early Access Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm mb-6">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span>Early Access - Portal in Development</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {userProfile?.displayName}!
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            You're early! We're still setting up your personalized client
            portal. Here's what it will look like when it's ready.
          </p>
        </motion.div>

        {/* Preview Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Your Portal Preview</h2>
            <div className="text-sm text-gray-400">Coming Soon</div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Status */}
            <PreviewCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Project Status"
              description="AI Strategy Implementation"
              status="In Progress"
              progress={65}
            />

            {/* Documents */}
            <PreviewCard
              icon={<FileText className="w-6 h-6" />}
              title="Documents"
              description="3 new files available"
              action="View All"
            />

            {/* Messages */}
            <PreviewCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Messages"
              description="2 unread messages"
              action="Open Chat"
            />

            {/* Upcoming Meetings */}
            <PreviewCard
              icon={<Calendar className="w-6 h-6" />}
              title="Next Meeting"
              description="Strategy Review"
              subtitle="Tomorrow at 2:00 PM"
            />

            {/* Quick Actions */}
            <div className="md:col-span-2 lg:col-span-1">
              <QuickActionsPreview />
            </div>
          </div>
        </motion.div>

        {/* Features Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* What's Coming */}
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4">What's Coming</h3>
            <div className="space-y-4">
              <FeatureItem
                title="Real-time Project Updates"
                description="Live status tracking and milestone notifications"
              />
              <FeatureItem
                title="Secure Document Sharing"
                description="Access to all project files and resources"
              />
              <FeatureItem
                title="Direct Messaging"
                description="Chat with our team and AI assistant"
              />
              <FeatureItem
                title="Meeting Scheduling"
                description="Book calls and review sessions"
              />
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <div className="space-y-4">
              <a
                href="mailto:freddy@fieldporter.com"
                className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium">Email Support</div>
                  <div className="text-sm text-gray-400">
                    freddy@fieldporter.com
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
              </a>

              <button
                onClick={() => {
                  const chatEvent = new CustomEvent("openChat");
                  window.dispatchEvent(chatEvent);
                }}
                className="w-full flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium">AI Assistant</div>
                  <div className="text-sm text-gray-400">Chat with our AI</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function PreviewCard({
  icon,
  title,
  description,
  status,
  progress,
  action,
  subtitle,
}: any) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all opacity-60">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
          {icon}
        </div>
        {action && <span className="text-sm text-gray-500">{action} →</span>}
      </div>

      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-2">{description}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}

      {progress && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{status}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function QuickActionsPreview() {
  return (
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10 opacity-60">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 text-gray-400">
          <Download className="w-4 h-4" />
          <span className="text-sm">Download Latest Report</span>
        </div>
        <div className="flex items-center space-x-3 p-3 text-gray-400">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm">Send Message</span>
        </div>
        <div className="flex items-center space-x-3 p-3 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Schedule Meeting</span>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-400">{description}</div>
      </div>
    </div>
  );
}
