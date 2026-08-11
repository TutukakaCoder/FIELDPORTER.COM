"use client";

import { forceDarkMode } from "@/lib/theme";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [showEntrance, setShowEntrance] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const isIsolatedPage = pathname?.startsWith("/think-global-voluntas");

  useEffect(() => {
    if (isIsolatedPage) {
      setIsInitialized(true);
      return;
    }

    const seenInSession = sessionStorage.getItem(
      "fieldporter-video-seen-session",
    );
    const hasSeenInSession = seenInSession === "true";

    if (process.env["NODE_ENV"] === "development") {
      console.log(
        "FIELDPORTER: Session check -",
        hasSeenInSession ? "SEEN" : "NOT SEEN",
      );
    }

    if (!hasSeenInSession) {
      forceDarkMode();
      setShowEntrance(true);
    }

    setIsInitialized(true);
  }, [isIsolatedPage]);

  const completeEntrance = () => {
    if (process.env["NODE_ENV"] === "development") {
      console.log("FIELDPORTER: Entrance completed, revealing main content");
    }
    forceDarkMode();
    sessionStorage.setItem("fieldporter-video-seen-session", "true");
    setShowEntrance(false);
  };

  // Partner flyer: no entrance overlay; always render children (crawler-safe).
  if (isIsolatedPage) {
    return (
      <EntranceContext.Provider
        value={{ showEntrance: false, completeEntrance }}
      >
        {children}
      </EntranceContext.Provider>
    );
  }

  const hideContent = !isInitialized || showEntrance;

  // Always SSR children so metadata/JSON-LD/body content reach crawlers.
  // Overlay covers the UI until session entrance completes.
  return (
    <EntranceContext.Provider value={{ showEntrance, completeEntrance }}>
      {!isInitialized ? (
        <div className="fixed inset-0 bg-black z-[9999]">
          <div className="flex items-center justify-center h-full">
            <div className="text-white/40 text-xs font-light tracking-widest">
              FIELDPORTER
            </div>
          </div>
        </div>
      ) : null}

      {isInitialized && showEntrance ? (
        <VideoEntrance onComplete={completeEntrance} />
      ) : null}

      <div
        className={
          hideContent ? "opacity-0 pointer-events-none" : "opacity-100"
        }
        style={{
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {children}
      </div>
    </EntranceContext.Provider>
  );
}
