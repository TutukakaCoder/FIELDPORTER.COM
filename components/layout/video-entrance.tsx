'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

interface VideoEntranceProps {
  onComplete?: () => void;
}

export function VideoEntrance({ onComplete }: VideoEntranceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  // Check if user has seen video recently (30 minutes)
  const hasSeenRecently = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const lastSeen = localStorage.getItem('fieldporter-video-seen');
    if (!lastSeen) return false;
    const thirtyMinutes = 30 * 60 * 1000;
    return Date.now() - parseInt(lastSeen) < thirtyMinutes;
  }, []);

  // Complete video entrance with smooth fade
  const completeEntrance = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('🎬 FIELDPORTER: Video entrance complete - fading out');

    setVideoEnded(true);

    // Mark as seen
    if (typeof window !== 'undefined') {
      localStorage.setItem('fieldporter-video-seen', Date.now().toString());
    }

    // Smooth fade out then complete
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 800); // 800ms fade out
  }, [onComplete]);

  // Handle skip button
  const handleSkip = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('⏭️ FIELDPORTER: Video skipped by user');
    completeEntrance();
  }, [completeEntrance]);

  // Initialize video entrance
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('🎭 FIELDPORTER: Initializing video entrance...');

    // TEMPORARY: Clear localStorage for testing
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fieldporter-video-seen');
      // eslint-disable-next-line no-console
      console.log('🧹 FIELDPORTER: Cleared localStorage for testing');
    }

    // Skip if seen recently
    if (hasSeenRecently()) {
      // eslint-disable-next-line no-console
      console.log('⏭️ FIELDPORTER: Video skipped - seen recently');
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Show skip button after 3 seconds
    const skipTimeout = setTimeout(() => {
      setShowSkip(true);
    }, 3000);

    // Remove auto-complete timeout - video should only end naturally or be skipped
    return () => {
      clearTimeout(skipTimeout);
    };
  }, [hasSeenRecently, onComplete]);

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = async () => {
      // eslint-disable-next-line no-console
      console.log('📹 FIELDPORTER: Video ready to play');
      // eslint-disable-next-line no-console
      console.log('📹 FIELDPORTER: Video duration:', video.duration);
      // eslint-disable-next-line no-console
      console.log('📹 FIELDPORTER: Video current time:', video.currentTime);

      try {
        // Start muted for autoplay compliance
        video.muted = true;
        video.volume = 0.3;

        await video.play();
        // eslint-disable-next-line no-console
        console.log('🎬 FIELDPORTER: Video playing successfully');
        // eslint-disable-next-line no-console
        console.log('🎬 FIELDPORTER: Video paused:', video.paused);
        // eslint-disable-next-line no-console
        console.log('🎬 FIELDPORTER: Video ended:', video.ended);

        // Try multiple strategies to get audio
        setTimeout(() => {
          try {
            video.muted = false;
            video.volume = 0.3;
            // eslint-disable-next-line no-console
            console.log('🔊 FIELDPORTER: Video unmuted');
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log('🔇 FIELDPORTER: Could not unmute, trying user interaction');

            // Try to unmute on first user interaction
            const handleUserInteraction = () => {
              try {
                video.muted = false;
                video.volume = 0.3;
                // eslint-disable-next-line no-console
                console.log('🔊 FIELDPORTER: Video unmuted after user interaction');
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('touchstart', handleUserInteraction);
              } catch (error) {
                // eslint-disable-next-line no-console
                console.log('🔇 FIELDPORTER: Audio not available');
              }
            };

            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
          }
        }, 1000);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('❌ FIELDPORTER: Autoplay failed:', error);
      }
    };

    const handleEnded = () => {
      // eslint-disable-next-line no-console
      console.log('🏁 FIELDPORTER: Video ended naturally');
      completeEntrance();
    };

    const handleTimeUpdate = () => {
      // eslint-disable-next-line no-console
      console.log('⏱️ FIELDPORTER: Video time:', video.currentTime, '/', video.duration);
    };

    const handleError = (error: Event) => {
      // eslint-disable-next-line no-console
      console.error('❌ FIELDPORTER: Video error:', error);
      // Don't auto-complete on error - let user skip if needed
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
    };
  }, [completeEntrance]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className='fixed inset-0 z-[9999] bg-black flex items-center justify-center'
      >
        {/* Video Container - Much smaller and centered */}
        <div className='relative max-w-lg max-h-[25vh] w-full px-4 sm:max-w-md sm:max-h-[20vh] md:max-w-lg md:max-h-[22vh] lg:max-w-xl lg:max-h-[25vh] flex items-center justify-center'>
          {/* Video Element with premium edge blending */}
          <div className='relative w-full h-full flex items-center justify-center'>
            <video
              ref={videoRef}
              className='w-full h-full object-contain rounded-lg'
              playsInline
              preload='auto'
              muted
              autoPlay
            >
              <source src='/videos/entrance-video.mp4' type='video/mp4' />
            </video>

            {/* Premium Edge Blending - Multiple layers for seamless integration */}
            <div
              className='absolute inset-0 pointer-events-none rounded-lg'
              style={{
                background: `
                  radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.8) 100%),
                  radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0.9) 100%)
                `,
                boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 120px rgba(0,0,0,0.6)',
              }}
            />

            {/* Subtle vignette for depth */}
            <div
              className='absolute inset-0 pointer-events-none rounded-lg'
              style={{
                background: `radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.4) 100%)`,
              }}
            />

            {/* Watermark Mask - Smaller and more subtle */}
            <div
              className='absolute bottom-2 right-2 w-12 h-8 pointer-events-none'
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
                className='absolute inset-0 bg-black rounded-lg'
              />
            )}
          </AnimatePresence>
        </div>

        {/* Skip Button - Bottom right, subtle and minimal */}
        <AnimatePresence>
          {showSkip && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleSkip}
              className='absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white/50 text-xs font-light tracking-wider hover:bg-black/30 hover:text-white/80 transition-all duration-500 hover:scale-105'
            >
              Skip
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <div className='absolute bottom-8 left-8'>
          <div className='flex items-center space-x-2 text-white/40 text-xs font-light tracking-widest'>
            <motion.div
              className='w-1 h-1 bg-white/60 rounded-full'
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
