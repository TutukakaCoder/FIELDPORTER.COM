import { useCallback, useEffect, useRef, useState } from "react";

export type QualityLevel = "ultra" | "high" | "medium" | "low";

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  frameTime: number;
  quality: QualityLevel;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    frameTime: 16,
    quality: "high",
  });

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const frameTimesRef = useRef<number[]>([]);
  const rafIdRef = useRef<number>();
  const qualityAdjustmentRef = useRef(0);

  // Get quality settings based on current level
  const getQualitySettings = useCallback((quality: QualityLevel) => {
    switch (quality) {
      case "ultra":
        return {
          particleCount: 1000,
          shadowQuality: "high",
          antialiasing: true,
        };
      case "high":
        return {
          particleCount: 500,
          shadowQuality: "medium",
          antialiasing: true,
        };
      case "medium":
        return {
          particleCount: 250,
          shadowQuality: "low",
          antialiasing: false,
        };
      case "low":
        return {
          particleCount: 100,
          shadowQuality: "off",
          antialiasing: false,
        };
      default:
        return {
          particleCount: 500,
          shadowQuality: "medium",
          antialiasing: true,
        };
    }
  }, []);

  // Check if we should skip frame for performance
  const shouldSkipFrame = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;

    // If frame time is over 20ms (50fps), start skipping
    return deltaTime > 20;
  }, []);

  // Performance monitoring loop - optimized for scroll performance
  useEffect(() => {
    const monitorPerformance = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimeRef.current;

      frameCountRef.current++;
      frameTimesRef.current.push(deltaTime);

      // Keep only last 120 frame times for more stable average
      if (frameTimesRef.current.length > 120) {
        frameTimesRef.current.shift();
      }

      // Update metrics every 120 frames (less frequent for stability)
      if (frameCountRef.current % 120 === 0) {
        const avgFrameTime =
          frameTimesRef.current.reduce((a, b) => a + b, 0) /
          frameTimesRef.current.length;
        const fps = 1000 / avgFrameTime;

        // Get memory usage if available
        const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;

        setMetrics((prev) => {
          let newQuality = prev.quality;

          // Aggressive memory management to prevent WebGL context loss
          const memoryMB = Math.round(memoryUsage / 1024 / 1024);

          // More stable quality adjustment logic with higher thresholds
          if (fps < 20 || memoryMB > 350) {
            // Severe performance issues or very high memory usage
            if (prev.quality === "ultra") newQuality = "high";
            else if (prev.quality === "high") newQuality = "medium";
            else if (prev.quality === "medium") newQuality = "low";
            qualityAdjustmentRef.current = 0;
          } else if (fps < 35 || memoryMB > 300) {
            // Moderate performance issues or high memory usage
            if (prev.quality === "ultra") newQuality = "high";
            else if (prev.quality === "high") newQuality = "medium";
            qualityAdjustmentRef.current = 0;
          } else if (fps > 50 && memoryMB < 200) {
            // Good performance and low memory usage, can potentially increase quality
            qualityAdjustmentRef.current++;
            if (qualityAdjustmentRef.current > 10) {
              // Much more conservative increase
              if (prev.quality === "low") newQuality = "medium";
              else if (prev.quality === "medium") newQuality = "high";
              // Prevent going to ultra unless memory is really low
              else if (prev.quality === "high" && memoryMB < 150)
                newQuality = "ultra";
              qualityAdjustmentRef.current = 0;
            }
          }

          return {
            fps: Math.round(fps),
            memoryUsage: Math.round(memoryUsage / 1024 / 1024), // MB
            frameTime: Math.round(avgFrameTime),
            quality: newQuality,
          };
        });

        frameCountRef.current = 0;
      }

      lastTimeRef.current = currentTime;

      // Only continue monitoring if needed (reduces scroll overhead)
      const shouldContinueMonitoring =
        process.env.NODE_ENV === "development" ||
        frameTimesRef.current.some((time) => time > 25); // Poor performance detected

      if (shouldContinueMonitoring) {
        rafIdRef.current = requestAnimationFrame(monitorPerformance);
      }
    };

    // Start monitoring
    rafIdRef.current = requestAnimationFrame(monitorPerformance);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    metrics,
    getQualitySettings,
    shouldSkipFrame,
  };
}

export function useFrameSkip() {
  const lastFrameTimeRef = useRef(performance.now());
  const targetFrameTime = 16.67; // 60fps

  const shouldSkipFrame = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastFrameTimeRef.current;

    if (deltaTime < targetFrameTime) {
      return true; // Skip this frame
    }

    lastFrameTimeRef.current = currentTime;
    return false;
  }, []);

  return shouldSkipFrame;
}
