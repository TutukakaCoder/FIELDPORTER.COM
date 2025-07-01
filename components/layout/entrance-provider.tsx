"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [showEntrance, setShowEntrance] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check session storage on mount
  useEffect(() => {
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
  }, []);

  const completeEntrance = () => {
    if (process.env.NODE_ENV === "development") {
      console.log("🎯 FIELDPORTER: Entrance completed, revealing main content");
    }
    sessionStorage.setItem("fieldporter-video-seen-session", "true");
    setShowEntrance(false);
  };

  // Don't render anything until we've checked session storage
  if (!isInitialized) {
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

  return (
    <EntranceContext.Provider value={{ showEntrance, completeEntrance }}>
      {showEntrance && <VideoEntrance onComplete={completeEntrance} />}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          showEntrance ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          visibility: showEntrance ? "hidden" : "visible",
          position: showEntrance ? "fixed" : "static",
          top: showEntrance ? "-9999px" : "auto",
        }}
      >
        {children}
      </div>
    </EntranceContext.Provider>
  );
}
