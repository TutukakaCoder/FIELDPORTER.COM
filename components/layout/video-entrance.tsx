"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoEntranceProps {
  onComplete?: () => void;
  videoSrc?: string;
  fallbackImage?: string;
}

export function VideoEntrance({
  onComplete,
  videoSrc = "/videos/new-intro-animation.mp4",
}: VideoEntranceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const completeEntrance = useCallback(() => {
    setVideoEnded(true);

    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 800);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    completeEntrance();
  }, [completeEntrance]);

  // Handle any user interaction to skip video
  const handleUserInteraction = useCallback(
    (event: KeyboardEvent | MouseEvent | TouchEvent) => {
      // Skip on any of these interactions
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

  // Initialize entrance
  useEffect(() => {
    // Show skip instruction after 2 seconds
    const skipTimeout = setTimeout(() => {
      setShowSkip(true);
    }, 2000);

    return () => {
      clearTimeout(skipTimeout);
    };
  }, []);

  // Add global event listeners for user interaction
  useEffect(() => {
    if (!isVisible) return;

    // Add event listeners for various user interactions
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [isVisible, handleUserInteraction]);

  // Simplified video handling without audio complexity
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        if (video) {
          // Ensure video is muted and set playback rate
          video.muted = true;
          video.playbackRate = 1.5;

          const playPromise = video.play();

          if (playPromise !== undefined) {
            await playPromise;
            if (process.env.NODE_ENV === "development") {
              console.log("🎯 FIELDPORTER: Video playing successfully (muted)");
            }
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("🎯 FIELDPORTER: Video play error:", error);
        }
        // Implement fallback - show static content or complete entrance
        setTimeout(() => completeEntrance(), 1000);
      }
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      playVideo();
    };

    const handleCanPlay = () => {
      if (!videoLoaded) {
        playVideo();
      }
    };

    const handleEnded = () => {
      completeEntrance();
    };

    const handleError = (error: Event) => {
      if (process.env.NODE_ENV === "development") {
        console.error("🎯 FIELDPORTER: Video error:", error);
      }
      // Fallback: complete entrance after short delay
      setTimeout(() => completeEntrance(), 1000);
    };

    // iOS/Safari specific handling
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS || isSafari) {
      // For iOS/Safari, we might need user interaction
      const handleFirstInteraction = () => {
        playVideo();
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

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [completeEntrance, videoLoaded]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      >
        {/* Video Container - Even smaller for mobile, same/smaller overall */}
        <div className="relative max-w-md max-h-[20vh] w-full px-4 sm:max-w-sm sm:max-h-[18vh] md:max-w-md md:max-h-[20vh] lg:max-w-lg lg:max-h-[22vh] flex items-center justify-center">
          {/* Video Element with premium edge blending */}
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-contain rounded-lg"
              autoPlay
              muted
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Premium Edge Blending - Multiple layers for seamless integration */}
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

            {/* Subtle vignette for depth */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.4) 100%)`,
              }}
            />

            {/* Watermark Mask - Smaller and more subtle */}
            <div
              className="absolute bottom-2 right-2 w-12 h-8 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.6) 70%, transparent 100%)`,
              }}
            />
          </div>

          {/* Fade overlay for smooth transition */}
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-black rounded-lg"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Skip Instruction - Subtle grey, centered on screen or bottom-right */}
        <AnimatePresence>
          {showSkip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-6 right-6 text-center"
            >
              <div className="px-3 py-1.5 bg-gray-800/20 backdrop-blur-sm border border-gray-600/20 rounded-full text-gray-400 text-xs font-light tracking-wider transition-all duration-300">
                Click to skip
              </div>
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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
