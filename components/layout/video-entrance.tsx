"use client";

import { MAIN_NAVIGATION } from "@/config/constants";
import { useSimplePreloader } from "../../hooks/use-simple-preloader";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoEntranceProps {
  onComplete?: () => void;
  videoSrc?: string;
  fallbackImage?: string;
}

export function VideoEntrance({
  onComplete,
  videoSrc = "/videos/fieldporter-intro-v3.mp4",
}: VideoEntranceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedPlay = useRef(false);
  const hasCompleted = useRef(false);

  const { startPreloading, stats } = useSimplePreloader();

  const completeEntrance = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    setVideoEnded(true);

    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 400);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    completeEntrance();
  }, [completeEntrance]);

  const handleUserInteraction = useCallback(
    (event: KeyboardEvent | MouseEvent | TouchEvent) => {
      if (
        event.type === "click" ||
        event.type === "touchstart" ||
        (event.type === "keydown" &&
          ["Space", "Enter", "Escape"].includes((event as KeyboardEvent).code))
      ) {
        handleSkip();
      }
    },
    [handleSkip],
  );

  // Prefetch nav routes as soon as entrance mounts
  useEffect(() => {
    startPreloading(MAIN_NAVIGATION.map((item) => item.href));
  }, [startPreloading]);

  // Show skip instruction after 2 seconds
  useEffect(() => {
    const skipTimeout = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => {
      clearTimeout(skipTimeout);
    };
  }, []);

  // Global skip listeners
  useEffect(() => {
    if (!isVisible) return;

    document.addEventListener("click", handleUserInteraction, {
      passive: true,
    });
    document.addEventListener("touchstart", handleUserInteraction, {
      passive: true,
    });
    document.addEventListener("keydown", handleUserInteraction, {
      passive: true,
    });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [isVisible, handleUserInteraction]);

  // Play ASAP on canplay / loadeddata (once)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      if (hasStartedPlay.current || !video) return;
      hasStartedPlay.current = true;

      try {
        video.muted = true;
        // ~5s effective (10s clip) — couple seconds shorter than 1.5x
        video.playbackRate = 2;

        const playPromise = video.play();

        if (playPromise !== undefined) {
          await playPromise;

          if (process.env["NODE_ENV"] === "development") {
            console.log(
              "FIELDPORTER: Video playing successfully (muted) - Routes preloading",
            );
          }
        }
      } catch (error) {
        hasStartedPlay.current = false;
        if (process.env["NODE_ENV"] === "development") {
          console.error("FIELDPORTER: Video play error:", error);
        }
        setTimeout(() => completeEntrance(), 1000);
      }
    };

    const handleLoadedData = () => {
      playVideo();
    };

    const handleCanPlay = () => {
      playVideo();
    };

    const handleEnded = () => {
      completeEntrance();
    };

    const handleError = (error: Event) => {
      if (process.env["NODE_ENV"] === "development") {
        console.error("FIELDPORTER: Video error:", error);
      }
      setTimeout(() => completeEntrance(), 1000);
    };

    // iOS/Safari: retry play on first interaction if autoplay was blocked
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS || isSafari) {
      const handleFirstInteraction = () => {
        if (!hasStartedPlay.current) {
          playVideo();
        }
        document.removeEventListener("touchstart", handleFirstInteraction);
        document.removeEventListener("click", handleFirstInteraction);
      };

      document.addEventListener("touchstart", handleFirstInteraction);
      document.addEventListener("click", handleFirstInteraction);
    }

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // If already buffered enough (e.g. cached), start immediately
    if (video.readyState >= 2) {
      playVideo();
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [completeEntrance]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center touch-manipulation select-none"
        role="dialog"
        aria-modal="true"
        aria-label="Site intro"
      >
        <div className="relative w-[88vw] max-w-md max-h-[32vh] sm:w-full sm:max-w-sm sm:max-h-[22vh] md:max-w-md md:max-h-[24vh] lg:max-w-lg lg:max-h-[26vh] px-4 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-contain rounded-lg"
              autoPlay
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
            />

            {/* Premium Edge Blending */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: `
                  radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.8) 100%),
                  radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0.9) 100%)
                `,
                boxShadow:
                  "0 0 60px rgba(0,0,0,0.8), 0 0 120px rgba(0,0,0,0.6)",
              }}
            />

            {/* Subtle vignette */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.4) 100%)`,
              }}
            />

            {/* Hard watermark cover — solid black, bottom-right */}
            <div
              className="absolute bottom-0 right-0 w-[32%] h-[26%] min-w-[5rem] min-h-[3.25rem] sm:min-w-[4.5rem] sm:min-h-[3rem] bg-black pointer-events-none rounded-br-lg"
              aria-hidden="true"
            />
          </div>

          {/* Fade overlay for smooth transition */}
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-black rounded-lg"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Skip Instruction */}
        <AnimatePresence>
          {showSkip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-8 right-4 sm:bottom-6 sm:right-6 text-center pb-[env(safe-area-inset-bottom)]"
            >
              <button
                type="button"
                onClick={handleSkip}
                className="px-4 py-2 sm:px-3 sm:py-1.5 bg-gray-800/20 backdrop-blur-sm border border-gray-600/20 rounded-full text-gray-400 text-xs font-light tracking-wider transition-all duration-300 hover:text-gray-200 hover:border-gray-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                aria-label="Skip intro"
              >
                Tap to skip
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center space-x-2 text-white/40 text-xs font-light tracking-widest">
            <motion.div
              className="w-1 h-1 bg-white/60 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>FIELDPORTER</span>
          </div>
          {process.env["NODE_ENV"] === "development" &&
            stats.totalRoutes > 0 && (
              <div className="mt-1 text-white/20 text-xs">
                Preloading: {stats.loadedRoutes}/{stats.totalRoutes} routes
              </div>
            )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
