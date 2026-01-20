import { useEffect, useRef, useState } from "react";

export type DeviceCapability = "high" | "medium" | "low";
export type Experience3D = "full" | "simplified" | "css-only";

export interface DeviceCapabilityMetrics {
  capability: DeviceCapability;
  experience: Experience3D;
  supportsWebGL: boolean;
  isMobile: boolean;
  isTablet: boolean;
  cpuCores: number;
  memoryEstimate: number;
  gpuTier: "high" | "medium" | "low";
  batteryLevel?: number;
  isCharging?: boolean;
}

export function useDeviceCapability() {
  const [metrics, setMetrics] = useState<DeviceCapabilityMetrics>({
    capability: "medium",
    experience: "simplified",
    supportsWebGL: false,
    isMobile: false,
    isTablet: false,
    cpuCores: 4,
    memoryEstimate: 4096,
    gpuTier: "medium",
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const detectCapability = async () => {
      // Device detection
      const userAgent = navigator.userAgent;
      const isMobile = /iPhone|iPod|Android.*Mobile/i.test(userAgent);
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      const isAndroid = /Android/i.test(userAgent);

      // CPU cores
      const cpuCores = navigator.hardwareConcurrency || 4;

      // Memory estimate (GB)
      const memoryEstimate = (navigator as any).deviceMemory || 4;

      // WebGL support
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      const supportsWebGL = !!gl;

      let gpuTier: "high" | "medium" | "low" = "medium";

      if (supportsWebGL && gl) {
        // GPU detection
        const webglContext = gl as WebGLRenderingContext;
        const debugInfo = webglContext.getExtension(
          "WEBGL_debug_renderer_info",
        );
        const renderer = debugInfo
          ? webglContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : "";

        // High-end GPU detection
        if (
          renderer.includes("RTX") ||
          renderer.includes("GTX 1060") ||
          renderer.includes("RX 580") ||
          renderer.includes("M1") ||
          renderer.includes("M2") ||
          renderer.includes("A15") ||
          renderer.includes("A16") ||
          renderer.includes("A17")
        ) {
          gpuTier = "high";
        }
        // Low-end GPU detection
        else if (
          renderer.includes("Mali") ||
          renderer.includes("Adreno 3") ||
          renderer.includes("PowerVR") ||
          renderer.includes("Intel HD")
        ) {
          gpuTier = "low";
        }
      }

      // Battery API (if available)
      let batteryLevel: number | undefined;
      let isCharging: boolean | undefined;

      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery();
          batteryLevel = battery.level;
          isCharging = battery.charging;
        } catch (e) {
          // Battery API not available
        }
      }

      // Viewport-based detection (more liberal than previous implementation)
      const viewport = window.innerWidth;
      const isSmallScreen = viewport < 640; // Only very small screens
      const isMediumScreen = viewport >= 640 && viewport < 1200;
      const isLargeScreen = viewport >= 1200;

      // Capability calculation
      let capability: DeviceCapability = "medium";
      let experience: Experience3D = "simplified";

      if (!supportsWebGL) {
        // No WebGL support
        capability = "low";
        experience = "css-only";
      } else if (
        isSmallScreen ||
        (isMobile && cpuCores < 4) ||
        memoryEstimate < 2 ||
        gpuTier === "low"
      ) {
        // Low-end devices
        capability = "low";
        experience = "css-only";
      } else if (isMobile || isTablet) {
        // Mobile/tablet devices get simplified
        capability = "medium";
        experience = "simplified";
      } else {
        // Desktop with WebGL = full experience with interactive particles
        capability = "high";
        experience = "full";
      }

      // Battery-based adjustments
      if (batteryLevel !== undefined && batteryLevel < 0.2 && !isCharging) {
        // Low battery, reduce experience
        if (experience === "full") experience = "simplified";
        else if (experience === "simplified") experience = "css-only";
      }

      setMetrics({
        capability,
        experience,
        supportsWebGL,
        isMobile,
        isTablet,
        cpuCores,
        memoryEstimate,
        gpuTier,
        ...(batteryLevel !== undefined && { batteryLevel }),
        ...(isCharging !== undefined && { isCharging }),
      });
    };

    detectCapability();
    isInitialized.current = true;
  }, []);

  return metrics;
}

// Simplified hooks for common use cases
export function useIs3DCapable() {
  const { experience } = useDeviceCapability();
  return experience !== "css-only";
}

export function useIsFullWebGL() {
  const { experience } = useDeviceCapability();
  return experience === "full";
}

export function useIsSimplified3D() {
  const { experience } = useDeviceCapability();
  return experience === "simplified";
}

export function useIsCSSOnly() {
  const { experience } = useDeviceCapability();
  return experience === "css-only";
}
