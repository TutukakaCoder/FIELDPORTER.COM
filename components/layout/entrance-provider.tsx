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
        "FIELDPORTER: Session check -",
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
      console.log("FIELDPORTER: Entrance completed, revealing main content");
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

      {/* NUCLEAR FIX: No wrapper div at all - just render children directly */}
      {/* Previous wrapper with minHeight/overflow styles was creating scroll context issues */}
      <div
        className={
          showEntrance ? "opacity-0 pointer-events-none" : "opacity-100"
        }
        style={{
          // Minimal styling - no scroll-affecting properties
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {children}
      </div>
    </EntranceContext.Provider>
  );
}
