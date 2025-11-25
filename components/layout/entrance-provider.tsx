"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { VideoEntrance } from "./video-entrance";

interface EntranceContextType {
  showEntrance: boolean;
  completeEntrance: () => void;
}

const EntranceContext = createContext<EntranceContextType | null>(null);

export function useEntrance() {
  const context = useContext(EntranceContext);
  if (!context) {
    throw new Error("useEntrance must be used within EntranceProvider");
  }
  return context;
}

interface EntranceProviderProps {
  children: ReactNode;
}

export function EntranceProvider({ children }: EntranceProviderProps) {
  const pathname = usePathname();
  const [showEntrance, setShowEntrance] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Pages that should skip the FIELDPORTER entrance animation entirely
  const isIsolatedPage = pathname?.startsWith("/think-global-voluntas");

  // Check session storage on mount
  useEffect(() => {
    // Skip entrance for isolated partner pages
    if (isIsolatedPage) {
      setIsInitialized(true);
      return;
    }

    const seenInSession = sessionStorage.getItem(
      "fieldporter-video-seen-session",
    );
    const hasSeenInSession = seenInSession === "true";

    if (process.env.NODE_ENV === "development") {
      console.log(
        "🎯 FIELDPORTER: Session check -",
        hasSeenInSession ? "SEEN" : "NOT SEEN",
      );
    }

    if (!hasSeenInSession) {
      setShowEntrance(true);
    }

    setIsInitialized(true);
  }, [isIsolatedPage]);

  const completeEntrance = () => {
    if (process.env.NODE_ENV === "development") {
      console.log("🎯 FIELDPORTER: Entrance completed, revealing main content");
    }
    sessionStorage.setItem("fieldporter-video-seen-session", "true");
    setShowEntrance(false);
  };

  // Don't render anything until we've checked session storage
  if (!isInitialized) {
    // For isolated pages, show a neutral loading state
    if (isIsolatedPage) {
      return (
        <div className="fixed inset-0 bg-[#fafafa] z-[9999]">
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        </div>
      );
    }
    return (
      <div className="fixed inset-0 bg-black z-[9999]">
        <div className="flex items-center justify-center h-full">
          <div className="text-white/40 text-xs font-light tracking-widest">
            FIELDPORTER
          </div>
        </div>
      </div>
    );
  }

  // For isolated pages, render children directly without entrance effects
  if (isIsolatedPage) {
    return (
      <EntranceContext.Provider
        value={{ showEntrance: false, completeEntrance }}
      >
        {children}
      </EntranceContext.Provider>
    );
  }

  return (
    <EntranceContext.Provider value={{ showEntrance, completeEntrance }}>
      {showEntrance && <VideoEntrance onComplete={completeEntrance} />}

      {/* FIXED: Static overflow to prevent scroll freeze */}
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          showEntrance ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          // Use stable positioning - NO dynamic position changes
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          // Prevent interaction during entrance but maintain layout
          pointerEvents: showEntrance ? "none" : "auto",
          // FIXED: Static overflow-x only, never toggle overflow-y
          overflowX: "hidden",
          overflowY: "visible",
        }}
      >
        {children}
      </div>
    </EntranceContext.Provider>
  );
}
