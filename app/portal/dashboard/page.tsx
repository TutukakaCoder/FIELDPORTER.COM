"use client";

import { ProtectedRoute, useAuth } from "@/contexts/auth-context";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Calendar,
  Download,
  FileText,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
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

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {userProfile?.displayName}!
          </h2>
          <p className="text-gray-400">
            Here's your project overview and recent activity.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Status */}
          <DashboardCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Project Status"
            description="AI Strategy Implementation"
            status="In Progress"
            progress={65}
          />

          {/* Documents */}
          <DashboardCard
            icon={<FileText className="w-6 h-6" />}
            title="Documents"
            description="3 new files available"
            action="View All"
          />

          {/* Messages */}
          <DashboardCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Messages"
            description="2 unread messages"
            action="Open Chat"
          />

          {/* Upcoming Meetings */}
          <DashboardCard
            icon={<Calendar className="w-6 h-6" />}
            title="Next Meeting"
            description="Strategy Review"
            subtitle="Tomorrow at 2:00 PM"
          />

          {/* Quick Actions */}
          <div className="md:col-span-2 lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </main>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  status,
  progress,
  action,
  subtitle,
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
          {icon}
        </div>
        {action && (
          <button className="text-sm text-blue-400 hover:text-blue-300">
            {action} →
          </button>
        )}
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
    </motion.div>
  );
}

function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <ActionButton icon={<Download />} text="Download Latest Report" />
        <ActionButton icon={<MessageSquare />} text="Send Message" />
        <ActionButton icon={<Calendar />} text="Schedule Meeting" />
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, text }: any) {
  return (
    <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors text-left">
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm">{text}</span>
    </button>
  );
}

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-white/[0.02] backdrop-blur-xl rounded-xl p-6 border border-white/10"
    >
      <h3 className="font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        <ActivityItem
          action="Strategy document updated"
          time="2 hours ago"
          type="document"
        />
        <ActivityItem
          action="Meeting scheduled for tomorrow"
          time="5 hours ago"
          type="calendar"
        />
        <ActivityItem
          action="New message from Freddy"
          time="1 day ago"
          type="message"
        />
      </div>
    </motion.div>
  );
}

function ActivityItem({ action, time, type }: any) {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      <div className="flex-1">
        <p className="text-sm">{action}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
