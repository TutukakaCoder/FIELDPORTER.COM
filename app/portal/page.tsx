"use client";

import { ProtectedRoute } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PortalPage() {
  return (
    <ProtectedRoute>
      <PortalRedirect />
    </ProtectedRoute>
  );
}

function PortalRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard immediately
    router.replace("/portal/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
